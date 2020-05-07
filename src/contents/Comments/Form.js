import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContentWrapper from '../../components/Layout/ContentWrapper';
import FileBase64 from 'react-file-base64';
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
import CropIMG from '../../components/CropIMG';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: '',
            CommentId: '',
            Email: '',
            Name: '',
            Gender: '',
            Avatar: '',
            Birthday: '',
            AboutMe: '',
            Language: '',
            error: '',
            AreaId: '',
            Status: '', Password: ''

        };
        this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)
    }

    componentWillMount() {
        // console.log(this.props)
        var { Id,
            CommentId,
            Email,
            Name,
            Gender,
            Avatar,
            Birthday,
            AboutMe,
            Language,
            AreaId,
            Status, Password } = this.props.comment;

        Id ? Id = Id : Id = '';
        CommentId ? CommentId = CommentId : CommentId = '';
        Email ? Email = Email : Email = '';
        Name ? Name = Name : Name = '';
        Gender ? Gender = Gender : Gender = '';
        Avatar ? Avatar = Avatar : Avatar = '';
        Birthday ? Birthday = Birthday : Birthday = '';
        AboutMe ? AboutMe = AboutMe : AboutMe = '';
        Language ? Language = Language : Language = '';
        AreaId ? AreaId = AreaId : AreaId = '';
        Status ? Status = Status : Status = '';
        Password ? Password = Password : Password = '';

        console.log(Birthday)
        this.setState({
            Id,
            CommentId,
            Email,
            Name,
            Gender,
            Avatar,
            Birthday,
            AboutMe,
            Language,
            AreaId, Status, Password
        });

    }

    onChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });

    }


    validate() {
        var { Id,
            CommentId,
            Email,
            Name,
            Gender,
            Avatar,
            Birthday,
            AboutMe,
            Language, AreaId, Status, Password } = this.state;
        if (Name === '') {
            this.setState({
                error: 'Vui lòng nhập Name'
            })
            return false
        }
        if (CommentId === '') {
            this.setState({
                error: 'Vui lòng nhập CommentId'
            })
            return false
        }
        if (CommentId.length < 6) {
            this.setState({
                error: 'CommentId phải nhiều hơn 6 ký tự'
            })
            return false
        }
        if (Email === '') {
            this.setState({
                error: 'Vui lòng nhập Email'
            })
            return false
        }
        if (!Id) {
            if (Password.length < 6 || !/[a-z]/.test(Password) || !/\d/.test(Password)) {
                this.setState({
                    error: 'Password phải hơn 6 ký tự và có ít nhất 1 chữ & 1 số'
                })
                return false
            }
        }
        if (Gender === '') {
            this.setState({
                error: 'Vui lòng nhập Gender'
            })
            return false
        }
        if (Language === '') {
            this.setState({
                error: 'Vui lòng nhập Language'

            })
            return false
        }
        if (Status === '') {
            this.setState({
                error: 'Vui lòng nhập Status'
            })
            return false
        }
        if (AreaId === '') {
            this.setState({
                error: 'Vui lòng nhập AreaId'
            })
            return false
        }
        if (Birthday === '') {
            this.setState({
                error: 'Vui lòng nhập Birthday'
            })
            return false
        }



        return true;
    }

    onSave(e) {
        // console.log(this.state)

        this.setState({
            error: '',
        });
        e.preventDefault();
        var { Id,
            CommentId,
            Email,
            Name,
            Gender,
            Avatar,
            Birthday,
            AboutMe,
            Language, AreaId, Status, Password } = this.state;
        if (!this.validate()) {
            return;
        }
        if (Avatar == this.props.comment.Avatar) {
            Avatar = ''
        }
        else {
            Avatar = this.props.Image
        }
        var comment = {
            Id,
            CommentId,
            Email,
            Name,
            Gender,
            AvatarBase:Avatar,
            Birthday,
            AboutMe,
            Language, AreaId, Status, Password
        };
        // console.log(this.props)
        // console.log(comment)
        if (Id !== '') {
            this.props.onUpdateComment(comment);
        } else {
            this.props.onAddComment(comment);
        }
    }



    render() {
        var { Id,
            CommentId,
            Email,
            Name,
            Gender,
            Avatar,
            Birthday,
            AboutMe,
            Language,
            error, AreaId, Status, Password } = this.state;
        var { error_srv, isFetching,error1,onCropImg,isCropImg,onCropImgSuccess,Image } = this.props;
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Thêm mới</div>
                </div>
                <Card className="card-default">
                    <div className={isFetching ? "card-body whirl sphere" : "card-body"}>
                        <form onSubmit={this.onSave} data-parsley-validate="" noValidate className="form-horizontal">
                            <div className="panel panel-default">
                                {Id ? 
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">ID</label>
                                        <div className="col-md-6">
                                            <Input
                                                required="required"
                                                data-parsley-required-message="Field must have a valid."
                                                type="text"
                                                name="Id"
                                                value={Id}
                                                onChange={this.onChange}
                                                disabled='1'
                                            />
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                :''
                                }
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">CommentId</label>
                                        <div className="col-md-6">
                                            <Input
                                                type="text"
                                                name="CommentId"
                                                value={CommentId}
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
                                                name="Email"
                                                value={Email}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Password</label>
                                        <div className="col-md-6">
                                            <Input
                                                type="password"
                                                name="Password"
                                                value={Password}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Name</label>
                                        <div className="col-md-6">
                                            <Input
                                                type="text"
                                                name="Name"
                                                value={Name}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Gender</label>
                                        <div className="col-md-6">

                                            <label className="radio-inline c-radio">
                                                <input key='Gender1' type="radio" name="Gender" value="1" onChange={this.onChange} checked={Gender === 1 || Gender === '1' ? 'checked' : ''} />
                                                <span className="fa fa-circle" />
                                                1
                                            </label>
                                            <label className="radio-inline c-radio">
                                                <input key='Gender0' type="radio" name="Gender" onChange={this.onChange} value="0" checked={Gender === 0 || Gender === '0' ? 'checked' : ''} />
                                                <span className="fa fa-circle" />
                                                0
                                            </label>
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Avatar</label>
                                        <div className="col-md-6">
                                            <CropIMG onCropImg={onCropImg} isCropImg={isCropImg} aspect={{width:1*400,height:1*400}} Image={Image} onCropImgSuccess={onCropImgSuccess}/>
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Birthday</label>
                                        <div className="col-md-6">
                                            <Input
                                                type="date"
                                                name="Birthday"
                                                value={Birthday}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">AboutMe</label>
                                        <div className="col-md-6">
                                            <Input
                                                type="text"
                                                name="AboutMe"
                                                value={AboutMe}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Language</label>
                                        <div className="col-md-6">
                                            <select
                                                className="custom-select"
                                                name="Language"
                                                value={Language}
                                                onChange={this.onChange}
                                            >
                                                <option value="">Chọn Language</option>
                                                <option value="kr">Korea</option>
                                                <option value="vi">Việt Nam</option>
                                                <option value="en">English</option>
                                            </select>
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Status</label>
                                        <div className="col-md-6">

                                            <label className="radio-inline c-radio">
                                                <input key='Status1' type="radio" name="Status" value="1" onChange={this.onChange} checked={Status === 1 || Status === '1' ? 'checked' : ''} />
                                                <span className="fa fa-circle" />
                                                1
                                            </label>
                                            <label className="radio-inline c-radio">
                                                <input key='Status0' type="radio" name="Status" onChange={this.onChange} value="0" checked={Status === 0 || Status === '0' ? 'checked' : ''} />
                                                <span className="fa fa-circle" />
                                                0
                                            </label>
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">AreaId</label>
                                        <div className="col-md-6">
                                            <select
                                                className="custom-select"
                                                name="AreaId"
                                                value={AreaId}
                                                onChange={this.onChange}
                                            >
                                                <option value="">Chọn AreaId</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </div>
                                    </FormGroup>
                                </fieldset>

                                {
                                    error || error_srv || error1
                                        ?
                                        <div className="panel-heading">
                                            <div className="col-sm-6 col-sm-offset-3">
                                                <ul className="parsley-errors-list filled">
                                                    <li className="parsley-required">{error_srv ? error_srv : error+error1}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        :
                                        null
                                }
                                <fieldset>
                                    <FormGroup row>
                                        <div className="col-sm-3 text-right">
                                            <Link to="/comments" className="btn btn-square btn-default">Back</Link>
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