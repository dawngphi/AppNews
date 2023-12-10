import AxiosInstance from "../helpers/AxiosInstance";


// lay danh sach tin tuc
export const getNews = async () => {
    try {
        const response = await AxiosInstance().get("/articles");
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// lay chi tiet tin tuc
export const getNewsDetail = async (id) => {
    try {
        const response = await AxiosInstance().get(`/articles/${id}/detail`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// upload anh len server
export const uploadImage = async (form) => {
    try {
        const res = await AxiosInstance('multipart/form-data').post('/media/upload', form);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

// them tin tuc
export const addNews = async data => {
    try {
      const response = await AxiosInstance().post('/articles', data);
      console.log('respone', response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  export const getMyNews = async () => {
    try {
        const response = await AxiosInstance().get('/articles/my-articles');
        return response;
    }
    catch (error) {
        console.log(error);
    }
}
