import { Swiper as InternalSwipper } from './Swiper';
import { SwiperItem } from './SwiperItem';

export type { SwiperProps } from './Swiper';
export type { SwiperItemProps } from './SwiperItem';

export type Swiper = typeof InternalSwipper & {
	Item: typeof SwiperItem;
};

const Swiper = InternalSwipper as Swiper;
Swiper.Item = SwiperItem;

export default Swiper;
