<template>
    <form id="search" class=" text-white px-4 py-3 border-spacing-2">
        <input name="query" placeholder="Cari Kota atau Provinsi" class=" bg-white rounded-md px-4" v-model="searchQuery">
    </form>
    <div class=" min-w-full w-auto">
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
          <tr v-for="(data, index) in filteredData" :key="index">
            <td>{{ data.provinsi }}</td>
            <td>{{ data.kota }}</td>
            <td>{{ formatDate(data.parameter[0].date) }}</td>
            <td>{{ getTemperature(data.parameter[0].temp_min, data.parameter[0].temp_max) }}</td>
            <td>{{ getWeather(data.parameter[0].weather_day) }}</td>
            <td>{{ getWeather(data.parameter[0].weather_night) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
<script>
    import { defineComponent } from 'vue'
//   import DemoGrid from './Grid.vue'
  import moment from 'moment'
  import { ref, computed } from 'vue'
  import axios from 'axios'
  
  export default defineComponent ({
    setup() {
      const searchQuery = ref('')
      const jsonData = ref([])
  
      axios.get('./src/data/weather.json')
        .then(response => jsonData.value = response.data)
        .catch(error => console.log(error))
  
      const filteredData = computed(() => {
        if (!jsonData.value) return []
  
        return jsonData.value.filter(data => {
          const searchRegex = new RegExp(searchQuery.value, 'i')
          return searchRegex.test(data.provinsi) || searchRegex.test(data.kota)
        })
      })

      function formatDate(date) {
       return moment(date, "YYYYMMDD").format("DD MMMM YYYY")
     }
  
      function getTemperature(temp_min, temp_max) {
        return `${temp_min}°C - ${temp_max}°C`
      }
  
      function getWeather(weather) {
        switch (weather) {
          case '0':
            return 'Cerah / Clear Skies'
          case '1':
            return 'Cerah Berawan / Partly Cloudy'
          case '2':
            return 'Cerah Berawan / Partly Cloudy'
          case '3':
            return 'Berawan / Mostly Cloudy'
          case '4':
            return 'Berawan Tebal / Overcast'
          case '5':
            return 'Udara Kabur / Haze'
          case '10':
            return 'Asap / Smoke'
          case '45':
            return 'Kabut / Fog'
          case '60':
            return 'Hujan Ringan / Light Rain'
          case '61':
            return 'Hujan Sedang / Rain'
          case '63':
            return 'Hujan Lebat / Heavy Rain'
          case '80':
            return 'Hujan Lokal / Isolated Shower'
          case '95':
            return 'Hujan Petir / Severe Thunderstorm'
          case '97':
            return 'Hujan Petir / Severe Thunderstorm'
          default:
            return '-'
        }
      }
  
      return {
        searchQuery,
        filteredData,
        formatDate,
        getTemperature,
        getWeather
      }
    }
  });
</script>
