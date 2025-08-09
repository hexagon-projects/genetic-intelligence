<script setup>
import Layout from '@/Layout/Customer/Layout.vue';
import ProfileCard from './components/ProfileCard.vue';
import Doc from '@/assets/img/doc.png'
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import initAPI from '@/api/api';
import Cookies from 'js-cookie'

const router = useRouter()
const consultants = ref([])
const filteredConsultants = ref([])
const activeFilter = ref('all')
const activeSpecialization = ref(null)
const isLoading = ref(true)
const allSpecializations = ref([]);
const headerVisible = ref(false)
const filterVisible = ref(false)
const specializationFilterVisible = ref(false)
const titleVisible = ref(false)
const consultantsVisible = ref(false)
const localStorage = window.localStorage;
const bookingTimeFilter = ref(null);

const showSpecializationPopup = ref(false)

const fetchAllSpecializations = async () => {
  try {
    const token = await Cookies.get('token');
    const response = await initAPI('get', 'user/consultants/specializations-all', null, token);
    allSpecializations.value = response.data.data;
  } catch (error) {
    console.error('Gagal mengambil spesialisasi:', error);
  }
};

const fetchConsultants = async () => {
  try {
    isLoading.value = true
    const token = await Cookies.get('token');
    const bookingFlow = localStorage.getItem('isBookingByTime');

    if (bookingFlow === 'true') {
      const timeFilter = localStorage.getItem('bookingTimeFilter');
      if (timeFilter) {
        bookingTimeFilter.value = JSON.parse(timeFilter);
        const response = await initAPI('get',
          `user/consultants/filter-by-time?date=${bookingTimeFilter.value.selectedDate}&start_time=${bookingTimeFilter.value.selectedTime}&end_time=${bookingTimeFilter.value.endTime}`,
          null, token);

        if (response.data.success) {
          consultants.value = response.data.data.data.map(consultant => {
            const testimonials = consultant.testimonials || [];
            const totalRating = testimonials.reduce((sum, testimonial) => sum + (testimonial.rating || 0), 0);
            const averageRating = testimonials.length > 0 ? (totalRating / testimonials.length).toFixed(1) : 0;
            const slot = consultant?.available_slots?.[0] || null;

            if (bookingFlow === 'true') {
              const bookingData = {
                ...bookingTimeFilter.value,
                selectedSlot: slot,
                consultantId: consultant.id
              };
              localStorage.setItem('bookingTimeFilter2', JSON.stringify(bookingData));
            }

            return {
              id: consultant.id,
              image: consultant.image ? `http://127.0.0.1:8000/storage/consultants/${consultant.image}` : Doc,
              name: consultant.name,
              role: consultant.type || 'Konsultan',
              rating: averageRating,
              reviews: testimonials.length,
              fee: consultant.fee,
              type: consultant.type,
              specializations: consultant.specializations,
              specializationNames: consultant.specializations.map(spec => spec.name).join(', ')
            };
          });

          const uniqueTypes = [...new Set(consultants.value.map(consultant => consultant.type).filter(Boolean))]
          filters.value = [
            { id: 'all', label: 'Semua' },
            ...uniqueTypes.map(type => ({ id: type.toLowerCase(), label: type }))
          ]
          applyFilter(activeFilter.value)
        }
      }
    } else {
      let endpoint = 'user/consultants';
      if (activeSpecialization.value) {
        endpoint = `user/consultants/by-specializations?specialization_ids[]=${activeSpecialization.value}`;
      }

      const response = await initAPI('get', endpoint, null, token);
      if (response.data.success) {
        consultants.value = response.data.data.data.map(consultant => {
          const testimonials = consultant.testimonials || [];
          const totalRating = testimonials.reduce((sum, testimonial) => sum + (testimonial.rating || 0), 0);
          const averageRating = testimonials.length > 0 ? (totalRating / testimonials.length).toFixed(1) : 0;
          const slot = consultant?.available_slots

          return {
            id: consultant.id,
            image: consultant.image ? `http://127.0.0.1:8000/storage/consultants/${consultant.image}` : Doc,
            name: consultant.name,
            role: consultant.type || 'Konsultan',
            rating: averageRating,
            reviews: testimonials.length,
            fee: consultant.fee,
            type: consultant.type,
            specializations: consultant.specializations,
            specializationNames: consultant.specializations.map(spec => spec.name).join(', ')
          }
        })

        const uniqueTypes = [...new Set(consultants.value.map(consultant => consultant.type).filter(Boolean))]
        filters.value = [
          { id: 'all', label: 'Semua' },
          ...uniqueTypes.map(type => ({ id: type.toLowerCase(), label: type }))
        ]
        applyFilter(activeFilter.value)
      }
    }
  } catch (error) {
    console.error('Error fetching consultants:', error)
  } finally {
    isLoading.value = false
    setTimeout(() => {
      consultantsVisible.value = true
    }, 100)
  }
}

const filters = ref([
  { id: 'all', label: 'Semua' }
])

const applyFilter = (filter) => {
  activeFilter.value = filter
  if (filter === 'all') {
    filteredConsultants.value = [...consultants.value]
  } else {
    filteredConsultants.value = consultants.value.filter(consultant =>
      consultant.type?.toLowerCase() === filter.toLowerCase()
    )
  }

  if (!isLoading.value) {
    consultantsVisible.value = false
    setTimeout(() => {
      consultantsVisible.value = true
    }, 50)
  }
}

const applySpecializationFilter = (specializationId) => {
  activeSpecialization.value = specializationId === 'all' ? null : specializationId;
  showSpecializationPopup.value = false;
  fetchConsultants();
}

const navigateToReservation = (id) => {
  localStorage.removeItem('bookingTimeFilter');
  localStorage.removeItem('isBookingByTime');
  router.push(`/hallopsy/reservasi/detail/${id}`);
};

const goBack = () => {
  router.go(-1);
};

const triggerAnimations = () => {
  setTimeout(() => {
    headerVisible.value = true;
  }, 100);

  setTimeout(() => {
    filterVisible.value = true;
  }, 300);

  setTimeout(() => {
    specializationFilterVisible.value = true;
  }, 500);

  setTimeout(() => {
    titleVisible.value = true;
  }, 700);
};

const getActiveSpecializationName = () => {
  if (!activeSpecialization.value) return '';
  const specialization = allSpecializations.value.find(spec => spec.id.toString() === activeSpecialization.value.toString());
  return specialization ? specialization.name : '';
};

onMounted(() => {
  window.scrollTo(0, 0);
  fetchAllSpecializations()

  // Baca spesialisasi yang dipilih dari localStorage
  const selectedSpecializations = localStorage.getItem('selectedSpecializations');
  if (selectedSpecializations) {
    const specs = JSON.parse(selectedSpecializations);
    if (specs.length > 0) {
      activeSpecialization.value = specs[0]; // Ambil spesialisasi pertama
      localStorage.removeItem('selectedSpecializations'); // Hapus setelah digunakan
    }
  }

  fetchConsultants()
  triggerAnimations()

  const selectedExpertType = localStorage.getItem('selectedExpertType');
  if (selectedExpertType) {
    applyFilter(selectedExpertType);
    localStorage.removeItem('selectedExpertType');
  }

  router.afterEach((to, from) => {
    window.scrollTo(0, 0);
  });
});
</script>

<template>
  <div
    class="p-4 lg:px-20 lg:py-10 space-y-6 md:space-y-8 lg:space-y-12 bg-[#F0F7FD] font-sora min-h-screen h-full md:h-screen">
    <div class="flex justify-between items-center transition-all duration-1000 ease-out"
      :class="headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'">
      <svg xmlns="http://www.w3.org/2000/svg" width="9" height="18" viewBox="0 0 9 18" fill="none" @click="goBack"
        class="cursor-pointer">
        <path
          d="M7.46967 0.46967C7.76256 0.176777 8.23744 0.176777 8.53033 0.46967C8.82322 0.762563 8.82322 1.23744 8.53033 1.53033L3.35876 6.70191C2.08955 7.97112 2.08955 10.0289 3.35876 11.2981L8.53033 16.4697C8.82322 16.7626 8.82322 17.2374 8.53033 17.5303C8.23744 17.8232 7.76256 17.8232 7.46967 17.5303L2.2981 12.3588C0.443109 10.5038 0.443106 7.49624 2.29809 5.64125L7.46967 0.46967Z"
          fill="#363538" />
      </svg>
      <h1 class="text-xl md:text-2xl font-bold">Reservasi</h1>
      <div></div>
    </div>

    <div class="space-y-4">
      <div class="bg-white rounded-full flex w-fit mx-auto md:mr-auto md:mx-0 p-2 transition-all duration-1000 ease-out"
        :class="filterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
        <div v-for="(filter, index) in filters" :key="filter.id" @click="applyFilter(filter.id)" :class="[
          'py-2 px-6 md:px-12 group rounded-full transition-all duration-500 cursor-pointer',
          activeFilter === filter.id
            ? 'bg-primary shadow-sm shadow-primary text-white'
            : 'hover:bg-primary hover:shadow-sm hover:shadow-primary'
        ]" :style="filterVisible ? { transitionDelay: `${index * 100}ms` } : {}">
          <p class="text-base">{{ filter.label }}</p>
        </div>
      </div>
    </div>

    <div v-if="showSpecializationPopup"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="showSpecializationPopup = false">
      <div class="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto" @click.stop>
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">Filter Spesialisasi</h3>
            <button @click="showSpecializationPopup = false"
              class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <div class="space-y-2">
            <div @click="applySpecializationFilter('all')" :class="[
              'p-3 rounded-lg cursor-pointer transition-all duration-200',
              !activeSpecialization
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100'
            ]">
              <p class="text-sm font-medium">Semua Spesialisasi</p>
            </div>

            <div v-for="specialization in allSpecializations" :key="specialization.id"
              @click="applySpecializationFilter(specialization.id)" :class="[
                'p-3 rounded-lg cursor-pointer transition-all duration-200',
                activeSpecialization === specialization.id.toString()
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100'
              ]">
              <p class="text-sm font-medium">{{ specialization.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center py-10">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>

    <div v-else class="space-y-4">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold text-left transition-all duration-1000 ease-out"
          :class="titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
          Pilih Konsultan
        </h1>

        <div class="flex w-fit ml-auto md:mx-0 transition-all duration-1000 ease-out"
          :class="specializationFilterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
          <button @click="showSpecializationPopup = true"
            class="text-black px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g clip-path="url(#clip0_2565_9423)">
                <mask id="mask0_2565_9423" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                  height="24">
                  <path d="M24 0H0V24H24V0Z" fill="white" />
                </mask>
                <g mask="url(#mask0_2565_9423)">
                  <path
                    d="M17.9199 10.12C17.5899 10.04 17.2399 10 16.8799 10C14.2599 10 12.1299 12.13 12.1299 14.75C12.1299 15.64 12.3799 16.48 12.8199 17.2C13.1899 17.82 13.6999 18.35 14.3199 18.73C15.0599 19.22 15.9399 19.5 16.8799 19.5C18.6199 19.5 20.1299 18.57 20.9499 17.2C21.3899 16.48 21.6299 15.64 21.6299 14.75C21.6299 12.49 20.0499 10.59 17.9199 10.12ZM19.2499 14.13L16.7099 16.47C16.5699 16.6 16.3799 16.67 16.1999 16.67C16.0099 16.67 15.8199 16.6 15.6699 16.45L14.4999 15.28C14.2099 14.99 14.2099 14.51 14.4999 14.22C14.7899 13.93 15.2699 13.93 15.5599 14.22L16.2198 14.88L18.2299 13.03C18.5399 12.75 19.0099 12.77 19.2899 13.07C19.5699 13.38 19.5499 13.85 19.2499 14.13Z"
                    fill="#6464FA" />
                  <path opacity="0.4"
                    d="M5.41016 2H18.5802C19.6802 2 20.5802 2.90999 20.5802 4.01999V6.23999C20.5802 7.04999 20.0802 8.06 19.5802 8.56L15.2902 12.4C14.6902 12.91 14.2902 13.92 14.2902 14.72V19.06C14.2902 19.67 13.8902 20.47 13.3902 20.78L11.9902 21.69C10.6902 22.5 8.90021 21.59 8.90021 19.97V14.62C8.90021 13.91 8.50016 13 8.10016 12.5L4.31018 8.45999C3.81018 7.94999 3.41016 7.05 3.41016 6.44V4.12C3.42016 2.91 4.32016 2 5.41016 2Z"
                    fill="#6464FA" />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_2565_9423">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <p class="text-sm">Filter</p>
          </button>

          <div v-if="activeSpecialization" class="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
            <span class="text-xs text-blue-700">{{ getActiveSpecializationName() }}</span>
            <button @click="applySpecializationFilter('all')" class="text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-if="filteredConsultants.length === 0" class="text-center py-10 transition-all duration-700 ease-out"
        :class="consultantsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
        <p class="text-gray-500">Tidak ada konsultan yang tersedia</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        <div v-for="(consultant, index) in filteredConsultants" :key="`${consultant.id}-${activeFilter}`"
          class="transition-all duration-700 ease-out"
          :class="consultantsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          :style="consultantsVisible ? { transitionDelay: `${index * 100}ms` } : {}">
          <ProfileCard @click="navigateToReservation(consultant.id)" :image="consultant.image" :name="consultant.name"
            :role="consultant.role" :rating="consultant.rating" :reviews="consultant.reviews" :fee="consultant.fee"
            :specializations="consultant.specializationNames" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  .transition-all {
    transition: none;
  }
}
</style>