import apiClient from './api.config'

const auth = {
  login: async (payload: any) => {
    return await apiClient.post('/users/signin', {
      email: payload.email,
      password: payload.password,
    })
  },
  verify: async (payload: any) => {
    return await apiClient.post('/users/verify-email', {
      email: payload.email,
    })
  },
  verifyCode: async (payload: any) => {
    return await apiClient.post('/users/verify-code', {
      email: payload.email,
      code: payload.code,
    })
  },
  signup: async (payload: any) => {
    return await apiClient.post('/users/signup', {
      email: payload.email,
      name: payload.name,
      password: payload.password,
      verificationCode: payload.verificationCode,
    })
  },
}

export default auth
