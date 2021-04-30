import React, {useState, useEffect} from 'react';

const API_KEY = process.env.REACT_APP_api_key;

function DailyWeather({weather}) {
    let days = []
    let daily = weather.daily;
    let icons=[]
    console.log(daily[0]);
    for (let day in daily) {
        let d = new Date(daily[day].dt * 1000);
        days.push(d)
        icons.push('http://openweathermap.org/img/wn/' + daily[day].weather[0].icon + '@2x.png')
    }
    
    return(days.map((day, index) => {
        return (
          <table class='center' style={{marginLeft: "auto", marginRight: "auto"}}>
            <tr key={index}>
              <td>{day.toLocaleDateString()}</td>
              <td>{daily[index].temp.max}&deg;F / {daily[index].temp.min}&deg;F</td>
              <td>{daily[index].weather[0].description}</td>
              <td><img src={icons[index]} alt="Failed to Load"></img></td>
            </tr>
          </table>
        )
      }));
};

export default DailyWeather;
