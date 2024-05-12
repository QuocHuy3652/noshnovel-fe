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
};

export const NovelSearchCard = (props: NovelSeachCardProps) => {
  const { title, author, coverUrl, description, totalChapters, category, status, novelSlug } = props;
  const handleClick = (slug: string | undefined) => {
    window.location.href = `/noshnovel-fe/${path.DETAIL}?novelSlug=${slug}`;
  };
  return (
    <>
      <div
        className="rounded-2xl bg-white hover:opacity-50 shadow-xl hover:shadow-2xl hover:bg-gray-200 cursor-pointer p-5 flex flex-row  items-stretch relative"
        onClick={() => handleClick(novelSlug)}
      >
        <div className="novel-cover-img">
          <img
            className="min-w-[10rem] h-[15rem]"
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

          {author && (
            <div className="novel-author flex items-center gap-1">
              <span>
                <UserCircleIcon className="w-[1.4rem] h-[1.4rem]" />
              </span>
              <span>{author}</span>
            </div>
          )}
          <div className="novel-description text-xs mt-2">{description}</div>
          <div className="novel-chapter  flex items-center mt-2">
            <BookOpenIcon className="w-5 h-5 mr-1" /> {totalChapters}
          </div>
          {status && (
            <div
              className={`badge rounded text-white p-1 text-center mt-3 text-xs whitespace-nowrap max-w-[8rem] absolute bottom-6 left-0 ${status === 'Đang ra' ? 'bg-green-500' : 'bg-yellow-500'}`}
            >
              {status}
            </div>
          )}
          <div className="novel-category flex flex-row space-x-2 mt-10 absolute bottom-0 left-0">
            {category && (
              <IconText iconComp={<TagIcon className="w-[1rem] h-[1rem]" />} textContent={category}></IconText>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
