import * as Types from '../../constants/ActionType';
import HTTP from '../../services/HTTP';
import history from '../../helpers/history';
import authHeader from '../../helpers/authHeader';


export const actUpdateComment = (Id, verify) => {

    var header = authHeader();
    return dispatch => {
        dispatch({ type: Types.UPDATE_COMMENT_REQUEST });
        return HTTP(`?action=Q_updateComment`, 'POST', { Id, verify }, header).then(res => {
            console.log(`res`, res);
            if (res.data.status == 200) {
                dispatch({ type: Types.UPDATE_COMMENT_SUCCESS, data: { Id, verify } })
                history.push('/comments')
            }
            if (res.data.status == 201) {
                dispatch({ type: Types.UPDATE_COMMENT_FAIL, error: res.data.error })
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
export const actRepComment = (Id,content_rep) => {

    var header = authHeader();
    return dispatch => {
        dispatch({ type: Types.REP_COMMENT_REQUEST });
        return HTTP(`?action=Q_RepComment`, 'POST', {Id, content_rep }, header).then(res => {
            
            if (res.data.status == 200) {
                dispatch({ type: Types.REP_COMMENT_SUCCESS })
                history.push('/comments')
            }
            if (res.data.status == 201) {
                dispatch({ type: Types.REP_COMMENT_FAIL, error: res.data.error })
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

export const actDeleteComment = (Id) => {

    var header = authHeader();
    return dispatch => {
        dispatch({ type: Types.DELETE_COMMENT_REQUEST });
        return HTTP(`?action=Q_updateComment`, 'POST', { Id }, header).then(res => {
            console.log(`res`, res);
            if (res.data.status == 200) {
                dispatch({ type: Types.DELETE_COMMENT_SUCCESS, data: { Id } })
                history.push('/comments')
            }
            if (res.data.status == 201) {
                dispatch({ type: Types.DELETE_COMMENT_FAIL, error: res.data.error })
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


export const actLoadDataComment = (id) => {
    var header = authHeader();
    return dispatch => {
        dispatch({ type: Types.LOAD_DATA_COMMENTS_REQUEST });
        return HTTP(`?action=Q_getComments&id_comment=${id}`, 'GET', null, header).then(res => {
            console.log(res);

            if (res && res.data && res.data.status == 200) {
                var comment = res.data.data
                dispatch({ type: Types.LOAD_DATA_COMMENTS_SUCCESS, data: comment });
            }
            if (res && res.data.status == 202) {
                dispatch({ type: Types.LOAD_DATA_COMMENTS_FAIL, error: res.data.error });
            }

        });
    }
}

