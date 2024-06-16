import React from 'react'

const NewsItem = (props) => {
    let { title, description, imgURL, newsUrl, author, date, source } = props;
    return (
            <div className='my-3 mx-1 card' style={{ boxShadow: "0px 0px 4px #d4ecff"}} >
                <div className="card" style={{ Height: "28rem" }} >
                    <div className="container" style={{display : "flex" , justifyContent : "flex-end" , position : "absolute" , right :"0"}}>
                        <span className="badge rounded-pill bg-success">
                        {source}</span>
                    </div>
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
// style={{width : "21rem" ,minHeight : "24rem", overflow : "hidden"}}

export default NewsItem;