import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton, Input, Menu, MenuHandler, MenuItem, MenuList, Option, Select,
  Typography,
} from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Spinner from '~/components/Spinner';
import { ArrowDownIcon } from '@heroicons/react/16/solid';

interface Chapter {
  label: string;
  slug: string;
  name: string;
}

export interface DownloadNovelDialogProps {
  open: boolean;
  handleClose: () => void;
  handleDownload: (a: any, b: any) => void;
  listFileNameExtensions: string[];
  chapterStart: any;
  listChapterEnds: Chapter[];
  isdownloading: boolean
}
export const DownloadNovelDialog = (props: DownloadNovelDialogProps) => {
  const { open, handleClose, handleDownload, listFileNameExtensions, chapterStart, listChapterEnds, isdownloading } = props;
  const { setValue } = useForm();
  const [selectedFileExt, setSelectedFileExt] = useState<any>('');
  const [chapterEnd, setChapterEnd] = useState<any>(chapterStart.slug);

  useEffect(() => {
    if (listFileNameExtensions.length > 0) {
      setSelectedFileExt(listFileNameExtensions[0]);
    }
  }, [listFileNameExtensions]);

  useEffect(() => {
    if (chapterStart.slug) {
      setChapterEnd(chapterStart.slug);
    }
  }, [chapterStart]);

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
            <div className="flex flex-col space-y-10">
              <Typography variant="h6" className="text-app_primary">Từ:</Typography>
              <Typography variant="h6" className="text-app_primary">Đến:</Typography>
            </div>
            <div className="flex flex-col basis-2/3 space-y-6">
              <Input label='Chương bắt đầu' value={chapterStart.label} readOnly></Input>
              <Select
                id='chapterEnd'
                label="Chương kết thúc"
                // value={listChapterEnds[listChapterEnds.findIndex(e => e.slug === chapterEnd)].label}
                value={chapterEnd}
                onChange={(val) => {
                  setChapterEnd(val);
                  setValue('chapterEnd', val);
                }}
              >
                {listChapterEnds.map((val, index) => {
                  return (
                    <Option key={index} value={val.slug}>
                      {val.label}
                    </Option>
                  );
                })}
              </Select>
              {/*/!* <Input type="number" label="Số chương" /> *!/*/}
              {/*<Select*/}
              {/*  id='fileExt'*/}
              {/*  label="Đuôi tệp"*/}
              {/*  value={selectedFileExt}*/}
              {/*  onChange={(val) => {*/}
              {/*    setSelectedFileExt(val);*/}
              {/*    setValue('fileExt', val);*/}
              {/*  }}>*/}
              {/*  {listFileNameExtensions.map((val, index) => {*/}
              {/*    return (*/}
              {/*      <Option key={index} value={val}>*/}
              {/*        {val}*/}
              {/*      </Option>*/}
              {/*    );*/}
              {/*  })}*/}
              {/*</Select>*/}
            </div>
          </div>
        </DialogBody>
        <DialogFooter className={'text-center justify-center'} >
          {
            isdownloading ? <Spinner></Spinner> :
              (
                <Menu
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                >
                  <MenuHandler>
                    <Button className="text-white bg-app_tertiary flex flex-row space-x-1">
                      <p>Download</p>
                      <ArrowDownIcon
                        strokeWidth={2}
                        className="h-4 w-4"
                      />
                    </Button>
                  </MenuHandler>
                  <MenuList className="z-[10000]">
                    {
                      listFileNameExtensions.map((val, index) => {
                        return (
                          <MenuItem
                            key={index}
                            onClick={() => {
                              handleDownload(val, chapterEnd);
                              setValue('source', val);
                            }}
                          >
                            {val}
                          </MenuItem>
                        );
                      })
                    }
                  </MenuList>
                </Menu>)
          }
        </DialogFooter>
      </Dialog>
    </>
  );
}