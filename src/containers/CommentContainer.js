import React, { Component } from 'react';

import { connect } from 'react-redux';
import Spinner from '../components/Spinner/Spinner';
import Comments from '../contents/Comments/Comments';
import Filter from '../components/Filter';
import CommentList from './../components/Comments/CommentList';
import Comment from './../components/Comments/Comment'
import Paginate from '../components/Paginate';
import ConvertURL from '../helpers/ConvertURL';
import { actLoadDataComment, actUpdateComment, actDeleteComment } from '../actions/tn_shop/comment';

class CommentContainer extends Component {

    componentWillMount() {
        var { location } = this.props;
        var search = location.search;
        this.props.onLoadDataComment(search);
    }
    showFilter() {
        var { location } = this.props;
        return (
            <Filter location={location} onFilter={(key, value) => this.onFilter(key, value)} />
        );
    }
    showListComment(Comment) {
        return (
            <CommentList>
                {this.showItemComment(Comment)}
            </CommentList>
        );
    }
    showItemComment(comments) {
        var { onDeleteComment, onUpdateComment } = this.props;
        var result = <tr><td></td><td></td><td></td><td></td></tr>;
        // console.log(comments)
        if (comments.length > 0) {
            result = comments.map((item, index) => {
                return (
                    <Comment key={index} onUpdateComment={onUpdateComment} item={item} index={index} onDeleteComment={onDeleteComment} />
                );
            });
        }
        return result;
    }
    showPaginate(comment) {
        return (
            <Paginate paginate={comment} onFilter={(key, value) => this.onFilter(key, value)} />
        );
    }
    onFilter(key, value) {
        var { history, location } = this.props;
        var search = '&' + ConvertURL(location.search, key, value);
        // console.log(`search`, search);
        history.push({
            search: search,
        });
        this.props.onLoadDataComment(search);
    }
    render() {
        var comments = this.props.comments.comments;
        // console.log(this.props.comments)
        return (
            <Comments>
                {this.showFilter()}
                {
                    this.props.comments.isFetching
                        ?
                        <Spinner />
                        :
                        <React.Fragment>
                            {this.showListComment(comments.data)}
                            {this.showPaginate(comments)}
                        </React.Fragment>
                }
            </Comments>
        );
    }
}

const mapStatetoProps = state => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoadDataComment: (search) => {
            dispatch(actLoadDataComment(search));
        },
        onUpdateComment: (Id, verify) => {
            dispatch(actUpdateComment(Id, verify));
        },
        onDeleteComment: (Id) => {
            dispatch(actDeleteComment(Id));
        },

    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(CommentContainer);