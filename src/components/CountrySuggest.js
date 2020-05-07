import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import formatPrice from '../helpers/formatPrice';

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
    <span>
        {suggestion.name}
    </span>
);

class CountrySuggest extends Component {

    onChangeCountry = (event, { newValue }) => {
        this.props.onChangeCountry(newValue);
    };

    onSuggestionsFetchCountryRequested = ({ value }) => {
        this.props.onSuggestionsFetchCountryRequested(value);
    };

    onSuggestionsClearCountryRequested = () => {
        // this.props.onSuggestionsClearCountryRequested();
    };
    onSuggestionSelected = (event, { suggestion }) => {
        this.props.onSuggestionSelected(suggestion);
    }

    countQuantity = (countrys) => {
        var quantity = 0;
        if(countrys.length > 0) {
            for (var i = 0; i < countrys.length; i++) {
                quantity += countrys[i].quantity*1;
            };
        }
        return quantity;
    }

    total = (countrys) => {
        var total = 0;
        if(countrys.length > 0) {
            for (var i = 0; i < countrys.length; i++) {
                total += countrys[i].quantity*countrys[i].price;
            };
        }
        return total;
    }

    render() {
        var { suggestionsCountry, value, countrys, children, disabled } = this.props;
        return (
            <div>
                <div className="col-sm-11">
                    <div className="form-group">
                        <label>Chọn sản phẩm</label>
                            <Autosuggest
                                theme={{
                                    container:                'chosen-container chosen-container-multi',
                                    containerOpen:            'chosen-with-drop chosen-container-active',
                                    input:                    'react-autosuggest__input',
                                    inputOpen:                'react-autosuggest__input--open',
                                    inputFocused:             'react-autosuggest__input--focused',
                                    suggestionsContainer:     'chosen-drop',
                                    suggestionsContainerOpen: '',
                                    suggestionsList:          'chosen-results',
                                    suggestion:               'active-result',
                                    suggestionFirst:          '',
                                    suggestionHighlighted:    'highlighted',
                                    sectionContainer:         '',
                                    sectionContainerFirst:    '',
                                    sectionTitle:             ''
                                }}
                                suggestions={suggestionsCountry.data ? suggestionsCountry.data : []}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchCountryRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearCountryRequested}
                                onSuggestionSelected={this.onSuggestionSelected}
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={{
                                    value,
                                    onChange: this.onChangeCountry,
                                    className: "form-control",
                                    disabled: disabled ? 'disabled' : ''
                                }}
                            />
                    </div>
                </div>
                <div className="col-sm-11">
                    <div className="form-group">
                        <div className="panel panel-default">
                            <div className="panel-heading">Danh sách sản phẩm</div>
                            <div className="panel-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr className="btn-primary">
                                                <th style={{color: '#FFF'}}>STT</th>
                                                <th style={{color: '#FFF'}}>Tên sản phẩm (Mã sản phẩm)</th>
                                                <th style={{color: '#FFF'}}>Giá nhập</th>
                                                <th style={{color: '#FFF'}}>Số lượng</th>
                                                <th style={{color: '#FFF'}}>Hạn sử dụng</th>
                                                <th style={{color: '#FFF'}}>Tổng tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { children }
                                            {
                                                countrys.length > 0
                                                &&
                                                <tr className="info">
                                                    <td colSpan="3" className="font-bold"><strong>Tổng tiền</strong></td>
                                                    <td className="text-right font-bold"><strong>{this.countQuantity(countrys)}</strong></td>
                                                    <td></td>
                                                    <td className="text-right font-bold"><strong>{formatPrice(this.total(countrys))}</strong></td>
                                                </tr>
                                            }
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CountrySuggest;
