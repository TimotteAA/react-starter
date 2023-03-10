import { memo } from 'react';
import errorImage from './errorImage.png';
import './styles/index.scss';

export type ImageVariables = '--image-height' | '--image-width';

export interface ErrorBlockProps {
	title?: string;
	description?: string;
	image?: React.ReactNode;
	styles?: React.CSSProperties & Partial<Record<ImageVariables, string>>;
}

const classPrefix = 'error-block';

const renderDefaultImgae = () => {
	return <img src={errorImage} className={`${classPrefix}-image`} />;
};

const ErrorBlock: React.FC<ErrorBlockProps> = memo((props) => {
	return (
		<div className={classPrefix} style={{ ...props.styles }}>
			<div>{props.image ?? renderDefaultImgae()}</div>
			<div className={`${classPrefix}-description`}>
				<div className={`${classPrefix}-description-title`}>
					{props.title}
				</div>
				<div className={`${classPrefix}-description-subtitle`}>
					{props.description}
				</div>
			</div>
		</div>
	);
});

ErrorBlock.displayName = 'ErrorBlock';

ErrorBlock.defaultProps = {
	title: 'oops，出了一点小问题',
	description: '请稍后再试试...',
	image: null
};

export default ErrorBlock;
