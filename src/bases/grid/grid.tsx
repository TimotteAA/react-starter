import { CSSProperties, memo, useMemo } from 'react';

import './styles/grid.scss';

export interface GridProps {
	/**
	 * 列数
	 */
	columns: number;
	/**
	 * GridItem
	 */
	children?: React.ReactNode;
	/**
	 * 间隔
	 */
	gap?: number | string | [number | string, number | string];
}

const Grid: React.FC<GridProps> = memo((props) => {
	// 处理gap及其相应的scss变量
	const style = useMemo(() => {
		// 传了gap
		if (props.gap !== undefined) {
			if (Array.isArray(props.gap)) {
				const [rowGap, colGap] = props.gap;
				return {
					'--columns': props.columns,
					'--row-gap': rowGap,
					'--col-gap': colGap
				};
			} else {
				return {
					'--gap': props.gap,
					'--columns': props.columns
				};
			}
		}
		// 没传gap
		return {
			'--columns': props.columns,
			'--gap': props.gap
		};
	}, [props.gap, props.columns]);

	return (
		<div className={'grid'} style={{ ...style } as CSSProperties}>
			{props.children}
		</div>
	);
});

Grid.displayName = 'Grid';

Grid.defaultProps = {
	gap: '10px'
};

export default Grid;
