import React from 'react';
import { Link } from 'react-router-dom';

const Error500 = props => (
    <div className="abs-center wd-xl">
        <div className="text-center mb-4">
            <div className="mb-3">
                <em className="fa fa-wrench fa-5x text-muted"></em>
            </div>
            <div className="text-lg mb-3">Server 500</div>
            <p className="lead m-0">Oh! Something went wrong :(</p>
            <p>Don't worry, we're now checking this.</p>
            <p>In the meantime, please try one of those links below or come back in a moment</p>
        </div>
        <ul className="list-inline text-center text-sm mb-4">
            <li className="list-inline-item">
                <Link to="./" className="text-muted">Home</Link>
            </li>
            
        </ul>
        <div className="p-3 text-center">
            <span className="mr-2">&copy;</span>
            <span>2018</span>
            <span className="mx-2">-</span>
            <span>ComeUp</span>
            <br/>
        </div>
    </div>
)

export default Error500;
