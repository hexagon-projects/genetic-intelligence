<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import ImageUpload from './ImageUpload.vue'
import Cookies from 'js-cookie';
import initAPI from '../../../../../../api/api';

const testers = ref([]);
const selectedTester = ref(null);
const token = Cookies.get('token');

const rekomendasi = ref('');
const approval = ref('');
const status = ref('pending');

const statusOptions = ref([
  { value: 'pending', label: 'Pending' },
  { value: 'proses', label: 'Proses' },
  { value: 'approve', label: 'Approve' }
]);

const props = defineProps({
    activeStep: Number,
    scores: Object,
    notes: Object,
    saving: Boolean,
    observations: Object,
    uploadedImages: Array,
    completedSteps: Array,
    isEditing: Boolean,
    existingDocumentations: Array,
    tester: Number,
    existingRekomendasi: String,
    existingApproval: String,
    existingStatus: String
})

const emit = defineEmits([
    'update:scores',
    'update:notes',
    'update:observations',
    'update:uploadedImages',
    'nextStep',
    'prevStep',
    'finish',
    'update:tester',
    'update:rekomendasi',
    'update:approval',
    'update:status'
])

watch(() => props.existingRekomendasi, (newVal) => {
    if (newVal !== undefined) {
        rekomendasi.value = newVal;
    }
});

watch(() => props.existingApproval, (newVal) => {
    if (newVal !== undefined) {
        approval.value = newVal;
    }
});

watch(() => props.existingStatus, (newVal) => {
    if (newVal !== undefined) {
        status.value = newVal;
    }
});

watch(rekomendasi, (newVal) => {
    emit('update:rekomendasi', newVal);
});

watch(approval, (newVal) => {
    emit('update:approval', newVal);
});

watch(status, (newVal) => {
    emit('update:status', newVal);
});

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

const getImageUrl = (filePath) => {
    if (!filePath) return '';
    return `https://api.jatidiri.app/storage/${filePath}`;
};

const fetchTesters = async () => {
    try {
        const response = await initAPI("get", "consultant/report/tester", null, token);
        testers.value = response.data.data;

        if (props.tester) {
            selectedTester.value = props.tester;
        }
    } catch (error) {
        console.error('Error fetching testers:', error);
    }
};

const onTesterChange = () => {
    emit('update:tester', selectedTester.value);
};

watch(() => props.tester, (newTester) => {
    selectedTester.value = newTester;
});

onMounted(() => {
    fetchTesters();

    if (props.existingRekomendasi !== undefined) {
        rekomendasi.value = props.existingRekomendasi;
    }
    if (props.existingApproval !== undefined) {
        approval.value = props.existingApproval;
    }
    if (props.existingStatus !== undefined) {
        status.value = props.existingStatus;
    }
});
</script>

<template>
    <div class="w-full bg-white shadow-md shadow-black/5 p-6 rounded-3xl space-y-4 md:space-y-6">
        <div class="w-full space-y-2">
            <div>
                <p class="text-sm text-[#8E8E8E]">Observasi</p>
            </div>
            <textarea rows="10" class="w-full bg-[#F5F5F5] rounded-lg text-sm md:text-base p-3"
                :value="notes[getStepKey(activeStep)]" @input="updateNotes($event.target.value)"
                :placeholder="'Masukkan observasi untuk ' + getStepName(activeStep)"></textarea>
        </div>

        <div class="w-full flex items-start gap-4 md:gap-6">
            <div class="w-full space-y-2">
                <div>
                    <p class="text-sm text-[#8E8E8E]">Catatan</p>
                </div>
                <textarea rows="10" class="w-full bg-[#F5F5F5] rounded-lg text-sm md:text-base p-3"
                    :value="observations[getStepKey(activeStep)]" @input="updateObservations($event.target.value)"
                    placeholder="Masukkan Catatan"></textarea>
            </div>
            <div class="w-[15%] space-y-2">
                <div>
                    <p class="text-sm text-[#8E8E8E]">Skor</p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div v-for="score in [1, 2, 3, 4, 5]" :key="score"
                        class="w-12 h-12 rounded-lg flex justify-center items-center cursor-pointer transition-all duration-500"
                        :class="Number(scores[getStepKey(activeStep)]) === score ? 'bg-primary text-white' : 'bg-[#f5f5f5] hover:bg-[#E6E7F4]'"
                        @click="selectScore(activeStep, score)">
                        <h6 class="text-sm">{{ score.toString().padStart(2, '0') }}</h6>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="activeStep === 5" class="space-y-4">
            <div class="w-full space-y-2">
                <div>
                    <p class="text-sm text-[#8E8E8E]">Rekomendasi</p>
                </div>
                <input type="text" v-model="rekomendasi" class="w-full bg-[#F5F5F5] rounded-lg text-sm md:text-base p-3"
                    placeholder="Masukkan Rekomendasi">
            </div>

            <div class="w-full space-y-2">
                <div>
                    <p class="text-sm text-[#8E8E8E]">Approval</p>
                </div>
                <select v-model="approval" class="w-full bg-[#F5F5F5] rounded-lg text-sm md:text-base p-3">
                    <option value="">Pilih Approval</option>
                    <option v-for="tester in testers" :key="tester.id" :value="tester.id">
                        {{ tester.name }}
                    </option>
                </select>
            </div>

            <div class="w-full space-y-2">
                <div>
                    <p class="text-sm text-[#8E8E8E]">Status</p>
                </div>
                <select v-model="status" class="w-full bg-[#F5F5F5] rounded-lg text-sm md:text-base p-3">
                    <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                        {{ option.label }}
                    </option>
                </select>
            </div>
        </div>

        <div v-if="isEditing && existingDocumentations && existingDocumentations.length > 0">
            <p class="text-sm text-[#8E8E8E] mb-2">Dokumentasi yang sudah ada:</p>
            <div class="flex flex-wrap gap-2 mb-4">
                <div v-for="doc in existingDocumentations" :key="doc.id" class="relative">
                    <img :src="getImageUrl(doc.file)" :alt="doc.title"
                        class="w-16 h-16 rounded object-cover cursor-pointer" @click="$emit('view-documentation', doc)">
                    <button @click="$emit('delete-documentation', doc.id)"
                        class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        ×
                    </button>
                </div>
            </div>
        </div>

        <div v-if="activeStep === 5">
            <ImageUpload :uploadedImages="uploadedImages"
                @update:uploadedImages="$emit('update:uploadedImages', $event)" />

            <div class="w-full space-y-2 mt-4">
                <div>
                    <p class="text-sm text-[#8E8E8E]">Tester</p>
                </div>
                <select v-model="selectedTester" class="w-full bg-[#F5F5F5] rounded-lg text-sm md:text-base p-3"
                    @change="onTesterChange">
                    <option value="">Pilih Tester</option>
                    <option v-for="tester in testers" :key="tester.id" :value="tester.id">
                        {{ tester.name }}
                    </option>
                </select>
            </div>
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

                <svg v-if="saving" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                <p class="text-base">{{ saving ? 'Menyimpan...' : (activeStep === 5 ? 'Selesai' : 'Selanjutnya') }}</p>
            </button>
        </div>
    </div>
</template>