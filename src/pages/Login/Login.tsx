import './Login.scoped.scss'
import { Input } from 'antd-mobile'
export default function Login() {
  return (
    <div className="login">
      <Input placeholder='请输入内容' clearable />
    </div>
  )
}
