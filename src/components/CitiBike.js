import React, { Component } from 'react';

class CitiBike extends Component {
  render() {
    return (
      <div>
        bikes available at {this.props.stations.properties.station.name} ={' '}
        {this.props.stations.properties.station.bikes_available} out of{' '}
        {this.props.stations.properties.station.capacity} last reported at{' '}
        {this.props.stations.properties.station.last_reported}
      </div>
    );
  }
}

export default CitiBike;
