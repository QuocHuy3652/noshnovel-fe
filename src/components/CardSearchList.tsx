import { Novel } from '~/models/Novel.tsx';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid';
import { withRouter, WithRouterProps } from '~/hocs/withRouter';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { NovelSearchCard } from '~/components/NovelSearchCard.tsx';

export type CardSearchListProps = {
  item: Novel[];
  totalRow?: number;
  totalCol?: number;
  totalPages: number;
};

export const CardSearchList = withRouter((props: CardSearchListProps & WithRouterProps) => {
  const { item, totalRow = 2, totalCol = 2, totalPages, navigate, location } = props;
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = totalRow * totalCol;

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
    const params = Object.fromEntries([...searchParams]);
    params.page = String(event.selected + 1);
    // Navigate to location.pathname with new params
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
            return (
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
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
      <ReactPaginate
        className="w-full flex flex-row justify-center items-center gap-2"
        previousLabel={<ArrowLeftIcon className="w-5 h-5" />}
        nextLabel={<ArrowRightIcon className="w-5 h-5" />}
        pageCount={totalPages}
        onPageChange={handlePageClick}
        previousClassName="inline-block rounded-md bg-app_primary p-2 text-white"
        nextClassName="inline-block rounded-md bg-app_primary p-2 text-white"
        pageClassName="inline-block p-2 rounded-md bg-app_secondary hover:opacity-50 min-w-[2rem] text-center"
        activeLinkClassName="text-white font-bold "
        activeClassName="inline-block rounded-md bg-[#467400] p-2 text-white"
        breakLabel="..."
        pageRangeDisplayed={5}
        renderOnZeroPageCount={null}
      />
    </div>
  );
});
