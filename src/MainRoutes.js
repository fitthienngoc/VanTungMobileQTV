import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import router from './router';
export const MainRoutes = () => (
    <Switch>
        {showContentMenus(router)}
    </Switch>
);

const showContentMenus = (routes) => {
    var result = null;
    if (routes.length > 0) {
        result = routes.map((route, index) => {
            return (
                <PrivateRoute
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                />
            );
        });
    }
    return result;
}

export default MainRoutes;