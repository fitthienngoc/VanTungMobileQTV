import * as Types from '../constants/ActionType';
import HTTP from '../services/HTTP';
import history from '../helpers/history';
import authHeader from '../helpers/authHeader';

export const actLoadDataUser = (search = '') => {
    var header = authHeader();
    return dispatch => {
        dispatch(actLoadDataUserRequest());
        return HTTP('?action=users'+search, 'GET', null, header).then(res => {
            if (res && res.data  && res.data.status == 200) {
                dispatch(actLoadDataUserSuccess(res.data.data))
            }
            if (res && res.data  && res.data.status == 300) {
                dispatch(actLoadDataUserFail())
                history.push("/permission")

            }
            
            
        });
    };
}

export const actLoadDataUserRequest = () => {
    return {
        type: Types.LOAD_DATA_USERS_REQUEST,
    }
}

export const actLoadDataUserSuccess = (data) => {
    return {
        type: Types.LOAD_DATA_USERS_SUCCESS,
        data: data
    }
}

export const actLoadDataUserFail = () => {
    return {
        type: Types.LOAD_DATA_USERS_FAIL,
    }
}

export const actAddUserRequest = (body) => {
    var header = authHeader();
    return dispatch => {
        dispatch(actAddUserHouseRequest());
        return HTTP('users', 'POST', body, header).then(res => {
            if(res.data.status === 403) {
                history.push('/403-permission')
            }
            if(res.data.status === -1) {
                dispatch(actAddUserFail(res.data.errors));
            } else {
                dispatch(actAddUserSuccess(res.data));
                history.push('/users');
            }
        });
    };
}

export const actAddUserHouseRequest = () => {
    return {
        type: Types.ADD_USER_REQUEST,
    }
}

export const actAddUserSuccess = (data) => {
    return {
        type: Types.ADD_USER_SUCCESS,
        data: data
    }
}

export const actAddUserFail = (error) => {
    return {
        type: Types.ADD_USER_FAIL,
        error
    }
}

export const actGetUser = (id) => {
    var header = authHeader();
    return dispatch => {
        dispatch(actGetUserRequest());
        return HTTP(`action=editUser?id_user=${id}`, 'GET', null, header).then(res => {
            console.log(res);
            
            // if(res && res.status===200){
            // var user = res.data.original.data
            // }
            // if(res && res.data.status === 403) {
            //     history.push('/403-permission')
            // }
            // dispatch(actGetUserSuccess(user));
        });
    }
}

export const actGetUserRequest = () => {
    return {
        type: Types.LOAD_DATA_USER_REQUEST,
    }
}

export const actGetUserSuccess = (data) => {
    return {
        type: Types.LOAD_DATA_USER_SUCCESS,
        data: data
    }
}

export const actUpdateUser = (user) => {
    
    var header = authHeader();
    return dispatch => {
        console.log(user)
        dispatch(actUpdateUserRequest());
        return HTTP(`users/${user.Id}/update`, 'POST', user, header).then(res => {
            console.log(res)
            if(res.data.status === 403) {
                history.push('/403-permission')
            }
            else if(res.data.status === 200){
            dispatch(actUpdateUserSuccess(res.data.data));
            history.push('/users');
            }else{
                dispatch(actUpdateUserFail(res.data.errors));
            }
        });
    }
}

export const actUpdateUserFail = (error) => {
    return {
        type: Types.UPDATE_USER_FAIL,
        error
    }
}


export const actUpdateUserRequest = () => {
    return {
        type: Types.UPDATE_USER_REQUEST,
    }
}

export const actUpdateUserSuccess = (data) => {
    return {
        type: Types.UPDATE_USER_SUCCESS,
        data: data
    }
}

export const actUpdateStatusUser = (data) => {
    var header = authHeader();
    return dispatch => {
        dispatch(actUpdateStatusUserRequest());
        return HTTP(`users/${data.id}/action-status`, 'POST', {Reason:data.Reason,Status:data.Status}, header).then(res => {
            if(res.data.status === 403) {
                history.push('/403-permission')
            }
            dispatch(actUpdateStatusUserSuccess(data));
        });
    }
}


export const actUpdateStatusUserRequest = () => {
    return {
        type: Types.UPDATE_STATUS_USER_REQUEST,
    }
}
export const actUpdateStatusUserSuccess = (data) => {
    return {
        type: Types.UPDATE_STATUS_USER_SUCCESS,
        data
    }
}
export const actUpdateStatusUserFail = () => {
    return {
        type: Types.UPDATE_STATUS_USER_FAIL,
    }
}

export const actDeleteUser = (id) => {
    var header = authHeader();
    return dispatch => {
        dispatch(actDeleteUserRequest());
        return HTTP(`users/${id}/delete`, 'POST', null, header).then(res => {
            if(res.data.status === 403) {
                history.push('/403-permission')
            }
            dispatch(actDeleteUserSuccess(id));
        });
    }
}



export const actDeleteUserRequest = () => {
    return {
        type: Types.DELETE_USER_REQUEST,
    }
}

export const actDeleteUserSuccess = (id) => {
    return {
        type: Types.DELETE_USER_SUCCESS,
        id
    }
}

export const actSuggestionsFetchUserRequested = (value) => {
    var header = authHeader();
    return dispatch => {
        return HTTP('users/search?keyword='+value, 'GET', null, header).then(res => {
            if(res.status === 200) {
                if(res.data.status === 403) {
                    history.push('/403-permission')
                }
                dispatch(SuggestionsFetchUser(res.data));
            }
        }).catch(error => {
            console.log(error);
        });
    };
}

export const SuggestionsFetchUser = (data) => {
    return {
        type: Types.SUGGESTIONS_FETCH_USER,
        data: data
    }
}

export const actGetWarehouseUsers = () => {
    var header = authHeader();
    return dispatch => {
        return HTTP('users-stock/stocker', 'GET', null, header).then(res => {
            if(res.status === 200) {
                dispatch(GetWarehouseUsers(res.data));
            }
        }).catch(error => {
            console.log(error);
        });
    };
}

export const GetWarehouseUsers = (data) => {
    return {
        type: Types.GET_WAREHOUSE_USERS,
        data: data
    }
}

export const actCropImgUser=(boolean)=>{
    return{
        type:Types.CROP_IMG_BANNER,
        boolean
    }
}

export const actCropImgUserSuccess=(url)=>{
    return{
        type:Types.URL_CROP_IMG_USER,
        url
    }
}

export const actGetFollowing = (id) => {
    var header = authHeader();
    return dispatch => {
        dispatch(actGetUserRequest());
        return HTTP(`users/${id}/following`, 'GET', null, header).then(res => {
            if(res && res.status===200){
                var data = res.data.original.data
            }
            if(res && res.data.status === 403) {
                history.push('/403-permission')
            }
            dispatch(actGetFollowingSuccess(data));
        });
    }
}

export const actGetFollowingSuccess=(data)=>{
    return{
        type:Types.GET_FOLLOWING_SUCCESS,
        data
    }
}

export const actGetJoining = (id) => {
    var header = authHeader();
    return dispatch => {
        dispatch(actGetUserRequest());
        return HTTP(`users/${id}/joining`, 'GET', null, header).then(res => {
            if(res && res.status===200){
                var data = res.data.original.data
            }
            if(res && res.data.status === 403) {
                history.push('/403-permission')
            }
            dispatch(actGetJoiningSuccess(data));
        });
    }
}

export const actGetJoiningSuccess=(data)=>{
    return{
        type:Types.GET_JOINING_SUCCESS,
        data
    }
}

export const actGetUserTicket = (id) => {
    var header = authHeader();
    return dispatch => {
        dispatch(actGetUserRequest());
        return HTTP(`users/${id}/ticket-show`, 'GET', null, header).then(res => {
            // console.log(res)
            if(res && res.status===200){
                var data = res.data.original.data
            }
            if(res && res.data.status === 403) {
                history.push('/403-permission')
            }
            dispatch(actGetUserTicketSuccess(data));
        });
    }
}

export const actGetUserTicketSuccess=(data)=>{
    return{
        type:Types.LOAD_USER_TICKET_SUCCESS,
        data
    }
}

