<template>
    <div class="block lg:hidden w-full">
        <swiper 
            :navigation="true"
            :spaceBetween="30"
            :modules="modules"
            class="mySwiper"
        >
            <swiper-slide>
                <pendidikanVue/>
            </swiper-slide>
            <swiper-slide>
                <pekerjaan/>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import { useStore } from 'vuex';
import { computed } from 'vue'
import pendidikanVue from '../pendidikan/pendidikan.vue';
import pekerjaan from '../pekerjaan/pekerjaan.vue';

export default {
    name:'SlidePenddikanPekerjaan',
    components: {Swiper, SwiperSlide, pendidikanVue, pekerjaan},
    setup(){
        const store = useStore()
        const userResultDetect = computed(() => store.getters.getUserResultDetect);

        return{
            userResultDetect,
            modules: [Pagination, Navigation],
        }
    }
}
</script>