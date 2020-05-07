import React, { Component } from 'react';
import ContentWrapper from '../../components/Layout/ContentWrapper';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Table
} from 'reactstrap';
import { Link } from 'react-router-dom';

import LightBox from "./LightBox";


class EventPage extends Component {

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

    showShortNews = (news, Logo, Title) => {
        var result = ''
        if (news && news.length > 0) {
            result = news.map((item, index) => {

                var photos = item.Images
                var Photos = []
                var length = 0
                var more = false
                var images = []

                if (photos.length >= 1) {
                    length = 1
                    more = true
                } else {
                    length = photos.length
                    more = false
                }
                for (let i = 0; i < photos.length; i++) {
                    const element = photos[i].Photos.Large;
                    images.push(element)
                }

                for (let index = 0; index < length; index++) {

                    let photo_ = {}
                    photo_.src = photos[index].Photos.Medium
                    photo_.width = 1
                    photo_.height = 1
                    Photos.push(photo_)
                    Photos.splice(index, 0);
                } if (more) Photos.push({ src: `https://placehold.it/400x400/ffffff/00000&text=%2B more ${(photos.length - length)} pics`, height: 4, width: 3 })

                return (

                    <div key={index} className="card b">
                        <div className="card-header">

                            <div className="media">
                                <img className="mr-2 img-thumbnail rounded-circle thumb32" src={Logo} alt="Logo" />
                                <div className="media-body">
                                    <h5 className="m-0 text-bold">{Title}</h5>
                                    <div className="text-sm text-muted">{item.CreatedAt}</div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">


                            <LightBox Photos={Photos} images={images} imageTitle={Title} imageCaption={item.Contents} />


                        </div>
                    </div>


                );
            });
        }
        return result;
    }

    showHostTeam = (item) => {
        if (item) {
            return (

                <Card className="b">
                    <CardHeader>
                        <div className="float-right">
                            <div className="badge badge-info">Host Team</div>
                        </div>
                        <h4 className="m-0">Host Team</h4>
                        <small className="text-muted">...</small>
                    </CardHeader>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <Link to={`../../team/${item.Id}`}>
                                    <div className="col-4 text-center">
                                        <img className="circle thumb96" src={item.Logo} alt="Logo" />
                                    </div>
                                </Link>
                                <div className="col-8">
                                    <Link to={`../../team/${item.Id}`}>
                                        <h3 className="mt-0">{item.Name}</h3>
                                    </Link>
                                    <ul className="list-unstyled mb-0">
                                        <li className="mb-1">
                                            <em className="fa fa-map-marker fa-fw"></em>Code: {item.Code}
                                        </li>
                                        <li className="mb-1">
                                            <em className="fa fa-tag fa-fw"></em>Tags: {this.showHashTag(item.HashTag)}
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>

                </Card>
            )
        }
    }

    render() {
        var { event } = this.props

        var Logo = ''
        if (event && event.Posters && event.Posters.Small) {
            Logo = event.Posters.Small
        }
        var { Title, Id, TimeStart, TimeFinish, Address, CountLike, Country, EventNews, HostInfo, HostTeam, HashTag } = event
        if (HostInfo) {
            var eName, ePhone, eEmail = ''
            eName = HostInfo.Name
            ePhone = HostInfo.Phone
            eEmail = HostInfo.Email
        }
        console.log('HostInfo', HostInfo)
        return (
            <ContentWrapper>
                <Row>
                    <Col lg="4">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-5 text-center">
                                        <img className="circle thumb96" src={Logo} alt="Logo" />
                                    </div>
                                    <div className="col-7">
                                        <h3 className="mt-0">{Title}</h3>
                                        <ul className="list-unstyled mb-0">
                                            <li className="mb-1">
                                                <em className="fa fa-map-marker fa-fw"></em>ID: {Id}</li>
                                            <li className="mb-1">
                                                <em className="fa fa-tag fa-fw"></em>{this.showHashTag(HashTag)}</li>
                                            <li className="mb-1">
                                                <em className="fa fa-clock-o fa-fw"></em>{TimeStart + ' - ' + TimeFinish}</li>
                                            <li className="mb-1">
                                                <em className="icon-location-pin"></em> {Address} - {Country}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body bg-inverse">
                                <div className="row text-center">
                                    <div className="col-6">
                                        <p className="m-0 h3">{CountLike}</p>
                                        <p className="m-0 text-muted">Likes</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="m-0 h3">{1}</p>
                                        <p className="m-0 text-muted">News</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Card className="b">
                            <CardHeader>
                                <div className="float-right">
                                    <div className="badge badge-info">E. Host info</div>
                                </div>
                                <h4 className="m-0">E. Host info</h4>
                                <small className="text-muted">...</small>
                            </CardHeader>

                            <Table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>Name</strong>
                                        </td>
                                        <td className='word-break'>{eName}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Phone</strong>
                                        </td>
                                        <td className='word-break'>{ePhone}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Email</strong>
                                        </td>
                                        <td className='word-break'>{eEmail}</td>
                                    </tr>
                                </tbody>
                            </Table>

                        </Card>

                        {this.showHostTeam(HostTeam)}

                    </Col>
                    <Col>
                        <Card className="b">
                            <CardHeader>

                                <h4 className="m-0">Event News</h4>



                            </CardHeader>
                            <CardBody>
                                {this.showShortNews(EventNews, Logo, Title)}
                            </CardBody>
                        </Card>

                    </Col>

                </Row>
            </ContentWrapper>
        );
    }
}

export default EventPage;