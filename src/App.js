import './App.css';
import React, { Component } from 'react';
import CitiBike from './components/CitiBike';
import axios from 'axios';
var GtfsRealtimeBindings = require('gtfs-realtime-bindings');

// async function decodeGtfs() {
//   const mtaRes = await axios.get(
//     'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs',
//     {
//       headers: { 'x-api-key': process.env.REACT_APP_MTA_API_KEY },
//     }
//   );
//   let feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
//     mtaRes.data
//   );
// }

class App extends Component {
  state = {
    stations: { properties: { station: { bikes_available: '' } } },
    stationName: '9 Ave & W 45 St',
    found: false,
    feed: [],
    i: 0,
  };

  async componentDidMount() {
    //call citibike api, store into citiRes
    const citiRes = await axios.get(
      'https://layer.bicyclesharing.net/map/v1/nyc/map-inventory'
    );

    const mtaRes = await axios.get(
      'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace',
      {
        headers: { 'x-api-key': process.env.REACT_APP_MTA_API_KEY },
      }
    );

    let int8 = new Uint8Array(mtaRes.data);

    let feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(int8);

    feed.entity.forEach(function (entity) {
      if (entity.trip_update) {
        console.log(entity.trip_update);
      }
    });

    // let feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
    //   mtaRes.data
    // );

    // this.setState({
    //   feed: GtfsRealtimeBindings.FeedMessage.decode(mtaRes.data),
    // });

    //while loop to match the station name to the corresponding station in the json file
    //todo: refactor this so we dont have to search for the station everytime it runs
    while (this.state.found === false) {
      if (
        citiRes.data.features[this.state.i].properties.station.name ===
        this.state.stationName
      ) {
        this.setState({
          stations: citiRes.data.features[this.state.i],
          found: true,
        });
      } else {
        this.setState({ i: this.state.i + 1 });
      }
    }
  }

  render() {
    return (
      <div>
        <CitiBike stations={this.state.stations} />
      </div>
    );
  }
}

export default App;
