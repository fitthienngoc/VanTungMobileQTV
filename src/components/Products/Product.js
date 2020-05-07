import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Datatable from './Datatable';
import FormDelete from './FormDelete'
class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            isOpenModalRemove: false,
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
    onDeleteProduct=()=>{
        this.toggleModalRemove()
    }

    onDelete=(id)=>{
        this.props.onDeleteProduct(id)
    }
    
    showRole = (item) => {

        if (item.permission == "admin") {
            return <React.Fragment> <span className="text text-default">ADMIN</span></React.Fragment>
        }
        else {
            return <React.Fragment> <span className="text text-danger">MEMBER</span></React.Fragment>
        }

    }
    

    render() {
        var { item, index } = this.props;
        return (
            <React.Fragment>
                <tr>
                    <td>{index + 1}</td>
                    <td>
                        <div className="row">
                            <div className="col-7 text-center">
                                {item && Array.isArray(item.pictures) && item.pictures.map((pic, index) => {
                                    if (index < 3) return <Link key={index} to={`/products-edit/${item.Id}`}><img className="thumb96" src={pic.base64} alt="Logo" /></Link>

                                })

                                }</div>
                            <div className="col-5">
                                <h3 className="mt-0">{item.name} </h3>
                                <ul className="list-unstyled mb-0">
                                    <li className="mb-1"><em className="fa fa-barcode  fa-fw"></em> {item.code}</li>
                                    <li className="mb-1"><em className="fa fa-cubes fa-fw"></em> {item.quality}</li>
                                    <li className="mb-1"><em className="fa fa-cogs fa-fw"></em> {item.ram}</li>
                                    <li className="mb-1"><em className="fa fa-dashboard fa-fw"></em> {item.cpuHeDH}</li>
                                    <li className="mb-1"><em className="fa fa-microchip fa-fw"></em> {item.cpuChipset}</li>
                                </ul>
                            </div>
                        </div>

                    </td>
                    <td>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-1"> Tên: {item.name}</li>
                            <li className="mb-1"> Mã SP: {item.code}</li>
                            <li className="mb-1"> Số lượng: {item.quality}</li>
                            <li className="mb-1"> Công nghệ màn hình: {item.screenName}</li>
                            <li className="mb-1"> Camera trước: {item.front_cameraDoPhanGiai}</li>
                            <li className="mb-1"> Camera sau: {item.back_cameraDoPhanGiai}</li>
                            <li className="mb-1"> Chip: {item.cpuChipset}</li>
                            <li className="mb-1"> Ram/ Rom: {item.ram} / {item.rom} </li>
                        </ul>
                    </td>

                    <td>
                        {/* <Link className="btn btn-sm btn-info mr-2 command-edit" to={`/product/${item.Id}`}><i className="fa fa-eye"></i></Link> */}
                        <Link className="btn btn-sm btn-success mr-2 command-edit" to={`/products-edit/${item.Id}`}><i className="fa fa-pencil"></i></Link>
                        <button className="btn btn-sm btn-danger mr-2 command-edit" onClick={() => this.onDeleteProduct(item.Id)}><em className="fa fa-trash fa-fw"></em></button>

                    </td>
                </tr>
                <FormDelete id={item.Id} onDelete={this.onDelete} isOpenModal={this.state.isOpenModalRemove} Status={-1} toggleModal={this.toggleModalRemove} />


            </React.Fragment >);
    }
}

export default Product;
