import { message } from 'antd';
import weatherServer from '../services/weather';

export const initWeatherAction = () => {
    return async (dispatch) => {
        const data = await weatherServer.getWeather();
        let weather = {
            city: '上海',
            info: '暂无',
            direct: '暂无',
        };
        if (data.reason) {
            message.warn(data.reason);
        } else if (data.result) {
            const { city, realtime: { info, direct }, } = data.result;
            weather =  {
                city,
                info,
                direct,
            };
        }
        dispatch({
            type: 'INIT_WEATHER',
            data: weather
        });
    };
};