import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // document.title = `NewsMoneky-${this.capitalize(props.category)}`;

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async ()=> {
    props.changeProgress(0);
    let query = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(query);
    props.changeProgress(30);
    let parsedData = await data.json();
    props.changeProgress(60);
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.changeProgress(100);
  }

  useEffect(() => {
    updateNews();
  }, [])
  
  const handlePreviousClick = async () => {
    setPage(page + 1);
    updateNews();
  };

  const handleNextClick = async () => {
    setPage(page - 1);
    updateNews();
  };

  const fetchMoreData = async () => {
    let query = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(query);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  }

    return (
      <> 
        <h1 className="text-center" style={{marginTop: "90px"}}>
          NewsMonkey - Top {capitalize(props.category)} Headlines
        </h1>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row my-3">
              {articles.map((element, index) => {
                return (
                  <div className="col-md-4" key={element.url + index}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.autor}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
}

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
