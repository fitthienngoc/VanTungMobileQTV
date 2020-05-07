import React, { Component } from 'react';
import qs from 'qs';
import { Row, Col } from 'reactstrap';
class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            per_page: 10,
            search: '',
            event: '',
            email: '',
            transaction: '',
            status: '',
        };
        this.onChange = this.onChange.bind(this)
    }

    componentWillMount() {
        var { location } = this.props;

        var search = qs.parse(location.search);
        console.log('search')
        console.log(search)
        this.setState({
            per_page: ('per_page' in search) ? search.per_page : 15,
            search: ('search' in search) ? search.search : '',
        });

        let params = qs.parse(search)
        let { event,
            email,
            transaction,
            status} = params
        status ? status = status : status = ''
        event ? event = event : event = ''
        email ? email = email : email = ''
        transaction ? transaction = transaction : transaction = ''
        
        this.setState({
            event,
            email,
            transaction,
            status
        })


    }

    onChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
        this.props.onFilter(name, value)
    }

    render() {
        var { per_page, search, email, event, transaction, status } = this.state;
        return (
            <Row>
                <Col sm="12" md="6">
                    <label>
                        <div className="dataTables_length" id="datatable2_length">
                            <select
                                name="per_page"
                                aria-controls="datatable2"
                                className="form-control form-control-sm"
                                value={per_page}
                                onChange={this.onChange}
                            >
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            {' items / page'}
                        </div>
                    </label>
                </Col>
                <Col sm="12" md="6">
                    <div className="dataTables_filter">
                        <label >
                            <div className="dataTables_length" id="datatable2_length">
                                <select
                                    name="status"
                                    aria-controls="datatable2"
                                    className="form-control form-control-sm"
                                    value={status}
                                    onChange={this.onChange}
                                    placeholder="Status"
                                >
                                    <option value="">All</option>
                                    <option value="1">Used </option>
                                    <option value="-1">Refunded</option>
                                    <option value="0">Refund Request</option>
                                    <option value="2">Canceled</option>
                                    <option value="3">Refuse</option>
                                    <option value="-3">Canceled Event</option>
                                </select>
                            </div>
                        </label>
                        <label>
                            <input
                                type="event"
                                className="form-control form-control-sm"
                                placeholder="Event"
                                aria-controls="datatable2"
                                name="event"
                                value={event}
                                onChange={this.onChange}
                            />
                        </label>
                        <label>
                            <div className="dataTables_length" id="datatable2_length">

                                <input
                                    type="email"
                                    className="form-control form-control-sm"
                                    placeholder="Email"
                                    aria-controls="datatable2"
                                    name="email"
                                    value={email}
                                    onChange={this.onChange}
                                />
                            </div>
                        </label>

                    </div>

                </Col>
            </Row>
        );
    }
}

export default Filter;
