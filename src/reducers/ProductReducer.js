import * as Types from '../constants/ActionType';
var initialState = {
    products: {
        data: []
    },
    isFetching: false,
    itemEditing: {
        logo: '',
        id_product: ''
    },
    dataComment:[],
    error: '',

    CropImg: false,
    CropImgUrl: '',

};

var findIndex = (products, id) => {
    var result = -1;
    products.forEach((product, index) => {
        if (product.Id === id) {
            result = index;
            return result;
        }
    });
    return result;
}
var findIndexIdProduct = (products, id) => {
    var result = -1;
    products.forEach((product, index) => {
        if (product.id_product === id) {
            result = index;
            return result;
        }
    });
    return result;
}
const products = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {

        case Types.LOAD_DATA_PRODUCTS_REQUEST:
        case Types.LOAD_DATA_PRODUCT_REQUEST:
            state.error = '';
            state.isFetching = true;
            return { ...state };
        case Types.LOAD_DATA_PRODUCTS_SUCCESS:
            state.products = action.data
            state.error = '';
            state.isFetching = false;
            return { ...state };
        case Types.LOAD_DATA_PRODUCTS_FAIL:
            state.error = action.error;
            state.isFetching = false;
            return { ...state };

        case Types.LOAD_DATA_PRODUCT_SUCCESS:
            // console.log(`action`, action);
            state.itemEditing = action.dataProduct
            state.dataComment = action.dataComment
            state.error = '';
            state.isFetching = false;
            return { ...state };
        case Types.LOAD_DATA_PRODUCT_FAIL:
            state.error = action.error;
            state.isFetching = false;
            return { ...state };

        case Types.UPDATE_PRODUCT_REQUEST:
            state.error = '';
            state.isFetching = true;
            return { ...state };
        case Types.UPDATE_PRODUCT_SUCCESS:
            state.error = '';
            state.itemEditing = action.data
            state.isFetching = true;
            return { ...state };
        case Types.UPDATE_PRODUCT_FAIL:
            state.error = action.error;
            state.isFetching = false;
            return { ...state };

        case Types.DELETE_PRODUCT_REQUEST:
        case Types.DELETE_PRODUCT_FAIL:
            var Id = action.Id;
            index = findIndex(state.categories.data, Id)
            if (index) {
                state.categories.data.splice(index, 1)
            }
            if (action.error) {
                state.error = action.error;
            }
            state.isFetching = false;
            return { ...state };
        case Types.DELETE_PRODUCT_SUCCESS:
            state.error = '';
            state.isFetching = false;
            return { ...state };




        case Types.CLAER_PRODUCTS_STORE:
            state = initialState
            return { ...state };
        case Types.CROP_IMG_BANNER:
            state.CropImg = action.boolean
            return { ...state };
        case Types.URL_CROP_IMG_BANNER:
            // console.log(`action`, action);
            if (action.url) { state.itemEditing.logo = action.url }
            return { ...state };

        default: return { ...state };
    }
}

export default products;