import React from 'react';
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    validate() {
        var { username, password } = this.state;
        if(username === '') {
            this.setState({
                error: 'Field must have a valid username!',
            });
            return false;
        }
        if(password === '') {
            this.setState({
                error: 'Field must have a valid password!',
            });
            return false;
        }
        return true;
    }

    onChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        if(!this.validate()) {
            return;
        }
        var { username, password } = this.state;
        var body = {
            email:username,
            password
        }
        this.props.onSubmit(body);
    }

    render() {
        var { username, password, error } = this.state;
        var { loggingIn, errors} = this.props;
        return (
            <div className="block-center mt-4 wd-xl">
                <div className="card card-flat">
                    <div className="card-header text-center bg-dark">
                        <a href="">
                            <img className="block-center rounded" src="img/logo.png?v=1" alt="Logo"/>
                        </a>
                    </div>
                    <div className={loggingIn ? "card-body whirl duo" : "card-body"}>
                        <p className="text-center py-2">SIGN IN TO CONTINUE.</p>
                        <p className="text-center text-red">{errors ? errors : error}</p>
                        <form onSubmit={ this.onSubmit } className="mb-3" id="loginForm" data-parsley-validate="" noValidate>
                            <div className="form-group">
                                <div className="input-group with-focus">
                                    <input
                                        id="exampleInputEmail1"
                                        type="text" placeholder="Username"
                                        autoComplete="off"
                                        required="required"
                                        data-parsley-required-message="Field must have a valid."
                                        className="form-control border-right-0"
                                        name="username"
                                        value={username}
                                        onChange={this.onChange}
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text fa fa-envelope text-muted bg-transparent border-left-0"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group with-focus">
                                    <input
                                        id="exampleInputPassword1"
                                        type="password"
                                        placeholder="Password"
                                        required="required"
                                        data-parsley-required-message="Field must have a valid."
                                        className="form-control border-right-0"
                                        name="password"
                                        value={password}
                                        onChange={this.onChange}
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text fa fa-lock text-muted bg-transparent border-left-0"></span>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-block btn-primary mt-3" type="submit">Login</button>
                        </form>
                    </div>
                </div>
                <div className="p-3 text-center">
                    <span className="mr-2">&copy;</span>
                    <span>2019</span>
                    <span className="mx-2">-</span>
                    <span>ComeUp</span>
                    <br/>
                    <span>ComeUp's Backoffice</span>
                </div>
            </div>
        );
    }

}

export default Login;
