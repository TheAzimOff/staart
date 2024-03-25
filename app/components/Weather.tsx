"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { IoChevronDownOutline } from "react-icons/io5";
import Swal from "sweetalert2/src/sweetalert2.js";
import withReactContent from "sweetalert2-react-content";
import CitySelectButtons from "./CitySelectButtons";

type WeatherObject = {
  temp: number;
  tempMax: number;
  tempMin: number;
  icon: string;
  description: string;
};

export type cityObject = {
  country: string;
  name: string;
  lat: number;
  lon: number;
  state?: string;
};

const Weather = () => {
  const MySwal = withReactContent(Swal);
  const [city, setCity] = useState("");
  const [weatherDetails, setWeatherDetails] = useState<WeatherObject>({
    temp: 0,
    tempMax: 0,
    tempMin: 0,
    description: "",
    icon: "01d",
  });

  useEffect(() => {
    let coordinates: { lon: number; lat: number } = JSON.parse(
      localStorage.getItem("cityCoordinates")!,
    );
    let city = localStorage.getItem("city");
    if (city) setCity(city);

    if (coordinates) fetchWeather(coordinates.lon, coordinates.lat);
  }, []);
  function fetchWeather(lon: number, lat: number) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_KEY}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const weatherData: WeatherObject = {
          description: data.weather[0].main,
          icon: data.weather[0].icon,
          temp: Math.floor(data.main.temp),
          tempMax: Math.floor(data.main.temp_max),
          tempMin: Math.floor(data.main.temp_min),
        };
        setWeatherDetails(weatherData);
      })
      .catch((e) => {
        console.log(
          "There was a problem with the fetch operation: " + e.message,
        );
      });
  }
  async function fetchCitiesList(cityInput: string) {
    try {
      const geocodeapiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_KEY}`;
      const response = await fetch(geocodeapiUrl);
      if (!response.ok) {
        return Swal.showValidationMessage(`
            ${JSON.stringify(await response.json())}
          `);
      }
      return response.json();
    } catch (error) {
      MySwal.showValidationMessage(`
          Request failed: ${error}
        `);
    }
  }

  function handleSelectCity({ country, name, lat, lon, state }: cityObject) {
    setCity(name + ", " + country);
    localStorage.setItem("city", name + ", " + country);
    localStorage.setItem("cityCoordinates", JSON.stringify({ lat, lon }));
    fetchWeather(lon, lat);
    Swal.close();

    const prevCities: cityObject[] = JSON.parse(
      localStorage.getItem("prevCities") || "[]",
    );
    const city: cityObject = {
      country,
      name,
      lat,
      lon,
      state,
    };
    for (let i = 0; i < prevCities.length; i++) {
      if (prevCities[i].lon == lon && prevCities[i].lat == lat) return;
    }
    prevCities.push(city);
    if (prevCities.length > 5) prevCities.shift();
    localStorage.setItem("prevCities", JSON.stringify(prevCities));
  }

  const showPopup = () => {
    const prevCities: cityObject[] = JSON.parse(
      localStorage.getItem("prevCities") || "[]",
    );
    MySwal.fire({
      backdrop: "#fff2",
      title: "Enter your city",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      html: prevCities.length > 0 && (
        <CitySelectButtons
          citiesList={prevCities}
          handleSelectCity={handleSelectCity}
        />
      ),
      showCancelButton: true,
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
      preConfirm: fetchCitiesList,
      allowOutsideClick: () => !MySwal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: `Select your city`,
          showConfirmButton: false,
          showCancelButton: true,
          html: (
            <CitySelectButtons
              citiesList={result.value}
              handleSelectCity={handleSelectCity}
            />
          ),
        });
      }
    });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="weather-icon px-8">
        <Image
          src={`/icons/${weatherDetails.icon}.svg`}
          alt={weatherDetails.description}
          width={125}
          height={125}
        />
      </div>
      <div className=" details flex flex-col">
        <div className="top flex items-center justify-between pb-4">
          <div className="city-name whitespace-nowrap text-2xl font-semibold uppercase">
            {city}
          </div>
          <div onClick={showPopup} className="flex cursor-pointer ">
            <FiMapPin />
            <IoChevronDownOutline />
          </div>
        </div>
        <div className="temp">
          <span className='relative text-5xl after:absolute after:top-0 after:text-2xl after:content-["°"] '>
            {weatherDetails.temp}
          </span>
          <span className="text-lg uppercase">
            {weatherDetails.description}
          </span>
          <span className="pl-4">
            {weatherDetails.tempMin}°/{weatherDetails.tempMax}°
          </span>
        </div>
      </div>
    </div>
  );
};

export default Weather;
