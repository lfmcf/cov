import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import axios from 'axios'
import './register.scss';
import { Link } from 'react-router-dom';

class RegisterOption extends Component {
    
    state = {
        displayForm: false
    }
    
    responseFacebook = (response) => {
        
        const user = {
            nom: response.first_name,
            prenom: response.last_name,
            email: response.email,
            picture: response.picture.data.url
        }

        axios.post('api/facebook/callback', user, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            localStorage.setItem('token', res.data.token)
            this.props.history.goBack()
        })

    }

    handleDisplay = () => {
       this.props.history.push('register-email')
    }

    render() {
        
        return (
            <div className="register-container">
                <p className="title">Je crée mon compte :</p>
                <div className="options">
                    <div className="option-column" onClick={this.handleDisplay}>
                        <div className="option-para">
                            <p>Avec Email</p>
                        </div>
                        <div className="arrowangle">
                            <i className="fas fa-angle-right"></i>
                        </div>
                    </div>
                    <div className="line-break"></div>
                    <FacebookLogin
                        appId="528138001031438"
                        autoLoad={false}
                        fields="first_name,last_name,email,picture"
                        callback={this.responseFacebook}
                        render={renderProps => (<div className="option-column" onClick={renderProps.onClick}>
                            <div className="option-para">
                                <p>Avec Facebook</p>
                            </div>
                            <div className="arrowangle">
                                <i className="fab fa-facebook-f fb"></i>
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </div>)}
                    />
                    <div className="membre">
                        <p >Vous etes deja un membre : <Link to='/login'>connctez-vous</Link></p>
                    </div>
                    
                </div>
                
            </div>
        )
    }
}

export default RegisterOption