import { memo, useMemo } from 'react';
import cls from 'classnames';

import './styles/swiper-indicator.scss';

export interface SwiperIndicatorProps {
	/**总轮播图数量 */
	count: number;
	/**
	 * 当前轮播图
	 */
	currentIdx: number;
	/**
	 * 自定义样式
	 */
	className?: string;
}

const SwiperIndicator: React.FC<SwiperIndicatorProps> = memo((props) => {
	// 根据count数量创建的数组
	const dots = useMemo(() => {
		return new Array(props.count).fill(0);
	}, [props.count]);

	return (
		<div className={cls('swiper-indicator', props.className)}>
			{dots.map((_, idx) => {
				return (
					<div
						key={idx}
						className={cls('swiper-indicator-dot', {
							'swiper-indicator-dot-active':
								idx === props.currentIdx
						})}
					></div>
				);
			})}
		</div>
	);
});

SwiperIndicator.displayName = 'SwiperIndicator';

export default SwiperIndicator;
