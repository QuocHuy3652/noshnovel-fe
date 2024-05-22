import {
  Button, ButtonGroup,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import React from 'react';


export interface SettingDialogProps {
  open: boolean
  handleClose: () => void
  handleSave: () => void
}

export const SettingDialog = (props:SettingDialogProps) => {
  const { open, handleClose, handleSave } = props;
  const [fontSize, setFontSize] = React.useState(12);
  const [activeFont, setActiveFont] = React.useState(0);
  const [lineHeight, setLineHeight] = React.useState(1.5);
  const fontFamily = ['Arial', 'Helvetica', 'sans-serif'];

  return (
   <>
     <Dialog
       open={open}
       size={"md"}
       handler={handleClose}>
       <DialogHeader className="justify-between">
         <div>
         </div>
         <div>
           <Typography variant="h5" color="blue-gray">
             Cài đặt
           </Typography>
         </div>
         <IconButton
           color="blue-gray"
           size="sm"
           variant="text"
           onClick={handleClose}>
           <svg
             xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor"
             strokeWidth={2}
             className="h-5 w-5"
           >
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M6 18L18 6M6 6l12 12"
             />
           </svg>
         </IconButton>
       </DialogHeader>
       <DialogBody className="px-[3rem]">
         <div className="flex gap-x-4">
           <div className="flex-col space-y-[1.5rem] basis-1/3">
             <Typography variant="h6" className="text-app_primary">Cỡ chữ:</Typography>
             <Typography variant="h6" className="text-app_primary">Font chữ:</Typography>
             <Typography variant="h6" className="text-app_primary">Màu chữ:</Typography>
             <Typography variant="h6" className="text-app_primary">Màu nền:</Typography>
             <Typography variant="h6" className="text-app_primary">Độ giãn dòng:</Typography>
           </div>
           <div className="flex-col space-y-4 basis-2/3">
             <div className="font-size">
               <ButtonGroup variant="outlined" color="black" size="sm">
                 <Button className="!rounded-none w-[5rem]" onClick={() => setFontSize(fontSize - 1)}>A-</Button>
                 <Button className="w-[5rem]" disabled>{fontSize}</Button>
                 <Button className="!rounded-none w-[5rem]" onClick={() => setFontSize(fontSize + 1)}>A+</Button>
               </ButtonGroup>
             </div>
             <div className="flex space-x-2 font-family">
               <>
                 {
                   fontFamily.map((item, index) => {
                    //  console.log(index);
                     return <>
                       <Button
                         style={{
                           backgroundColor: activeFont === index ? 'var(--color-app_tertiary)' : 'var(--color-white)',
                           color: activeFont === index ? 'white' : 'black',
                           borderColor: activeFont === index ? 'var(--color-app_primary)' : 'var(--color-white)',
                         }}
                         onClick={() => {
                           setActiveFont(index);
                          //  console.log('index:', index);
                         }
                         }
                         className={`font-family text-[0.5rem] option-1 text-black bg-white border`}
                         variant="outlined"
                         size="sm">{item}</Button>
                     </>;
                   })
                 }
               </>
             </div>
             <div className="flex flex-row space-x-2 font-color">
               <div className="w-[2rem] h-[2rem] rounded-full bg-black"></div>
               <div className="w-[2rem] h-[2rem] rounded-full bg-red-500"></div>
               <div className="w-[2rem] h-[2rem] rounded-full bg-blue-500"></div>
               <div className="w-[2rem] h-[2rem] rounded-full bg-green-500"></div>
               <div className="w-[2rem] h-[2rem] rounded-full bg-yellow-300"></div>
             </div>
             <div className="flex flex-row space-x-2 ">
               <div className="w-[2rem] h-[2rem] rounded-full bg-app_secondary"></div>
               <div className="w-[2rem] h-[2rem] rounded-full bg-red-100"></div>
               <div className="w-[2rem] h-[2rem] rounded-full bg-cyan-200"></div>
               <div className="w-[2rem] h-[2rem] rounded-full bg-deep-purple-200"></div>
               <div className="w-[2rem] h-[2rem] rounded-full bg-lime-300"></div>
             </div>
             <div className="line-space">
               <ButtonGroup variant="outlined" color="black" size="sm">
                 <Button className="!rounded-none w-[5rem]" onClick={() => setLineHeight(lineHeight - 0.5)}>L-</Button>
                 <Button className="w-[5rem]" disabled>{lineHeight}</Button>
                 <Button className="!rounded-none w-[5rem]" onClick={() => setLineHeight(lineHeight + 0.5)}>L+</Button>
               </ButtonGroup>
             </div>
           </div>
         </div>
       </DialogBody>
       <DialogFooter className={'mt-2 text-center justify-center space-x-10'}>
         <Button
           variant="filled"
           color="red"
           onClick={handleClose}
           className="mr-1">
           <span>Cancel</span>
         </Button>
         <Button
           // variant="gradient"
           className="!bg-app_primary hover:opacity-60"
           onClick={handleSave}>
           <span>Confirm</span>
         </Button>
       </DialogFooter>
     </Dialog>
     </>
  )
}