<template>
      <Tweet 
         v-for="tweet in tweets" :key="tweet._id" 
         :tweet="tweet" 
      />
</template>

<script>
import { ref } from 'vue';
import Tweet from '../components/Tweet.vue'
import vweets from '../tweets';

export default {
      components: {
         Tweet
      },
      // setup itu merupakan composition API, baca di doc tentang vue 3 
      setup() {
         const tweets = ref(vweets);
            
         return {
            tweets
         }
      }

      
}
</script>
