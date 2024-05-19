import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import React, { useState } from 'react';
import { ChapterList } from '~/components/ChapterList.tsx';
import { apiGetNovelChapter } from '~/apis';


export interface ChapterCatergoriesDialog {
  open: boolean;
  handleClose: () => void;
  handleSave: () => void;
}

export const ChapterCatergoriesDialog = (props:ChapterCatergoriesDialog) => {
  const [ size, setSize] = React.useState(null);
  const { open, handleClose, handleSave } = props;
  const [chapters, setChapters] = useState([{
    label: 'Chương 1' ,
    slug: 'chapter-1',
    name: 'Phim con heo',
  },
    {
      label: 'Chương 1' ,
      slug: 'chapter-1',
      name: 'Phim con lợn',
    },
    {
      label: 'Chương 1' ,
      slug: 'chapter-1',
      name: 'Phim con gà',
    },
    {
      label: 'Chương 1' ,
      slug: 'chapter-1',
      name: 'Phim con mèo',
    },
    {
      label: 'Chương 1' ,
      slug: 'chapter-1',
      name: 'Phim con heo',
    },
    {
      label: 'Chương 1' ,
      slug: 'chapter-1',
      name: 'Phim con lợn',
    },
    {
      label: 'Chương 1' ,
      slug: 'chapter-1',
      name: 'Phim con gà',
    },
    {
      label: 'Chương 1' ,
      slug: 'chapter-1',
      name: 'Phim con mèo',
    },{
      label: 'Chương 1' ,
      slug: 'chapter-1',
      name: 'Phim con heo',
    },
    {
      label: 'Chương 1' ,
      slug: 'chapter-1',
      name: 'Phim con lợn',
    },
    {
      label: 'Chương 1' ,
      slug: 'chapter-1',
      name: 'Phim con gà',
    },
    {
      label: 'Chương 1' ,
      slug: 'chapter-1',
      name: 'Phim con mèo',
    }]);
  const [itemsPerPage, setItemsPerPage] = useState(40);
  const [totalItems, setTotalItems] = useState(10);
  const [totalPages, setTotalPages] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // TODO: get novel slug & server
  const novelSlug = 'novel'
  const server = 'tangthuvien.vn'

  const fetchChapters = async (page: number = 1) => {
    try {
      setIsLoading(true);
      const response: any = await apiGetNovelChapter({ novelSlug, server, page });
      setChapters(response.data);
      setTotalItems(response.total);
      setTotalPages(response.totalPages);
      setItemsPerPage(response.perPage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchChapters(page);
  };

  return (
    <>
      <Dialog
        open={open}
        size={size || "lg"}
        handler={handleClose}>
        <DialogHeader className="justify-between">
          <div>
          </div>
          <div>
            <Typography variant="h5" color="blue-gray">
            Danh sách chương
            </Typography>
          </div>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
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
          />
        </DialogBody>
        <DialogFooter className={'text-center justify-center'} >
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
        </DialogFooter>
      </Dialog>
    </>
  )
}