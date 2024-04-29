import React from 'react';

export type IconTextProps = {
  fontSize?: string
  iconComp?: React.JSX.Element
  textContent?:string
}

export const IconText = (props:IconTextProps) => {
  const { textContent, fontSize = '0.8rem', iconComp } = props

  return (
    <>
    <div className="flex flex-row items-center justify-center">
      {iconComp}
      <p style={{
        fontSize:fontSize
      }}>{textContent}</p>
    </div>
    </>
  )
}