import React, { Component } from 'react'
import './recherch.scss';
import moment from 'moment';
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.css';
import axios from 'axios'

class Recherche extends Component {
    state = {
        from: '',
        to: '',
        moment: moment()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleDateChange = (moment) => {
        this.setState({
            moment,
            data: '',
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.showLoader()
        let post = {
            from: this.state.from,
            to: this.state.to,
            date: this.state.moment.format("YYYY-MM-DD HH:mm:ss")
        }
        axios.post('api/search', post, {headers: {'Content-Type': 'application/json'}}).then(res => {
            this.props.hideLoader()
            this.props.history.push({
                pathname : 'show',
                state: { data: res.data.psts, prevPath: this.props.location.pathname }
            })    
        })
    }

    render() {
        
        const shortcuts = {
            'Today': moment(),
            'Tomorrow': moment().add(1, 'days'),
        };
        const str = 'YYYY-MM-DD HH:mm';
        const now = moment();
        return (
            <form className="searchForm" onSubmit={this.handleSubmit}>
                <p className="title">Où voulez-vous aller ?</p>
                <div className="form-row">
                    <input type="text" name="from" placeholder="Départ" className="input" onChange={this.handleChange} />
                </div>
                <div className="form-row">
                    <input type="text" name="to" placeholder="Arriver" className="input" onChange={this.handleChange} />
                </div>
                <div className="form-row">
                    <DatetimePickerTrigger minDate={now} shortcuts={shortcuts} moment={this.state.moment} onChange={this.handleDateChange}>
                        <input type="text" className="input" value={this.state.moment.format(str)} readOnly />
                    </DatetimePickerTrigger>
                </div>
                <div className="form-row">
                    <button className="submitForm">chercher</button>
                </div>
            </form>

        )
    }
}

export default Recherche;