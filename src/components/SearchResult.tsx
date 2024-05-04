import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiSearchNovel } from '~/apis/novel';
import CardSearchList from '~/components/CardSearchList.tsx';
import { Novel } from '~/models/Novel';

export const SearchResult = () => {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchSearchNovel = async (params: any) => {
      const result: any = await apiSearchNovel({
        perPage: 4,
        page: params.page,
        ...params,
      });
      console.log(result);
      setNovels(result.data);
      setTotalPages(result.totalPages);
    };
    const params = Object.fromEntries([...searchParams]);

    fetchSearchNovel(params);
  }, [searchParams]);

  return (
    <>
      <section className="novel-history text-app_primary p-5">
        <div className="border-app_primary text-3xl font-semibold">Kết quả tìm kiếm: </div>
        <div className="novel-history p-3 mt-3">
          <CardSearchList item={novels} totalCol={2} totalRow={2} totalPages={totalPages} />
        </div>
      </section>
    </>
  );
};
