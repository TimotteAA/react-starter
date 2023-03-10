import { memo } from 'react';
import { useRoutes, RouteObject, Navigate } from 'react-router-dom';

import { Home } from '@/pages/home';
import { Shelf } from '@/pages/shelf';
import { BookList } from '@/pages/book';
import { Category } from '@/pages/category';
import { Chapter } from '@/pages/chapter';
import { Detail } from '@/pages/detail';
import { Ranking } from '@/pages/ranking';
import { Search } from '@/pages/search';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Home />
	},
	{
		path: '/shelf',
		element: <Shelf />
	},
	{
		path: '/ranking',
		element: <Ranking />
	},
	{
		path: '/category',
		element: <Category />
	},
	{
		path: '/search',
		element: <Search />
	},
	{
		path: '/book-list/:key',
		element: <BookList />
	},
	{
		path: '/book/:id',
		element: <Detail />
	},
	{
		path: '/book/:bookId/:chapterId',
		element: <Chapter />
	},
	{
		path: '*',
		element: <Navigate to="/" />
	}
];

const Router = memo(() => {
	const elements = useRoutes(routes);
	return elements;
});

Router.displayName = 'Router';

export default Router;
