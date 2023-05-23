<template>
    <div>
        <div class="city">
            <font-awesome-icon v-if="edit" @click="removeCity" icon="fa-solid fa-trash-can" class="edit" ref="edit"/>
            <span>{{ cityName }} | {{ country }}</span>
            <div class="weather">
                <span>{{ Math.round(temperature) }}&deg;</span>
                <img :src="getImageUrl" alt="Weather Icon">
                <span class="description">{{ weatherDescription }}</span>
            </div>
            <div class="video">
                <video autoplay loop muted 
                :src="require(`../assets/videos/${icon}.mp4`)"
                ></video>
                <div class="bg-overlay"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import db from '../firebase/firebaseinit'
import { collection, query, where, getDocs, doc, deleteDoc  } from "firebase/firestore"

export default defineComponent ({
  name: 'CityCard',
  props: ['city', 'edit'],
  data() {
    return {
        cityName: this.city.city as string,
        country: this.city.CurrentWeather.sys.country as string,
        temperature: this.city.CurrentWeather.main.temp as number,
        icon: this.city.CurrentWeather.weather[0].icon as string,
        weatherDescription: this.city.CurrentWeather.weather[0].description as string,
        baseURL: 'https://openweathermap.org/img/wn/' as string,
        id: '' as string,
    }
  },
  computed: {
    getImageUrl() : string {
      return this.baseURL + this.icon + '.png'
    },
  },
  methods: {
    async removeCity() {
        const q = query(collection(db, "cities"), where("city", "==", `${this.cityName}`))

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            this.id = doc.id
        })
        await deleteDoc(doc(db, "cities", this.id))
    }
  }
})
</script>

<style scoped>

.city {
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 20px;
    flex-basis: 50%;
    min-height: 250px;
    color: aliceblue;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
}

.edit {
    border-radius: 0px 15px 0 0;
    border: 10px solid rgb(77, 77, 77);
    background-color: rgb(77, 77, 77);
    z-index: 1;
    font-size: 20px;
    position: absolute;
    bottom: 0px;
    left: 0px;
}

span {
    z-index: 1;
    text-transform: capitalize;
    display: block;
    font-size: 25px;
    font-weight: 600;
}

.description {
    font-size: 20px !important;
}

.weather {
    display: flex;
    z-index: 1;
    justify-content: flex-end;
    align-items: flex-end;
    flex: 1;
}

.weather span {
    font-size: 35px;
    margin-right: 8px;
}

.video {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

video {
    height: 100%;
    @media (min-width: 900px) {
        height: 100%;
        width: 100%;
    }
}

.bg-overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.2);
}

</style>