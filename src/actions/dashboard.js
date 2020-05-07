import * as Types from '../constants/ActionType';
import HTTP from '../services/HTTP';
import history from '../helpers/history';
import authHeader from '../helpers/authHeader';

export const actLoadDataDashboard = () => {
    var header = authHeader();
    return dispatch => {
        dispatch({
            type: Types.LOAD_DASHBOARD_REQUEST,
        });
        return HTTP('dashboard', 'GET', null, header).then(res => {
            if(res && res.data.status==200){
                dispatch({
                    type: Types.LOAD_DASHBOARD_SUCCESS,
                    data : res.data.data
                });
            }else{
                dispatch({
                    type: Types.LOAD_DASHBOARD_FAIL
                });
            }
        });
    };
}

export const actLoadDataDashboardChartEvents = () => {
    var header = authHeader();
    return dispatch => {
        dispatch({
            type: Types.LOAD_DASHBOARD_CHART_EVENTS_REQUEST,
        });
        return HTTP('chart-events', 'GET', null, header).then(res => {
            if(res && res.data.status==200){
                dispatch({
                    type: Types.LOAD_DASHBOARD_CHART_EVENTS_SUCCESS,
                    data : res.data.data
                });
            }else{
                dispatch({
                    type: Types.LOAD_DASHBOARD_CHART_EVENTS_FAIL
                });
            }
        });
    };
}



