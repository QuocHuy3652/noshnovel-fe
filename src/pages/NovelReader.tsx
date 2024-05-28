import React, { useEffect, useState, useRef } from 'react';
import { SourceNovel } from '~/pages/NovelDetails.tsx';
import { Button, IconButton, Typography } from '@material-tailwind/react';
import { Novel } from '~/models';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid';
import { ChapterCatergoriesDialog } from '~/components/ChapterCatergoriesDialog.tsx';
import { SettingDialog } from '~/components/SettingDialog.tsx';
import { DownloadNovelDialog } from '~/components/DownloadNovelDialog.tsx';
import {
  apiGetNovelContent,
  apiNovelDetail,
  apiGetFileNameExtension,
  apiPostNovelDownload,
  apiGetNovelChapter,
} from '~/apis';
import { json, useLocation } from 'react-router-dom';
import { useServerStore } from '~/store/useServerStore';
import Loading from '~/components/Loading';
import { updateHistory } from '~/utils/fn';
import { path } from '~/constants';
import { useForm } from 'react-hook-form';
import { ReadNovelDialog } from '~/components/ReadNovelDialog.tsx';
import Select from 'react-select';
import { useDownloadStore } from '~/store/useDownloadStore';
import { useNavigate } from 'react-router-dom';

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
  chapterIndex: string;
}

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: 'white',
    borderColor: 'green',
    borderRadius: '0.375rem',
    padding: '0.3rem',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'blue',
    },
    textAlign: 'center',
    fontSize: '13px',
    caretColor: 'transparent',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? 'white' : 'black',
    backgroundColor: state.isSelected ? 'blue' : 'white',
    padding: '0.5rem',
  }),

  menu: (provided: any) => ({
    ...provided,
    zIndex: 9999,
    paddingLeft: '0.5rem',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'translateX(3rem)',
  }),
};

export const NovelReader = (props: NovelReaderProps) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const params = {
    server: searchParams.get('server'),
    novelSlug: searchParams.get('novelSlug'),
    chapterSlug: searchParams.get('chapterSlug'),
    chapterIndex: searchParams.get('chapterIndex'),
  };
  const { serverList } = useServerStore();
  const sources = serverList.map((name) => ({ name }));
  const { register, handleSubmit, setValue } = useForm();
  const [currentTitle, setCurrentTitle] = React.useState<string>('');
  const [currentServer, setCurrentServer] = useState<any>({ value: params.server, label: params.server });
  const [currentChapter, setCurrentChapter] = React.useState<any>('');
  const [prevChapter, setPrevChapter] = React.useState<any>('');
  const [nextChapter, setNextChapter] = React.useState<any>('');
  const [currentContent, setCurrentContent] = React.useState<string>('');
  const [openChapterCategories, setOpenChapterCategories] = React.useState<boolean>(false);
  const [openSettings, setOpenSettings] = React.useState<boolean>(false);
  const [openDownload, setOpenDownload] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalChapter, setTotalChapter] = useState(0);
  const endOfPageRef = useRef<HTMLDivElement | null>(null);
  const [showButton, setShowButton] = useState(false);
  const { novelSlug, chapterSlug, server } = params;
  const chapterIndex: any = params.chapterIndex;
  const [author, setAuthor] = useState('');
  const [openReadDialog, setOpenReadDialog] = useState(false);
  const { fileExtensions } = useDownloadStore();
  const [listChapterEnds, setListChapterEnds] = useState<Chapter[]>([]);
  const [isdownloading, setIsdownloading] = useState(false);
  const [serverChange, setServerChange] = useState(server);

  const defaultSetting = JSON.parse(localStorage.getItem('defaultSetting') || '{}');
  const { defaultFontColor, defaultFontSize, defaultFontFamily, defaultBackgroundColor, defaultLineHeight } =
    defaultSetting;
  const [textColor, setTextColor] = useState(defaultFontColor ?? 'black');
  const [fontSize, setFontSize] = useState(defaultFontSize ?? '18px');
  const [fontFamily, setFontFamily] = useState(defaultFontFamily ?? 'Arial');
  const [bgColor, setBgColor] = useState(defaultBackgroundColor ?? 'white');
  const [lineHeight, setLineHeight] = useState(defaultLineHeight ?? 1.5);
  const navigate = useNavigate();

  const fetchChapters = async (page: number = 1, perPage: number = 1) => {
    try {
      const response: any = await apiGetNovelChapter({ novelSlug, server, page, perPage });
      console.log('response: ', response);
      if (perPage === 1) {
        setTotalChapter(response.total);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      const result: any = await apiGetNovelContent(params);
      const author: any = await apiNovelDetail({ server: params.server, novelSlug: params.novelSlug });
      if (result) {
        setCurrentTitle(result.title);
        setCurrentChapter(result.chapter);
        setCurrentContent(result.content.replace(/\r\n|\n/g, '<br/>'));
        if (author) {
          setAuthor(author.author.name);
        }
      }
      window.scrollTo(0, 0);
      setIsLoading(false);
    };
    fetchChapters(parseInt(chapterIndex), 1);
    fetchContent();
  }, [server, novelSlug, chapterSlug, chapterIndex]);

  useEffect(() => {
    const fetchPrevNextChapters = async () => {
      if (parseInt(chapterIndex) === 1) {
        const next = await fetchChapters(parseInt(chapterIndex) + 1, 1);
        setNextChapter(next.data[0]);
      } else if (parseInt(chapterIndex) === totalChapter) {
        const prev = await fetchChapters(parseInt(chapterIndex) - 1, 1);
        setPrevChapter(prev.data[0]);
      } else {
        const next = await fetchChapters(parseInt(chapterIndex) + 1, 1);
        const prev = await fetchChapters(parseInt(chapterIndex) - 1, 1);
        setNextChapter(next.data[0]);
        setPrevChapter(prev.data[0]);
      }
    };
    // Gọi hàm async
    if (novelSlug && server) {
      fetchPrevNextChapters();
    }
  }, [novelSlug, server, chapterIndex]);

  useEffect(() => {
    const fetchChapterEnds = async () => {
      if (parseInt(chapterIndex) >= 6) {
        const result = await fetchChapters(2, parseInt(chapterIndex) - 1);
        if (result) {
          setListChapterEnds(result.data.slice(0, 5));
        }
      } else {
        const result = await fetchChapters(1, 10);
        if (result) {
          setListChapterEnds(result.data.slice(parseInt(chapterIndex) - 1, parseInt(chapterIndex) + 4));
        }
      }
    };

    fetchChapterEnds();
  }, []);

  const getPreviousChapter = () => {
    if (parseInt(chapterIndex) > 1) {
      const prevChapterSlug = prevChapter.slug;
      const prevChapterIndex = prevChapter.chapterIndex;
      updateHistory(server, novelSlug, prevChapter.slug, prevChapterIndex, prevChapter.label);
      navigate(
        `/${path.READER}?server=${server}&novelSlug=${novelSlug}&chapterSlug=${prevChapterSlug}&chapterIndex=${prevChapterIndex}`,
      );
    }
  };

  const getNextChapter = () => {
    if (parseInt(chapterIndex) < totalChapter) {
      const nextChapterSlug = nextChapter.slug;
      const nextChapterIndex = nextChapter.chapterIndex;
      updateHistory(server, novelSlug, nextChapter.slug, nextChapterIndex, nextChapter.label);
      navigate(
        `/${path.READER}?server=${server}&novelSlug=${novelSlug}&chapterSlug=${nextChapterSlug}&chapterIndex=${nextChapterIndex}`,
      );
    }
  };

  const onDownload = () => {};

  const handleSave = () => {};
  // TODO: fetch source list and handle download novel with that source

  const handleDownload = async (selectedFileExt: any, chapterEnd: any) => {
    setIsdownloading(true);
    const chapterSlugs = listChapterEnds
      .slice(
        listChapterEnds.findIndex((e) => e.slug === currentChapter.slug),
        listChapterEnds.findIndex((e) => e.slug === chapterEnd) + 1,
      )
      .map((e) => e.slug);
    const response: any = await apiPostNovelDownload({
      server,
      fileExtension: selectedFileExt,
      novelSlug,
      novelStyling: '',
      chapterSlugs,
    });
    const fileExtension = `.${selectedFileExt}`;
    const url = window.URL.createObjectURL(response);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', novelSlug + fileExtension); // Đặt tên file tải về
    document.body.appendChild(link);
    link.click();
    // Xóa URL tạm thời sau khi tải xong
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
    setIsdownloading(false);
  };

  const handleSaveSetting = () => {};

  const toggleMenuDialog = (isOpen: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(isOpen);
  };

  const checkScrollHeight = () => {
    if (window.scrollY > 500) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollHeight);

    return () => {
      window.removeEventListener('scroll', checkScrollHeight);
    };
  }, []);

  const scrollToBottom = () => {
    try {
      const targetPosition = endOfPageRef.current?.offsetTop || 0;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 2000;
      let start: number | null = null;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        if (progress < duration) window.requestAnimationFrame(step);
      };

      window.requestAnimationFrame(step);
    } catch (error) {
      console.error(error);
    }
  };

  const scrollToTop = () => {
    try {
      const targetPosition = 0;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 2000;
      let start: number | null = null;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        if (progress < duration) window.requestAnimationFrame(step);
      };

      window.requestAnimationFrame(step);
    } catch (error) {
      console.error(error);
    }
  };

  const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  };
  const handleChangeServer = (data: any) => {
    if (data !== server) {
      setOpenReadDialog(true);
      setServerChange(data);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading></Loading>
      ) : (
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
            {author !== '' && (
              <div className="novel-author">
                <Typography
                  className="text-app_primary"
                  variant="h5"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Tác giả: {author}
                </Typography>
              </div>
            )}
            <div className="novel-source flex flex-row w-full justify-end">
              <div className="flex flex-row">
                {sources.map((source) => (
                  <Button
                    key={source.name}
                    className={`border-app_primary mt-2 text-app_primary border-2 ml-2 ${source.name !== params.server ? 'bg-white' : 'bg-app_primary text-white'}`}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    onClick={() => {
                      setCurrentServer(source.name);
                      setValue('genre', source.name);
                      handleChangeServer(source.name);
                    }}
                  >
                    {source.name}
                  </Button>
                ))}
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
              <div
                style={{
                  color: textColor ?? 'var(--color-app_primary)',
                  lineHeight: lineHeight ?? 1.5,
                  fontSize: fontSize ?? '1rem',
                  fontFamily: fontFamily ?? 'Arial, Helvetica, sans-serif',
                  backgroundColor: bgColor ?? 'var(white)',
                }}
                className="py-[3rem] h-full rounded-xl page-detail bg-white min-w-[70vw] flex flex-col"
              >
                <div className="chapter-name text-center">
                  <Typography
                    // className="text-app_primary"
                    variant="h4"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {currentChapter.label ?? ''}
                  </Typography>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: currentContent }}
                  className="novel-content text-justify text-left p-[3rem]"
                ></div>
              </div>
            </div>
            <div className="novel-reader-bottom-action flex justify-center space-x-5 mt-5" ref={endOfPageRef}>
              <Button
                className="bg-app_tertiary text-white flex"
                label="Back"
                onClick={getPreviousChapter}
                disabled={parseInt(chapterIndex) === 1}
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Chương trước
              </Button>
              <Button
                className="bg-app_tertiary text-white flex"
                label="Next"
                onClick={getNextChapter}
                disabled={parseInt(chapterIndex) === totalChapter}
              >
                Chương sau
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </Button>
              {showButton && (
                <button
                  onClick={scrollToTop}
                  className="fixed top-[200px] right-8 rounded-md bg-app_primary shadow-none hover:bg-app_tertiary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-[2.5rem] h-[2.5rem]"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 19V5m7 7l-7-7-7 7" />
                  </svg>
                </button>
              )}
              {showButton && (
                <button
                  onClick={scrollToBottom}
                  className="fixed bottom-[200px] right-8 rounded-md bg-app_primary shadow-none hover:bg-app_tertiary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-[2.5rem] h-[2.5rem]"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <ChapterCatergoriesDialog
        open={openChapterCategories}
        handleSave={handleSave}
        handleClose={() => toggleMenuDialog(false, setOpenChapterCategories)}
        params={params}
      />
      <SettingDialog
        open={openSettings}
        handleClose={() => toggleMenuDialog(false, setOpenSettings)}
        setFontFamily={setFontFamily}
        setFontSize={setFontSize}
        setBackgroundColor={setBgColor}
        setFontColor={setTextColor}
        setLineHeight={setLineHeight}
        // handleSave={handleSaveSetting}
      />
      <DownloadNovelDialog
        open={openDownload}
        handleClose={() => toggleMenuDialog(false, setOpenDownload)}
        handleDownload={handleDownload}
        listFileNameExtensions={fileExtensions}
        chapterStart={currentChapter}
        listChapterEnds={listChapterEnds}
        isdownloading={isdownloading}
      />
      {openReadDialog ? (
        <ReadNovelDialog
          open={openReadDialog}
          handleClose={() => setOpenReadDialog(false)}
          server={serverChange}
          title={currentTitle}
          namePage="reader"
          chapterIndex={chapterIndex}
        />
      ) : (
        <></>
      )}
    </>
  );
};
