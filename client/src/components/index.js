import React, { Component } from 'react'
import './index.scss';
import {Link} from 'react-router-dom';
// import img from './assests/images/bg.jpg'
// import map from './assests/images/homeboy1bg.jpg'
class Home extends Component {

    handleClick() {
        console.log('click');
    }
    render() {
        return (
            <div>   
                <div className="heading">
                    <div className="row">
                        <div className="colmun">
                            <h1 >Et vous, qui allez-vous retrouver ?</h1>
                            <h2>Some text here also</h2>
                            <Link to="/search" className="searchLink">chercher</Link>
                        </div>
                    </div>
                </div>
                <div className="section_container">
                    <div className="items">
                        <div className="sec_row">
                            <h1 >Qu'est Nous ?</h1>
                            <p>On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même</p>
                        </div>
                    </div>
                    <div className="items" >
                        <div className="volant">
                            <div className="">
                                <span><i  className="fas fa-car"></i></span>
                                <h3>Vous prenez le volant ? Dites-nous où vous allez !</h3>
                                <p>Ensemble, permettons à des millions de personnes de se déplacer.</p>
                            </div>
                            <div className="">
                                <span><i className="fas fa-users"></i></span>
                                <h3>Vous prenez le volant ? Dites-nous où vous allez !</h3>
                                <p>Ensemble, permettons à des millions de personnes de se déplacer.</p>
                            </div>
                            <div className="">
                                <span><i className="fas fa-road"></i></span>
                                <h3>Vous prenez le volant ? Dites-nous où vous allez !</h3>
                                <p>Ensemble, permettons à des millions de personnes de se déplacer.</p>
                            </div>
                        </div>
                    </div>
                    <div className="items">
                        <div style={{width:"60%",margin:'auto',textAlign:"center"}}>
                            <p>Vous prenez le volant ? Dites-nous où vous allez !</p>
                            <p>Ensemble, permettons à des millions de personnes de se déplacer.</p>
                            <button>Proposer un Trajet</button>
                        </div>
                    </div>
                
                </div>
                
                
            </div>
        )
    }
}

export default Home;