import { combineReducers } from 'redux';
import authentication from './AuthReducer';

import users from './UserReducer';
import comments from './CommentReducer';
import categories from './CategorieReducer';
import products from './ProductReducer';
import orders from './OrderReducer';

import dashboard from './Dashboard'




const appReducers = combineReducers({
    authentication,
    categories,
    users,
    dashboard, products
    , comments,
    orders
    // tags,countrys,areas,teams,banners,
    // events,
    // venues,
    // payments,
    // refunds,manages,reports,
    // tickets
});

export default appReducers;