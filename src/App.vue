<template>
  <div class="main">
    <Navigation  @add-city="toggleModal" @edit-city="toggleEdit"/>
    <Modal v-if="modalOpen" @close-modal="toggleModal"  :APIkey="APIkey"/>
  </div>
  <router-view :cities="cities" :edit="edit"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navigation from './components/NavigationComp.vue'
import Modal from './components/ModalNew.vue'
import axios from 'axios'
import db from './firebase/firebaseinit'
import { doc, collection, updateDoc, onSnapshot  } from "firebase/firestore"

interface City {
  city: string
  CurrentWeather: unknown
}

export default defineComponent ({
  name: 'App',
  components: {
    Navigation,
    Modal,
  },
  data() {
    return {
      APIkey: '68598196052a5d61fa2c2aff3d2784bf' as string,
      cities: [] as City[],
      modalOpen: false as boolean,
      edit: false as boolean,
    }
  },
  created() {
    this.getCityWeather()
  },
  methods: {
    async getCityWeather() {
    const collectionRef = collection(db, "cities")
      onSnapshot(collectionRef, { includeMetadataChanges: true }, (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          console.log(change)
          console.log(change.doc.metadata.hasPendingWrites)
          const docs = change.doc
          if (change.type === "added" && !change.doc.metadata.hasPendingWrites) {
            try{
              const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${docs.data().city}&appid=${this.APIkey}&units=metric`)
              const data = response.data
              const cityData : any = docs.data()
              
              const docRef = doc(db, "cities", docs.id)
              await updateDoc(docRef, { CurrentWeather: data })
              .then(() => {
                this.cities.push(cityData)
              })
            } catch (error) {
              console.error(error)
            }
          } else if (change.type === "added" && change.doc.metadata.hasPendingWrites) {
            const cityData : any = docs.data()
            this.cities.push(cityData)
          } else if (change.type === "removed") {
            this.cities = this.cities.filter(city => city.city !== docs.data().city)
          }
        })
      })
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen
    },
    toggleEdit() {
      this.edit = !this.edit
    },
    
  },
})
</script>

<style>
  * {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main {
  max-width: 1024px;
  margin: 0 auto;
}

.container {
  padding: 0 20px;
}

</style>
