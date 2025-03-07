import "./Login.scoped.scss";
import { Form, Input } from "antd-mobile/2x";
export default function Login() {
  return (
    <div className="login">
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
  );
}
