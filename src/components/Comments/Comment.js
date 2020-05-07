import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Datatable from './Datatable';
import FormDelete from './FormDelete'
import { URL_WEB } from '../../constants/Config';
import cleanUrl from '../../helpers/cleanURL';
class Comment extends Component {

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

    showVerify = (item) => {

        if (item.verify == "1") {
            return <React.Fragment> <span className="text text-default">Hiển Thị</span></React.Fragment>
        }
        else {
            return <React.Fragment> <span className="text text-danger">Ẩn</span></React.Fragment>
        }

    }
    setVerify = (Id, verify) => {
        this.props.onUpdateComment(Id, verify)
    }

    showStar = (rating) => {
        var r = []
        for (let index = 1; index < 6; index++) {
            r.push(<i key={index} onClick={() => this.setState({
                rating: index
            })} className={rating < index ? "fa fa-star-o" : "fa fa-star"} />)

        }
        return r
    }

    render() {
        var { item, index } = this.props;
        console.log(item)
        return (
            <React.Fragment>
                <tr>
                    <td>{index + 1}</td>
                    <td>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-1"><em className="fa fa-user  fa-fw"></em> {item.fullName}</li>
                            <li className="mb-1"><em className="fa fa-comment fa-fw"></em> {item.content}</li>
                            <li className="mb-1"><em className="fa fa-mobile fa-fw"></em><a target="_blank" href={`${URL_WEB}/chi-tiet/comment/${item.id_product}`} >Sản Phẩm</a> </li>
                            <li className="mb-1"><em className="fa fa-point fa-fw"></em> {this.showStar(item.rating)}</li>

                        </ul>

                    </td>
                    <td>
                        <Dropdown isOpen={this.state.dropdownOpen1} toggle={this.toggle1}>
                            <DropdownToggle>
                                {this.showVerify(item)}
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu animated fadeIn">
                                {item.verify !== '1' ? <DropdownItem onClick={() => this.setVerify(item.Id, '1')} className="text text default" >Hiển thị</DropdownItem> : null}
                                {item.verify != '0' ? <DropdownItem onClick={() => this.setVerify(item.Id, '0')} className="text text-danger" >Ẩn</DropdownItem> : null}


                            </DropdownMenu>
                        </Dropdown>
                    </td>
                    <td>
                        <Link className="btn btn-sm btn-info mr-2 command-edit" to={`/comments-edit/${item.id_product}/${item.Id}`}><i className="fa fa-eye"></i></Link>
                        {/* <Link className="btn btn-sm btn-success mr-2 command-edit" to={`/comments/${item.Id}/edit`}><i className="fa fa-pencil"></i></Link> */}
                        <button className="btn btn-sm btn-danger mr-2 command-edit" onClick={() => this.toggleModalRemove()}><em className="fa fa-trash fa-fw"></em></button>

                    </td>
                </tr>
                <FormDelete id={item.Id} onDelete={this.props.onDeleteComment} isOpenModal={this.state.isOpenModalRemove} toggleModal={this.toggleModalRemove} />


            </React.Fragment >);
    }
}

export default Comment;
