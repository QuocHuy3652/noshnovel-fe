import { CardSearchList } from '~/components/CardSearchList.tsx';

export const SearchResult = () => {
  return (<>
    <section className="novel-history text-app_primary p-5">
      <div className="border-app_primary text-3xl font-semibold">Kết quả tìm kiếm: </div>
      <div className="novel-history p-3 mt-3">
        <CardSearchList item={[]} totalCol={2} totalRow={2} />
      </div>
    </section>

  </>)
}