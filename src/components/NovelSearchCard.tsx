import { ShareIcon, TagIcon, BookOpenIcon, HeartIcon } from '@heroicons/react/16/solid';
import { IconText } from '~/components/IconText.tsx';

export type NovelSeachCardProps = {
  title?: string;
  author?: string;
  coverUrl?: string;
  description?: string;
  totalChapters?: number;
  category?: string;
  status?: string;
};

export const NovelSearchCard = (props: NovelSeachCardProps) => {
  const { title, author, coverUrl, description, totalChapters, category, status } = props;
  return (
    <>
      <div className="rounded-2xl bg-white hover:opacity-50 shadow-xl hover:shadow-2xl hover:bg-gray-200 cursor-pointer p-5 flex flex-row ">
        <div className="novel-cover-img">
          <img
            className="min-w-[10rem] h-[15rem]"
            src={coverUrl}
            alt="cover"
            onError={(e: any) => (e.target.src = 'https://truyenchu.com.vn/images/no-image.webp')}
          />
        </div>
        <div className="novel-info ml-4 flex flex-col w-full">
          <div className="flex flex-row w-full justify-between">
            <div className="novel-title text-xl font-bold">{title}</div>
            <div className="top-action flex flex-row gap-2 mb-2">
              <a className="action">
                <ShareIcon className="w-[1.5rem] h-[1.5rem]" />
              </a>
              <a className="action">
                <HeartIcon className="w-[1.5rem] h-[1.5rem]" />
              </a>
            </div>
          </div>

          <div className="novel-author">{author}</div>
          <div className="novel-description text-xs mt-2">{description}</div>
          <div className="novel-chapter mt-1 flex items-center ">
            <BookOpenIcon className="w-5 h-5 mr-1" /> {totalChapters}
          </div>
          {status && (
            <div
              className={`badge rounded text-white p-1 text-center mt-3 text-xs whitespace-nowrap max-w-[6rem] ${status === 'Đang ra' ? 'bg-green-500' : 'bg-yellow-500'}`}
            >
              {status}
            </div>
          )}
          <div className="novel-category flex flex-row space-x-2 mt-10">
            {category && (
              <IconText iconComp={<TagIcon className="w-[1rem] h-[1rem]" />} textContent={category}></IconText>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
