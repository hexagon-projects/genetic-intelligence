<template>
    <div v-if="loading" class="preloader-overlay">
        <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div>

    <div v-else>
        <section class="bg-gray-100 pb-16">
            <div class="mx-4 pt-4">
                <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
                    <li class="before:px-1.5">
                        <a class="text-dark text-base cursor-default">
                            Beranda
                        </a>
                    </li>
                </ol>
            </div>
            <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 gap-4">
                <iframe sandbox="allow-same-origin allow-scripts" src="https://drive.google.com/file/d/1Z1iQySVZe-YxN_S9c00wP-mjXTeODDfQ/preview" controls="none" frameborder="0" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" width="640" height="320"></iframe>
            </div>
        </section>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'AdminDashboard',
    setup(){
        const loading = ref(false)

        return {
            loading
        }
    }
}
</script>