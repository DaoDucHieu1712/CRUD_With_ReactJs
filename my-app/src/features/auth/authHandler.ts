import { toast } from 'react-toastify'
import AuthApi from '../../api/Hieu/AuthApi'
import { logOut, saveToken } from '../../config/auth'
import { authActions } from './authSlice'

export const loginHandler = async (data: any, dispatch: any, navigate: any) => {
  dispatch(authActions.login())
  try {
    logOut()
    const res = await AuthApi.signIn(data)
    console.log(res)
    localStorage.setItem('user', JSON.stringify({ accountId: res.accountId, name: res.name }))
    dispatch(authActions.loginSuccess())
    saveToken(res.accessToken, res.refreshToken)
    navigate('/')
  } catch (error) {
    dispatch(authActions.loginFailed(`Username or password is wrong !!!!`))
    toast.error(`${error}`)
  }
}
