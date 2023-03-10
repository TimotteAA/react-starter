import './styles/swiper-item.scss';

export interface SwiperItemProps {
	children: React.ReactNode;
}

const SwiperItem: React.FC<SwiperItemProps> = (props) => {
	return <div className="swiper-item">{props.children}</div>;
};

SwiperItem.displayName = 'SwiperItem';

export { SwiperItem };
