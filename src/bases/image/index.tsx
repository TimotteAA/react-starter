import { memo, useRef } from 'react';

import useObserverHooks from '@/hooks/useObserverHooks';

export interface ImageProps {
	/**
	 * img图片源
	 */
	src?: string;
	/**
	 * 说明
	 */
	alt?: string;
	/**
	 * 宽
	 */
	width?: string | number;
	/**
	 * 高
	 */
	height?: string | number;
	/**
	 * 懒加载占位图
	 */
	loading?: string;
	style?: React.CSSProperties;
	/**
	 * 是否懒加载
	 */
	lazy?: boolean;
	/**
	 * 图片填充模式
	 */
	fit?: 'contain' | 'cover' | 'fill' | 'scale-down';
	className?: string;
	/**
	 * 点击的回调
	 * @param e
	 * @returns
	 */
	onClick?: (e: React.MouseEvent<HTMLImageElement, Event>) => void;
	/**
	 * 加载错误的回调
	 * @param e
	 * @returns
	 */
	onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
	/**
	 * 加载完成的回调
	 * @param e
	 * @returns
	 */
	onLoad?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
	/**
	 * 是否可以拖动
	 */
	draggable?: boolean;
}

const Image: React.FC<ImageProps> = memo((props) => {
	const imageRef = useRef<HTMLImageElement>(null);
	const entry = useObserverHooks(imageRef, {});

	return (
		<img
			src={
				entry?.isIntersecting || !props.lazy ? props.src : props.loading
			}
			alt={props.alt}
			width={props.width}
			height={props.height}
			className={props.className}
			style={{ ...props.style, objectFit: props.fit }}
			draggable={props.draggable}
			onClick={props.onClick}
			onLoad={props.onLoad}
			onError={props.onError}
		/>
	);
});

Image.displayName = 'Image';

Image.defaultProps = {
	draggable: false,
	alt: '',
	width: '100%',
	height: '100%',
	lazy: false,
	fit: 'fill',
	loading:
		'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8/x8AAqMB0Fk+W34AAAAASUVORK5CYII='
};

export default Image;
