<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getCurrentUserId, getBalance, logout } from '@/api/users';
import { deposit, withdraw } from '@/api/transaction';
import { useRouter } from 'vue-router';

const router = useRouter();
const userId = ref(getCurrentUserId());
const balance = ref<number | null>(null);
const depositAmount = ref(0);
const withdrawAmount = ref(0);
const message = ref<string | null>(null);
const error = ref<string | null>(null);

async function fetchBalance() {
  if (!userId.value) return;
  try {
    balance.value = await getBalance(userId.value);
  } catch {
    error.value = 'Failed to fetch balance';
  }
}

async function handleDeposit() {
  if (!userId.value) return;
  await deposit({ userId: userId.value, amount: depositAmount.value });
  depositAmount.value = 0;
  await fetchBalance();
  message.value = 'Deposit successful!';
}

async function handleWithdraw() {
  if (!userId.value) return;
  await withdraw({ userId: userId.value, amount: withdrawAmount.value });
  withdrawAmount.value = 0;
  await fetchBalance();
  message.value = 'Withdraw successful!';
}

function handleLogout() {
  logout();
  router.push('/');
}

onMounted(fetchBalance);
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="atm shadow-lg border border-gray-300 rounded-lg w-[600px] h-[550px] bg-white">
      <div class="mx-5">
        <h1 class="mt-5 p-5 text-center text-xl font-bold">ATM Frontend</h1>

        <div class="pt-3">
          <p class="text-lg font-semibold mb-2">USER DATA</p>
          <p class="text-green-500 mb-2"><b class="text-gray-950">User ID:</b> {{ userId }}</p>
          <p class="text-green-500 mb-2"><b class="text-gray-950">Balance:</b> {{ balance }}</p>
          <p class="text-lg font-semibold mt-5">TAKE ACTION</p>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-5">
          <div class="bg-blue-200 shadow-sm border border-blue-400 rounded-lg p-5">
            <h5 class="mb-3">Deposit</h5>
            <input
              class="bg-white border border-gray-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              type="number"
              v-model.number="depositAmount"
              min="1"
            />
            <button
              class="bg-gray-400 border border-blue-500 rounded-lg py-1 px-4 mt-3"
              @click="handleDeposit"
            >
              Deposit
            </button>
          </div>

          <div class="bg-green-200 shadow-sm border border-green-400 rounded-lg p-5">
            <h5 class="mb-3">Withdraw</h5>
            <input
              class="bg-white border border-gray-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              type="number"
              v-model.number="withdrawAmount"
              min="1"
            />
            <button
              class="bg-gray-400 border border-green-500 rounded-lg py-1 px-4 mt-3"
              @click="handleWithdraw"
            >
              Withdraw
            </button>
          </div>
        </div>

        <div class="mt-5">
          <button
            class="bg-red-400 border border-red-500 rounded-lg py-2 px-4"
            @click="handleLogout"
          >
            Logout
          </button>
          <div class="mt-5">
            <p v-if="message" class="text-green-600">{{ message }}</p>
            <p v-if="error" class="text-red-600">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
