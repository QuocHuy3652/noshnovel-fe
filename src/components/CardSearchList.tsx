import { Novel } from '~/models/Novel.tsx';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid';
import { withRouter, WithRouterProps } from '~/hocs/withRouter';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { NovelSearchCard } from '~/components/NovelSearchCard.tsx';
import { ImagePlacehoderSkeleton } from '~/components/SearchCardSkeleton.tsx';

export type CardSearchListProps = {
  item: Novel[];
  totalRow?: number;
  totalCol?: number;
  totalPages: number;
  loading?: boolean;
};

export const CardSearchList = withRouter((props: CardSearchListProps & WithRouterProps) => {
  const { loading = false, item, totalRow = 2, totalCol = 2, totalPages, navigate, location } = props;
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = totalRow * totalCol;
  const server = localStorage.getItem('selectedServer');


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = Number(params.get('page')) || 1;
    setCurrentPage(page - 1);
  }, [location.search]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
    const params = Object.fromEntries([...searchParams]);
    params.page = String(event.selected + 1);

    navigate({
      pathname: location.pathname,
      search: createSearchParams(params).toString(),
    });
  };

  return (
    <div className="wrapper p-3 grid grid-cols-1 gap-4">
      {Array.from({ length: totalRow }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-2 gap-4">
          {Array.from({ length: totalCol }).map((_, colIndex) => {
            const index = rowIndex * totalCol + colIndex;
            const novel = item[index]; // Changed from displayedItems to item
            return loading ? (
              <ImagePlacehoderSkeleton />
            ) : (
              <div key={index} className="col-span-1 p-3">
                {novel && (
                  <NovelSearchCard
                    title={novel.title}
                    author={novel.author?.name ?? undefined}
                    coverUrl={novel.coverImage}
                    totalChapters={novel.totalChapter}
                    category={novel.genres?.[0]?.name ?? undefined}
                    description={novel.description ?? undefined}
                    status={novel.status ?? undefined}
                    novelSlug={novel.novelSlug}
                    namePage='search'
                    server={server}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
      <ReactPaginate
        className="w-full flex flex-row justify-center items-center gap-2"
        previousLabel={totalPages != 1 ? <ArrowLeftIcon className="w-5 h-6" /> : null}
        nextLabel={totalPages != 1 ? <ArrowRightIcon className="w-5 h-6" /> : null}
        pageCount={totalPages}
        onPageChange={handlePageClick}
        previousClassName={totalPages != 1 ? 'inline-block rounded-md bg-app_primary p-2 text-white' : ''}
        nextClassName={totalPages != 1 ? 'inline-block rounded-md bg-app_primary p-2 text-white' : ''}
        pageClassName="inline-block p-2 rounded-md bg-app_secondary hover:opacity-50 min-w-[3rem] text-center"
        activeLinkClassName="text-white font-bold "
        activeClassName="inline-block rounded-md bg-green-700 p-2 text-white"
        breakLabel="..."
        pageRangeDisplayed={5}
        renderOnZeroPageCount={null}
        forcePage={currentPage}
      />
    </div>
  );
});
