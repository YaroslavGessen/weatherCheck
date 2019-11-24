import React from "react"
import Info from "./components/info"
import Form from "./components/form"
import Weather from "./components/Weather"
import { declareVariable } from "@babel/types";

const API_KEY = "c4246c49c6372c04d0339ea7efd24780";

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    
    if(city) {
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await api_url.json();

      var date = new Date(data.sys.sunset * 1000);
      var hours = date.getHours(); // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes(); // Seconds part from the timestamp
      var seconds = "0" + date.getSeconds();
      var sunset_date = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunset: sunset_date,
        error: undefined
      });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: "Oops, something went wrong "
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="main">
        <div className="container" > 
          <div className="row">
            <div className="col-sm-5 info">
              <Info /> 
            </div>
            <div className="col-sm-7 form">
              <Form weatherMethod={this.gettingWeather} /> 
          <Weather 
            temp={this.state.temp}
            city={this.state.city}
            country={this.state.country}
            pressure={this.state.pressure}
            sunset={this.state.sunset}
            error={this.state.error}
            /> 
                </div>
            </div>
          </div>
        </div>
        </div>
    );
  }
}

export default App;