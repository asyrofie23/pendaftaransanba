<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

interface Pendaftaransanba {
  //dibuat untuk kerangka
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  school: string;
  time: string;
}

const pendaftaransanbas = ref<Pendaftaransanba[]>([]); //variable untuk menyimpan data yang sama dengan yang di interface pendaftaransanba
const loading = ref(true);

onMounted(() => {
  fetchPendaftaransanbas();
});

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
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-logo">PONDOK PESANTREN ALBERR</div>
      <ul class="navbar-links">
        <li><a href="/">Beranda</a></li>
        <li><a href="/tentang">Tentang</a></li>
        <li><a href="/formulir">Formulir</a></li>
        <li><a href="/kontak">Kontak</a></li>
      </ul>
    </div>
  </nav>
  <main class="container">
    <img src="/logo.png" alt="Logo" class="logo" />
    <h1 class="title">Form Pendaftaran Santri Baru 2025</h1>
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
  <!-- <footer class="footer">
    <div class="footer-container">
      <p>&copy; 2025 Sanba Institute. All rights reserved.</p>
      <ul class="footer-links">
        <li><a href="/kebijakan">Kebijakan Privasi</a></li>
        <li><a href="/syarat">Syarat & Ketentuan</a></li>
        <li><a href="/kontak">Kontak Kami</a></li>
      </ul>
    </div>
  </footer> -->
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

/* navbar */
.navbar {
  background-color: #2c3e50;
  padding: 1rem 0;
  color: white;
  font-family: Arial, sans-serif;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}

.navbar-links li a {
  text-decoration: none;
  color: white;
  font-weight: 500;
  transition: color 0.3s;
}

.navbar-links li a:hover {
  color: #1abc9c;
}

/* footer */
/* .footer {
  background-color: #2c3e50;
  color: white;
  padding: 1.5rem 1rem;
  margin-top: 2rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer p {
  margin-bottom: 0.8rem;
  font-size: 0.95rem;
}

.footer-links {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 0;
  margin: 0;
}

.footer-links li a {
  text-decoration: none;
  color: #ecf0f1;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.footer-links li a:hover {
  color: #1abc9c;
} */
</style>
