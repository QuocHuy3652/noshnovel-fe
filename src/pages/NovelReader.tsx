import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { SourceNovel } from '~/pages/NovelDetails.tsx';
import { Button, IconButton, Option, Select, Typography } from '@material-tailwind/react';
import { Novel } from '~/models';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid';
import { ChapterCatergoriesDialog } from '~/components/ChapterCatergoriesDialog.tsx';
import { SettingDialog } from '~/components/SettingDialog.tsx';
import { DownloadNovelDialog } from '~/components/DownloadNovelDialog.tsx';
import { apiGetNovelContent } from '~/apis';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useServerStore } from '~/store/useServerStore';
import Loading from '~/components/Loading';
import { useChapterStore } from '~/store';
import { toSlug } from '~/utils/fn';

export interface NovelReaderProps {
  sources?: SourceNovel[];
  novel?: Novel;
}

interface OptionType {
  label: string;
  value: string;
}
interface Chapter {
  label: string;
  slug: string;
  name: string;
}

export const NovelReader = (props: NovelReaderProps) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const params = {
    server: searchParams.get('server'),
    novelSlug: searchParams.get('novelSlug'),
    chapterSlug: searchParams.get('chapterSlug'),
  };
  const { serverList } = useServerStore();
  const serverOptions: OptionType[] = serverList.map((server) => ({ value: server, label: server }));

  const [currentTitle, setCurrentTitle] = React.useState<string>('');
  const [currentServer, setCurrentServer] = useState(params.server);
  const [currentChapter, setCurrentChapter] = React.useState<string>('');
  const [currentContent, setCurrentContent] = React.useState<string>('');
  const [openChapterCategories, setOpenChapterCategories] = React.useState<boolean>(false);
  const [openSettings, setOpenSettings] = React.useState<boolean>(false);
  const [openDownload, setOpenDownload] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { chapterList, setCurrentChapterList, isLoad } = useChapterStore();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const navigate = useNavigate();
  const { novelSlug, chapterSlug, server } = params;

  useEffect(() => {
    if (novelSlug && server) {
      setCurrentChapterList(novelSlug, server);
    }
  }, [novelSlug, server]);

  useEffect(() => {
    if (!isLoading) {
      setChapters(chapterList);
    }
  }, [chapterList, isLoading]);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      const result: any = await apiGetNovelContent(params);
      if (result) {
        setCurrentTitle(result.title);
        setCurrentChapter(result.chapter.label);
        setCurrentContent(result.content.replace(/\r\n/g, '<br/>'));
      }
      setIsLoading(false);
      window.scrollTo(0, 0);
    };

    fetchContent();
  }, [currentChapter]);

  const getPreviousChapter = () => {
    console.log(currentChapter);
    const currentIndex = chapters.findIndex((chapter) => chapter.label === currentChapter);
    if (currentIndex > 0) {
      const prevChapter = chapters[currentIndex - 1];
      const prevChapterSlug = chapters[currentIndex - 1].slug;
      setCurrentChapter(prevChapter.label);
      navigate(`/novel-reader?server=${server}&novelSlug=${novelSlug}&chapterSlug=${prevChapterSlug}`);
    }
  };

  const getNextChapter = () => {
    const currentIndex = chapters.findIndex((chapter) => chapter.label === currentChapter);
    if (currentIndex < chapters.length - 1) {
      const nextChapter = chapters[currentIndex + 1];
      const nextChapterSlug = nextChapter.slug;
      setCurrentChapter(nextChapter.label);
      navigate(`/novel-reader?server=${server}&novelSlug=${novelSlug}&chapterSlug=${nextChapterSlug}`);
    }
  };

  const onDownload = () => {};

  const handleSave = () => {};

  const handleDownload = () => {};

  const handleSaveSetting = () => {};

  const toggleMenuDialog = (isOpen: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(isOpen);
  };
  // const { sources = [
  //   {
  //     name: 'Truyenfull'
  //   },
  //   {
  //     name: 'Tangthuvien'
  //   },
  //   {
  //     name: 'TruyenXYZ'
  //   }], novel } = props

  return (
    <>
      {isLoading && <Loading />}
      <div className="wrapper w-full h-full flex flex-col items-center justify-center px-[10rem] mt-[2rem]">
        <div className="novel-wrapper text-center">
          <div className="novel-title">
            <Typography
              className="text-app_primary"
              variant="h3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {currentTitle}
            </Typography>
          </div>
          {/* <div className="novel-author">
            <Typography className="text-app_primary" variant="h5" placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}>
              {novel?.author?.name ?? 'Robin Sarma'}
            </Typography>
          </div> */}
          <div className="novel-source flex flex-row w-full justify-end">
            <div className="w-[10rem] mr-[3rem]">
              <Select
                className="bg-white"
                label="Chọn nguồn truyện"
                success
                placeholder={'Chọn nguồn truyện'}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {serverOptions.map((source, index) => {
                  return (
                    <Option key={index} value={source.value}>
                      {source.label}
                    </Option>
                  );
                })}
              </Select>
            </div>
          </div>
          <div className="novel-body flex flex-row mt-[1rem] space-x-5 ">
            <div className="max-h-[8rem] fixed ml-[-3rem] py-1 action-menu bg-app_primary rounded-xl justify-center items-center align-middle flex flex-col w-[3rem]">
              <IconButton
                onClick={() => toggleMenuDialog(true, setOpenChapterCategories)}
                className="bg-transparent shadow-none hover:bg-app_tertiary"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </IconButton>
              <IconButton
                onClick={() => toggleMenuDialog(true, setOpenSettings)}
                className="bg-transparent shadow-none hover:bg-app_tertiary"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                  />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </IconButton>
              <IconButton
                onClick={() => toggleMenuDialog(true, setOpenDownload)}
                className="bg-transparent shadow-none hover:bg-app_tertiary"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </IconButton>
            </div>
            <div className="py-[3rem] h-full rounded-xl page-detail bg-white w-[70vw] flex flex-col">
              <div className="chapter-name text-center">
                <Typography
                  className="text-app_primary"
                  variant="h4"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {currentChapter ?? ''}
                </Typography>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: currentContent }}
                className="novel-content text-black text-justify text-[30px] p-[3rem]"
              ></div>
            </div>
          </div>
          <div className="novel-reader-bottom-action flex justify-center space-x-5 mt-5">
            <Button
              className="bg-app_tertiary text-white flex"
              label="Back"
              onClick={getPreviousChapter}
              disabled={currentChapter === chapters[0]?.label}
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Chương trước
            </Button>
            <Button
              className="bg-app_tertiary text-white flex"
              label="Next"
              onClick={getNextChapter}
              disabled={currentChapter === chapters[chapters.length - 1]?.label}
            >
              Chương sau
              <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <ChapterCatergoriesDialog
        open={openChapterCategories}
        handleSave={handleSave}
        handleClose={() => toggleMenuDialog(false, setOpenChapterCategories)}
      />
      <SettingDialog
        open={openSettings}
        handleClose={() => toggleMenuDialog(false, setOpenSettings)}
        handleSave={handleSaveSetting}
      />
      <DownloadNovelDialog
        open={openDownload}
        handleClose={() => toggleMenuDialog(false, setOpenDownload)}
        handleDownload={handleDownload}
      />
    </>
  );
};
