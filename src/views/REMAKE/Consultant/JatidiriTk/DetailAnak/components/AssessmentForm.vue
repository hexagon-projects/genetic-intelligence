<script setup>
import { computed } from 'vue'
import ImageUpload from './ImageUpload.vue'

const props = defineProps({
  activeStep: Number,
  scores: Object,
  notes: Object,
  saving: Boolean,
  observations: Object,
  uploadedImages: Array,
  completedSteps: Array
})

const emit = defineEmits(['update:scores', 'update:notes', 'update:observations', 'update:uploadedImages', 'nextStep', 'prevStep', 'finish']) // TAMBAH emit finish

const getStepKey = (step) => {
    const stepMap = {
        1: 'psikomotor',
        2: 'kognisi', 
        3: 'emosi',
        4: 'relasiSosial',
        5: 'kemandirian'
    };
    return stepMap[step];
};

const getStepName = (step) => {
    const stepMap = {
        1: 'Psikomotor',
        2: 'Kognisi',
        3: 'Emosi',
        4: 'Relasi Sosial',
        5: 'Kemandirian'
    };
    return stepMap[step];
};

const selectScore = (step, score) => {
    const stepKey = getStepKey(step);
    const newScores = { ...props.scores };
    newScores[stepKey] = newScores[stepKey] === score ? null : score;
    emit('update:scores', newScores);
};

const updateNotes = (value) => {
    const stepKey = getStepKey(props.activeStep);
    const newNotes = { ...props.notes };
    newNotes[stepKey] = value;
    emit('update:notes', newNotes);
};

const updateObservations = (value) => {
    const stepKey = getStepKey(props.activeStep);
    const newObservations = { ...props.observations };
    newObservations[stepKey] = value;
    emit('update:observations', newObservations);
};

const isNextButtonDisabled = computed(() => {
    const stepKey = getStepKey(props.activeStep);
    return props.scores[stepKey] === null || props.notes[stepKey] === '' || props.saving;
});

const nextStep = () => {
    if (props.activeStep === 5) {
        emit('finish');
    } else {
        emit('nextStep');
    }
};

const prevStep = () => {
    emit('prevStep');
};
</script>

<template>
    <div class="w-full bg-white shadow-md shadow-black/5 p-6 rounded-3xl space-y-4 md:space-y-6">
        <div class="w-full space-y-2">
            <div>
                <p class="text-sm text-[#8E8E8E]">{{ getStepName(activeStep) }}</p>
            </div>
            <textarea rows="10" class="w-full bg-[#F5F5F5] rounded-lg text-sm md:text-base p-3"
                :value="notes[getStepKey(activeStep)]"
                @input="updateNotes($event.target.value)"
                :placeholder="'Masukkan catatan untuk ' + getStepName(activeStep)"></textarea>
        </div>

        <div class="w-full flex items-start gap-4 md:gap-6">
            <div class="w-full space-y-2">
                <div>
                    <p class="text-sm text-[#8E8E8E]">Observasi</p>
                </div>
                <textarea rows="10" class="w-full bg-[#F5F5F5] rounded-lg text-sm md:text-base p-3"
                    :value="observations[getStepKey(activeStep)]"
                    @input="updateObservations($event.target.value)"
                    placeholder="Masukkan observasi"></textarea>
            </div>
            <div class="w-[15%] space-y-2">
                <div>
                    <p class="text-sm text-[#8E8E8E]">Skor</p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div v-for="score in [1, 2, 3, 4, 5]" :key="score"
                        class="w-12 h-12 rounded-lg flex justify-center items-center cursor-pointer transition-all duration-500"
                        :class="scores[getStepKey(activeStep)] === score ? 'bg-primary text-white' : 'bg-[#f5f5f5] hover:bg-[#E6E7F4]'"
                        @click="selectScore(activeStep, score)">
                        <h6 class="text-sm">{{ score.toString().padStart(2, '0') }}</h6>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="activeStep === 5">
            <ImageUpload 
                :uploadedImages="uploadedImages" 
                @update:uploadedImages="$emit('update:uploadedImages', $event)" 
            />
        </div>

        <div class="w-full flex justify-between items-center">
            <button @click="prevStep" :disabled="activeStep === 1 || saving"
                class="py-3 px-6 rounded-full w-fit transition-all duration-300"
                :class="activeStep === 1 || saving ? 'bg-[#CBCBFD] text-white cursor-not-allowed' : 'bg-primary text-white cursor-pointer hover:bg-blue-700'">
                <p class="text-base">Kembali</p>
            </button>

            <button @click="nextStep" :disabled="isNextButtonDisabled"
                class="py-3 px-6 rounded-full w-fit transition-all duration-300 flex items-center justify-center gap-2"
                :class="isNextButtonDisabled ? 'bg-[#CBCBFD] text-white cursor-not-allowed' : 'bg-primary text-white cursor-pointer hover:bg-blue-700'">

                <svg v-if="saving" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p class="text-base">{{ saving ? 'Menyimpan...' : (activeStep === 5 ? 'Selesai' : 'Selanjutnya') }}</p>
            </button>
        </div>
    </div>
</template>