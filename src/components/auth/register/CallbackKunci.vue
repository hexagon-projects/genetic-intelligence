<template>
  <div>
    <p>Memproses login...</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const code = route.query.code
  const verifier = localStorage.getItem('code_verifier')

  if (code && verifier) {
    try {
      // Kirim ke backend Laravel untuk tukar token
      const tokenRes = await axios.post('https://api-staging.jatidiri.app/api/auth/kunci/token', {
        code_verifier: verifier,
      })

      const token = tokenRes.data.token

      // Binding user (contoh, sesuaikan dengan data yang valid)
      const bindRes = await axios.post('https://api-staging.jatidiri.app/api/auth/kunci/bind', {
        school_id: '01j523trdnjsgcwt3c42swhq4t',
        identifier: '2425011',
        secret: '123',
        type: 'student',
        token: token,
      })

      console.log('Bind success:', bindRes.data)

      // Simpan token dan redirect
      localStorage.setItem('kunci_token', token)
      // router.push('/dashboard')
    } catch (error) {
      console.error('Error during SSO:', error)
    }
  }
})
</script>