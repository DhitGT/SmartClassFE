 <template>
    <div class="container mx-auto">
      <h2 class="text-2xl font-bold text-center mb-2 ">Why Choose SmartClass</h2>
      <p class="text-xl opacity-80 text-center mb-18">Lorem ipsum dolor sit amet consectetur.</p>
      <v-row>
        <v-col v-for="(item, index) in items" :key="index" class="text-start">
            <div class="bg-blue-200 rounded-full max-w-fit p-2 flex items-center mb-2 justify-center">
                <component :is="item.icon" class="h-8 w-h-8 text-blue-500 mx-auto " />
            </div>
          <h3 class="text-xl font-semibold">{{ item.title }}</h3>
          <p class="text-gray-600">{{ item.description }}</p>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script setup>
  import { VideoCameraIcon, ChartBarIcon, UsersIcon } from '@heroicons/vue/24/solid'
  
  const items = [
    { icon: VideoCameraIcon, title: 'Live Virtual Classes', description: 'High-quality video conferencing with interactive features designed for education.' },
    { icon: ChartBarIcon, title: 'Progress Tracking', description: 'Monitor student performance and engagement with detailed analytics.' },
    { icon: UsersIcon, title: 'Collaborative Learning', description: 'Enable group projects and peer-to-peer learning with built-in tools.' }
  ]
  </script>
  