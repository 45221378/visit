import { FC } from "react"



export const Title:FC<{
  text?:string 
}> = ({
  text
})=>{
  return (
    <div className='title-normal'>
      <div className="jiao-top"></div>
      <span>{text}</span>
      <div className="jiao-bottom"></div>
    </div>
  )
} 