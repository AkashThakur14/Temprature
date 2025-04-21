import React, { useState, useEffect } from "react";

export const Tempapp = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Pathankot");

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=b4ac073fba150e654cb1f77a10ff52c7`;
      const response = await fetch(url);
      const resJson = await response.json();
      
      // Check response
      if (resJson.main) {
        setCity(resJson.main);
      } else {
        setCity(null);
      }
    };

    fetchApi();
  }, [search]);

  //weather icon
  const getWeatherIcon = () => {
    if (!city) return null;
    const tempCelsius = city.temp - 273.15;
    return tempCelsius >= 25 ? "☀️" : "☁️";
  };

  return (
    <>
      <div className="box">
        <div className="inputData">
          <input
            type="search"
            className="inputField"
            placeholder="Search..."
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>

        {!city ? (
          <p>No Data Found</p>
        ) : (
          <div className="information">
            <h1 className="location">
              <i className="fa-solid fa-street-view"></i> {search}
            </h1>
            <h2 className="temp">{(city.temp - 273.15).toFixed(2)}°C {getWeatherIcon()}</h2>
            <h3 className="tempminmax">
              Min: {(city.temp_min - 273.15).toFixed(2)}°C | Max: {(city.temp_max - 273.15).toFixed(2)}°C
            </h3>
          </div>
        )}
      </div>
    </>
  );
};
