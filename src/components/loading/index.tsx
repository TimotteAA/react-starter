import { SpinnerLoading } from '@/bases';
import './index.scss';

export const Loading: React.FC = () => {
	return (
		<div className="loading">
			<SpinnerLoading type="primary" size={48} />
		</div>
	);
};

Loading.displayName = 'Loading';
