import * as Types from '../constants/ActionType';
var initialState = {
    users: {
        data: []
    },
    isFetching: false,
    itemEditing: {},
    error: '',
    suggestionsUser: {},
    warehouseUsers: {
        data: []
    },
    CropImg: false,
    CropImgUrl: '',
    userFollowing: [],
    userJoining: [],
    userTicket: []
};

var findIndex = (users, id) => {
    var result = -1;
    users.forEach((user, index) => {
        if (user.Id === id) {
            result = index;
            return result;
        }
    });
    return result;
}
var findIndexIdUser = (users, id) => {
    var result = -1;
    users.forEach((user, index) => {
        if (user.id_user === id) {
            result = index;
            return result;
        }
    });
    return result;
}
const users = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case Types.LOAD_DATA_USER_REQUEST:
        case Types.LOAD_DATA_USERS_REQUEST:
        case Types.ADD_USER_REQUEST:
        case Types.UPDATE_USER_REQUEST:
        case Types.DELETE_USER_REQUEST:
        case Types.UPDATE_STATUS_USER_REQUEST:
            state.error = '';
            state.isFetching = true;
            return { ...state };
        case Types.LOAD_DATA_USERS_SUCCESS:
            state.users = action.data;
            state.isFetching = false;
            return { ...state };
        case Types.UPDATE_STATUS_USER_FAIL:
            state.isFetching = false;
            return { ...state };
        case Types.UPDATE_STATUS_USER_SUCCESS:
            index = findIndex(state.users.data, action.data.id);
            state.users.data[index].Status = action.data.Status;
            state.isFetching = false;
            return { ...state };
        case Types.LOAD_DATA_USERS_FAIL:
            state.error = action.error;
            state.isFetching = false;
            return { ...state };
        case Types.ADD_USER_SUCCESS:
            console.log(action)
            state.users.data.unshift(action.data);
            state.isFetching = false;
            return { ...state };
        case Types.LOAD_DATA_USER_SUCCESS:
            state.itemEditing = action.dataUser;
            state.isFetching = false;
            return { ...state };
        case Types.UPDATE_USER_SUCCESS:
            // console.log(`action`, action);
            if (action.data.permission == "admin"){
                index = findIndexIdUser(state.users.data, action.data.Id);
                // console.log(`index`, index);
                state.users.data[index].permission = "admin"
            }
            if (action.data.permission == 'member'){
                index = findIndexIdUser(state.users.data, action.data.Id);
                state.users.data[index].permission = 'member'
            }

                state.isFetching = false;
            return { ...state };
        case Types.DELETE_USER_SUCCESS:
            index = findIndex(state.users.data, action.id);
            state.users.data.splice(index, 1);
            state.isFetching = false;
            return { ...state };
        case Types.SUGGESTIONS_FETCH_USER:
            state.suggestionsUser = action.data;
            return { ...state };
        case Types.ADD_USER_FAIL:
            state.error = action.error;
            state.isFetching = false;
            return { ...state };
        case Types.UPDATE_USER_FAIL:
            state.error = action.error
            state.isFetching = false;
            return { ...state };
        case Types.CROP_IMG_BANNER:
            state.CropImg = action.boolean
            return { ...state };
        case Types.URL_CROP_IMG_USER:
            if (action.url) { state.itemEditing.Avatar = action.url }
            return { ...state };
        case Types.GET_FOLLOWING_SUCCESS:
            state.userFollowing = action.data;
            state.isFetching = false;
            return { ...state };
        case Types.GET_JOINING_SUCCESS:
            state.userJoining = action.data;
            state.isFetching = false;
            return { ...state };
        case Types.LOAD_USER_TICKET_SUCCESS:
            state.userTicket = action.data;
            state.isFetching = false;
            return { ...state };
        default: return { ...state };
    }
}

export default users;