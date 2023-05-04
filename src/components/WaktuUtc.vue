<template>
    <div>
        <p>UTC Time :<span> {{ utcTime }} </span></p>
      <p>Current time in your timezone :<span> {{ currentTime }} </span></p>
    </div>
  </template>
  
  <script>
  import moment from 'moment-timezone';
  
  export default {
    data() {
      return {
        currentTime: '',
        utcTime:'',
      }
    },
    mounted() {
      const timezone = moment.tz.guess(); // Mendapatkan zona waktu pengguna
      this.updateTime(timezone); // Menampilkan waktu awal
  
      // Memperbarui waktu setiap 1 detik
      setInterval(() => {
        this.updateTime(timezone);
      }, 1000);
    },
    methods: {
      updateTime(timezone) {
        this.currentTime = moment().tz(timezone).format('DD MMMM YYYY HH:mm:ss Z');
        this.utcTime = moment.utc().format('DD MMMM YYYY HH:mm:ss z');
      },
    },
  }
  </script>
  
<style scoped>

p{
    display: flex;
    padding-left: 1rem;
    padding: 0rem 1rem 0rem 1rem;
}
span{
    padding-left: 0.375rem;
    color: aqua;
    border-radius: 0.375rem;
}
</style>
  