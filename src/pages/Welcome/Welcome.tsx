import { useEffect, useState } from "react";
import "./index.scss";
const WelcomePage = () => {
  const [language, setLanguage] = useState("zh_cn");

  useEffect(() => {
    setLanguage(localStorage.getItem("lan") || "zh_cn");
  }, []);
  
  return (
    <div className="welcome">
      <div className="wel-top">
        <div className="logo"></div>
      </div>
      <div className="wel-two">
        <div className="wel-text">
          <div
            className={`${
              language == "zh_cn" ? "font-zhcn1" : "font-en1"
            } text`}
          >
            您已完成TKE中国工厂安全须知
          </div>
          <div
            className={`${
              language == "zh_cn" ? "font-zhcn1" : "font-en1"
            } text`}
          >
            感谢您的配合！
          </div>
          <div
            className={`${
              language == "zh_cn" ? "font-zhcn1" : "font-en1"
            } text`}
          >
            期待未来与您在工厂相见！
          </div>
        </div>
        <div className="arrow animte"></div>
      </div>
    </div>
  );
};

export default WelcomePage;
