import * as Types from '../constants/ActionType';
var initialState = {
    orders: {
        data: []
    },
    isFetching: false,
    itemEditing: {},
    error: '',
    CropImg: false,
    CropImgUrl: '',

};

var findIndex = (orders, id) => {
    var result = -1;
    orders.forEach((order, index) => {
        if (order.Id === id) {
            result = index;
            return result;
        }
    });
    return result;
}
var findIndexIdOrder = (orders, id) => {
    var result = -1;
    orders.forEach((order, index) => {
        if (order.Id === id) {
            result = index;
            return result;
        }
    });
    return result;
}
const orders = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {

        case Types.LOAD_DATA_ORDERS_REQUEST:
        case Types.UPDATE_ORDER_REQUEST:
        case Types.DELETE_ORDER_REQUEST:
            state.isFetching = true
            state.error = ''
            return { ...state };
        case Types.LOAD_DATA_ORDERS_SUCCESS:
            // console.log(`action`, action);
            state.orders = action.data
            state.isFetching = false
            state.error = ''
            return { ...state };
        case Types.DELETE_ORDER_SUCCESS:
            index = -1
            index = findIndexIdOrder(state.orders.data, action.data.Id)
            if (index > -1) {
                state.orders.data.splice(index,1)
            }
            state.isFetching = false
            state.error = ''
            return { ...state };
        case Types.UPDATE_ORDER_SUCCESS:
            index = -1
            index = findIndexIdOrder(state.orders.data, action.data.Id)
            if (index > -1) {
                state.orders.data[index].status = action.data.verify
            }
            state.isFetching = false
            state.error = ''
            return { ...state };
        case Types.LOAD_DATA_ORDERS_FAIL:
        case Types.UPDATE_ORDER_FAIL:
        case Types.DELETE_ORDER_FAIL:
            state.isFetching = false
            state.error = action.error
            return { ...state };
        default: return { ...state };
    }
}

export default orders;