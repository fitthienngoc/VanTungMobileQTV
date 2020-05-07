import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContentWrapper from '../../components/Layout/ContentWrapper';
import {
    
    Card,
    
    FormGroup,
    
    Input,
    
} from 'reactstrap';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: '',
            Email: "",
            Phone: "",
            EventId :'',
            CountryId: "",
            Code: "",
            ZipCode:'',
            Tag : [],
            Logo:'',error:''

        };
        this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)
    }


    componentWillMount() {
        // console.log(this.props)
        // this.props.onLoadDataCountry();
        var { Id,
            Email,
            Phone,
            CountryId,
            Code,
            ZipCode,
            Tag,
            Logo, error
        } = this.props.event;

        Id ? Id = Id : Id = '';
        CountryId ? CountryId = CountryId : CountryId = '';
        Email ? Email = Email : Email = '';
        Phone ? Phone = Phone : Phone = '';
        Code ? Code = Code : Code = '';
        ZipCode ? ZipCode = ZipCode : ZipCode = '';
        Tag ? Tag = Tag : Tag = [];
        Logo ? Logo = Logo : Logo = '';

        error ? error = error : error = '';

        this.setState({
            Id,
            Email,
            Phone,
            CountryId,
            Code,
            ZipCode,
            Tag,
            Logo, error
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
            Email,
            Phone,
            CountryId,
            Code,
            ZipCode,
            Tag,
            Logo, error } = this.state;

        return true;
    }

    onSave(e) {


        this.setState({
            error: '',
        });
        e.preventDefault();
        var { Id,
            Email,
            Phone,
            CountryId,
            Code,
            ZipCode,
            Tag,
            Logo} = this.state;
        if (!this.validate()) {
            return;
        }
        var event = {
            Id,
            Email,
            Phone,
            CountryId,
            Code,
            ZipCode,
            Tag,
            Logo 
        };

        if (Id !== '') {
            this.props.onUpdateEvent(event);
        } else {
            this.props.onAddEvent(event);

        }


    }


    showOption(datas){
        var result = null;
        if(datas.length > 0) {
            result = datas.map((item, index) => {
                return (
                    <option value={item.Id} key={index}>{item.Name}</option>
                );
            });
        }
        return result;
    }

    render() {
        
        var {
            Id,
            Email,
            Phone,
            CountryId,
            Code,
            ZipCode,
            Tag,
            Logo, error } = this.state;

        var { error_srv, isFetching, countrys } = this.props;
        console.log(this.props)
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Thêm mới</div>
                </div>
                <Card className="card-default">
                    <div className={isFetching ? "card-body whirl sphere" : "card-body"}>
                        <form onSubmit={this.onSave} data-parsley-validate="" noValidate className="form-horizontal">
                            <div className="panel panel-default">
                                {Id ? (
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
                                ) : ''
                                }
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Phone</label>
                                        <div className="col-md-6">
                                            <Input
                                                required="required"
                                                data-parsley-required-message="Field must have a valid."
                                                type="text"
                                                name="Phone"
                                                value={Phone}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Event's Email</label>
                                        <div className="col-md-6">
                                            <Input
                                                required="required"
                                                data-parsley-required-message="Field must have a valid."
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
                                        <label className="col-md-3 col-form-label text-right">Event's Logo</label>
                                        <div className="col-md-6">
                                            <Input
                                                required="required"
                                                data-parsley-required-message="Field must have a valid."
                                                type="text"
                                                name="Logo"
                                                value={Logo}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                
                                    <fieldset>
                                        <FormGroup row>
                                            <label className="col-md-3 col-form-label text-right">CountryId</label>
                                            <div className="col-md-6">
                                                
                                                <select
                                                    required="required"
                                                    className="form-control m-b"
                                                    type="text"
                                                    name="CountryId"
                                                    value={CountryId}
                                                    onChange={this.onChange}
                                                    >
                                                        <option value="">Country</option>
                                                        { this.showOption(countrys.countrys.data) }
                                                </select>
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