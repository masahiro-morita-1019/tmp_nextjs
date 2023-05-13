import axios from 'axios'; // eslint-disable-line

// 共通処理
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PROXY_API_ENDPOINT,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  timeout: 10000,
  responseType: 'json',
});

// // 初期情報の取得
// export const initSession = (idToken: string) => {
//   const options: AxiosRequestConfig = {
//     method: 'post',
//     url: `/session/init`,
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//       Authorization: idToken,
//     },
//   };
//   return instance.request(options);
// };

// 住所検索
export const searchAddress = (zipcode: string) => {
  return axios({
    method: 'get',
    url: `https://zipcloud.ibsnet.co.jp/api/search`,
    params: {
      zipcode: zipcode,
    },
    timeout: 10000,
    responseType: 'json',
  });
};
