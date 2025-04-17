import { useEffect, useRef, useState } from "react";
import "./Home.scope.scss";
import '/src/font.scss'
import { Title } from "./Title";
import ImgOne from "/src/assets/images/img-one.png";

import playdis from "/src/assets/new/play-dis1.png";
import Imgtwo from "/src/assets/images/imgtwo.png";
import img3 from "/src/assets/images/img-3.png";
import img4 from "/src/assets/images/img-4.png";
import img5 from "/src/assets/images/img-5.png";
import img6 from "/src/assets/images/img-6.png";
import img7 from "/src/assets/images/img-7.png";

import img8 from "/src/assets/images/img-8.png";
import img9 from "/src/assets/images/img-9.png";
import img10 from "/src/assets/images/img-10.png";
import img12 from "/src/assets/images/img-12.png";

import VideoUrl from "/src/assets/video/zh_cn.mp4";
import PlayIcon from "/src/assets/images/play.png";

import VideoUrlen from "/src/assets/video/en.mp4";
import PlayIconen from "/src/assets/images/play.png";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast } from "antd-mobile/2x";

import Playdis from "/src/assets/new/play-dis1.png";
import PlaydisTwo from "/src/assets/play-dis.png";

import { useGlobalContext } from "/src/context/globalContext";
const HomePage = () => {
  const [language, setLanguage] = useState("zh_cn");
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [endedVideo, setEndedVideo] = useState<boolean>(false);
  const { isPlaying, doPlayAudioToggle } = useGlobalContext();

  const videoRef: any = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const getComplete = () => {
    navigate("/welcome");

    if (endedVideo) {
      axios
        .get("https://admin.somark.cn/api/visitor/update", {
          params: { id },
        })
        .then((res: any) => {
          navigate("/welcome");
        });
    } else {
      Toast.show("请观看完视频");
    }
  };
  const playVideoHandle = () => {
    setIsPlay(true);

    setTimeout(() => {
      videoRef.current.play();
    }, 10);
  };
  useEffect(() => {
    if (isPlay) {
      videoRef.current.addEventListener("ended", () => {
        setIsPlay(false);
        setEndedVideo(true);
      });
    }
    setLanguage(localStorage.getItem("lan") || "zh_cn");
  }, [isPlay]);
  return (
    <div className="home">
      <div className="home-top">
        <div className="top-box">
          <div className="left-icon"></div>
          <div className="right-icon">
            {/* <img src={playdis} alt="" className="icon" /> */}
            {/* <img src={!isPlaying?Playdis:PlaydisTwo}  onClick={doPlayAudioToggle}  alt="" className="icon" /> */}
          </div>
        </div>
        <div className={`top-text ${language == "zh_cn" ? "font-zhcn1" : "font-en1"}`}></div>
      </div>

      <div className="home-box">
        {/* <div className="home-one ">
          <Title text="进入厂区前准备"></Title>
          <div className="home-one-text">
            <p className="one-text">请提前与蒂升工作人员取得联系</p>
            <p className="one-text">并在其陪同下完成入场准备</p>
          </div>
          <div className="home-one-imgs">
            <img src={ImgOne} className="one-left-img" />
            <div className="right-boxs">
              <img src={Imgtwo} className="one-right-img" />
              <img src={img3} className="two-right-img" />
            </div>
          </div>
        </div> */}

        {/* <div className="home-two">
          <Title text="参观前的个人防护"></Title>
          <div className="home-one-text">
            <p className="one-text">进入生产区域参观前</p>
            <p className="one-text">请佩戴好个人防护用品</p>
          </div>

          <div className="two-box">
            <div className="two-box-left">
              <div className="item">
                <img src={img6} alt="" className="item-img" />
                <div className="item-text">护目镜</div>
              </div>
              <div className="item">
                <img src={img7} alt="" className="item-img" />
                <div className="item-text">耳塞</div>
              </div>
              <div className="item">
                <img src={img4} alt="" className="item-img" />
                <div className="item-text">安全鞋</div>
              </div>
              <div className="item">
                <img src={img5} alt="" className="item-img" />
                <div className="item-text">安全帽</div>
              </div>
            </div>
            <div className="two-right-img">
              <img src={img9} alt="" />
            </div>
          </div>
        </div> */}

        <div className="home-three">
          <Title text="TKE中国区工厂参观安全指引"></Title>
          <div className="videx-box">
            {isPlay && (
              <video
                controls
                ref={videoRef}
                className="video"
                src={
                  localStorage.getItem("lan") === "en" ? VideoUrlen : VideoUrl
                }
              ></video>
            )}
            {!isPlay && <img src={img10} alt="" className="poster" />}
            {!isPlay && (
              <img
                src={PlayIcon}
                alt=""
                className="play"
                onClick={playVideoHandle}
              />
            )}
          </div>
          <div className="comment-box">
            <div className="box-one"></div>
            <div className={`${language == "zh_cn" ? "font-zhcn2" : "font-en2"} box-two`}>
              如有疑问，请随时向陪同工作人员寻求帮助
            </div>
            <img src={img8} alt="" className="people" />
          </div>
        </div>

        {/* <div className="home-four">
          <Title text="风险提示"></Title>
          <img src={img12} alt="" className="safe" />
          <div className="four-box">
            防止滑倒和绊倒、防止被物体撞击或挤压、防止被车辆撞击、防止触电、防止吊物风险
          </div>
        </div> */}

        <div
          className="complete-btn"
          onClick={() => {
            getComplete();
          }}
        >
          点击完成
        </div>
      </div>
    </div>
  );
};

export default HomePage;
