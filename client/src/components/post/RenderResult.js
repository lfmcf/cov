import React, { Component } from 'react';
import moment from 'moment';
import './RenderResult.scss';
class RenderResult extends Component {

   
    render() {
        const { post, vers } = this.props
        
        var timeDepart = moment(post.travelTime).format('HH:mm');
        
        var first_travel_time = moment.duration(timeDepart).asSeconds() + post.firstDuration;
        var arriver, prix, time = "";
        first_travel_time = moment.utc(first_travel_time * 1000).format('HH:mm');
        var second_travel_time = moment.duration(timeDepart).asSeconds() + post.firstDuration + post.secondDuration;
        second_travel_time = moment.utc(second_travel_time * 1000).format('HH:mm');

        if (new Intl.Collator().compare(post.tocity, vers) >= 0) {
            arriver = post.tocity
            prix = post.price
            time = second_travel_time
        } else {
            arriver = post.passbycity
            prix = post.price - post.PassByPrice
            time = first_travel_time
        }
        return (
            <div className="container-results" onClick={() => this.props.handleClick(post)}>
                <div className="item-infos">
                    <div className="flex-items">
                        <div className="time-items">
                            <div>
                                {timeDepart}
                            </div>
                            <div className="bottom-items">
                                {time}
                            </div>
                        </div>
                        <div className="vl"></div>
                        <div>
                            <div>
                                {post.fromcity}
                            </div>
                            <div className="bottom-items">
                                {arriver}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item-prix">
                    {prix} dh
               </div>
                <div className="item-user">
                    <div className="image-user-name">
                        <a href="">{post.users.nom}</a>
                    </div>
                    
                    <img src={post.users.avatar} alt="user-image" className="item-user-image" />
                </div>
            </div>
        )
    }
}

export default RenderResult;