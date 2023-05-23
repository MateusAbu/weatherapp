<template>
    <div @click="closeModal" class="modal" ref="modal">
        <div class="modal-wrap" ref="modalWrap">
            <label for="city-name">Location: </label>
            <input type="text" name="city-name" placeholder="Search By City Name" v-model="city">
            <button @click="addCity">Add</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import db from '../firebase/firebaseinit'
import { collection, addDoc } from "firebase/firestore"

    export default defineComponent({
        name: 'ModalNew',
        props: ['APIkey'],
        data() {
            return {
                city: '' as string,
            }
        },
        methods: {
            closeModal(e : any) {
                if(e.target === this.$refs.modal) {
                    this.$emit('close-modal')
                }
            },
            async addCity() : Promise<void> {
                if(this.city === '') {
                    alert('This cannot be empty')
                } else {
                    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.APIkey}&units=metric`)
                    const data = await res.data
                    await addDoc(collection(db, "cities"), {
                        city: this.city,
                        CurrentWeather: data,
                        }).then(() => {
                            console.log(res)
                            this.$emit('close-modal')
                        })
                }
            }
        }
    })
</script>

<style scoped>
    .modal {
        z-index: 101;
        background: rgba(0 , 0, 0 ,0.5);
        position: fixed;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    label {
        color: aliceblue;
    }

    .modal-wrap {
        max-width: 500px;
        border-radius: 8px;
        width: 80%;
        padding: 20px;
        background-color:#2e2f30;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0 , 0, 0 ,0.08);
    }

    input {
        color: aliceblue;
        border: none;
        background-color: transparent;
        border-bottom: 1px solid aliceblue;
        padding: 6px 4px;
        margin: 10px 0 20px;
        width: 100%;
    }

    input:focus {
        outline: none;
    }
      
    button {
        background-color: rgb(30, 30, 31);
        color: aliceblue;
        padding: 6px 20px;
        border-radius: 8px;
        border: none;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0 , 0, 0 ,0.08);
    }

</style>