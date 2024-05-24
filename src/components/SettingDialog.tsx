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
  // handleSave: () => void,
  setFontSize: (a: number) => void
  setFontFamily: (a: string) => void
  setLineHeight: (a: number) => void
  setFontColor: (a: string) => void
  setBackgroundColor: (a: string) => void
}

export const SettingDialog = (props:SettingDialogProps) => {
  const { open, handleClose, setBackgroundColor, setFontColor, setFontSize, setFontFamily, setLineHeight } = props;
  const [fontSize, setDialogFontSize] = React.useState(12);
  const [activeFont, setDialogActiveFont] = React.useState(0);
  const [lineHeight, setDialogLineHeight] = React.useState(1.5);
  const [fontColor, setDialogFontColor] = React.useState(0);
  const [backgroundColor, setDialogBackgroundColor] = React.useState(0);
  const fontFamily = [{
    name: 'Arial',
    class: 'font-sans',
    value: 'Arial, Helvetica, sans-serif',
  },{
    name: 'Georgia',
    class: 'font-serif',
    value: 'Georgia, serif',
  },
  {
    name: 'Times New Roman',
    class: 'font-mono',
    value: 'Times New Roman, serif',
  }];

  const handleSave = () => {
    setFontFamily(fontFamily[activeFont].value);
    setFontSize(fontSize);
    setFontColor(fontColors[fontColor].value);
    setBackgroundColor(bgColors[backgroundColor].value);
    setLineHeight(lineHeight);
    handleClose();
  }
  const fontColors = [
    {
      name: 'black',
      class: '!bg-black',
      value: 'rgb(0 0 0 / var(--tw-bg-opacity))',
    },
    {
      name: 'red',
      class: '!bg-red-500',
      value: 'rgb(244 67 54 / var(--tw-bg-opacity))',
    },
    {
      name: 'blue',
      class: '!bg-blue-500',
      value: 'rgb(33 150 243 / var(--tw-bg-opacity))',
    },
    {
      name: 'green',
      class: '!bg-green-500',
      value: 'rgb(16 185 129 / var(--tw-bg-opacity))',
    },
    {
      name: 'yellow',
      class: '!bg-yellow-300',
      value: 'rgb(255 193 7 / var(--tw-bg-opacity))',
    }
  ]

  const bgColors = [
    {
      name: 'secondary',
      class: '!bg-app_secondary',
      value: 'rgb(209 244 188 / var(--tw-bg-opacity))',
    },
    {
      name: 'red',
      class: '!bg-red-100',
      value: 'rgb(255 205 210 / var(--tw-bg-opacity))',
    },
    {
      name: 'cyan',
      class: '!bg-cyan-200',
      value: 'rgb(128 222 234 / var(--tw-bg-opacity))',
    },
    {
      name: 'deep-purple',
      class: '!bg-deep-purple-200',
      value: 'rgb(179 157 219 / var(--tw-bg-opacity))',
    },
    {
      name: 'lime',
      class: '!bg-lime-300',
      value: 'rgb(220 231 117 / var(--tw-bg-opacity))',
    },
    ]

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
                  <Button className="!rounded-none w-[5rem]" onClick={() => setDialogFontSize(fontSize - 1)}>A-</Button>
                  <Button className="w-[5rem]" disabled>{fontSize}</Button>
                  <Button className="!rounded-none w-[5rem]" onClick={() => setDialogFontSize(fontSize + 1)}>A+</Button>
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
                            setDialogActiveFont(index);
                            //  console.log('index:', index);
                          }
                          }
                          className={`font-family text-[0.5rem] option-1 text-black bg-white border`}
                          variant="outlined"
                          size="sm">{item.name}</Button>
                      </>;
                    })
                  }
                </>
              </div>
              <div className="flex flex-row space-x-2 font-color">
                {
                  fontColors.map((item, index) => {
                    return <>
                      <div
                        style={{
                          borderColor: fontColor === index ? 'var(--color-app_primary)' : 'var(--color-white)',
                          borderWidth: fontColor === index ? '4px' : '1px',
                        }}
                        className={`cursor-pointer w-[2rem] h-[2rem] rounded-full ${item.class}`}
                        onClick={() => setDialogFontColor(index)}
                      ></div>
                    </>;
                  })
                }
              </div>
              <div className="flex flex-row space-x-2 ">
                {
                  bgColors.map((item, index) => {
                    return <>
                      <div
                        style={{
                          borderColor: backgroundColor === index ? 'var(--color-app_primary)' : 'var(--color-white)',
                          borderWidth: backgroundColor === index ? '4px' : '1px',
                        }}
                        className={`cursor-pointer w-[2rem] h-[2rem] rounded-full ${item.class}`}
                        onClick={() => setDialogBackgroundColor(index)}
                      ></div>
                    </>;
                  })
                }
              </div>
              <div className="line-space">
                <ButtonGroup variant="outlined" color="black" size="sm">
                  <Button className="!rounded-none w-[5rem]"
                          onClick={() => setDialogLineHeight(lineHeight - 0.5)}>L-</Button>
                  <Button className="w-[5rem]" disabled>{lineHeight}</Button>
                  <Button className="!rounded-none w-[5rem]"
                          onClick={() => setDialogLineHeight(lineHeight + 0.5)}>L+</Button>
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