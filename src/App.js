import React,{Component} from 'react';
import ReactMapGL, {Marker,Popup} from "react-map-gl";
import './App.css';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      viewport: {
        width: '100vw',
        height: '100vh',
        latitude: 25.74233304264988,
        longitude: -80.25408198633106,
        zoom: 8
      },
      hospitals:[],
      selectedHospital:null,
      showHospitals:null
    };
  }


  async componentDidMount() {
    let response = await fetch('http://localhost:5000/surgerycenters')
    let myJson = await response.json()
    this.setState({hospitals:myJson, showHospitals:true})
  }

  render(){
    return (
      <div className="App">
        <ReactMapGL {...this.state.viewport}{...this.state.hospitals}
        mapboxApiAccessToken={"pk.eyJ1IjoiZWRpc29udG9vbGUiLCJhIjoiY2pncXdnajM2MGg2ejJ4cGUzdW92bDNzcCJ9.YG4_JLO78bqmlpBcLHzuWw"}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapStyle = "mapbox://styles/edisontoole/cjzcqcbwh2eml1co2qsla3bbt"
        onClick={()=>{
          console.log("click")
          this.setState({selectedHospital:null,showHospitals:!this.state.showHospitals})
        }}>
        {this.state.showHospitals ? (
          this.state.hospitals.map((hospital)=>(
            <Marker key={hospital.FacilID} latitude={parseFloat(hospital.latitude)} longitude={parseFloat(hospital.longitude)}>
            <button onClick={async(e) => {
              e.preventDefault()
              await this.setState({selectedHospital:hospital})
              console.log(this.state.selectedHospital)
            }}>
            ^
            </button>
            </Marker>
          ))
        ):null}
        {this.state.selectedHospital ? (
          <Popup latitude={parseFloat(this.state.selectedHospital.latitude)}
           longitude={parseFloat(this.state.selectedHospital.longitude)}
           onClose={()=>{this.setState({selectedHospital: null})}}>
            <h4>
            {this.state.selectedHospital.Name}
            </h4>
            <div>
            Address: {this.state.selectedHospital.address}
            </div>
            <div>
            Phone: {this.state.selectedHospital.phonenumber}
            </div>
            <div>
            Lat,lng: {this.state.selectedHospital.latitude},
            {this.state.selectedHospital.longitude}
            </div>
          </Popup>
        ):null}
        </ReactMapGL>
      </div>
    )
  }
}

export default App;
