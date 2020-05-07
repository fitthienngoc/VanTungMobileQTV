import React, { Component } from 'react';
import pubsub from 'pubsub-js';
import { Collapse } from 'reactstrap';
import { actLogoutSuccess } from '../../actions/auth';
import { connect } from 'react-redux'


class SidebarUserBlock extends Component {

    state = {
        userBlockCollapse: true,
        Avatar: 'https://comeup.techup.vn/img/profile_default.png',
        Name: ''
    }
    
    componentDidMount() {
        // console.log(this.props);
        this.pubsub_token = pubsub.subscribe('toggleUserblock', () => {
            this.setState({
                userBlockCollapse: !this.state.userBlockCollapse,
            });
        });

    }

    componentWillUnmount() {
        pubsub.unsubscribe(this.pubsub_token);
    }

    render() {
        var { authentication, actLogoutSuccess } = this.props
        return (
            <Collapse id="user-block" isOpen={this.state.userBlockCollapse}>
                <div>
                    <div className="item user-block">
                        {/* User picture */}
                        <div className="user-block-picture">
                            <div className="user-block-status">
                                {authentication.users ? <img className="img-thumbnail rounded-circle" src="https://thienngoc.info/wp-content/uploads/2020/02/cropped-logo-192x192.jpg" alt="Avatar" width="60" height="60" /> : ''}
                                <div className="circle bg-success circle-lg"></div>
                            </div>
                        </div>
                        {/* Name and Job */}
                        <div className="user-block-info">
                            <span className="user-block-name">Hello, {authentication.users.Name}</span>
                            <span onClick={actLogoutSuccess} className="user-block-role">Logout</span>
                        </div>
                    </div>
                </div>
            </Collapse>
        )
    }
}


export default connect(state => ({
    authentication: state.authentication
  }),
    { actLogoutSuccess }
  )(SidebarUserBlock);
  

