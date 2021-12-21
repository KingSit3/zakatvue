<template>
  <div>
     <!-- Article itu namanya Semantic HTML -->
     <Article class="border-b border-gray-600">
        <router-link to="#" class="flex p-4">

         <figure class="w-16 mr-3">
            <!-- Pakai V-bind:src atau :src -->
            <img :src="tweet.author.profile_img_url" alt="Profile Image" class="rounded-full w-full">
         </figure>

         <section class="flex space-x-2">
            <span class="text-white font-bold">{{ tweet.author.display_name }}</span>
            <span class="text-gray-500">{{ tweet.author.username }}</span>
         </section>

         <div :class="(tweet.image ? 'mb-3' : '')">
            <!-- v-html, supaya tag html juga berfungsi, tidak hanya dirender mentah -->
            <p v-html="tweet.body"></p>
         </div>

         <figure v-if="tweet.image" class="rounded-xl border border-gray-600 overflow-hidden">
            <img :src="tweet.image.url" :alt="tweet.image.alt" class="w-full h-44 object-cover">
         </figure>

         <div class="flex items-center justify-between mt-2">
            
            <div class="text-gray-500 hover:text-green-500">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
               </svg>
               <span> {{ tweet.stats.comments.length }} </span>
            </div>

            <div class="text-gray-500 hover:text-green-500">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
               </svg>
               <span> {{ tweet.stats.retweets.length }} </span>
            </div>
            
            <div class="text-gray-500 hover:text-green-500">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
               </svg>
               <span> {{ tweet.stats.likes.length }} </span>
            </div>
            
            <div class="text-gray-500 hover:text-green-500">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
               </svg>
            </div>
            
         </div>

        </router-link>
     </Article>
  </div>
</template>

<script>
export default {
   props: ['tweet']
}
</script>

<style>

</style>