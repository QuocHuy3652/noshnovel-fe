import { BookmarkIcon, BookOpenIcon, HeartIcon, ShareIcon } from '@heroicons/react/16/solid';
import { IconText } from '~/components/IconText.tsx';
import novel_cover from '/src/assets/novel_cover.jpg';

export type NovelSeachCardProps = {
  title?: string;
  author?: string;
  coverUrl?: string;
  description?: string;
  totalChapters?: number;
  category?: string;
};

export const NovelSearchCard = (props: NovelSeachCardProps) => {
  const { title, author, coverUrl, description, totalChapters, category } = props;
  return (
    <>
      <div className="rounded-2xl hover:opacity-50 shadow-xl hover:shadow-2xl hover:bg-gray-200 cursor-pointer p-5 flex flex-row ">
        <div className="novel-cover-img">
          <img className="min-w-[10rem] h-[15rem]" src={coverUrl} alt="cover" />
        </div>
        <div className="novel-info ml-4 flex flex-col w-full">
          <div className="flex flex-row w-full justify-between">
            <div className="novel-title text-xl font-bold">{title}</div>
            <div className="top-action flex flex-row">
              <a className="action">
                <BookmarkIcon className="w-[1.5rem] h-[1.5rem]" />
              </a>
              <a className="action">
                <HeartIcon className="w-[1.5rem] h-[1.5rem]" />
              </a>
            </div>
          </div>

          <div className="novel-author">{author}</div>
          <div className="novel-description text-xs mt-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab animi deleniti, error explicabo facilis
            laborum minus neque nihil odit perferendis possimus quam tempora unde voluptas. Aut excepturi ipsa placeat!
          </div>
          <div className="novel-chapter mt-1">Số chương: {totalChapters}</div>
          <div className="badge rounded bg-yellow-500 text-white p-1 text-center mt-3 text-xs max-w-[3rem]">Full</div>
          <div className="novel-category flex flex-row space-x-2 mt-10">
            <IconText iconComp={<BookOpenIcon className="w-[1rem] h-[1rem]" />} textContent={'Tiên hiệp'}></IconText>
            <IconText iconComp={<ShareIcon className="w-[1rem] h-[1rem]" />} textContent={'Chia sẻ'}></IconText>
          </div>
        </div>
      </div>
    </>
  );
};
