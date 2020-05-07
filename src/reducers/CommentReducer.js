import * as Types from '../constants/ActionType';
var initialState = {
    comments: {
        data: []
    },
    isFetching: false,
    itemEditing: {},
    error: '',
    CropImg: false,
    CropImgUrl: '',

};

var findIndex = (comments, id) => {
    var result = -1;
    comments.forEach((comment, index) => {
        if (comment.Id === id) {
            result = index;
            return result;
        }
    });
    return result;
}
var findIndexIdComment = (comments, id) => {
    var result = -1;
    comments.forEach((comment, index) => {
        if (comment.Id === id) {
            result = index;
            return result;
        }
    });
    return result;
}
const comments = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {

        case Types.LOAD_DATA_COMMENTS_REQUEST:
        case Types.UPDATE_COMMENT_REQUEST:
        case Types.DELETE_COMMENT_REQUEST:
            state.isFetching = true
            state.error = ''
            return { ...state };
        case Types.LOAD_DATA_COMMENTS_SUCCESS:
            // console.log(`action`, action);
            state.comments = action.data
            state.isFetching = false
            state.error = ''
            return { ...state };
        case Types.DELETE_COMMENT_SUCCESS:
            index = -1
            index = findIndexIdComment(state.comments.data, action.data.Id)
            if (index > -1) {
                state.comments.data.splice(index,1)
            }
            state.isFetching = false
            state.error = ''
            return { ...state };
        case Types.UPDATE_COMMENT_SUCCESS:
            index = -1
            index = findIndexIdComment(state.comments.data, action.data.Id)
            if (index > -1) {
                state.comments.data[index].verify = action.data.verify
            }
            state.isFetching = false
            state.error = ''
            return { ...state };
        case Types.LOAD_DATA_COMMENTS_FAIL:
        case Types.UPDATE_COMMENT_FAIL:
        case Types.DELETE_COMMENT_FAIL:
            state.isFetching = false
            state.error = action.error
            return { ...state };
        default: return { ...state };
    }
}

export default comments;