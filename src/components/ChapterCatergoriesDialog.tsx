import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import { ChapterList } from '~/components/ChapterList.tsx';
import { apiGetNovelChapter } from '~/apis';
import { toSlug } from '~/utils/fn';
import { createSearchParams, useLocation } from 'react-router-dom';
import { path } from '~/constants';
import Loading from '~/components/Loading';
import { updateHistory } from '~/utils/fn';

export interface ChapterCatergoriesDialog {
  open: boolean;
  handleClose: () => void;
  handleSave: () => void;
  params: any;
}

export const ChapterCatergoriesDialog = (props: ChapterCatergoriesDialog) => {
  const [size, setSize] = React.useState(null);
  const { open, handleClose, handleSave, params } = props;
  const [chapters, setChapters] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(Math.ceil(params.chapterIndex / itemsPerPage));
  const [isChangePage, setIsChangePage] = useState(false);
  const [currentChapterSlug, setCurrentChapterSlug] = useState('');

  // TODO: get novel slug & server
  const novelSlug = params.novelSlug;
  const server = params.server;

  const fetchChapters = async (page: number = 1) => {
    try {
      const response: any = await apiGetNovelChapter({ novelSlug, server, page, perPage: itemsPerPage });
      const currentIndex = response.data.findIndex((e: { chapterIndex: any; }) => e.chapterIndex === parseInt(params.chapterIndex));
      if (currentIndex >= 0) setCurrentChapterSlug(response.data[currentIndex].slug);
      setChapters(response.data);
      setTotalItems(response.total);
      setTotalPages(response.totalPages);
      setItemsPerPage(response.perPage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsChangePage(false);
    }
  };

  useEffect(() => {
    fetchChapters(currentPage);
  }, [novelSlug]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setIsChangePage(true);
    fetchChapters(page);
  };

  const handleReadNovel = (data: any) => {
    const param: any = {};
    param.server = params.server?.toString();
    param.novelSlug = params.novelSlug?.toString();
    param.chapterSlug = toSlug(data.slug);
    param.chapterIndex = data.chapterIndex;
    updateHistory(param.server, param.novelSlug, param.chapterSlug, param.chapterIndex, data.label);
    window.location.href = `${path.READER}?${createSearchParams(param).toString()}`;
  };

  return (
    <>
      <Dialog open={open} size={size || 'lg'} handler={handleClose}>
        <DialogHeader className="justify-between">
          <div></div>
          <div>
            <Typography variant="h5" color="blue-gray">
              Danh sách chương
            </Typography>
          </div>
          <IconButton color="blue-gray" size="sm" variant="text" onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className="px-[3rem]">
          <ChapterList
            item={chapters}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onReadNovel={handleReadNovel}
            chapterSlug={currentChapterSlug}
            isInsert={false}
          />
          {isChangePage && <Loading isBlur={false}></Loading>}
        </DialogBody>
        {/* <DialogFooter className={'text-center justify-center'} >
          <Button
            variant="filled"
            color="red"
            onClick={handleClose}
            className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button
            // variant="gradient"
            className="!bg-app_primary hover:opacity-60"
            onClick={handleSave}>
            <span>Confirm</span>
          </Button>
        </DialogFooter> */}
      </Dialog>
    </>
  );
};
