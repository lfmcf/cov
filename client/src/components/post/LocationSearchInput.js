import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

class LocationSearchInput extends React.Component {
   
    render() {
        
        return (
            
            <PlacesAutocomplete value={this.props.value} onChange={(address) => {this.props.handleChange(address, this.props.what_input)}} onSelect={(address) => {this.props.handleSelect(address, this.props.what_input)}}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input {...getInputProps({placeholder: this.props.text,className: 'location-search-input',})} />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                const style = suggestion.active ? { backgroundColor: '#fafafa', cursor: 'pointer' } : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div {...getSuggestionItemProps(suggestion, {className, style})}>
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        )
    }
}

export default LocationSearchInput;