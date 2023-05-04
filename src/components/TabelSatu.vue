<script setup>
import JudulItem from './JudulItem.vue'
import TabelItem from './TabelItemSatu.vue'
import WaktuUtc from './WaktuUtc.vue';
</script>

<template>
    <JudulItem>
        <template #heading>Prakiraan Cuaca Indonesia</template>
        <a href="https://data.bmkg.go.id/prakiraan-cuaca/" target="_blank" rel="noopener">BMKG</a> 
        <template #paragraf> (Badan Meteorologi, Klimatologi, dan Geofisika) sebagai sumber data.</template>     
    </JudulItem>
    <WaktuUtc />
    <TabelItem/>
</template>
