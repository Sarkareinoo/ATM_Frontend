<script setup lang="ts">
import { ref } from 'vue';
import { login } from '@/api/users';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref<string | null>(null);

async function handleLogin() {
  try {
    await login({ UserID: email.value, Password: password.value });
    router.push('/dashboard');
  } catch (e: any) {
    error.value = e?.response?.data?.message || 'Login failed';
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="atm shadow-lg border border-gray-300 rounded-lg w-96 bg-white">
      <div class="mx-5">
        <h1 class="mt-5 p-5 text-center text-xl font-bold">ATM Frontend</h1>

        <div class="max-w-sm mx-auto p-6 bg-white rounded shadow-md">
          <input
            v-model="email"
            type="email"
            placeholder="User ID (email)"
            class="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            @click="handleLogin"
            class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p v-if="error" class="mt-4 text-red-500 text-sm">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
