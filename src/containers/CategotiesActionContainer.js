import React, { Component } from 'react';
import Spinner from '../components/Spinner/Spinner';
import { connect } from 'react-redux';
import { actGetCategorie, actUpdateCategorie, actCropImgSuccess, actCropImg, actClearCategory } from '../actions/tn_shop/categorie'
import ContentWrapper from '../components/Layout/ContentWrapper';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    FormFeedback,
    FormText,
    Label,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Input,
    Button,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

import CropIMG from '../components/CropIMG';

class CategoriesActionContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Id: '',
            name: '',
            errorAll: '',
            check: true,
            logo: '',
            BRANDS: false,
            CATEGORIES: false,
            OPERATION: false
        };
    }

    componentDidMount() {

        this.props.onClearCategory()
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.props.onEditItem(this.props.match.params.id)
        }

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.categories !== this.props.categories) {
            var { itemEditing } = nextProps.categories
            // console.log(`itemEditing`, itemEditing);
            var { name, id_categorie, logo, BRANDS,
                CATEGORIES,
                OPERATION } = itemEditing

            BRANDS == '1' ? BRANDS = true : BRANDS = false
            CATEGORIES == '1' ? CATEGORIES = true : CATEGORIES = false
            OPERATION == '1' ? OPERATION = true : OPERATION = false

            if (name === undefined) { name = this.state.name }
            if (BRANDS === undefined) { BRANDS = this.state.BRANDS }
            if (CATEGORIES === undefined) { CATEGORIES = this.state.CATEGORIES }
            if (OPERATION === undefined) { OPERATION = this.state.OPERATION }

            this.setState({
                Id: id_categorie,
                logo,
                name,
                BRANDS,
                CATEGORIES,
                OPERATION
            })

        }


    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });

    }

    onSave = (e) => {

        e.preventDefault();

        this.setState({
            errorAll: '',
            check: true
        });

        var check = true
        var { name, logo } = this.state


        if (name && logo) {
            this.setState({ logo })
        } else {
            check = false
            this.setState({
                errorAll: 'Vui lòng nhập đầy đủ thông tin!',
            })
        }

        this.setState({ check })

        if (check) {
            var { Id, name, BRANDS,
                CATEGORIES,
                OPERATION } = this.state
            var body = {
                Id, name, logo, BRANDS, CATEGORIES,
                OPERATION
            };

            OPERATION ? body.OPERATION = '1' : body.OPERATION = '0'
            BRANDS ? body.BRANDS = '1' : body.BRANDS = '0'
            CATEGORIES ? body.CATEGORIES = '1' : body.CATEGORIES = '0'
            
            if (Id) {
                this.props.onUpdateCategorie(body)
            } else {

                body.Id = ''
                this.props.onUpdateCategorie(body)
            }
        } else {
            console.log(`check`, check);
        }

    }

    render() {
        var { categories, onCropImg, onCropImgSuccess } = this.props

        var { Id,
            email,
            name,
            errorAll,
            logo,
            BRANDS,
            CATEGORIES,
            OPERATION } = this.state

        return categories.isFetching ? <Spinner /> :
            <ContentWrapper>
                <div className="content-heading">
                    <div>{Id ? "Chỉnh sửa" : "Thêm mới"}</div>
                </div>
                <Row>

                    <Col lg={3} />
                    <Col lg={6}>
                        <Card className="card">
                            <div className={categories.isFetching ? "card-body whirl sphere" : "card-body"}><br />
                                <form onSubmit={this.onSave} data-parsley-validate="" noValidate className="form-horizontal">
                                    <div className="panel panel-default">

                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Name</label>
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
                                                <label className="col-md-3 col-form-label text-right">Thương Hiệu</label>

                                                <div className="col-md-6 ">
                                                    <label className="checkbox c-checkbox c-checkbox-rounded">
                                                        <Input type="checkbox"

                                                            name="BRANDS"
                                                            checked={BRANDS}
                                                            onChange={this.onChange}
                                                            className="form-check-input" />
                                                        <span className="fa fa-check"></span>

                                                    </label>
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Thể Loại</label>

                                                <div className="col-md-6 ">
                                                    <label className="checkbox c-checkbox c-checkbox-rounded">
                                                        <Input type="checkbox"

                                                            name="CATEGORIES"
                                                            checked={CATEGORIES}
                                                            onChange={this.onChange}
                                                            className="form-check-input" />
                                                        <span className="fa fa-check"></span>

                                                    </label>
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Hệ Điều Hành</label>

                                                <div className="col-md-6 ">
                                                    <label className="checkbox c-checkbox c-checkbox-rounded">
                                                        <Input type="checkbox"

                                                            name="OPERATION"
                                                            checked={OPERATION}
                                                            onChange={this.onChange}
                                                            className="form-check-input" />
                                                        <span className="fa fa-check"></span>

                                                    </label>
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>

                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Logo</label>
                                                <div className="col-md-6">
                                                    <CropIMG onCropImg={onCropImg} isCropImg={categories.CropImg} Image={logo} aspect={{ width: 1 * 400, height: 1 * 400 }} onCropImgSuccess={onCropImgSuccess} />

                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <div className="text-center">
                                            {errorAll}
                                        </div>

                                        <fieldset>
                                            <FormGroup row>
                                                <div className="col-sm-3 text-right">
                                                    <Link to="/categories" className="btn btn-square btn-default">Back</Link>
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
                    </Col>
                </Row>
            </ContentWrapper>



    }
}

const mapStatetoProps = state => {
    return {
        categories: state.categories,

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

        onClearCategory: () => {
            dispatch(actClearCategory());
        },
        onEditItem: (id) => {
            dispatch(actGetCategorie(id));
        },
        onUpdateCategorie: (body) => {
            dispatch(actUpdateCategorie(body))
        },
        onCropImgSuccess: (url) => {
            dispatch(actCropImgSuccess(url));
        },
        onCropImg: (boolean) => {
            dispatch(actCropImg(boolean))
        },
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(CategoriesActionContainer);