import { Novel } from '~/models/Novel.tsx';
import { NovelSearchCard } from '~/components/NovelSearchCard.tsx';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';

export type CardSearchListProps = {
  item: Novel[],
  totalRow?: number,
  totalCol?: number
}

export const CardSearchList = (props: CardSearchListProps) => {
  const { item, totalRow = 1, totalCol = 1 } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = totalRow * totalCol;

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const displayedItems = item.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="wrapper p-3 grid grid-cols-1 gap-4"> {/* Assumes 2 columns per row */}
      {Array.from({ length: totalRow }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-2 gap-4"> {/* Assumes 2 columns per row */}
          {Array.from({ length: totalCol }).map((_, colIndex) => {
            const index = rowIndex * totalCol + colIndex;
            // if (index < displayedItems.length) {
            //   const novel = displayedItems[index];
            // }
            return (
              <div key={index} className="col-span-1 p-3">
                {/* Render the item */}
                {<NovelSearchCard />}
              </div>
            );
            // return null;
          })}
        </div>
      ))}
      <ReactPaginate
        className="w-full flex flex-row justify-center items-center space-x-5"
        previousLabel="Previous"
        nextLabel="Next"
        pageCount={Math.ceil(10 / itemsPerPage)}
        onPageChange={handlePageClick}
        previousClassName="inline-block rounded-xl bg-app_primary p-2 text-white"
        nextClassName="inline-block rounded-xl bg-app_primary p-2 text-white"
        pageClassName="inline-block"
        activeClassName="inline-block"
        breakLabel="..."
        pageRangeDisplayed={5}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

