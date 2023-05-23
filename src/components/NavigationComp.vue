<template>
    <div>
        <header class="container add-city">
            <nav>
                <span>Add City</span>
                <div class="right">
                    <font-awesome-icon @click="editCity" ref="editCity" :class="{'active': isEditActive}" icon="fa-solid fa-edit" />
                    <font-awesome-icon @click="reloadAPP" class="icons" icon="fa-solid fa-sync" />
                    <font-awesome-icon @click="addCity" class="icons" icon="fa-solid fa-plus" />
                </div>
            </nav>
        </header>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

    export default defineComponent ({
        name: 'NavigationComp',
        data() {
            return {
            isEditActive: false
            }
        },
        methods: {
            addCity() : void {
                this.$emit('add-city')
            },
            reloadAPP() {
                location.reload()
            },
            editCity(): void {
                this.isEditActive = !this.isEditActive
                this.$emit('edit-city')
            }
        }
    })
</script>

<style scoped>
.add-city {
    background-color: #2f2f30;
}
    header {
        z-index: 99;
        position: fixed;
        max-width: 1024px;
        width: 100%;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 1);
    }
    nav {
        display: flex;
        color: aliceblue;
        padding: 30px 0;
        justify-content: space-between;
    }

    .active {
        color: rgba(210, 75, 75, 1);
      }
    
    .icons {
        margin-left: 16px;
    }
    
    span {
        font-weight: 600;
    }
</style>