import nosh_bg_v from '/src/assets/nosh_bg_v.png'
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import novel_cover from '/src/assets/novel_cover.jpg'
import { Button, Rating, TabsBody, Typography, Tab, TabPanel, Tabs, TabsHeader } from '@material-tailwind/react';
import React from 'react';
import { Category, CategoryChips } from '~/components/CategoryChips.tsx';
import { ChapterList } from '~/components';

export interface SourceNovel {
  name?:string,
  url?:string,
  sourceHandlerFn: () => void
}

export interface NovelDetails {
  title?:string,
  totalRating?:number,
  description?:string
  imageUrl?:string,
  sources?:SourceNovel[]
}

export const NovelDetails = (props:NovelDetails) => {
  const { title = 'Đời ngắn xin đừng ngủ dài', totalRating, description, imageUrl,
    sources = [
      {
        name:'Truyenfull'
      },
      {
        name: 'Tangthuvien'
      },
      {
        name: 'TruyenXYZ'
      }] } = props;
  const [rated, setRated] = React.useState(4);
  const categories:Category[] = [
    {
      name: 'Truyện Ngắn',
    },
    {
      name: 'Kiếm hiệp',
    },
    {
      name: 'Ngôn tình'
    },
    {
      name: 'Kinh dị'
    },
    {
      name: 'Truyện trinh thám'
    },
    {
      name: 'Truyện Ngắn',
    },
    {
      name: 'Kiếm hiệp',
    },
    {
      name: 'Ngôn tình'
    },
    {
      name: 'Kinh dị'
    },
    {
      name: 'Truyện trinh thám'
    }
  ]
  const data = [
    {
      label: 'Thông tin chi tiết',
      value: 'detail'
    },
    {
      label: 'Danh sách chương',
      value: 'chapters'
    }
  ]

  return (
    <>
    <div
      className="wrapper w-full flex items-center justify-center">
      <div className="p-[3rem] h-full rounded-xl page-detail mt-[5rem] bg-white w-[90vw] flex flex-col">
        <button className="flex flex-row rounded-2xl bg-app_tertiary hover:bg-app_secondary p-2 mt-5 ml-[2rem] inline-block w-[10rem] justify-center items-center">
          <ArrowLeftIcon className="w-5 h-5"/>
          <p className="ml-2 inline-block font-bold">Trang trước</p>
        </button>
        <div className="novel-cover p-[2rem] flex flex-row">
          <img className="rounded-xl w-[15rem] h-[22rem]" src={novel_cover} alt="banner"/>
          <div className="outer-wrapper flex flex-col justify-between ml-[5rem]">
            <div className="inner-wrapper flex flex-col">
              <p className="text-3xl font-bold text-black mt">{title}</p>
              <div className="mt-2 flex items-center gap-2 font-bold text-blue-gray-500">
                {rated}.7
                <Rating value={4} onChange={(value) => setRated(value)} placeholder={undefined}
                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                <Typography color="blue-gray" className="font-medium text-blue-gray-500"
                            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  Based on 134 Reviews
                </Typography>
              </div>
              <CategoryChips categories={categories} />
              <p className="text-3xl font-bold text-app_primary">{totalRating}</p>
            </div>
            <div className="bottom-action flex flex-row">
              <Button className="bg-app_tertiary" placeholder={undefined}
                      onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Đọc ngay
              </Button>
              {
                sources.map((source) => (
                  <Button key={source.name} className=" bg-white border-app_primary text-app_primary border-2 ml-2" placeholder={undefined}
                          onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {source.name}
                  </Button>
                ))
              }
            </div>
          </div>
        </div>
        <hr />
        <div className="novel-tab p-5">
          <Tabs value="html">
            <TabsHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              {data.map(({ label, value }) => (
                <Tab key={value} value={value} placeholder={undefined}
                     onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
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
              }} placeholder={undefined} onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}>
              {data.map(({value}) => (
                value === 'detail' ?
                  <TabPanel key={value} value={value}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam aut autem cum debitis doloribus dolorum eaque, excepturi exercitationem, harum hic in ipsam iure laboriosam modi molestiae nihil nostrum quasi quibusdam quidem quod repudiandae sed soluta suscipit tempore totam velit. Animi commodi consequatur culpa delectus dolorem dolores eius enim incidunt ipsam labore, laboriosam laudantium minima nisi, odit porro possimus provident, quia quis sit velit! Alias at itaque, nam nemo repellat suscipit! Accusantium atque beatae consequuntur cumque cupiditate deleniti eaque explicabo illo impedit neque nulla pariatur recusandae, repudiandae saepe sint. Ad amet consequatur cumque magnam maxime, molestias perspiciatis quia totam. Aliquam, aperiam assumenda autem consectetur consequatur cumque, deserunt distinctio dolor doloremque dolorum esse est et incidunt ipsa ipsam iste laudantium molestiae nam neque numquam officia omnis perferendis provident quasi quia quod quos ratione reiciendis, repellat saepe sint sit tempora ullam ut veritatis vitae voluptatibus. Ad adipisci at consequatur dicta enim error ex exercitationem expedita facilis fugit hic incidunt ipsam maxime minus molestiae molestias nostrum optio perferendis, praesentium quisquam repellendus repudiandae, sapiente tempora tempore veniam vitae voluptas. Asperiores dolores enim illum repellendus sapiente voluptas voluptatem! Ab accusantium at aut, autem blanditiis consectetur cum cumque distinctio dolores error ex excepturi expedita explicabo facilis fugit impedit incidunt iusto laudantium maiores maxime minus neque nihil non, officiis perferendis placeat possimus quam ratione repellendus reprehenderit saepe soluta veritatis vitae. Alias aut dolorem facere laudantium, magni obcaecati officia quidem rerum. Asperiores corporis, cumque deleniti dolores esse facere impedit inventore ipsam minus nulla odio officia praesentium soluta totam ullam veritatis voluptatum. A, atque autem dicta eaque expedita fugit itaque molestiae, provident quis quo repellat sequi unde. Consequatur delectus exercitationem fugit, id porro saepe sint veniam! Deserunt eveniet expedita explicabo fuga, iusto necessitatibus quo sapiente! Alias aliquid culpa dolor doloremque dolores, ducimus eius enim est eum ex explicabo fugit hic libero maiores modi nemo nihil omnis quidem, quod soluta, tempora tempore tenetur vel. Ab adipisci animi at blanditiis consectetur consequatur consequuntur deserunt distinctio dolor dolorem doloremque doloribus ea eligendi est fugiat ipsa itaque molestias mollitia neque nihil odit officia officiis, provident quae quam quo rem repellat rerum soluta suscipit tempora tempore tenetur ullam ut vel vero voluptatem. Dicta in necessitatibus neque numquam quisquam quod rem reprehenderit soluta ut? Accusamus consequuntur dolorem eligendi laborum provident unde? Architecto ducimus ex fuga quas voluptates. Alias blanditiis consequatur dicta id laudantium sapiente unde voluptas? Aliquam atque cum debitis fugiat ipsa ipsum laudantium maiores minus nobis, reprehenderit, repudiandae suscipit voluptatibus! Ad assumenda dolore dolorum, esse et explicabo facere hic itaque nulla numquam odio, officia pariatur praesentium, quibusdam repudiandae. Beatae facilis libero officia quaerat sed sequi sunt? Autem dolorum enim et laudantium quae, sed temporibus! Architecto consectetur culpa debitis dolore eos et explicabo, harum ipsa iusto magnam nam, obcaecati, officia praesentium quis quos vero voluptates! Accusantium animi aut beatae doloremque enim est facere illo, maiores nam neque obcaecati officiis, perferendis quaerat quasi quisquam reiciendis rem saepe sequi similique, tempora vel velit vero! Animi, aspernatur aut blanditiis consequuntur eius exercitationem fugiat, harum reprehenderit, rerum saepe ullam.</TabPanel> :
                  <TabPanel key={value} value={value} >
                    <ChapterList  item={[]}/>
                  </TabPanel>

              ))}
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </div>
    </>
  )
}