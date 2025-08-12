<template>
    <section class="bg-gray-100 pb-16">
        <div class="mx-4 pt-4">
            <ol class="flex text-gray-500 font-semibold">
                <li class="before:px-1.5">
                    <a class="text-dark text-base cursor-default">
                        Beranda
                    </a>
                </li>
            </ol>
        </div>

        <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 pb-10 gap-4">
            <tableSiswa/>
        </div>
    </section>
</template>

<script>
import tableSiswa from '../table/table.vue'

export default {
    name: 'StaffDashboard',
    components: { tableSiswa }
}
</script>