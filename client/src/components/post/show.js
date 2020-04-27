import React, { Component } from 'react'
import moment from 'moment'
import './show.scss';
import RenderResult from './RenderResult';

class Search extends Component {

    state = {
        listItems: '',
        firstData: '',
        isFetching: false,
        vers: '',
    }
    componentDidMount() {
        var prevPath = this.props.location.state
        if (prevPath !== undefined) {
            var data = this.props.location.state.data
            this.setState({
                listItems: data,
                firstData: data.slice(0, 20),
                vers: this.props.location.state.vers
            })
        } else {
            this.props.history.push({
                pathname: 'recherche'
            })
        }
        window.addEventListener('scroll', this.handleScroll, { passive: true });
    }

    handleScroll = () => {
        if (window.innerHeight + window.scrollY !== document.documentElement.offsetHeight) {
            return
        } else {
            this.setState({
                isFetching: true
            })
            this.fetchMoreListItems();
        }

    }

    fetchMoreListItems = () => {
        const { firstData, listItems } = this.state
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

    handleClick = (post) => {
        
        this.props.history.push({
            pathname: 'trajet-detail',
            state: { post: post }
        })
    }

    render() {
        const { firstData, isFetching, listItems, vers} = this.state

        if (firstData.length > 0) {
            var date = moment(firstData[0].travelTime).format('dddd, Do MMMM')
            return (
                <div className="container">
                    <div style={{ textAlign: "center", margin: "42px 0" }}>
                        <p style={{ margin: "10px" }}> {date}</p>
                        {/* {firstData[0].fromcity} <span className="fa fa-arrow-right"></span> {firstData[0].tocity}, */}
                        <p>{listItems.length} trajets allant de {firstData[0].fromcity} à {firstData[0].tocity} publiés</p>
                    </div>
                    {/* <div className="container-results"> */}
                        {firstData.map((post) => <RenderResult key={post.id} from={post.fromcity} to={post.tocity} post={post} vers={vers} handleClick={this.handleClick} />)}
                    {/* </div> */}
                    <div style={{ textAlign: "center", margin: "10px" }}>
                        <p>{isFetching && "Récupérer plus d'éléments..."}</p>
                    </div>
                </div>
            )
        }
        return (
            <div>Rien Trouvé</div>
        )

    }
}

export default Search;