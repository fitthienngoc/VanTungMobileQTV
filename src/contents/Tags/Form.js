import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContentWrapper from '../../components/Layout/ContentWrapper';
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

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: '',
            HashTagName: '',
            Hidden: '',
            TargetType:'',
            error: '',

        };
        this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)
    }


    componentWillMount() {
        // console.log(this.props)
        var { Id,
            HashTagName,
            Hidden, error,TargetType
        } = this.props.tag;

        Id ? Id = Id : Id = '';
        HashTagName ? HashTagName = HashTagName : HashTagName = '';
        Hidden ? Hidden = Hidden : Hidden = '';
        error ? error = error : error = '';
        TargetType ? TargetType = TargetType : TargetType = '';

        this.setState({
            Id,
            HashTagName,
            Hidden,
            error,
            TargetType
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
        var {
            Id,
            HashTagName,
            Hidden,TargetType } = this.state;

        if (HashTagName === '') {
            this.setState({
                error: 'Vui lòng nhập HashTagName'
            })
            return false
        }
        if (Hidden === '') {
            this.setState({
                error: 'Vui lòng nhập Hidden'
            })
            return false
        }
        
        if (TargetType === '') {
            this.setState({
                error: 'Vui lòng chọn TargetType'
            })
            return false
        }
        
        return true;
    }

    onSave(e) {


        this.setState({
            error: '',
        });
        e.preventDefault();
        var { Id,
            HashTagName,
            Hidden,TargetType } = this.state;
        if (!this.validate()) {
            return;
        }
        var tag = {
            Id,
            HashTagName,
            Hidden,TargetType
        };

        if (Id !== '') {
            // console.log('TargetType', TargetType)
            this.props.onUpdateTag(tag);
        } else {
            this.props.onAddTag(tag);
            // console.log('TargetType', TargetType)

        }


    }




    render() {

        var {
            error, Id,
            HashTagName,
            Hidden,TargetType } = this.state;

        var { error_srv, isFetching } = this.props;
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Thêm mới</div>
                </div>
                <Card className="card-default">
                    <div className={isFetching ? "card-body whirl sphere" : "card-body"}>
                        <form onSubmit={this.onSave} data-parsley-validate="" noValidate className="form-horizontal">
                            <div className="panel panel-default">

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
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">HashTagName</label>
                                        <div className="col-md-6">
                                            <Input
                                                required="required"
                                                data-parsley-required-message="Field must have a valid."
                                                type="text"
                                                name="HashTagName"
                                                value={HashTagName}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Type</label>
                                        <div className="col-md-6">
                                            <select
                                                className="custom-select"
                                                name="TargetType"
                                                value={TargetType}
                                                onChange={this.onChange}
                                            >
                                                <option value="">Select Type</option>
                                                <option value="event">Event</option>
                                                <option value="team">Team</option>
                                                <option value="venue">Venue</option>
                                            </select>
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Hidden</label>
                                        <div className="col-md-6">

                                            <label className="radio-inline c-radio">
                                                <input type="radio" name="Hidden" value="Y" onChange={this.onChange} checked={Hidden === 'Y' ? 'checked' : ''} />
                                                <span className="fa fa-circle" />
                                                Y
                                            </label>
                                            <label className="radio-inline c-radio">
                                                <input type="radio" name="Hidden" onChange={this.onChange} value="N" checked={Hidden === 'N' ? 'checked' : ''} />
                                                <span className="fa fa-circle" />
                                                N
                                            </label>
                                        </div>
                                    </FormGroup>
                                </fieldset>



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
                                        <div className="col-sm-3 text-right">
                                            <Link to="/tags" className="btn btn-square btn-default">Back</Link>
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