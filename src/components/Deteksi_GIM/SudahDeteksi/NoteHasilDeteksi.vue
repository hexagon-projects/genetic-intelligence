<template>
    <div v-if="userResultDetect || stateUserResult" class="flex justify-center w-full">
        <div class="w-full">
            <div class="lg:relative w-full min-h-44 gradasi shadow-sm p-9 rounded-2xl">
                <div class="flex flex-col lg:justify-between lg:items-center">
                    <div class="w-12/12 lg:w-1/12">
                        <img src="../../../assets/img/note-fix.png" alt="icon" class="w-72 lg:w-44 lg:absolute lg:bottom-1 lg:left-6">
                    </div>
                    <div class="w-12/12 lg:w-11/12 lg:px-36">
                        <div class="lg:flex lg:flex-col">
                            <h1 class="font-poppins font-medium text-lg text-start text-light">Catatan hasil test Grafologi kamu</h1>
                            <small class="font-myFont text-start text-light text-md mb-3">Berikut catatan yang harus kamu perhatikan :</small>
                        </div>
                    </div>
                </div>
                
                <div class="lg:p-1 lg:pt-0 lg:px-48 lg:flex lg:justify-start lg:absolute">
                    <!-- <div class="pt-12">
                        <div class="overflow-hidden w-24 h-24 -mt-16 mx-auto">
                            <img src="../../assets/img/note-crop.png" alt="Note">
                        </div>
                    </div> -->
                    <div class="w-full">
                        <!-- <div class="text-3xl font-myFont text-secondary text-left leading-tight h-3">“</div> -->
                        <p class="text-sm text-light text-wrap text-start lg:px-1">"{{ userResultDetect.note }}"</p>
                        <!-- <div class="text-3xl font-myFont text-secondary text-right leading-tight h-3 -mt-3">”</div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex'

export default {
    name: 'NoteHasilDeteksi',
    setup(){
        const store = useStore()
        const stateUserResult = computed(() => store.getters.getUserResultDetect);
        const userResultDetect = JSON.parse(localStorage.getItem('userResult'))
        console.log(`cikan`,userResultDetect)
        return {
            userResultDetect, stateUserResult
        }
    }
}
</script>
<style scoped>
    .note-gradient{
        background: rgb(107,222,180);
        background: linear-gradient(90deg, rgba(107,222,180,1) 19%, rgba(78,221,209,1) 66%, rgba(31,171,238,1) 97%);
    }

    .gradasi {
        background: rgb(11,64,244);
background: linear-gradient(162deg, rgba(11,64,244,1) 26%, rgba(2,178,255,1) 82%);
    }
</style>