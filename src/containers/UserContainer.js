import React, { Component } from 'react';

import { connect } from 'react-redux';
import Spinner from '../components/Spinner/Spinner';
import Users from '../contents/Users/Users';
import Filter from '../components/Filter';
import UserList from './../components/Users/UserList';
import User from './../components/Users/User'
import Paginate from '../components/Paginate';
import ConvertURL from '../helpers/ConvertURL';
import { actLoadDataUser, actDeleteUser, actUpdateStatusUser } from '../actions/user';
import { actUpdateUser } from '../actions/tn_shop/user';

class UserContainer extends Component {

    componentWillMount() {
        var { location } = this.props;
        var search = location.search;
        this.props.onLoadDataUser(search);
    }
    showFilter() {
        var { location } = this.props;
        return (
            <Filter location={location} onFilter={(key, value) => this.onFilter(key, value)} />
        );
    }
    showListUser(User) {
        return (
            <UserList>
                {this.showItemUser(User)}
            </UserList>
        );
    }
    showItemUser(users) {
        var { onDeleteUser, onUpdateStatus,onUpdateUser } = this.props;
        var result = <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>;
        // console.log(users)
        if (users.length > 0) {
            result = users.map((item, index) => {
                return (
                    <User  key={index} onUpdateStatus={onUpdateStatus} onUpdateUser={onUpdateUser} item={item} index={index} onDeleteUser={onDeleteUser} />
                );
            });
        }
        return result;
    }
    showPaginate(user) {
        return (
            <Paginate paginate={user} onFilter={(key, value) => this.onFilter(key, value)} />
        );
    }
    onFilter(key, value) {
        var { history, location } = this.props;
        var search = '&' + ConvertURL(location.search, key, value);
        // console.log(`search`, search);
        history.push({
            search: search,
        });
        this.props.onLoadDataUser(search);
    }
    render() {
        var users = this.props.users.users;
        // console.log(this.props.users)
        return (
            <Users>
                {this.showFilter()}
                {
                    this.props.users.isFetching
                        ?
                        <Spinner />
                        :
                        <React.Fragment>
                            {this.showListUser(users.data)}
                            {this.showPaginate(users)}
                        </React.Fragment>
                }
            </Users>
        );
    }
}

const mapStatetoProps = state => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoadDataUser: (search) => {
            dispatch(actLoadDataUser(search));
        },
        onDeleteUser: (id) => {
            dispatch(actDeleteUser(id));
        },
        onUpdateStatus: (data) => {
            dispatch(actUpdateStatusUser(data));
        },
        onUpdateUser: (body) => {
            dispatch(actUpdateUser(body))
        }
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(UserContainer);