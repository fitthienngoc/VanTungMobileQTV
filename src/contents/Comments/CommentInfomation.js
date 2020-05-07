import React, { Component } from 'react';
import {

    Row,
    Col,

    Card,

    CardBody,
    CardHeader,

} from 'reactstrap';

import ContentWrapper from '../../components/Layout/ContentWrapper';
import { Link } from 'react-router-dom';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: '',
            CommentId: '',
            Email: '',
            Name: '',
            Gender: '',
            Avatar: '',
            Birthday: '',
            AboutMe: '',
            Language: '',
            error: '',
            AreaId: '',
            Status: '', Password: '',
            BlockStatus: "",
            DeleteStatus: "", LastVisitTime: "", Point: "", SNS: "", SignUpTime: '', TotalPurchaseAmount: "",
            commentFollowing: [], Phone: ''

        };

    }

    componentWillMount() {



    }

    showStatus = (status) => {
        if (status == 1) {
            return <React.Fragment> <span className="text text-success">FINISH</span></React.Fragment>
        }
        else if (status == 2) {
            return <React.Fragment> <span className="text text-danger">PENDING</span></React.Fragment>
        } else if (status == -1) {
            return <React.Fragment> <span className="text text-default">CANCEL</span></React.Fragment>
        } else if (status == -2) {
            return <React.Fragment> <span className="text text-primary">REFUND</span></React.Fragment>
        }
        else if (status == 0) {
            return <React.Fragment> <span className="text text-warning">LOCK</span></React.Fragment>
        }
    }

    showListTicket = () => {
        var { commentTicket } = this.props.comment
        var result = <p>Chưa tham gia team</p>
        if (commentTicket && commentTicket.length > 0) {
            result = commentTicket.map((item, index) => {
                return (
                    <div key={index} className="card card-default">
                        <Link to={`/Payment/${item.paymentDetail.PaymentId}`}>
                            <div className="clearfix">
                                <p className="float-left">Type</p>
                                <p className="float-right mr-2" style={{ textTransform: 'uppercase' }}><span className="text text-success">{item.Ticket.Type}</span></p>
                            </div>

                            <div className="clearfix">
                                <p className="float-left">Code</p>
                                <p className="float-right mr-2" style={{ textTransform: 'uppercase' }}>{item.Code}</p>
                            </div>
                            <div className="clearfix">
                                <p className="float-left">Status</p>
                                <p className="float-right mr-2">{this.showStatus(item.Status)}</p>
                            </div>
                            
                            {item.UseDate ? <div className="clearfix">
                                <p className="float-left">Use Date</p>
                                <p className="float-right mr-2">{item.UseDate}</p>
                            </div>
                            :null}
                            
                        </Link>
                    </div>

                );
            });
        }
        return result;
    }
    showListFollowing = () => {
        var { commentFollowing } = this.props.comment
        var result = <p>Chưa tham gia team</p>
        if (commentFollowing.length > 0) {
            result = commentFollowing.map((item, index) => {
                return (
                    <div key={index + 's'}>
                        <div className="media align-items-center">
                            {item.Logo ? <a className="mr-2" href="#"> <img className="rounded-circle img-thumbnail thumb48" src={item.Logo} alt="Contact" /></a> : ''}
                            <div className="media-body pt-1">
                                <div className="float-right">
                                    <button className="btn btn-secondary btn-sm" type="button">View</button>
                                </div>
                                <div className="text-bold">{item.Name}
                                    <div className="text-sm text-muted">{item.Member} members</div>
                                </div>
                            </div>
                        </div>
                    </div>

                );
            });
        }
        return result;

    }

    showListJoining = () => {

        var { commentJoining } = this.props.comment
        var result = <p>Chưa tham gia team</p>
        if (commentJoining.length > 0) {
            result = commentJoining.map((item, index) => {
                return (
                    <div key={index + 's'}>
                        <div className="media align-items-center">
                            {item.Logo ? <a className="mr-2" href="#"> <img className="rounded-circle img-thumbnail thumb48" src={item.Logo} alt="Contact" /></a> : ''}
                            <div className="media-body pt-1">
                                <div className="float-right">
                                    <button className="btn btn-secondary btn-sm" type="button">View</button>
                                </div>
                                <div className="text-bold">{item.Name}
                                    <div className="text-sm text-muted">{item.Member} members</div>
                                </div>
                            </div>
                        </div>
                    </div>

                );
            });
        }
        return result;

    }


    render() {
        var { Id,
            CommentId,
            Email,
            Name,
            Gender,
            Avatar,
            Birthday,
            AboutMe,
            Language,
            error, AreaId, Status, Password,
            BlockStatus,
            DeleteStatus, LastVisitTime, Point, SNS, SignUpTime, TotalPurchaseAmount,
            commentFollowing,
            Phone
        } = this.props.comment;
        var { error_srv, isFetching } = this.props;

        return (

            <ContentWrapper unwrap>
                <div className="bg-cover" style={{ backgroundImage: 'url(/img/profile-bg.jpg)' }}>
                    <div className="p-4 text-center text-white">
                        <img className="img-thumbnail rounded-circle thumb128" src={Avatar} alt="Avatar" />
                        <h3 className="m-0">{Name}</h3>
                        <p>{Email}</p>
                        <p>{AboutMe}</p>
                    </div>
                </div>
                <div className="text-center bg-gray-dark p-3 mb-4">
                    <Row>
                        <Col xs="4" className="br">
                            <h3 className="m-0">400</h3>
                            <p className="m-0">
                                <span className="d-none d-md-inline">Profile</span>
                                <span>Views</span>
                            </p>
                        </Col>
                        <Col xs="4" className="br">
                            <h3 className="m-0">2000</h3>
                            <p className="m-0">Likes</p>
                        </Col>
                        <Col xs="4">
                            <h3 className="m-0">100</h3>
                            <p className="m-0">Following</p>
                        </Col>
                    </Row>
                </div>
                <ContentWrapper>
                    <Row>
                        <Col lg="3">
                            <Card color="dark" className="text-white mb-3">
                                <CardHeader>List Following</CardHeader>
                                <CardBody>

                                    {this.showListFollowing()}

                                </CardBody>
                            </Card>

                        </Col>
                        <Col lg='3'>
                            <Card color="dark" className="text-white mb-3">
                                <CardHeader>List Joining</CardHeader>
                                <CardBody>

                                    {this.showListJoining()}

                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg='3'>
                            <Card color="dark" className="text-white mb-3">
                                <CardHeader>List Ticket</CardHeader>
                                <CardBody>

                                    {this.showListTicket()}

                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="3">
                            <Card color="dark" className="text-white mb-3">
                                <CardHeader className="text-center">{Name}</CardHeader>
                                <CardBody>

                                    <ul className="list-unstyled px-4">

                                        <li> <em className="icon-diamond fa-fw  mr-3"></em>{Id}</li>
                                        <li> <em className="fa fa-italic fa-fw mr-3"></em>{CommentId}</li>
                                        <li> <em className="fa fa-comment fa-fw mr-3"></em>{Gender == 0 ? 'Nữ' : 'Nam'}</li>
                                        <li> <em className="fa fa-sign-in fa-fw mr-3"></em>{SignUpTime}</li>
                                        <li> <em className="icon-clock fa-fw mr-3"></em>{LastVisitTime}</li>
                                        <li> <em className="icon-envelope-letter fa-fw mr-3"></em>{Email}</li>
                                        <li> <em className="fa fa-phone fa-fw mr-3"></em>{Phone}</li>
                                        <li> <em className="fa icon-globe fa-fw mr-3"></em>{SNS}</li>
                                        <li> <em className="fa icon-star fa-fw mr-3"></em>{Point}</li>


                                    </ul>

                                </CardBody>
                            </Card>

                        </Col>

                    </Row>
                </ContentWrapper>


            </ContentWrapper>
        );
    }
}

export default Form;