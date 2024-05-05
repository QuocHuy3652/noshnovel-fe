import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';

export interface ChapterListProps {
  item: string[];
  totalRow?: number;
  totalCol?: number;
}

export const ChapterList = (props:ChapterListProps) => {
  const { item, totalRow = 1, totalCol = 1 } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = totalRow * totalCol;

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (<>
    <div className="chapter-list wrapper flex flex-col">
      <div className="grid grid-cols-4 gap-4">
        <div>Chương 1</div>
        <div>Chương 2</div>
        <div>Chương 3</div>
        <div>Chương 4</div>
        <div>Chương 5</div>
        <div>Chương 6</div>
        <div>Chương 7</div>
        <div>Chương 8</div>
        <div>Chương 9</div>
        <div>Chương 10</div>
        <div>Chương 11</div>
        <div>Chương 12</div>
        <div>Chương 13</div>
        <div>Chương 14</div>
        <div>Chương 15</div>
        <div>Chương 16</div>
        <div>Chương 17</div>
        <div>Chương 18</div>
        <div>Chương 19</div>
        <div>Chương 20</div>
        <div>Chương 21</div>
        <div>Chương 22</div>
        <div>Chương 23</div>
        <div>Chương 24</div>
        <div>Chương 25</div>
        <div>Chương 26</div>
        <div>Chương 27</div>
        <div>Chương 28</div>
        <div>Chương 29</div>
        <div>Chương 30</div>
        <div>Chương 31</div>
        <div>Chương 32</div>
        <div>Chương 33</div>
        <div>Chương 34</div>
        <div>Chương 35</div>
        <div>Chương 36</div>
        <div>Chương 37</div>
        <div>Chương 38</div>
        <div>Chương 39</div>
        <div>Chương 40</div>
      </div>

      <ReactPaginate
        className="w-full mt-[5rem] flex flex-row justify-center items-center space-x-5"
        previousLabel={<ArrowLeftIcon className="w-5 h-5"/>}
        nextLabel={<ArrowRightIcon className="w-5 h-5"/>}
        pageCount={Math.ceil(10 / itemsPerPage)}
        onPageChange={handlePageClick}
        previousClassName="inline-block rounded-xl bg-app_primary p-2 text-white"
        nextClassName="inline-block rounded-xl bg-app_primary p-2 text-white"
        pageClassName="inline-block p-2 rounded-xl bg-app_secondary hover:opacity-50 w-[2rem] text-center"
        activeClassName="inline-block"
        breakLabel="..."
        pageRangeDisplayed={5}
        renderOnZeroPageCount={null}
      />
    </div>
  </>)
}