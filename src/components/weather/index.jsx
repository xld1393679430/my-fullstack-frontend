import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { initWeatherAction } from '../../actions/weatherAction';
import './index.css';

const Page = ({ ...otherProps }) => {
  const dispatch = useDispatch();
  const { weather } = useSelector((state) => state);

  const getLatestWeather = () => {
    dispatch(initWeatherAction());
  };

  useEffect(() => {
    if (!weather) {
      getLatestWeather();
    }
  }, [weather]);

  return (
    <>
      {weather && (
        <div {...otherProps} className={'weather-container'}>
          <div>
            <div>城市：{weather.city}</div>
            <div>天气：{weather.info}</div>
            <div>风向：{weather.direct}</div>
          </div>
          <Button type="link" className={'refresh'} onClick={getLatestWeather}>
            <span>刷新天气</span>
          </Button>
        </div>
      )}
    </>
  );
};

export default Page;
