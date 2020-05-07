import React from 'react';
import NotFound from './contents/NotFound/NotFound';
import Permission from './contents/Auth/Permission';
import Dashboard from './components/SingleView/SingleView';
import User from './containers/UserContainer';
import UserAction from './containers/UserActionContainer'

import UserInfoActionContainer from './containers/UserInfoActionContainer';
import CategoriesContainer from './containers/CategoriesContainer';
import CategotiesActionContainer from './containers/CategotiesActionContainer';
import ProductsContainer from './containers/ProductsContainer';
import ProductsActionContainer from './containers/ProductsActionContainer';
import CommentContainer from './containers/CommentContainer';
import OrderContainer from './containers/OrderContainer';
import CommentRepContatiner  from './containers/CommentRepContatiner';


const routes = [
    {
        path: '/',
        exact: true,
        main: ({history}) => <Dashboard history={history} />
    },

    
    {
        path: '/categories',
        exact: true,
        main: ({history, match, location}) => <CategoriesContainer history={history} match={match} location={location}/>
    },
    {
        path: '/categories-edit/:id',
        exact: false,
        main: ({match, history}) => <CategotiesActionContainer match={match} history={history}/>
    },
    {
        path: '/categories-new/',
        exact: false,
        main: ({match, history}) => <CategotiesActionContainer match={match} history={history}/>
    },
    {
        path: '/products',
        exact: true,
        main: ({history, match, location}) => <ProductsContainer history={history} match={match} location={location}/>
    },
    {
        path: '/products-edit/:id',
        exact: false,
        main: ({match, history}) => <ProductsActionContainer match={match} history={history}/>
    },
    {
        path: '/products-new/',
        exact: false,
        main: ({match, history}) => <ProductsActionContainer match={match} history={history}/>
    },
    {
        path: '/comments',
        exact: true,
        main: ({history, match, location}) => <CommentContainer history={history} match={match} location={location}/>
    },
    {
        path: '/comments-edit/:id_product/:id_comment',
        exact: false,
        main: ({history, match}) => <CommentRepContatiner history={history} match={match}/>
    },
    {
        path: '/orders',
        exact: true,
        main: ({history, match, location}) => <OrderContainer history={history} match={match} location={location}/>
    },



    {
        path: '/users',
        exact: true,
        main: ({history, match, location}) => <User history={history} match={match} location={location}/>
    },
    {
        path: '/users/create',
        exact: false,
        main: ({history}) => <UserAction history={history} />
    },
    {
        path: '/users/:id/edit',
        exact: false,
        main: ({match, history}) => <UserAction match={match} history={history}/>
    },
    {
        path: '/user/:id/',
        exact: false,
        main: ({match, history}) => <UserInfoActionContainer match={match} history={history}/>
    }
    ,
    {
        path: '/404-not-found',
        exact: false,
        main: () => <NotFound />
    },
    {
        path: '/403-permission',
        exact: false,
        main: () => <Permission />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFound />
    }
    
    
];

export default routes;