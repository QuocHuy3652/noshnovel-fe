import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiSearchNovel, apiFilterGenre } from '~/apis';
import { Novel } from '~/models/Novel';
import { CardSearchList } from '~/components/CardSearchList.tsx';
import Loading from './Loading';

export const SearchResult = () => {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchSearchNovel = async (params: any) => {
      setIsLoading(true);
      let result: any;

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
      }

      if (result) {
        setNovels(result.data);
        setTotalPages(result.totalPages);
        setTotal(result.total);
      }
      setIsLoading(false);
    };

    const params = Object.fromEntries([...searchParams]);

    fetchSearchNovel(params);
  }, [searchParams]);

  return (
    <>
      {isLoading && <Loading />}
      <section className="novel-history text-app_primary p-5 bg-[#F8F8F8]">
        <div className="border-app_primary text-3xl font-semibold">{isLoading ? 'Đang tìm kiếm' : `Kết quả tìm kiếm (${total} kết quả):`}</div>
        <div className="novel-history p-3 mt-3">
          {novels && novels.length > 0 ? (
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
