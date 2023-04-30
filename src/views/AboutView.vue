<script setup>
import JudulItem from '../components/JudulItem.vue'
</script>

<template>
  <main>
    <JudulItem>
          <template #heading>Prakiraan Cuaca Indonesia</template> 
          <template #paragraf>Aplikasi Cuaca Indonesia adalah sebuah aplikasi yang menampilkan informasi tentang perkiraan cuaca di berbagai kota dan provinsi di Indonesia berdasarkan data dari <a href="https://data.bmkg.go.id/prakiraan-cuaca/" target="_blank" rel="noopener">BMKG </a>  (Badan Meteorologi, Klimatologi, dan Geofisika).</template>
      </JudulItem>
      <JudulItem>
          <template #paragraf>Aplikasi ini menyajikan informasi yang akurat dan terpercaya tentang kondisi cuaca saat ini dan perkiraan cuaca beberapa hari ke depan. Informasi yang ditampilkan meliputi suhu udara, kelembaban, kecepatan angin, dan juga kondisi cuaca seperti cerah, hujan, awan, dan lain sebagainya. Dengan adanya aplikasi Cuaca Indonesia ini, masyarakat dapat dengan mudah mengakses informasi terkait kondisi cuaca dan kualitas udara di wilayah tempat tinggal mereka atau di tempat-tempat yang ingin mereka kunjungi. Aplikasi ini membantu masyarakat untuk lebih waspada dan siap menghadapi kondisi cuaca yang mungkin tidak diinginkan dan memperhatikan kesehatan dan lingkungan sekitar.</template>
      </JudulItem>
  </main>
</template>
