import novel_card_cover from '/src/assets/novel_card_cover.jpg'

export type NovelCardProps = {
  title?:string,
  author?:string,
  coverUrl?:string,
  description?:string,
  totalChapters?:number,
  category?:string,
};

export const NovelCard = (props: NovelCardProps) => {
  const { title, author, coverUrl, description, totalChapters, category } = props


  return (<>
    <div
      className="card-wrapper hover:opacity-50 cursor-pointer relative flex flex-col justify-between rounded-2xl w-[14rem] h-[20rem]"
      style={{
        backgroundImage: `url(${novel_card_cover})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>

      <div className="overlay bg-gradient-to-b from-app_primary to-white opacity-30 absolute w-full h-full rounded-2xl">
      </div>
      <div className="card-top-action absolute p-3 w-full flex">
        <div className="badge rounded bg-green-500 text-white p-1 text-xs">New</div>
      </div>

      <div className="absolute bottom-overlay bg-black rounded-b-2xl opacity-60 w-full bottom-0">
        <div className="card-infomation flex flex-col cursor-pointer hover:opacity-50 px-2 py-1">
          <div className="title text-white">Thế giới hoàn mỹ</div>
          <div className="category text-white">Tiên Hiệp</div>
        </div>
      </div>
    </div>
  </>)
}