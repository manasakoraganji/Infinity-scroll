
import { Component } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import ContactItem from "../ContactItem"
import Cookies from 'js-cookie'
import {Skeleton} from 'antd'
import Nav from "../Nav";
import {v4 as uuidv4} from 'uuid'

const apiStatus={
    initial:"INITIAL",
    inProgress:"IN_PROGRESS",
    success:"SUCCESS",
    failure:"FAILURE"
}

class Home extends Component{
    state={dataApiStatus:apiStatus.initial , data:[],hasToViewData:[],hasMore:true,isloading:true,limit:10}

    componentDidMount(){
        this.getData()
    
    }

    getData=async()=>{
        const url="https://randomuser.me/api/?results=500" //"https://randomuser.me/documentation#howto"
        const options={
            method:'GET'
        }
        
        const response=await fetch(url,options)
        const data=await response.json()
        const {results}=data
        const updatedData=results.map(eachItem=>({
            id:eachItem.id.value,
            name:eachItem.name.first+eachItem.name.last,
            picture:eachItem.picture.thumbnail
        }))
        const hasToViewData=updatedData.slice(0,10)
        this.setState({data:updatedData,dataApiStatus:apiStatus.success,hasToViewData,isloading:false})
       

    }


    getMoreData=()=>{
        const {data,hasToViewData}=this.state
        this.setState({hasToViewData:data.slice(0,hasToViewData.length+10)})
    }

    displayLoadingSkeleton=()=>{
       const emptyArray=Array.apply({},Array(10))
       console.log(emptyArray)

       return(
       emptyArray.map(params=>(
        <Skeleton active title={{width:200}} paragraph={{rows:0}} avatar={{shape:'circle',width:500,height:500}}   key={uuidv4()}/>
       )

       )
       )
    }



    renderSuccessView=()=>{
        const {hasToViewData,hasMore}=this.state
        
        return(
            <ul className="ul-list">
                <InfiniteScroll dataLength={hasToViewData.length} next={this.getMoreData} hasMore={hasMore} loader={<p>Loading...</p>}>
                {hasToViewData.map(eachItem=>(
                    <ContactItem key={eachItem.id} ContactItem={eachItem}/>
                ))}
                </InfiniteScroll>
            </ul>
        )
    }

    renderContactListView=()=>{
      const {isloading}=this.state 
      return(
        <div>
            {isloading ? this.displayLoadingSkeleton() : this.renderSuccessView()}
        </div>
      )
        
    }
     onClickLogout = () => {
        const {history}=this.props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

    render(){
        return(
            <div className="home-container">
                <Nav LogOut={this.onClickLogout}/>
            {this.renderContactListView()}
            </div>
        )
    }
}
export default Home


