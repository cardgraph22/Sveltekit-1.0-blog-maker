export async function getCityData(city) {
  let lat, lon, twn, temp;
  let urlCity = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
  //  see  https://open-meteo.com/en/docs
  try {
    let resp = await fetch(urlCity);
    if(!resp.ok)throw new Error("error fetching cities")
    let response = await resp.json();
    //console.log('response', response.results[0])
    twn = response.results[0].name;
    lat = response.results[0].latitude;
    lon = response.results[0].longitude;
    let urlTemp = 'https://api.open-meteo.com/v1/forecast';
    urlTemp += `?latitude=${lat}`;
    urlTemp += `&longitude=${lon}`;
    urlTemp += '&current_weather=true';
    urlTemp += '&temperature_unit=fahrenheit';
    urlTemp += '&timezone=PST';
    resp = await fetch(urlTemp);
    if(!resp.ok)throw new Error("error fetching temperatures")
    response = await resp.json();
    temp = response.current_weather.temperature;
    //console.log('temp', temp)
    return temp;
    } catch(error) {
      console.log('getCityData, catch error', error)
    }
  }