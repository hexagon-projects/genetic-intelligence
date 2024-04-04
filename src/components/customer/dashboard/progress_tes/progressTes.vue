<template>
    <nav aria-label="Progress" class="w-full">
        <ol role="list" class="space-y-4 md:flex md:space-x-8 md:space-y-0">
            <li class="md:flex-1 flex-col py-2">
                <a 
                    :class="{'border-biru': props.userResultDetect.is_detected == true, 'border-gray-300 hover:border-gray-500': userResultDetect.is_detected == false}" 
                    class="mb-3 group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span class="text-base font-myFont font-medium text-gray-500">Step 1</span>
                    <span class="text-sm font-myFont font-medium text-gray-800">Melakukan Tes Genetic Intelligence</span>
                    <RouterLink v-if="props.userResultDetect.is_detected == false" :to="{name: 'user.views.deteksi'}" 
                    class="block lg:hidden w-1/3 md:w-1/2 mt-2 text-xs md:text-sm px-4 py-2 bg-biru hover:bg-opacity-75 hover:shadow-sm rounded-lg font-myFont text-center text-white">
                        Tes Sekarang
                    </RouterLink>
                    <RouterLink v-if="props.userResultDetect.is_detected == true" :to="{name: 'user.views.hasil_deteksi'}" 
                    class="block lg:hidden w-1/3 md:w-1/2 mt-2 text-xs md:text-sm px-4 py-2 bg-biru hover:bg-opacity-75 hover:shadow-sm rounded-lg font-myFont text-center text-white">
                        Lihat Hasil
                    </RouterLink>
                </a>
                <RouterLink v-if="props.userResultDetect.is_detected == false" :to="{name: 'user.views.deteksi'}" 
                class="hidden lg:block w-1/3 px-4 py-2 bg-biru hover:bg-opacity-75 hover:shadow-sm rounded-lg font-myFont text-center text-white">
                    Tes Sekarang
                </RouterLink>
                <RouterLink v-if="props.userResultDetect.is_detected == true" :to="{name: 'user.views.hasil_deteksi'}" 
                class="hidden lg:block w-1/3 px-4 py-2 bg-biru hover:bg-opacity-75 hover:shadow-sm rounded-lg font-myFont text-center text-white">
                    Lihat Hasil
                </RouterLink>
            </li>
            <li class="md:flex-1 flex-col py-2">
                <a 
                    :class="{'border-biru': props.isAssessment, 'border-gray-300 hover:border-gray-500': !props.isAssessment}" 
                    class="mb-3 group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span class="text-base font-myFont font-medium text-gray-500">Step 2</span>
                    <span class="text-sm font-myFont font-medium text-gray-800">Melakukan Tes Assessment</span>
                    <RouterLink v-if="!props.isAssessment" :to="{name: 'user.views.assesment'}" 
                    class="block lg:hidden w-1/3 md:w-1/2 mt-2 text-xs md:text-sm px-4 py-2 bg-biru hover:bg-opacity-75 hover:shadow-sm rounded-lg font-myFont text-center text-white">
                        Tes Sekarang
                    </RouterLink>
                    <RouterLink v-if="props.isAssessment" :to="{name: 'user.views.hasil_assessment'}" 
                    class="block lg:hidden w-1/3 md:w-1/2 mt-2 text-xs md:text-sm px-4 py-2 bg-biru hover:bg-opacity-75 hover:shadow-sm rounded-lg font-myFont text-center text-white">
                        Lihat Hasil
                    </RouterLink>
                </a>
                <RouterLink v-if="!props.isAssessment" :to="{name: 'user.views.assesment'}" 
                class="hidden lg:block w-1/3 px-4 py-2 bg-biru hover:bg-opacity-75 hover:shadow-sm rounded-lg font-myFont text-center text-white">
                    Tes Sekarang
                </RouterLink>
                <RouterLink v-if="props.isAssessment" :to="{name: 'user.views.hasil_assessment'}" 
                class="hidden lg:block w-1/3 px-4 py-2 bg-biru hover:bg-opacity-75 hover:shadow-sm rounded-lg font-myFont text-center text-white">
                    Lihat Hasil
                </RouterLink>
            </li>
            <li class="md:flex-1 flex-col py-2">
                <a 
                    :class="{'border-biru': props.isTestedIQ, 'border-gray-300 hover:border-gray-500': !props.isTestedIQ}" 
                    class="mb-3 group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span class="text-base font-myFont font-medium text-gray-500">Step 3</span>
                    <span class="text-sm font-myFont font-medium">Melakukan Tes IQ</span>
                    <RouterLink v-if="!props.isTestedIQ" :to="{name: 'user.views.iq'}" 
                    class="block lg:hidden w-1/3 md:w-1/2 mt-2 text-xs md:text-sm px-4 py-2 bg-biru hover:bg-opacity-75 hover:shadow-sm rounded-lg font-myFont text-center text-white">
                        Tes Sekarang
                    </RouterLink>
                    <RouterLink v-if="props.isTestedIQ" :to="{name: 'user.views.hasil_iq'}" 
                    class="block lg:hidden w-1/3 md:w-1/2 mt-2 text-xs md:text-sm px-4 py-2 bg-biru hover:bg-opacity-75 hover:shadow-sm rounded-lg font-myFont text-center text-white">
                        Lihat Hasil
                    </RouterLink>
                </a>
                <RouterLink v-if="!props.isTestedIQ" :to="{name: 'user.views.iq'}" 
                class="hidden lg:block w-1/3 px-4 py-2 bg-biru hover:bg-opacity-75 hover:shadow-sm rounded-lg font-myFont text-center text-white">
                    Tes Sekarang
                </RouterLink>
                <RouterLink v-if="props.isTestedIQ" :to="{name: 'user.views.hasil_iq'}" 
                class="hidden lg:block w-1/3 px-4 py-2 bg-biru hover:bg-opacity-75 hover:shadow-sm rounded-lg font-myFont text-center text-white">
                    Lihat Hasil
                </RouterLink>
            </li>
        </ol>
    </nav>
</template>

<script>
export default {
    name: 'ProgressTes',
    props: ['userResultDetect', 'isAssessment', 'isTestedIQ'],
    setup(props){
        console.log(`olala`, props)
        return { props }
    }
}
</script>