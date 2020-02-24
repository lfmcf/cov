import React, { Component } from 'react'
import './login.scss';
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { Redirect} from 'react-router-dom';
import cookies from '../assests/helpers/cookies';


class Login extends Component {

    state = {
        isLoading: false,
        redirecting: false
    }

    responseFacebook = response => {
        this.setState({
            isLoading: true
        });
        const user = {
            nom: response.first_name,
            prenom: response.last_name,
            email: response.email,
            picture: response.picture.data.url
        };
        axios.post("api/facebook/callback", user, {
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            cookies.set('token', res.data.token);
            this.props.updateUser(res.data.token);
            this.setState({
                redirecting: true
            })
        });
    };


    render() {
        const token = cookies.get('token')
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirecting } = this.state
        if (redirecting === true || token) {
            return (<Redirect to={from} />)
        }
        return (
            <div className="login-container">
                <div className="login-container-wraper">
                    
                    <p className='title'>Connectez vous :</p>
                    <div className="login-email">
                        <Formik initialValues={{ email: "", password: "" }}
                            validationSchema={yup.object().shape({
                                email: yup.string().email("Email is invalid").required("Email is required"),
                                password: yup.string().min(3, "password must be at least 3 characters").required("password is required")
                            })}
                            onSubmit={fields => {
                                this.setState({
                                    isLoading: true,
                                });
                                axios.post("api/login", fields, {
                                    headers: { "Content-Type": "application/json" }
                                }).then(res => {
                                    if (res.data.token) {
                                        cookies.set('token', res.data.token);
                                        this.props.updateUser(res.data.token);
                                        this.setState({
                                            redirecting: true
                                        })
                                    } else {
                                        this.setState({
                                            errors: "le mot de passe ou l'email n'est pas correct",
                                            isLoading: false
                                        });
                                    }
                                }).catch(err => {
                                    this.setState({
                                        isLoading: false
                                    });
                                });
                            }}
                            render={({ errors, touched }) => (
                                <Form className="login_email_form" id="formlog"> 
                                    <div className="form-group">
                                        <Field name="email" type="email" className={"form-control" + (errors.email && touched.email ? " is-invalid" : "")} placeholder="email.." />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <Field name="password" type="password" className={"form-control" + (errors.password && touched.password ? " is-invalid" : "")} placeholder="password.." />
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </div>
                                    <button type="submit" className="login_email_button">
                                        {this.state.isLoading ? "Processing..." : "Se connceter"}
                                    </button>
                                    {this.state.errors}
                                </Form>
                            )}
                        />
                        
                    </div>

                   

                    <div className="face-para">
                        <p>Ou connctez vous avec Facebook</p>
                    </div>
                    <div className="login-facebook">
                        <FacebookLogin
                            appId="528138001031438"
                            autoLoad={false}
                            fields="first_name,last_name,email,picture"
                            callback={this.responseFacebook}
                            render={renderProps => (
                                <button className="loginBtn conncet-facebook" onClick={renderProps.onClick}>
                                    <i className="fab fa-facebook-f"></i>
                                    {this.state.isLoading ? "Processing..." : "Se connceter avec Facebook"}
                                </button>
                            )}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;