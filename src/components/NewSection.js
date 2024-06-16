import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Loader from './Loader';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const NewSection = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);


    const fetchDATA = async () => {
        try {
            props.setProgress(20);
            const { country, category, pagesize, apikey } = props;
            const URL = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apikey}&category=${category}&page=${page}&pageSize=${pagesize}`;
            setLoading(true);
            const data = await fetch(URL);
            props.setProgress(40);
            const parsedDATA = await data.json();
            const filteredArticles = (parsedDATA.articles || []).filter(article => article.urlToImage);
            props.setProgress(70);
            setArticles([...articles, ...filteredArticles]);
            setTotalResults(parsedDATA.totalResults);
            setLoading(false);
            props.setProgress(100);
        } catch (error) {
            console.error('Error fetching the news:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = `KhabarNow+ ${props.category}`;
        fetchDATA();
        // eslint-disable-next-line
    }, []);
    
    const fetchMoreData = async () => {
        try {
            const nextPage = page + 1;
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${nextPage}&pageSize=${props.pagesize}`;
            setLoading(true);
            let data = await fetch(url);
            let parsedData = await data.json();
            const filteredArticles = (parsedData.articles || []).filter(article => article.urlToImage);
            // const uniqueArticles = filteredArticles.filter(article => {
            //     return !articles.some(existingArticle => existingArticle.url === article.url);
            // });
            setArticles([...articles, ...filteredArticles]);
            setTotalResults(parsedData.totalResults);
            setPage(nextPage);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching more news:', error);
            setLoading(false);
        }
    };

    return (
        <>
        <div style={{marginTop : "90px"}}>
            <h2 className='text-center my-4'>KhabharNow+ - Top {props.category} Headings </h2>
            {loading && <Loader/>}
            <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length < totalResults} loader={loading && <Loader />}>
                <div className="conatiner">
                    <div className="row mx-3" >
                        {articles.map((element) => {
                            return <div className="col-md-4" key={`${element.url}-${element.title}-${element.description}-${element.urlToImage}-${element.author}-${element.date}`}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 80) : ""} imgURL={element.urlToImage} newsUrl={element.url} author={!element.author ? "Unknown" : element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            </div>
        </>
    )

}

NewSection.defaultProps = {
    country: 'in',
    pagesize: 8,
    category: 'general'
}
NewSection.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func,
    apikey: PropTypes.string.isRequired
};

export default NewSection;