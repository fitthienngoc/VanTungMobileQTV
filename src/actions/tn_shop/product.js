import * as Types from '../../constants/ActionType';
import HTTP from '../../services/HTTP';
import history from '../../helpers/history';
import authHeader from '../../helpers/authHeader';

export const actLoadDataProducts = (search = '') => {
    var header = authHeader();
    return dispatch => {
        dispatch({ type: Types.LOAD_DATA_PRODUCTS_REQUEST });
        return HTTP('?action=products' + search, 'GET', null, header).then(res => {
            console.log(`res`, res);

            if (res && res.data && res.data.status == 200) {
                dispatch({ type: Types.LOAD_DATA_PRODUCTS_SUCCESS, data: res.data.data });

            }
            if (res && res.data && res.data.status == 300) {
                dispatch({ type: Types.LOAD_DATA_PRODUCTS_FAIL, error: res.data.error });
                history.push("/permission")

            }


        });
    };
}


export const actGetProduct = (id) => {
    var header = authHeader();
    return dispatch => {
        dispatch({ type: Types.LOAD_DATA_PRODUCT_REQUEST });
        return HTTP(`?action=editProduct&Id=${id}`, 'GET', null, header).then(res => {
            console.log(res);

            if (res && res.data && res.data.status == 200) {
                var product = res.data.dataProduct
                var comment = res.data.data_comment
                dispatch({ type: Types.LOAD_DATA_PRODUCT_SUCCESS, dataProduct: product, dataComment: comment });
            }
            if (res && res.data.status == 202) {
                dispatch({ type: Types.LOAD_DATA_PRODUCT_FAIL, error: res.data.error });
            }

        });
    }
}

export const actUpdateProduct = (body) => {
    console.log(`body`, body);

    var header = authHeader();
    return dispatch => {
        dispatch({ type: Types.UPDATE_PRODUCT_REQUEST });
        return HTTP(`?action=Q_updateProduct`, 'POST', body, header).then(res => {
            console.log(`res`, res);
            if (res.data.status == 200) {
                dispatch({ type: Types.UPDATE_PRODUCT_SUCCESS, data: body })
                history.push('/products')
            }
            if (res.data.status == 201) {
                dispatch({ type: Types.UPDATE_PRODUCT_FAIL, error: res.data.error })
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

export const actDeleteProduct = (id) => {
    console.log(`id`, id);

    var header = authHeader();
    return dispatch => {
        dispatch({ type: Types.DELETE_PRODUCT_REQUEST });
        return HTTP(`?action=Q_deleteProduct`, 'POST', { Id: id }, header).then(res => {
            console.log(`res`, res);
            if (res.data.status == 200) {
                dispatch({ type: Types.DELETE_PRODUCT_SUCCESS, Id: id })
                history.push('/products')
            }
            if (res.data.status == 201) {
                dispatch({ type: Types.DELETE_PRODUCT_FAIL, error: res.data.error })
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
        type: Types.CLAER_PRODUCTS_STORE
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
