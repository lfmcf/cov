import React, { Component } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup'
import Axios from 'axios';

class RegisterStep2 extends Component{

    componentWillMount() {
        if(!localStorage.getItem('registeruser')){
            return null
        }
    }

    render(){
        
        return(
            <Formik
                initialValues={{
                    nom: '',
                    prenom: '',
                    gender: '',
                }}
                validationSchema={yup.object().shape({
                    nom: yup.string().min(3, 'nom must be at least 3 characters').required('nom is required'),
                    prenom: yup.string().min(3, 'prenom must be at least 3 characters').required('prenom is required'),
                    gender: yup.string().required('selectionner votre genre'),
                })}
                onSubmit={fields => {
                    this.props.changestep(fields).then(res =>{
                        Axios.post('api/register', res, {
                            headers: {'Content-type': 'application/json'}
                        }).then(reply =>{
                            localStorage.setItem('token', reply.data.token)
                            this.props.history.goBack()
                        })
                    })   
                }}
                render= {({errors, touched}) => (
                    <Form className="register-form">
                        <div className="form-group row">
                            <div className="col">
                                <Field component="select" name="gender"  className={'form-control' + (errors.gender && touched.gender ? ' is-invalid' : '')} >
                                    <option value="">Genre</option>
                                    <option value="Femme">Femme</option>
                                    <option value="Homme">Homme</option>
                                </Field>
                                <ErrorMessage name="gender" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-group">
                            <Field name="nom" type="text"  className={'form-control' + (errors.nom && touched.nom ? ' is-invalid' : '')} placeholder="Nom.." />
                            <ErrorMessage name="nom" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field name="prenom" type="text" className={'form-control' + (errors.prenom && touched.prenom ? ' is-invalid' : '')} placeholder="Prénom.." />
                            <ErrorMessage name="prenom" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Register</button>
                        </div>
                    </Form>
                )}
            />
        )
        
    }
}

export default RegisterStep2