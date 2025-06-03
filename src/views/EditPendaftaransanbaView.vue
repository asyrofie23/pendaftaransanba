<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const name = ref('')
const phone = ref('')
const email = ref('')
const address = ref('')
const school = ref('')
const time = ref('')

const saveData = async () => {
    const newPendaftaransanba = JSON.stringify({
        name: name.value,
        phone: phone.value,
        time: Date.parse(time.value)/1000,
    })
    const response = await fetch('/api/pendaftaransanbas', {
        method:'POST',
        body: newPendaftaransanba,
    })
    const data = await response.json()

    router.push('/')
}
</script>
<template>
    <h1>Edit Event Baru</h1>
    <form @submit.prevent="saveData">
         <div>
            <label>Nama</label>
            <input type="text" v-model="name">
        </div>
         <div>
            <label>Phone</label>
            <input type="text" v-model="phone">
        </div>
        <div>
            <label>Email</label>
            <input type="text" v-model="email">
        </div>
        <div>
            <label>Alamat</label>
            <input type="text" v-model="address">
        </div>
        <div>
            <label>Asal Sekolah</label>
            <input type="text" v-model="school">
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