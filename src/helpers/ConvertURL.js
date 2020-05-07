import qs from 'qs';
export default function ConvertURL(search, key, value){

    var oldSearch = qs.parse(search);
    oldSearch[key] = value;
    if(key !== 'page') {
        oldSearch.page = 1;
    }
    return qs.stringify(oldSearch);
};