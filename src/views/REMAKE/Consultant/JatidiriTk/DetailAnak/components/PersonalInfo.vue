<script setup>
defineProps({
  userData: Object
})
</script>

<template>
    <div class="w-full bg-white shadow-md shadow-black/5 p-6 rounded-3xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            <div class="space-y-2 flex flex-col">
                <label for="" class="text-[#8E8E8E] text-sm">Nama Depan</label>
                <div type="text" class="p-3 rounded-lg bg-[#F5F5F5]">
                    <p class="text-base">{{ userData?.first_name }}</p>
                </div>
            </div>
            <div class="space-y-2 flex flex-col">
                <label for="" class="text-[#8E8E8E] text-sm">Nama Belakang</label>
                <div type="text" class="p-3 rounded-lg bg-[#F5F5F5]">
                    <p class="text-base">{{ userData?.last_name }}</p>
                </div>
            </div>
            <div class="space-y-2 flex flex-col">
                <label for="" class="text-[#8E8E8E] text-sm">Tempat Lahir</label>
                <div type="text" class="p-3 rounded-lg bg-[#F5F5F5]">
                    <p class="text-base">{{ userData?.birth_place }}</p>
                </div>
            </div>
            <div class="space-y-2 flex flex-col">
                <label for="" class="text-[#8E8E8E] text-sm">Tanggal Lahir</label>
                <div type="text" class="p-3 rounded-lg bg-[#F5F5F5]">
                    <p class="text-base">{{ userData?.birth_date }}</p>
                </div>
            </div>
            <div class="space-y-2 flex flex-col">
                <label for="" class="text-[#8E8E8E] text-sm">Nama Orang Tua</label>
                <div type="text" class="p-3 rounded-lg bg-[#F5F5F5]">
                    <p class="text-base">Maria Culhane</p>
                </div>
            </div>
            <div class="space-y-2 flex flex-col">
                <label for="" class="text-[#8E8E8E] text-sm">Nama Guru</label>
                <div type="text" class="p-3 rounded-lg bg-[#F5F5F5]">
                    <p class="text-base">Bu Siti</p>
                </div>
            </div>
        </div>
    </div>
</template>
