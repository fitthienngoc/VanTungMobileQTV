import React, { Component } from 'react';
import { translate, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CardHeader, TabContent, TabPane, Nav, NavItem, NavLink, CardBody, Card } from 'reactstrap';
import Now from '../Common/Now';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { actLoadDataDashboard, actLoadDataDashboardChartEvents } from '../../actions/dashboard';
import MorrisChart from './../Charts/Morris';
import FlotChart from './../Charts/Flot';



class SingleView extends Component {

    state = {

        dropdownOpen: false,
        activeTab: 'order',
        activeTab2: 'events',
        payments: [],
        users: [],
        events: [],
        teams: [],
        refundRequest: [],
        reports: [],
        cancelEvents: [],

        dataChartEvents: {
            events: {
                finishedEvents: 146,
                nowEvents: 21,
                commingSoonEvents: 14,
                cancelEvents: 77
            }
        },

        donutdata: [
            { label: "finishedEvents", value: 12 },
            { label: "nowEvents", value: 30 },
            { label: "commingSoonEvents", value: 20 },
            { label: "cancelEvents", value: 20 }
        ],
        donutOptions: {
            element: 'morris-donut',
            colors: ['#f05050', '#fad732', '#ff902b', '#79ceff'],
            resize: true
        },

        chartPie: {

            data: [{
                "label": "finishedEvents",
                "color": "#4acab4",
                "data": 30
            }, {
                "label": "nowEvents",
                "color": "#ffea88",
                "data": 40
            }, {
                "label": "commingSoonEvents",
                "color": "#ff8153",
                "data": 90
            }, {
                "label": "cancelEvents",
                "color": "#878bb6",
                "data": 75
            }],

            options: {
                series: {
                    pie: {
                        show: true,
                        innerRadius: 0,
                        label: {
                            show: true,
                            radius: 0.8,
                            formatter: function (label, series) {
                                return '<div class="flot-pie-label">' +
                                    //label + ' : ' +
                                    Math.round(series.percent) +
                                    '%</div>';
                            },
                            background: {
                                opacity: 0.8,
                                color: '#FFFF'
                            }
                        }
                    }
                }
            }

        },

        chartdataLine: [
            { h: "0:00", a: 4, b: 12 },
            { h: "1:00", a: 21, b: 88 },
            { h: "2:00", a: 32, b: 77 },
            { h: "3:00", a: 23, b: 90 },
            { h: "4:00", a: 200, b: 102 },
            { h: "5:00", a: 100, b: 90 },
            { h: "6:00", a: 34, b: 57 },
            { h: "7:00", a: 13, b: 60 },
            { h: "8:00", a: 12, b: 70 },
            { h: "9:00", a: 40, b: 59 },
            { h: "10:00", a: 31, b: 40 },
            { h: "11:00", a: 55, b: 32 },
            { h: "12:00", a: 23, b: 1 },

        ],// Line Chart
        lineOptions: {
            element: 'morris-line',
            xkey: 'h',
            ykeys: ["a", "b"],
            labels: ["Sale", "Refund"],
            lineColors: ["#31C0BE", "#7a92a3"],
            resize: true
        }

    }
    componentDidMount() {
        // this.props.onLoadData()
        // this.props.onLoadDataChartEvents()

    }

    changeLanguage = lng => {
        this.props.i18n.changeLanguage(lng);
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    componentWillReceiveProps(nextprops) {
        if (this.props !== nextprops) {
            if (nextprops.dashboard && nextprops.dashboard.data) {
                let { payments, users, events, teams, refundRequest, reports, cancelEvents } = nextprops.dashboard.data

                this.setState({
                    payments, users, events, teams, refundRequest, reports, cancelEvents,
                })
            }


            if (nextprops.dashboard && nextprops.dashboard.dataChartEvents) {
                let events_ = nextprops.dashboard.dataChartEvents.events

                if (events_) {
                    let donutdata = [
                        { label: "Finished Events", value: events_.finishedEvents },
                        { label: "Now Events", value: events_.nowEvents },
                        { label: "Comming Soon Events", value: events_.commingSoonEvents },
                        { label: "Canceled Events", value: events_.cancelEvents }
                    ]
                    let dataPie = this.state.chartPie
                    dataPie.data = [{
                        "label": "Finished Events",
                        "color": "#4acab4",
                        "data": events_.finishedEvents
                    }, {
                        "label": "Now Events",
                        "color": "#ffea88",
                        "data": events_.nowEvents
                    }, {
                        "label": "Comming Soon Events",
                        "color": "#ff8153",
                        "data": events_.commingSoonEvents
                    }, {
                        "label": "Canceled Events",
                        "color": "#878bb6",
                        "data": events_.cancelEvents
                    }]
                    this.setState({
                        donutdata,
                        chartPie: dataPie
                    })
                }


            }

        }
    }


    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    toggleTab2 = tab => {
        if (this.state.activeTab2 !== tab) {
            this.setState({
                activeTab2: tab
            });
        }
    }
    loadding = () => {

        return <div className="loader-demo d-flex align-items-center justify-content-center">
            <div className="ball-clip-rotate">
                <div style={{ borderBottomColor: '#5d9cec' }}></div>

            </div>
        </div>
    }

    showRecentTeam(list) {
        var r = null
        if (list && list.length) {
            r = list.map((item, index) => {
                return <div key={index} className="list-group mb0">
                    <div className="list-group-item bt0">
                        <span className="badge badge-purple float-right">{item.CreatedAt}</span>
                        <em className="fa-fw fas fa-calendar-alt mr-2"></em>{item.Name.substr(0, 50)}
                    </div>
                </div>
            });


        }
        return r
    }

    showRecentEvent(list) {
        var r = null
        if (list && list.length) {
            r = list.map((item, index) => {

                return <div key={index} className="list-group mb0">
                    <div className="list-group-item bt0">
                        <span className="badge badge-purple float-right">{item.CreatedAt}</span>
                        <em className="fa-fw fas fa-calendar-alt mr-2"></em><Link to={`/event/${item.Id}/view`}>{item.Title.substr(0, 50)}</Link>
                    </div>
                </div>


            });


        }
        return r
    }
    showRecentOder(list) {
        var r = null
        if (list && list.length) {
            r = list.map((item, index) => {
                return <tr key={index}>
                    <td><Link to={`/event/${item.EventId}/view`}>{item.EventName.substr(0, 50)}</Link></td>
                    <td>{item.FullName.substr(0, 50)}</td>
                    <td>{item.Quantity}</td>

                    <td><Link to={`/payment/${item.Id}`}>{item.CreatedAt}</Link></td>
                    <td><Link to={`/payment/${item.Id}`}>{item.TotalMoney}</Link></td>
                </tr>
            });


        }
        return r
    }
    showRecentSignUp(list) {
        var r = null
        if (list && list.length) {
            r = list.map((item, index) => {
                return <tr key={index}>
                    <td>
                        {item.Name}
                    </td>
                    <td>{item.Email}</td>
                    <td>{item.SignUpTime}</td>
                </tr>
            });


        }
        return r
    }
    showRecentSignIn(list) {
        var r = null
        if (list && list.length) {
            r = list.map((item, index) => {
                return <tr key={index}>
                    <td>
                        {item.Name.substr(0, 50)}
                    </td>
                    <td>{item.Email}</td>
                    <td>{item.LastVisitTime}</td>
                </tr>
            });


        }
        return r
    }


    showRecentReport(list) {
        var r = null
        if (list && list.length) {
            r = list.map((item, index) => {
                return <tr key={index}>
                    <td>
                        {item.TargetType}</td>
                    <td>
                        {item.Content.substr(0, 50)}
                    </td>
                    <td>{item.CreatedAt}</td>
                </tr>
            });


        }
        return r
    }
    showRecentCancelEvents(list) {
        var r = null
        if (list && list.length) {
            r = list.map((item, index) => {
                return <tr key={index}>
                    <td>
                        {item.Title.substr(0, 50)}
                    </td>
                    <td>{item.HostTeam.Name}</td>
                    <td>{item.CreatedAt}</td>
                </tr>
            });


        }
        return r
    }


    render() {
        console.log('this.props', this.state)
        var { loadding, loaddingChartEvents } = this.props.dashboard
        var { payments, users, events, teams, refundRequest, reports, cancelEvents, recent10Events } = this.state
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Dashboard
                        <small></small>
                    </div>
                    { /* START Language list */}
                    {/* <div className="ml-auto">
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle>
                                English
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-right-forced animated fadeInUpShort">
                                <DropdownItem onClick={() => this.changeLanguage('en')}>English</DropdownItem>
                                <DropdownItem onClick={() => this.changeLanguage('es')}>Spanish</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div> */}
                    { /* END Language list */}
                </div>
                { /* START cards box */}

                <Row>

                    <Col xl={3} md={6} md={12}>
                        { /* START card */}
                        <div className="card flex-row align-items-center align-items-stretch border-0">
                            <div className="col-4 d-flex align-items-center bg-purple-dark justify-content-center rounded-left">
                                <em className="fa fa-check-circle fa-3x"></em>
                            </div>
                            <div className="col-8 py-3 bg-purple rounded-right">
                                {loadding ? this.loadding() :

                                    <div className="h2 mt-0">
                                        {events && events.finishedEvents ? events.finishedEvents : ''}
                                    </div>
                                }
                                <div className="text-uppercase">Finished Event</div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} lg={6} md={12}>
                        { /* START card */}
                        <div className="card flex-row align-items-center align-items-stretch border-0">
                            <div className="col-4 d-flex align-items-center bg-green-dark justify-content-center rounded-left">
                                <em className="fa fa-exclamation-circle fa-3x"></em>
                            </div>
                            <div className="col-8 py-3 bg-green rounded-right">
                                {loadding ? this.loadding() :

                                    <div className="h2 mt-0">{events ? events.unFinishedEvents : ''}</div>
                                }

                                <div className="text-uppercase">Not Finished Event</div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <Card>
                            <CardHeader>Event</CardHeader>
                            <CardBody>
                                {loaddingChartEvents ? this.loadding() :
                                    <FlotChart options={this.state.chartPie.options} data={this.state.chartPie.data} className="flot-chart" height="250px" />
                                    // <MorrisChart type={'Donut'} id="morris-donut" data={this.state.donutdata} options={this.state.donutOptions} />
                                }
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={8}>
                        <Card>
                            <CardHeader>Sales Refund </CardHeader>

                            <CardBody>
                                <MorrisChart id="morris-line" type={'Line'} data={this.state.chartdataLine} options={this.state.lineOptions} />
                            </CardBody>
                        </Card>
                    </Col>

                </Row>
                { /* END cards box */}
                <Row>
                    <Col lg={6}>

                        <div className="card card-transparent">
                            <Nav tabs justified>
                                <NavItem>
                                    <NavLink className={this.state.activeTab2 === 'events' ? 'active' : ''}
                                        onClick={() => { this.toggleTab2('events'); }}
                                    >
                                        <em className="far fa-clock fa-fw"></em>Recent 10 registered Events
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className={this.state.activeTab2 === 'teams' ? 'active' : ''}
                                        onClick={() => { this.toggleTab2('teams'); }}
                                    >
                                        <em className="far fa-money-bill-alt fa-fw"></em>10 Registered Teams
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className={this.state.activeTab2 === 'cancelEvents' ? 'active' : ''}
                                        onClick={() => { this.toggleTab2('cancelEvents'); }}
                                    >
                                        <em className="far fa-money-bill-alt fa-fw"></em>10 Canceled Events
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab2} className="bg-white p-0">
                                <TabPane tabId="events">
                                    {/* START table responsive */}
                                    {loadding ? this.loadding() :
                                        events && events.recent10Events ? this.showRecentEvent(events.recent10Events) : null
                                    }
                                    {/* END table responsive */}
                                    {/* <div className="card-footer text-right">
                                        <Link className="btn btn-secondary btn-sm" to="/event">View All Events</Link>
                                    </div> */}
                                </TabPane>
                                <TabPane tabId="teams">
                                    {/* START table responsive */}
                                    {loadding ? this.loadding() :
                                        this.showRecentTeam(teams)


                                    }

                                    {/* END table responsive */}
                                    {/* <div className="card-footer text-right">
                                        <a className="btn btn-secondary btn-sm" href="">View All Transactions</a>
                                    </div> */}
                                </TabPane>
                                <TabPane tabId="cancelEvents">
                                    {/* START table responsive */}
                                    {loadding ? this.loadding() : <div className="table-responsive">
                                        <table className="table table-bordered table-hover table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Event</th>
                                                    <th>Host Team</th>
                                                    <th>Created At</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.showRecentCancelEvents(cancelEvents)}

                                            </tbody>
                                        </table>
                                    </div>
                                    }

                                    {/* END table responsive */}
                                    {/* <div className="card-footer text-right">
                                        <a className="btn btn-secondary btn-sm" href="">View All Transactions</a>
                                    </div> */}
                                </TabPane>
                            </TabContent>
                        </div>

                        { /* START panel tab */}

                        { /* END panel tab */}
                    </Col>

                    <Col lg={6}>
                        <div className="card card-transparent">
                            <Nav tabs justified>

                                <NavItem>
                                    <NavLink className={this.state.activeTab === 'order' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('order'); }}
                                    >
                                        <em className="far fa-money-bill-alt fa-fw"></em>10 Oders
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={this.state.activeTab === 'sign up' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('sign up'); }}
                                    >
                                        <em className="far fa-money-bill-alt fa-fw"></em>10 Sign up
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={this.state.activeTab === 'sign in' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('sign in'); }}
                                    >
                                        <em className="far fa-money-bill-alt fa-fw"></em>10 Sign in
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className={this.state.activeTab === 'reports' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('reports'); }}
                                    >
                                        <em className="far fa-money-bill-alt fa-fw"></em>10 Reports
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab} className="bg-white p-0">
                                <TabPane tabId="order">
                                    {/* START table responsive */}
                                    {loadding ? this.loadding() :
                                        <div className="table-responsive">
                                            <table className="table table-bordered table-hover table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Event</th>
                                                        <th>User</th>
                                                        <th>Quantity</th>
                                                        <th>Order Time</th>
                                                        <th>Amount (USD)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {payments ? this.showRecentOder(payments) : null}
                                                </tbody>
                                            </table>
                                        </div>
                                    }

                                    {/* END table responsive */}
                                    {/* <div className="card-footer text-right">
                                        <Link className="btn btn-secondary btn-sm" to="/payment">View All Oders</Link>
                                    </div> */}
                                </TabPane>
                                <TabPane tabId="sign up">
                                    {/* START table responsive */}
                                    {loadding ? this.loadding() : <div className="table-responsive">
                                        <table className="table table-bordered table-hover table-striped">
                                            <thead>
                                                <tr>
                                                    <th>User</th>
                                                    <th>Email</th>
                                                    <th>Sign Up Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users && users.signUpUsers ? this.showRecentSignUp(users.signUpUsers) : ''}

                                            </tbody>
                                        </table>
                                    </div>}

                                    {/* END table responsive */}
                                    {/* <div className="card-footer text-right">
                                        <a className="btn btn-secondary btn-sm" href="">View All Transactions</a>
                                    </div> */}
                                </TabPane>
                                <TabPane tabId="sign in">
                                    {/* START table responsive */}
                                    {loadding ? this.loadding() : <div className="table-responsive">
                                        <table className="table table-bordered table-hover table-striped">
                                            <thead>
                                                <tr>
                                                    <th>User</th>
                                                    <th>Email</th>
                                                    <th>Sign In Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users && this.showRecentSignIn(users.signInUsers)}

                                            </tbody>
                                        </table>
                                    </div>
                                    }

                                    {/* END table responsive */}
                                    {/* <div className="card-footer text-right">
                                        <a className="btn btn-secondary btn-sm" href="">View All Transactions</a>
                                    </div> */}
                                </TabPane>
                                <TabPane tabId="reports">
                                    {/* START table responsive */}
                                    {loadding ? this.loadding() : <div className="table-responsive">
                                        <table className="table table-bordered table-hover table-striped">
                                            <thead>
                                                <tr>
                                                    <th>TargetType</th>
                                                    <th>Content</th>
                                                    <th>CreatedAt</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.showRecentReport(reports)}

                                            </tbody>
                                        </table>
                                    </div>
                                    }

                                    {/* END table responsive */}
                                    {/* <div className="card-footer text-right">
                                        <a className="btn btn-secondary btn-sm" href="">View All Transactions</a>
                                    </div> */}
                                </TabPane>
                            </TabContent>
                        </div>
                    </Col>

                </Row>


            </ContentWrapper>
        );

    }

}

const mapStatetoProps = state => {
    return {
        dashboard: state.dashboard
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoadData: () => {
            dispatch(actLoadDataDashboard());
        },
        onLoadDataChartEvents: () => {
            dispatch(actLoadDataDashboardChartEvents());
        },
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(SingleView);
