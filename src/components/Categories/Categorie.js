import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Datatable from './Datatable';
import FormDelete from './FormDelete'
class Categorie extends Component {

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
    setRole = (id_categorie, Role) => {
        this.props.onUpdateCategorie({ Id: id_categorie, name: '', email: '', phone: '', password: '', permission: Role })
    }

    onDeleteCategorie = () => {
        this.toggleModalRemove()
    }

    onDelete = (id) => {
        this.props.onDeleteCategorie(id)
    }

    render() {
        var { item, index } = this.props;
        // console.log(item)
        return (
            <React.Fragment>
                <tr>
                    <td>{index + 1}</td>
                    <td>




                        <div className="col-5 text-center">
                            <Link to={`/categories-edit/${item.id_categorie}`}><img className="circle thumb96" src={item.logo} alt="Logo" /></Link>
                        </div>


                    </td>
                    <td>{item.name}</td>

                    <td>
                        {/* <Link className="btn btn-sm btn-info mr-2 command-edit" to={`/categorie/${item.id_categorie}`}><i className="fa fa-eye"></i></Link> */}
                        <Link className="btn btn-sm btn-success mr-2 command-edit" to={`/categories-edit/${item.id_categorie}`}><i className="fa fa-pencil"></i></Link>
                        {item.CATEGORIES == 1 || item.OPERATION == 1 ? '' : <button className="btn btn-sm btn-danger mr-2 command-edit" onClick={() => this.onDeleteCategorie(item.id_categorie)}><em className="fa fa-trash fa-fw"></em></button>
                        }
                    </td>
                </tr>
                <FormDelete id={item.id_categorie} onDelete={this.onDelete} isOpenModal={this.state.isOpenModalRemove} Status={-1} toggleModal={this.toggleModalRemove} />


            </React.Fragment >);
    }
}

export default Categorie;
