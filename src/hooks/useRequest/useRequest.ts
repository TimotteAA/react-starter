import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { AxiosRequestConfig, AxiosError } from 'axios';
import axiosInstance from './axiosInstance';

// 根据后端返回定义的response
// Data泛型是真正取得数据类型
interface Response<Data> {
	data: Data;
	code: number;
	msg: string;
}

// useRequest返回类型
interface useRequestResponse<Data, Error>
	// Pick与useSWr调用一致
	extends Pick<
		SWRResponse<Response<Data>, AxiosError<Error>>,
		'isValidating' | 'mutate' | 'error' | 'isLoading'
	> {
	data: Data | undefined;
	response: Response<Data> | undefined;
}

export function useRequest<Data = unknown, Err = unknown>(
	request: AxiosRequestConfig,
	config?: SWRConfiguration
): useRequestResponse<Data, Err> {
	// fetcher调用axios实例发送请求
	const {
		data: response,
		error,
		isLoading,
		mutate,
		isValidating
	} = useSWR<Response<Data>, AxiosError<Err>>(
		request.url,
		() => axiosInstance.request(request),
		config
	);

	return {
		data: response?.data,
		response,
		error,
		isLoading,
		mutate,
		isValidating
	};
}
