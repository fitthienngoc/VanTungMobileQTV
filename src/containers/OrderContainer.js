import React, { Component } from 'react';

import { connect } from 'react-redux';
import Spinner from '../components/Spinner/Spinner';
import Orders from '../contents/Orders/Orders';
import Filter from '../components/Filter';
import OrderList from './../components/Orders/OrderList';
import Order from './../components/Orders/Order'
import Paginate from '../components/Paginate';
import ConvertURL from '../helpers/ConvertURL';
import { actLoadDataOrder, actUpdateOrder, actDeleteOrder } from '../actions/tn_shop/order';

class OrderContainer extends Component {

    componentWillMount() {
        var { location } = this.props;
        var search = location.search;
        this.props.onLoadDataOrder(search);
    }
    showFilter() {
        var { location } = this.props;
        return (
            <Filter location={location} onFilter={(key, value) => this.onFilter(key, value)} />
        );
    }
    showListOrder(Order) {
        return (
            <OrderList>
                {this.showItemOrder(Order)}
            </OrderList>
        );
    }
    showItemOrder(orders) {
        var { onDeleteOrder, onUpdateOrder } = this.props;
        var result = <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tr>;
        // console.log(orders)
        if (orders.length > 0) {
            result = orders.map((item, index) => {
                return (
                    <Order key={index} onUpdateOrder={onUpdateOrder} item={item} index={index} onDeleteOrder={onDeleteOrder} />
                );
            });
        }
        return result;
    }
    showPaginate(order) {
        return (
            <Paginate paginate={order} onFilter={(key, value) => this.onFilter(key, value)} />
        );
    }
    onFilter(key, value) {
        var { history, location } = this.props;
        var search = '&' + ConvertURL(location.search, key, value);
        // console.log(`search`, search);
        history.push({
            search: search,
        });
        this.props.onLoadDataOrder(search);
    }
    render() {
        var orders = this.props.orders.orders;
        // console.log(this.props.orders)
        return (
            <Orders>
                {this.showFilter()}
                {
                    this.props.orders.isFetching
                        ?
                        <Spinner />
                        :
                        <React.Fragment>
                            {this.showListOrder(orders.data)}
                            {this.showPaginate(orders)}
                        </React.Fragment>
                }
            </Orders>
        );
    }
}

const mapStatetoProps = state => {
    return {
        orders: state.orders
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoadDataOrder: (search) => {
            dispatch(actLoadDataOrder(search));
        },
        onUpdateOrder: (Id, verify) => {
            dispatch(actUpdateOrder(Id, verify));
        },
        onDeleteOrder: (Id) => {
            dispatch(actDeleteOrder(Id));
        },

    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(OrderContainer);