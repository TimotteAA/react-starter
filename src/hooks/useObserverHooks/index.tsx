import React from 'react';

export interface UseObserverHooksOptions extends IntersectionObserverInit {
	/**
	 * 当元素进入视口后，停止观察
	 */
	freezeAfterSeen?: boolean;
}

function useObserverHooks(
	target: React.RefObject<Element | null>,
	{
		threshold = 0,
		root = null,
		rootMargin = '',
		freezeAfterSeen = true
	}: UseObserverHooksOptions
) {
	const [entry, setEntry] = React.useState<IntersectionObserverEntry>();
	const freeze = React.useRef<boolean>(false);

	React.useEffect(() => {
		const element = target.current;

		if (!element || freeze.current) return;

		const options: IntersectionObserverInit = {
			threshold,
			root,
			rootMargin
		};

		const ob = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				// 元素进入视口
				setEntry(entry);

				if (freezeAfterSeen) freeze.current = true;
			}
		}, options);

		ob.observe(element);

		// 取消监听
		return () => {
			ob.disconnect();
		};
	}, [root, rootMargin, threshold, target, freeze]);

	return entry;
}

export default useObserverHooks;
