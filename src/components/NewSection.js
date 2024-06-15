import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loader from './Loader';
import PropTypes from 'prop-types';

export default class NewSection extends Component {
    articles = [];

    static defaultProps = {
        country: 'in',
        pagesize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string
    }


    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1
        }
    }

    async fetchDATA() {
        try {
            let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=23b57123c1374fb5a5e08563dc342515&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
            this.setState({ loading: true });
            let data = await fetch(URL);
            let parsedDATA = await data.json();
            // const filteredArticles = parsedDATA.articles.filter(article => article.urlToImage);
            const filteredArticles = (parsedDATA.articles || []).filter(article => article.urlToImage);


            this.setState({
                articles: filteredArticles,
                totalResults: parsedDATA.totalResults,
                loading: false
            });
        } catch (error) {
            console.error("Error fetching the news:", error);
        }
    }

    async componentDidMount() {
        this.fetchDATA();
    }

    previousbtnclick = async () => {
        // this.setState({ page: this.state.page - 1 }, this.fetchDATA);

        // console.log("previous");
        // try {
        //     let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=23b57123c1374fb5a5e08563dc342515&category=${this.props.category}&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`;
        //     this.setState({ loading: true });
        //     let data = await fetch(URL);
        //     let parsedDATA = await data.json();
        //     // const filteredArticles = parsedDATA.articles.filter(article => article.urlToImage);
        //     const filteredArticles = (parsedDATA.articles || []).filter(article => article.urlToImage);
        //     this.setState({
        //         articles: filteredArticles,
        //         page: this.state.page - 1,
        //         loading: false
        //     });
        // } catch (error) {
        //     console.error("Error fetching the news:", error);
        // }

        this.setState({ page: this.state.page - 1 });
        this.fetchDATA();
    }

    nextbtnclick = async () => {
        // console.log("next");
        // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)) {

        // }
        // else {
        //     try {
        //         let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=23b57123c1374fb5a5e08563dc342515&category=${this.props.category}&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`;
        //         this.setState({ loading: true });
        //         let data = await fetch(URL);
        //         let parsedDATA = await data.json();
        //         // const filteredArticles = parsedDATA.articles.filter(article => article.urlToImage);
        //         const filteredArticles = (parsedDATA.articles || []).filter(article => article.urlToImage);

        //         this.setState({
        //             articles: filteredArticles,
        //             page: this.state.page + 1,
        //             loading: false
        //         });
        //     } catch (error) {
        //         console.error("Error fetching the news:", error);
        //     }
        this.setState({ page: this.state.page + 1 });
        this.fetchDATA();
        // this.setState({ page: this.state.page + 1 }, this.fetchDATA);
    }

    render() {
        return (
            <div className='container my-3'>
            <h2 className='text-center'>KhabharNow+ - Top Headings</h2>
            {this.state.loading && <Loader/>}
            <div className="row mx-3" >
                {!this.state.loading && this.state.articles.map((element) => {
                    return <div className="col-md-4" key={`${element.url}-${element.title}-${element.description}-${element.urlToImage}`}>
                        <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 80) : ""} imgURL={element.urlToImage} newsUrl={element.url} author={!element.author ? "Unknown" : element.author} date={element.publishedAt} source={element.source.name} />
                    </div>
                })}
            </div>
            <div className="container d-flex justify-content-around">
                <button type="button" disabled={this.state.page <= 1} onClick={this.previousbtnclick} className="btn btn-outline-dark">&larr; Previous</button>
                <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} onClick={this.nextbtnclick} className="btn btn-outline-dark">Next &rarr;</button>
            </div>
            </div>
        )
    }
}


// import React, { Component } from 'react';
// import NewsItem from './NewsItem';
// import Loader from './Loader';
// import PropTypes from 'prop-types';

// export default class NewSection extends Component {
//     articles = [];

//     static defaultProps = {
//         country: 'in',
//         pagesize: 8,
//         category: 'general'
//     }
    
//     static propTypes = {
//         country: PropTypes.string,
//         pagesize: PropTypes.number,
//         category: PropTypes.string
//     }

//     constructor() {
//         super();
//         this.state = {
//             articles: this.articles,
//             loading: false,
//             page: 1
//         }
//     }

//     async fetchDATA() {
//         try {
//             let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=23b57123c1374fb5a5e08563dc342515&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
//             this.setState({ loading: true });
//             let data = await fetch(URL);
//             let parsedDATA = await data.json();
//             const filteredArticles = (parsedDATA.articles || []).filter(article => article.urlToImage);

//             this.setState({
//                 articles: filteredArticles,
//                 totalResults: parsedDATA.totalResults,
//                 loading: false
//             });
//         } catch (error) {
//             console.error("Error fetching the news:", error);
//         }
//     }

//     async componentDidMount() {
//         this.fetchDATA();
//     }

//     previousbtnclick = async () => {
//         this.setState({ page: this.state.page - 1 }, this.fetchDATA);
//     }

//     nextbtnclick = async () => {
//         this.setState({ page: this.state.page + 1 }, this.fetchDATA);
//     };

//     render() {
//         return (
//             <div className='container my-3'>
//                 <h2 className='text-center'>KhabharNow+ - Top Headings</h2>
//                 {this.state.loading && <Loader />}
//                 <div className="row mx-3">
//                     {!this.state.loading && this.state.articles.map((element) => {
//                         return (
//                             <div className="col-md-4" key={`${element.url}-${element.title}-${element.description}-${element.urlToImage}`}>
//                                 <NewsItem
//                                     title={element.title ? element.title.slice(0, 45) : ""}
//                                     description={element.description ? element.description.slice(0, 80) : ""}
//                                     imgURL={element.urlToImage}
//                                     newsUrl={element.url}
//                                     author={!element.author ? "Unknown" : element.author}
//                                     date={element.publishedAt}
//                                     source={element.source.name}
//                                 />
//                             </div>
//                         );
//                     })}
//                 </div>
//                 <div className="container d-flex justify-content-around">
//                     <button type="button" disabled={this.state.page <= 1} onClick={this.previousbtnclick} className="btn btn-outline-dark">&larr; Previous</button>
//                     <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} onClick={this.nextbtnclick} className="btn btn-outline-dark">Next &rarr;</button>
//                 </div>
//             </div>
//         );
//     }
// }
