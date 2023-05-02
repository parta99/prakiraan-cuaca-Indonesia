<template>
    <form id="search" class=" text-gray-700  px-4 py-3 border-spacing-2">
        <input name="query" placeholder="Cari Kota atau Provinsi" class=" bg-white rounded-md px-4" v-model="searchQuery">
    </form>
    <div class=" min-w-full w-auto">
      <table v-if="filteredData.length > 0">
        <thead>
          <tr>
          <th v-for="column in columns" :key="column">{{ column }}</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in paginatedData" :key="index">
            <td>{{ data.provinsi }}</td>
            <td>{{ data.kota }}</td>
            <td>{{ formatDate(data.parameter[2].date) }}</td>
            <td>{{ getTemperature(data.parameter[2].temp_min, data.parameter[2].temp_max) }}</td>
            <td>{{ getWeather(data.parameter[2].weather_day) }}</td>
            <td>{{ getWeather(data.parameter[2].weather_night) }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else class="pesan">
      Data tidak ditemukan.
    </div>
    <div class="paginated">
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <!-- Add First and Last page buttons -->
          <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
            <button class="page-link" @click="currentPage > 1 && currentPage--"><IconPrevious /></button>
          </li>
          <li v-if="paginationLinks[0] > 1">
            <button class="page-link" @click="currentPage = 1">1</button>
          </li>
          <li v-if="paginationLinks[0] > 2">...</li>

          <li v-for="n in paginationLinks" :key="n" class="page-item" :class="{ 'active': currentPage === n }">
            <button class="page-link" @click="currentPage = n">{{ n }}</button>
          </li>

          <li v-if="paginationLinks[paginationLinks.length - 1] < totalPages.valueOf - 1">...</li>
          <!-- Add First and Last page buttons -->
          <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
            <button class="page-link" @click="currentPage < totalPages && currentPage++"><IconNext /></button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
import IconPrevious from './icons/IconPrevious.vue'
import IconNext from './icons/IconNext.vue'
import { defineComponent } from 'vue'
import DemoGrid from './Grid.vue'
import moment from 'moment'
import { ref, computed } from 'vue'
import axios from 'axios'

export default defineComponent ({
  name: 'TabelCuaca',
  components: { IconPrevious, IconNext },
  setup() {
    const searchQuery = ref('')
    const perPage = ref(8)
    const currentPage = ref(1)
    const columns = ['Provinsi', 'Kota', 'Tanggal', 'Suhu', 'Cuaca Siang', 'Cuaca Malam']
    const jsonData = ref([])

    axios.get('./data/weather.json')
    // axios.get('https://api-cuaca-bmkg.netlify.app/data/weather.json')
      .then(response => jsonData.value = response.data)
      .catch(error => console.log(error))
  
    const filteredData = computed(() => {
      if (!jsonData.value) return []

      return jsonData.value.filter(data => {
        const searchRegex = new RegExp(searchQuery.value, 'i')
        return searchRegex.test(data.provinsi) || searchRegex.test(data.kota)
      })
    })
    const sortedData = computed(() => {
      if (!filteredData.value) return []

      return filteredData.value.slice().sort((a, b) => {
        return a.parameter[0].temp_max - b.parameter[0].temp_max
      })
    })
    const paginatedData = computed(() => {
      if (!sortedData.value) return []

      const start = (currentPage.value - 1) * perPage.value
      const end = start + perPage.value
      return sortedData.value.slice(start, end)
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredData.value.length / perPage.value)
    })

    const paginationLinks = computed(() => {
      let start = Math.max(currentPage.value - 2, 1)
      let end = Math.min(start + 4, totalPages.value)

      if (start <= 2) {
        end = Math.min(5, totalPages.value)
      } else if (totalPages.value - end <= 2) {
        start = Math.max(totalPages.value - 4, 1)
        // end = totalPages.value
      }

      const arr = []
      for (let i = start; i <= end; i++) {
        arr.push(i)
      }

      if (totalPages.value > 5 && paginationLinks[0] > 2) {
      arr.unshift(1)
      }
      if (totalPages.value > 5 && paginationLinks[paginationLinks.length - 1] < totalPages.value - 1) {
        arr.push(totalPages.value)
      }
      if (!arr.includes(totalPages.value)) {
        arr.push(totalPages.value)
      }
      
      return arr
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
    // function capitalize(str) {
    //   return str.charAt(0).toUpperCase() + str.slice(1)
    // }

    return {
      searchQuery,
      filteredData,
      formatDate,
      getTemperature,
      getWeather,
      DemoGrid,
      perPage,
      currentPage,
      totalPages,
      paginatedData,
      columns,
      paginationLinks
    }
  }
});
</script>
<style scoped>
.page-item.active button {
  background-color: blue;
  color: white;
}

.pesan{
  font-weight: 700;
  padding-left: 2rem;
  color: #ff0000;
  background-color: white;
  padding: 1rem 1rem 1rem 1rem;
  border-radius: 0.25rem;
}
button{
  background-color: #374151;
  color: #f59e0b; 
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  font-weight: 700;
  border-radius: 0.25rem;
}
.paginated{
  padding-top: 2rem;
  justify-content: center;
  display: flex;
  flex-direction: row;
}
.pagination{
  display: flex;
}
/* Default table styling */
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
}
th{
  background-color: #374151;
}

th, td {
  padding: 8px;
  border: 1px solid #ddd;
}

/* Responsive table styling for mobile view */
@media (max-width: 767px) {
  table {
    display: block;
    overflow-x: auto;
  }
  th, td {
    white-space: nowrap;
  }
  th {
    background-color: #374151;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
}
</style>
