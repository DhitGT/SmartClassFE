<template>
    <table class="min-w-full border-collapse border border-gray-200">
      <thead class="bg-gray-100">
        <tr>
          <th 
            v-for="header in headers" 
            :key="header.value" 
            class="p-2 border-b"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td class="p-2 border-b">
            <span class="flex items-center">
              <HeroIcon name="user-circle" class="w-5 h-5 mr-2" /> 
              {{ item.user.name }} ({{ item.user.email }})
            </span>
          </td>
          <td class="p-2 border-b">{{ item.department }}</td>
          <td class="p-2 border-b">{{ item.status }}</td>
          <td class="p-2 border-b">{{ item.joinedDate }}</td>
          <td class="p-2 border-b">
            <button class="text-blue-500">
              <HeroIcon name="pencil" class="w-4 h-4" />
            </button>
            <button class="text-red-500">
              <HeroIcon name="trash" class="w-4 h-4" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script setup>
  defineProps(['headers', 'items']);
  </script>