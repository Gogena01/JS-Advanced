function attachEvents() {
    document.getElementById('submit').addEventListener('click', getForecast);

}

async function getForecast(name) {
    name = document.querySelector('#location').value;
    const code = await getForecastname(name);

    const [current, upcoming] = await Promise.all([
        getcurrent(code),
        getupcoming(code)
    ]);


    document.getElementById('forecast').style.display = 'block';
    const currVALUE = document.getElementById('current');
    const upcomValue = document.getElementById('upcoming');


    const div = document.createElement('span');
    div.className = 'forecasts';

    div.innerHTML = `
    <span class="condition symbol">&#x2600;</span>
    <span class="condition">
        <span class="forecast-data">${current.name}</span>
        <span class="forecast-data">${current.forecast.low + "&#176;" + `/` + current.forecast.high + '&#176;'}</span>
        <span class="forecast-data">${current.forecast.condition}</span>
    `


    const div2 = document.createElement('div')
    div2.className = 'forecast-info';

    upcoming.forecast.forEach(f => {
        div2.innerHTML += `
        <span class="upcoming">
           <span class="symbol">&#x26C5;</span>
           <span class="forecast-data">${f.low + "&#176;" + '/' + f.high + "&#176;"}</span>
           <span class="forecast-data">${f.condition}</span>
        </span>`

    })

    upcomValue.appendChild(div2)

    currVALUE.appendChild(div);
}

async function getForecastname(name) {
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';
    const res = await fetch(url);
    const data = await res.json();

    const location = data.find(l => l.name == name)

    return location.code
}

async function getcurrent(code) {
    const url = `http://localhost:3030/jsonstore/forecaster/today/` + code
    const res = await fetch(url);
    const data = await res.json();

    return data;
}

async function getupcoming(code) {
    const url = `http://localhost:3030/jsonstore/forecaster/upcoming/` + code;
    const res = await fetch(url);
    const data = await res.json();

    return data
}


attachEvents();