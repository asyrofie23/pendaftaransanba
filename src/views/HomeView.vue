<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

interface Pendaftaransanba {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  school: string;
  time: string;
}

const pendaftaransanbas = ref<Pendaftaransanba[]>([]);
const loading = ref(true);

const fetchPendaftaransanbas = async () => {
  loading.value = true;
  try {
    const response = await fetch("/api/pendaftaransanbas");
    const data = await response.json();
    pendaftaransanbas.value = data;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPendaftaransanbas();
});
const removePendaftaransanba = async (id: string) => {
  const response = await fetch(`/api/pendaftaransanbas/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    fetchPendaftaransanbas();
  }
};
</script>

<template>
  <main class="container">
    <img src="/logo.png" alt="Logo" class="logo" />
    <h1 class="title">Form Pendaftaran</h1>
    <div class="link-container">
      <RouterLink to="/pendaftaransanba" class="link-button"
        >Daftar Disini</RouterLink
      >
    </div>
    <div v-if="loading" class="loading">Memuat data...</div>
    <div v-else>
      <ul v-if="pendaftaransanbas.length > 0" class="pendaftar-list">
        <li
          v-for="pendaftaransanba in pendaftaransanbas"
          :key="pendaftaransanba.id"
          class="pendaftar-card"
        >
          <div><strong>Nama:</strong> {{ pendaftaransanba.name }}</div>
          <div><strong>HP:</strong> {{ pendaftaransanba.phone }}</div>
          <div><strong>Email:</strong> {{ pendaftaransanba.email }}</div>
          <div><strong>Alamat:</strong> {{ pendaftaransanba.address }}</div>
          <div><strong>Sekolah:</strong> {{ pendaftaransanba.school }}</div>
          <div>
            <strong>Waktu Daftar:</strong>
            {{
              new Date(Number(pendaftaransanba.time) * 1000).toLocaleString()
            }}
          </div>
          <div class="edit-link">
            <RouterLink :to="`/pendaftaransanba/${pendaftaransanba.id}`"
              >Edit</RouterLink
            >
          </div>
          <div class="more-actions">
            <button @click="removePendaftaransanba(pendaftaransanba.id)">
              Hapus Data
            </button>
          </div>
        </li>
      </ul>
      <div v-else class="empty">Tidak ada pendaftar.</div>
    </div>
  </main>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}

.link-container {
  text-align: center;
  margin-bottom: 2rem;
}

.link-button {
  background-color: #3498db;
  color: white;
  padding: 0.6rem 1.2rem;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s;
}

.link-button:hover {
  background-color: #2980b9;
}

.loading,
.empty {
  text-align: center;
  color: #555;
  font-style: italic;
  margin-top: 1rem;
}

.pendaftar-list {
  list-style: none;
  padding: 0;
}

.pendaftar-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
}

.pendaftar-card div {
  margin-bottom: 0.3rem;
}

.edit-link {
  margin-top: 0.5rem;
}

.edit-link a {
  color: #2ecc71;
  text-decoration: none;
  font-weight: bold;
}

.edit-link a:hover {
  text-decoration: underline;
}
.logo {
  display: block;
  max-width: 120px;
  margin: 0 auto 1rem auto;
}
</style>
