<template>
  <!-- Toast Alert -->
  <div :class="[show ? 'top-10 opacity-100' : 'top-5 opacity-0']" class="absolute right-10 transition-all duration-200">
    <div class="bg-green-500 shadow-lg py-2 rounded-xl flex justify-between items-center">
      <p class="font-semibold text-white text-sm px-5">{{ text }}</p>
      <button @click="closeToast()" class="pr-5 text-red-500 font-bold">x</button>
    </div>
  </div>
  <!-- End Toast Alert -->
</template>

<script>
export default {
  data() {
    return {
      show: false,
    }
  },

  props: {
    text: {
      type: String,
      default: '',
    },
    showProps: {
      type: Boolean,
      default: false,
    },
    timeoutProps: {
      type: Number,
      default: 2000
    },
  },

  watch: {
    showProps(){
      if (this.showProps == true) {
        this.openToast()
      }
    }
  },

  methods: {
    openToast(){
      this.show = true
      setTimeout(() => {
        this.closeToast()
      }, this.timeoutProps);
    },

    closeToast(){
      this.show = false
      setTimeout(() => {
        this.$emit('trigger-toast-done')
      }, 500)
    },
  },
}
</script>

<style>

</style>