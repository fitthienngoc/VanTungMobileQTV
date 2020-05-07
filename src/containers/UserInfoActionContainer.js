import React, { Component } from 'react';
import Spinner from '../components/Spinner/Spinner';
import { connect } from 'react-redux';
import { actGetUser, actGetFollowing, actGetJoining,actGetUserTicket} from '../actions/user'
import UserInfomation from '../contents/Users/UserInfomation';

class UserActionContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Id: '',
            UserId: '',
            Email: '',
            Name: '',
            Gender: '',
            Avatar: '',
            Birthday: '',
            AboutMe: '',
            Language: '',
            error: '',
            AreaId:'',Status:'',
            BlockStatus: "",
            DeleteStatus: "",LastVisitTime: "",Point: "",SNS: "",SignUpTime:'',TotalPurchaseAmount: "",
            userFollowing:[],userJoining:[],userTicket:[],
            Phone:''
        };
    }

    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            this.props.onEditUser(id);
            this.props.onGetFollowing(id)
            this.props.onGetJoining(id)
            this.props.onGetUserTicket(id)
        }

    }

    componentWillReceiveProps(nextProps) {
        //  console.log(nextProps.users)
        if (nextProps && nextProps.users.itemEditing) {
            var { itemEditing,userFollowing,userJoining,userTicket } = nextProps.users;
            var { Id,
                UserId,
                Email,
                Name,
                Gender,
                Avatar,
                Birthday,
                AboutMe,
                Language,
                AreaId,Status,
                BlockStatus,
                Phone,
                DeleteStatus,LastVisitTime,Point,SNS,SignUpTime,TotalPurchaseAmount } = itemEditing;
            
            this.setState({
                Id,
                UserId,
                Email,
                Name,
                Gender,
                Avatar,
                Birthday,
                AboutMe,
                Language,
                AreaId,Status,BlockStatus,Phone,
                DeleteStatus,LastVisitTime,Point,SNS,SignUpTime,TotalPurchaseAmount,
                userFollowing,userJoining,userTicket
                
            });

        }
    }

    render() {
        var { match, users, history } = this.props
        var user = this.state
        if (match) {
            if(users.isFetching) {
                return (
                    <Spinner />
                );
            }else {
                return (
                    <UserInfomation history={history} user={user} isFetching={users.isFetching} />
                );
            }
        }
        
    }
}

const mapStatetoProps = state => {
    return {
        users: state.users,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onEditUser: (id) => {
            dispatch(actGetUser(id));
        },
        onGetFollowing:(id)=>{
            dispatch(actGetFollowing(id))
        },
        onGetJoining:(id)=>{
            dispatch(actGetJoining(id))
        },
        onGetUserTicket:(id)=>{
            dispatch(actGetUserTicket(id))
        }
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(UserActionContainer);