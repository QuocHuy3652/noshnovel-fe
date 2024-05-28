import { updateHistory } from '~/utils/fn';
import { useNavigate } from 'react-router-dom';

export type NovelCardProps = {
  title?: string;
  author?: string;
  coverImage?: string;
  description?: string;
  totalChapters?: number;
  category?: string;
  url?: string;
  chapterLabel?: string;
  onCardClick?: () => void;
};

export const NovelCard = (props: NovelCardProps) => {
  const { title, author, coverImage, description, totalChapters, category, chapterLabel, url } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    if (url) {
      navigate(url);

      // Extract the server, novelSlug and chapterSlug from the url
      const urlParams = new URLSearchParams(url.split('?')[1]);
      const server = urlParams.get('server');
      const novelSlug = urlParams.get('novelSlug');
      const chapterSlug = urlParams.get('chapterSlug');
      const chapterIndex = urlParams.get('chapterIndex');

      // Update the history
      if (server && novelSlug && chapterSlug) {
        updateHistory(server, novelSlug, chapterSlug, chapterIndex, chapterLabel);
      }
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="card-wrapper hover:opacity-50 cursor-pointer relative flex flex-col justify-between rounded-2xl w-[14rem] h-[20rem]"
        style={{
          backgroundImage: `url(${coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="overlay bg-gradient-to-b from-app_primary to-white opacity-30 absolute w-full h-full rounded-2xl"></div>
        <div className="card-top-action absolute p-3 w-full flex">
          <div className="badge rounded bg-green-500 text-white p-1 text-xs">{chapterLabel ?? '?'}</div>
        </div>
        <div className="absolute bottom-overlay bg-black rounded-b-2xl opacity-60 w-full bottom-0">
          <div className="card-infomation flex flex-col cursor-pointer hover:opacity-50 px-2 py-1">
            <div className="title text-white">{title}</div>
            <div className="category text-white">{category}</div>
          </div>
        </div>
      </div>
    </>
  );
};
