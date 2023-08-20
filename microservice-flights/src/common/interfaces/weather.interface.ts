export interface IWeather{
    id:number;
    /*weather_state_name: WheatherStateName;
    weather_state_abbr: WheatherStateName;
    wind_direction_compass: WindDirectionCompass;*/
    created: Date;
    applicable_date: Date;
    min_temp: number | null;
    max_temp: number | null;
    the_temo: number | null;
    wind_speed: number;
    wind_direction: number;
    air_pressure: number | null;
    humidity: number | null
    visibility: number | null;
    predictability: number;
}