import styles from './index.module.scss';
import { Header } from './components/header';
import { Loading } from '@/components/loading';
import { ErrorBlock } from '@/bases';
import { Swiper } from '@/bases';
import Navbar from './components/navbar';

import { useRequest } from '@/hooks/useRequest';
import api from './api';

export const Home: React.FC = () => {
	const { data, error, isLoading } = useRequest<any>({
		url: api.getHomeData,
		method: 'get'
	});

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		// return <ErrorBlock styles={{ '--image-width': '300px' }} />;
		return <ErrorBlock />;
	}

	console.log(data, error);

	return (
		<div className={styles.home}>
			<Header />
			<Swiper
				autoplay
				loop
				showIndicator
				style={{ '--swiper-border-radius': '15px' }}
			>
				{data?.banner.map((b: any) => {
					return (
						<Swiper.Item key={b.alt}>
							<img
								src={b.src}
								alt={b.alt}
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'fill'
								}}
							/>
						</Swiper.Item>
					);
				})}
			</Swiper>
			<Navbar />
		</div>
	);
};

Home.displayName = 'Home';
