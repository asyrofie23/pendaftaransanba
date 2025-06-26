<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const name = ref("");
const phone = ref("");
const email = ref("");
const address = ref("");
const school = ref("");
const time = ref("");
const goBack = () => {
  router.back();
};

const saveData = async () => {
  //Fungsi asinkron yang akan dijalankan saat user klik tombol "Simpan" atau "Submit". Tujuannya adalah mengirim data ke backend.
  const newPendaftaransanba = JSON.stringify({
    //Membuat objek JSON yang berisi data dari form.
    name: name.value,
    phone: phone.value,
    email: email.value,
    address: address.value,
    school: school.value,
    time: Date.parse(time.value) / 1000,
  });

  const response = await fetch("/api/pendaftaransanbas", {
    //Mengirimkan data ke API backend menggunakan HTTP POST ke /api/pendaftaransanbas.
    method: "POST",
    body: newPendaftaransanba,
  });
  const data = await response.json();

  router.push("/"); //Setelah data berhasil dikirim, user akan diarahkan kembali ke halaman utama
};
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-logo">Sanba Institute</div>
      <ul class="navbar-links">
        <li><a href="/">Beranda</a></li>
        <li><a href="/tentang">Tentang</a></li>
        <li><a href="/formulir">Formulir</a></li>
        <li><a href="/kontak">Kontak</a></li>
      </ul>
    </div>
  </nav>

  <main class="form-container">
    <h1 class="form-title">Isi Formulir Disini</h1>
    <form @submit.prevent="saveData" class="form-box">
      <div class="form-group">
        <label>Nama</label>
        <input type="text" v-model="name" required />
      </div>
      <div class="form-group">
        <label>Phone</label>
        <input type="text" v-model="phone" required />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label>Alamat</label>
        <input type="text" v-model="address" required />
      </div>
      <div class="form-group">
        <label>Asal Sekolah</label>
        <input type="text" v-model="school" required />
      </div>
      <div class="form-group">
        <label>Waktu</label>
        <input type="date" v-model="time" required />
      </div>
      <div class="form-actions">
        <input type="submit" value="Kirim" />
      </div>
      <div class="back-button">
        <button type="button" @click="goBack">← Kembali</button>
      </div>
    </form>
  </main>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.form-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.form-box {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.4rem;
  font-weight: 600;
}

.form-group input {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border 0.3s;
}

.form-group input:focus {
  border-color: #3498db;
  outline: none;
}

.form-actions {
  text-align: center;
}

.form-actions input[type="submit"] {
  background-color: #3498db;
  color: white;
  padding: 0.7rem 1.4rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.form-actions input[type="submit"]:hover {
  background-color: #2980b9;
}
.back-button {
  text-align: center;
  margin-top: 1rem;
}

.back-button button {
  background-color: #e0e0e0;
  color: #333;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.back-button button:hover {
  background-color: #d5d5d5;
}

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
</style>
