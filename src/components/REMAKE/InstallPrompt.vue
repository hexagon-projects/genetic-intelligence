<template>
  <div v-if="deferredPrompt && showPrompt" class="w-4/5 md:w-auto py-2 px-4 font-sora bg-biru rounded-full flex gap-4 items-center justify-center text-white text-xs top-5 fixed left-1/2 transform -translate-x-1/2 z-50">
    <p>Pasang aplikasi ini di perangkat kamu!</p>
    <button @click="installApp" class="bg-transparent outline outline-1 outline-white rounded-full p-2 hover:bg-white hover:text-biru">Pasang</button>
    <button @click="showPrompt = false" class="bg-transparent outline outline-1 outline-white rounded-full p-2 hover:bg-white hover:text-biru">Nanti</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deferredPrompt: null,
      showPrompt: false
    }
  },
  mounted() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      console.log('beforeinstallprompt event triggered') // Menambahkan log untuk debugging
      this.deferredPrompt = e
      this.showPrompt = true
    })
  },
  methods: {
    async installApp() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt()
        const { outcome } = await this.deferredPrompt.userChoice
        console.log(`User response to install: ${outcome}`)
        this.deferredPrompt = null
        this.showPrompt = false
      }
    }
  }
}
</script>