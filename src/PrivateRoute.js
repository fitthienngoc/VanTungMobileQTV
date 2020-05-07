// @flow weak

import React, {
    Component
} from 'react';
import {
    Route,
    Redirect,
    withRouter
} from 'react-router-dom';

class PrivateRoute extends Component {

    render() {
        const {
            component: InnerComponent,
            ...rest
        } = this.props;
        const { location } = this.props;
        return (
            <Route
                {...rest}
                render={
                    props => (
                        localStorage.getItem('users')
                        ? <InnerComponent {...props} />
                        : <Redirect to={{ pathname: '/login', state: { from: location } }} />
                    )
                }
            />
        );
    }
}

export default withRouter(PrivateRoute);
