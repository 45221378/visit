import { Select, Form, Input, Row, Col, Dropdown, Divider } from "antd";
import "./Login.scss";
import "/src/font.scss";
import { MobileOutlined } from "@ant-design/icons";
import { Toast, Radio, Space, Button } from "antd-mobile/2x";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { countryList } from "./country";
import Icon1 from "/src/assets/icon1.png";
import Playdis from "/src/assets/new/play-dis1.png";
import PlaydisTwo from "/src/assets/play-dis.png";

import { useGlobalContext } from "/src/context/globalContext";
import setLocaleInit from "/src/locale";
export default function Login() {
  const { setLocallan, locallan } = useGlobalContext();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("zh_cn");
  const [isRotated, setIsRotated] = useState(false);
  const { isPlaying, doPlayAudioToggle } = useGlobalContext();
  const userTpeList = [
    {
      value: "0",
      label: "政府",
    },
    {
      value: "1",
      label: "客户",
    },
    {
      value: "2",
      label: "合作伙伴",
    },
  ];
  // const countryList = [
  //   {
  //     value:'CN',
  //     label:'中国'
  //   },
  //   {
  //     value:'US',
  //     label:'美国'
  //   },
  //   {
  //     value:'TH',
  //     label:'泰国'
  //   },
  //   {
  //     value:'MY',
  //     label:'马来西亚'
  //   },
  // ]
  const items: any = [
    {
      key: "zh_cn",
      label: "中文",
      danger: language == "zh_cn",
    },
    {
      key: "en",
      label: "English",
      danger: language == "en",
    },
  ];

  const onClick = ({ key }: any) => {
    setLocaleInit(key).then((res) => {
      // console.log(res);
      setLocallan(res);
    });
    setLanguage(key);
    localStorage.setItem("lan", key);
  };

  const handleDropdownVisibleChange = (visible: boolean) => {
    setIsRotated(visible);
  };

  const doGetCurrentTime = () => {
    const visitDate = new Date();
    const formattedDate = `${visitDate.getFullYear()}-${String(
      visitDate.getMonth() + 1
    ).padStart(2, "0")}-${String(visitDate.getDate()).padStart(
      2,
      "0"
    )} ${String(visitDate.getHours()).padStart(2, "0")}:${String(
      visitDate.getMinutes()
    ).padStart(2, "0")}:${String(visitDate.getSeconds()).padStart(2, "0")}`;
    return formattedDate;
  };
  const doSumitFormData = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        if (values.type) {
          if (values.country) {
            if (values.name) {
              if (values.factory) {
                if (values.mobile) {
                  const phoneRegex = /^1[3-9]\d{9}$/;
                  if (!phoneRegex.test(values.mobile)) {
                    Toast.show({
                      content: "请输入有效的手机号",
                    });
                    return;
                  }
                  axios
                    .post("https://admin.somark.cn/api/visitor/register", {
                      ...values,
                      visit_date: doGetCurrentTime(),
                    })
                    .then((res: any) => {
                      console.log(res);
                      if (res.data.code == 200) {
                        Toast.show({
                          content: "登记成功",
                        });
                        navigate(`/home?id=${res.data.data.id}`);
                      } else {
                        Toast.show({
                          content: "登记失败,请重新再试",
                        });
                      }
                    })
                    .catch((err) => {
                      Toast.show({
                        content: "登记失败,请重新再试",
                      });
                    });
                } else {
                  Toast.show({
                    content: "请输入手机号",
                  });
                }
              } else {
                Toast.show({
                  content: "请选择厂区",
                });
              }
            } else {
              Toast.show({
                content: "请输入姓名",
              });
            }
          } else {
            Toast.show({
              content: "请选择国家/地区",
            });
          }
        } else {
          Toast.show({
            content: "请选择访客类型",
          });
        }
      })
      .catch((err) => {});
  };

  // useEffect(() => {
  //   // 确保在初始化时不应用动画
  //   setIsRotated(false);
  // }, []);

  return (
    <div className={`${locallan} login`}>
      {locallan === "en" ? (
        <div className="noddd">131</div>
      ) : (
        <div className="noddd">123</div>
      )}
      {/* <div className="main-pic"></div> */}
      {/* <div className="login-box"></div> */}
      {/* <div className="login-two"></div> */}

      <div className="login-main">
        <div className="nav-top">
          <div className="logo"></div>
          <div className="nav-right">
            <Dropdown
              menu={{ items, selectable: true, onClick }}
              placement="bottom"
              onOpenChange={handleDropdownVisibleChange}
              open={isRotated}
            >
              <div className="change-lan">
                <span>{language == "zh_cn" ? "中文" : "English"}</span>
                <img
                  src={Icon1}
                  alt=""
                  className={`icon-img ${
                    isRotated ? "rotated" : "not-rotated"
                  }`}
                />
              </div>
            </Dropdown>

            {/* <Dropdown className="language-dropdown">
              <Dropdown.Item key='sorter' title={language == "CN" ? "中文" : "English"}>
                <Space direction='vertical' className="my-space" >
                  <Button className="language-btn" onClick={()=>onClick('CN')}>
                    中文
                  </Button>
                  <Button className="language-btn" onClick={()=>onClick('EN')} >
                    English
                  </Button>
                </Space>
              </Dropdown.Item>
            </Dropdown> */}
            {/* <div className="play-music">
              <img src={!isPlaying?Playdis:PlaydisTwo}  onClick={doPlayAudioToggle}  alt="" className="icon" />
            </div> */}
          </div>
        </div>
        <div className={`${language == "zh_cn" ? "zhcn1" : "en1"} banner`}>
          <p className="line"></p>
          {/* <div className="bg-two"></div> */}
        </div>
        <div className="form-info">
          <p className={`${language == "zh_cn" ? "font-zhcn1" : "font-en1"} top-p`}>根据蒂升安全规定</p>
          <p className={`${language == "zh_cn" ? "font-zhcn1" : "font-en1"} top-p`}>请访问者填写相关信息，谢谢配合！</p>
          <Form layout="horizontal" className="login-form" form={form}>
            <div className="form-item">
              <div className={`${language == "zh_cn" ? "font-zhcn2" : "font-en2"} label`}>访客类别</div>
              <div className="form-input">
                <Form.Item name="type">
                  <Select placeholder="请选择" options={userTpeList}></Select>
                </Form.Item>
              </div>
            </div>

            <div className="form-item">
              <div className={`${language == "zh_cn" ? "font-zhcn2" : "font-en2"} label`}>国家/地区</div>
              <div className="form-input">
                <Form.Item name="country">
                  <Select
                    placeholder="请选择内容"
                    options={countryList.map((v: any) => ({
                      label: language == "CN" ? v.chineseName : v.name,
                      value: v.alpha_2,
                    }))}
                  ></Select>
                </Form.Item>
              </div>
            </div>

            <div className="form-item">
              <div className={`${language == "zh_cn" ? "font-zhcn2" : "font-en2"} label`}>姓名</div>
              <div className="form-input">
                <Form.Item name="name">
                  <Input placeholder="请填写内容" />
                </Form.Item>
              </div>
            </div>

            <div className="form-item">
              <div className={`${language == "zh_cn" ? "font-zhcn2" : "font-en2"} label`}>手机号</div>
              <div className="form-input">
                <Form.Item name="mobile">
                  {/* suffix={<MobileOutlined style={{marginInlineStart:-10}} />} */}
                  <Input placeholder="请填写内容" />
                </Form.Item>
              </div>
            </div>

            <div className="form-item">
              <div className={`${language == "zh_cn" ? "font-zhcn2" : "font-en2"} label`}>访问厂区</div>
              <div className="form-input">
                <Form.Item name="factory">
                  <Select
                    placeholder="请选择厂区"
                    options={[
                      "上海松江工厂",
                      "中山电梯工厂",
                      "中山扶梯工厂",
                    ].map((v: any) => ({
                      label: v,
                      value: v,
                    }))}
                  ></Select>
                </Form.Item>
              </div>
            </div>
          </Form>

          <div className={`${language == "zh_cn" ? "font-zhcn1" : "font-en1"} submit-btn`} onClick={doSumitFormData}>
            确认提交
          </div>
        </div>
      </div>
    </div>
  );
}
