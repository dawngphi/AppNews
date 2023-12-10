import AxiosInstance from '../helpers/AxiosInstance';

export const register = async (email, password) => {
  const body = {email, password};
  const response = await AxiosInstance().post('/users/register', body);
  return response;
};
export const login = async (email, password) => {
  const body = {email, password};
  const response = await AxiosInstance().post('/auth/login', body);
  return response;
};
export const updateProfile = async (name, email, address, phone, birthday,avatar) => {
  try {
    const body = {name, email, address, phone, birthday,avatar};
    const response = await AxiosInstance().post('/users/update-profile', body);
    console.log('update response: ', response);
    return response;
  } catch (err) {
    console.log('update error: ', err.message);
  }
};