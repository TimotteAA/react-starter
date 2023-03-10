import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const config: AxiosRequestConfig = {
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json; charset=utf-8'
	},
	responseType: 'json'
};

const axiosInstance = axios.create(config);

// 响应拦截器
axiosInstance.interceptors.response.use(
	(res: AxiosResponse) => {
		if (res.status !== 200 || !res.data) {
			throw 'error';
		}
		return res.data;
	},
	(err: AxiosError) => {
		throw err;
	}
);

export default axiosInstance;
