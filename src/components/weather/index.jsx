import React, { useEffect, useState } from 'react';
import http from '../../services/http';
import './index.css';

const Page = ({ ...otherProps }) => {
    const [weather, setWeather] = useState({});

    useEffect(() => {
        http.get('/api/weather').then(res => {
            if (res.data && res.data.result) {
                const { city, realtime: { info, direct }, } = res.data.result;
                setWeather(() => {
                   return {
                    city,
                    info,
                    direct,
                   };
                });
            }
        });
    }, []);

    return (
        <div {...otherProps} className={'weather-container'}>
            <div>{weather.city}</div>
            <div>{weather.info}</div>
            <div>{weather.direct}</div>
        </div>
    );
};

export default Page;