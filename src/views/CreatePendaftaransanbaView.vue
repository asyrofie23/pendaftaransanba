<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const name = ref('')
const place = ref('')
const time = ref('')

const saveData = async () => {
    const newEvent = JSON.stringify({
        name: name.value,
        place: place.value,
        time: Date.parse(time.value)/1000,
    })

    const response = await fetch('/api/events', {
        method:'POST',
        body: newEvent,
    })
    const data = await response.json()

    router.push('/')
}
</script>


<template>
    <h1>Buat Event Baru</h1>
    <form @submit.prevent="saveData">
        <div>
            <label>Nama</label>
            <input type="text" v-model="name">
        </div>
        <div>
            <label>Tempat</label>
            <input type="text" v-model="place">
        </div>
        <div>
            <label>Waktu</label>
            <input type="datetime-local" v-model="time">
        </div>
        <div>
            <input type="submit">
        </div>
    </form>
</template>