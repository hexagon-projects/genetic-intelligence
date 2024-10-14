<script setup>
import { ref, watch } from 'vue';
import { PhX } from "@phosphor-icons/vue"; // Assuming you're using this icon library

// Props received from the parent
const props = defineProps({
  label: String,
  modelValue: String,
  options: Array,
});

// Emit 'update:modelValue' and 'reset' events
const emit = defineEmits(['update:modelValue', 'reset']);

// Show reset button if filter is applied
const isFilterActive = ref(false);

watch(() => props.modelValue, (newValue) => {
  isFilterActive.value = newValue !== '';
});
</script>

<template>
  <div class="flex items-center gap-1">
    <div class="text-[#32324D] font-['Roboto'] leading-loose relative">
      <select
        :name="label"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="p-1 px-3 pr-10 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
      >
        <option v-for="option in options" :key="option" :value="option" class="font-roboto">
          {{ option === '' ? label : option }}
        </option>
      </select>

        <svg
            width="8"
            height="4"
            viewBox="0 0 8 4"
            fill="none"
            class="absolute right-3 top-1/2 transform -translate-y-1/2"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5 0.444444C7.5 0.564815 7.45671 0.668981 7.37012 0.756944L4.30762 3.86806C4.22103 3.95602 4.11849 4 4 4C3.88151 4 3.77897 3.95602 3.69238 3.86806L0.629883 0.756944C0.543294 0.668981 0.5 0.564815 0.5 0.444444C0.5 0.324074 0.543294 0.219907 0.629883 0.131944C0.716471 0.0439815 0.81901 0 0.9375 0H7.0625C7.18099 0 7.28353 0.0439815 7.37012 0.131944C7.45671 0.219907 7.5 0.324074 7.5 0.444444Z"
            fill="#8E8EA9"
            />
        </svg>
    </div>

    <button
      v-if="isFilterActive"
      @click="$emit('reset')"
      class="text-light p-[2px] bg-danger rounded-md"
    >
      <PhX/>
    </button>
  </div>
</template>
