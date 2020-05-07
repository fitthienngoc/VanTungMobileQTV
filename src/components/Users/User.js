import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Datatable from './Datatable';
import FormDelete from './FormDelete'
class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            isOpenModalRemove: false,
            isOpenModalLock: false,
            isOpenModalActive: false,
            dropdownOpen1: false
        };
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    toggle1 = () => {
        this.setState({
            dropdownOpen1: !this.state.dropdownOpen1
        });
    }

    showStatus = (item) => {
        if (item.Status) {
            if (item.Status == -1) {
                return <React.Fragment> <span className="text text-default">REMOVE</span></React.Fragment>
            }
            else if (item.Status == 0) {
                return <React.Fragment> <span className="text text-danger">LOCK</span></React.Fragment>
            } else if (item.Status == 1) {
                return <React.Fragment> <span className="text text-success">ACTIVE</span></React.Fragment>
            }
        }
    }
    toggleModalRemove = () => {
        this.setState({
            isOpenModalRemove: !this.state.isOpenModalRemove
        })
    }
    toggleModalLock = () => {
        this.setState({
            isOpenModalLock: !this.state.isOpenModalLock
        })
    }
    toggleModalActive = () => {
        this.setState({
            isOpenModalActive: !this.state.isOpenModalActive
        })
    }
    showRole = (item) => {

        if (item.permission == "admin") {
            return <React.Fragment> <span className="text text-default">ADMIN</span></React.Fragment>
        }
        else {
            return <React.Fragment> <span className="text text-danger">MEMBER</span></React.Fragment>
        }

    }
    setRole = (id_user, Role) => {
        this.props.onUpdateUser({ Id: id_user,name:'',email:'',phone:'',password:'', permission: Role })
    }

    render() {
        var { item, index } = this.props;
        // console.log(item)
        return (
            <React.Fragment>
                <tr>
                    <td>{index + 1}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.name}</td>

                    <td>
                        <Dropdown isOpen={this.state.dropdownOpen1} toggle={this.toggle1}>
                            <DropdownToggle>
                                {this.showRole(item)}
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu animated fadeIn">
                                {item.Role != 'admin' ? <DropdownItem onClick={() => this.setRole(item.id_user, 'admin')} className="text text default" >ADMIN</DropdownItem> : null}
                                {item.Role != 'member' ? <DropdownItem onClick={() => this.setRole(item.id_user, 'member')} className="text text-danger" >MEMBER</DropdownItem> : null}


                            </DropdownMenu>
                        </Dropdown>
                    </td>
                    <td>
                        {/* <Link className="btn btn-sm btn-info mr-2 command-edit" to={`/user/${item.id_user}`}><i className="fa fa-eye"></i></Link> */}
                        <Link className="btn btn-sm btn-success mr-2 command-edit" to={`/users/${item.id_user}/edit`}><i className="fa fa-pencil"></i></Link>
                        {/* <button className="btn btn-sm btn-danger mr-2 command-edit" onClick={() => this.onDeleteUser(item.id_user)}><em className="fa fa-trash fa-fw"></em></button> */}

                    </td>
                </tr>
                <FormDelete id={item.id_user} onUpdateStatus={this.props.onUpdateStatus} onDelete={this.onDeleteArea} isOpenModal={this.state.isOpenModalRemove} Status={-1} toggleModal={this.toggleModalRemove} />


            </React.Fragment >);
    }
}

export default User;
