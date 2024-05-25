import {
  Button,
  Dialog,
  DialogBody, DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import { path } from '~/constants';
import nosh_search from '~/assets/nosh_search.png';
import { Novel } from '~/models/Novel';
import { apiSearchNovel, apiGetNovelChapter } from '~/apis';
import Spinner from './Spinner';
import { NovelSearchCard } from '.';

interface Chapter {
  label: string;
  slug: string;
  name: string;
  chapterIndex: string;
}

export interface ReadNovelDialogProps {
  open: boolean,
  handleClose?: () => void,
  server: any,
  title: string,
  namePage: string,
  chapterIndex: string,
}
export const ReadNovelDialog = (props: ReadNovelDialogProps) => {
  const { open, handleClose, server, title, namePage, chapterIndex } = props
  const [novels, setNovels] = useState<Novel[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(true);
  const [isLoadingChapter, setIsLoadingChapter] = useState(true);
  const [keyword, setKeyword] = useState(title);
  const [chapterChangeServer, setChapterChangeServer] = useState<any>('');

  const handleChange = (e: any) => {
    setKeyword(e.target.value);
  };

  const fetchSearchNovel = async (keyword: string) => {
    setIsLoadingSearch(true)
    const result: any = await apiSearchNovel({ server, keyword, page: 1, perPage: 1 });
    if (result) {
      setNovels(result.data);
    }
    console.log(result)
    if (namePage === 'reader' && result.data.length > 0) {
      setIsLoadingChapter(true)
      const chapter: any = await apiGetNovelChapter({ server, novelSlug: result.data[0].novelSlug, page: parseInt(chapterIndex), perPage: 1 });
      console.log(chapter)
      if (chapter.data.length > 0) {
        setChapterChangeServer(chapter.data[0]);
      } else {
        const chapterEnd: any = await apiGetNovelChapter({ server, novelSlug: result.data[0].novelSlug, page: chapter.total, perPage: 1 });
        console.log(chapterEnd)
        if (chapterEnd.data.length > 0) {
          setChapterChangeServer(chapterEnd.data[0]);
        }
      }
    }
  };

  useEffect(() => {
    setIsLoadingSearch(false);
  }, [novels, chapterChangeServer])

  useEffect(() => {
    setIsLoadingChapter(false);
  }, [chapterChangeServer])

  useEffect(() => {

    fetchSearchNovel(title);
  }, [server, title])

  const handleSearch = () => {
    fetchSearchNovel(keyword)
  }
  return (
    <>
      <Dialog
        open={open}
        size={"xl"}
        handler={handleClose}>
        <DialogHeader className="justify-between">
          <div>
          </div>
          <div>
            <Typography variant="h5" className="text-app_primary">
              Truyện tương tự
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
        <DialogBody className="p-0">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row space-x-2 p-0 text-app_tertiary">
              <Typography variant="h6">Server: </Typography>
              <Typography variant="h6">{server}</Typography>
            </div>
            <div className="search-input flex flex-row mt-5 w-[40rem]">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute text-app_primary inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </div>
                <input
                  //{...register('keyword')}
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-app_primary text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2 text-dark outline-none focus:outline-none "
                  placeholder="Nhập tên truyện..."
                  defaultValue={title}
                  onChange={handleChange}
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center gap-4  border border-app_primary"
                  style={{
                    backgroundColor: '#D1F4BC',
                    borderTopRightRadius: '0.375rem',
                    borderBottomRightRadius: '0.375rem',
                  }}
                >
                  <button
                    style={{
                      backgroundImage: `url(${nosh_search})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                    onClick={handleSearch}
                    className="hover:opacity-50 w-10 h-10 rounded bg-none"
                    children={undefined}
                  />
                </div>
              </div>
            </div>
          </div>
          {isLoadingSearch || isLoadingChapter ? <div className='my-5'><Spinner></Spinner></div> :
            <div className="novel-history p-3 mt-3">
              {novels && novels.length > 0 ? (
                novels.map((novel, index) => (
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
                        namePage={namePage}
                        server={server}
                        chapter={chapterChangeServer}
                      />
                    )}
                  </div>
                ))
              ) : (
                novels.length === 0 && <div className="text-xl mx-auto text-center">Không tìm thấy kết quả ¯\_(ツ)_/¯</div>
              )}
            </div>
          }
        </DialogBody>
        <DialogFooter className={'text-center justify-center'}>
        </DialogFooter>
      </Dialog>
    </>
  )
}