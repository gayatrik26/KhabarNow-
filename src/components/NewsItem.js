import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let {title , description , imgURL , newsUrl} = this.props;
        return (
            <div className='my-3 mx-1' style={{boxShadow :"0px 0px 4px #d4ecff"}}>
                <div className="card" style={{width : "21rem" ,minHeight : "24rem", overflow : "hidden"}}>
                    <img src={!imgURL?"https://placehold.co/320x180":imgURL} className="card-img-top" style={{maxHeight : "180px"}} alt=""/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a href={newsUrl} target='_blank' rel="noopener noreferrer" className="btn btn-outline-dark btn-sm">Read more</a>
                        </div>
                </div>
            </div>
        )
    }
}
