<template>

  <Header />

  <main class="relative max-w-[1400px] mx-auto min-h-[50vh] max-h-full">

    <Switcher
      @update-primary-tab = 'getPrimaryTab'
      @update-secondary-tab = 'getSecondaryTab'
    />

    <!-- Calculate Section -->
    <section class="mt-5 px-20 w-full">
      
      <div v-show="primaryTab == 'fitrah'" >
        <ZakatFitrah :secondaryTabProp = secondaryTab />
      </div>

      <div v-show="primaryTab == 'mal'" >
        <ZakatMal 
          :secondaryTabProp = secondaryTab  
        />
      </div>

      <div v-show="primaryTab == 'infaq'" >
        <Infaq 
          :secondaryTabProp = secondaryTab  
        />
      </div>

    </section>
    <!-- End Calculate Section -->

  </main>

  <Footer />

</template>

<script>
import Header from '@/components/calculate/ZakatHeader.vue'
import Footer from '@/components/calculate/ZakatFooter.vue'
import Switcher from '@/components/calculate/Switcher.vue'

import ZakatFitrah from '@/components/calculate/Fitrah.vue'
import ZakatMal from '@/components/calculate/Mal.vue'
import Infaq from '@/components/calculate/Infaq.vue'

export default {
  data() {
    return {
      primaryTab: 'fitrah',
      secondaryTab: 'beras',
    }
  },

  components: {
    Header,
    Footer,
    Switcher,
    ZakatFitrah,
    ZakatMal,
    Infaq,
  },

  methods: {

    getPrimaryTab (params){
      this.primaryTab = params
    },

    getSecondaryTab (params){
      this.secondaryTab = params
    },
  },

  mounted() {
    if (!localStorage.getItem('token')) {
      return this.$router.push('/login?error=kicked')
    }
  },

}
</script>

<style lang="css">

/* To Remove number +- in number input field */
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
  
</style>