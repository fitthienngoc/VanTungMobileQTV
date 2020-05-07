import React, { Component } from 'react';

class NotFound extends Component {
    render() {
        return (
            <div className="abs-center wd-xl">
                <div className="text-center mb-xl">
                    <div className="text-lg mb-lg">404</div>
                    <p className="lead m0">We couldn't find this page.</p>
                    <p>The page you are looking for does not exists.</p>
                </div>
                <ul className="list-inline text-center text-sm mb-xl">
                    <li><a className="text-muted" href="dashboard.html">Go to App</a>
                    </li>
                    <li className="text-muted">|</li>
                    <li><a className="text-muted" href="login.html">Login</a>
                    </li>
                    <li className="text-muted">|</li>
                    <li><a className="text-muted" href="register.html">Register</a>
                    </li>
                </ul>
                <div className="p-lg text-center">
                    <span>&copy;</span>
                    <span>2018</span>
                    <span>-</span>
                    <span>Stock manager</span>
                </div>
            </div>
        );
    }
}
            
export default NotFound;