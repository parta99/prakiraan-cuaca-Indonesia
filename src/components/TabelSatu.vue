<script setup>
import JudulItem from './JudulItem.vue'
import TabelItem from './TabelItemSatu.vue'
</script>

<template>
    <JudulItem>
        <template #heading>Prakiraan Cuaca Indonesia</template>
        <a href="https://data.bmkg.go.id/prakiraan-cuaca/" target="_blank" rel="noopener">BMKG</a> 
        <template #paragraf> (Badan Meteorologi, Klimatologi, dan Geofisika) sebagai sumber data</template>    
        <template #h3> data di update setiap 3 hari</template>    
    </JudulItem>
    <TabelItem/>
</template>
