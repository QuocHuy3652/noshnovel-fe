import React from 'react';
import { SourceNovel } from '~/pages/NovelDetails.tsx';
import { Button, IconButton, Option, Select, Typography } from '@material-tailwind/react';
import { Novel } from '~/models';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid';


export interface NovelReaderProps {
  sources?:SourceNovel[],
  novel?: Novel
}


export const NovelReader = (props:NovelReaderProps) => {
  const [ currentSource, setCurrentSource] = React.useState<Novel>(0);
  const [ currentChapter, setCurrentChapter] = React.useState<string>('Chương 1');
  const {  sources = [
    {
      name:'Truyenfull'
    },
    {
      name: 'Tangthuvien'
    },
    {
      name: 'TruyenXYZ'
    }] , novel } = props




  return (
    <>
      <div
        className="wrapper w-full h-full flex flex-col items-center justify-center px-[10rem] mt-[2rem]">
        <div className="novel-wrapper text-center">
          <div className="novel-title">
            <Typography className="text-app_primary" variant="h3" placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}>
              {novel?.title ?? 'Đời ngắn xin đừng ngủ dài'}
            </Typography>
          </div>
          <div className="novel-author">
            <Typography className="text-app_primary" variant="h5" placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}>
              {novel?.author?.name ?? 'Robin Sarma'}
            </Typography>
          </div>
          <div className="novel-source flex flex-row w-full justify-end">
            <div className="w-[10rem] mr-[3rem]">
              <Select className="bg-white" label="Select Version" success placeholder={undefined}
                      onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {
                  sources.map((source, index) => {
                    return (
                      <Option key={index} placeholder={"Chọn nguồn truyện"} value={source.name}>{source.name}</Option>
                    )
                  })
                }
              </Select>
            </div>
          </div>
          <div className="novel-body flex flex-row mt-[1rem] space-x-5 ">
            <div
              className="max-h-[8rem] fixed ml-[-3rem] py-1 action-menu bg-app_primary rounded-xl justify-center items-center align-middle flex flex-col w-[3rem]">
              <IconButton className="bg-transparent shadow-none hover:bg-app_tertiary"
                          placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd"
                        d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z"
                        clipRule="evenodd" />
                </svg>
              </IconButton>
              <IconButton className="bg-transparent shadow-none hover:bg-app_tertiary"
                          placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </IconButton>
              <IconButton className="bg-transparent shadow-none hover:bg-app_tertiary"
                          placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </IconButton>
            </div>
            <div className="py-[3rem] h-full rounded-xl page-detail bg-white w-[70vw] flex flex-col">
              <div className="chapter-name text-center">
                <Typography className="text-app_primary" variant="h4" placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}>
                  {currentChapter ?? 'Chương 1'}
                </Typography>
              </div>
              <div className="novel-content text-black p-[3rem]">
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab architecto corporis eveniet, facilis
                  quaerat quia quibusdam rem suscipit unde voluptatibus. Alias aliquid beatae dolores ea enim esse
                  excepturi exercitationem expedita explicabo facere hic inventore ipsa laudantium minima minus nam
                  natus
                  numquam odit praesentium quod repellat, sed ut voluptatem. Amet deserunt facere fugit hic iure minima
                  nam odio pariatur porro rem, saepe suscipit totam voluptatibus? At, mollitia, nam! At autem debitis
                  est
                  id molestiae non quasi soluta veritatis. Ex fuga illo non quia repudiandae unde ut vel voluptatem.
                  Animi
                  consequuntur cumque dolorem, doloribus facilis necessitatibus officiis voluptas voluptates. Ab debitis
                  dolorem, eligendi eum explicabo facilis incidunt labore laborum nobis numquam placeat possimus
                  repudiandae sint sit unde voluptatem, voluptatum. Ad aperiam architecto cum dicta doloribus enim et
                  eveniet facilis laboriosam laborum nam nisi pariatur perspiciatis praesentium, provident quibusdam
                  sequi
                  tempore vel, velit voluptatibus. Assumenda deleniti eligendi, eveniet hic nemo placeat, quas qui
                  ratione
                  repellat reprehenderit veniam voluptas. Assumenda consequuntur, dolores doloribus est et facilis
                  molestias nesciunt non sunt tempore, temporibus ut veritatis voluptatibus. Accusantium ad aliquid
                  aspernatur at aut autem cumque debitis delectus dicta dolore ducimus earum est excepturi facere fuga
                  ipsum maiores nisi nobis odit omnis porro quasi quia quis quo, ratione recusandae rem rerum sequi sint
                  sit ullam vero vitae voluptatibus. Asperiores commodi, consequuntur cupiditate dolores, ducimus error
                  exercitationem explicabo facilis fugit, impedit in ipsum iste minus modi nihil nostrum odio pariatur
                  praesentium quia repellat ut veritatis vitae! Ad animi beatae consequatur culpa debitis delectus
                  dolore
                  eligendi expedita maxime mollitia omnis pariatur placeat, quidem, quis rem repellat repudiandae
                  similique soluta tempora, vero. Distinctio et fugit iusto maxime nemo. Aperiam autem blanditiis,
                  consectetur corporis debitis doloribus exercitationem facere nemo quam quo sapiente voluptates. Animi
                  dolore earum laudantium magnam pariatur quos rerum tenetur unde ut? Accusantium aliquid at dolorum et
                  facere fugit hic laboriosam, libero maxime mollitia nulla officia officiis quaerat quo similique,
                  voluptatem voluptatibus. Debitis dolore dolores enim error esse facere, fugit illum libero molestiae
                  numquam obcaecati perspiciatis quas reiciendis tenetur totam voluptas voluptatum? Aliquid asperiores
                  blanditiis consequatur sapiente velit? Accusantium assumenda beatae cumque, dicta dignissimos dolore
                  doloribus eligendi eos fuga fugit, iusto laudantium necessitatibus nobis quaerat ratione rem sed
                  soluta
                  tempore, totam veniam. Ab accusantium adipisci aliquid at consequatur dicta dolorem dolorum, earum
                  expedita fugit hic ipsum maiores molestias nemo nisi perspiciatis possimus, quae quam qui quo
                  repudiandae vitae voluptates? Amet autem cupiditate, error et, illo ipsa iusto labore laboriosam
                  nesciunt odit perspiciatis quaerat qui quia quisquam similique temporibus ullam voluptate, voluptatum.
                  Alias corporis facere iste nostrum vel. A amet, blanditiis dolore doloribus eligendi iusto labore,
                  laboriosam quos rem reprehenderit sit voluptas voluptatibus! Dolorem earum facilis molestiae natus
                  nisi!
                  Aperiam dignissimos impedit labore libero quos, similique soluta. Alias aliquid ducimus eius est ex
                  facere fugiat maiores molestiae mollitia nobis obcaecati quasi quis, quos reiciendis rem repudiandae
                  suscipit voluptatum? Cumque distinctio laboriosam natus quae rerum voluptatibus. Alias consequuntur
                  culpa cumque, dicta, error exercitationem expedita harum iure nobis placeat possimus quia ratione
                  ullam,
                  vel voluptatem voluptatibus voluptatum. Doloremque dolores eum eveniet voluptate!</p>
              </div>
            </div>
          </div>
          <div className="novel-reader-bottom-action flex justify-center space-x-5 mt-5">
           <Button className="bg-app_tertiary text-white flex" label="Back" >
             <ArrowLeftIcon className="w-4 h-4 mr-2" />
             Chương trước
           </Button>
            <Button className="bg-app_tertiary text-white flex"  label="Back" >
              Chương sau
              <ArrowRightIcon className="ml-2 w-4 h-4"/>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}