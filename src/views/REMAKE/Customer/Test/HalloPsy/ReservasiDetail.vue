<script setup>
import Layout from '@/Layout/Customer/Layout.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted, nextTick } from 'vue';
import initAPI from '@/api/api';
import { useStore } from 'vuex';
import Cookies from 'js-cookie';
import { saveToStorage } from '../../../../../utils/storage';

const router = useRouter();
const route = useRoute();
const store = useStore()
const consultant = ref(null);
const isLoading = ref(true);

const headerVisible = ref(false);
const consultantCardVisible = ref(false);
const aboutVisible = ref(false);
const buttonVisible = ref(false);
const statsVisible = ref([false, false, false]);

const fetchConsultantDetails = async () => {
    try {
        isLoading.value = true;
        const token = await Cookies.get('token');
        const consultantId = route.params.id;
        const response = await initAPI('get', `user/consultants/${consultantId}/details`, null, token);

        if (response.data.success) {
            consultant.value = response.data.data;

            await nextTick();
            triggerAnimations();
        }
    } catch (error) {
        console.error('Error fetching consultant details:', error);
    } finally {
        isLoading.value = false;
    }
};

const triggerAnimations = () => {
    setTimeout(() => {
        headerVisible.value = true;
    }, 100);

    setTimeout(() => {
        consultantCardVisible.value = true;
    }, 300);

    setTimeout(() => {
        statsVisible.value[0] = true;
    }, 800);

    setTimeout(() => {
        statsVisible.value[1] = true;
    }, 950);

    setTimeout(() => {
        statsVisible.value[2] = true;
    }, 1100);

    setTimeout(() => {
        aboutVisible.value = true;
    }, 1300);

    setTimeout(() => {
        buttonVisible.value = true;
    }, 1500);
};

const STORAGE_KEY = 'bookingData';

const navigateToBook = () => {
    const timeFilter = localStorage.getItem('bookingTimeFilter2');
    const bookJson = JSON.parse(timeFilter)
    console.log(bookJson)
    if (timeFilter && JSON.parse(timeFilter).isTimeFirst) {
        saveToStorage(STORAGE_KEY, {
            selectedDate: bookJson.selectedDate,
            selectedSlot: bookJson.selectedSlot,
            selectedPackage: bookJson.selectedPackage
        })

        store.commit('SET_BOOKING_DATA', {
            consultantId: route.params.id,
            selectedDate: bookJson.selectedDate,
            selectedSlot: bookJson.selectedSlot,
            selectedPackage: bookJson.selectedPackage
        });
        router.push(`/hallopsy/reservasi/detail/medical`);
    } else {
        router.push(`/hallopsy/reservasi/detail/${route.params.id}/book`);
    }
};

const goBack = () => {
    router.go(-1);
};

onMounted(() => {
    window.scrollTo(0, 0);
    fetchConsultantDetails();
});
</script>

<template>
    <!-- <Layout> -->
    <div class="w-full min-h-screen h-full bg-[#F0F7FD]">
        <div v-if="isLoading" class="min-h-screen h-full flex justify-center items-center py-10">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        <div v-else-if="consultant"
            class="p-4 lg:px-20 lg:py-10 space-y-6 md:space-y-8 lg:space-y-12 w-full md:h-screen font-sora pb-20 md:pb-0 md:max-w-[60%] lg:max-w-[40%] mx-auto">

            <div class="flex justify-between items-center transition-all duration-1000 ease-out"
                :class="headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'">
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="18" viewBox="0 0 9 18" fill="none"
                    @click="goBack" class="cursor-pointer hover:scale-110 transition-transform duration-200">
                    <path
                        d="M7.46967 0.46967C7.76256 0.176777 8.23744 0.176777 8.53033 0.46967C8.82322 0.762563 8.82322 1.23744 8.53033 1.53033L3.35876 6.70191C2.08955 7.97112 2.08955 10.0289 3.35876 11.2981L8.53033 16.4697C8.82322 16.7626 8.82322 17.2374 8.53033 17.5303C8.23744 17.8232 7.76256 17.8232 7.46967 17.5303L2.2981 12.3588C0.443109 10.5038 0.443106 7.49624 2.29809 5.64125L7.46967 0.46967Z"
                        fill="#363538" />
                </svg>
                <h1 class="text-xl md:text-2xl font-bold">Book Appoinment</h1>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"
                        class="hover:scale-110 transition-transform duration-200">
                        <path
                            d="M12.9362 11.522C12.5457 11.1315 11.9125 11.1315 11.522 11.522C11.1315 11.9125 11.1315 12.5457 11.522 12.9362L14.5861 16.0003L11.522 19.0645C11.1315 19.455 11.1315 20.0881 11.522 20.4787C11.9125 20.8692 12.5457 20.8692 12.9362 20.4787L16.0003 17.4145L19.0644 20.4787C19.455 20.8692 20.0881 20.8692 20.4787 20.4787C20.8692 20.0881 20.8692 19.455 20.4787 19.0645L17.4145 16.0003L20.4787 12.9362C20.8692 12.5457 20.8692 11.9125 20.4787 11.522C20.0881 11.1315 19.455 11.1315 19.0644 11.522L16.0003 14.5861L12.9362 11.522Z"
                            fill="#333333" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M3.73879 25.3337C2.66699 23.4773 2.66699 20.9849 2.66699 16.0003C2.66699 11.0157 2.66699 8.5234 3.73879 6.66699C4.44094 5.45084 5.45084 4.44094 6.66699 3.73879C8.5234 2.66699 11.0157 2.66699 16.0003 2.66699C20.9849 2.66699 23.4773 2.66699 25.3337 3.73879C26.5498 4.44094 27.5597 5.45084 28.2619 6.66699C29.3337 8.5234 29.3337 11.0157 29.3337 16.0003C29.3337 20.9849 29.3337 23.4773 28.2619 25.3337C27.5597 26.5498 26.5498 27.5597 25.3337 28.2619C23.4773 29.3337 20.9849 29.3337 16.0003 29.3337C11.0157 29.3337 8.5234 29.3337 6.66699 28.2619C5.45084 27.5597 4.44094 26.5498 3.73879 25.3337ZM27.2078 10.3411C27.0864 9.00162 26.8607 8.24006 26.5298 7.66699C26.0032 6.75488 25.2458 5.99745 24.3337 5.47084C23.7606 5.13998 22.999 4.9142 21.6595 4.7928C20.2926 4.66891 18.5294 4.66699 16.0003 4.66699C13.4712 4.66699 11.7081 4.66891 10.3411 4.7928C9.00162 4.9142 8.24006 5.13998 7.66699 5.47084C6.75488 5.99745 5.99745 6.75488 5.47084 7.66699C5.13998 8.24006 4.9142 9.00162 4.7928 10.3411C4.66891 11.7081 4.66699 13.4712 4.66699 16.0003C4.66699 18.5294 4.66891 20.2926 4.7928 21.6595C4.9142 22.999 5.13998 23.7606 5.47084 24.3337C5.99745 25.2458 6.75488 26.0032 7.66699 26.5298C8.24006 26.8607 9.00162 27.0864 10.3411 27.2078C11.7081 27.3317 13.4712 27.3337 16.0003 27.3337C18.5294 27.3337 20.2926 27.3317 21.6595 27.2078Z"
                            fill="#333333" />
                    </svg>
                </div>
            </div>

            <div class="w-full flex flex-col gap-6 md:gap-8 lg:gap-12">
                <div class="w-full h-[60vh] md:h-[40vh] lg:h-[45vh] flex flex-col items-center gap-4 relative transition-all duration-1000 ease-out delay-200"
                    :class="consultantCardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
                    <div class="w-full h-[60%] rounded-3xl bg-primary relative overflow-hidden">
                        <img :src="consultant.image" alt="Consultant Image"
                            class="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105">
                        <div class="absolute flex items-end bottom-0 right-1/2 translate-x-1/2 z-10">
                            <div class="w-[10px] h-[10px] bg-transparent curve-1">
                                <div class="concave-1"></div>
                            </div>
                            <div class="w-36 md:w-36 lg:w-36 h-8 bg-[#F0F7FD] rounded-t-2xl">
                            </div>
                            <div class="w-[10px] h-[10px] bg-transparent curve-2">
                                <div class="concave-2"></div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="absolute z-30 top-[55%] md:top-[56%] lg:top-[51%] xl:top-[55%] right-1/2 translate-x-1/2">
                        <div class="bg-primary rounded-full text-white text-sm md:text-base font-bold py-2 px-4">
                            {{ consultant.type || 'Consultant' }}
                        </div>
                    </div>
                    <div
                        class="w-full h-[40%] rounded-3xl flex justify-between items-center bg-white pb-4 px-6 pt-6 relative shadow-lg">
                        <div class="absolute flex items-start top-0 right-1/2 translate-x-1/2 z-10">
                            <div class="w-[10px] h-[10px] bg-transparent curve-3">
                                <div class="concave-3"></div>
                            </div>
                            <div class="w-36 md:w-36 lg:w-36 h-8 bg-[#F0F7FD] rounded-b-2xl">
                            </div>
                            <div class="w-[10px] h-[10px] bg-transparent curve-4">
                                <div class="concave-4"></div>
                            </div>
                        </div>

                        <div class="flex flex-col justify-center items-center text-center gap-2 transition-all duration-800 ease-out"
                            :class="statsVisible[0] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'">
                            <div
                                class="bg-primary rounded-full p-2 border-[2px] border-violet-500/80 flex justify-center items-center w-fit hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                                    fill="none">
                                    <path
                                        d="M2.83301 4.66667C2.83301 2.91776 4.25077 1.5 5.99967 1.5H8.8951C9.73496 1.5 10.5404 1.83363 11.1343 2.4275L12.2388 3.53207C12.8327 4.12593 13.1663 4.93138 13.1663 5.77124V8C13.1663 8.27614 12.9425 8.5 12.6663 8.5C12.3902 8.5 12.1663 8.27614 12.1663 8V5.77124C12.1663 5.1966 11.9381 4.6455 11.5317 4.23917L10.4272 3.1346C10.0208 2.72827 9.46974 2.5 8.8951 2.5H5.99967C4.80306 2.5 3.83301 3.47005 3.83301 4.66667V11.3333C3.83301 12.53 4.80306 13.5 5.99967 13.5H7.99967C8.27582 13.5 8.49967 13.7239 8.49967 14C8.49967 14.2761 8.27582 14.5 7.99967 14.5H5.99967C4.25077 14.5 2.83301 13.0822 2.83301 11.3333V4.66667Z"
                                        fill="white" />
                                    <path
                                        d="M6.00039 9C6.36858 9 6.66705 8.70152 6.66705 8.33333C6.66705 7.96514 6.36858 7.66667 6.00039 7.66667C5.6322 7.66667 5.33372 7.96514 5.33372 8.33333C5.33372 8.70152 5.6322 9 6.00039 9Z"
                                        fill="white" />
                                    <path
                                        d="M8.66705 9C9.03524 9 9.33372 8.70152 9.33372 8.33333C9.33372 7.96514 9.03524 7.66667 8.66705 7.66667C8.29886 7.66667 8.00039 7.96514 8.00039 8.33333C8.00039 8.70152 8.29886 9 8.66705 9Z"
                                        fill="white" />
                                    <path
                                        d="M12.0004 8.33333C12.0004 8.70152 11.7019 9 11.3337 9C10.9655 9 10.6671 8.70152 10.6671 8.33333C10.6671 7.96514 10.9655 7.66667 11.3337 7.66667C11.7019 7.66667 12.0004 7.96514 12.0004 8.33333Z"
                                        fill="white" />
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-sm font-semibold">{{ consultant.experience_years }}+</h4>
                                <p class="text-xs text-[#4A4A4A]">Experience</p>
                            </div>
                        </div>

                        <div class="flex flex-col justify-center items-center text-center gap-2 transition-all duration-800 ease-out"
                            :class="statsVisible[1] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'">
                            <div
                                class="bg-primary rounded-full p-2 border-[2px] border-violet-500/80 flex justify-center items-center w-fit hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                                    fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M7.35281 2.68175C7.65555 2.21676 8.34445 2.21676 8.64719 2.68175L10.1981 5.06389C10.3023 5.22388 10.4635 5.33946 10.6499 5.38776L13.4256 6.1068C13.9675 6.24716 14.1803 6.89354 13.8256 7.32128L12.0085 9.51257C11.8864 9.65974 11.8248 9.84676 11.8359 10.0366L12.0004 12.8631C12.0325 13.4149 11.4752 13.8144 10.9532 13.6137L8.27925 12.5859C8.09966 12.5168 7.90034 12.5168 7.72075 12.5859L5.04675 13.6137C4.52479 13.8144 3.96745 13.4149 3.99957 12.8631L4.16413 10.0366C4.17518 9.84676 4.11359 9.65974 3.99154 9.51257L2.17437 7.32128C1.81965 6.89354 2.03254 6.24716 2.57435 6.1068L5.35005 5.38776C5.53647 5.33946 5.69773 5.22388 5.80189 5.06389L7.35281 2.68175ZM6.63993 5.60951L8 3.52049L9.36007 5.60951C9.60173 5.98067 9.97348 6.24552 10.3992 6.3558L12.8094 6.98017L11.2387 8.87423C10.956 9.21508 10.8117 9.65064 10.8376 10.0947L10.9807 12.5529L8.63804 11.6525C8.22749 11.4946 7.77251 11.4946 7.36196 11.6525L5.01933 12.5529L5.16244 10.0947C5.18829 9.65064 5.04396 9.21508 4.7613 8.87423L3.19061 6.98017L5.60082 6.3558C6.02652 6.24552 6.39827 5.98067 6.63993 5.60951Z"
                                        fill="white" />
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-sm font-semibold">{{ consultant.rating }}</h4>
                                <p class="text-xs text-[#4A4A4A]">Rating</p>
                            </div>
                        </div>

                        <div class="flex flex-col justify-center items-center text-center gap-2 transition-all duration-800 ease-out"
                            :class="statsVisible[2] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'">
                            <div
                                class="bg-primary rounded-full p-2 border-[2px] border-violet-500/80 flex justify-center items-center w-fit hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                                    fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M3.6077 7.74837C3.62102 5.03216 5.82987 2.83333 8.55398 2.83333C8.90114 2.83333 9.23943 2.86897 9.56556 2.93662C9.83594 2.9927 10.1006 2.81898 10.1567 2.54859C10.2128 2.2782 10.039 2.01355 9.76866 1.95746C9.37611 1.87604 8.96977 1.83333 8.55398 1.83333C5.27048 1.83333 2.60764 4.49208 2.60764 7.77308V7.7984L2.83221 10.0107C2.83072 10.025 2.82789 10.0466 2.82262 10.0744C2.80951 10.1436 2.78146 10.2501 2.72173 10.3772C2.60514 10.6252 2.35665 10.976 1.80887 11.2835C1.68078 11.3555 1.54573 11.4805 1.48609 11.6732C1.42654 11.8656 1.46686 12.0457 1.53185 12.1795C1.6503 12.4234 1.8909 12.6084 2.14255 12.7495C2.67163 13.0461 3.57011 13.3239 4.92375 13.4943L5.87162 13.6695L6.29063 13.816C10.3021 15.2183 14.5003 12.2448 14.5003 7.99767V7.77308C14.5003 7.2296 14.4271 6.7024 14.2897 6.20116C14.2167 5.93484 13.9417 5.77812 13.6754 5.85112C13.409 5.92411 13.2523 6.19918 13.3253 6.4655C13.4393 6.88142 13.5003 7.31974 13.5003 7.77308V7.99767C13.5003 11.5543 9.98368 14.0477 6.62063 12.872L6.12901 12.7002L5.07687 12.5057L5.06237 12.5039C3.81938 12.3485 3.07359 12.1082 2.68669 11.907C3.17644 11.5496 3.46289 11.1511 3.62669 10.8027C3.72678 10.5898 3.77847 10.4013 3.80515 10.2606C3.81849 10.1901 3.82562 10.1314 3.82942 10.0871C3.83132 10.0649 3.83239 10.0463 3.83298 10.0316C3.83328 10.0242 3.83346 10.0178 3.83356 10.0124L3.83366 10.0051L3.83368 10.002L3.83369 10.0006C3.83369 10.0006 4.30514 9.9993 3.80515 10L3.83369 9.9993L3.83365 9.97434L3.6077 7.74837Z"
                                        fill="white" />
                                    <path
                                        d="M13.1671 2C13.1671 1.72386 12.9432 1.5 12.6671 1.5C12.3909 1.5 12.1671 1.72386 12.1671 2V2.83333H11.3337C11.0576 2.83333 10.8337 3.05719 10.8337 3.33333C10.8337 3.60948 11.0576 3.83333 11.3337 3.83333H12.1671V4.66667C12.1671 4.94281 12.3909 5.16667 12.6671 5.16667C12.9432 5.16667 13.1671 4.94281 13.1671 4.66667V3.83333H14.0004C14.2765 3.83333 14.5004 3.60948 14.5004 3.33333C14.5004 3.05719 14.2765 2.83333 14.0004 2.83333H13.1671V2Z"
                                        fill="white" />
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-sm font-semibold">{{ consultant.testimonial_count }}+</h4>
                                <p class="text-xs text-[#4A4A4A]">Testimonial</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="p-4 rounded-3xl bg-white w-full shadow-lg transition-all duration-1000 ease-out delay-700"
                    :class="aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
                    <h3 class="text-base font-bold mb-2">About {{ consultant.type || 'Consultant' }}</h3>
                    <p class="text-sm leading-relaxed" v-html="consultant.description"></p>
                </div>

                <div class="w-full hidden md:block transition-all duration-1000 ease-out delay-900"
                    :class="buttonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
                    <button @click="navigateToBook"
                        class="w-full bg-primary text-white py-3 rounded-full font-bold hover:bg-primary/90 hover:scale-105 hover:shadow-lg transition-all duration-300">Book
                        Appointment</button>
                </div>

                <div class="fixed bottom-4 left-4 right-4 md:hidden transition-all duration-1000 ease-out delay-900"
                    :class="buttonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
                    <button @click="navigateToBook"
                        class="w-full bg-primary text-white py-3 rounded-full font-bold hover:bg-primary/90 hover:scale-105 hover:shadow-lg transition-all duration-300">Book
                        Appointment</button>
                </div>
            </div>
        </div>
    </div>
    <!-- </Layout> -->
</template>

<style scoped>
/* Existing curve styles remain unchanged */
.curve-1 {
    height: 20px;
    overflow: hidden;
    position: relative;
    transform: rotateX(180deg) rotateY(180deg);
    width: 20px;
}

.concave-1 {
    border-radius: 50%;
    box-shadow: -20px -20px #F0F7FD;
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
    box-shadow: -20px -20px #F0F7FD;
    height: 40px;
    width: 40px;
    position: absolute;
    top: 0;
    left: 0;
}

.curve-3 {
    height: 20px;
    overflow: hidden;
    position: relative;
    transform: rotateY(180deg);
    width: 20px;
}

.concave-3 {
    border-radius: 50%;
    box-shadow: -20px -20px #F0F7FD;
    height: 40px;
    width: 40px;
    position: absolute;
    top: 0;
    left: 0;
}

.curve-4 {
    height: 20px;
    overflow: hidden;
    position: relative;
    transform: rotateY(180deg) rotateY(180deg);
    width: 20px;
}

.concave-4 {
    border-radius: 50%;
    box-shadow: -20px -20px #F0F7FD;
    height: 40px;
    width: 40px;
    position: absolute;
    top: 0;
    left: 0;
}

/* New animation styles */
@keyframes bounceIn {
    0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.3);
    }

    50% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.05);
    }

    70% {
        transform: translate(-50%, -50%) scale(0.9);
    }

    100% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

.animate-bounce-in {
    opacity: 0;
    animation: bounceIn 0.6s ease-out forwards;
}

/* Smooth transitions for all interactive elements */
* {
    transition-property: transform, opacity, background-color, border-color, color, fill, stroke, box-shadow;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>