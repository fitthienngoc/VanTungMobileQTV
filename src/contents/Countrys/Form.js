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
            Name: '',
            Zipcode: '',
            error: '',

        };
        this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)
    }

    
    componentWillMount() {
        console.log(this.props)
        var { Id,
            Name,
            Zipcode, error
        } = this.props.country;

        Id ? Id = Id : Id = '';
        Name ? Name = Name : Name = '';
        Zipcode ? Zipcode = Zipcode : Zipcode = '';
        error ? error = error : error = '';

        this.setState({
            Id,
            Name,
            Zipcode,
            error
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
            Name,
            Zipcode } = this.state;

        if (Name === '') {
            this.setState({
                error: 'Vui lòng nhập Tên Country'
            })
            return false
        }
        if (Zipcode === '') {
            this.setState({
                error: 'Vui lòng nhập Zipcode'
            })
            return false
        }
        if(Zipcode.indexOf('+')===-1){
            this.setState({
                error: 'Vui lòng kiểm tra lại Zipcode'
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
            Name,
            Zipcode } = this.state;
        if (!this.validate()) {
            return;
        }
        var country = {
            Id,
            CountryName: Name,
            Zipcode,
        };

        // console.log(country)
        if (Id !== '') {
            this.props.onUpdateCountry(country);
        } else {
            this.props.onAddCountry(country);

        }


    }




    render() {

        var {
            error, Id,
            Name,
            Zipcode } = this.state;

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
                                        <label className="col-md-3 col-form-label text-right">Country's Name</label>
                                        <div className="col-md-6">
                                            <Input
                                                required="required"
                                                data-parsley-required-message="Field must have a valid."
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
                                        <label className="col-md-3 col-form-label text-right">Zipcode</label>
                                        <div className="col-md-6">
                                            <Input
                                                required="required"
                                                data-parsley-required-message="Field must have a valid."
                                                type="text"
                                                name="Zipcode"
                                                value={Zipcode}
                                                onChange={this.onChange}
                                            />
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