import React, { Component } from 'react';

class SweetAlert extends Component {

    showNews = (teams) => {
        var result = null;
        if (teams && teams.length > 0) {
            result = teams.map((item, index) => {
                return (
                    <div key={index} className="card b">
                        <div className="card-header">
                            <div className="media mt-0">
                                <img className="mr-2 img-thumbnail rounded-circle thumb32" src={item.Team.Logo} alt={item.Team.Name} />
                                <div className="media-body">
                                    <h5 className="m-0 text-bold">{item.Team.Name}</h5>
                                    <div className="text-sm text-muted">{item.CreatedAt}</div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {item.Image ?
                                    <div className="col-xl-4 text-center mb-3">
                                        <a href="">
                                            <img className="img-fluid img-thumbnail" src={item.Image} alt="Demo" />
                                        </a>
                                    </div> : null
                                }
                                <div className={item.Image ? "col-xl-8" : "col-xl-12"}>

                                    <p className="defail-team" dangerouslySetInnerHTML={{ __html: item.Content }}></p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            });
        }
        return result;

    }

    showPages = () => {

        var { teamNews } = this.props
        var { current_page, last_page, to, total } = teamNews

        

            for (let index = 1; index <= last_page; index++) {
                if(current_page==index){
                    return <button className="btn btn-primary center btn-oval btn-lg" type="button">{index}</button>
                }
                return (
                    <button onClick={this.props.onLoadMore(index)} className="btn btn-secondary center btn-oval btn-lg" type="button">{index}</button>
                )
            }



    }
    render() {
        var { teamNews,teams } = this.props

        return (
            <React.Fragment>
                
                {teams.isFetching2 ? <div className="ball-spin-fade-loader"><div></div></div> : this.showNews(teamNews.data)}
                <div role="group" className="btn-group">{this.showPages()}</div>
                
            </React.Fragment>
        );
    }

}

export default SweetAlert;