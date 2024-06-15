import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loader from './Loader';

export default class NewSection extends Component {
    articles = [];


    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1
        }
    }

    async fetchDATA(){
        try{
            let URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=23b57123c1374fb5a5e08563dc342515&page=1`;
            let data = await fetch(URL);
            let parsedDATA = await data.json();
            // const filteredArticles = parsedDATA.articles.filter(article => article.urlToImage);
            const filteredArticles = (parsedDATA.articles || []).filter(article => article.urlToImage);

    
            this.setState({ 
                articles: filteredArticles, 
                totalResults: parsedDATA.totalResults
            });
        }catch (error) {
            console.error("Error fetching the news:", error);
        }
    }

    async componentDidMount() {
        this.fetchDATA();
    }

    previousbtnclick = async () => {
        // this.setState({ page: this.state.page - 1 }, this.fetchDATA);

        console.log("next");
        try{
            let URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=23b57123c1374fb5a5e08563dc342515&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`;
            let data = await fetch(URL);
            let parsedDATA = await data.json();
            // const filteredArticles = parsedDATA.articles.filter(article => article.urlToImage);
            const filteredArticles = (parsedDATA.articles || []).filter(article => article.urlToImage);
            this.setState({
                articles: filteredArticles,
                page: this.state.page - 1
            });
        }catch (error) {
            console.error("Error fetching the news:", error);
        }
    }

    nextbtnclick = async () => {
        console.log("next");
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)) {

        } else {
            try {
                let URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=23b57123c1374fb5a5e08563dc342515&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`;
                let data = await fetch(URL);
                let parsedDATA = await data.json();
                // const filteredArticles = parsedDATA.articles.filter(article => article.urlToImage);
                const filteredArticles = (parsedDATA.articles || []).filter(article => article.urlToImage);

                this.setState({
                    articles: filteredArticles,
                    page: this.state.page + 1
                });
            }catch (error) {
                console.error("Error fetching the news:", error);
            }
            // this.setState({ page: this.state.page + 1 }, this.fetchDATA);
        }

        

    }


    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center'>KhabharNow+ - Top Headings</h2>
                    <Loader/>
                <div className="row mx-3" >
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={`${element.url}-${element.title}-${element.description}-${element.urlToImage}`}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 80) : ""} imgURL={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-around">
                    <button type="button" disabled={this.state.page <= 1} onClick={this.previousbtnclick} className="btn btn-outline-dark">&larr;Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/ this.props.pagesize)}  onClick={this.nextbtnclick} className="btn btn-outline-dark">Next	&rarr;</button>
                </div>
            </div>
        )
    }
}
