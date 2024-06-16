import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loader from './Loader';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

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


    constructor(props) {
        super(props);
        this.state = {
            articles: this.articles,
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `KhabarNow+ ${this.props.category}`;
    }

    async fetchDATA() {
        try {
            this.props.setProgress(20);
            const { page } = this.state;
            const { country, category, pagesize } = this.props;
            const URL = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${this.props.apikey}&category=${category}&page=${page}&pageSize=${pagesize}`;
            this.setState({ loading: true });
            const data = await fetch(URL);
            this.props.setProgress(40);
            const parsedDATA = await data.json();
            const filteredArticles = (parsedDATA.articles || []).filter(article => article.urlToImage);

            const uniqueArticles = filteredArticles.filter(article => {
                return !this.state.articles.some(existingArticle => existingArticle.url === article.url);
            });
            this.props.setProgress(70);
            this.setState({
                articles: [...this.state.articles, ...uniqueArticles],
                totalResults: parsedDATA.totalResults,
                loading: false,
            });
            this.props.setProgress(100);
        } catch (error) {
            console.error('Error fetching the news:', error);
        }
    }

    async componentDidMount() {
        this.fetchDATA();
    }

    fetchMoreData = async () => {

        const nextPage = this.state.page + 1;
        await this.fetchDATA(nextPage);
        this.setState({ page: nextPage });
    }



    render() {
        return (
            <>
                <h2 className='text-center my-4'>KhabharNow+ - Top {this.props.category} Headings </h2>
                {/* {this.state.loading && <Loader/>} */}
                <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length !== this.totalResults} loader={this.state.loading && <Loader />}>
                    <div className="conatiner">
                        <div className="row mx-3" >
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={`${element.url}-${element.title}-${element.description}-${element.urlToImage}`}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 80) : ""} imgURL={element.urlToImage} newsUrl={element.url} author={!element.author ? "Unknown" : element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}
