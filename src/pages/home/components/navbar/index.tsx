import { memo } from 'react';

import styles from '@/pages/home/components/navbar/styles/index.module.scss';
import { Link } from 'react-router-dom';

import Category from '@/assets/images/category.png';
import Rank from '@/assets/images/rank.png';
import Finish from '@/assets/images/finish.png';
import Recommend from '@/assets/images/recommend.png';

// imgs

const Navbar: React.FC = memo((props) => {
	return (
		<div className={styles.navbar}>
			<div className={styles['navbar-item']}>
				<Link to="/category" className={styles['icon']}>
					<img
						src={Category}
						alt="category"
						className={styles['icon-img']}
					/>
				</Link>
				<div className={styles['header']}>分类</div>
			</div>

			<div className={styles['navbar-item']}>
				<Link to="/ranking" className={styles['icon']}>
					<img src={Rank} alt="排行" className={styles['icon-img']} />
				</Link>
				<div className={styles['header']}>排行</div>
			</div>

			<div className={styles['navbar-item']}>
				<Link to="/book-list/finish" className={styles['icon']}>
					<img
						src={Finish}
						alt="完本"
						className={styles['icon-img']}
					/>
				</Link>
				<div className={styles['header']}>完本</div>
			</div>

			<div className={styles['navbar-item']}>
				<Link to="/book-list/recommend" className={styles['icon']}>
					<img
						src={Recommend}
						alt="recommend"
						className={styles['icon-img']}
					/>
				</Link>
				<div className={styles['header']}>推荐</div>
			</div>
		</div>
	);
});

Navbar.displayName = 'Navbar';

export default Navbar;
