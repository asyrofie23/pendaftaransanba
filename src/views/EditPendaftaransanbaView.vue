<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();

const route = useRoute();
const id = route.params.id; //mengambil nilai :id dari URL.

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
  //Dijalankan saat user klik tombol "Simpan".
  const pendaftaransanba = JSON.stringify({
    //Membuat objek JSON yang berisi data dari form.
    name: name.value,
    phone: phone.value,
    email: email.value,
    address: address.value,
    school: school.value,
    time: Date.parse(time.value) / 1000,
  });
  const response = await fetch(`/api/pendaftaransanbas/${id}`, {
    //memperbarui data
    //Mengirim data ke backend dengan metode PUT, ke endpoint
    method: "PUT",
    body: pendaftaransanba,
  });
  const data = await response.json();

  router.push("/");
};
onMounted(() => {
  //dijalankan sekali saat komponen dimuat pertama kali.
  fetch(`/api/pendaftaransanbas/${id}`) //mengambil data user
    .then((response) => response.json()) //mengambil dan memproses data dari response fetch
    .then((data) => {
      name.value = data.name;
      phone.value = data.phone;
      email.value = data.email;
      address.value = data.address;
      school.value = data.school;
      time.value = new Date(data.time * 1000).toISOString().slice(0, 10);
    });
});
</script>
<template>
  <main class="form-container">
    <h1 class="form-title">Edit Form Baru</h1>
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
        <input type="datetime-local" v-model="time" required />
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
</style>
