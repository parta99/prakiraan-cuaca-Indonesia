<template>
 <section id="data_cuaca_0">
  <div class="container">
    <div class="row">
      <div class=" mx-2 my-8 lg:my-48">
        <h1 class=" font-bold"> Prakiraan Cuaca Indonesia</h1>
        <p class="font-semibold"><a href="https://data.bmkg.go.id/prakiraan-cuaca/" target="_blank" rel="noopener">BMKG</a> (Badan Meteorologi, Klimatologi, dan Geofisika) sebagai sumber data</p>
        <table>
          <thead>
            <tr>
              <th>Provinsi</th>
              <th>Kota</th>
              <th>Tanggal</th>
              <th>Temperatur</th>
              <th>Weather Day</th>
              <th>Weather Night</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ item.provinsi }}</td>
              <td>{{ item.kota }}</td>
              <td>{{ formatDate(item.parameter[1].date) }}</td>
              <td>{{ item.parameter[1].temp_min + "&#8451;" }} - {{ item.parameter[1].temp_max + "&#8451;" }}</td>
              <td>{{ getWeatherText(item.parameter[1].weather_day) }}</td>
              <td>{{ getWeatherText(item.parameter[1].weather_night) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
 </section>
</template>


<script >
import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return {
      items: [],
      
    }
  },
  mounted() {
    axios.get('./src/data/weather.json')
      .then(response => {
        this.items = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    formatDate(date) {
      return moment(date, "YYYYMMDD").format("DD MMMM YYYY")
    },
    getWeatherText(weatherCode) {
      const weatherTexts = {
        0: 'Cerah / Clear Skies',
        1: 'Cerah Berawan / Partly Cloudy',
        2: 'Cerah Berawan / Partly Cloudy',
        3: 'Berawan / Mostly Cloudy',
        4: 'Berawan Tebal / Overcast',
        5: 'Udara Kabur / Haze',
        10: 'Asap / Smoke',
        45: 'Kabut / Fog',
        60: 'Hujan Ringan / Light Rain',
        61: 'Hujan Sedang / Rain',
        63: 'Hujan Lebat / Heavy Rain',
        80: 'Hujan Lokal / Isolated Shower',
        95: 'Hujan Petir / Severe Thunderstorm',
        97: 'Hujan Petir / Severe Thunderstorm'
      }
      return weatherTexts[weatherCode] || ''
    }
  }
}
</script>

  