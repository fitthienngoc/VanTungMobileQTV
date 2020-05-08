import * as Types from '../../constants/ActionType';
import HTTP from '../../services/HTTP';
import history from '../../helpers/history';
import authHeader from '../../helpers/authHeader';


export const actUpdateOrder = (Id, verify) => {

    var header = authHeader();
    return dispatch => {
        dispatch({ type: Types.UPDATE_ORDER_REQUEST });
        return HTTP(`?action=Q_updateOrder`, 'POST', { Id, verify }, header).then(res => {
            console.log(`res`, res);
            if (res.data.status == 200) {
                dispatch({ type: Types.UPDATE_ORDER_SUCCESS, data: { Id, verify } })
                history.push('/orders')
            }
            if (res.data.status == 201) {
                dispatch({ type: Types.UPDATE_ORDER_FAIL, error: res.data.error })
                // history.push('/categories')
            }
            if (res.data.status === 404) {

                history.push({ pathname: '/404' })
            }
            if (res.data.status == 300) {
                history.push({ pathname: '/' })
            }
        });
    };
}

export const actDeleteOrder = (Id) => {

    var header = authHeader();
    return dispatch => {
        dispatch({ type: Types.DELETE_ORDER_REQUEST });
        return HTTP(`?action=Q_updateOrder`, 'POST', { Id }, header).then(res => {
            console.log(`res`, res);
            if (res.data.status == 200) {
                dispatch({ type: Types.DELETE_ORDER_SUCCESS, data: { Id } })
                history.push('/orders')
            }
            if (res.data.status == 201) {
                dispatch({ type: Types.DELETE_ORDER_FAIL, error: res.data.error })
                // history.push('/categories')
            }
            if (res.data.status === 404) {

                history.push({ pathname: '/404' })
            }
            if (res.data.status == 300) {
                history.push({ pathname: '/' })
            }
        });
    };
}


export const actLoadDataOrder = (search = '') => {
    var header = authHeader();
    return dispatch => {
        dispatch({ type: Types.LOAD_DATA_ORDERS_REQUEST });
        return HTTP(`?action=Q_getOrders`+ search, 'GET', null, header).then(res => {
            console.log(res);

            if (res && res.data && res.data.status == 200) {
                var order = res.data.data
                dispatch({ type: Types.LOAD_DATA_ORDERS_SUCCESS, data: order });
            }
            if (res && res.data.status == 202) {
                dispatch({ type: Types.LOAD_DATA_ORDERS_FAIL, error: res.data.error });
            }

        });
    }
}

