import React, { Component } from 'react';
import ContentWrapper from '../../components/Layout/ContentWrapper';
import { Card, CardHeader, CardBody, Row, Col, Alert, Table, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
class EcommerceOrderView extends Component {
    state = {
        tickets: {
            Code: "E7RY812R",
            Id: 1,
            Status: "0",
            Ticket: {
                "Id": 1,
                "Name": "1",
                "Price": 1,
                "Unit": "vnd",
                "Type": "e-ticket",
                "Quantity": 1,
                "LimitQuantity": 1,
                "TotalQuantity": 1,
                "Status": "1",
                "Description": "",
                "TimeStart": "2019-11-21 14:04",
                "TimeEnd": "2020-04-30 14:03",
                "Option": [
                    "",
                    ""
                ],
                "CreatedAt": "22-11-2019 14:01",
                "EventId": "1",
                "Question1": "",
                "Question2": "",
                "QuantityTicketBought": 1,
                "QuantityTicketUnsold": 11111110
            },
            UseDate: "",
            Payment: {
                User: [{
                    Name: '',
                    Id: 0
                }],
                EventName: ''
            }
        }
    }

    componentDidMount() {
        var { tickets } = this.props
        if (tickets) {
            this.setState({
                tickets
            })
        }
    }

    showStatus(status) {
        if (status == 1) {
            return <React.Fragment> <span className=" badge badge-success">USED</span></React.Fragment>
        }
        else if (status == -1) {
            return <React.Fragment> <span className="badge badge-danger">REFUNDED</span></React.Fragment>
        } else if (status == 0) {
            return <React.Fragment> <span className="badge badge-inverse">REFUND REQUEST</span></React.Fragment>
        } else if (status == 2) {
            return <React.Fragment> <span className="badge badge-primary">CANCELED</span></React.Fragment>
        }
        else if (status == 3) {
            return <React.Fragment> <span className="badge badge-warning">REFUSE</span></React.Fragment>
        }
        else if (status == -3) {
            return <React.Fragment> <span className="badge badge-info">CANCELED EVENT</span></React.Fragment>
        }
    }

    showStatusOrder = (status) => {
        if (status == 1) {
            return <React.Fragment> <span className="badge badge-success">FINISH</span></React.Fragment>
        }
        else if (status == 2) {
            return <React.Fragment> <span className="badge badge-danger">PENDING</span></React.Fragment>
        } else if (status == -1) {
            return <React.Fragment> <span className="badge badge-inverse">CANCEL</span></React.Fragment>
        } else if (status == -2) {
            return <React.Fragment> <span className="badge badge-primary">REFUND</span></React.Fragment>
        }
        else if (status == 0) {
            return <React.Fragment> <span className="badge badge-warning">LOCK</span></React.Fragment>
        }
    }
    render() {

        var { tickets } = this.state
        console.log(tickets)
        return (
            <ContentWrapper>
                <div className="content-heading">Ticket #{tickets.Code}</div>
                <Card>

                    <CardBody>
                        <Row>
                            <Col lg="6">
                                <p className="lead bb">Detail {tickets.Ticket.Type.toUpperCase()}</p>
                                <form className="form-horizontal">
                                    <FormGroup row>
                                        <Col className="text text-right" md="4">Code:</Col>
                                        <Col md="8">
                                            <strong>{tickets.Code}</strong>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col className="text text-right" md="4">Status:</Col>
                                        <Col md="8">
                                            <strong>{this.showStatus(tickets.Status)}</strong>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col className="text text-right" md="4">Customer:</Col>
                                        <Col md="8">
                                            <strong>{tickets.Payment.User[0].Name}</strong>
                                        </Col>
                                    </FormGroup>

                                </form>
                            </Col>
                            <Col lg="6">
                                <p className="lead bb">Order</p>
                                <form className="form-horizontal">
                                    <FormGroup row>
                                       <Col className="text text-right" md="4">Transaction Code:</Col>
                                        <Col md="8">
                                        <Link to={`/payment/${tickets.Payment.Id}`}><strong>{tickets.Payment.TransactionCode}</strong></Link>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                       <Col className="text text-right" md="4">Status</Col>
                                        <Col md="8">
                                        {this.showStatusOrder(tickets.Payment.Status)}
                                        </Col>
                                    </FormGroup>
                                </form>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                <Card>

                    <CardBody>
                        <Row>
                            <Col lg="6">
                                <p className="lead bb">Tiket</p>
                                <form className="form-horizontal">
                                    <FormGroup row>
                                       <Col className="text text-right" md="4">Name:</Col>
                                        <Col md="8">
                                            <strong>{tickets.Ticket.Name}</strong>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                       <Col className="text text-right" md="4">Type:</Col>
                                        <Col md="8">
                                            <strong>{tickets.Ticket.Type.toUpperCase()}</strong>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                       <Col className="text text-right" md="4">Price:</Col>
                                        <Col md="8">
                                            <strong>{tickets.Ticket.Price}</strong>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                       <Col className="text text-right" md="4">From ~ to:</Col>
                                        <Col md="8">
                                            <strong>{tickets.Ticket.TimeStart} ~ {tickets.Ticket.TimeEnd}</strong>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                       <Col className="text text-right" md="4">Order Max Quantity:</Col>
                                        <Col md="8">
                                            <strong>{tickets.Ticket.LimitQuantity}</strong>
                                        </Col>
                                    </FormGroup>


                                </form>
                            </Col>
                            <Col lg="6">
                                <p className="lead bb">Event</p>
                                <form className="form-horizontal">
                                    <FormGroup row>
                                       <Col className="text text-right" md="4">Title:</Col>
                                        <Col md="8">
                                            <Link to={`/event/${tickets.Payment.EventId}/view`}><strong>{tickets.Payment.EventName}</strong></Link>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                       <Col className="text text-right" md="4">Address:</Col>
                                        <Col md="8">
                                            <strong>{tickets.Payment.Address}</strong>
                                        </Col>
                                    </FormGroup>
                                </form>

                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                </ContentWrapper>
        );
    }

}

export default EcommerceOrderView;
