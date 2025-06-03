<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

interface Pendaftaransanba {
  id: number
  name: string
  phone: number
  email: string
  address: string
  school: string
  time: string
}

const pendaftaransanbas = ref<Pendaftaransanba[]>([])

const fetchPendaftaransanbas = async () => {
  const response = await fetch('/api/pendaftaransanbas')
  const data = await response.json()
  pendaftaransanbas.value = data
}

onMounted(() => {
  fetchPendaftaransanbas()
})
</script>

<template>
  <main>
    <div>Form Pendaftaran</div>
    <div>
      <RouterLink to="/pendaftaransanba">Daftar Disini</RouterLink>
    </div>

    <div>
      <ul>
        <li v-for="pendaftaransanba in pendaftaransanbas" :key="pendaftaransanba.id">
          <div>{{ pendaftaransanba.name }}</div>
          <div>{{ pendaftaransanba.phone }}</div>
          <div>{{ pendaftaransanba.email }}</div>
          <div>{{ pendaftaransanba.address }}</div>
          <div>{{ pendaftaransanba.school }}</div>
          <div>{{ pendaftaransanba.time }}</div>
        </li>
      </ul>
    </div>
  </main>
</template>
