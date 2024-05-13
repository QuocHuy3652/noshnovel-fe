import nosh_bg_v from '/src/assets/nosh_bg_v.png';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import novel_cover from '/src/assets/novel_cover.jpg';
import { Button, Rating, TabsBody, Typography, Tab, TabPanel, Tabs, TabsHeader } from '@material-tailwind/react';
import React from 'react';
import { Category, CategoryChips } from '~/components/CategoryChips.tsx';
import { ChapterList } from '~/components';
import { useServerStore } from '~/store/useServerStore';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiNovelDetail } from '~/apis';

export interface SourceNovel {
  name?: string;
  url?: string;
  sourceHandlerFn: () => void;
}

export interface Category {
  name: string;
  handler?: () => void;
}

export interface NovelDetails {
  title: string;
  status: string;
  reviewsNumber: number;
  rating: number;
  description: string;
  coverImage: string;
  genres: Category[];
  author: object;
}

export const NovelDetails = () => {
  const { serverList } = useServerStore();
  const sources = serverList.map((name) => ({ name }));
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const novelSlug = searchParams.get('novelSlug');
  const server = localStorage.getItem('selectedServer');
  const [selectedServer, setSelectedServer] = useState(server);
  const [isAvailable, setIsAvailable] = useState(true);

  const [novelDetail, setNovelDetail] = useState<NovelDetails>({
    title: '',
    status: '',
    reviewsNumber: 0,
    rating: 0,
    description: '',
    coverImage: '',
    genres: [],
    author: {},
  });

  useEffect(() => {
    const fetchNovelDetail = async (novelSlug: any, server: any) => {
      // TODO: create model for this please
      let result: any;

      result = await apiNovelDetail({
        server,
        novelSlug,
      });
      console.log(result);
      if (result && Object.values(result).every((value) => value !== null)) {
        setNovelDetail(result);
        setIsAvailable(true);
      } else {
        setIsAvailable(false);
      }
    };

    fetchNovelDetail(novelSlug, server);
  }, [novelSlug, selectedServer]);

  const data = [
    {
      label: 'Thông tin chi tiết',
      value: 'detail',
    },
    {
      label: 'Danh sách chương',
      value: 'chapters',
    },
  ];
  const handleSelectSever = (server: any) => {
    localStorage.setItem('selectedServer', server);
    setSelectedServer(server);
  };
  useEffect(() => {
    console.log(novelDetail);
  }, [novelDetail]);

  return (
    <>
      <div className="wrapper w-full flex items-center justify-center">
        <div className="p-[3rem] h-full rounded-xl page-detail mt-[5rem] bg-white w-[90vw] flex flex-col">
          <button className="flex flex-row rounded-2xl bg-app_tertiary hover:bg-app_secondary p-2 mt-5 ml-[2rem] inline-block w-[10rem] justify-center items-center">
            <ArrowLeftIcon className="w-5 h-5" />
            <p className="ml-2 inline-block font-bold">Trang trước</p>
          </button>
          {isAvailable ? (
            <div className="novel-cover p-[2rem] flex flex-row">
              <img className="rounded-xl w-[15rem] h-[22rem]" src={novelDetail.coverImage} alt="banner" />
              <div className="outer-wrapper flex flex-col justify-between ml-[5rem]">
                <div className="inner-wrapper flex flex-col">
                  <p className="text-3xl font-bold text-black mt">{novelDetail.title}</p>
                  <div className="mt-2 flex items-center gap-2 font-bold text-blue-gray-500">
                    {novelDetail.rating}
                    <Rating
                      value={4}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                    <Typography
                      color="blue-gray"
                      className="font-medium text-blue-gray-500"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Based on {novelDetail.reviewsNumber} Reviews
                    </Typography>
                  </div>
                  <CategoryChips categories={novelDetail.genres} />
                  {/* <p className="text-3xl font-bold text-app_primary">{novelDetail.reviewsNumber}</p> */}
                </div>
                <div className="bottom-action flex flex-row">
                  <Button
                    className="bg-app_tertiary"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Đọc ngay
                  </Button>
                  {sources.map((source) => (
                    <Button
                      key={source.name}
                      className={`border-app_primary text-app_primary border-2 ml-2 ${source.name !== selectedServer ? 'bg-white' : 'bg-app_primary text-white'}`}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      onClick={() => handleSelectSever(source.name)}
                    >
                      {source.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="novel-cover p-[2rem] flex flex-row">
              <img className="rounded-xl w-[15rem] h-[22rem]" src={novelDetail.coverImage} alt="banner" />
              <div className="outer-wrapper flex flex-col justify-between ml-[5rem]">
                <div className="inner-wrapper flex flex-col">
                  <p className="text-3xl font-bold text-black mt">Không khả dụng, vui lòng chọn sever khác</p>
                  {/* <div className="mt-2 flex items-center gap-2 font-bold text-blue-gray-500">
                    {novelDetail.rating}
                    <Rating value={4} placeholder={undefined}
                      onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                    <Typography color="blue-gray" className="font-medium text-blue-gray-500"
                      placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      Based on {novelDetail.reviewsNumber} Reviews
                    </Typography>
                  </div>
                  <CategoryChips categories={novelDetail.genres} /> */}
                  {/* <p className="text-3xl font-bold text-app_primary">{novelDetail.reviewsNumber}</p> */}
                </div>
                <div className="bottom-action flex flex-row">
                  <Button
                    className="bg-app_tertiary"
                    placeholder={undefined}
                    disabled
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Đọc ngay
                  </Button>
                  {sources.map((source) => (
                    <Button
                      key={source.name}
                      className={`border-app_primary text-app_primary border-2 ml-2 ${source.name !== selectedServer ? 'bg-white' : 'bg-app_primary text-white'}`}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      onClick={() => handleSelectSever(source.name)}
                    >
                      {source.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <hr />
          <div className="novel-tab p-5">
            <Tabs value="html">
              <TabsHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {data.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody
                className="p-3"
                animate={{
                  initial: { y: 250 },
                  mount: { y: 0 },
                  unmount: { y: 250 },
                }}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {data.map(({ value }) =>
                  value === 'detail' ? (
                    <TabPanel key={value} value={value}>
                      <div dangerouslySetInnerHTML={{ __html: novelDetail.description }} />
                    </TabPanel>
                  ) : (
                    <TabPanel key={value} value={value}>
                      <ChapterList item={[]} />
                    </TabPanel>
                  ),
                )}
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};
