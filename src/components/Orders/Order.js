import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonToolbar, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Datatable from './Datatable';
import FormDelete from './FormDelete'
import moneyFormat from '../../helpers/formatPrice';
import ProductNormal from '../../contents/Products/ProductNormal';
class Order extends Component {

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


    toggleModalRemove = () => {
        this.setState({
            isOpenModalRemove: !this.state.isOpenModalRemove
        })
    }

    showStatus = (item) => {
        var r = ''
        if (item.status == 0) { r = <DropdownItem onClick={this.toggleModalFinish} className="text text-success">Chờ Xử Lý</DropdownItem> }
        if (item.status == 1) { r = <DropdownItem onClick={this.toggleModalPending} className="text text-danger">Đang Vận Chuyển</DropdownItem> }
        if (item.status == 2) { r = <DropdownItem onClick={this.toggleModalCancel} className="text text-default">Hủy</DropdownItem> }
        if (item.status == 3) { r = <DropdownItem onClick={this.toggleModalLock} className="text text-warning">Hoàn Thành</DropdownItem> }
        return r
    }
    setStatus = (Id, status) => {
        this.props.onUpdateOrder(Id, status)
    }



    render() {
        var { item, index } = this.props;
        // console.log(item)
        return (
            <React.Fragment>
                <tr>
                    <td>{index + 1}</td>
                    <td>

                        
                            <div className="clearfix">
                                <p className="float-left">Hình thức thanh toán</p>
                                <p className="float-right mr-2" style={{ textTransform: 'uppercase' }}>{item.orderOnline == 1 ? <span className="text text-success">Online</span> : <span className="text text-danger">Vận Chuyển</span>}</p>
                            </div>

                            <div className="clearfix">
                                <p className="float-left">Mã hóa đơn</p>
                                <p className="float-right mr-2" style={{ textTransform: 'uppercase' }}>{item.Id}</p>
                            </div>
                            <div className="clearfix">
                                <p className="float-left">Thời gian</p>
                                <p className="float-right mr-2">{item.dataBill.time}</p>
                            </div>

                            <div className="clearfix">
                                <p className="float-left">Giá</p>
                                <p className="float-right mr-2">{moneyFormat(item.dataBill.totalNotSale)}</p>
                            </div>

                            <div className="clearfix">
                                <p className="float-left">Sale</p>
                                <p className="float-right mr-2">{moneyFormat(item.dataBill.totalNotSale - item.dataBill.total)}</p>
                            </div>

                            <div className="clearfix">
                                <p className="float-left">Thành tiền</p>
                                <p className="float-right mr-2">{moneyFormat(item.dataBill.total)}</p>
                            </div>
                            <div className="clearfix">
                                <p className="float-left"></p>
                                <p className="float-left"></p>
                            </div>
                            <div className="clearfix">
                                <p className="float-left">Khách hàng</p>
                                <p className="float-right mr-2">{item.dataBill.fullName}</p>
                            </div>
                            <div className="clearfix">
                                <p className="float-left">Số điện thoại</p>
                                <p className="float-right mr-2">{item.dataBill.phone}</p>
                            </div>
                            <div className="clearfix">
                                <p className="float-left">Địa chỉ</p>
                                <p className="float-right mr-2">{item.dataBill.address}</p>
                            </div>
                            <div className="clearfix">
                                <p className="float-left">Ghi chú</p>
                                <p className="float-right mr-2">{item.dataBill.note_order}</p>
                            </div>

                        


                    </td>
                    <td>
                        {item.dataBill.dataProduct && item.dataBill.dataProduct.length && item.dataBill.dataProduct.map((e, i) => {

                            return <ProductNormal key={i} data={e.detailProduct.dataProduct} bill={e} ></ProductNormal>
                        })


                        }
                    </td>
                    <td>
                        <div className="clearfix">

                            <span className="float-center mr-2" style={{ textTransform: 'uppercase' }}>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle>
                                        {this.showStatus(item)}
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu animated fadeIn">
                                        {item.status !== 0 ? <DropdownItem onClick={() => this.setStatus(item.Id,0)} className="text text-success">Chờ Xử Lý</DropdownItem> : null}
                                        {item.status !== 1 ? <DropdownItem onClick={() => this.setStatus(item.Id,1)} className="text text-danger">Đang Vận Chuyển</DropdownItem> : null}
                                        {item.status !== 2 ? <DropdownItem onClick={() => this.setStatus(item.Id,2)} className="text text-default">Hủy</DropdownItem> : null}
                                        {item.status !== 3 ? <DropdownItem onClick={() => this.setStatus(item.Id,3)} className="text text-warning">Hoàn Thành</DropdownItem> : null}
                                    </DropdownMenu>
                                </Dropdown>
                            </span>
                        </div>
                    </td>
                    <td>
                        {/* <Link className="btn btn-sm btn-info mr-2 command-edit" to={`/order/${item.Id}`}><i className="fa fa-eye"></i></Link> */}
                        {/* <Link className="btn btn-sm btn-success mr-2 command-edit" to={`/orders/${item.Id}/edit`}><i className="fa fa-pencil"></i></Link> */}
                        <button className="btn btn-sm btn-danger mr-2 command-edit" onClick={() => this.toggleModalRemove()}><em className="fa fa-trash fa-fw"></em></button>

                    </td>
                </tr>
                <FormDelete id={item.Id} onDelete={this.props.onDeleteOrder} isOpenModal={this.state.isOpenModalRemove} toggleModal={this.toggleModalRemove} />


            </React.Fragment >);
    }
}

export default Order;
