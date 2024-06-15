import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, imgURL, newsUrl, author, date, source } = this.props;
        return (
            <div className='my-3 mx-1 card' style={{ boxShadow: "0px 0px 4px #d4ecff" }}>
                <div className="card" style={{ Height: "28rem" }} >
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{ zIndex: "1", left: "92%" }}>
                    {source}</span>
                    <img src={!imgURL ? "https://placehold.co/320x180" : imgURL} className="card-img-top" style={{ maxHeight: "180px" }} alt="" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target='_blank' rel="noopener noreferrer" className="btn btn-outline-dark btn-sm">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}
// style={{width : "21rem" ,minHeight : "24rem", overflow : "hidden"}}