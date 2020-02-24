import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import './registerStep1.scss';
class RegisterStep1 extends Component{
    constructor(){
        super()
        this.state = {
            err: '',
        }
    }
    render() {
        return (
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={yup.object().shape({
                    email: yup.string().email('Email is invalid').required('Email is required'),
                    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
                })}
                onSubmit={fields => {
                    let user = {
                        email: fields.email
                    }
                    axios.post('api/checkemail', user, {
                        headers: { 'Content-Type': 'application/json' }
                    }).then(res => {
                        if (!res.data.user) {
                            this.props.changestep(fields)
                        } else {
                            this.setState({
                                err: "email exisits déja"
                            })
                        }
                    })

                }}
                render={({ errors, touched }) => (
                    <Form className="register-form">
                        <p>Adresse email et mot de pass</p>
                        <div className="form-group">
                            <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} placeholder="Email.." />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            <div>{this.state.err}</div>
                        </div>
                        <div className="form-group">
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} placeholder="Mot de passe.." />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn-primary">Suivant</button>
                        </div>
                    </Form>
                )}
            />
        )
    }
}

export default RegisterStep1