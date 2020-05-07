import * as Types from '../constants/ActionType';
import HTTP from '../services/HTTP';
import history from '../helpers/history';
import authHeader from '../helpers/authHeader';
import { actLoadDataRefund } from './refund';

export const actLoadDataPayment = (search = '') => {
    var header = authHeader();
    return dispatch => {
        dispatch(actLoadDataPaymentRequest());
        return HTTP('search-payments' + search, 'GET', null, header).then(res => {
            if (res.status === 200) {
                if (res.data.status === 403) {
                    history.push('/403-permission')
                }
                dispatch(actLoadDataPaymentSuccess(res.data));
            } else {
                dispatch(actLoadDataPaymentFail());
            }
        });
    };
}


export const actLoadDataPaymentRequest = () => {
    return {
        type: Types.LOAD_DATA_PAYMENTS_REQUEST,
    }
}

export const actLoadDataPaymentSuccess = (data) => {
    return {
        type: Types.LOAD_DATA_PAYMENTS_SUCCESS,
        data: data
    }
}

export const actLoadDataPaymentFail = () => {
    return {
        type: Types.LOAD_DATA_PAYMENTS_FAIL,
    }
}


export const actUpdateStatusPayment = (data) => {
    var header = authHeader();
    return dispatch => {
        dispatch(actUpdateStatusPaymentRequest());
        return HTTP(`payments/${data.id}/action`, 'POST', { Reason: data.Reason, status: data.Status }, header).then(res => {
            if (res && res.status === 200) {
                dispatch(actUpdateStatusPaymentSuccess(data));
                if (data.location) {
                    dispatch(actLoadDataRefund())
                }
            }
            if (res && res.data.status === 403) {
                history.push('/403-permission')
            }

        });
    }
}
export const actUpdateStatusPaymentRequest = () => {
    return {
        type: Types.UPDATE_STATUS_PAYMENT_REQUEST,
    }
}

export const actUpdateStatusPaymentSuccess = (data) => {
    return {
        type: Types.UPDATE_STATUS_PAYMENT_SUCCESS,
        data: data
    }
}


export const actGetPayment = (id) => {
    var header = authHeader();
    return dispatch => {
        dispatch(actGetPaymentRequest());
        return HTTP(`payments/${id}`, 'GET', null, header).then(res => {
            // console.log(res)
            if (res && res.status === 200) {
                var payment = res.data.data
            }
            if (res && res.data.status === 403) {
                history.push('/403-permission')
            }
            dispatch(actGetPaymentSuccess(payment));
        });
    }
}



export const actGetPaymentRequest = () => {
    return {
        type: Types.LOAD_DATA_PAYMENT_REQUEST,
    }
}

export const actGetPaymentSuccess = (data) => {
    return {
        type: Types.LOAD_DATA_PAYMENT_SUCCESS,
        data: data
    }
}

export const actGetDetailTicket = (id) => {
    var header = authHeader();
    return dispatch => {
        dispatch(actGetDetailTicketRequest());
        return HTTP(`payment-details/${id}`, 'GET', null, header).then(res => {
            // console.log(res)
            if (res && res.status === 200) {
                var payment = res.data.data
                dispatch(actGetDetailTicketSuccess(payment));
            } else {
                dispatch(actGetDetailTicketFial())
            }
            if (res && res.status === 403) {
                history.push('/403-permission')
            }

        });
    }
}



export const actGetDetailTicketRequest = () => {
    return {
        type: Types.LOAD_DATA_DETAIL_TICKET_REQUEST,
    }
}

export const actGetDetailTicketSuccess = (data) => {
    return {
        type: Types.LOAD_DATA_DETAIL_TICKET_SUCCESS,
        data: data
    }
}

export const actGetDetailTicketFial = (data) => {
    return {
        type: Types.LOAD_DATA_DETAIL_TICKET_FAIL,
        data: data
    }
}

export const actLoadDataPaymentTicket = (search = '', status) => {
    var header = authHeader();
    console.log('status')
    console.log(status)
    let loca= ''
    if(status==1) loca = "etickets" 
    else if(status==2) loca="dtickets"

    return dispatch => {
        dispatch(actLoadDataPaymentRequest());
        return HTTP(loca + search, 'GET', null, header).then(res => {
            if (res.status === 200) {
                if (res.data.status === 403) {
                    history.push('/403-permission')
                }
                dispatch(actLoadDataPaymentSuccess(res.data));
            } else {
                dispatch(actLoadDataPaymentFail());
            }
        });
    };
}