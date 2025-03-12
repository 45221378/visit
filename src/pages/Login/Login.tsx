import "./Login.scss";
import { Form, Input } from "antd-mobile/2x";
export default function Login() {
  return (
    <div className="login">
      <div className="nav-top">
        <div className="logo"></div>
        <div className="change-lan"></div>
        <div className="play-music"></div>
      </div>
      <div className="banner">
        <p className="line"></p>
      </div>
      <div className="form-info">
        <p className="top-p">根据蒂升安全规定</p>
        <p className="top-p">请访问者填写相关信息，谢谢配合！</p>
        <Form layout="horizontal">
          <Form.Item label="姓名" name="username">
            <Input placeholder="请填写姓名" clearable />
          </Form.Item>
          <Form.Item label="手机号" name="password">
            <Input placeholder="请填写手机号" clearable type="password" />
          </Form.Item>
          <Form.Item label="访问日期" name="password">
            <Input placeholder="请填写手机号" clearable type="password" />
          </Form.Item>
          <Form.Item label="访客类型" name="password">
            <Input placeholder="请填写手机号" clearable type="password" />
          </Form.Item>
          <Form.Item label="访客国家" name="password">
            <Input placeholder="请填写手机号" clearable type="password" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
