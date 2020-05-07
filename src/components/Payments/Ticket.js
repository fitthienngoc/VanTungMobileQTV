import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonToolbar, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FormStatus from './../Events/FormStatus'
class Area extends Component {

    onDeleteArea(id) {
        console.log(id)
        if (window.confirm('Bạn chắc chắn muốn xóa ?')) {
            this.props.onDeleteEvent(id)
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            status: 0,
            isOpenModalFinish: false,
            isOpenModalCancel: false,
            isOpenModalPending: false,
            isOpenModalLock: false
        };

    }

    componentWillMount() {
        this.setState({
            status: this.props.item.ticketDetail.Status,
            name: 'xxxx'
        })
    }
    onLoadDataPaymentByEvent = (id) => {
        this.props.onFilterEvent(id)
    }
    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    toggleModalFinish = () => {
        this.setState({
            isOpenModalFinish: !this.state.isOpenModalFinish
        })
    }
    toggleModalCancel = () => {
        this.setState({
            isOpenModalCancel: !this.state.isOpenModalCancel
        })
    }
    toggleModalPending = () => {
        this.setState({
            isOpenModalPending: !this.state.isOpenModalPending
        })
    }
    toggleModalLock = () => {
        this.setState({
            isOpenModalLock: !this.state.isOpenModalLock
        })
    }
    toggleModalRefund = () => {
        this.setState({
            isOpenModalRefund: !this.state.isOpenModalRefund
        })
    }
    showStatus = () => {
        

        if (this.state.status == 1) {
            return <React.Fragment> <span className="text text-success">USED</span></React.Fragment>
        }
        else if (this.state.status == -1) {
            return <React.Fragment> <span className="text text-danger">REFUNDED</span></React.Fragment>
        } else if (this.state.status == 0) {
            return <React.Fragment> <span className="text text-default">REFUND REQUEST</span></React.Fragment>
        } else if (this.state.status == 2) {
            return <React.Fragment> <span className="text text-primary">CANCELED</span></React.Fragment>
        }
        else if (this.state.status == 3) {
            return <React.Fragment> <span className="text text-warning">REFUSE</span></React.Fragment>
        }
        else if (this.state.status == -3) {
            return <React.Fragment> <span className="text text-info">CANCELED EVENT</span></React.Fragment>
        }
    }



    render() {
        var { item, index } = this.props;
        console.log(item)
        var {ticketDetail,event,user} = item
        var about = ''
        about = item.AboutEvent ? item.AboutEvent : null
        return (
            <tr >
                <td>{index + 1}</td>

                <td><div>

                    <div className="clearfix">
                        <p className="float-left">Status</p>
                        <span className="float-right mr-2" style={{ textTransform: 'uppercase' }}>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle>
                                    {this.showStatus()}
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu animated fadeIn">
                                    {ticketDetail.Status != 1 ? <DropdownItem onClick={this.toggleModalFinish} className="text text-success">USED</DropdownItem> : null}
                                    {ticketDetail.Status != -1 ? <DropdownItem onClick={this.toggleModalPending} className="text text-danger">REFUNDED</DropdownItem> : null}
                                    {ticketDetail.Status != 0 ? <DropdownItem onClick={this.toggleModalCancel} className="text text-default">REFUND REQUEST</DropdownItem> : null}
                                    {ticketDetail.Status != 2 ? <DropdownItem onClick={this.toggleModalRefund} className="text text-primary">CANCELED</DropdownItem> : null}
                                    {ticketDetail.Status != 3 ? <DropdownItem onClick={this.toggleModalLock} className="text text-warning">REFUSE</DropdownItem> : null}
                                    {ticketDetail.Status != -3 ? <DropdownItem onClick={this.toggleModalLock} className="text text-info">CANCELED EVENT</DropdownItem> : null}
                                </DropdownMenu>
                            </Dropdown>
                        </span>
                    </div>
                    <Link to={`/Payment/${ticketDetail.Id}`}>
                        <div className="clearfix">
                            <p className="float-left">Type</p>
                            <p className="float-right mr-2" style={{ textTransform: 'uppercase' }}>{ticketDetail.Ticket.Type == 2 ? <span className="text text-success">cod</span> : <span className="text text-danger">e-ticket</span>}</p>
                        </div>

                        <div className="clearfix">
                            <p className="float-left">Code</p>
                            <p className="float-right mr-2" style={{ textTransform: 'uppercase' }}>{ticketDetail.Ticket.Code}</p>
                        </div>
                        <div className="clearfix">
                            <p className="float-left">Transaction Code</p>
                            <p className="float-right mr-2">{ticketDetail.Ticket.TransactionCode}</p>
                        </div>
                        <div className="clearfix">
                            <p className="float-left">Create at</p>
                            <p className="float-right mr-2">{ticketDetail.Ticket.CreatedAt}</p>
                        </div>
                        <div className="clearfix">
                            <p className="float-left">TotalMoney</p>
                            <p className="float-right mr-2">{ticketDetail.Ticket.TotalMoney}</p>
                        </div>
                    </Link>
                </div></td>
                {/* <td><Link to={`/Payment/${item.Id}`}>{item.Code}</Link></td> */}
                <td>
                    <div className="text text-center">
                        <p>Name: {user.Name}</p>
                        <p>Phone: {user.Telephone}</p>
                        <p>Email: {user.Email}</p>
                        
                    </div>
                </td>
                <td>
                    <div className="card-body text-center">
                        <Link to={`event/${event.Id}/view`} ><p onClick={() => this.onLoadDataPaymentByEvent(event.Id)} className="mb-3"><img className="rounded thumb86" src={event.Posters.Small} alt="Demo" /></p>
                            <p className="m-0"><strong>{event.Title.substring(0,60)}</strong></p></Link>
                    </div>
                </td>
                <td> <Link className="btn btn-sm btn-info mr-2 command-edit" to={`/tickets/${ticketDetail.Id}`}><i className="fa fa-eye"></i></Link></td>
                <FormStatus id={ticketDetail.Id} onUpdateStatusLiveEvent={this.props.onUpdateStatus} isOpenModal={this.state.isOpenModalCancel} Status={-1} toggleModal={this.toggleModalCancel} />
                <FormStatus id={ticketDetail.Id} onUpdateStatusLiveEvent={this.props.onUpdateStatus} isOpenModal={this.state.isOpenModalFinish} Status={1} toggleModal={this.toggleModalFinish} />
                <FormStatus id={ticketDetail.Id} onUpdateStatusLiveEvent={this.props.onUpdateStatus} isOpenModal={this.state.isOpenModalPending} Status={2} toggleModal={this.toggleModalPending} />
                <FormStatus id={ticketDetail.Id} onUpdateStatusLiveEvent={this.props.onUpdateStatus} isOpenModal={this.state.isOpenModalLock} Status={'0'} toggleModal={this.toggleModalLock} />
                <FormStatus id={ticketDetail.Id} onUpdateStatusLiveEvent={this.props.onUpdateStatus} isOpenModal={this.state.isOpenModalRefund} Status={-2} toggleModal={this.toggleModalRefund} />
                
            </tr>
        );
    }
}

export default Area;
