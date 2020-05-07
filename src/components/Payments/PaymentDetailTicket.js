import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonToolbar, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Area extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            status: 0
        };

    }

    componentWillMount() {
        this.setState({

        })
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    showStatusDetailTicket = () => {
        


        if (this.state.status == 1) {
            return <React.Fragment> <span className=" badge badge-success">USED</span></React.Fragment>
        }
        else if (this.state.status == -1) {
            return <React.Fragment> <span className="badge badge-danger">REFUNDED</span></React.Fragment>
        } else if (this.state.status == 0) {
            return <React.Fragment> <span className="badge badge-inverse">REFUND REQUEST</span></React.Fragment>
        } else if (this.state.status == 2) {
            return <React.Fragment> <span className="badge badge-primary">CANCELED</span></React.Fragment>
        }
        else if (this.state.status == 3) {
            return <React.Fragment> <span className="badge badge-warning">REFUSE</span></React.Fragment>
        }
        else if (this.state.status == -3) {
            return <React.Fragment> <span className="badge badge-info">CANCELED EVENT</span></React.Fragment>
        }
    }

    


    render() {

        var { ticket } = this.props
        return (
            <tr key={ticket.Id + 'ticket'}>

                <td><Link to={`/tickets/${ticket.Id}`}>{ticket.Code}</Link></td>
                <td>
                    <span className="mr-2" style={{ textTransform: 'uppercase' }}>
                        {this.showStatusDetailTicket()}
                        {/* <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle>
                                {this.showStatusDetailTicket()}
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu animated fadeIn">
                                <DropdownItem >USED</DropdownItem>
                                <DropdownItem >PEDDING</DropdownItem>
                                <DropdownItem >CANCEL</DropdownItem>
                                <DropdownItem >REFUND</DropdownItem>
                                <DropdownItem >AVAILBLE</DropdownItem>

                            </DropdownMenu>
                        </Dropdown> */}
                    </span>
                </td>
                <td>{ticket.UseDate}</td>

            </tr>
        );
    }
}

export default Area;

