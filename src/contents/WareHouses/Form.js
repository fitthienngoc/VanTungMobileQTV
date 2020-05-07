import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContentWrapper from '../../components/Layout/ContentWrapper';
import {
    Card,
    FormGroup,
    Input } from 'reactstrap';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            code: '',
            name: '',
            city_slug: '',
            district_slug: '',
            address: '',
            commune_slug: '',
            phone: '',
            user_id: '',
            error: '',
            status: 1,
        };
        this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)
    }

    componentWillMount() {
        this.setState({
            id: ''+this.props.warehouse.id,
            code: this.props.warehouse.code ? this.props.warehouse.code : '',
            name: this.props.warehouse.name,
            city_slug: this.props.warehouse.city_slug,
            district_slug: this.props.warehouse.district_slug,
            address: this.props.warehouse.address,
            commune_slug: this.props.warehouse.commune_slug,
            user_id: this.props.warehouse.user_id,
            phone: this.props.warehouse.phone,
            status: this.props.warehouse.status || this.props.warehouse.status === 0 ? this.props.warehouse.status : 1,
        });
        if(this.props.warehouse.city_slug) {
            this.props.onGetDistrict(this.props.warehouse.city_slug);
        }
        if(this.props.warehouse.district_slug) {
            this.props.onGetCommune(this.props.warehouse.city_slug, this.props.warehouse.district_slug);
        }
    }

    onChange(e){
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
        if(name === 'city_slug') {
            this.props.onGetDistrict(value)
        } else if(name === 'district_slug') {
            this.props.onGetCommune(this.state.city_slug, value)
        }
    }

    validate() {
        var { code, name, phone, address } = this.state;
        if(code === '') {
            this.setState({
                error: 'Mã kho hàng không được bỏ trống!',
            });
            return false;
        }
        if(name === '') {
            this.setState({
                error: 'Tên kho hàng không được bỏ trống!',
            });
            return false;
        }
        if(phone === '') {
            this.setState({
                error: 'Số điện thoại không được bỏ trống!',
            });
            return false;
        }
        if(address === '') {
            this.setState({
                error: 'Địa chỉ không được bỏ trống!',
            });
            return false;
        }
        return true;
    }

    onSave(e){
        this.setState({
            error: '',
        });
        e.preventDefault();
        var { id, code, name, phone, city_slug, district_slug, commune_slug, address, user_id, status } = this.state;
        if (!this.validate()) {
            return;
        }
        var warehouse = {
            id,
            code,
            name,
            city_slug,
            district_slug,
            address,
            commune_slug,
            phone,
            user_id,
            status
        };
        if(id) {
            this.props.onUpdateWareHouse(warehouse);
        } else {
            this.props.onAddWareHouse(warehouse);
        }
    }

    showOption(datas){
        var result = null;
        if(datas.length > 0) {
            result = datas.map((item, index) => {
                return (
                    <option value={item.slug} key={index}>{item.name}</option>
                );
            });
        }
        return result;
    }

    showOption2(datas){
        var result = null;
        if(datas.length > 0) {
            result = datas.map((item, index) => {

                return (
                    <option value={item._id} key={index}>{item.full_name ? item.full_name : item.username}</option>
                );
            });
        }
        return result;
    }

    render() {
        var { code, name, phone, city_slug, district_slug, commune_slug, address, error, user_id, status } = this.state;
        var { cities, error_srv, isFetching, warehouseUsers } = this.props;
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Thêm mới</div>
                </div>
                <Card className="card-default">
                    <div className={isFetching ? "card-body whirl sphere" : "card-body"}>
                        <form onSubmit={ this.onSave } data-parsley-validate="" noValidate className="form-horizontal">
                            <div className="panel panel-default">
                                {
                                    error || error_srv
                                    ?
                                    <div className="panel-heading">
                                        <div className="col-sm-6 col-sm-offset-3">
                                            <ul className="parsley-errors-list filled">
                                                <li className="parsley-required">{error_srv ? error_srv : error}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    :
                                    null
                                }
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Mã kho hàng</label>
                                        <div className="col-md-6">
                                            <Input
                                                required="required"
                                                data-parsley-required-message="Trường này không được bỏ trống."
                                                type="text"
                                                name="code"
                                                value={code}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Tên kho hàng</label>
                                        <div className="col-md-6">
                                            <Input
                                                type="text"
                                                name="name"
                                                value={name}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Số điện thoại</label>
                                        <div className="col-md-6">
                                            <Input
                                                type="text"
                                                name="phone"
                                                value={phone}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Địa chỉ</label>
                                        <div className="col-md-6">
                                            <Input
                                                type="text"
                                                name="address"
                                                value={address}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Thành phố</label>
                                        <div className="col-md-6">
                                            <select
                                                className="custom-select"
                                                name="city_slug"
                                                value={city_slug}
                                                onChange={this.onChange}
                                                >
                                                    <option value="">Chọn thành phố</option>
                                                    { this.showOption(cities.cities) }
                                            </select>
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Quận huyện</label>
                                        <div className="col-md-6">
                                            <select
                                                className="custom-select"
                                                name="district_slug"
                                                value={district_slug}
                                                onChange={this.onChange}
                                                >
                                                    <option value="">Chọn quận huyện</option>
                                                    { this.showOption(cities.districts) }
                                            </select>
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Phường xã</label>
                                        <div className="col-md-6">
                                            <select
                                                className="custom-select"
                                                name="commune_slug"
                                                value={commune_slug}
                                                onChange={this.onChange}
                                                >
                                                    <option value="">Chọn phường xã</option>
                                                    { this.showOption(cities.communes) }
                                            </select>
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Thủ kho</label>
                                        <div className="col-md-6">
                                            <select
                                                className="custom-select"
                                                name="user_id"
                                                value={user_id}
                                                onChange={this.onChange}
                                                >
                                                    <option value="">Chọn thủ kho</option>
                                                    { this.showOption2(warehouseUsers.data) }
                                            </select>
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Trạng thái hoạt động</label>
                                        <div className="col-md-6">
                                            <label className="radio-inline c-radio">
                                                <input id="inlineradio1" type="radio" name="status" value="1" onChange={this.onChange} checked={status === 1 || status === '1' ? 'checked' : ''} />
                                                <span className="fa fa-circle" />
                                                Hoạt động
                                            </label>
                                            <label className="radio-inline c-radio">
                                                <input id="inlineradio2" type="radio" name="status" onChange={this.onChange} value="0" checked={status === 0 || status === '0' ? 'checked' : ''} />
                                                <span className="fa fa-circle" />
                                                Khóa
                                            </label>
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <div className="col-sm-3 text-right">
                                            <Link to="/warehouses" className="btn btn-square btn-default">Back</Link>
                                        </div>
                                        <div className="col-sm-6">
                                            <button className="btn btn-square btn-primary" type="submit">Save</button>
                                        </div>
                                    </FormGroup>
                                </fieldset>
                            </div>
                        </form>
                    </div>
                </Card>
            </ContentWrapper>
        );
    }
}

export default Form;