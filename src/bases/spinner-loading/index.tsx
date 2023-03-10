import { memo } from 'react';
import cls from 'classnames';

import './index.scss';

export interface SpinnerLoadingProps {
	size?: number;
	type: 'primary' | 'white' | 'default';
	styles?: React.CSSProperties;
	className?: string;
}

const classPrefix = 'spinner-loading';

const SpinnerLoading: React.FC<SpinnerLoadingProps> = memo((props) => {
	return (
		<div
			className={cls(
				classPrefix,
				`${classPrefix}-color-${props.type}`,
				props.className
			)}
			style={{
				width: `${props.size}px`,
				height: `${props.size}px`,
				...props.styles
			}}
		/>
	);
});

SpinnerLoading.defaultProps = {
	size: 32,
	type: 'primary',
	styles: {}
};

SpinnerLoading.displayName = 'SpinnerLoading';
export default SpinnerLoading;
