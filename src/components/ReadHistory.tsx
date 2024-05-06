import { CardSlider } from '~/components/CardSlider.tsx';


export const ReadHistory = () => {

  return (
    <>
      <section className="novel-history bg-white text-app_primary p-5">
        <div className="border-app_primary text-3xl font-semibold">Lịch sử đọc:</div>
        <div className="novel-history p-3 mt-3">
          <CardSlider />
        </div>
      </section>
    </>
  )
}