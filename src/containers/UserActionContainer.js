import React, { Component } from 'react';
import Spinner from '../components/Spinner/Spinner';
import { connect } from 'react-redux';
import { actGetUser, actUpdateUser } from '../actions/tn_shop/user'
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
import users from '../reducers/UserReducer';

class UserActionContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Id: '',
            email: '',
            phone: '',
            password: '',
            permission: '',
            name: '',
            errorAll: '',
            errorEmail: '',
            errorPassword: '',
            errorRePassword: '',
            check: true,
        };
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.props.onEditUser(this.props.match.params.id)
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.users !== this.props.users) {
            var { itemEditing } = nextProps.users
            // console.log(`itemEditing`, itemEditing);
            var { name, email, id_user, phone } = itemEditing
            this.setState({
                Id: id_user,
                email, phone, name
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
            errorEmail: '',
            errorPassword: '',
            check: true
        });

        var check = true
        var { name, email, password } = this.state
        if (name && email) {

        } else {
            check = false
            this.setState({
                errorAll: 'Vui lòng nhập đầy đủ thông tin!',
            })
        }
        if (email) {
            var a = email.split('@')
            if (!a[1]) {
                check = false
                this.setState({
                    errorEmail: "Email có dạng abc@xyz.com!",
                })
            }

        }
        if (password) {
            if (password.length < 6) {
                check = false
                this.setState({ errorPassword: "Mật khẩu có ít nhất 6 ký tự!" })
            }
        }
        this.setState({ check })

        if (check) {
            var {Id, name, email, password, phone } = this.state
            var body = {Id, name, email, password, phone };
            console.log(body)
            this.props.onUpdateUser(body) 
        }

    }

    render() {
        var { users } = this.props

        var { Id,
            email,
            phone,
            password,
            permission, name,
            errorAll,
            errorEmail,
            errorPassword, } = this.state

        return users.isFetching ? <Spinner /> :
            <ContentWrapper>
                <div className="content-heading">
                    <div>{Id ? "Chỉnh sửa" : "Thêm mới"}</div>
                </div>
                <Row>

                    <Col lg={3} />
                    <Col lg={6}>
                        <Card className="card">
                            <div className={users.isFetching ? "card-body whirl sphere" : "card-body"}><br />
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
                                                <label className="col-md-3 col-form-label text-right">Phone</label>
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
                                                <label className="col-md-3 col-form-label text-right">Email</label>
                                                <div className="col-md-6">
                                                    <Input
                                                        type="text"
                                                        name="email"
                                                        value={email}
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset className="text-center">
                                            {errorEmail}

                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Password</label>
                                                <div className="col-md-6">
                                                    <Input
                                                        type="password"
                                                        name="password"
                                                        value={password}
                                                        onChange={this.onChange}
                                                    />
                                                </div>

                                            </FormGroup>
                                        </fieldset>
                                        <fieldset className="text-center">
                                            {errorPassword}
            
                                        </fieldset>
                                        <fieldset className="text-center">
                                            {errorAll}
                                            {users.error}    
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <div className="col-sm-3 text-right">
                                                    <Link to="/users" className="btn btn-square btn-default">Back</Link>
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
        users: state.users,

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

        onEditUser: (id) => {
            dispatch(actGetUser(id));
        },
        onUpdateUser: (body) => {
            dispatch(actUpdateUser(body))
        }
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(UserActionContainer);