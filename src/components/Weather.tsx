import { styled } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const CastleWrapper = styled('div')({
    display: 'flex',
    margin: 40,
});

const WeatherWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    border: 'solid',
    padding: 20,
});

const WeatherValue = styled('p')({
    textAlign: 'left',
});

interface WeatherResponse {
    temp: number;
    humidity: number;
    conditions: string;
    wind: number;
}

const Weather = () => {
    const [weatherResponse, setWeatherResponse] =
        useState<null | WeatherResponse>(null);

    useEffect(() => {
        axios
            .get('http://localhost:3000/weather')
            .then((response: AxiosResponse) => {
                setWeatherResponse(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return weatherResponse !== null ? (
        <CastleWrapper>
            <img
                src={`${window.location.href
                    .replace('orders', '')
                    .replace('login', '')}/CASTLE.png`}
                alt="Castle"
            />
            <WeatherWrapper>
                <h2>Weather at the Abbey</h2>
                <WeatherValue>{`Temp: ${weatherResponse.temp}`}</WeatherValue>
                <WeatherValue>{`Humidity: ${weatherResponse.humidity}`}</WeatherValue>
                <WeatherValue>{`Conditions: ${weatherResponse.conditions}`}</WeatherValue>
                <WeatherValue>{`Wind: ${weatherResponse.wind}`}</WeatherValue>
            </WeatherWrapper>
        </CastleWrapper>
    ) : (
        <WeatherWrapper>no weather</WeatherWrapper>
    );
};

export default Weather;
