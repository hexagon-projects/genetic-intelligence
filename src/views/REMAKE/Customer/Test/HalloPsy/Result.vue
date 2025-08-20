<template>
    <div class="w-full h-full bg-[#F0F7FD]">
        <div v-if="loading" class="flex justify-center items-center h-screen">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        <div v-else
            class="lg:px-20 lg:py-10 space-y-6 md:space-y-8 lg:space-y-12 bg-[#F0F7FD] font-sora md:max-w-[60%] lg:max-w-[40%] mx-auto cursor-pointer">
            <div
                class="w-full bg-gradient-to-tr from-[#6565A8] to-[#9898FC] md:rounded-2xl text-center px-4 py-6 space-y-4">
                <div class="flex gap-4 justify-end items-center w-full">
                    <div class="p-2 rounded-full bg-white w-fit cursor-pointer" @click="downloadPDF">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <mask id="mask0_2633_7311" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0"
                                y="0" width="24" height="24">
                                <path d="M24 0H0V24H24V0Z" fill="white" />
                            </mask>
                            <g mask="url(#mask0_2633_7311)">
                                <path opacity="0.4"
                                    d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z"
                                    fill="#6464FA" />
                                <path
                                    d="M15.8007 2.21048C15.3907 1.80048 14.6807 2.08048 14.6807 2.65048V6.14048C14.6807 7.60048 15.9207 8.81048 17.4307 8.81048C18.3807 8.82048 19.7007 8.82048 20.8307 8.82048C21.4007 8.82048 21.7007 8.15048 21.3007 7.75048C19.8607 6.30048 17.2807 3.69048 15.8007 2.21048Z"
                                    fill="#6464FA" />
                                <path
                                    d="M12.2794 14.72C11.9894 14.43 11.5094 14.43 11.2194 14.72L10.4994 15.44V11.25C10.4994 10.84 10.1594 10.5 9.74945 10.5C9.33945 10.5 8.99945 10.84 8.99945 11.25V15.44L8.27945 14.72C7.98945 14.43 7.50945 14.43 7.21945 14.72C6.92945 15.01 6.92945 15.49 7.21945 15.78L9.21945 17.78C9.22945 17.79 9.23945 17.79 9.23945 17.8C9.29945 17.86 9.37945 17.91 9.45945 17.95C9.55945 17.98 9.64945 18 9.74945 18C9.84945 18 9.93945 17.98 10.0294 17.94C10.1194 17.9 10.1994 17.85 10.2794 17.78L12.2794 15.78C12.5694 15.49 12.5694 15.01 12.2794 14.72Z"
                                    fill="#6464FA" />
                            </g>
                        </svg>
                    </div>
                    <div class="p-2 rounded-full bg-white w-fit cursor-pointer" @click="navigateToHome">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M16.9504 8.46392C17.1326 8.27531 17.2334 8.02271 17.2311 7.76052C17.2288 7.49832 17.1236 7.24751 16.9382 7.0621C16.7528 6.87669 16.502 6.77152 16.2398 6.76924C15.9776 6.76696 15.725 6.86776 15.5364 7.04992L12.0004 10.5859L8.46441 7.04992C8.37216 6.95441 8.26181 6.87822 8.13981 6.82582C8.01781 6.77341 7.88659 6.74582 7.75381 6.74467C7.62103 6.74351 7.48935 6.76881 7.36645 6.8191C7.24355 6.86938 7.1319 6.94363 7.03801 7.03752C6.94412 7.13141 6.86986 7.24307 6.81958 7.36596C6.7693 7.48886 6.744 7.62054 6.74515 7.75332C6.74631 7.8861 6.7739 8.01732 6.8263 8.13932C6.87871 8.26133 6.9549 8.37167 7.05041 8.46392L10.5864 11.9999L7.05041 15.5359C6.9549 15.6282 6.87871 15.7385 6.8263 15.8605C6.7739 15.9825 6.74631 16.1137 6.74515 16.2465C6.744 16.3793 6.7693 16.511 6.81958 16.6339C6.86986 16.7568 6.94412 16.8684 7.03801 16.9623C7.1319 17.0562 7.24355 17.1305 7.36645 17.1807C7.48935 17.231 7.62103 17.2563 7.75381 17.2552C7.88659 17.254 8.01781 17.2264 8.13981 17.174C8.26181 17.1216 8.37216 17.0454 8.46441 16.9499L12.0004 13.4139L15.5364 16.9499C15.6287 17.0454 15.739 17.1216 15.861 17.174C15.983 17.2264 16.1142 17.254 16.247 17.2552C16.3798 17.2563 16.5115 17.231 16.6344 17.1807C16.7573 17.1305 16.8689 17.0562 16.9628 16.9623C17.0567 16.8684 17.1309 16.7568 17.1812 16.6339C17.2315 16.511 17.2568 16.3793 17.2557 16.2465C17.2545 16.1137 17.2269 15.9825 17.1745 15.8605C17.1221 15.7385 17.0459 15.6282 16.9504 15.5359L13.4144 11.9999L16.9504 8.46392Z"
                                fill="#6464FA" />
                        </svg>
                    </div>
                </div>
                <div class="bg-white p-2 rounded-xl w-fit">
                    <p class="text-sm text-black">{{ formatDate(bookingDetails?.slot?.start_time) }}</p>
                </div>
                <div class="flex gap-4 items-center text-white">
                    <h3 class="text-xl font-bold">Hasil Konseling</h3>
                </div>
            </div>
            <div class="p-4 space-y-6 md:space-y-8 lg:space-y-12">
                <div class="space-y-3">
                    <div class="space-y-1">
                        <h2 class="text-2xl font-bold">Ringkasan Konseling</h2>
                        <p class="text-sm">Berikut adalah hasil konseling Anda dengan {{ consultantDetails?.name }} pada
                            tanggal {{ formatDate(bookingDetails?.slot?.start_time) }}.</p>
                    </div>
                    <div v-for="result in results" :key="result.id" class="space-y-3">
                        <div class="flex gap-4 items-center">
                            <h3 class="text-xl text-primary font-bold">{{ result.category?.name }}</h3>
                            <div class="w-6 h-6 bg-white rounded-full flex justify-center items-center p-1 cursor-pointer transition-transform duration-300"
                                :class="{ 'rotate-180': dropdownStates[`category-${result.id}`] }"
                                @click="toggleDropdown(`category-${result.id}`)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </div>
                        </div>
                        <div class="px-2 border-l border-primary overflow-hidden transition-all duration-300 ease-in-out"
                            :class="dropdownStates[`category-${result.id}`] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'">
                            <p class="text-sm py-2 whitespace-pre-line">{{ result.description }}</p>
                        </div>
                    </div>
                </div>
                <div v-if="results.some(result => result.recommended_assesments && result.recommended_assesments.length > 0)"
                    class="space-y-4">
                    <div class="space-y-1">
                        <h2 class="text-2xl font-bold">Rekomendasi Assessment</h2>
                        <p class="text-sm text-gray-600">Berdasarkan hasil konseling, kami merekomendasikan assessment berikut untuk membantu Anda memahami diri lebih dalam.</p>
                    </div>
                                        
                    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div class="space-y-4">
                            <div v-for="result in results" :key="'assessment-' + result.id">
                                <div v-if="result.recommended_assesments && result.recommended_assesments.length > 0">
                                    <div class="space-y-3">
                                        <div v-for="(assessmentId, index) in result.recommended_assesments" :key="index"
                                            class="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200">
                                            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#6565A8] to-[#9898FC] flex items-center justify-center text-white font-bold text-sm">
                                                {{ index + 1 }}
                                            </div>
                                            <div class="flex-1 space-y-2">
                                                <h4 class="font-semibold text-gray-800 text-base">{{ getAssessmentName(assessmentId) }}</h4>
                                                <div class="flex items-center gap-2 text-xs text-blue-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                        <path d="M9 11l3 3l8-8"/>
                                                        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9s4.03-9 9-9c1.51 0 2.93.37 4.18 1.03"/>
                                                    </svg>
                                                    <span>Direkomendasikan untuk Anda</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="recommendedConsultants.length > 0" class="space-y-4">
                    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div class="space-y-4">
                            <div class="space-y-2">
                                <h2 class="text-xl font-bold text-gray-800">Rekomendasi</h2>
                                <p class="text-sm text-gray-500">Lanjutkan sesi dengan psikolog relevan</p>
                            </div>
                                                        
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-4">
                                    <div class="flex -space-x-3">
                                        <div v-for="(consultant, index) in recommendedConsultants.slice(0, 3)" :key="consultant.id"
                                            class="relative">
                                            <img :src="consultant.image || '/images/default-avatar.jpg'"
                                                :alt="consultant.name"
                                                class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                                                :style="{ zIndex: 10 - index }" />
                                        </div>
                                        <div v-if="recommendedConsultants.length > 3"
                                            class="w-12 h-12 rounded-full bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center text-xs font-medium text-gray-600">
                                            +{{ recommendedConsultants.length - 3 }}
                                        </div>
                                    </div>
                                                                        
                                    <div class="text-sm text-gray-500">
                                        {{ recommendedConsultants.length }} Psikolog {{ getSpecializationText() }}
                                    </div>
                                </div>
                                                                
                                <button @click="goToReservationWithSpecialization"
                                    class="px-6 py-2.5 bg-primary text-white rounded-full font-medium text-sm hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                                    {{ 'Booking Sekarang' }}
                                </button>
                            </div>
                        </div>
                    </div>
                                        
                    <div v-if="showConsultantList" class="space-y-3 animate-fade-in">
                        <div v-for="consultant in recommendedConsultants" :key="consultant.id"
                            class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
                            @click="goToConsultant(consultant.id)">
                            <div class="flex items-center gap-4">
                                <img :src="consultant.image || '/images/default-avatar.jpg'"
                                    class="w-14 h-14 rounded-full object-cover border-2 border-gray-100">
                                <div class="flex-1">
                                    <h4 class="font-semibold text-gray-800 text-base">{{ consultant.name }}</h4>
                                    <p class="text-sm font-medium text-green-600 mt-1">Rp {{ consultant.fee.toLocaleString() }}/sesi</p>
                                    <div class="flex flex-wrap gap-1 mt-2">
                                        <span v-for="spec in consultant.specializations.slice(0, 2)" :key="spec.id"
                                            class="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-100">
                                            {{ spec.name }}
                                        </span>
                                        <span v-if="consultant.specializations.length > 2"
                                            class="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-full border border-gray-200">
                                            +{{ consultant.specializations.length - 2 }}
                                        </span>
                                    </div>
                                </div>
                                <div class="flex items-center text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12h14"/>
                                        <path d="M12 5l7 7-7 7"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="bookingDetails?.status === 'completed'" class="pt-6 space-y-4">
                    <div class=" rounded-2xl space-y-6">
                        <h3 class="text-lg font-semibold text-gray-800 text-center">
                            {{ existingTestimonial ? 'Edit Testimoni Anda' : 'Apakah sesi ini membantumu?' }}
                        </h3>
                        <p class="text-sm text-gray-600 text-center">
                            (1 tidak sama sekali, 5 sangat membantu)
                        </p>
                        <div class="flex justify-center space-x-2">
                            <button v-for="star in 5" :key="star" @click="testimonialRating = star"
                                class="text-3xl focus:outline-none transition-all duration-200 transform hover:scale-110"
                                :class="star <= (testimonialRating || (existingTestimonial?.rating || 0)) ? 'text-[#FF6B35]' : 'text-gray-300'">
                                ★
                            </button>
                        </div>
                        <div class="space-y-3">
                            <h4 class="text-base font-medium text-gray-800">
                                Apa Yang Paling Kamu Rasakan?
                            </h4>
                            <div class="flex flex-wrap gap-2 justify-center">
                                <button v-for="tag in testimonialTags" :key="tag" @click="toggleTag(tag)"
                                    class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                                    :class="selectedTags.includes(tag) ? 'bg-[#6B73FF] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'">
                                    {{ tag }}
                                </button>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <h4 class="text-base font-medium text-gray-800">
                                Ingin menyampaikan sesuatu?
                            </h4>
                            <div class="relative">
                                <div class="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200">
                                    <div class="w-8 h-8 rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none">
                                            <g clip-path="url(#clip0_2633_7455)">
                                                <mask id="mask0_2633_7455" style="mask-type:luminance"
                                                    maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <path d="M24 0H0V24H24V0Z" fill="white" />
                                                </mask>
                                                <g mask="url(#mask0_2633_7455)">
                                                    <path opacity="0.4"
                                                        d="M16.24 3.65039H7.76004C5.29004 3.65039 3.29004 5.66039 3.29004 8.12039V17.5304C3.29004 19.9904 5.30004 22.0004 7.76004 22.0004H16.23C18.7 22.0004 20.7 19.9904 20.7 17.5304V8.12039C20.71 5.65039 18.7 3.65039 16.24 3.65039Z"
                                                        fill="#6464FA" />
                                                    <path
                                                        d="M14.3498 2H9.64977C8.60977 2 7.75977 2.84 7.75977 3.88V4.82C7.75977 5.86 8.59977 6.7 9.63977 6.7H14.3498C15.3898 6.7 15.75 5.86 15.75 4.82V3.88C15.75 2.84 15.3898 2 14.3498 2Z"
                                                        fill="#6464FA" />
                                                    <path
                                                        d="M15 12.9492H8C7.59 12.9492 7.25 12.6092 7.25 12.1992C7.25 11.7892 7.59 11.4492 8 11.4492H15C15.41 11.4492 15.75 11.7892 15.75 12.1992C15.75 12.6092 15.41 12.9492 15 12.9492Z"
                                                        fill="#6464FA" />
                                                    <path
                                                        d="M12.38 16.9492H8C7.59 16.9492 7.25 16.6092 7.25 16.1992C7.25 15.7892 7.59 15.4492 8 15.4492H12.38C12.79 15.4492 13.13 15.7892 13.13 16.1992C13.13 16.6092 12.79 16.9492 12.38 16.9492Z"
                                                        fill="#6464FA" />
                                                </g>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_2633_7455">
                                                    <rect width="24" height="24" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <input v-model="testimonialComment" type="text"
                                        :placeholder="existingTestimonial ? 'Edit apresiasimu atau pengalamanmu...' : 'Tulis apresiasimu atau pengalamanmu hari ini...'"
                                        class="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400" />
                                </div>
                            </div>
                        </div>
                        <div v-if="testimonialError" class="text-red-500 text-sm text-center">
                            {{ testimonialError }}
                        </div>
                        <div class="flex gap-3">
                            <button @click="submitTestimonial"
                                class="flex-1 py-3 px-4 bg-[#6B73FF] text-white rounded-xl font-medium hover:bg-[#5A63E8] transition-colors disabled:opacity-50"
                                :disabled="isSubmittingTestimonial">
                                <span v-if="isSubmittingTestimonial">
                                    {{ existingTestimonial ? 'Mengupdate...' : 'Mengirim...' }}
                                </span>
                                <span v-else>
                                    {{ existingTestimonial ? 'Update Testimoni' : 'Kirim Testimoni' }}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="w-full h-full pt-32">
                    <div class="relative">
                        <div class="absolute flex items-end bottom-0 right-1/2 translate-x-1/2 z-10">
                            <div class="w-[10px] h-[10px] bg-transparent curve">
                                <div class="concave"></div>
                            </div>
                            <div class="w-48 md:w-48 lg:w-48 h-28 bg-primary rounded-t-full"></div>
                            <div class="w-[10px] h-[10px] bg-transparent curve-2">
                                <div class="concave-2"></div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full h-full bg-primary rounded-3xl p-4 relative pt-14">
                        <div class="absolute right-1/2 translate-x-1/2 -top-1/2 z-20">
                            <img :src="CTA" alt="" class="w-full h-full">
                        </div>
                        <div class="flex flex-col justify-center items-center gap-4">
                            <h3 class="text-xl font-bold text-white text-center">Ingin memahami diri lebih baik?
                                Konsultasi
                                dengan ahli!</h3>
                            <button class="py-3 px-[18px] rounded-full bg-white text-sm font-bold text-primary">Mulai
                                Konseling</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import initAPI from '@/api/api';
import Cookies from 'js-cookie';
import moment from 'moment';
import 'moment/locale/id';
import CTA from '@/assets/img/cta.png'

const route = useRoute();
const bookingId = route.params.id;
const results = ref([]);
const bookingDetails = ref(null);
const consultantDetails = ref(null);
const loading = ref(true);
const testimonialRating = ref(0);
const testimonialComment = ref('');
const isSubmittingTestimonial = ref(false);
const testimonialError = ref(null);
const existingTestimonial = ref(null);
const isEditingTestimonial = ref(false);
const isGeneratingPDF = ref(false);
const selectedTags = ref([]);
const recommendedConsultants = ref([]);
const assessmentsList = ref([]);
const dropdownStates = ref({});
const showConsultantList = ref(false);
const router = useRouter();

const navigateToHome = () => {
    router.push(`/hallopsy`);
};

const testimonialTags = [
    'Mendengarkan empati',
    'Saran Jelas',
    'Suasana Nyaman',
    'Perasaan Tenang',
    'Pemahaman Diri'
];

const getAssessmentName = (id) => {
    const assessment = assessmentsList.value.find(a => a.assesment_id == id);
    return assessment ? assessment.assesment_name : `Assessment ${id}`;
};

const getSpecializationText = () => {
    if (recommendedConsultants.value.length === 0) return '';
    
    const allSpecs = recommendedConsultants.value.flatMap(c => c.specializations);
    const uniqueSpecs = [...new Set(allSpecs.map(s => s.name))];
    
    if (uniqueSpecs.length === 1) {
        return uniqueSpecs[0].toLowerCase();
    } else if (uniqueSpecs.length === 2) {
        return uniqueSpecs.join(' & ').toLowerCase();
    } else {
        return 'berbagai spesialisasi';
    }
};

moment.locale('id');

const fetchTestimonial = async () => {
    try {
        const token = await Cookies.get('token');
        const response = await initAPI('get', `user/bookings/${bookingId}/testimonial`, null, token);
        if (response.data.success && response.data.data) {
            existingTestimonial.value = response.data.data;
            testimonialRating.value = existingTestimonial.value.rating;
            testimonialComment.value = existingTestimonial.value.comment;
            if (existingTestimonial.value.comment.includes('[Tags:')) {
                const tagMatch = existingTestimonial.value.comment.match(/\[Tags: (.*?)\]/);
                if (tagMatch && tagMatch[1]) {
                    selectedTags.value = tagMatch[1].split(', ');
                    testimonialComment.value = existingTestimonial.value.comment.replace(/\s*\[Tags:.*?\]/, '');
                }
            }
        } else {
            existingTestimonial.value = null;
        }
    } catch (error) {
        console.error('Failed to fetch testimonial:', error);
        existingTestimonial.value = null;
    }
};

const fetchRecommendedConsultants = async () => {
    try {
        const specializationIds = results.value.flatMap(result =>
            result.recommended_specializations || []
        );
        if (specializationIds.length > 0) {
            const token = await Cookies.get('token');
            const params = new URLSearchParams();
            specializationIds.forEach(id => params.append('specialization_ids[]', id));
            const url = `user/consultants/by-specializations?${params.toString()}`;
            const response = await initAPI('get', url, null, token);
            recommendedConsultants.value = response.data.data.data || [];
            recommendedConsultants.value = recommendedConsultants.value.filter(
                c => c.id !== bookingDetails.value.id
            );
        }
    } catch (error) {
        console.error('Failed to fetch recommended consultants:', error);
        if (error.response) {
            console.error('Error details:', error.response.data);
        }
    }
};

const fetchResults = async () => {
    try {
        const token = await Cookies.get('token');
        const bookingResponse = await initAPI('get', `user/bookings/${bookingId}`, null, token);
        bookingDetails.value = bookingResponse.data.data;
        const consultantResponse = await initAPI('get', `user/consultants/${bookingDetails.value.consultants_id}`, null, token);
        consultantDetails.value = consultantResponse.data.data;
        const resultsResponse = await initAPI('get', `user/bookings/${bookingId}/results`, null, token);
        results.value = resultsResponse.data.data;
        const assessmentsResponse = await initAPI('get', 'user/assesments-all', null, token);
        assessmentsList.value = assessmentsResponse.data.data;
        await fetchTestimonial();
        if (bookingResponse.data.data.testimonial) {
            existingTestimonial.value = bookingResponse.data.data.testimonial;
        }
        results.value.forEach(result => {
            dropdownStates.value[`category-${result.id}`] = false;
        });
    } catch (error) {
        console.error('Failed to fetch results:', error);
    } finally {
        loading.value = false;
    }
};

const formatDate = (date) => {
    return moment(date).format('DD MMMM YYYY, HH:mm') + ' WIB';
};

const toggleDropdown = (dropdownName) => {
    dropdownStates.value[dropdownName] = !dropdownStates.value[dropdownName];
};

const toggleTag = (tag) => {
    const index = selectedTags.value.indexOf(tag);
    if (index > -1) {
        selectedTags.value.splice(index, 1);
    } else {
        selectedTags.value.push(tag);
    }
};

const startEditingTestimonial = () => {
    if (existingTestimonial.value) {
        testimonialRating.value = existingTestimonial.value.rating;
        testimonialComment.value = existingTestimonial.value.comment;
        selectedTags.value = [];
    }
    isEditingTestimonial.value = true;
};

const cancelEditingTestimonial = () => {
    isEditingTestimonial.value = false;
    testimonialRating.value = 0;
    testimonialComment.value = '';
    selectedTags.value = [];
    testimonialError.value = null;
};

const submitTestimonial = async () => {
    if ((testimonialRating.value || (existingTestimonial.value?.rating || 0)) === 0) {
        testimonialError.value = 'Harap beri rating';
        return;
    }
    if (!testimonialComment.value.trim()) {
        testimonialError.value = 'Harap tulis ulasan Anda';
        return;
    }
    try {
        isSubmittingTestimonial.value = true;
        testimonialError.value = null;
        const token = await Cookies.get('token');
        // Combine comment with selected tags
        const commentWithTags = selectedTags.value.length > 0
            ? testimonialComment.value + ' [Tags: ' + selectedTags.value.join(', ') + ']'
            : testimonialComment.value;
        const finalRating = testimonialRating.value || existingTestimonial.value?.rating;
        if (existingTestimonial.value) {
            const response = await initAPI('put', `user/testimonials/${existingTestimonial.value.id}`, {
                rating: finalRating,
                comment: commentWithTags
            }, token);
            existingTestimonial.value = response.data.data;
        } else {
            const response = await initAPI('post', 'user/testimonials', {
                booking_id: bookingId,
                rating: finalRating,
                comment: commentWithTags
            }, token);
            existingTestimonial.value = response.data.data;
        }
        // Update form with new data
        testimonialRating.value = existingTestimonial.value.rating;
        if (existingTestimonial.value.comment.includes('[Tags:')) {
            const tagMatch = existingTestimonial.value.comment.match(/\[Tags: (.*?)\]/);
            if (tagMatch && tagMatch[1]) {
                selectedTags.value = tagMatch[1].split(', ');
                testimonialComment.value = existingTestimonial.value.comment.replace(/\s*\[Tags:.*?\]/, '');
            }
        } else {
            testimonialComment.value = existingTestimonial.value.comment;
        }
    } catch (error) {
        console.error('Failed to submit testimonial:', error);
        testimonialError.value = error.response?.data?.message || 'Gagal mengirim testimoni';
    } finally {
        isSubmittingTestimonial.value = false;
    }
};

const generatePDFContent = () => {
    // Get all recommended assessments
    const allRecommendedAssessments = results.value.flatMap(result => 
        (result.recommended_assesments || []).map(assessmentId => ({
            id: assessmentId,
            name: getAssessmentName(assessmentId)
        }))
    );

    // Get unique recommended consultants info
    const consultantSpecializations = recommendedConsultants.value.flatMap(c => 
        c.specializations.map(s => s.name)
    );
    const uniqueSpecializations = [...new Set(consultantSpecializations)];

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Hasil Konseling - ${consultantDetails.value?.name}</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');
                
                body {
                    font-family: 'Sora', Arial, sans-serif;
                    background-color: #F0F7FD;
                    margin: 0;
                    padding: 40px;
                    color: #333;
                    line-height: 1.6;
                }
                
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 20px;
                    padding: 40px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                }
                
                .header {
                    text-align: center;
                    margin-bottom: 40px;
                    padding-bottom: 30px;
                    border-bottom: 3px solid #4361ee;
                }
                
                .header h1 {
                    color: #4361ee;
                    font-size: 32px;
                    font-weight: 700;
                    margin: 0 0 10px 0;
                }
                
                .header .consultant-name {
                    font-size: 20px;
                    font-weight: 600;
                    color: #333;
                    margin: 10px 0;
                }
                
                .header .date {
                    color: #666;
                    font-size: 16px;
                    font-weight: 400;
                }
                
                .section {
                    margin: 40px 0;
                }
                
                .section-title {
                    color: #333;
                    font-size: 28px;
                    font-weight: 700;
                    margin-bottom: 10px;
                    border-bottom: 2px solid #4361ee;
                    padding-bottom: 10px;
                }
                
                .section-description {
                    color: #666;
                    font-size: 16px;
                    margin-bottom: 30px;
                    line-height: 1.6;
                }
                
                .result-item {
                    margin-bottom: 35px;
                    padding: 25px;
                    background: #f8f9ff;
                    border-left: 5px solid #4361ee;
                    border-radius: 0 10px 10px 0;
                }
                
                .result-category {
                    color: #4361ee;
                    font-size: 22px;
                    font-weight: 700;
                    margin-bottom: 15px;
                }
                
                .result-description {
                    color: #333;
                    font-size: 16px;
                    line-height: 1.7;
                    white-space: pre-line;
                    margin: 0;
                }
                
                .assessment-section {
                    background: #fff8e1;
                    border-radius: 15px;
                    padding: 25px;
                    border-left: 5px solid #ffc107;
                }
                
                .assessment-list {
                    list-style: none;
                    padding: 0;
                    margin: 20px 0;
                }
                
                .assessment-item {
                    background: white;
                    margin: 15px 0;
                    padding: 20px;
                    border-radius: 10px;
                    border: 1px solid #e3f2fd;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                
                .assessment-number {
                    background: linear-gradient(135deg, #6565A8, #9898FC);
                    color: white;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 14px;
                    flex-shrink: 0;
                }
                
                .assessment-name {
                    font-size: 16px;
                    font-weight: 600;
                    color: #333;
                    margin: 0;
                }
                
                .consultant-section {
                    background: #e8f5e8;
                    border-radius: 15px;
                    padding: 25px;
                    border-left: 5px solid #4caf50;
                }
                
                .consultant-info {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    margin: 15px 0;
                    border: 1px solid #e8f5e8;
                }
                
                .consultant-count {
                    font-size: 18px;
                    font-weight: 600;
                    color: #2e7d32;
                    margin-bottom: 10px;
                }
                
                .specialization-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-top: 10px;
                }
                
                .specialization-tag {
                    background: #e3f2fd;
                    color: #1976d2;
                    padding: 10px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 500;
                    border: 1px solid #bbdefb;
                }
                
                .testimonial-section {
                    margin: 40px 0;
                    padding: 25px;
                    background: #fff3e0;
                    border-radius: 15px;
                    border-left: 5px solid #ff9800;
                }
                
                .testimonial-title {
                    font-size: 20px;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 15px;
                }
                
                .rating {
                    margin: 10px 0;
                    font-size: 18px;
                }
                
                .star {
                    color: #ffc107;
                }
                
                .testimonial-comment {
                    background: white;
                    padding: 15px;
                    border-radius: 8px;
                    margin-top: 10px;
                    font-style: italic;
                    border-left: 3px solid #ff9800;
                }
                
                .footer {
                    margin-top: 50px;
                    padding-top: 30px;
                    border-top: 2px solid #e0e0e0;
                    text-align: center;
                    color: #666;
                    font-size: 14px;
                }
                
                @media print {
                    body {
                         background: white;
                         padding: 20px;
                     }
                    .container {
                        box-shadow: none;
                        border: 1px solid #ddd;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Hasil Konseling</h1>
                    <div class="consultant-name">Dengan ${consultantDetails.value?.name || 'Konsultan'}</div>
                    <div class="date">${formatDate(bookingDetails.value?.slot?.start_time)}</div>
                </div>
                
                <div class="section">
                    <h2 class="section-title">Ringkasan Konseling</h2>
                    <p class="section-description">
                        Berikut adalah hasil konseling Anda dengan ${consultantDetails.value?.name || 'konsultan'}
                         pada tanggal ${formatDate(bookingDetails.value?.slot?.start_time)}.
                    </p>
                    
                    ${results.value.map(result => `
                        <div class="result-item">
                            <h3 class="result-category">${result.category?.name || 'Kategori'}</h3>
                            <p class="result-description">${result.description || 'Tidak ada deskripsi tersedia.'}</p>
                        </div>
                    `).join('')}
                </div>
                
                ${allRecommendedAssessments.length > 0 ? `
                    <div class="section">
                        <h2 class="section-title">Rekomendasi Assessment</h2>
                        <div class="assessment-section">
                            <p class="section-description">
                                Berdasarkan hasil konseling, kami merekomendasikan assessment berikut untuk membantu Anda memahami diri lebih dalam.
                            </p>
                            <ul class="assessment-list">
                                ${allRecommendedAssessments.map((assessment, index) => `
                                    <li class="assessment-item">
                                        <div class="assessment-number">${index + 1}</div>
                                        <div>
                                            <h4 class="assessment-name">${assessment.name}</h4>
                                            <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Direkomendasikan untuk Anda</p>
                                        </div>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                ` : ''}
                
                ${recommendedConsultants.value.length > 0 ? `
                    <div class="section">
                        <h2 class="section-title">Rekomendasi Konsultan</h2>
                        <div class="consultant-section">
                            <p class="section-description">
                                Lanjutkan sesi dengan psikolog yang relevan dengan kebutuhan Anda.
                            </p>
                            <div class="consultant-info">
                                <div class="consultant-count">
                                    ${recommendedConsultants.value.length} Psikolog ${getSpecializationText()}
                                </div>
                                <p style="color: #666; margin: 10px 0;">Spesialisasi yang direkomendasikan:</p>
                                <div class="specialization-list">
                                    ${uniqueSpecializations.map(spec => `
                                        <span class="specialization-tag">${spec}</span>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                ` : ''}
                
                ${existingTestimonial.value ? `
                    <div class="testimonial-section">
                        <h3 class="testimonial-title">Testimoni Anda</h3>
                        <div class="rating">
                            ${'★'.repeat(existingTestimonial.value.rating)}${'☆'.repeat(5 - existingTestimonial.value.rating)}
                            (${existingTestimonial.value.rating}/5)
                        </div>
                        <div class="testimonial-comment">
                            "${existingTestimonial.value.comment.replace(/\s*\[Tags:.*?\]/, '')}"
                        </div>
                        ${selectedTags.value.length > 0 ? `
                            <div style="margin-top: 15px;">
                                <p style="margin: 0 0 8px 0; font-weight: 600; color: #333;">Tags yang dipilih:</p>
                                <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                                    ${selectedTags.value.map(tag => `
                                        <span style="background: #6B73FF; color: white; padding: 4px 10px; border-radius: 15px; font-size: 12px;">${tag}</span>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}
                
                <div class="footer">
                    <p>Dokumen ini digenerate secara otomatis pada ${moment().format('DD MMMM YYYY, HH:mm')} WIB</p>
                    <p>Terima kasih telah menggunakan layanan konseling kami.</p>
                    <p style="margin-top: 20px; font-style: italic; color: #888;">
                        Untuk konsultasi lebih lanjut, silakan hubungi tim kami atau booking sesi berikutnya melalui aplikasi.
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;
};

const downloadPDF = async () => {
    try {
        isGeneratingPDF.value = true;
        // Dynamic import untuk html2pdf
        const html2pdf = (await import('html2pdf.js')).default;
        const htmlContent = generatePDFContent();
        const opt = {
            margin: 1,
            filename: `hasil-konseling-${consultantDetails.value?.name?.replace(/\s+/g, '-') || 'konsultan'}-${moment().format('DD-MM-YYYY')}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true
            },
            jsPDF: {
                unit: 'in',
                format: 'a4',
                orientation: 'portrait'
            }
        };
        html2pdf().set(opt).from(htmlContent).save();
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Terjadi kesalahan saat membuat PDF. Silakan coba lagi.');
    } finally {
        isGeneratingPDF.value = false;
    }
};

onMounted(async () => {
    await fetchResults();
    await fetchRecommendedConsultants();
});

const goToConsultant = (id) => {
    router.push(`/consultants/${id}`);
};

const goToReservationWithSpecialization = () => {
  const specializationIds = recommendedConsultants.value.flatMap(
    consultant => consultant.specializations.map(spec => spec.id)
  );
  
  localStorage.setItem('selectedSpecializations', JSON.stringify(specializationIds));
  
  router.push('/hallopsy/reservasi');
};
</script>

<style scoped>
.curve {
    height: 20px;
    overflow: hidden;
    position: relative;
    transform: rotateX(180deg) rotateY(180deg);
    width: 20px;
}

.concave {
    border-radius: 50%;
    box-shadow: -20px -20px #4361ee;
    height: 40px;
    width: 40px;
    position: absolute;
    top: 0;
    left: 0;
}

.curve-2 {
    height: 20px;
    overflow: hidden;
    position: relative;
    transform: rotateX(180deg);
    width: 20px;
}

.concave-2 {
    border-radius: 50%;
    box-shadow: -20px -20px #4361ee;
    height: 40px;
    width: 40px;
    position: absolute;
    top: 0;
    left: 0;
}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.3s ease-out;
}
</style>
