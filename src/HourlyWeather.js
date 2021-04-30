import React, {useState, useEffect} from 'react';

const API_KEY = process.env.REACT_APP_api_key;

function HourlyWeather({weather}) {
    let times = []
    let hourly = weather.hourly;
    let icons=[]
    console.log(hourly)
    for (let hour in hourly) {
        let d = new Date(hourly[hour].dt * 1000);
        times.push(d)
        icons.push('http://openweathermap.org/img/wn/' + hourly[hour].weather[0].icon + '@2x.png')
    }
    

    return(times.map((time, index) => {
        return (
          <table class='center' style={{marginLeft: "auto", marginRight: "auto"}}>
            <tr key={index}>
              <td>{time.toLocaleTimeString()}</td>
              <td>{hourly[index].temp}&deg;F</td>
              <td>{hourly[index].weather[0].description}</td>
              <td><img src={icons[index]} alt="Failed to Load"></img></td>
            </tr>
          </table>
        )
      }));
};

export default HourlyWeather;
