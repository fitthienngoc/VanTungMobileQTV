/*!
 *
 * Angle - Bootstrap Admin App + ReactJS
 *
 * Version: 3.8.9.1
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import $ from 'jquery';
import history from './helpers/history';
// App Routes
import Routes from './Routes';

// Vendor dependencies
import "./Vendor";
// Application Styles
import './styles/bootstrap.scss';
import './styles/app.scss'
import './styles/style.css';

// Disable warning "Synchronous XMLHttpRequest on the main thread is deprecated.."
$.ajaxPrefilter(o => o.async = true);


class App extends Component {
  render() {

    // specify base href from env varible 'WP_BASE_HREF'
    // use only if application isn't served from the root
    // for development it is forced to root only
    /* global WP_BASE_HREF */
    const basename = process.env.NODE_ENV === 'development' ? '/' : (WP_BASE_HREF || '/');
    // const basename = process.env.NODE_ENV === 'production' ? '/' : (WP_BASE_HREF || '/');  

    return (
        <Router history={history} basename={basename}>
            <Routes />
        </Router>
    );

  }
}

export default App;
