import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiSearchNovel, apiFilterGenre, apiFilterNovelByAuthor } from '~/apis';
import { Novel } from '~/models/Novel';
import { CardSearchList } from '~/components/CardSearchList.tsx';
import Loading from './Loading';
import { useGenreStore } from '~/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SearchResult = () => {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const genre = searchParams.get('genre');
  const author = searchParams.get('author');

  const genreItem = localStorage.getItem('currentGenre');
  const currentGenre = genreItem ? JSON.parse(genreItem) : null;

  const authorItem = localStorage.getItem('currentAuthor');
  const currentAuthor = authorItem ? JSON.parse(authorItem) : null;

  const [key, setKey] = useState(Math.random());

  const fetchSearchNovel = async (params: any) => {
    setIsLoading(true);
    setNovels([]);
    let result: any;

    if (params.server === 'all') {
      const priorityList = JSON.parse(localStorage.getItem('priorityList') || '[]');
      for (const server of priorityList) {
        params.server = server;
        if (params.keyword) {
          result = await apiSearchNovel({
            perPage: 6,
            page: params.page,
            ...params,
          });
        }
        if (result.data.length > 0) {
          localStorage.setItem('currentServerSearch', server);
          localStorage.setItem('selectedServer', server);
          toast.success(`Tìm kiếm truyện ở  server ${server} thành công`, { toastId: server });

          break;
        }
      }
    } else {
      if (params.server && params.keyword) {
        result = await apiSearchNovel({
          perPage: 6,
          page: params.page,
          ...params,
        });
      } else if (params.server && params.genre) {
        result = await apiFilterGenre({
          perPage: 6,
          page: params.page,
          ...params,
        });
      } else if (params.server && params.author) {
        result = await apiFilterNovelByAuthor({
          perPage: 6,
          page: params.page,
          ...params,
        });
      }
      if (result && result.data && result.data[0] && result.data[0].author) {
        localStorage.setItem('currentAuthor', JSON.stringify(result.data[0].author.name));
      }
    }

    if (result) {
      setNovels(result.data);
      setTotalPages(result.totalPages);
      setTotal(result.total);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const savedSearchKey = localStorage.getItem('searchKey');
    if (savedSearchKey) {
      const params = Object.fromEntries([...searchParams]);
      fetchSearchNovel(params);
    }
  }, [localStorage.getItem('searchKey'), searchParams]);

  useEffect(() => {
    setKey(Math.random());
  }, [window.location.href]);

  let searchLabel = 'Kết quả tìm kiếm';
  if (keyword) {
    searchLabel = `Tìm kiếm theo từ khóa "${keyword}"`;
  } else if (genre) {
    searchLabel = `Tìm kiếm theo thể loại "${currentGenre}"`;
  } else if (author) {
    searchLabel = `Tìm kiếm theo tác giả "${currentAuthor}"`;
  }

  return (
    <>
      <section className="novel-history text-app_primary p-5 bg-[#F8F8F8]">
        <div className="border-app_primary text-3xl font-semibold">
          {isLoading ? 'Đang tìm kiếm' : `${searchLabel} (${total} kết quả):`}
        </div>
        {isLoading && (
          <div className="flex items-center justify-center h-full mt-[60px]">
            <Loading isBlur={false} fullScreen={false} />
          </div>
        )}
        <div className="novel-history p-3 mt-3">
          {novels && (novels.length > 0 || isLoading) ? (
            <CardSearchList item={novels} totalCol={2} totalRow={3} totalPages={totalPages} />
          ) : (
            novels.length === 0 &&
            !isLoading && <div className="text-xl mx-auto text-center">Không tìm thấy kết quả ¯\_(ツ)_/¯</div>
          )}
        </div>
      </section>
    </>
  );
};
