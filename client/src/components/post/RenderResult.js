import React, { Component } from 'react';
import moment from 'moment';
import './RenderResult.scss';
class RenderResult extends  Component {
    render() {
        const { post } = this.props
        var tt = moment.utc(post.firstDuration*1000).format('HH:mm');
        var vv = moment.utc(post.secondDuration*1000).format('HH:mm');
        var timeDepart = moment(post.travelTime).format('HH:mm');
        var date = moment(post.travelTime).format('DD/MM/YYYY');
        var first_travel_time = moment.duration(timeDepart).asSeconds() + post.firstDuration;
        first_travel_time = moment.utc(first_travel_time*1000).format('HH:mm');
        if (post.secondDuration) {
            var second_travel_time = moment.duration(timeDepart).asSeconds() + post.firstDuration + post.secondDuration;
            second_travel_time = moment.utc(second_travel_time * 1000).format('HH:mm');

            return (
                <div className="container-results">
                    <div className="holder">
                        <div className="item-from item" >
                            <span>{timeDepart}</span>, <p style={{display:"inline"}}>{post.fromcity}</p>
                        </div>
                        <div className="item-parent">
                            <div className="item-arrow">
                            <span className="dot"></span>
                            <span className="arrow"></span>
                            <span className="dot"></span>
                            </div>
                            <div style={{textAlign:"center",fontSize:"10px"}}><p style={{marging:"0"}}>{post.price} dh</p></div>
                        </div>
                    </div>
                </div>
            )
        }else {
            return(
                <div className="container-results">
                    
                </div>
            )
        }
    }
}

export default RenderResult;