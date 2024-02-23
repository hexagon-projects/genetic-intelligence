<template>
    <div class="block lg:hidden w-full">
        <div class="bg-white rounded-lg shadow-sm p-4 h-[370px]">
            <div class="flex justify-between">
                <transition name="fade" mode="out-in">
                    <img v-if="indexSlide == 0" class="w-24 drop-shadow-2xl shadow-dark -mt-3 mb-2 animate-wiggle" src="../../../assets/img/kelebihan.png" alt="">
                    <img v-else-if="indexSlide == 1" class="w-24 drop-shadow-2xl shadow-dark -mt-3 mb-2 animate-wiggle" src="../../../assets/img/kekurangan.png" alt="">
                </transition>
                <div class="flex items-center gap-2 -mt-12">
                    <button @click="btnSlide('prev')" :class="{'opacity-50': indexSlide == 0}" class="bg-biru shadow-sm p-2 text-white text-sm rounded-full hover:bg-opacity-75">
                        <PhCaretLeft/>
                    </button>
                    <button @click="btnSlide('next')" :class="{'opacity-50': indexSlide == 1}" class="bg-biru shadow-sm p-2 text-white text-sm rounded-full hover:bg-opacity-75">
                        <PhCaretRight/>
                    </button>
                </div>
            </div>
            
            <transition name="fade" mode="out-in">
                <div v-if="indexSlide == 0">
                    <kelebihan/>
                </div>
    
                <div v-else-if="indexSlide == 1">
                    <kekurangan/>
                </div>
            </transition>
        </div>
        <!-- <swiper 
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
        </swiper> -->
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import { useStore } from 'vuex';
import { ref, computed } from 'vue'
import kelebihan from '../kelebihan/kelebihan.vue'
import kekurangan from '../kekurangan/kekurangan.vue'
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue';

export default {
    name:'SlideKelebihanKekurangan',
    components: {PhCaretLeft, PhCaretRight, kelebihan, kekurangan},
    setup(){
        const store = useStore()
        const userResultDetect = computed(() => store.getters.getUserResultDetect);

        const indexSlide = ref(0)

        const btnSlide = (params) => {
            if (params === 'next' && indexSlide.value < 1) {
                indexSlide.value += 1
            } else if (params === 'prev' && indexSlide.value > 0) {
                indexSlide.value -= 1
            }
        }

        return{
            userResultDetect,
            indexSlide,
            btnSlide,
            modules: [Pagination, Navigation],
        }
    }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>