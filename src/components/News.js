// import React, { Component } from 'react';
// import NewsItem from './NewsItem';
// import Spinner from './Spinner';
// import PropTypes from 'prop-types'


// export class News extends Component {
//     static defaultProps = {
//         country: 'in',
//         pageSize: 6,
//         category: 'General'
//       }

//       static propTypes = {
//         country: PropTypes.string,
//         pageSize: PropTypes.number,
//         category: PropTypes.string
//       }
      
//       capitalizeFirstLetter = (string)=>{
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     }

//     constructor(props){
//         super(props);
//         console.log("hello");
//         this.state = {
//         articles: [],
//         loading: false,
//         page: 1,
//         totalResults: 0
//         }
    
//     document.title = `${this.capitalizeFirstLetter(props.category)} - NewsPrasoon`;
//     }

//     async updateNews()
//     {   
//         this.props.setProgress(10);
//         let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8a3c11f8a97944549be0593923099fd6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//         this.setState({loading: true});
//         let data = await fetch(url);
//         this.props.setProgress(50);
//         let parseData= await data.json();
//         this.props.setProgress(80);
//         this.setState({articles: parseData.articles, totalResult: parseData.totalResults,loading: false})
//         this.props.setProgress(100);
//     }

//     async componentDidMount()
//     {
//         this.updateNews();

//     }

//      handleNextClick = async ()=>{
//         // if(!((this.state.page + 1) > Math.ceil(this.state.totalResult/(this.props.pageSize))))
//         //     {

//         //         let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8a3c11f8a97944549be0593923099fd6&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
//         //         this.setState({loading: true});
//         //         let data = await fetch(url);
//         //         let parseData= await data.json()

//         //         this.setState({
//         //             page: this.state.page + 1,
//         //             articles: parseData.articles,
//         //             loading: false
//         //                       })
//         //     }
//         this.setState({page: this.state.page + 1});
//         this.updateNews();
//           }
//      handlePreClick = async ()=>{

//         // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8a3c11f8a97944549be0593923099fd6&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
//         // this.setState({loading: true});
//         // let data = await fetch(url);
//         // let parseData= await data.json()



//         // this.setState({
//         //     page: this.state.page - 1,
//         //     articles: parseData.articles,
//         //     loading: false
//         // })
//         this.setState({page: this.state.page + 1})
//         this.updateNews();
//     }

//   render() {
//     return (
//       <div className="container my-3">
//          <h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}}>NewsPrasoon - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
       
//         {this.state.loading && <Spinner />}
//         <div className="row" >
//         {!this.state.loading && this.state.articles.map((element)=>{
//             return <div className="col-md-4" key={element.url}>
//                         <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 90):""} imgUrl={element.urlToImage} newsUrl={element.url} auther={element.author} date={element.publishedAt} source={element.source.name} />
//                     </div> 
//         })}
//         </div>
//         <div className="container d-flex justify-content-between">
//             <button disabled={this.state.page<=1} type="button" onClick={this.handlePreClick} className="btn btn-dark">&larr; Previous</button>
//             <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResult/this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
//         </div>
//         </div>
//     )
//   }
// }

// export default News




import React, {useEffect, useState}from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'


const News =(props)=> {
   const [articles, setArticles] = useState([])
   const [loading, setLoading] = useState(true)
   const [page, setPage] = useState(1)
   const [totalResults, setTotalResults] = useState(0)

  

    const capitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
   

    const updateNews = async ()=>
    {
        props.setProgress(10);
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8a3c11f8a97944549be0593923099fd6&page=${page}&pageSize=${props.pageSize}`;
        
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(50);
        let parseData= await data.json()
        props.setProgress(80);
        setArticles(parseData.articles)
        setTotalResults(parseData.totalResults)
        setLoading(false)
        
        props.setProgress(100);
    }
    useEffect(() => {
      document.title = `${capitalizeFirstLetter(props.category)} - NewsPrasoon`;
      updateNews();
      // eslint-disable-next-line
    }, [])
    
    

     const handleNextClick = async ()=>{
        // if(!((this.state.page + 1) > Math.ceil(this.state.totalResult/(props.pageSize))))
        //     {

        //         let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8a3c11f8a97944549be0593923099fd6&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
        //         this.setState({loading: true});
        //         let data = await fetch(url);
        //         let parseData= await data.json()

        //         this.setState({
        //             page: this.state.page + 1,
        //             articles: parseData.articles,
        //             loading: false
        //                       })
        //     }
        
        setPage(page + 1)
        updateNews();
          }
    const  handlePreClick = async ()=>{

        // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8a3c11f8a97944549be0593923099fd6&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parseData= await data.json()



        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parseData.articles,
        //     loading: false
        // })
       
        setPage(page - 1)
        updateNews();
    }

 
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: '35px 0px'}}>NewsPrasoon - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}
        <div className="row" >
        {!loading && articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 90):""} imgUrl={element.urlToImage} newsUrl={element.url} auther={element.author} date={element.publishedAt} source={element.source.name} />
                    </div> 
        })}
        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={page<=1} type="button" onClick={handlePreClick} className="btn btn-dark">&larr; Previous</button>
            <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" onClick={handleNextClick} className="btn btn-dark">Next &rarr;</button>
        </div>
        </div>
    )
  
}

News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'General'
  }

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

 export default News