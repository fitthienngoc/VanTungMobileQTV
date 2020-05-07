import React, { Component } from 'react';
import qs from 'qs';
import { Row, Col } from 'reactstrap';
class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            per_page: 10,
            search: '',
        };
        this.onChange = this.onChange.bind(this)
    }

    componentWillMount() {
        var {location} = this.props;
        var search = qs.parse(location.search);
        this.setState({
            per_page: ('per_page' in search) ? search.per_page : 15,
            search: ('search' in search) ? search.search : '',
        });
    }

    onChange(e){
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
        this.props.onFilter(name, value)
    }

    render() {
        var {per_page, search} = this.state;
        return (
            <Row>
                <Col sm="12" md="6">
                    <label>
                        {/* <div className="dataTables_length" id="datatable2_length">
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
                        </div> */}
                    </label>
                </Col>
                <Col sm="12" md="6">
                    <div className="dataTables_filter">
                        <label>
                            <input
                                type="search"
                                className="form-control form-control-sm"
                                placeholder="Search"
                                aria-controls="datatable2"
                                name="search"
                                value={search}
                                onChange={this.onChange}
                            />
                        </label>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Filter;
