import React, { Component } from 'react';

import { connect } from 'react-redux';
import Spinner from '../components/Spinner/Spinner';
import Categories from '../contents/Categories/Categories';
import Filter from '../components/Filter';
import CategorieList from './../components/Categories/CategorieList';
import Categorie from './../components/Categories/Categorie'
import Paginate from '../components/Paginate';
import ConvertURL from '../helpers/ConvertURL';

import { actUpdateCategorie, actGetCategorie, actLoadDataCategories, actDeleteCategorie } from '../actions/tn_shop/categorie';

class CategorieContainer extends Component {

    componentWillMount() {
        var { location } = this.props;
        var search = location.search;
        this.props.onLoadDataCategorie(search);
    }
    showFilter() {
        var { location } = this.props;
        return (
            <Filter location={location} onFilter={(key, value) => this.onFilter(key, value)} />
        );
    }
    showListCategorie(Categorie) {
        return (
            <CategorieList>
                {this.showItemCategorie(Categorie)}
            </CategorieList>
        );
    }
    showItemCategorie(categories) {
        var { onDeleteCategorie } = this.props;
        var result = <tr><td></td><td></td><td></td><td></td></tr>;
        // console.log(categories)
        if (categories && categories.length > 0) {

            result = categories.map((item, index) => {
                return (
                    <Categorie key={index} onDeleteCategorie={onDeleteCategorie} item={item} index={index} />
                );
            });
        }
        return result;
    }
    showPaginate(categorie) {
        return (
            <Paginate paginate={categorie} onFilter={(key, value) => this.onFilter(key, value)} />
        );
    }
    onFilter(key, value) {
        var { history, location } = this.props;
        var search = '&' + ConvertURL(location.search, key, value);
        // console.log(`search`, search);
        history.push({
            search: search,
        });
        this.props.onLoadDataCategorie(search);
    }
    render() {
        var categories = this.props.categories.categories;
        // console.log(this.props.categories)
        return (
            <Categories>
                {this.showFilter()}
                {
                    this.props.categories.isFetching
                        ?
                        <Spinner />
                        :
                        <React.Fragment>
                            {this.showListCategorie(categories.data)}
                            {this.showPaginate(categories)}
                        </React.Fragment>
                }
            </Categories>
        );
    }
}

const mapStatetoProps = state => {
    return {
        categories: state.categories
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoadDataCategorie: (search) => {
            dispatch(actLoadDataCategories(search));
        },
        onUpdateCategorie: (body) => {
            dispatch(actUpdateCategorie(body))
        }
        ,
        onDeleteCategorie: (id) => {
            dispatch(actDeleteCategorie(id))
        },
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(CategorieContainer);