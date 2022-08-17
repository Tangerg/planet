import type {RouteConfig} from 'react-router-config';
import {BasicLayout} from '../layouts';
import Home from '../views/Home';
import Friends from '../views/Friends';
import FM from '../views/Fm';
import Video from '../views/Video';
import {Redirect} from 'react-router-dom';

const routes: RouteConfig[] = [
    {
        path: '/',
        component: BasicLayout,
        routes: [
            {
                path: '/',
                exact: true,
                render: () => <Redirect to={'/home'}/>,
            },
            {
                path: '/home',
                component: Home,
            },
            {
                path: '/video',
                component: Video,
            },
            {
                path: '/FM',
                component: FM,
            },
            {
                path: '/friends',
                component: Friends,
            },
        ],
    },
];

export default routes;
