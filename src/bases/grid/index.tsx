export type { GridProps } from './grid';
export type { GridItemProps } from './grid-item';

import InternalGrid from './grid';
import GridItem from './grid-item';

export type Grid = typeof InternalGrid & {
	Item: typeof GridItem;
};

const Grid: Grid = InternalGrid as Grid;
Grid.Item = GridItem;

export default Grid;
