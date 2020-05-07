import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContentWrapper from '../../components/Layout/ContentWrapper';
import FileBase64 from 'react-file-base64';
import {
    Input,
    Card,
    CardDeck,
    CardBody,
    CardHeader,
    CardFooter,
    CardTitle,
    CardText,
    TabContent, FormGroup,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Jumbotron

} from 'reactstrap';
import CropIMG from '../../components/CropIMG';
import TeamSuggest from '../../components/TeamSuggest';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: '',
            TargetType: '',
            TargetId: '',
            Title: '',
            Image: '',
            error: '',
            error: '',
            teams: [],
            valueTeam: '',
            valueEvent: '',
            valueVenue: '',
            suggestions: [],
            TargetType: '', team: {},
            Main:false,
            TypeEvent:false,
            TypeTeam:false,
            TypeVenue:false,
            venue:[],event:[]

        };
        this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)
    }

    onChangeTeam = (newValue) => {
        this.setState({
            valueTeam: newValue
        });
        if (this.props.match && this.props.match.params && this.props.match.params.typeTarget) {
            var { typeTarget } = this.props.match.params;
            this.setState({
                TargetType: typeTarget
            })
        }


        
            this.props.onSuggestionsFetchTeamRequested('teams', newValue)
        
    };
    onChangeEvent = (newValue) => {
        this.setState({
            valueEvent: newValue
        });
        if (this.props.match && this.props.match.params && this.props.match.params.typeTarget) {
            var { typeTarget } = this.props.match.params;
            this.setState({
                TargetType: typeTarget
            })
        }

            this.props.onSuggestionsFetchTeamRequested('events', newValue)
        
    };
    onChangeVenue = (newValue) => {
        this.setState({
            valueVenue: newValue
        });
        if (this.props.match && this.props.match.params && this.props.match.params.typeTarget) {
            var { typeTarget } = this.props.match.params;
            this.setState({
                TargetType: typeTarget
            })
        }
            this.props.onSuggestionsFetchTeamRequested('venues', newValue)
    };
   
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    onSuggestionSelected = (suggestion,TargetType) => {
        var { suggestionsTeam } = this.props.suggestionsTeam;

        
        var index = -1;
        index = this.findProduct(suggestionsTeam, suggestion);
        if (index !== -1 && TargetType == 'team') {
            this.setState({
                team: suggestion,
                TargetId: suggestion.Id
            })
        }
        if (index !== -1 && TargetType == 'venue') {
            this.setState({
                venue: suggestion,
                TargetId: suggestion.Id
            })
        }
        if (index !== -1 && TargetType == 'event') {
            this.setState({
                event: suggestion,
                TargetId: suggestion.Id
            })
        }

    }
    findProduct = (teams, suggestion) => {
        var index = -1;
        if (teams.length > 0) {
            for (var i = 0; i < teams.length; i++) {
                if (teams[i].Id === suggestion.Id) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    componentWillMount() {
        // console.log(this.props)

        var { Id,
            TargetType, Title, Image, error, TargetId
        } = this.props.banner;



        Id = Id ? Id : '';

        if (this.props.match && this.props.match.params) {
            var typeTarget = this.props.match.params.typeTarget;
            this.setState({
                TargetType: typeTarget
            })

        }

        Title ? Title = Title : Title = '';

        error ? error = error : error = '';

        // TargetId ? TargetId =TargetId : TargetId = '';
        TargetId = TargetId ? TargetId : '';
        if (TargetId) this.props.onGetTeam(TargetType, TargetId)

        Image ? Image = Image : Image = '';


        this.setState({
            Id,
            Title, Image, error, TargetId
        });



    }
    componentDidMount() {
        var { TargetType } = this.props.banner;
        if (TargetType) this.setState({ TargetType })
    }



    onChange(e) {
        var target = e.target;
        
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
        console.log('asas',this.state)
    }


    validate() {
        var { Id, TargetType, Title, Image, error, TargetId } = this.state;


        return true;
    }

    onSave(e) {


        this.setState({
            error: '',
        });
        e.preventDefault();
        var { Id,
            TargetType, Title, Image, TargetId } = this.state;


        if (!this.validate()) {
            return;
        }
        if (Image == this.props.banner.Image) {
            Image = ''
        }
        else {
            Image = this.props.Image
            // "20M"
        }

        var banner = {
            Id,
            TargetType, Title, TargetId,
            Image: Image
        };

        if (Id !== '') {
            this.props.onUpdateBanner(banner);
        } else {
            this.props.onAddBanner(banner);

        }


    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        if (nextProps.TeamLoaded != this.props.TeamLoaded) {
            this.setState({
                team: nextProps.TeamLoaded
            });
        }

    }
    showHashTag = (team) => {
        var tags = team.HashTag;
        var result = ''
        if (tags && tags.length > 0) {
            result = tags.map((team, index) => {
                return (

                    "#" + team.HashTagName + " "


                );
            });
        }
        return result;

    }
    showSelectedItem(TargetType, item) {
        if (TargetType == 'team' && item && item.Id) {
            let team = item
            return (

                <div className="col-md-12">
                    <div className="card box-shadow">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-5 text-center">
                                    <Link to={`/team/${team.Id}`}><img className="circle thumb96" src={team.Logo} alt="Logo" /></Link>
                                </div>
                                <div className="col-7">
                                    <Link to={`/team/${team.Id}`}><h3 className="mt-0">{team.Name}</h3></Link>
                                    <ul className="list-unstyled mb-0">
                                        <li className="mb-1">
                                            <em className="fa fa-tags fa-fw"></em>
                                            {this.showHashTag(team)}
                                        </li>
                                        <li className="mb-1">
                                            <em className="icon-location-pin"></em> {team.CountryId}</li>

                                        <li className="mb-1">
                                            <em className="fa fa-phone fa-fw"></em> {team.Phone}</li>
                                        <li className="mb-1">
                                            <em className="fa fa-envelope fa-fw"></em> {team.Email}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>)

        }

        if (TargetType == 'event' && item && item.Id) {
            let event = item
            return (
                <div className="col-md-12">
                    <div className="card box-shadow">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-5 text-center">
                                    <Link to={`/event/${event.Id}/view`}><img className="circle thumb96" src={event.Posters.Small} alt="Logo" /></Link>
                                </div>
                                <div className="col-7">
                                    <Link to={`/event/${event.Id}/view`}><h3 className="mt-0">{event.Title}</h3></Link>
                                    <ul className="list-unstyled mb-0">
                                        <li className="mb-1">
                                            <em className="fa fa-tags fa-fw"></em>
                                            {this.showHashTag(event)}
                                        </li>
                                        <li className="mb-1">
                                            <em className="icon-location-pin"></em> {event.Country}</li>

                                        <li className="mb-1">
                                            <em className="fa fa-phone fa-fw"></em> {event.Phone}</li>
                                        <li className="mb-1">
                                            <em className="fa fa-envelope fa-fw"></em> {event.Email}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>)

        }
        if (TargetType == 'venue' && item && item.Id) {
            let venue = item
            return (
                <div className="col-md-12">
                    <div className="card box-shadow">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-5 text-center">
                                    <Link to={`/venue/${venue.Id}/view`}><img className="circle thumb96" src={venue.Posters.Small} alt="Logo" /></Link>
                                </div>
                                <div className="col-7">
                                    <Link to={`/venue/${venue.Id}/view`}><h3 className="mt-0">{venue.Title}</h3></Link>
                                    <ul className="list-unstyled mb-0">
                                        <li className="mb-1">
                                            <em className="fa fa-tags fa-fw"></em>
                                            {this.showHashTag(venue)}
                                        </li>
                                        <li className="mb-1">
                                            <em className="icon-location-pin"></em> {venue.Country}</li>

                                        <li className="mb-1">
                                            <em className="fa fa-phone fa-fw"></em> {venue.Phone}</li>
                                        <li className="mb-1">
                                            <em className="fa fa-envelope fa-fw"></em> {venue.Email}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>)

        }

    }


    render() {

        var {
            Id,
            TargetType, Title, error, TargetId, valueEvent,valueVenue,valueTeam, team,TypeEvent,TypeTeam,Main,TypeVenue,venue,event } = this.state;
        console.log('this.state')
        console.log(this.state)
        var { error_srv, isFetching, onCropImg, isCropImg, onCropImgSuccess, Image, suggestionsTeam } = this.props;
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>{Id ? "Chỉnh sửa" : "Thêm mới"}</div>
                </div>
                <Card className="card-default">
                    <div className={isFetching ? "card-body whirl sphere" : "card-body"}>
                        <form onSubmit={this.onSave} data-parsley-validate="" noValidate className="form-horizontal">
                            <div className="panel panel-default">
                                {/* {Id ? (
                                    <fieldset>
                                        <FormGroup row>
                                            <label className="col-md-3 col-form-label text-right">ID</label>
                                            <div className="col-md-6">
                                                <Input
                                                    required="required"
                                                    data-parsley-required-message="Field must have a valid."
                                                    type="text"
                                                    name="Id"
                                                    value={Id}
                                                    onChange={this.onChange}
                                                    disabled='1'
                                                />
                                            </div>
                                        </FormGroup>
                                    </fieldset>
                                ) : ''
                                } */}
                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Position</label>
                                        <div className="col-md-6">
                                            <label className="c-radio">
                                                <Input id="inlineradio1" 
                                                type="checkbox" 
                                                name="TypeEvent"
                                                value={!TypeEvent}
                                                onChange={this.onChange}
                                                defaultChecked={TypeEvent}
                                                />
                                                <span className="fa fa-circle"></span>Event</label>
                                            <label className="c-radio">
                                                <Input id="inlineradio2" type="checkbox" 
                                                name="TypeTeam"
                                                value={!TypeTeam}
                                                onChange={this.onChange}
                                                defaultChecked={TypeTeam}
                                                 />
                                                <span className="fa fa-circle"></span>Team</label>
                                            <label className="c-radio">
                                                <Input id="inlineradio3" type="checkbox" 
                                                name="TypeVenue"
                                                value={!TypeVenue}
                                                onChange={this.onChange}
                                                defaultChecked={TypeVenue}
                                                 />
                                                <span className="fa fa-circle"></span>Venue</label>
                                            <label className="c-radio">
                                                <Input id="inlineradio3" type="checkbox" 
                                                name="Main"
                                                value={!Main}
                                                onChange={this.onChange}
                                                defaultChecked={Main}
                                                 />
                                                <span className="fa fa-circle"></span>Main</label>
                                        </div>
                                    </FormGroup>
                                </fieldset>
                                
                                {!TypeEvent ? '' :
                                    <fieldset>

                                        <TeamSuggest TargetType={'event'} onChangeTeam={this.onChangeEvent} value={valueEvent} onSuggestionSelected={this.onSuggestionSelected} onSuggestionsClearRequested={this.onSuggestionsClearRequested} teams={suggestionsTeam}>
                                            {this.showSelectedItem('event', event)}
                                        </TeamSuggest>
                                    </fieldset>
                                }
                                
                                {!TypeTeam ? '' :
                                    <fieldset>

                                        <TeamSuggest TargetType={'team'} onChangeTeam={this.onChangeTeam} value={valueTeam} onSuggestionSelected={this.onSuggestionSelected} onSuggestionsClearRequested={this.onSuggestionsClearRequested} teams={suggestionsTeam}>
                                            {this.showSelectedItem('team', team)}
                                        </TeamSuggest>
                                    </fieldset>
                                }
                                {!TypeVenue ? '' :
                                    <fieldset>

                                        <TeamSuggest TargetType={'venue'} onChangeTeam={this.onChangeVenue} value={valueVenue} onSuggestionSelected={this.onSuggestionSelected} onSuggestionsClearRequested={this.onSuggestionsClearRequested} teams={suggestionsTeam}>
                                            {this.showSelectedItem('venue', venue)}
                                        </TeamSuggest>
                                    </fieldset>
                                }
                               

                                <fieldset>
                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Title</label>
                                        <div className="col-md-6">
                                            <Input
                                                required="required"
                                                data-parsley-required-message="Field must have a valid."
                                                type="text"
                                                name="Title"
                                                value={Title}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </FormGroup>
                                </fieldset>

                                <fieldset>

                                    <FormGroup row>
                                        <label className="col-md-3 col-form-label text-right">Image</label>
                                        <div className="col-md-6">
                                            <CropIMG onCropImg={onCropImg} isCropImg={isCropImg} Image={Image} aspect={{ width: 5 * 320, height: 1 * 320 }} onCropImgSuccess={onCropImgSuccess} />
                                            {/* <img className="img-fluid" style={{maxWidth:'50%'}} src={Image}/><br/>
                                            <FileBase64
                                            multiple={ true }
                                            onDone={ this.getFiles.bind(this) } /> */}
                                            {/* <Input
                                                required="required"
                                                data-parsley-required-message="Field must have a valid."
                                                type="text"
                                                name="Image"
                                                value={Image}
                                                onChange={this.onChange}
                                            /> */}
                                        </div>
                                    </FormGroup>
                                </fieldset>



                                {
                                    error || error_srv
                                        ?
                                        <div className="panel-heading">
                                            <div className="col-sm-6 col-sm-offset-3">
                                                <ul className="parsley-errors-list filled">
                                                    <li className="parsley-required">{error_srv ? error_srv : error}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        :
                                        null
                                }
                                <fieldset>
                                    <FormGroup row>
                                        <div className="col-sm-3 text-right">
                                            <Link to="/banner" className="btn btn-square btn-default">Back</Link>
                                        </div>
                                        <div className="col-sm-6">
                                            <button className="btn btn-square btn-primary" type="submit">Save</button>
                                        </div>
                                    </FormGroup>
                                </fieldset>
                            </div>
                        </form>
                    </div>
                </Card>
            </ContentWrapper>
        );
    }
}

export default Form;