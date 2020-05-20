import * as Types from '../../constants/ActionType';
import HTTP from '../../services/HTTP';
import history from '../../helpers/history';
import authHeader from '../../helpers/authHeader';

export const actLoadDataCategories = (search = '', limit) => {
    var header = authHeader();
    return dispatch => {
        dispatch({ type: Types.LOAD_DATA_CATEGORIES_REQUEST });
        return HTTP('?action=categories' + search + '&limit=' + limit, 'GET', null, header).then(res => {
            console.log(`res`, res);

            if (res && res.data && res.data.status == 200) {
                dispatch({ type: Types.LOAD_DATA_CATEGORIES_SUCCESS, data: res.data.data });

            }
            if (res && res.data && res.data.status == 300) {
                dispatch({ type: Types.LOAD_DATA_CATEGORIES_FAIL, error: res.data.error });
                history.push("/permission")

            }


        });
    };
}


export const actGetCategorie = (id) => {
    var header = authHeader();
    return dispatch => {
        dispatch({ type: Types.LOAD_DATA_CATEGORIE_REQUEST });
        return HTTP(`?action=editCategorie&id_categorie=${id}`, 'GET', null, header).then(res => {
            console.log(res);

            if (res && res.data && res.data.status == 200) {
                var categorie = res.data.dataCategorie
                dispatch({ type: Types.LOAD_DATA_CATEGORIE_SUCCESS, dataCategorie: categorie });
            }
            if (res && res.data.status == 202) {
                dispatch({ type: Types.LOAD_DATA_CATEGORIE_FAIL, error: res.data.error });
            }

        });
    }
}

export const actUpdateCategorie = (body) => {
    console.log(`body`, body);

    var header = authHeader();
    return dispatch => {
        dispatch({ type: Types.UPDATE_CATEGORIE_REQUEST });
        return HTTP(`?action=Q_updateCategorie`, 'POST', body, header).then(res => {
            console.log(`res`, res);
            if (res.data.status == 200) {
                dispatch({ type: Types.UPDATE_CATEGORIE_SUCCESS, data: body })
                history.push('/categories')
            }
            if (res.data.status == 201) {
                dispatch({ type: Types.UPDATE_CATEGORIE_FAIL, error: res.data.error })
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

export const actDeleteCategorie = (id) => {
    console.log(`id`, id);

    var header = authHeader();
    return dispatch => {
        dispatch({ type: Types.DELETE_CATEGORIE_REQUEST });
        return HTTP(`?action=Q_deleteCategorie`, 'POST', { Id: id }, header).then(res => {
            console.log(`res`, res);
            if (res.data.status == 200) {
                dispatch({ type: Types.DELETE_CATEGORIE_SUCCESS, Id: id })
                history.push('/categories')
            }
            if (res.data.status == 201) {
                dispatch({ type: Types.DELETE_CATEGORIE_FAIL, error: res.data.error })
                // history.push('/products')
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


export const actClearCategory = () => {
    return {
        type: Types.CLAER_CATEGORIES_STORE
    }
}

export const actCropImg = (boolean) => {
    return {
        type: Types.CROP_IMG_BANNER,
        boolean
    }
}

export const actCropImgSuccess = (url) => {

    return {
        type: Types.URL_CROP_IMG_BANNER,
        url
    }
}
