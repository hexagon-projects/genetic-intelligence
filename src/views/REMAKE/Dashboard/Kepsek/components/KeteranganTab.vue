<script>
import { ref, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        dataDesc: {
            type: Array,
            default: () => []
        }
    },
    setup(props) {
        const activeTab = ref(0)
        const isTransitioning = ref(false)
        const contentKey = ref(0)

        const tabs = ref([
            {
                title: "Jatidiri Sekolah",
                image: 'https://cms.jatidiri.app/storage/programs/w3MAlfzsnaiUrdOH1qHAgfcotz031yMIBvuj0RNS.jpg',
                content: props.dataDesc[0] ? `${props.dataDesc[0][0]}% siswa memiliki kecerdasan dominan ${props.dataDesc[0][1].category}. ${props.dataDesc[0][1].desc}` : "Data tidak tersedia",
            },
            {
                title: "Jatidiri Corporate",
                image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                content: props.dataDesc[1] ? `${props.dataDesc[1][0]}% siswa memiliki gaya belajar ${props.dataDesc[1][1].name}. ${props.dataDesc[1][1].description}` : "Data tidak tersedia",
            },
            {
                title: "Jatidiri University",
                image: 'https://images.unsplash.com/photo-1661693758705-4fa65572bced?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                content: props.dataDesc[2] ? `${props.dataDesc[2][0]}% siswa memiliki klasifikasi IQ ${props.dataDesc[2][1].category}. ${props.dataDesc[2][1].desc}` : "Data tidak tersedia",
            },
        ])

        const setActiveTab = async (index) => {
            if (index === activeTab.value || isTransitioning.value) return

            isTransitioning.value = true

            await nextTick()

            setTimeout(() => {
                activeTab.value = index
                contentKey.value++

                setTimeout(() => {
                    isTransitioning.value = false
                }, 100)
            }, 150)
        }

        const isLastTab = (index) => {
            return index === tabs.value.length - 1;
        }

        const isFirstTab = (index) => {
            return index === 0;
        }

        return {
            activeTab,
            tabs,
            setActiveTab,
            isTransitioning,
            contentKey,
            isLastTab,
            isFirstTab,
        }
    }
}
</script>

<template>
    <div class="w-full h-full md:py-[80px]">
        <div
            class="bg-white mx-auto transition-all duration-500 ease-in-out space-y-4 md:space-y-6 lg:space-y-8 rounded-[8px] md:rounded-[16px] lg:rounded-[24px] hidden md:block">

            <div class="w-full h-full">
                <div class="w-full h-full bg-[#F1F1F1] rounded-[8px] md:rounded-[16px] lg:rounded-[24px] p-4">
                    <div class="w-full px-1 pt-1">
                        <div class="w-full grid grid-cols-5 text-center">
                            <div v-for="(tab, index) in tabs" :key="index"
                                class="p-1 lg:p-4 text-black cursor-pointer transition-all duration-300 ease-in-out transform relative "
                                :class="{
                                    'rounded-t-[8px] md:rounded-t-[16px] lg:rounded-t-[24px]': activeTab === index,
                                    '': activeTab !== index
                                }" @click="setActiveTab(index)">
                                <span class="relative z-10 text-[8px] md:text-[12px] lg:text-[16px] font-sora">{{
                                    tab.title }}</span>

                                <div class="absolute bottom-0 -right-5 z-10" :class="{
                                    'block': activeTab === index && index === 0,
                                    'hidden': activeTab !== index || index !== 0
                                }">
                                    <div class="w-[10px] h-[10px] bg-transparent curved-3">
                                        <div class="concaved-3"></div>
                                    </div>
                                </div>

                                <div class="absolute bottom-0 -right-5 z-10" :class="{
                                    'block': activeTab === index && index !== 0 && index !== 4,
                                    'hidden': activeTab !== index || index === 0 || index === 4
                                }">
                                    <div class="w-[10px] h-[10px] bg-transparent curved-3">
                                        <div class="concaved-3"></div>
                                    </div>
                                </div>

                                <div class="absolute bottom-0 -left-5 z-10" :class="{
                                    'block': activeTab === index && index !== 0 && index !== 4,
                                    'hidden': activeTab !== index || index === 0 || index === 4
                                }">
                                    <div class="w-[10px] h-[10px] bg-transparent curved-4">
                                        <div class="concaved-4"></div>
                                    </div>
                                </div>

                                <div class="absolute bottom-0 -left-5 z-10" :class="{
                                    'block': activeTab === index && index === 4,
                                    'hidden': activeTab !== index || index !== 4
                                }">
                                    <div class="w-[10px] h-[10px] bg-transparent curved-4">
                                        <div class="concaved-4"></div>
                                    </div>
                                </div>

                                <div v-if="activeTab === index" layoutId="activeTabIndicator"
                                    initial="{ scaleY: 0 }" animate="{ scaleY: 1 }" exit="{ scaleY: 0 }"
                                    class="absolute inset-0 bg-white rounded-t-[8px] md:rounded-t-[16px] lg:rounded-t-[24px] z-0"
                                    :style="{
                                        originY: 'bottom',
                                        scaleY: 1
                                    }" :transition="{
                                        type: 'spring',
                                        bounce: 0.2,
                                        duration: 0.6
                                    }" />
                            </div>
                        </div>
                    </div>

                    <div class="w-full h-full px-1 pb-1">
                        <div class="w-full bg-white h-full p-4 md:p-6 lg:p-8 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 lg:gap-8 rounded-b-[8px] md:rounded-b-[16px] lg:rounded-b-[24px] transition-all duration-300 ease-in-out overflow-hidden"
                            :class="{
                                'rounded-tr-[8px] md:rounded-tr-[16px] lg:rounded-tr-[24px]': isFirstTab(activeTab),
                                'rounded-t-[8px] md:rounded-t-[16px] lg:rounded-t-[24px]': !isFirstTab(activeTab) && !isLastTab(activeTab),
                                'rounded-tl-[8px] md:rounded-tl-[16px] lg:rounded-tl-[24px]': isLastTab(activeTab),
                                'opacity-70': isTransitioning
                            }" :key="contentKey">
                            <div class="w-full text-black space-y-4 lg:space-y-4">
                                <h5 class="text-[14px] md:text-[16px] lg:text-[20px] animate-slide-in-top">Catatan Untuk Siswa:</h5>
                                <p class="font-light animate-slide-in-left text-[12px] md:text-[14px] lg:text-[16px]"><span class="font-light"
                                        v-html="tabs[activeTab].content"></span></p>
                                <div class="grid grid-cols-2 gap-4 md:gap-5 lg:gap-6 animate-slide-in-left">
                                    <div v-for="(feature, index) in tabs[activeTab].features" :key="index"
                                        class="flex gap-2 items-center" :style="{ animationDelay: `${index * 100}ms` }">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="w-6 h-6 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        <p class="text-[12px] md:text-[14px] lg:text-[16px]">{{ feature }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="py-6 space-y-4 md:hidden">
            <div class="pl-4">
                <swiper class="w-full" :slides-per-view="1.2" :space-between="12" :centered-slides="false"
                    :grab-cursor="true" :watch-slides-progress="true">
                    <swiper-slide v-for="(tab, index) in tabs" :key="index">
                        <div class="w-full h-[35vh] relative rounded-[16px] bg-cover bg-center"
                            :style="'background-image: url(' + tab.image + ');'">
                            <div class="absolute bottom-0 w-full h-28 p-2 bg-white/20 backdrop-blur-sm rounded-b-[16px]" style="mask-image: linear-gradient(to top, rgba(0,0,0,1) 30%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)"></div>
                            <div
                                class="absolute bottom-0 w-full p-2 z-10 space-y-2">
                                <div>
                                    <h6 class="text-[16px] font-bold text-white">{{ tab.title }}</h6>
                                    <p class="text-[12px] text-white">Package</p>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<style scoped>
.curved-3 {
    height: 20px;
    overflow: hidden;
    position: relative;
    transform: rotateX(180deg);
    width: 20px;
}

.concaved-3 {
    border-radius: 50%;
    box-shadow: -20px -20px #ffffff;
    height: 40px;
    width: 40px;
    position: absolute;
    top: 0;
    left: 0;
}

.curved-4 {
    height: 20px;
    overflow: hidden;
    position: relative;
    transform: rotateX(180deg) rotateY(180deg);
    width: 20px;
}

.concaved-4 {
    border-radius: 50%;
    box-shadow: -20px -20px #ffffff;
    height: 40px;
    width: 40px;
    position: absolute;
    top: 0;
    left: 0;
}

/* Content animations */
@keyframes slideInRight {
    from {
        transform: translateX(-10px);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideInTop {
    from {
        transform: translateY(-10px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slideInLeft {
    from {
        transform: translateX(10px);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideInBottom {
    from {
        transform: translateY(10px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes fadeInFeature {
    from {
        transform: scale(0.8);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

/* Animation classes */
.animate-slide-in-right {
    animation: slideInRight 0.6s ease-out;
}

.animate-slide-in-top {
    animation: slideInTop 0.6s ease-out 0.1s both;
}

.animate-slide-in-left {
    animation: slideInLeft 0.6s ease-out 0.2s both;
}

.animate-slide-in-bottom {
    animation: slideInBottom 0.6s ease-out 0.3s both;
}

.animate-fade-in-feature {
    animation: fadeInFeature 0.6s ease-out both;
}

/* Swiper slide styling */
.swiper-slide {
    height: auto;
    visibility: visible !important;
    opacity: 1 !important;
}

.swiper-slide-prev,
.swiper-slide-next {
    opacity: 0.7;
    transform: scale(0.95);
    transition: all 0.3s ease;
}

.swiper-slide-active {
    opacity: 1;
    transform: scale(1);
}
</style>