import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FormStatus from './FormStatus'
class Area extends Component {



    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            isOpenModalLive: false,
            isOpenModalComing: false,
            isOpenModalFinish: false
        };
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    showHashTag = () => {
        var { item } = this.props;
        if (item && item.HashTag) {
            var tags = item.HashTag
            var result = ''
            if (tags && tags.length > 0) {
                result = tags.map((item, index) => {
                    return (

                        "#" + item.HashTagName + " "


                    );
                });
            }
            return result;
        }
    }

    toggleModalComing = () => {
        this.setState({
            isOpenModalComing: !this.state.isOpenModalComing
        })
    }
    toggleModalFinish = () => {
        this.setState({
            isOpenModalFinish: !this.state.isOpenModalFinish
        })
    }
    toggleModalLive = () => {
        this.setState({
            isOpenModalLive: !this.state.isOpenModalLive
        })
    }

    render() {
        var { item, index } = this.props;
        var about = ''
        about = item.AboutEvent ? item.AboutEvent : null
        var status = ''
        var statusLive = ''
        if (item.Status == 1) {
            status = <div className="text text-danger">Active</div>
        } else if (item.Status == 0) {
            status = <div className="text text-success">Locked</div>
        } else if (item.Status == -1) {
            status = <div className="text text-primary">Deleted</div>
        }else if (item.Status == -2) {
            status = <div className="text text-primary">Error</div>
        }

        if (item.StatusLive == 1) {
            statusLive = <span className="badge badge-danger">LIVE</span>
        } else if (item.StatusLive == 0) {
            statusLive = <span className="badge badge-primary">FINISH</span>
        } else if (item.StatusLive == -1) {
            statusLive = <span className="badge badge-success">COMING</span>
        }

        return (
            <React.Fragment>
                <tr>
                    <td>{index + 1}</td>

                    <td>
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-5 text-center">
                                        <img className="circle thumb96" src={item.Posters.Small} alt="Logo" />
                                    </div>
                                    <div className="col-7">
                                        <h3 className="mt-0">
                                        {item.Title.substring(0, 50)}
                                        {item.Title.length > 50 ? '...' :null}
                                            
                                        </h3>
                                        <ul className="list-unstyled mb-0">
                                            <li className="mb-1">
                                                <em className="fa fa-tags fa-fw"></em> {this.showHashTag()}</li>
                                            <li className="mb-1">
                                                <em className="icon-location-pin"></em> {item.AreaName + ' - ' + item.Country}</li>

                                            <li className="mb-1">
                                                <em className="fa fa-phone fa-fw"></em> {item.Phone}</li>
                                            <li className="mb-1">
                                                <em className="fa fa-envelope fa-fw"></em> {item.Email}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>{item.CreatedAt}</td>
                    <td> {statusLive} </td>
                    {/* <td>{item.AreaName}</td> */}
                    {/* <td> <img className="img-fluid circle" style={{ height: '30px', width: '30px' }} src={item.Posters.Small} alt="Avater" /></td> */}
                    {/* <td>{item.Title}</td> */}
                    {/* <td>{item.Email}</td> */}
                    {/* <td>{item.Phone}</td> */}
                    {/* <td>{this.showHashTag()}</td> */}
                    <td>{item.HostTeam ? item.HostTeam.Id ? <Link to={`/team/${item.HostTeam.Id}`}>{item.HostTeam.Name}</Link> : null : null}</td>
                    <td>{item.RefundRequest.Total}</td>
                    <td>{item.TotalSalesVolume.Money}</td>
                    <td>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle>
                                {status}
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu animated fadeIn">
                                {item.Status !== -1 ? <DropdownItem onClick={this.toggleModalComing} className="text text-primary" >Deleted</DropdownItem> : null}
                                {item.Status !== 0 ? <DropdownItem onClick={this.toggleModalFinish} className="text text-defalt" >Locked</DropdownItem> : null}
                                {item.Status !== 1 ? <DropdownItem onClick={this.toggleModalLive} className="text text-danger">Active</DropdownItem> : null}

                            </DropdownMenu>
                        </Dropdown>
                    </td>
                    <td>{item.ReportedAmount}</td>
                    {/* <td>N/A</td>
                <td>N/A</td> */}

                    <td>
                        <Link className="btn btn-sm btn-info mr-2 command-edit" to={`/event/${item.Id}/view`}><i className="fa fa-eye"></i></Link>
                        {/* <Link className="btn btn-sm btn-success mr-2 command-edit" to={`/event/${item.Id}/edit`}><i className="fa fa-pencil"></i></Link> */}
                        {/* <button className="btn btn-sm btn-danger mr-2 command-edit" onClick={() => this.onDeleteArea(item.Id)}><em className="fa fa-trash fa-fw"></em></button> */}
                        {/* <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle>
                            Action
                            </DropdownToggle>
                        <DropdownMenu className="dropdown-menu animated fadeIn">
                            <DropdownItem ><Link className="btn btn-default btn-xs" to={`/event/${item.Id}/view`}><i className="fa fa-eye"></i>&nbsp;&nbsp;Xem</Link></DropdownItem>
                            <DropdownItem ><Link className="btn btn-default btn-xs" to={`/event/${item.Id}/edit`}><i className="fa fa-pencil"></i>&nbsp;&nbsp;Sửa</Link></DropdownItem>
                            <DropdownItem ><a onClick={() => this.onDeleteArea(item.Id)} className="btn btn-default btn-xs"><i className="fa fa-remove"> </i>&nbsp;&nbsp;Xóa</a></DropdownItem>
                        </DropdownMenu>
                    </Dropdown> */}

                    </td>
                </tr>
                <FormStatus id={item.Id} onUpdateStatusLiveEvent={this.props.onUpdateStatusLiveEvent} isOpenModal={this.state.isOpenModalComing} Status={-1} toggleModal={this.toggleModalComing} />
                <FormStatus id={item.Id} onUpdateStatusLiveEvent={this.props.onUpdateStatusLiveEvent} isOpenModal={this.state.isOpenModalFinish} Status={"0"} toggleModal={this.toggleModalFinish} />
                <FormStatus id={item.Id} onUpdateStatusLiveEvent={this.props.onUpdateStatusLiveEvent} isOpenModal={this.state.isOpenModalLive} Status={1} toggleModal={this.toggleModalLive} />
            </React.Fragment>
        );
    }
}

export default Area;
