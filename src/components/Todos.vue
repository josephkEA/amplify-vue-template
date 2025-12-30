<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

// create a reactive reference to the array of todos
const todos = ref<Array<Schema['Todo']["type"]>>([]);

function listTodos() {
  client.models.Todo.observeQuery().subscribe({
    next: ({ items }) => {
      todos.value = items
     },
  }); 
}

function createTodo() {
  const content = window.prompt("What would you like to add to your todo list?");
  if (content) {
    client.models.Todo.create({
      content: content
    }).then(() => {
      listTodos();
    });
  }
}

function deleteTodo(id: string) {
  client.models.Todo.delete({id})
}
    
// fetch todos when the component is mounted
 onMounted(() => {
  listTodos();
});

</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="todo-container">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold text-gray-800">My Todos</h2>
        <button @click="createTodo" class="btn-primary flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add New Todo
        </button>
      </div>
      
      <div v-if="todos.length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
        </div>
        <p class="text-gray-500 text-lg">No todos yet</p>
        <p class="text-gray-400">Click "Add New Todo" to get started!</p>
      </div>
      
      <div v-else class="space-y-3">
        <div 
          v-for="todo in todos" 
          :key="todo.id" 
          @click="deleteTodo(todo.id)"
          class="todo-item group"
        >
          <div class="flex justify-between items-center">
            <span class="text-gray-800 flex-1">{{ todo.content }}</span>
            <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div class="flex items-center gap-2 text-blue-800">
          <span class="text-2xl">🥳</span>
          <div>
            <p class="font-medium">App successfully hosted!</p>
            <p class="text-sm text-blue-600">
              Try creating a new todo. Click on any todo to delete it.
            </p>
          </div>
        </div>
        <a 
          href="https://docs.amplify.aws/gen2/start/quickstart/nextjs-pages-router/"
          class="inline-block mt-3 text-blue-600 hover:text-blue-800 font-medium underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Review next steps of this tutorial →
        </a>
      </div>
    </div>
  </div>
</template>
