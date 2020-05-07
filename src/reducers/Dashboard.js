import * as Types from '../constants/ActionType';
var initialState = {
    loadding:false,
    data:[],
    loaddingChartEvents:false,
    dataChartEvents:[]
};

var findIndex = (events, id) => {
    var result = -1;
    events.forEach((event, index) => {
        if (event.Id === id) {
            result = index;
            return result;
        }
    });
    return result;
}
const events = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case Types.LOAD_DASHBOARD_REQUEST:
        state.loadding = true
        return {...state}
        case Types.LOAD_DASHBOARD_SUCCESS:
            state.data = action.data
        state.loadding = false
        return {...state}
        case Types.LOAD_DASHBOARD_FAIL:
        state.loadding = false
        return {...state}

        case Types.LOAD_DASHBOARD_CHART_EVENTS_REQUEST:
        state.loaddingChartEvents = true
        return {...state}
        case Types.LOAD_DASHBOARD_CHART_EVENTS_SUCCESS:
            state.dataChartEvents = action.data
        state.loaddingChartEvents = false
        return {...state}
        case Types.LOAD_DASHBOARD_CHART_EVENTS_FAIL:
        state.loaddingChartEvents = false
        return {...state}

        default: return { ...state };
    }
}

export default events;