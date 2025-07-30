<template>
    <div class="bg-[#F0F7FD] w-full min-h-screen h-full">
        <div
            class="p-4 lg:px-20 lg:py-10 space-y-6 md:space-y-8 lg:space-y-12 bg-[#F0F7FD] font-sora pb-20 md:pb-0 md:max-w-[60%] lg:max-w-[40%] mx-auto">

            <div class="flex justify-between items-center transition-all duration-1000 ease-out"
                :class="headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'">
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="18" viewBox="0 0 9 18" fill="none"
                    @click="goBack" class="cursor-pointer">
                    <path
                        d="M7.46967 0.46967C7.76256 0.176777 8.23744 0.176777 8.53033 0.46967C8.82322 0.762563 8.82322 1.23744 8.53033 1.53033L3.35876 6.70191C2.08955 7.97112 2.08955 10.0289 3.35876 11.2981L8.53033 16.4697C8.82322 16.7626 8.82322 17.2374 8.53033 17.5303C8.23744 17.8232 7.76256 17.8232 7.46967 17.5303L2.2981 12.3588C0.443109 10.5038 0.443106 7.49624 2.29809 5.64125L7.46967 0.46967Z"
                        fill="#363538" />
                </svg>
                <h1 class="text-xl md:text-2xl font-bold">Book Details</h1>
                <div></div>
            </div>

            <div class="transition-all duration-1000 ease-out"
                :class="monthSelectorVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-bold">Select Date</h3>
                    <div class="flex gap-3 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            @click="prevMonth" class="cursor-pointer">
                            <path
                                d="M15.5307 4.53033C15.8236 4.23744 15.8236 3.76256 15.5307 3.46967C15.2378 3.17678 14.7629 3.17678 14.47 3.46967L9.29847 8.64125C7.44348 10.4962 7.44348 13.5038 9.29847 15.3588L14.47 20.5303C14.7629 20.8232 15.2378 20.8232 15.5307 20.5303C15.8236 20.2374 15.8236 19.7626 15.5307 19.4697L10.3591 14.2981C9.08993 13.0289 9.08992 10.9711 10.3591 9.70191L15.5307 4.53033Z"
                                fill="#363538" />
                        </svg>
                        <p class="text-xs">{{ format(currentMonth, 'MMMM yyyy') }}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            @click="nextMonth" class="cursor-pointer">
                            <path
                                d="M9.53033 3.46967C9.23744 3.17678 8.76256 3.17678 8.46967 3.46967C8.17678 3.76256 8.17678 4.23744 8.46967 4.53033L13.6412 9.70191C14.9104 10.9711 14.9104 13.0289 13.6412 14.2981L8.46967 19.4697C8.17678 19.7626 8.17678 20.2374 8.46967 20.5303C8.76256 20.8232 9.23744 20.8232 9.53033 20.5303L14.7019 15.3588C16.5569 13.5038 16.5569 10.4962 14.7019 8.64125L9.53033 3.46967Z"
                                fill="#363538" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="flex gap-4 overflow-x-auto pb-2">
                <div v-for="(date, index) in availableDates" :key="date" @click="selectDate(parseISO(date))"
                    class="p-[6px] group w-fit rounded-full border border-[#D6C9FF80] hover:border-primary transition-all duration-500 flex flex-col justify-center items-center text-center gap-1 cursor-pointer"
                    :class="{
                        'border-primary': selectedDate && format(selectedDate, 'yyyy-MM-dd') === date,
                        'opacity-100 translate-y-0': datesVisible,
                        'opacity-0 translate-y-4': !datesVisible
                    }" :style="datesVisible ? { transitionDelay: `${index * 100}ms`, transitionDuration: '700ms', transitionTimingFunction: 'ease-out' } : {}">
                    <p class="text-sm group-hover:text-primary"
                        :class="{ 'text-primary': selectedDate && format(selectedDate, 'yyyy-MM-dd') === date }">
                        {{ format(parseISO(date), 'EEE') }}
                    </p>
                    <div class="p-2 bg-[#D6C9FF80] group-hover:bg-primary transition-all duration-500 rounded-full"
                        :class="{ 'bg-primary': selectedDate && format(selectedDate, 'yyyy-MM-dd') === date }">
                        <p class="text-sm"
                            :class="{ 'text-white': selectedDate && format(selectedDate, 'yyyy-MM-dd') === date, 'text-black': !(selectedDate && format(selectedDate, 'yyyy-MM-dd') === date) }">
                            {{ format(parseISO(date), 'dd') }}
                        </p>
                    </div>
                </div>
                <div v-if="availableDates.length === 0" class="text-sm text-gray-500 p-2">
                    No available dates for this month
                </div>
            </div>

            <div class="bg-[#CBCBFD] w-full rounded-3xl p-4 space-y-8 transition-all duration-1000 ease-out"
                :class="timeSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-medium">Select Time</h3>
                    <div v-if="selectedDate" class="text-sm">
                        {{ format(selectedDate, 'MMMM d, yyyy') }}
                    </div>
                    <div v-else class="text-sm text-gray-500">
                        Please select a date first
                    </div>
                </div>

                <div v-if="isLoading" class="flex justify-center py-4">
                    <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>

                <div v-else-if="selectedDate" class="grid grid-cols-3 gap-2">
                    <div v-for="(slot, index) in availableSlots" :key="slot.id" @click="selectedSlot = slot"
                        class="py-2 px-5 group hover:bg-primary transition-all duration-500 rounded-full text-center cursor-pointer"
                        :class="{
                            'bg-primary': selectedSlot && selectedSlot.id === slot.id,
                            'bg-white': !(selectedSlot && selectedSlot.id === slot.id),
                            'opacity-100 scale-100': timeSectionVisible,
                            'opacity-0 scale-95': !timeSectionVisible
                        }" :style="timeSectionVisible ? { transitionDelay: `${index * 50}ms`, transitionDuration: '500ms', transitionTimingFunction: 'ease-out' } : {}">
                        <p class="text-sm transition-all duration-500"
                            :class="{ 'text-white': selectedSlot && selectedSlot.id === slot.id, 'text-black': !(selectedSlot && selectedSlot.id === slot.id) }">
                            {{ slot.start_time }}
                        </p>
                    </div>
                    <div v-if="availableSlots.length === 0" class="col-span-3 text-sm text-gray-500 text-center py-2">
                        No available slots for this date
                    </div>
                </div>
                <div v-else class="text-sm text-gray-500 text-center py-4">
                    Please select a date to see available time slots
                </div>
            </div>

            <div class="w-full hidden md:flex items-center gap-4 transition-all duration-1000 ease-out"
                :class="buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
                <button @click="goBack"
                    class="w-1/2 py-3 bg-[#F0F7FD] rounded-full text-primary font-bold text-lg border border-primary">Back</button>
                <button @click="submitRequest"
                    class="w-1/2 py-3 bg-primary rounded-full text-white font-bold text-lg border border-[#F0F7FD]">Next</button>
            </div>

            <div class="fixed bottom-4 left-4 right-4 flex items-center gap-4 md:hidden transition-all duration-1000 ease-out"
                :class="buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
                <button @click="goBack"
                    class="w-1/2 py-3 bg-[#F0F7FD] rounded-full text-primary font-bold text-lg border border-primary">Back</button>
                <button @click="submitRequest"
                    class="w-1/2 py-3 bg-primary rounded-full text-white font-bold text-lg border border-[#F0F7FD]">Next</button>
            </div>
        </div>

        <div v-if="showErrorModal"
            class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 modal-overlay"
            @click="closeModal">
            <div class="bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20 modal-content"
                @click.stop>
                <div
                    class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[#CBCBFD]/10 rounded-3xl">
                </div>

                <div class="relative z-10">
                    <div class="flex justify-center mb-6">
                        <div class="relative">
                            <div class="absolute inset-0 rounded-full animate-pulse bg-red-100"></div>

                            <div
                                class="relative w-20 h-20 rounded-full flex items-center justify-center transform scale-0 icon-scale bg-gradient-to-br from-red-400 to-red-600">

                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="h-10 w-10 text-white transform rotate-0 icon-rotate" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>

                            <div class="absolute -top-2 -right-2 w-3 h-3 rounded-full particle-1 bg-red-300"></div>
                            <div class="absolute -bottom-2 -left-2 w-2 h-2 rounded-full particle-2 bg-red-400"></div>
                            <div class="absolute top-1/2 -right-3 w-1.5 h-1.5 rounded-full particle-3 bg-red-200"></div>
                        </div>
                    </div>

                    <h3 class="text-2xl font-bold text-center mb-3 text-gray-800 opacity-0 title-fade">
                        Oops!
                    </h3>

                    <p class="text-center mb-8 text-gray-600 leading-relaxed opacity-0 message-fade">
                        {{ modalMessage }}
                    </p>

                    <button @click="closeModal" class="w-full py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 
                         rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl 
                         transform transition-all duration-300 hover:-translate-y-1 
                         focus:outline-none focus:ring-4 focus:ring-primary/20 
                         opacity-0 button-fade">
                        <span class="flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                            Got it
                        </span>
                    </button>
                </div>

                <div
                    class="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-white/30 to-transparent animate-pulse">
                </div>
                <div
                    class="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-gradient-to-tr from-primary/20 to-transparent animate-pulse delay-500">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import initAPI from '@/api/api';
import Cookies from 'js-cookie';
import { format, addMonths, subMonths, parseISO } from 'date-fns';
import moment from 'moment';

const router = useRouter();
const route = useRoute();

const currentMonth = ref(new Date());
const formattedMonth = ref(format(currentMonth.value, 'yyyy-MM'));
const selectedDate = ref(null);
const availableDates = ref([]);
const availableSlots = ref([]);
const selectedSlot = ref(null);
const isLoading = ref(false);
const isReschedule = computed(() => route.query.action === 'reschedule');

const headerVisible = ref(false);
const monthSelectorVisible = ref(false);
const datesVisible = ref(false);
const timeSectionVisible = ref(false);
const buttonsVisible = ref(false);
const showErrorModal = ref(false);
const modalMessage = ref('');

const fetchAvailableDates = async () => {
    try {
        isLoading.value = true;
        const token = await Cookies.get('token');
        const consultantId = localStorage.getItem('consultantId');
        const response = await initAPI('get', `user/consultants/${consultantId}/available-dates?month=${formattedMonth.value}`, null, token);

        if (response.data.success) {
            availableDates.value = response.data.data;
            setTimeout(() => {
                datesVisible.value = true;
            }, 100);
        }
    } catch (error) {
        console.error('Error fetching available dates:', error);
    } finally {
        isLoading.value = false;
    }
};

const fetchAvailableSlots = async (date) => {
    try {
        isLoading.value = true;
        const token = await Cookies.get('token');
        const consultantId = localStorage.getItem('consultantId');

        const formattedDate = format(date, 'yyyy-MM-dd');
        const url = `user/consultants/${consultantId}/available-slots?date=${formattedDate}`;

        const response = await initAPI('get', url, null, token);

        if (response.data.success) {
            availableSlots.value = response.data.data;
        }
    } catch (error) {
        console.error('Error fetching available slots:', error);
        modalMessage.value = error.response?.data?.message || 'Failed to load available time slots';
        showErrorModal.value = true;
    } finally {
        isLoading.value = false;
    }
};

const selectDate = (date) => {
    selectedDate.value = date;
    fetchAvailableSlots(date);
};

const nextMonth = () => {
    currentMonth.value = addMonths(currentMonth.value, 1);
    formattedMonth.value = format(currentMonth.value, 'yyyy-MM');
    fetchAvailableDates();
};

const prevMonth = () => {
    currentMonth.value = subMonths(currentMonth.value, 1);
    formattedMonth.value = format(currentMonth.value, 'yyyy-MM');
    fetchAvailableDates();
};

const goBack = () => {
    router.go(-1);
};

const submitRequest = async () => {
    if (!selectedSlot.value) {
        modalMessage.value = 'Please select a time slot';
        showErrorModal.value = true;
        return;
    }

    try {
        isLoading.value = true;
        const token = await Cookies.get('token');
        const bookingId = route.params.id;

        if (isReschedule.value) {
            const response = await initAPI('put', `user/bookings/${bookingId}/reschedule`, {
                slot_id: selectedSlot.value.id,
            }, token);

            if (response.data.success) {
                localStorage.removeItem('consultantId');
                router.push({ name: 'user.views.hallopsy' });
            }
        } else {
            const response = await initAPI('post', `user/bookings/${bookingId}/add-session`, {
                slot_id: selectedSlot.value.id,
            }, token);

            if (response.data.success) {
                localStorage.removeItem('consultantId');
                router.push({ name: 'user.views.hallopsy' });
            }
        }
    } catch (error) {
        console.error('Error:', error);
        modalMessage.value = error.response?.data?.message || 'Failed to process request';
        showErrorModal.value = true;
    } finally {
        isLoading.value = false;
    }
};

const formatToWIB = (utcTime) => {
    return moment.utc(utcTime, 'HH:mm').utcOffset(7).format('HH:mm');
};

const closeModal = () => {
    showErrorModal.value = false;
};

const triggerAnimations = () => {
    setTimeout(() => {
        headerVisible.value = true;
    }, 100);

    setTimeout(() => {
        monthSelectorVisible.value = true;
    }, 300);

    setTimeout(() => {
        timeSectionVisible.value = true;
    }, 500);

    setTimeout(() => {
        buttonsVisible.value = true;
    }, 700);
};

onMounted(() => {
    fetchAvailableDates();
    triggerAnimations();
});

watch(currentMonth, () => {
    fetchAvailableDates();
});
</script>

<style scoped>
@media (prefers-reduced-motion: reduce) {
    .transition-all {
        transition: none;
    }
}

/* Modal Animations */
.modal-overlay {
    animation: overlayFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-content {
    animation: modalSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.icon-scale {
    animation: iconScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards;
}

.icon-rotate {
    animation: iconRotate 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards;
}

.title-fade {
    animation: fadeInUp 0.6s ease-out 0.6s forwards;
}

.message-fade {
    animation: fadeInUp 0.6s ease-out 0.8s forwards;
}

.button-fade {
    animation: fadeInUp 0.6s ease-out 1s forwards;
}

.particle-1 {
    animation: floatParticle1 2s ease-in-out infinite 0.5s;
}

.particle-2 {
    animation: floatParticle2 2.5s ease-in-out infinite 0.8s;
}

.particle-3 {
    animation: floatParticle3 3s ease-in-out infinite 1.1s;
}

/* Keyframe Definitions */
@keyframes overlayFadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes modalSlideUp {
    from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

@keyframes iconScale {
    from {
        transform: scale(0) rotate(-180deg);
    }

    to {
        transform: scale(1) rotate(0deg);
    }
}

@keyframes iconRotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes floatParticle1 {

    0%,
    100% {
        transform: translateY(0) rotate(0deg);
    }

    50% {
        transform: translateY(-10px) rotate(180deg);
    }
}

@keyframes floatParticle2 {

    0%,
    100% {
        transform: translateX(0) rotate(0deg);
    }

    50% {
        transform: translateX(8px) rotate(-180deg);
    }
}

@keyframes floatParticle3 {

    0%,
    100% {
        transform: translate(0, 0) rotate(0deg);
    }

    33% {
        transform: translate(5px, -5px) rotate(120deg);
    }

    66% {
        transform: translate(-3px, -8px) rotate(240deg);
    }
}

/* Backdrop blur support */
@supports (backdrop-filter: blur(12px)) {
    .modal-overlay {
        backdrop-filter: blur(12px);
    }

    .modal-content {
        backdrop-filter: blur(16px);
    }
}
</style>