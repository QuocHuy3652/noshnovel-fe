import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';

export interface ChapterListProps {
  item: { label: string; slug: string; name: string }[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ChapterList = (props: ChapterListProps) => {
  const { item, itemsPerPage, totalItems, totalPages, onPageChange } = props;
  const [currentPage, setCurrentPage] = useState(props.currentPage);
  console.log(currentPage);

  useEffect(() => {
    setCurrentPage(props.currentPage);
  }, [props.currentPage]);

  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };
  return (
    <>
      <div className="chapter-list wrapper flex flex-col ">
        <div className="grid grid-cols-4 gap-4">
          {item.map((chapter, index) => (
            <div key={index}>
              {chapter.label} - {chapter.name}
            </div>
          ))}
        </div>

        <ReactPaginate
          className="w-full flex flex-row justify-center items-center gap-2  m-10"
          previousLabel={totalPages > 1 ? <ArrowLeftIcon className="w-5 h-6" /> : null}
          nextLabel={totalPages > 1 ? <ArrowRightIcon className="w-5 h-6" /> : null}
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
          forcePage={props.currentPage - 1}
        />
      </div>
    </>
  );
};
