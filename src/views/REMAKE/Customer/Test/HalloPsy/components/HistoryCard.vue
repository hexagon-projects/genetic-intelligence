<script setup>
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import 'moment/locale/id';

moment.locale('id'); 

const props = defineProps({
    id: Number,
    image: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: ""
    },
    date: {
        type: String,
        default: ""
    },
    time: {
        type: String,
        default: ""
    },
    consultants_id: Number,
    status: {
        type: String,
        default: ""
    },
})
const router = useRouter();

const viewDetails = () => {
    router.push({ name: 'user.views.hallopsy_book_detail', params: { id: props.id } });
};


const localStorage = window.localStorage;

const handleReschedule = () => {
    localStorage.setItem('consultantId', props.consultants_id);
    router.push({
        name: 'user.views.reservasi_detail_book_session',
        params: { id: props.id },
        query: { action: 'reschedule' }
    });
};

const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'confirmed': 'bg-blue-100 text-blue-800',
    'cancelled': 'bg-red-100 text-red-800',
    'ongoing': 'bg-purple-100 text-purple-800',
    'completed': 'bg-green-100 text-green-800'
};

const getStatusClass = (status) => {
    const lowerStatus = status.toLowerCase();
    return statusColors[lowerStatus] || 'bg-gray-100 text-gray-800';
};

const formatToWIB = (utcTime) => {
  return moment(utcTime, 'HH:mm').tz('Asia/Jakarta').format('[Pukul] HH:mm [WIB]');
};
</script>

<template>
    <div class="w-full rounded-3xl h-full bg-white p-3 flex item-center gap-6">
        <div class="w-[40%] h-[160px] md:h-[220px] lg:h-[220px] xl:h-[200px] rounded-2xl bg-primary">
            <img :src="image" alt="" class="w-full h-full object-cover object-top">
        </div>

        <div class="w-[60%] flex flex-col justify-center items-start gap-2 md:gap-4">
            <div class="w-fit py-2 px-4 rounded-full text-xs" :class="getStatusClass(status)">
                {{ status }}
            </div>
            <div class="space-y-1">
                <h3 class="text-base md:text-lg font-bold leading-tight">{{ name }}</h3>
                <p class="text-sm md:text-sm">{{ role }}</p>
                <div class="flex gap-2 items-center">
                    <p class="text-[10px] md:text-[12px]">{{ date }}</p>
                    <p class="text-[10px] md:text-[12px]">{{ formatToWIB(time) }}</p>
                </div>
            </div>
            <div class="flex w-full gap-4">
                <button @click="viewDetails"
                    class="w-full border-[4px] border-white/20 rounded-full bg-primary text-xs md:text-sm text-white py-2">Details</button>
                <button v-if="status === 'pending' || status === 'confirmed'" @click="handleReschedule"
                    class="p-2 border-[4px] border-white/20 bg-primary flex justify-center items-center rounded-full"><svg
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                            d="M4.66634 2C4.94248 2 5.16634 2.22386 5.16634 2.5H10.833C10.833 2.22386 11.0569 2 11.333 2C11.6091 2 11.833 2.22386 11.833 2.5H11.9997C13.4724 2.5 14.6663 3.69391 14.6663 5.16667V8.66667C14.6663 8.94281 14.4425 9.16667 14.1663 9.16667C13.8902 9.16667 13.6663 8.94281 13.6663 8.66667V5.16667C13.6663 4.24619 12.9201 3.5 11.9997 3.5H11.833V4.5C11.833 4.77614 11.6091 5 11.333 5C11.0569 5 10.833 4.77614 10.833 4.5V3.5H5.16634V4.5C5.16634 4.77614 4.94248 5 4.66634 5C4.3902 5 4.16634 4.77614 4.16634 4.5V3.5H3.99967C3.0792 3.5 2.33301 4.24619 2.33301 5.16667V12.5C2.33301 13.4205 3.0792 14.1667 3.99967 14.1667H8.16634C8.44248 14.1667 8.66634 14.3905 8.66634 14.6667C8.66634 14.9428 8.44248 15.1667 8.16634 15.1667H3.99967C2.52692 15.1667 1.33301 13.9728 1.33301 12.5V5.16667C1.33301 3.69391 2.52692 2.5 3.99967 2.5H4.16634C4.16634 2.22386 4.3902 2 4.66634 2Z"
                            fill="white" />
                        <path
                            d="M5.33301 7.16667C5.33301 7.53486 5.03453 7.83333 4.66634 7.83333C4.29815 7.83333 3.99967 7.53486 3.99967 7.16667C3.99967 6.79848 4.29815 6.5 4.66634 6.5C5.03453 6.5 5.33301 6.79848 5.33301 7.16667Z"
                            fill="white" />
                        <path
                            d="M7.99967 7.83333C8.36786 7.83333 8.66634 7.53486 8.66634 7.16667C8.66634 6.79848 8.36786 6.5 7.99967 6.5C7.63148 6.5 7.33301 6.79848 7.33301 7.16667C7.33301 7.53486 7.63148 7.83333 7.99967 7.83333Z"
                            fill="white" />
                        <path
                            d="M11.9997 7.16667C11.9997 7.53486 11.7012 7.83333 11.333 7.83333C10.9648 7.83333 10.6663 7.53486 10.6663 7.16667C10.6663 6.79848 10.9648 6.5 11.333 6.5C11.7012 6.5 11.9997 6.79848 11.9997 7.16667Z"
                            fill="white" />
                        <path
                            d="M4.66634 10.1667C5.03453 10.1667 5.33301 9.86819 5.33301 9.5C5.33301 9.13181 5.03453 8.83333 4.66634 8.83333C4.29815 8.83333 3.99967 9.13181 3.99967 9.5C3.99967 9.86819 4.29815 10.1667 4.66634 10.1667Z"
                            fill="white" />
                        <path
                            d="M8.66634 9.5C8.66634 9.86819 8.36786 10.1667 7.99967 10.1667C7.63148 10.1667 7.33301 9.86819 7.33301 9.5C7.33301 9.13181 7.63148 8.83333 7.99967 8.83333C8.36786 8.83333 8.66634 9.13181 8.66634 9.5Z"
                            fill="white" />
                        <path
                            d="M11.9997 9.5C11.9997 9.50689 11.9996 9.51375 11.9994 9.52059C11.8903 9.507 11.7791 9.5 11.6663 9.5C11.3225 9.5 10.9938 9.56509 10.692 9.68363C10.6753 9.62529 10.6663 9.56369 10.6663 9.5C10.6663 9.13181 10.9648 8.83333 11.333 8.83333C11.7012 8.83333 11.9997 9.13181 11.9997 9.5Z"
                            fill="white" />
                        <path
                            d="M5.33301 11.8333C5.33301 12.2015 5.03453 12.5 4.66634 12.5C4.29815 12.5 3.99967 12.2015 3.99967 11.8333C3.99967 11.4651 4.29815 11.1667 4.66634 11.1667C5.03453 11.1667 5.33301 11.4651 5.33301 11.8333Z"
                            fill="white" />
                        <path
                            d="M7.99967 12.5C8.36786 12.5 8.66634 12.2015 8.66634 11.8333C8.66634 11.4651 8.36786 11.1667 7.99967 11.1667C7.63148 11.1667 7.33301 11.4651 7.33301 11.8333C7.33301 12.2015 7.63148 12.5 7.99967 12.5Z"
                            fill="white" />
                        <path
                            d="M8.62626 13.3648C8.431 13.1695 8.431 12.853 8.62626 12.6577L9.20023 12.0837C9.39549 11.8885 9.71208 11.8885 9.90734 12.0837L10.4813 12.6577C10.6766 12.853 10.6766 13.1695 10.4813 13.3648C10.402 13.4441 10.3026 13.4912 10.1995 13.5061C10.4747 14.1447 11.1099 14.5918 11.8494 14.5918C12.3127 14.5918 12.734 14.417 13.0528 14.129C13.2577 13.9439 13.5739 13.9599 13.759 14.1648C13.9442 14.3697 13.9281 14.6859 13.7232 14.871C13.2278 15.3186 12.5699 15.5918 11.8494 15.5918C10.5432 15.5918 9.44621 14.696 9.13919 13.4853C8.96499 13.5437 8.765 13.5035 8.62626 13.3648Z"
                            fill="white" />
                        <path
                            d="M15.0526 12.2272C15.2479 12.4224 15.2479 12.739 15.0526 12.9343L14.4787 13.5083C14.2834 13.7035 13.9668 13.7035 13.7716 13.5083L13.1976 12.9343C13.0023 12.739 13.0023 12.4224 13.1976 12.2272C13.2769 12.1478 13.3763 12.1007 13.4795 12.0859C13.2043 11.4471 12.5691 11 11.8294 11C11.3818 11 10.9736 11.1631 10.659 11.4337C10.4497 11.6138 10.134 11.5901 9.95391 11.3807C9.77383 11.1714 9.79756 10.8557 10.0069 10.6756C10.4961 10.2548 11.1336 10 11.8294 10C13.1357 10 14.2327 10.8959 14.5397 12.1067C14.7139 12.0483 14.9139 12.0884 15.0526 12.2272Z"
                            fill="white" />
                    </svg></button>
            </div>
        </div>
    </div>
</template>