import React, { Component } from 'react'
import moment from 'moment'
import 'moment/locale/fr'
import axios from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class Detail extends  Component {
    state = {
        read: false
    }

    handleClick = (e) => {
        e.preventDefault()
        let message = {
            from: this.props.user.id, //user_id
            fromName: this.props.user.nom + " " + this.props.user.prenom,
            to: this.props.location.state.post.users.id, //post.user.id
            toName: this.props.location.state.post.users.nom + " " + this.props.location.state.post.users.prenom,
            read: this.state.read,
            message: "i want ride with you" //message
        }
        const token = cookies.get('token')
        axios.post('api/message', message, {
            headers: {"X-Socket-Id": window.Echo.socketId(), Authorization: `Bearer ${token}` }
        }
        ).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        moment.locale('fr')
        let post = this.props.location.state.post
        
        var date = moment(post.travelTime).format('dddd, Do MMMM')
        
        var timeSeconds, secondsArriver, timeArriver;
        var time = moment(post.travelTime).format('HH:mm')
        if(post.duration){
            timeSeconds =  moment.duration(time).asSeconds()
            const formatted = post.duration
            secondsArriver = timeSeconds + formatted
            timeArriver = moment.utc(secondsArriver*1000).format('HH:mm');
        }else {
            timeSeconds =  moment.duration(time).asSeconds()
            const formatted = post.secondDuration
            secondsArriver = timeSeconds + formatted
            timeArriver = moment.utc(secondsArriver*1000).format('HH:mm');
        }
        var annimaux;
        if(post.users.cigarettes) {
            switch(post.users.cigarettes) {
                case "1" : annimaux = "Les animaux sont les bienvenus.";
                break;
                case "2" : annimaux = "Les aimaux sont interdits";
                break;
                default: annimaux = "";
            }
        }
        return (   
            
            <div className='container'>
                <div className="row justify-content-md-center">
                    <div className="col-md-7 mt-4">
                        <h3>{date}</h3>
                        <ul className="list p-0 m-0 list-unstyled">
                           <li>
                                <time className="travelTime">{time}</time> 
                                <div >
                                    {post.fromcity}
                                </div>
                            </li> 
                            <li>
                               <time className="travelTime">{time}</time>
                               <div >
                                    {post.tocity}
                                </div>
                            </li> 
                        </ul>
                    </div>
                                    
                </div>
            </div>
        )
    }
    
}