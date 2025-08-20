<template>
  <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
    <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center">
      <svg class="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
        </path>
      </svg>
      Testimoni Terbaru
    </h2>
    <div v-if="testimonials" class="space-y-4">
      <div v-for="testimonial in testimonials" :key="testimonial.id"
        class="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
        <div class="flex items-center mb-3">
          <div
            class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
            {{ testimonial.booking?.user?.name }}
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-slate-800">{{ testimonial.booking?.user?.customers?.first_name }}</h3>
            <div class="flex items-center space-x-2">
              <div class="flex">
                <svg v-for="i in 5" :key="i" class="w-4 h-4"
                  :class="i <= testimonial?.rating ? 'text-yellow-400' : 'text-slate-300'" fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="text-xs text-slate-500">{{ formatDate(testimonial?.created_at) }}</span>
            </div>
          </div>
        </div>
        <p class="text-slate-600 text-sm leading-relaxed">{{ testimonial?.comment }}</p>
      </div>
    </div>
    <div v-else class="text-center py-8">
      <svg class="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
        </path>
      </svg>
      <p class="text-slate-500">Belum ada testimoni</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentTestimonials',
  props: {
    testimonials: {
      type: Array,
      required: true
    },
    formatDate: {
      type: Function,
      required: true
    }
  }
}
</script>
