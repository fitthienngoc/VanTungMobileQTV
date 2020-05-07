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
            Name: '',
            CountryId: '',

            error: '',

        };
        this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)
    }


    componentWillMount() {
        console.log(this.props)
        var { Id,
            Name,
            CountryId, error
        } = this.props.area;

        Id ? Id = Id : Id = '';
        Name ? Name = Name : Name = '';
        CountryId ? CountryId = CountryId : CountryId = '';
        error ? error = error : error = '';

        this.setState({
            Id,
            Name,
            CountryId, error
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
            CountryId, error } = this.state;

        if (Name === '') {
            this.setState({
                error: 'Vui lòng nhập Tên Area'
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
            CountryId } = this.state;
        if (!this.validate()) {
            return;
        }
        var erea = {
            Id,
            Name,
            CountryId
        };

        if (Id !== '') {
            this.props.onUpdateArea(erea);
        } else {
            this.props.onAddArea(erea);

        }


    }




    render() {

        var {
            Id,
            Name,
            CountryId, error } = this.state;

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
                                {Id ? (
                                    <fieldset>
                                        <FormGroup row>
                                            <label className="col-md-3 col-form-label text-right">ID</label>
                                            <div className="col-md-6">
                                                <Input
                                                    required="required"
                                                    data-parsley-required-message="Field must have a valid"
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
                                        <label className="col-md-3 col-form-label text-right">Area's Name</label>
                                        <div className="col-md-6">
                                            <Input
                                                required="required"
                                                data-parsley-required-message="Field must have a valid"
                                                type="text"
                                                name="Name"
                                                value={Name}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                {Id ? (
                                    <fieldset>
                                        <FormGroup row>
                                            <label className="col-md-3 col-form-label text-right">CountryId</label>
                                            <div className="col-md-6">
                                                <Input
                                                    required="required"
                                                    data-parsley-required-message="Field must have a valid"
                                                    type="text"
                                                    name="CountryId"
                                                    value={CountryId}
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                        </FormGroup>
                                    </fieldset>) : ''
                                }

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