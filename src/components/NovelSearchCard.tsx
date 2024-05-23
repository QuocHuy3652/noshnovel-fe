import { ShareIcon, UserCircleIcon, TagIcon, BookOpenIcon, HeartIcon } from '@heroicons/react/16/solid';
import { IconText } from '~/components/IconText.tsx';
import { path } from '~/constants';

export type NovelSeachCardProps = {
  title?: string;
  author?: string;
  coverUrl?: string;
  description?: string;
  totalChapters?: number;
  category?: string;
  status?: string;
  novelSlug?: string;
  namePage?: string; // search / detail / reader
  server?: any;
};

export const NovelSearchCard = (props: NovelSeachCardProps) => {
  const { title, author, coverUrl, description, totalChapters, category, status, novelSlug, namePage, server } = props;
  const handleClick = (slug: string | undefined, server: any) => {
    if (namePage === 'search') {
      window.location.href = `${path.DETAIL}?server=${server}&novelSlug=${slug}`;
    } else if (namePage === 'detail') {
      localStorage.setItem('selectedServer', server);
      window.location.href = `${path.DETAIL}?server=${server}&novelSlug=${slug}`;
    } else if (namePage === 'reader') {
      window.location.href = `${path.READER}?server=${server}&novelSlug=${slug}&chapterSlug=chuong-1`;
    }
  };
  return (
    <>
      <div
        className="rounded-2xl bg-white hover:opacity-50 shadow-xl hover:shadow-2xl hover:bg-gray-200 cursor-pointer p-5 flex flex-row  items-stretch relative"
        onClick={() => handleClick(novelSlug, server)}
      >
        <div className="novel-cover-img">
          <img
            className="min-w-[10rem] h-[15rem] rounded-[0.5rem]"
            src={coverUrl}
            alt="cover"
            onError={(e: any) => (e.target.src = 'https://truyenchu.com.vn/images/no-image.webp')}
          />
        </div>
        <div className="novel-info ml-4 flex flex-col w-full relative">
          <div className="flex flex-row w-full justify-between">
            <div className="novel-title text-xl font-bold text-ellipsis overflow-hidden line-clamp-1">{title}</div>
            <div className="top-action flex flex-row gap-2 mb-2">
              <a className="action">
                <ShareIcon className="w-[1.5rem] h-[1.5rem]" />
              </a>
              <a className="action">
                <HeartIcon className="w-[1.5rem] h-[1.5rem]" />
              </a>
            </div>
          </div>

          <div className="novel-author flex items-center gap-1">
            <span>
              <UserCircleIcon className="w-[1.4rem] h-[1.4rem]" />
            </span>
            <span>{author ?? 'Không rõ'}</span>
          </div>
          <div className="novel-description text-[1rem] mt-2 text-justify line-clamp-5">
            {description || 'Bạn có thể click vào để xem thông tin chi tiết ....'}
          </div>
          <div className="novel-chapter  flex items-center mt-2">
            <BookOpenIcon className="w-5 h-5 mr-1" /> {totalChapters}
          </div>
          <div
            className={`badge rounded text-white p-1 text-center mt-3 text-xs whitespace-nowrap max-w-[8rem] absolute bottom-6 left-0 ${status === 'Đang ra' ? 'bg-green-500' : 'bg-yellow-500'}`}
          >
            {status || 'Không rõ'}
          </div>
          <div className="novel-category flex flex-row space-x-2 mt-10 absolute bottom-0 left-0">
            <IconText iconComp={<TagIcon className="w-5 h-5 mr-1" />} textContent={category ?? 'Không rõ'}></IconText>
          </div>
        </div>
      </div>
    </>
  );
};
