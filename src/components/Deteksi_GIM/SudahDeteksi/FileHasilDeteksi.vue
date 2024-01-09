<template>
    <div v-if="userResultDetect" class="lg:w-1/3 w-full">
        <div class="bg-white rounded-lg shadow-xl p-4 h-full">
            <div class="flex flex-col">
                <h2 class="font-myFont flex justify-between text-dark font-semibold align-middle">
                    {{ userResultDetect.gim_result !== null ? 'Hasil Test Genetic Intelligence Mapping' : 'File Kamu Belum Tersedia' }}
                    <div v-if="userResultDetect.gim_result" class="flex flex-col lg:flex-row justify-end items-end">
                        <button @click="downloadImage" class="w-8 h-8 px-2 py-2 bg-biru hover:opacity-75 hover:shadow-lg font-myFont text-light rounded-lg"><PhDownloadSimple/></button>
                        <!-- <button @click="showImage" class="min-w-32 px-2 py-2 bg-secondary hover:opacity-75 hover:shadow-lg font-myFont text-white rounded-lg">Lihat</button> -->
                    </div>
                </h2>
                <!-- <p class="font-myFont text-center text-gray-500 text-sm mb-4">File kamu sudah tersedia</p> -->
                <hr class="my-3">

                <div v-if="userResultDetect.gim_result" class="self-center my-3">
                    <img @click="showImage" class="w-3/2 mx-auto h-full rounded-lg shadow-xl hover:border-secondary border-2 border-white mb-2" :src="'http://gim.app.api.hexagon.co.id/api/open/results/'+userResultDetect.gim_result" alt="File Deteksi">
                    <!-- <img class="w-1/2 mx-auto h-full rounded-lg shadow-xl hover:border-secondary border-2 border-white mb-2" src="../../assets/img/sample.jpg" alt="User Profile"> -->
                </div>

                <div v-else-if="!userResultDetect.gim_result" class="self-center mb-4">
                    <img class="w-3/4 mx-auto h-full rounded-lg mt-4" src="../../assets/img/hasil-not-found.png" alt="Data Not Found">
                    <!-- <img class="w-1/2 mx-auto h-full rounded-lg shadow-xl hover:border-secondary border-2 border-white mb-2" src="../../assets/img/sample.jpg" alt="User Profile"> -->
                </div>
            </div>
        </div>
        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center">
            <div class="fixed z-1 inset-0 bg-black opacity-75"></div>
            <div class="flex flex-col items-center z-20 overflow-y-auto">
            <div @wheel.prevent="handleMouseWheel">
                <img
                :src="'http://gim.app.api.hexagon.co.id/api/open/results/' + userResultDetect.gim_result"
                alt="Detected Image"
                class="z-90 mx-auto w-3/4 md:w-1/3 lg:w-2/6 rounded-lg shadow-xl"
                ref="imageRef"
                />
            </div>
            <button @click="closeModal" class="self-center mt-4 px-2 py-2 w-1/2 md:w-1/4 bg-secondary hover:opacity-80 hover:shadow-lg font-myFont text-white rounded-lg">Tutup</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { PhDownloadSimple } from "@phosphor-icons/vue";

export default {
    name: 'FileHasilDeteksi',
    components: {PhDownloadSimple},
    setup(){
        const store = useStore()
        const userResultDetect = computed(() => store.getters.getUserResultDetect)

        const showModal = ref(false)
        const imageRef = ref(null);
        const zoom = ref(1);

        const showImage = () => {
            showModal.value = true;
        };

        const closeModal = () => {
            showModal.value = false;
        };

        const downloadImage = async () => {
            const imageUrl = 'http://gim.app.api.hexagon.co.id/api/open/results/' + userResultDetect.value.gim_result

            const response = await fetch(imageUrl)
            const blob = await response.blob()

            const url = window.URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = url
            link.target = '_blank'
            link.download = userResultDetect.value.gim_result

            link.click()

            window.URL.revokeObjectURL(url)
        }

        const handleMouseWheel = (event) => {
        if (imageRef.value) {
            const delta = event.deltaY;
            zoom.value = Math.min(Math.max(zoom.value - delta * 0.005, 0.5), 3); // Batasi zoom antara 0.5 dan 3

            const scaledHeight = imageRef.value.offsetHeight * zoom.value;
            const wrapperHeight = imageRef.value.parentElement.offsetHeight;

            if (scaledHeight > wrapperHeight) {
            imageRef.value.style.transform = `scale(${zoom.value})`;
            }
        }
        };


        onMounted(() => {
            // Handle mounted lifecycle to ensure imageRef is available
            imageRef.value = document.querySelector('.z-90'); // Adjust the selector as needed
        });

        return {
            userResultDetect,
            showModal,
            imageRef,
            zoom,
            showImage,
            closeModal,
            downloadImage,
            handleMouseWheel
        }
    }
}
</script>