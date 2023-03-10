import { Children, useState, useRef, isValidElement, useMemo } from 'react';
import SwiperIndicator from './SwiperIndicator';
import './styles/swiper.scss';

export interface SwiperProps {
	// 自动播放
	autoplay?: boolean;
	/** 循环轮播 */
	loop?: boolean;
	/** 默认显示的index */
	defaultIndex?: number;
	children: React.ReactNode[];
	style?: React.CSSProperties &
		Partial<
			Record<
				| '--swiper-width'
				| '--swiper-height'
				| '--swiper-track-padding'
				| '--swiper-border-radius',
				string
			>
		>;
	/**
	 * 是否显示指示器
	 */
	showIndicator?: boolean;
	indicatorClass?: string;
}

/**
 * 手动轮播：计算轨道start与move的距离，换算成轨道移动的比例
 * 根据移动的比例，判断移动了几张图片，然后修改currentIdx，利用transform改变位置
 *
 * @param props
 * @returns
 */
const Swiper: React.FC<SwiperProps> = (props) => {
	const [currentIdx, setCurrentIdx] = useState<number>(
		props.defaultIndex ?? 0
	);
	const touchStartPosition = useRef<number>(0);
	// 移动比例
	const slideRatio = useRef<number>(0);
	const trackRef = useRef<HTMLDivElement>(null);

	// 只有在拖动时才有动画
	const [dragging, setDragging] = useState<boolean>(false);

	// 判断是否都是Swiper.Item
	const { validChildren, count } = useMemo(() => {
		let count = 0;

		const validChildren = Children.map(props.children, (child) => {
			if (!isValidElement(child)) {
				console.error('component is not a valid react element');
			}

			count++;
			return child;
		});
		return { count, validChildren };
	}, [props.children]);

	/**
	 * slide的初始transform位置
	 * @param index
	 * @returns
	 */
	const getPosition = (index: number) => {
		// 第一张图片 0(currentIdx) * 100 + 0 * 100;
		// 第一张图片 0 * 100 + 0 * 100: 100%
		// 第二张图片 0 * 100 + 1 * 100: 200%
		const finalPosition = -currentIdx * 100 + index * 100;
		return finalPosition;
	};

	const getTransition = () => {
		if (!dragging) return '';

		return 'transform 0.3s ease-out 0s';
	};

	/**
	 * 防止index越界
	 * @param index
	 */
	const boundIndex = (index: number) => {
		const min = 0;
		const max = count - 1;
		let res = Math.min(index, max);
		res = Math.max(min, res);
		return res;
	};

	/**
	 * 计算轨道移动的比例
	 * @param diff
	 * @returns
	 */
	const getSlideRatio = (diff: number) => {
		const element = trackRef.current;
		if (!element) return 0;
		return diff / element.offsetWidth;
	};

	const swipeTo = (index: number) => {
		const targetIdx = boundIndex(index);
		setCurrentIdx(targetIdx);
	};

	const onTouchMove = (e: TouchEvent) => {
		const position = e.changedTouches[0].clientX;
		const diff = touchStartPosition.current - position;
		// 移动差值，计算百分比
		slideRatio.current = getSlideRatio(diff) as number;
		// 新的索引
		let p = currentIdx + slideRatio.current;

		// 限制bound
		if (!props.loop) {
			p = boundIndex(p);
		}
		setCurrentIdx(p);
	};

	const onTouchEnd = () => {
		// 取整计算移动的比例
		const index = Math.round(slideRatio.current);
		slideRatio.current = 0;

		const targetIndex = index + currentIdx;
		swipeTo(targetIndex);

		document.removeEventListener('touchmove', onTouchMove);
		document.removeEventListener('touchend', onTouchEnd);
	};

	const onTouchStart = (e: React.TouchEvent) => {
		touchStartPosition.current = e.changedTouches[0].clientX;
		setDragging(true);

		// touchMove
		document.addEventListener('touchmove', onTouchMove);
		// touchEnc
		document.addEventListener('touchend', onTouchEnd);
	};

	const renderChildren = () => {
		return (
			<div className="swiper-track-inner">
				{Children.map(validChildren, (child, idx) => {
					const position = getPosition(idx);

					return (
						<div
							className="swiper-track-slide"
							key={idx}
							// left四张图在一起
							// 通过transform移动到正确的位置
							style={{
								left: `-${idx * 100}%`,
								transform: `translate3d(${position}%, 0, 0)`,
								transition: getTransition()
							}}
						>
							{child}
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<div className="swiper" style={{ ...props.style }}>
			<div
				className="swiper-track"
				ref={trackRef}
				onTouchStart={onTouchStart}
			>
				{renderChildren()}
			</div>
			{props.showIndicator && (
				<SwiperIndicator
					count={count}
					currentIdx={
						slideRatio.current > 0
							? Math.floor(currentIdx)
							: Math.ceil(currentIdx)
					}
					className={props.indicatorClass}
				/>
			)}
		</div>
	);
};

Swiper.displayName = 'Swiper';

export { Swiper };
