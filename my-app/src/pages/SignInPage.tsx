import { Button, Form, Input } from 'antd'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useNavigate } from 'react-router-dom'
import { loginHandler } from '../features/auth/authHandler'
import { selectorAuth } from '../features/auth/authSlice'

const SignInPageStyle = styled.div`
  margin-top: 35px;
  width: 500px;
  margin: 0 auto;
`

const SignInPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const onSubmitHandler = async (values: any) => {
    await loginHandler(values, dispatch, navigate)
  }

  const auth = useAppSelector(selectorAuth)

  return (
    <SignInPageStyle>
      <div className="content">
        <h2>SignIn</h2>
      </div>
      <p className="error">{auth.isError}</p>
      <Form autoComplete="off" onFinish={onSubmitHandler} wrapperCol={{ span: 32 }}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter your email'
            },
            { whitespace: true },
            { min: 6 }
          ]}
          hasFeedback
        >
          <Input size="large" placeholder="enter youe email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password'
            },
            { whitespace: true },
            { min: 3 },
            { max: 20 }
          ]}
          hasFeedback
        >
          <Input.Password size="large" placeholder="enter your password ..." />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </SignInPageStyle>
  )
}

export default SignInPage
