import * as Types from '../constants/ActionType';
var initialState = {
    manages: {
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
    manageFollowing: [],
    manageJoining: [],
    manageTicket:[]
};

var findIndex = (manages, id) => {
    var result = -1;
    manages.forEach((manage, index) => {
        if (manage.Id === id) {
            result = index;
            return result;
        }
    });
    return result;
}
const manages = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case Types.LOAD_DATA_MANAGE_REQUEST:
        case Types.LOAD_DATA_MANAGES_REQUEST:
        case Types.ADD_MANAGE_REQUEST:
        case Types.UPDATE_MANAGE_REQUEST:
        case Types.DELETE_MANAGE_REQUEST:
        case Types.UPDATE_STATUS_MANAGE_REQUEST:
            state.error = '';
            state.isFetching = true;
            return { ...state };
        case Types.LOAD_DATA_MANAGES_SUCCESS:
            state.manages = action.data;
            state.isFetching = false;
            return { ...state };
        case Types.UPDATE_STATUS_MANAGE_FAIL:
            state.isFetching = false;
            return { ...state };
        case Types.UPDATE_STATUS_MANAGE_SUCCESS:
            index = findIndex(state.manages.data, action.data.id);
            state.manages.data[index].Status = action.data.Status;
            state.isFetching = false;
            return { ...state };
        case Types.LOAD_DATA_MANAGES_FAIL:
            state.error = '';
            state.isFetching = false;
            return { ...state };
        case Types.ADD_MANAGE_SUCCESS:
            console.log(action)
            state.manages.data.unshift(action.data);
            state.isFetching = false;
            return { ...state };
        case Types.LOAD_DATA_MANAGE_SUCCESS:
            state.itemEditing = action.data;
            state.isFetching = false;
            return { ...state };
        case Types.UPDATE_MANAGE_SUCCESS:
            index = findIndex(state.manages.data, action.data.Id);
            state.manages.data[index] = action.data;
            state.isFetching = false;
            return { ...state };
        case Types.DELETE_MANAGE_SUCCESS:
            index = findIndex(state.manages.data, action.id);
            state.manages.data.splice(index, 1);
            state.isFetching = false;
            return { ...state };
        case Types.SUGGESTIONS_FETCH_MANAGE:
            state.suggestionsUser = action.data;
            return { ...state };
        case Types.ADD_MANAGE_FAIL:
            state.error = action.error;
            state.isFetching = false;
            return { ...state };
        case Types.UPDATE_MANAGE_FAIL:
            for (var variable in action.error) {

                state.error += action.error[variable] + ' ';
            }
            state.isFetching = false;
            return { ...state };
        case Types.CROP_IMG_BANNER:
            state.CropImg = action.boolean
            return { ...state };
        case Types.URL_CROP_IMG_MANAGE:
            if (action.url) { state.itemEditing.Avatar = action.url }
            return { ...state };
        case Types.GET_FOLLOWING_SUCCESS:
            state.manageFollowing = action.data;
            state.isFetching = false;
            return { ...state };
        case Types.GET_JOINING_SUCCESS:
            state.manageJoining = action.data;
            state.isFetching = false;
            return { ...state };
        
        default: return { ...state };
    }
}

export default manages;