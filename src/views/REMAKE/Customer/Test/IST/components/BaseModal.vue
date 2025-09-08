<!-- BaseModal.vue -->
<template>
  <transition name="modal-fade">
    <div v-if="modelValue" class="fixed inset-0 bg-black/30 z-20 flex justify-center items-center p-4 backdrop-blur-sm">
      <transition name="modal-scale">
        <div class="bg-white rounded-2xl max-w-md w-full px-6 py-4 transform shadow-2xl border border-gray-100" @click.stop>
          <!-- Header dengan tombol close -->
          <div v-if="showHeader" class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-[#374151] font-sora">{{ title }}</h3>
            <button v-if="icon === 'info' && showCloseButton" @click="closeModal"
              class="text-[#9A9A9A] hover:text-[#374151] transform transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-lg hover:bg-[#F1F7FD]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <!-- Icon sesuai jenis modal -->
          <div v-if="icon" class="flex justify-center mb-6">
            <div class="p-4 rounded-full bg-gradient-to-br from-[#F1F7FD] to-[#DBE0FD] shadow-inner">
              <svg v-if="icon === 'time'" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                fill="none">
                <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#FB3748" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <svg v-else-if="icon === 'success'" xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#7474FB" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <svg v-else-if="icon === 'info'" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                fill="none">
                <path
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#7474FB" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>

          <!-- Konten utama -->
          <div class="">
            <!-- Jika menggunakan message -->
            <p v-if="message" class="mb-6 text-base text-[#374151] text-center font-sora leading-relaxed" :class="{ 'text-justify': !icon }">
              {{ message }}
            </p>
            
            <!-- Jika menggunakan slot -->
            <slot v-else></slot>
          </div>

          <!-- Tombol aksi -->
          <button v-if="confirmText" @click="handleConfirm"
            class="w-full bg-primary text-white py-3 rounded-full font-sora font-medium border-4 border-[#7474FB] 
                   shadow-[inset_0_-4px_6px_-1px_rgba(0,0,0,0.2),inset_0_4px_6px_-1px_rgba(255,255,255,0.6)]
                   transition-all duration-300 transform active:scale-95 hover:shadow-lg relative overflow-hidden">
            <span class="relative z-10">{{ confirmText }}</span>
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  confirmText: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: '',
    validator: (value) => ['', 'time', 'success', 'info', 'loading'].includes(value)
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  showCloseButton: {
    type: Boolean,
    default: true
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const closeModal = () => {
  emit('update:modelValue', false)
}

const handleConfirm = () => {
  emit('confirm')
  closeModal()
}

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    closeModal()
  }
}
</script>

<style scoped>
.modal-fade-enter-active {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-scale-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-scale-enter-from {
  transform: scale(0.85) translateY(30px);
  opacity: 0;
}

.modal-scale-leave-to {
  transform: scale(0.9) translateY(-20px);
  opacity: 0;
}
</style>