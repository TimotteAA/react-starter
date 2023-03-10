import { Link } from 'react-router-dom';

import styles from './index.module.scss';

export const Header: React.FC = () => {
	return (
		<div className={styles['home-header']}>
			<div className={styles.left}>Ti书城</div>
			<div className={styles.right}>
				<Link to="/search">
					<i className="icon-search"></i>
				</Link>
				<Link to="/shelf">
					<i className="icon-shelf"></i>
				</Link>
			</div>
		</div>
	);
};
