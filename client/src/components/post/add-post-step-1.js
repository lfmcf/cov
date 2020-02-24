import React, { Component } from 'react'
import './add-post-step-1.scss';
import moment from 'moment';
import LocationSearchInput from './LocationSearchInput';
import {geocodeByAddress} from 'react-places-autocomplete';
// import hoc_input from './hoc-input';
// import From_input from './From_input'
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.css';

class Add_post_step_1 extends Component {
   
    state = {
        addressFrom : '',
        addressTo: '',
        addressBy : '',
        latLngFrom : '',
        latLngTo : '',
        latLngBy : '',
        passBy: [],
        other: '',
        mnt: moment(),
        map: '',
        markerFrom: '',
        directionsService: '',
        directionsDisplay: '',
        markerTo: '',
        markerSteps: '',
    }

    handleAddressChange = (address, stateName) => {
        //localStorage.removeItem('post')
        
        if(stateName === "addressFrom"){
            this.state.markerFrom.setMap(null);
        }else if(stateName === "addressTo"){
            this.state.markerTo.setMap(null);
        }
        this.state.directionsDisplay.setMap(null);
        this.setState({
            [stateName]: address,
        });
        
    }

    handleChange = (address, stateName) => {
        
        this.state.markerSteps.setMap(null);
        this.state.directionsDisplay.setMap(null);
        this.setState({
            [stateName]: address,
            passBy: []
        }, this.directionfunc);
    }

    handleSelect = async (address, stateName) => {
        this.setState({ [stateName]: address});
        
        geocodeByAddress(address).then(results => {
            if(stateName === "addressFrom"){
                this.setState({ latLngFrom : results[0].formatted_address})
                this.state.markerFrom.setMap(this.state.map)
                this.state.markerFrom.setPlace({
                    placeId: results[0].place_id,
                    location: results[0].geometry.location
                })
                
            }else if(stateName === "addressTo"){
                this.setState({ latLngTo : results[0].formatted_address})
                this.state.markerTo.setMap(this.state.map)
                this.state.markerTo.setPlace({
                    placeId: results[0].place_id,
                    location: results[0].geometry.location
                })
                
            }else {
               
                this.setState({
                    passBy: [...this.state.passBy, {location: results[0].geometry.location, stopover: true,}]
                })
                //this.setState({ latLngBy : results[0].formatted_address})
                this.state.markerSteps.setMap(this.state.map)
                this.state.markerSteps.setPlace({
                    placeId: results[0].place_id,
                    location: results[0].geometry.location
                })
            }
            this.directionfunc()
        })
        .catch(error => console.error('Error', error));
        
        
    };

   

    

    loadGoogleMap = async () => {
        const map = await new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 31.8008346, lng: -7.150688 },
            zoom: 5,
            disableDefaultUI: true,
            zoomControl: true,
            fullscreenControl: true
        })
        return map;
    }

   
    directionfunc() {
        
        if(this.state.addressFrom && this.state.addressTo){
            this.state.directionsDisplay.setMap(this.state.map);
            this.state.directionsService.route({
                origin: this.state.addressFrom,
                destination: this.state.addressTo,
                waypoints: this.state.passBy,
                optimizeWaypoints: true,
                travelMode: 'DRIVING'
            }, (response, status) => {
                if (status === 'OK') {
                    this.state.directionsDisplay.setDirections(response);
                    this.setState({
                        infos: response.routes[0].legs
                    })
                }
                else {
                    console.log('Directions request failed due to ' + status);
                }
            })
        }
    }

    componentDidMount () {
        //Load the map
        this.loadGoogleMap().then(rep => {
            var map = rep;
            var directionsService = new window.google.maps.DirectionsService();
            var directionsDisplay = new window.google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
            let markerFrom = new window.google.maps.Marker({ map: map });
            let markerTo = new window.google.maps.Marker({ map: map });
            let markerSteps = new window.google.maps.Marker({ map: map });
            this.setState({
                markerFrom: markerFrom,
                markerTo: markerTo,
                markerSteps: markerSteps,
                map: map,
                directionsService: directionsService,
                directionsDisplay: directionsDisplay
            });
            let post = JSON.parse(localStorage.getItem('post'));
            
            if(post) {
                this.handleSelect(post.from, 'addressFrom').then(this.handleSelect(post.to, 'addressTo'));
                // await this.handleSelect(post.to, 'addressTo');
                // if(post.passBy){
                //     this.handleSelect(post.other, 'addressBy');
                // }
                this.setState({
                    addressFrom: post.from,
                    addressTo: post.to,
                    addressBy: post.other,
                    passBy: post.passBy,
                },this.directionfunc);
                
                
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        
        const post = {
            from: this.state.addressFrom,
            to: this.state.addressTo,
            other: this.state.addressBy,
            passBy: this.state.passBy,
            dt: this.state.mnt.format("YYYY-MM-DD HH:mm:ss"),
            infos: this.state.infos
        }
        
        localStorage.setItem('post', JSON.stringify(post))
        this.props.history.push('/post-next')
    }

    handleDateChange = (mnt) => {
        this.setState({
            mnt
        })
    }

    componentWillMount() {
        
        
    }
    
    render() {
        const shortcuts = {
            'Today': moment(),
            'Tomorrow': moment().add(1, 'days'),
        };
        const str = 'YYYY-MM-DD HH:mm';
        const now = moment();
        
        return (
            <div className="container_post">
                <h3>Publier une annonce</h3>
                <h3>Votre itinéraire</h3>
                <div className="post_step_1_form">
                    <div className="column">
                        <p className="pt">Itinéraire</p>
                        <form id="post_first_step" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="form-label">
                                    <label>Départ</label>
                                </div>
                                <LocationSearchInput value={this.state.addressFrom} text="Départ" handleChange={this.handleAddressChange} handleSelect={this.handleSelect} what_input='addressFrom' />
                            </div>
                            <div className="form-group">
                                <div className="form-label">
                                    <label>Arriver</label>
                                </div>
                                <LocationSearchInput value={this.state.addressTo} text="Arriver" handleChange={this.handleAddressChange} handleSelect={this.handleSelect} what_input='addressTo' />
                            </div>
                            <div className="form-group">
                                <div className="form-label">
                                    <label>Etape</label>
                                </div>
                                <LocationSearchInput value={this.state.addressBy} text="Passer par" handleChange={this.handleChange} handleSelect={this.handleSelect} what_input='addressBy' />
                            </div>
                            <div className="form-group">
                                <div className="form-label">
                                    <label>Date et horaires</label>
                                </div>
                                <DatetimePickerTrigger minDate={now} shortcuts={shortcuts} moment={this.state.mnt} onChange={this.handleDateChange}>
                                    <input type="text" className="form-control" value={this.state.mnt.format(str)} readOnly />
                                </DatetimePickerTrigger>
                            </div>
                        </form>
                    </div>
                    <div className="column">
                        <p className="pt">Précisions concernant le trajet</p>
                        <div className="map"><div id="map"></div> </div>
                    </div>
                </div>
                <div style={{textAlign:'center'}}>
                    <button className="nextButton" type="submit" onClick={this.handleSubmit}>Suivant</button>
                </div>
            </div>
        )
    }
}

export default Add_post_step_1;