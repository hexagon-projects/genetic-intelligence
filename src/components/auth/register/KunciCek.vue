<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import initAPI from '../../../api/api';

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const code = route.query.code
  if (code) {
    try {
        const response = await initAPI('post', 'auth/kunci/callback', {
            code: code
        });
    } catch (error) {
      console.error('Login gagal:', error)
    }
  }
})
</script>
