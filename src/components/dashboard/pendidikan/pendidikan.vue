<template>
    <div class="bg-white rounded-2xl shadow-sm p-4 h-full">
        <h2 class="font-myFont font-semibold text-xl text-start mx-12 lg:mx-4 text-dark">
            Pendidikan yang optimal untukmu
        </h2>
        <p class="font-myFont text-start mx-12 lg:mx-4 text-gray-500 text-sm mb-4">List pendidikan</p>
        
        <div class="mt-2 mb-2">
            <div class="w-full">
                <div class="mx-12 lg:mx-4 flex flex-wrap justify-start gap-2">
                    <span
                    v-for="(item, index) in listPendidikan"
                    :key="index"
                    class="px-4 py-2 text-xs text-primary border rounded-full border-primary font-myFont"
                    >
                    {{ item }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Pendidikan',
    setup(){
        const listPendidikan = ['Sistem Informasi', 'Management', 'Kimia', 'Hukum', 'Kedokteran', 'Hubungan Internasional']
        return{
            listPendidikan
        }
    }
}
</script>