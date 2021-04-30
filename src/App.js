import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Hourly from "./HourlyWeather.js"
import HourlyWeather from './HourlyWeather.js';
import DailyWeather from './DailyWeather';

import Tab from '@material-ui/core/Tab';
import { AppBar, Tabs } from '@material-ui/core';
const API_KEY = process.env.REACT_APP_api_key;
let zipcodes = require('zipcodes')



function App() {

  const [location, setLocation] = useState("");
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [weather, setWeather] = useState([]);
  const [tab, setTab] = useState('1');

  const getWeather = (url) => {
    fetch(url).then((resp) => { return resp.json() }).then((obj) => { if (obj.cod === '404') { setWeather("Invalid Input") } else { setWeather(obj) } });
  }

  const onClick = () => {
    setIsDisplayed(true);

    let curZip = zipcodes.lookup(location);

    console.log(curZip)
    if (curZip != null) {
      const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
      url.searchParams.append("appid", API_KEY);
      url.searchParams.append('lat', curZip.latitude);
      url.searchParams.append('lon', curZip.longitude)
      url.searchParams.append('units', 'imperial');

      getWeather(url);

      setLocation(curZip.city + ", " + curZip.state)
    } else {
      setLocation("invalid input, try again")
    }


  }

  let d = new Date();

  let curLoc = "";
  if (isDisplayed) {
    curLoc = <h2>{location}</h2>
  }


  const displayConditionalWeather = () => {
    if (tab === '1') {
      return <HourlyWeather weather={weather} />
    } else {
      return <DailyWeather weather={weather} />
    }
  }

  const showTemp = () => {
    if (isDisplayed) {
      try {
        let icon = "http://openweathermap.org/img/wn/" + weather.current.weather[0].icon +"@2x.png"
        return <div>
          <h1>Weather Forecast for {d.toLocaleDateString()}</h1>
          <h3>{curLoc}</h3>
          <img src={icon} alt="Failed to Load"></img>
          <h3>{weather.current.weather[0].description}</h3>
          <h3>{weather.current.temp}&deg;F</h3>
          {/* <HourlyWeather weather={weather}/> */}
          <div style={{ backgroundColor: 'LightGrey', display: 'inline-block'}}>
            <Tabs value={tab} indicatorColor='seconary' centered textColor='primary' onChange={handleChange}>
              <Tab label="Hourly" value='1'></Tab>
              <Tab label="Daily" value='2'></Tab>
            </Tabs>
          </div>
          {displayConditionalWeather()}

          {/* <pre>{JSON.stringify(weather.daily, undefined, 4)}</pre> */}
        </div>
      }
      catch {
        return ""
      }
    }


  }

  const handleChange = (_, value) => {
    setTab(value)
    console.log(value)
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Weather App</h1>
      {/* <pre>{JSON.stringify(weather, undefined, 4)}</pre> */}
      <input placeholder='Enter a zipcode' onChange={event => { setLocation(event.target.value); setIsDisplayed(false) }} />
      <button onClick={onClick}>Search</button>
      {showTemp()}
    </div>
  );
}

export default App;
