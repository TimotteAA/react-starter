import { memo } from 'react';
import cls from 'classnames';

import './styles/index.scss';

export interface CardProps {
	/** header左侧内容 */
	title?: React.ReactNode;
	/** header右侧内容 */
	extra?: React.ReactNode;
	/** 自定义header类 */
	headerClass?: string;
	titleClass?: string;
	extraClass?: string;
	/** body内容 */
	body?: React.ReactNode;
	bodyClass?: string;
	onHeaderClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	onBodyClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Card: React.FC<CardProps> = memo((props) => {
	const renderHeader = () => {
		if (!props.title || !props.extra) return null;

		return (
			<>
				{props.title ?? (
					<div className={cls('card-header-title', props.titleClass)}>
						{props.title}
					</div>
				)}
				{props.extra ?? (
					<div className={cls('card-header-extra', props.extraClass)}>
						{props.extra}
					</div>
				)}
			</>
		);
	};

	const renderBody = () => {
		if (!props.body) return null;

		return <>{props.body}</>;
	};

	return (
		<div className="card">
			<div
				className={cls('card-header', props.headerClass)}
				onClick={props.onHeaderClick}
			>
				{renderHeader()}
			</div>
			<div
				className={cls('card-body', props.bodyClass)}
				onClick={props.onBodyClick}
				style={{
					paddingTop: props.title ?? props.extra ? '13px' : '0px'
				}}
			>
				{renderBody()}
			</div>
		</div>
	);
});

Card.displayName = 'Card';

export default Card;
