import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton, Input, Option, Select,
  Typography,
} from '@material-tailwind/react';
import React from 'react';


export interface DownloadNovelDialogProps {
  open: boolean;
  handleClose: () => void;
  handleDownload: () => void;
}
export const DownloadNovelDialog = (props:DownloadNovelDialogProps) => {
  const { open, handleClose, handleDownload } = props;

  return (
    <>
      <Dialog
        open={open}
        size={"sm"}
        handler={handleClose}>
        <DialogHeader className="justify-between">
          <div>
          </div>
          <div>
            <Typography variant="h5" color="blue-gray">
              Tải tiểu thuyết
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
          <div className="flex flex-row basis-1/3 space-x-4">
            <div className="flex flex-col space-y-4">
              <Typography variant="h6" className="text-app_primary">Chương bắt đầu:</Typography>
              <Typography variant="h6" className="text-app_primary">Số chương:</Typography>
            </div>
            <div className="flex flex-col basis-2/3 space-y-6">
              <Select label="Select Version">
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
              </Select>
              <Input type="number" label="Số chương" />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className={'text-center justify-center'} >
          <Button
            // variant="gradient"
            className="!bg-app_primary hover:opacity-60"
            onClick={handleDownload}>
            <span>Download</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}