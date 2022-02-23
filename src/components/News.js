import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    
    constructor(){
        super();
        this.state={
            atricles:[],
            loading:false,
            page:1
        }
    }

    async componentDidMount(){
      
      let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=e551abaf2a834355aad205bb0c64b6bd&page=1&pageSize=20";
      let data=await fetch(url);
      let parsedData=await data.json();
      console.log(parsedData);
      this.setState({
        atricles:parsedData.articles,
        totalResults:parsedData.totalResults
      })
    }

    handelPreviousButton = async () => {
      let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=e551abaf2a834355aad205bb0c64b6bd&page=${this.state.page-1}&pageSize=20`;
      let data=await fetch(url);
      let parsedData=await data.json();
      console.log(parsedData);

      this.setState({
        page:this.state.page-1,
        atricles:parsedData.articles
      })
    }

    handelNextButton = async () => {

      if(this.state.totalResults>this.state.page*20)
      {

        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=e551abaf2a834355aad205bb0c64b6bd&page=${this.state.page+1}&pageSize=20`;
        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);

        this.setState({
          page:this.state.page+1,
          atricles:parsedData.articles
        })
      }
    }

    render() {
        return (
            <div className="container mt-3">
                <h2 className="text-center">Hot News Today</h2>
                <div className="row mt-5">
                    {this.state.atricles.map((element)=>{
                      return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0,45) : ''} description={element.description ? element.description.slice(0,20) : ''} imageUrl={element.urlToImage ? element.urlToImage : 'https://images.cointelegraph.com/images/1200_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjEtMDkvMDBkNzgyMjYtZjUxYi00YjMxLWExNzctN2VjMDM5NTlhNThkLmpwZw==.jpg'} newsUrl={element.url}/>
                            </div>
                    })}
                </div>
                <div className="container d-flex flex-row justify-content-between mt-5 mb-5">
                <button type="button" disabled={this.state.page===1} onClick={this.handelPreviousButton} className="btn btn-dark">&larr; Previous</button>
                <button type="button" onClick={this.handelNextButton} className="btn btn-dark">Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
