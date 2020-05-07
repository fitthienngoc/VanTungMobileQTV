import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Container,
    Row,
    Col,
    Collapse,
    Card,
    CardDeck,
    CardBody,
    CardHeader,
    CardFooter,
    CardTitle,
    CardText,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Jumbotron
} from 'reactstrap';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import ContentWrapper from '../../components/Layout/ContentWrapper';
import ModalDetail from './ModalDetail'
import TeamNews from './TeamNews'
import { Link } from 'react-router-dom';
import { actLoadTeamNews, actClearTeamNews } from '../../actions/team';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: '',
            page: 1,
            Logo: '',
            Name: '',
            HashTag: [],

            Code: '',
            Phone: '',
            Email: '',
            MainField: '',
            AboutTeam: '',
            StarRating: '',
            WebsiteUrl: '',
            FollowerCount: 0,
            Slug: '',
            Zipcode: '',
            IsConfirmPhone: false,
            CreatedAt: '',
            CountryId: '',
            Member: 0,
            Event: Number,
            Venue: Number,
            Verified: false,
            ListMember:[]
        };

    }

    componentDidMount() {
        let team = this.props.teams.itemEditing;
        console.log(team)
        var { Logo, Name, HashTag, Id, Code, Phone, Email, MainField, AboutTeam, StarRating, WebsiteUrl, FollowerCount, Slug, Zipcode, IsConfirmPhone, CreatedAt, CountryId, Member, Event, Venue, Verified,ListMember } = team;
        this.setState
            ({
                ListMember,Logo, Name, HashTag, Id, Code, Phone, Email, MainField, AboutTeam, StarRating, WebsiteUrl, FollowerCount, Slug, Zipcode, IsConfirmPhone, CreatedAt, CountryId, Member, Event, Venue, Verified
            })


        if (team.Id) {
            this.props.onLoadDataTeamNews({ id: team.Id })
        }




    }


    showHashTag = (tags) => {
        
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
    showMembers = (ListMember) => {

        var result = '0 member...'
        if (ListMember && ListMember.length > 0) {
            result = ListMember.map((item, index) => {
                return (
                    <Link key={'sssss' + index} to={`/user/${item.Id}`} >
                        <div className="media">
                            <img className="align-self-center mr-2 rounded-circle img-thumbnail thumb48" src={item.Avatar} alt="Contact" />
                            <div className="media-body py-2">
                                <div className="word-break text-bold">{item.Name}
                                    <div className="text-sm text-muted">{item.UserId}</div>
                                </div>
                            </div>
                        </div>
                    </Link>


                );
            });
        }
        return result;

    }
    onLoadMore = () => {
        var team = this.props.teams.itemEditing;
        this.setState({
            page: this.state.page + 1
        })
        this.props.onLoadDataTeamNews({
            id: team.Id,
            page: this.state.page + 1
        })
        console.log(this.state.page);

    }
    render() {
        var team = this.props.teams.itemEditing;
        var { teams } = this.props
        var { ListMember,Logo, Name, HashTag, Id, Code, Phone, Email, MainField, AboutTeam, StarRating, WebsiteUrl, FollowerCount, Slug, Zipcode, IsConfirmPhone, CreatedAt, CountryId, Member, Event, Venue, Verified } = this.state
        return (

            <ContentWrapper>
                <Row>
                    <Col lg="3">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6 text-center">
                                        <img className="circle thumb96" src={Logo} alt="Logo" />
                                    </div>
                                    <div className="col-6">
                                        <h3 className="mt-0">{Name}</h3>
                                        <ul className="list-unstyled mb-0">
                                            <li className="mb-1">
                                                <em className="fa fa-map-marker fa-fw"></em>ID: {Code}</li>
                                            <li className="mb-1">
                                                <em className="fa fa-twitter fa-fw"></em>{this.showHashTag(HashTag)}</li>
                                            <li className="mb-1">
                                                <em className="fa fa-envelope fa-fw"></em>{Email}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body bg-inverse">
                                <div className="row text-center">
                                    <div className="col-6">
                                        <p className="m-0 h3">{FollowerCount}</p>
                                        <p className="m-0 text-muted">Following</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="m-0 h3">{Member}</p>
                                        <p className="m-0 text-muted">Members</p>
                                    </div>
                                </div>
                            </div>

                            <CardBody className=" text-center" >
                                {AboutTeam ? <React.Fragment><div className="defail-team" dangerouslySetInnerHTML={{ __html: AboutTeam.slice(0, 600) + '..' }}></div><ModalDetail AboutTeam={AboutTeam} /></React.Fragment> : "...."}

                            </CardBody>
                        </div>

                        <div className="card d-none d-lg-block">
                            <div className="card-header">
                                <div className="card-title text-center">List Member</div>
                            </div>
                            <div className="card-body">
                                {this.showMembers(ListMember)}
                            </div>
                        </div>


                    </Col>
                    <Col lg="5">
                        <div className="card">
                            <div className="card-header">News</div>
                            <div className="card-body">
                                <TeamNews onLoadMore={this.onLoadMore} teams={teams} teamNews={this.props.teams.teamNews} />
                            </div>
                        </div>

                    </Col>

                </Row>

            </ContentWrapper>

        );
    }
}

const mapStatetoProps = state => {
    return {
        teams: state.teams,

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoadDataTeamNews: (data) => {
            dispatch(actLoadTeamNews(data));
        },
        onClear: () => {
            dispatch(actClearTeamNews());
        },
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Form);