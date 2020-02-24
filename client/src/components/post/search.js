import React, { Component } from 'react'
import moment from 'moment'
import './search.scss';
import RenderResult from './RenderResult';

class Search extends Component {

    state = {
        listItems: '',
        firstData: '',
        isFetching: false
    }
    componentDidMount() {
        var prevPath = this.props.location.state
        if(prevPath !== undefined) {
            var data = this.props.location.state.data
            this.setState({
                listItems: data,
                firstData: data.slice(0, 20)
            })
        }else {
            this.props.history.push({
                pathname : 'search'
            })    
        }
        window.addEventListener('scroll', this.handleScroll, { passive: true });
    }

    handleScroll = () => {
        if(window.innerHeight + window.scrollY !== document.documentElement.offsetHeight) {
            return
        }else {
            this.setState({
                isFetching: true
            })
            this.fetchMoreListItems();
        }
        
    }

    fetchMoreListItems = () => {
        const {firstData,listItems}  = this.state
        setTimeout(() => {
            const dt = listItems.slice(firstData.length, firstData.length + 20)
            const rs = firstData.concat(dt)
            this.setState({
                firstData: rs,
                isFetching: false
            })
            
        }, 1000)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, { passive: true });
    }

    handleClick = (e, post) => {
        this.props.history.push({
            pathname : 'trajet-detail',
            state: { post: post }
        })
    }

    render() {
        const {firstData,isFetching,listItems}  = this.state
        
        if(firstData.length > 0) {
            var date = moment(firstData[0].travelTime).format('dddd, Do MMMM')
            return(
                <div className="container">
                    <div style={{textAlign:"center", margin:"42px 0"}}>
                        <p style={{margin:"10px"}}> {date}</p>
                        {/* {firstData[0].fromcity} <span className="fa fa-arrow-right"></span> {firstData[0].tocity}, */}
                        <p>{listItems.length} trajets allant de {firstData[0].fromcity} à {firstData[0].tocity} publiés</p>
                    </div>
                    {firstData.map((post) => <RenderResult key={post.id} from={post.fromcity} to={post.tocity} post={post} handleClick={this.handleClick} />)}
                    {isFetching && 'Fetching more list items...'}
                </div>
            )
        }
        return(
            <div>Rien Trouvé</div>
        )
        
    }
}

export default Search;