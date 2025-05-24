import axios from 'axios';

export const axiosMcrExisting = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVICE_ADMIN_URL,
  auth: {
    username: process.env.NEXT_PUBLIC_USERNAME_API_GL_CASA || '',
    password: process.env.NEXT_PUBLIC_PASSWORD_API_GL_CASA || '',
  },
  withCredentials: true,
});

export const axiosApiNext = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
});

export const axiosApiMCRGLCasa = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_MASSPRO_MCR_GL_CASA}`,
  auth: {
    username: process.env.NEXT_PUBLIC_USERNAME_API_GL_CASA || '',
    password: process.env.NEXT_PUBLIC_PASSWORD_API_GL_CASA || '',
  },
  withCredentials: true,
});

export const axiosApiMassCreditV2 = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_MASSPRO_MASSCREDIT_V2}`,
  auth: {
    username: process.env.NEXT_PUBLIC_USERNAME_API_GL_CASA || '',
    password: process.env.NEXT_PUBLIC_PASSWORD_API_GL_CASA || '',
  },
  withCredentials: true,
});

export const axiosApiMassDebetV2 = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_MASSPRO_MASSDEBET_V2}`,
  auth: {
    username: process.env.NEXT_PUBLIC_USERNAME_API_GL_CASA || '',
    password: process.env.NEXT_PUBLIC_PASSWORD_API_GL_CASA || '',
  },
  withCredentials: true,
});
export const axiosApiMassDebetBPUMV2 = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_MASSPRO_MASSDEBET_BPUM_V2}`,
  auth: {
    username: process.env.NEXT_PUBLIC_USERNAME_API_GL_CASA || '',
    password: process.env.NEXT_PUBLIC_PASSWORD_API_GL_CASA || '',
  },
  withCredentials: true,
});

export const axiosApiCloseBristars = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BRISTAR_API_CLOSE}/apiBristars/1.0`,
  auth: {
    username: process.env.ESB_BASIC_AUTH_USERNAME || '',
    password: process.env.ESB_BASIC_AUTH_PASSWORD || '',
  },
  withCredentials: true,
});

export const axiosApiCloseCasaretrieve = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ESB_API_CLOSE}/casaretrieve/1.0`,
  auth: {
    username: process.env.ESB_BASIC_AUTH_USERNAME || '',
    password: process.env.ESB_BASIC_AUTH_PASSWORD || '',
  },
  withCredentials: true,
});
