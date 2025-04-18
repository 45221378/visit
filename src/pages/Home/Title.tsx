import { FC, useEffect, useState } from "react"



export const Title: FC<{
  text?: string
}> = ({
  text
}) => {
    const [language, setLanguage] = useState("zh_cn");
    useEffect(() => {
      setLanguage(localStorage.getItem("lan") || "zh_cn");
    });
    return (
      <div className={` ${language == "zh_cn" ? "title-normal" : "title-normal"
        }`} >
        <div className="jiao-top"></div>
        <span>{text}</span>
        <div className="jiao-bottom"></div>
      </div >
    )
  } 