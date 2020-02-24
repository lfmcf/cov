import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './add-post-step-2.scss';
const cookies = new Cookies();


class Add_post_step_2 extends Component {
    constructor() {
        super()
        this.state = {
            nbrplace: 3,
            prix: '',
            othprix: '',
            totalprix: '',
            description: '',
            isLogged: false,
            erorrs: {},
            post: '',
            firstDuration: '',
            secondDuration: '',
            duration_value_1: '',
            duration_value_2: ''
        }
    }

    UNSAFE_componentWillMount() {
        
        let post = JSON.parse(localStorage.getItem('post'));
        console.log(post)
        if(post) {
            if(Object.keys(post.infos).length === 1) {
                this.setState({
                    
                    description: post.description,
                    prix: (parseInt(post.infos[0].distance.text) * 0.25).toFixed(),
                    post: post,
                    firstDuration: post.infos[0].duration.text,
                    duration_value_1 : post.infos[0].duration.value
                })   
            }else {
                this.setState({
                    
                    description: post.description,
                    prix: (parseInt(post.infos[0].distance.text) * 0.25).toFixed(),
                    othprix: (parseInt(post.infos[1].distance.text) * 0.25).toFixed(),
                    totalprix: this.state.prix + this.state.othprix,
                    post: post,
                    firstDuration: post.infos[0].duration.text,
                    secondDuration: post.infos[1].duration.text,
                    duration_value_1 : post.infos[0].duration.value,
                    duration_value_2 : post.infos[1].duration.value
                })   
            }
                     
        }else {
            this.props.history.push('/post');
        }
    }

    handleClick = (e) => {
        e.preventDefault()
        let post = JSON.parse(localStorage.getItem('post'));
        post.nbrplace = this.state.nbrplace;
        post.duration_value_1 = parseInt(this.state.duration_value_1);
        post.duration_value_2 = parseInt(this.state.duration_value_2);
        post.fromcity = this.renderCity(this.state.post.from);
        post.tocity = this.renderCity(this.state.post.to);
        post.othercity = this.renderCity(this.state.post.other);
        if(this.state.othprix){
            post.prix = parseFloat(this.state.prix) + parseFloat(this.state.othprix);
        }else {
            post.prix = this.state.prix;
        }
        post.secprix = this.state.othprix;
        post.description = this.state.description;
        localStorage.setItem('post', JSON.stringify(post));
        let cookie = cookies.get('token');
        if(cookie) {
            axios.post('api/post', post, {
                headers: {'Content-Type': 'application/json', Authorization: `Bearer ${cookie}` }
            }).then(res => {
                if(res.statusText === "OK"){
                    alert("post avec succes")
                }
            })
        }else {
            this.props.history.push('/login');
        }
    }

    renderCity = (tab) => {
        if (tab) {
            var city;
            var tabcity = tab.split(',');
            if (tabcity.length === 2) {
                city = tabcity[0];
            } else {
                city = tabcity[1];
            }
            return city;
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });  
    }

    decrement = (e) => {
        console.log(e)
    }

    render() {
        
        var from = this.state.post.from
        var to = this.state.post.to
        var by = this.state.post.other
        var fromcity = this.renderCity(from);
        var tocity = this.renderCity(to)
        var bycity = this.renderCity(by)
        let duree, distance, firstDistance, secondDistance, divPrice
        if(Object.keys(this.state.post.infos).length === 1) {
            duree = this.state.post.infos[0].duration.text
            distance = this.state.post.infos[0].distance.text
            divPrice = <div className="price_container price">
                <div className="price_col">
                    <p>{fromcity} <span className="oi oi-arrow-right"></span> {tocity}</p>
                </div>
                <div className="price_col col_left">
                    <div className="input-container">
                        <input className="input_price" type="text" defaultValue={(parseInt(distance) * 0.25).toFixed()} />
                        <span className="icon">dh</span>
                    </div>
                    <button className="inc-dec btn-1" onClick={this.increment}>+</button>
                    <button className="inc-dec btn-2" onClick={this.decrement}>-</button>
                </div>  
            </div>
        } else {
            let dureeEnSec = this.state.post.infos[0].duration.value + this.state.post.infos[1].duration.value;
            var h = Math.floor(dureeEnSec / 3600);
            var min = Math.floor((dureeEnSec - (h * 3600)) / 60);
            firstDistance = this.state.post.infos[0].distance.text;
            secondDistance = this.state.post.infos[1].distance.text;
            duree = h + " h " + min + " minutes ";
            //let distanceEnMit = this.state.post.infos[0].distance.value;
            //distance = Math.floor(distanceEnMit / 1000);
            distance = parseInt(firstDistance) + parseInt(secondDistance);
            divPrice = <div className="price_container">
                
                    <div className="price_col">
                        <p>{fromcity} <span className="oi oi-arrow-right"></span> {bycity}</p>
                    </div>
                    <div className="price_col col_left">
                        <div className="input-container">
                            <input className="input_price" name="prix" type="text" defaultValue={(parseInt(firstDistance) * 0.25).toFixed()} onChange={this.handleChange} />
                            <span className="icon">dh</span>
                        </div>
                        <button className="inc-dec btn-1" onClick={this.increment}>+</button>
                        <button className="inc-dec btn-2" onClick={this.decrement}>-</button>
                    </div>
                    <div className="price_col">
                        <p>{bycity} <span className="oi oi-arrow-right"></span> {tocity}</p>
                    </div>
                    <div className="price_col col_left">
                        <div className="input-container">
                            <input className="input_price" name="prix" type="text" defaultValue={(parseInt(secondDistance) * 0.25).toFixed()} onChange={this.handleChange} />
                            <span className="icon">dh</span>
                        </div>
                        <button className="inc-dec btn-1" onClick={this.increment}>+</button>
                        <button className="inc-dec btn-2" onClick={this.decrement}>-</button>
                    </div>
                    <div className="price_col">
                        <p>{fromcity} <span className="oi oi-arrow-right"></span> {tocity}</p>
                    </div>
                    <div className="price_col col_left">
                        <div className="input-container">
                            <input className="input_price" name="prix" type="text" defaultValue={(parseInt(distance) * 0.25).toFixed()} onChange={this.handleChange} />
                            <span className="icon">dh</span>
                        </div>
                        <button className="inc-dec btn-1" onClick={this.increment}>+</button>
                        <button className="inc-dec btn-2" onClick={this.decrement}>-</button>
                    </div>
                
            </div>
        }
        return(
            <div className="container_price">
                <h3>Votre annonce</h3>
                <h3>Votre itinéraire</h3>
                <div className="price_layout">
                    <div className="column price_column">
                        <p className="pt">Prix</p>
                        {divPrice}
                    </div>
                    <div className="column trajet_column">
                        <p className="pt">Infos Trajet</p>
                        <div className="map">
                            <p>{this.state.post.from} <span className="oi oi-arrow-right"></span> {this.state.post.to}</p>
                            <p>Durée : { duree }</p>
                            <p>Distance : { distance } Km</p>
                        </div>
                    </div>
                    <div className="column price_container place_column">
                        <p>Nombre de places proposées :</p>  
                        <div className="price_col col_left">
                            <input className="input_price place" onChange={this.handleChange} defaultValue={this.state.nbrplace} />
                            <button className="inc-dec btn-1" onClick={this.increment}>+</button>
                            <button className="inc-dec btn-2" onClick={this.decrement}>-</button>
                        </div>
                    </div>
                    <div className="column descr_column">
                        <p className="pt">Précisions supplémentaires :</p>
                        <p style={{fontSize:"12px",padding:"20px 0 0 20px",color:"#606066"}}>Ajouter des notes supplémentaires apropos de votre voyage : </p>
                        <div className="descr_text">
                            <textarea rows="7" placeholder="Description..." onChange={this.handleChange} name="description"></textarea>
                        </div>
                    </div>
                </div>
                <div style={{textAlign:'center',marginTop:"30px"}} >
                    <a href style={{marginRight:'20px',fontSize:"14px"}} role="button" onClick={() => this.props.history.push('/add_post_step_1')}>Retour</a>
                    <button className="submit_button" onClick={this.handleClick}>Continuer</button>
                </div>
            </div>
        )
    }
}

export default Add_post_step_2;