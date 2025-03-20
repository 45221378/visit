import { Select , Form, Input, Row, Col, Dropdown} from "antd";
import "./Login.scss";
import { MobileOutlined } from "@ant-design/icons";
import { Toast } from 'antd-mobile/2x'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { countryList } from "./country";
import Icon1 from "/src/assets/icon1.png"
import  Playdis from "/src/assets/play-dis.png"
export default function Login() {
  const [form] = Form.useForm()
  const  navigate = useNavigate()
  const [language, setLanguage ] = useState('CN')
  const userTpeList = [
    {
      value:'0',
      label:'政府'
    },
    {
      value:'1',
      label:'客户'
    },
    {
      value:'2',
      label:'合作伙伴'
    },
  ]
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
      key: 'CN',
      label: '中文',
    },
    {
      key: 'EN',
      label: 'English',
    },
  ]

  const onClick = ({key}:any ) =>{
    setLanguage(key)
  }

  const doGetCurrentTime = ()=>{
    const visitDate = new Date();
    const formattedDate = `${visitDate.getFullYear()}-${String(visitDate.getMonth() + 1).padStart(2, '0')}-${String(visitDate.getDate()).padStart(2, '0')} ${String(visitDate.getHours()).padStart(2, '0')}:${String(visitDate.getMinutes()).padStart(2, '0')}:${String(visitDate.getSeconds()).padStart(2, '0')}`;
    return formattedDate
  }
  const doSumitFormData = ()=>{
    form.validateFields().then(values=>{
      console.log(values)
      if(values.type){
        if(values.country){
          if(values.name){
            if(values.mobile){
              const phoneRegex = /^1[3-9]\d{9}$/;
              if (!phoneRegex.test(values.mobile)) {
                Toast.show({
                  content: '请输入有效的手机号',
                });
                return;
              }
              axios.post('https://admin.somark.cn/api/visitor/register',{
                ...values,
                visit_date: doGetCurrentTime()
              })
              .then((res:any)=>{
                console.log(res)
                if(res.data.code==200){
                  Toast.show({
                    content: '登记成功',
                  })
                  navigate(`/home?id=${res.data.data.id}`)
                }else{
                  Toast.show({
                    content: '登记失败,请重新再试',
                  })
                }
              })
              .catch((err)=>{
                Toast.show({
                  content: '登记失败,请重新再试',
                })
              })
            }else{
              Toast.show({
                content: '请输入手机号',
              })
            }
          }else{
            Toast.show({
              content: '请输入姓名',
            })
          }
        }else{
          Toast.show({
            content: '请选择国家/地区',
          })
        }
      }else{
        Toast.show({
          content: '请选择访客类型',
        })
      }
    })
    .catch((err)=>{

    })
  }
  return (
    <div className="login">
      <div className="main-pic"></div>
      <div className="login-box">

      </div>
      <div className="login-two"></div>
      
      <div className="login-main">
      <div className="nav-top">
          <div className="logo"></div>
          <div className="nav-right">
            <Dropdown menu={{ items , selectable: true, onClick }} placement="bottom">
              <div className="change-lan">
                <span>{language=='CN'?'中文':'English'}</span>
                <img src={Icon1} alt="" className="down" />
              </div>
            </Dropdown>
            
            <div className="play-music">
              <img src={Playdis} alt="" className="icon" />
            </div>
          </div>
        </div>
        <div className="banner">
          <p className="line"></p>
          {/* <div className="bg-two"></div> */}
        </div>
        <div className="form-info">
          <p className="top-p">根据蒂升安全规定</p>
          <p className="top-p">请访问者填写相关信息，谢谢配合！</p>
          <Form layout="horizontal" className="login-form" form={form}>
            <div className="form-item">
              <div className="label">
                访客类型
              </div>
              <div className="form-input">
              <Form.Item  name="type" >
                  <Select  placeholder='请选择' options={userTpeList}></Select>
                </Form.Item>
              </div>
            </div>

            <div className="form-item">
              <div className="label">
              国家/地区
              </div>
              <div className="form-input">
              <Form.Item  name="country">
                  <Select placeholder='请选择' options={countryList.map((v:any)=>({
                    label: language=='CN'?  v.chineseName:v.name,
                    value:v.alpha_2
                  }))}></Select>
                </Form.Item>
              </div>
            </div>

            <div className="form-item">
              <div className="label">
              姓名
              </div>
              <div className="form-input">
              <Form.Item  name="name" >
                  <Input placeholder='请输入' />
                </Form.Item>
              </div>
            </div>

            <div className="form-item">
              <div className="label">
              手机号
              </div>
              <div className="form-input">
              <Form.Item  name="mobile">
                {/* suffix={<MobileOutlined style={{marginInlineStart:-10}} />} */}
                  <Input placeholder='请输入' /> 
                </Form.Item>
              </div>
            </div>
          </Form>

          <div className="submit-btn" onClick={doSumitFormData} >
            确认提交
          </div>
        </div>
      </div>

      
    </div>
  );
}
