<template>
    <div class="block lg:hidden w-full">
        <swiper 
            :navigation="true"
            :spaceBetween="30"
            :modules="modules"
            class="mySwiper"
        >
            <swiper-slide>
                <kelebihan/>
            </swiper-slide>
            <swiper-slide>
                <kekurangan/>
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
import kelebihan from '../kelebihan/kelebihan.vue'
import kekurangan from '../kekurangan/kekurangan.vue'

export default {
    name:'SlideKelebihanKekurangan',
    components: {Swiper, SwiperSlide, kelebihan, kekurangan},
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