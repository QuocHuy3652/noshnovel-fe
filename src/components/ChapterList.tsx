import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import { insertToHistory } from '~/utils/fn';

export interface ChapterListProps {
  item: { label: string; slug: string; name: string }[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onReadNovel: (data: any) => void;
  novelSlug: string | null;
  title: string | null;
  coverImage: string | null;
  chapterSlug: string | null;
  isInsert: boolean;
}

export const ChapterList = (props: ChapterListProps) => {
  const { item, itemsPerPage, totalItems, totalPages, onPageChange, onReadNovel, novelSlug, chapterSlug, isInsert } =
    props;
  const [searchParams] = useSearchParams();
  const server: any = searchParams.get('server');

  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };
  const handleReadNovel = (data: any) => {
    if (!chapterSlug || chapterSlug !== data.slug) {
      onReadNovel(data);
      if (isInsert) {
        insertToHistory(data, props, server);
      }
    }
  };

  return (
    <>
      <div className="chapter-list wrapper flex flex-col ">
        <div className="grid grid-cols-4 gap-4">
          {item.map((chapter, index) => (
            <div
              key={index}
              onClick={() => handleReadNovel(chapter)}
              style={{
                cursor: 'pointer',
                padding: '10px',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              className={`hover:underline ${chapterSlug && chapterSlug === chapter.slug ? 'text-app_primary font-bold' : ''} `}
            >
              {chapter.label} {chapter.name && `- ${chapter.name}`}
            </div>
          ))}
        </div>

        <ReactPaginate
          className="flex flex-row justify-center items-center gap-2 mt-20"
          previousLabel={totalPages > 1 ? <ArrowLeftIcon className="w-5 h-6" /> : null}
          nextLabel={totalPages > 1 ? <ArrowRightIcon className="w-5 h-6" /> : null}
          pageCount={totalPages}
          onPageChange={handlePageClick}
          previousClassName={totalPages != 1 ? 'inline-block rounded-md bg-app_primary p-1 px-[0.5rem] text-white' : ''}
          nextClassName={totalPages != 1 ? 'inline-block rounded-md bg-app_primary p-1 px-[0.5rem] text-white' : ''}
          pageClassName="inline-block p-1 px-[0.5rem] rounded-md bg-app_secondary hover:opacity-50 min-w-[2rem] text-center"
          activeLinkClassName="text-white font-bold "
          activeClassName="inline-block rounded-md !bg-app_primary p-1 px-[0.5rem] text-white"
          breakLabel="..."
          pageRangeDisplayed={5}
          renderOnZeroPageCount={null}
          forcePage={props.currentPage - 1}
        />
      </div>
    </>
  );
};
