<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue"
import Todos from './components/Todos.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <authenticator>
      <template v-slot="{ signOut }">
        <div class="container mx-auto px-4 py-8">
          <header class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900">My Todo App</h1>
            <button @click="signOut" class="btn-secondary">
              Sign Out
            </button>
          </header>
          <Todos />
        </div>
      </template>
    </authenticator>
  </div>
</template>

