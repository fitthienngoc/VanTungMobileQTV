import * as Config from '../constants/Config';
import axios from 'axios';
import history from '../helpers/history';

export default function callApi(endpoint, method = 'GET', body, header = ''){
    return axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body,
        headers: header
    }).catch(error => {
        if (error.response) {
            if(error.response.status === 401) {
                history.push('/login');
            }
            if(error.response.status === 500) {
                history.push('/500-server-error')
            }
            return error.response.status;
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
    });
};