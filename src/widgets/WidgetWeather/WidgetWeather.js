import './WidgetWeather.css';
import React, { useState, useEffect } from 'react';
import CarouselItem from '../../components/CarouselItem';

const WidgetWeather = ({ title, apiKey, latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("No weather found.");
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchWeather();
  }, [apiKey, latitude, longitude]);

  const getIcon = (description, isNight) => {
    const weatherIcons = {
      "Broken Clouds": "fa-cloud-sun",
      "Clear Sky": "fa-sun",
      "Clouds": "fa-cloud",
      "Rain": "fa-cloud-rain",
      "Light Rain": "fa-cloud-rain",
      "Moderate Rain": "fa-cloud-showers-heavy",
      "Heavy Intensity Rain": "fa-cloud-showers-heavy",
      "Snow": "fa-snowflake",
      "Scattered Clouds": "fa-cloud-sun",
      "Overcast Clouds": "fa-cloud",
      "Few Clouds": "fa-cloud",
      "Mist": "fa-smog",
      "Thunderstorm": "fa-cloud-bolt",
      "Drizzle": "fa-cloud-rain",
      "Haze": "fa-smog",
      "Dust": "fa-smog",
      "Fog": "fa-smog",
      "Sand": "fa-smog",
      "Ash": "fa-smog"
    };

    const icon = weatherIcons[description] || "fa-sun";
    return isNight ? `${icon}-moon` : icon;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const temp = weatherData?.main?.temp || "—";
  const description = weatherData?.weather?.[0]?.description || "—";
  const windSpeed = weatherData?.wind?.speed ? Math.round(weatherData.wind.speed * 3.6) : "—"; // km/h
  const gustSpeed = weatherData?.wind?.gust ? Math.round(weatherData.wind.gust * 3.6) : "—"; // km/h
  const isNight = new Date().getHours() >= 22 || new Date().getHours() <= 6;
  const formattedDescription = description.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

  return (
    <CarouselItem title={title} >
      <div className="card-body">
        <div className="row">
          <div className="col-6">
            <p className="widget-text card-text">
              <span className="float-right">
                <i className={`fa-solid ${getIcon(formattedDescription, isNight)} fa-3x`} />
              </span>
            </p>
          </div>
          <div className="col-6">
            <p className="widget-text card-text">
              <span className="widget-weather-temp-float float-left">
                <span className="vertical-align">
                  <span className="widget-subtitle">
                    <span className="widget-weather-temp-text">
                      {temp}°C
                    </span>
                  </span>
                </span>
              </span>
            </p>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-12">
            <h5 className="widget-text card-text">
              {formattedDescription}
            </h5>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-6">
            <p className="widget-text card-text">
              Wind
            </p>
          </div>
          <div className="col-6">
            <p className="widget-text card-text">
              Gusts
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <p className="widget-text card-text">
              {windSpeed} km/h
            </p>
          </div>
          <div className="col-6">
            <p className="widget-text card-text">
              {gustSpeed} km/h
            </p>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
};

export default WidgetWeather;
