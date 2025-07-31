<script setup>
import Layout from '@/Layout/Customer/Layout.vue';
import Card from './components/Card.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import HistoryCard from './components/HistoryCard.vue';
import ExpertCard from './components/ExpertCard.vue';
import Logo from '@/assets/img/logo-white.png';
import Doc from '@/assets/img/doc.png';
import { onMounted, ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import initAPI from '@/api/api.js';
import Cookies from 'js-cookie';
import moment from 'moment-timezone';

const router = useRouter();

const data = [
    {
        title: 'Personal Consultation with Psychologist',
        description: '',
        image1: Logo,
        category: 'Psikologi',
        image2: Doc,
        color: 'bg-primary'
    },
    {
        title: 'Professional Counseling Sessions',
        description: '',
        image1: Logo,
        category: 'Konselor',
        image2: Doc,
        color: 'bg-violet-500'
    },
]

const history = ref([]);
const packages = ref([]);
const isLoading = ref(false);
const error = ref(null);

const expert = [
    {
        title: 'Psikologi',
        description: 'Psychologists are experts in the field of psychology who help understand, analyze, and treat mental or emotional problems through therapy and counseling. <br/><br/> They do not prescribe medication, but focus on psychological techniques such as CBT (Cognitive Behavioral Therapy) to help clients overcome their problems.'
    },
    {
        title: 'Konselor',
        description: 'Counselors are professionals who help with personal development, relationships, and everyday issues through counseling sessions.<br/><br/>They typically deal with issues such as stress, family conflict, or career, but do not treat serious mental disorders.'
    },
]

const breakpoints = {
    320: {
        slidesPerView: 1.2,
        spaceBetween: 16
    },
    768: {
        slidesPerView: 2.6,
        spaceBetween: 20
    },
    1024: {
        slidesPerView: 3.4,
        spaceBetween: 24
    }
};

const modules = [EffectFade, Autoplay];
const isLoaded = ref(false);

const heroVisible = ref(false);
const swiperVisible = ref(false);
const packagesVisible = ref(false);
const historyVisible = ref(false);
const expertVisible = ref(false);

// Popup state
const showPopup = ref(false);
const isClosing = ref(false);
const isMobile = ref(false);
const selectedCardData = ref(null);

const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 768;
};

const openPopup = (card) => {
    selectedCardData.value = card;
    showPopup.value = true;
    isClosing.value = false;
};

const closePopup = () => {
    isClosing.value = true;
    setTimeout(() => {
        showPopup.value = false;
    }, 500);
};

const navigateToReservation = () => {
    if (selectedCardData.value) {
        localStorage.setItem('selectedExpertType', selectedCardData.value.category.toLowerCase());
        router.push('/hallopsy/reservasi');
    }
};

const navigateToIgd = () => {
    router.push('/hallopsy/book/time');
};

const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return moment(dateString).tz('Asia/Jakarta').format('DD MMMM YYYY');
};

const formatTime = (timeString) => {
    if (!timeString) return '--:--';
    return moment(timeString).tz('Asia/Jakarta').format('HH:mm') + ' WIB';
};

const fetchBookingHistory = async () => {
    try {
        isLoading.value = true;
        error.value = null;
        const token = await Cookies.get('token');
        const response = await initAPI('get', 'user/bookings', null, token);

        if (response.data.success) {
            history.value = response.data.data.map(booking => ({
                id: booking.id,
                image: Doc,
                consultants_id: booking.consultants_id,
                name: booking.consultant?.name,
                role: booking.consultant?.type || 'Consultant',
                date: formatDate(booking.slot?.start_time),
                time: booking.slot ?
                    `${formatTime(booking.slot.start_time)} - ${formatTime(booking.slot.end_time)}` :
                    '--:-- - --:--',
                status: booking.status,
                payment_status: booking.payment_status,
                payment_method: booking.payment_method
            }));

            const bookingsByPackage = {};
            response.data.data.forEach(booking => {
                const groupKey = booking.parent_booking_id
                    ? `${booking.package.id}-${booking.parent_booking_id}`
                    : `${booking.package.id}-${booking.id}`;

                if (!bookingsByPackage[groupKey]) {
                    bookingsByPackage[groupKey] = {
                        id: booking.package.id,
                        booking_id: booking.id,
                        name: booking.package.name,
                        description: booking.package.description,
                        price: booking.package.price,
                        session_count: booking.package.session_count,
                        bookings: [],
                        consultants_id: booking.consultants_id,
                        parent_booking_id: booking.parent_booking_id,
                        payment_method: booking.payment_method,
                        total_booked_sessions: 0,
                        completed_sessions: 0,
                        can_add_more: true
                    };
                }

                const isParent = !booking.parent_booking_id;
                const parentStatus = isParent ? booking.status :
                    response.data.data.find(b => b.id === booking.parent_booking_id)?.status;

                bookingsByPackage[groupKey].bookings.push({
                    id: booking.id,
                    date: formatDate(booking.slot?.start_time || booking.created_at),
                    time: booking.slot ?
                        `${formatTime(booking.slot.start_time)} - ${formatTime(booking.slot.end_time)}` :
                        '--:-- - --:--',
                    status: booking.status,
                    is_parent: isParent,
                    parent_status: parentStatus,
                    payment_method: booking.payment_method
                });

                bookingsByPackage[groupKey].total_booked_sessions++;
                if (booking.status === 'completed') {
                    bookingsByPackage[groupKey].completed_sessions++;
                }
            });

            Object.values(bookingsByPackage).forEach(pkg => {
                pkg.can_add_more = pkg.total_booked_sessions < pkg.session_count;
            });

            packages.value = Object.values(bookingsByPackage);
        }
    } catch (err) {
        error.value = err.response?.data?.message || err.message || 'Failed to load booking history';
    } finally {
        isLoading.value = false;
    }
};

const localStorage = window.localStorage;
const handleAddSession = (consultantId) => {
    localStorage.setItem('consultantId', consultantId);
};

onMounted(async () => {
    isLoaded.value = true;
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    await nextTick();

    setTimeout(() => {
        heroVisible.value = true;
    }, 100);

    setTimeout(() => {
        swiperVisible.value = true;
    }, 300);

    setTimeout(() => {
        packagesVisible.value = true;
    }, 500);

    setTimeout(() => {
        historyVisible.value = true;
    }, 700);

    setTimeout(() => {
        expertVisible.value = true;
    }, 900);

    fetchBookingHistory();
});
</script>

<template>
    <Layout>
        <div
            class="p-4 lg:px-20 lg:py-10 space-y-6 md:space-y-8 lg:space-y-12 bg-[#F0F7FD] w-full h-full font-sora pb-20">

            <div class="space-y-2 transition-all duration-1000 ease-out"
                :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
                <h1 class="text-[32px] md:text-[36px] lg:text-[42px] font-bold leading-tight">Your Mental Health Our
                    Priority</h1>
                <p class="text-xs md:text-sm lg:text-base text-[#333333]">Get more benefits with our Protection program.
                </p>
            </div>

            <div class="transition-all duration-1000 ease-out delay-200"
                :class="swiperVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
                <div class="md:hidden">
                    <Swiper :breakpoints="breakpoints" :slides-per-view="1.2">
                        <SwiperSlide v-for="(item, index) in data" :key="index">
                            <div @click="openPopup(item)">
                                <Card :title="item.title" :category="item.category" :image1="item.image1"
                                    :image2="item.image2" :color="item.color" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div class="hidden md:block">
                    <Swiper :slides-per-view="1" :modules="modules" :effect="'fade'"
                        :autoplay="{ delay: 3000, disableOnInteraction: false }">
                        <SwiperSlide v-for="(item, index) in data" :key="index">
                            <div @click="openPopup(item)">
                                <Card :title="item.title" :category="item.category" :image1="item.image1"
                                    :image2="item.image2" :color="item.color" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>

            <div v-if="packages.length > 0"
                class="space-y-6 md:space-y-8 transition-all duration-1000 ease-out delay-300"
                :class="packagesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
                <div class="text-center space-y-2">
                    <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">Your Purchased
                        Packages</h1>
                    <p class="text-sm md:text-base text-gray-600">Manage your consultation packages and sessions</p>
                </div>

                <div v-if="isLoading" class="flex flex-col justify-center items-center py-16 space-y-4">
                    <div class="relative">
                        <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
                        <div
                            class="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent absolute top-0 left-0">
                        </div>
                    </div>
                    <p class="text-gray-500 font-medium">Loading your packages...</p>
                </div>

                <div v-else-if="error" class="text-center py-12 space-y-4">
                    <div class="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z">
                            </path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800">Something went wrong</h3>
                    <p class="text-red-600 max-w-md mx-auto">{{ error }}</p>
                    <button @click="fetchBookingHistory"
                        class="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                            </path>
                        </svg>
                        Try Again
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="(pkg, index) in packages" :key="pkg.id"
                        class="group bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100 animate-fade-in-up"
                        :style="{ animationDelay: `${index * 150}ms` }">
                        <div class="relative p-6 pb-4">
                            <div
                                class="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full">
                            </div>
                            <div
                                class="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-primary/30 to-primary/20 rounded-full">
                            </div>
                            <div class="relative z-10">
                                <div class="flex items-start justify-between mb-3">
                                    <div class="flex-1">
                                        <h2
                                            class="text-xl font-bold text-gray-800 leading-tight group-hover:text-primary transition-colors duration-300">
                                            {{ pkg.name }}
                                        </h2>
                                        <p class="text-sm text-gray-600 mt-2 line-clamp-2">
                                            {{ pkg.description }}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-white font-bold rounded-full text-sm shadow-md">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
                                        </path>
                                    </svg>
                                    Rp. {{ pkg.price }}
                                </div>
                            </div>
                        </div>
                        <div class="px-6 pb-4">
                            <div class="flex items-center justify-between mb-3">
                                <h3 class="font-semibold text-gray-800 flex items-center">
                                    <svg class="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                        </path>
                                    </svg>
                                    Sessions
                                </h3>
                                <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
                                    {{ pkg.bookings.length }} of {{ pkg.session_count }}
                                </span>
                            </div>
                            <div class="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                                <div v-for="(booking, bIndex) in pkg.bookings" :key="booking.id"
                                    class="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                    <div class="flex-1">
                                        <p class="text-sm font-medium text-gray-800">{{ booking.date }}</p>
                                        <p class="text-xs text-gray-600">{{ booking.time }}</p>
                                    </div>
                                    <span :class="[
                                        'text-xs px-2 py-1 rounded-full font-medium',
                                        booking.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            booking.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-gray-100 text-gray-700'
                                    ]">
                                        {{ booking.status }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div v-if="pkg.session_count > 1 && pkg.bookings.some(b => b.is_parent && b.status === 'completed') && pkg.can_add_more"
                            class="px-6 pb-6">
                            <router-link
                                :to="{ name: 'user.views.reservasi_detail_book_session', params: { id: pkg.bookings.find(b => b.is_parent)?.id } }"
                                @click="handleAddSession(pkg.consultants_id)"
                                class="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold rounded-full transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg group">
                                <svg class="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                Add New Session
                            </router-link>
                        </div>

                        <div v-else-if="pkg.session_count > 1 && !pkg.can_add_more" class="px-6 pb-6 text-center">
                            <div class="text-sm text-gray-600 bg-gray-100 rounded-lg p-3">
                                <p>You've reached the maximum sessions {{ pkg.session_count }} for this package.</p>
                                <router-link to="/hallopsy/reservasi" class="text-primary font-medium hover:underline">
                                    Book a new package
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="history.length > 0" class="space-y-4 transition-all duration-1000 ease-out delay-500"
                :class="historyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
                <div class="flex justify-between items-center">
                    <h1 class="text-xl font-bold">History</h1>
                    <router-link to="/hallopsy/booking-history" class="text-sm text-primary hover:underline"
                        v-if="history.length > 3">
                        View All
                    </router-link>
                </div>

                <div v-if="error" class="text-center py-6 text-red-500">
                    {{ error }}
                    <button @click="fetchBookingHistory" class="mt-2 px-4 py-2 bg-primary text-white rounded-md">
                        Retry
                    </button>
                </div>

                <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div v-for="(item, index) in history.slice(0, 3)" :key="item.id" class="animate-fade-in-up"
                        :style="{ animationDelay: `${index * 150}ms` }">
                        <HistoryCard :id="item.id" :image="item.image" :name="item.name" :role="item.role"
                            :date="item.date" :time="item.time" :status="item.status"
                            :consultants_id="item.consultants_id" />
                    </div>
                </div>
            </div>

            <div class="space-y-4">
                <h1 class="text-xl font-bold md:text-center">Which Expert Fits You?</h1>
                <div class="grid grid-cols-2 gap-4 md:gap-6 w-full md:max-w-[60%] lg:max-w-[40%] mx-auto">
                    <div v-for="(item, index) in expert" :key="index">
                        <ExpertCard :title="item.title" :description="item.description" />
                    </div>
                </div>
            </div>

            <!-- Popup Section -->
            <transition name="popup">
                <div v-if="showPopup && isMobile"
                    class="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-end transition-all duration-300"
                    @click.self="closePopup">
                    <div
                        :class="['w-full bg-white rounded-t-3xl relative', isClosing ? 'animate-slide-down' : 'animate-slide-up']">
                        <div class="p-6 space-y-6">
                            <h3 class="text-[20px] font-medium text-center">Mau Mulai Dari Mana?</h3>
                            <p class="text-base text-center">Pilih cara yang paling nyaman buatmu untuk mulai sesi
                                konseling.</p>
                            <div class="w-full space-y-4">
                                <div class="space-y-2 bg-[#A4A4A499] group hover:bg-primary cursor-pointer transition-all duration-500 p-4 md:p-6 rounded-3xl"
                                    @click="navigateToReservation">
                                    <div class="flex gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none">
                                            <!-- SVG icon -->
                                        </svg>
                                        <p class="text-base text-white">Pilih Berdasarkan {{ selectedCardData?.category
                                            }}</p>
                                    </div>
                                    <div>
                                        <p class="text-xs text-white">Lihat jadwal yang tersedia, lalu pilih {{
                                            selectedCardData?.category.toLowerCase() }} yang cocok.</p>
                                    </div>
                                </div>

                                <div class="space-y-2 bg-[#A4A4A499] group hover:bg-primary cursor-pointer transition-all duration-500 p-4 md:p-6 rounded-3xl"
                                    @click="navigateToIgd">
                                    <div class="flex gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none">
                                            <!-- SVG icon -->
                                        </svg>
                                        <p class="text-base text-white">Pilih Berdasarkan Waktu</p>
                                    </div>
                                    <div>
                                        <p class="text-xs text-white">Lihat profil psikolog terlebih dahulu, lalu
                                            tentukan jadwalnya.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>

            <transition name="popup">
                <div v-if="showPopup && !isMobile"
                    class="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center transition-all duration-300"
                    @click.self="closePopup">
                    <div
                        :class="['bg-white rounded-3xl relative w-full max-w-md mx-4', isClosing ? 'animate-fade-out' : 'animate-fade-in']">
                        <div class="p-6 space-y-6">
                            <h3 class="text-[20px] font-medium text-center">Mau Mulai Dari Mana?</h3>
                            <p class="text-base text-center">Pilih cara yang paling nyaman buatmu untuk mulai sesi
                                konseling.</p>
                            <div class="w-full space-y-4">
                                <div class="space-y-2 bg-[#A4A4A499] group hover:bg-primary cursor-pointer transition-all duration-500 p-4 md:p-6 rounded-3xl"
                                    @click="navigateToReservation">
                                    <div class="flex gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none">
                                            <!-- SVG icon -->
                                        </svg>
                                        <p class="text-base text-white">Pilih Berdasarkan {{ selectedCardData?.category
                                            }}</p>
                                    </div>
                                    <div>
                                        <p class="text-xs text-white">Lihat jadwal yang tersedia, lalu pilih {{
                                            selectedCardData?.category.toLowerCase() }} yang cocok.</p>
                                    </div>
                                </div>

                                <div class="space-y-2 bg-[#A4A4A499] group hover:bg-primary cursor-pointer transition-all duration-500 p-4 md:p-6 rounded-3xl"
                                    @click="navigateToIgd">
                                    <div class="flex gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none">
                                            <!-- SVG icon -->
                                        </svg>
                                        <p class="text-base text-white">Pilih Berdasarkan Waktu</p>
                                    </div>
                                    <div>
                                        <p class="text-xs text-white">Lihat profil psikolog terlebih dahulu, lalu
                                            tentukan jadwalnya.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </Layout>
</template>

<style scoped>
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slide-up {
    from {
        transform: translateY(100%);
    }

    to {
        transform: translateY(0);
    }
}

@keyframes slide-down {
    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(100%);
    }
}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes fade-out {
    from {
        opacity: 1;
        transform: scale(1);
    }

    to {
        opacity: 0;
        transform: scale(0.95);
    }
}

.animate-fade-in-up {
    opacity: 0;
    animation: fadeInUp 0.8s ease-out forwards;
}

.animate-slide-up {
    animation: slide-up 0.5s ease-out forwards;
}

.animate-slide-down {
    animation: slide-down 0.5s ease-out forwards;
}

.animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
}

.animate-fade-out {
    animation: fade-out 0.5s ease-out forwards;
}

.popup-enter-active,
.popup-leave-active {
    transition: opacity 0.5s ease;
}

.popup-enter-from,
.popup-leave-to {
    opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}

* {
    transition-property: transform, opacity, background-color, border-color, color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>