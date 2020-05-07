import React, { Component } from 'react';

require('loaders.css/loaders.css');
require('spinkit/css/spinkit.css');
class Spinner extends Component {
    render() {
        return (
            <div style={{padding: 100}} className="row">
                <div className="col-md-12">
                        <div className="card-body loader-demo d-flex align-items-center justify-content-center">
                            <div className="ball-clip-rotate-multiple">
                                <div style={{borderBottomColor: '#5d9cec'}}></div>
                                <div></div>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Spinner;
