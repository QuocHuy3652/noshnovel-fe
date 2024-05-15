import nosh_bg_v from '/src/assets/nosh_bg_v.png';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import novel_cover from '/src/assets/novel_cover.jpg';
import { Button, Rating, TabsBody, Typography, Tab, TabPanel, Tabs, TabsHeader } from '@material-tailwind/react';
import React from 'react';
import { Category, CategoryChips } from '~/components/CategoryChips.tsx';
import { ChapterList } from '~/components';
import { useServerStore } from '~/store/useServerStore';
import { createSearchParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiGetGenre, apiGetNovelChapter, apiNovelDetail } from '~/apis';
import { withRouter, WithRouterProps } from '~/hocs/withRouter';
import { toSlug } from '~/utils/fn';
import { path } from '~/constants';
import Loading from '~/components/Loading';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
const NovelDetails = ({ navigate }: WithRouterProps) => {
  const { serverList } = useServerStore();
  const sources = serverList.map((name) => ({ name }));
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const novelSlug = searchParams.get('novelSlug');
  const server = localStorage.getItem('selectedServer');
  const [selectedServer, setSelectedServer] = useState(server);
  const [isAvailable, setIsAvailable] = useState(true);
  const [genres, setGenres] = useState<Category[]>([]);
  const [chapters, setChapters] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(40);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

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

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const result: any = await apiGetGenre({ server: selectedServer });
      console.log('API result:', result);

      if (result) {
        setGenres(result);
      }
    };

    fetchGenres();
  }, [selectedServer]);

  const isGenreAvailable = (genre: Category) => {
    if (!genres) return false;
    return genres.some((g) => g.name.trim().toLowerCase() === genre.name.trim().toLowerCase());
  };

  useEffect(() => {
    const fetchNovelDetail = async (novelSlug: any, server: any) => {
      setIsLoading(true);
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
      setIsLoading(false);
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

  useEffect(() => {
    fetchChapters();
  }, [novelSlug]);
  console.log(chapters);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchChapters(page);
  };

  const handleSelectSever = (server: any) => {
    localStorage.setItem('selectedServer', server);
    setSelectedServer(server);
  };

  const handleSearch = (data: any) => {
    const param: any = {};
    param.server = selectedServer?.toString();

    param.genre = toSlug(data);
    param.page = '1';
    console.log(param);
    navigate({
      pathname: `/${path.SEARCH}`,
      search: createSearchParams(param).toString(),
    });
  };
  return (
    <>
      {isLoading && <Loading />}
      <div className="wrapper w-full flex items-center justify-center">
        <div className="p-[3rem] h-full rounded-xl page-detail mt-[5rem] bg-white w-[90vw] flex flex-col">
          <button
            className="flex flex-row rounded-2xl bg-app_tertiary hover:bg-app_secondary p-2 mt-5 ml-[2rem] inline-block w-[10rem] justify-center items-center"
            onClick={goBack}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <p className="ml-2 inline-block font-bold">Trang trước</p>
          </button>
          {isAvailable ? (
            <div className="novel-cover p-[2rem] flex flex-row">
              <LazyLoadImage
                effect="blur"
                className="rounded-xl w-[15rem] h-[22rem]"
                src={novelDetail.coverImage}
                alt="banner"
                onError={(e: any) => (e.target.src = '/no-image.png')}
              />
              <div className="outer-wrapper flex flex-col justify-between ml-[5rem]">
                <div className="inner-wrapper flex flex-col">
                  <p className="text-3xl font-bold text-black mt">{novelDetail.title}</p>
                  <div className="mt-2 flex items-center gap-2 font-bold text-blue-gray-500">
                    {novelDetail.rating}
                    <Rating
                      value={novelDetail.rating || 5}
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
                  <CategoryChips
                    categories={novelDetail.genres}
                    isGenreAvailable={isGenreAvailable}
                    handleSearch={handleSearch}
                  />
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
            <Tabs value="detail">
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
                      <ChapterList
                        item={chapters}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
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

export default withRouter(NovelDetails);
