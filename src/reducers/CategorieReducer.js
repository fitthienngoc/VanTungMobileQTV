import * as Types from '../constants/ActionType';
var initialState = {
    categories: {
        data: []
    },
    isFetching: false,
    itemEditing: {
        logo: '',
        id_categorie: ''
    },
    error: '',

    CropImg: false,
    CropImgUrl: '',

};

var findIndex = (categories, id) => {
    var result = -1;
    categories.forEach((categorie, index) => {
        if (categorie.Id === id) {
            result = index;
            return result;
        }
    });
    return result;
}
var findIndexIdCategorie = (categories, id) => {
    var result = -1;
    categories.forEach((categorie, index) => {
        if (categorie.id_categorie === id) {
            result = index;
            return result;
        }
    });
    return result;
}
const categories = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {

        case Types.LOAD_DATA_CATEGORIES_REQUEST:
        case Types.LOAD_DATA_CATEGORIE_REQUEST:
            state.error = '';
            state.isFetching = true;
            return { ...state };
        case Types.LOAD_DATA_CATEGORIES_SUCCESS:
            state.categories = action.data
            state.error = '';
            state.isFetching = false;
            return { ...state };
        case Types.LOAD_DATA_CATEGORIES_FAIL:
            state.error = action.error;
            state.isFetching = false;
            return { ...state };

        case Types.LOAD_DATA_CATEGORIE_SUCCESS:
            // console.log(`action`, action);
            state.itemEditing = action.dataCategorie
            state.error = '';
            state.isFetching = false;
            return { ...state };
        case Types.LOAD_DATA_CATEGORIE_FAIL:
            state.error = action.error;
            state.isFetching = false;
            return { ...state };

        case Types.UPDATE_CATEGORIE_REQUEST:
            state.error = '';
            state.isFetching = true;
            return { ...state };
        case Types.UPDATE_CATEGORIE_SUCCESS:
            state.error = '';
            state.itemEditing = action.data
            state.isFetching = true;
            return { ...state };
        case Types.DELETE_CATEGORIE_FAIL:
            state.error = action.error
            state.isFetching = false;
            return { ...state };


        case Types.DELETE_CATEGORIE_REQUEST:
        case Types.DELETE_CATEGORIE_FAIL:
            var Id = action.Id;
            index = findIndexIdCategorie(state.categories.data, Id)
            if (index) {
                state.categories.data.splice(index, 1)
            }
            if (action.error) {
                state.error = action.error;
            }
            state.isFetching = false;
            return { ...state };
        case Types.DELETE_CATEGORIE_SUCCESS:
            state.error = '';
            state.isFetching = false;
            return { ...state };




        case Types.CLAER_CATEGORIES_STORE:
            state.itemEditing = {
                logo: '',
                id_categorie: ''
            }
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

export default categories;