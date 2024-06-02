import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { Button, Rating, TabsBody, Typography, Tab, TabPanel, Tabs, TabsHeader } from '@material-tailwind/react';
import React from 'react';
import { Category, CategoryChips } from '~/components/CategoryChips.tsx';
import { ChapterList } from '~/components';
import { useServerStore } from '~/store/useServerStore';
import { Link, createSearchParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiGetGenre, apiGetNovelChapter, apiNovelDetail } from '~/apis';
import { withRouter, WithRouterProps } from '~/hocs/withRouter';
import { path } from '~/constants';
import Loading from '~/components/Loading';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ReadNovelDialog } from '~/components/ReadNovelDialog.tsx';
import { insertToHistory } from '~/utils/fn';
import { UserCircleIcon } from '@heroicons/react/16/solid';
import { useGenreStore } from '~/store';

export interface SourceNovel {
  name?: string;
  url?: string;
  sourceHandlerFn: () => void;
}
type Author = {
  name: string;
  slug: string;
};

export interface NovelDetails {
  title: string;
  status: string;
  reviewsNumber: number;
  rating: number;
  description: string;
  coverImage: string;
  genres: Category[];
  author: Author;
}
export const NovelDetails = withRouter(({ navigate }: WithRouterProps) => {
  const { serverList } = useServerStore();
  const sources = serverList.map((name) => ({ name }));
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const novelSlug = searchParams.get('novelSlug');
  const server = searchParams.get('server');
  const [selectedServer, setSelectedServer] = useState(server);
  const [isAvailable, setIsAvailable] = useState(true);
  const [genres, setGenres] = useState<Category[]>([]);
  const [chapters, setChapters] = useState([]);
  const [chapterOne, setChapterOne] = useState('chuong-1');
  const [itemsPerPage, setItemsPerPage] = useState(40);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isChangePage, setIsChangePage] = useState(false);
  const [openReadDialog, setOpenReadDialog] = useState(false);
  const [serverChange, setServerChange] = useState(server);
  const { setCurrentGenre } = useGenreStore();

  const [novelDetail, setNovelDetail] = useState<NovelDetails>({
    title: '',
    status: '',
    reviewsNumber: 0,
    rating: 0,
    description: '',
    coverImage: '',
    genres: [],
    author: { name: '', slug: '' },
  });

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const result: any = await apiGetGenre({ server: selectedServer });

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

      if (result && Object.values(result).every((value) => value !== null)) {
        setNovelDetail(result);
        setIsAvailable(true);
      } else {
        fetchNovelDetail(novelSlug, server);
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
      const response: any = await apiGetNovelChapter({ novelSlug, server, page });
      if (page === 1) {
        setChapterOne(response.data[0]);
      }
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
    fetchChapters();
  }, [novelSlug]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setIsChangePage(true);
    fetchChapters(page);
  };

  const handleSearch = (data: any, type: 'genre' | 'author' | 'keyword') => {
    const param: any = {};
    param.server = selectedServer?.toString();

    if (type === 'genre') {
      param.genre = data;
      localStorage.setItem('currentGenre', JSON.stringify(data));
    } else if (type === 'author') {
      param.author = data.slug;
      localStorage.setItem('currentAuthor', JSON.stringify(data.name));
    } else if (type === 'keyword') {
      param.keyword = data;
    }

    param.page = '1';
    navigate({
      pathname: `/${path.SEARCH}`,
      search: createSearchParams(param).toString(),
    });
  };

  const handleReadNovel = (data: any) => {
    const param: any = {};
    param.server = selectedServer?.toString();
    param.novelSlug = novelSlug?.toString();
    param.chapterSlug = data.slug;
    param.chapterIndex = data.chapterIndex;
    const novelInfo = {
      coverImage: novelDetail.coverImage,
      title: novelDetail.title,
      novelSlug: param.novelSlug,
    };
    insertToHistory(data, novelInfo, param.server);

    navigate({
      pathname: `/${path.READER}`,
      search: createSearchParams(param).toString(),
    });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const serverFromUrl = urlParams.get('server');
    if (serverFromUrl && serverFromUrl !== selectedServer) {
      setSelectedServer(serverFromUrl);
    }
  }, [window.location.search]);

  const handleChangeServer = (data: any) => {
    if (data.name !== selectedServer) {
      setOpenReadDialog(true);
      setServerChange(data.name);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
              <div className="novel-cover p-[2rem] flex flex-row overflow-hidden">
                <LazyLoadImage
                  effect="blur"
                  className="rounded-xl min-w-[15rem] h-[22rem]"
                  src={novelDetail.coverImage}
                  alt="banner"
                  onError={(e: any) => (e.target.src = '/no-image.png')}
                />
                <div className="outer-wrapper flex flex-col justify-between ml-[5rem]">
                  <div className="inner-wrapper flex flex-col">
                    <p className="text-3xl font-bold text-black max-w-[40rem]">{novelDetail.title}</p>
                    <div
                      className="novel-author mt-2 flex items-center gap-1 max-w-[40rem]"
                      onClick={() => handleSearch(novelDetail.author, 'author')}
                    >
                      <UserCircleIcon className="w-[2rem] h-[2rem] text-blue-gray-100 cursor-pointer" />
                      <Typography color="black" className="font-medium text-blue-gray-500 cursor-pointer"
                                  placeholder={undefined} onPointerEnterCapture={undefined}
                                  onPointerLeaveCapture={undefined}>
                        {novelDetail.author.name ?? 'Không rõ'}
                      </Typography>
                    </div>
                    <div className="mt-2 flex items-center gap-2 font-bold text-blue-gray-500" aria-readonly>
                      {novelDetail.rating}
                      <Rating
                        value={Math.round(novelDetail.rating) || 0}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        readonly
                      />
                      <Typography
                        color="blue-gray"
                        className="font-medium text-blue-gray-500"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Dựa trên {novelDetail.reviewsNumber} đánh giá
                      </Typography>
                    </div>

                    <CategoryChips
                      categories={novelDetail.genres}
                      isGenreAvailable={isGenreAvailable}
                      handleSearch={handleSearch}
                    />
                    <Typography
                      className={` mt-[1rem]badge rounded text-white p-1 text-center mt-3 text-xs whitespace-nowrap max-w-[8rem] rounded-[7px]  ${novelDetail.status === "Đang ra" ? "bg-green-300" : "bg-yellow-500"}`}
                      placeholder={undefined} onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}                    >
                      {novelDetail.status || 'Không rõ'}
                    </Typography>

                    {/* <p className="text-3xl font-bold text-app_primary">{novelDetail.reviewsNumber}</p> */}
                  </div>
                  <div className="bottom-action flex flex-row max-w-[60rem] flex-wrap  ">
                    <Button
                      onClick={() => handleReadNovel(chapterOne)}
                      className="bg-app_tertiary mt-2 border-app_primary "
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Đọc ngay
                    </Button>
                    {sources.map((source) => (
                      <Button
                        key={source.name}
                        className={`border-app_primary mt-2 text-app_primary border-2 ml-1 ${source.name !== selectedServer ? 'bg-white' : 'bg-app_primary text-white'}`}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        onClick={() => handleChangeServer(source)}
                        // disabled={selectedServer === source.name}
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
                  <div className="bottom-action flex flex-wrap flex-row">
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
                        onClick={() => setOpenReadDialog(true)}
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
                        {isChangePage && <Loading coverScreen={false} fullScreen={false} />}
                        <ChapterList
                          item={chapters}
                          currentPage={currentPage}
                          itemsPerPage={itemsPerPage}
                          totalItems={totalItems}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                          onReadNovel={handleReadNovel}
                          novelSlug={novelSlug}
                          coverImage={novelDetail.coverImage}
                          title={novelDetail.title}
                          isInsert={true}
                          isChangePage={isChangePage} chapterSlug={null} />
                      </TabPanel>
                    ),
                  )}
                </TabsBody>
              </Tabs>
            </div>
          </div>
        </div>
      )}
      {openReadDialog ? (
        <ReadNovelDialog
          open={openReadDialog}
          handleClose={() => setOpenReadDialog(false)}
          server={serverChange}
          title={novelDetail.title}
          namePage="detail"
        />
      ) : (
        <></>
      )}
    </>
  );
});
