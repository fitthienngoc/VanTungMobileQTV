import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../contents/Auth/Login';
import { actLogin } from '../actions/tn_shop/user';

class LoginContainer extends Component {
    
    componentWillMount() {
        document.title = "Đăng nhập - ComeUp's BackOffice";
        localStorage.removeItem('user');
        localStorage.removeItem('permissions');
    }
    render() {
        var { onSubmit, loggingIn, errors } = this.props;
        return (
            <Login onSubmit={onSubmit} loggingIn={loggingIn} errors={errors} />
        );
    }
}

const mapStatetoProps = state => {
    const { loggingIn, errors } = state.authentication;
    return {
        loggingIn,
        errors
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit : (body) => {
            dispatch(actLogin(body));
        },
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(LoginContainer);