import { CSSProperties, memo, ReactNode, useMemo } from 'react';

import './styles/grid-item.scss';

export interface GridItemProps {
	chlidren?: ReactNode;
	/**
	 * 占据列数
	 */
	span?: number;
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const GridItem: React.FC<GridItemProps> = memo((props) => {
	// 换算成scss变量
	const style = useMemo(() => {
		return {
			'--item-span': props.span
		};
	}, [props.span]);

	return (
		<div
			className="grid-item"
			style={{ ...style } as CSSProperties}
			onClick={props.onClick}
		>
			{props.chlidren}
		</div>
	);
});

GridItem.displayName = 'GridItem';
GridItem.defaultProps = {
	span: 1
};

export default GridItem;
