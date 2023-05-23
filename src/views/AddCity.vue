<template>
  <div class="grid">
    <div class="city-link" v-for="(city, index) in cities" :key="index">
      <CityCard :city="city" :edit="edit"/>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import CityCard from '../components/CityCard.vue'

export default defineComponent ({
  name: 'AddCity',
  props: ['cities', 'edit'],
  components: {
    CityCard
  }
})
</script>

<style scoped>
  .grid {
    display: grid;
    padding-top: 81px;
    background-color: rgb(46, 45, 45);
    width: 100%;
    min-height: 100vh;

    @media (min-width: 400px) {
      grid-template-columns: repeat(2, 1fr)
    }
  }

</style>