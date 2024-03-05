<template>
    <div class="w-full lg:w-1/2">
        <div class="bg-white rounded-lg shadow-sm p-2 lg:p-0 lg:py-4 w-full h-full overflow-hidden">
            <div class="flex flex-col items-center gap-2 lg:gap-4 lg:mx-auto lg:w-3/4">
                <h1 class="font-myFont font-semibold text-dark text-base lg:text-lg">Hasil Test Genetic Intelligence Mapping</h1>

                <p class="font-myFont text-neutral-500 text-xs lg:text-sm">
                    Selamat! anda telah selesai melakukan test Genetic Intelligence Mapping. 
                    Hasil test kamu menunjukan bahwa kamu memiliki tipe kecerdasan:
                </p>

                <h1 class="mt-2 text-xl font-myFont text-dark font-semibold">{{ userResultDetect.gim.name }}</h1>

                <div class="w-full flex flex-col gap-1 items-center">
                    <span class="font-myFont text-neutral-500 text-xs lg:text-sm">Berikut file hasil test kamu:</span>
                    <button @click="downloadFile(userResultDetect.gim_result)" class="px-2 py-2 w-1/2 self-center rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                        Download File
                    </button>
                </div>
                <!-- <div class="lg:w-2/3 lg:p-0 px-4">
                    <div class="flex flex-col align-middle items-center my-7">
                        <h1 class="font-myFont text-dark text-xl lg:mb-2 mb-3">Ingin konsultasi lebih lanjut? Klik tombol dibawah untuk atur jadwalmu...</h1>
                        <RouterLink :to="{name: 'user.views.reservasi'}" class="px-2 py-2 w-1/2 text-center self-start rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                            Konsultasi
                        </RouterLink>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
    <div class="w-full lg:w-1/2">
        <div class="flex flex-col gap-4 lg:gap-4">
            <div class="bg-white rounded-lg shadow-sm lg:p-2 lg:py-4 w-full h-full overflow-hidden">
                <div class="flex flex-col lg:flex-row items-center lg:gap-4 lg:mx-auto lg:w-3/4">
                    <div class="lg:block lg:w-1/3 -mb-3 pt-3 lg:-mb-0 lg:pt-0">
                        <img src="../../../assets/img/note.png" alt="icon" class="mx-auto w-36">
                    </div>
                    <div class="lg:w-2/3 lg:p-0 px-4">
                        <div class="flex flex-col py-4 align-middle items-center my-7">
                            <h1 class="font-myFont text-dark text-xl lg:mb-2 mb-3">Ingin konsultasi lebih lanjut? Klik tombol dibawah untuk atur jadwalmu...</h1>
                            <RouterLink :to="{name: 'user.views.reservasi'}" class="px-2 py-2 w-1/2 text-center self-start rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                                Konsultasi
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FileDanKonsultasiGIM',
    props: ['userResultDetect'],
    setup(){
        const baseUrl = import.meta.env.VITE_API_BASE_URL

        const downloadFile = async (fileUrl) => {
            console.log(`aisia`, fileUrl)
            const imageUrl = baseUrl + 'open/results/' + fileUrl
            console.log(imageUrl)


            const response = await fetch(imageUrl)
            const blob = await response.blob()

            const url = window.URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = url
            link.target = '_blank'
            link.download = fileUrl

            link.click()

            window.URL.revokeObjectURL(url)
        }

        return {
            downloadFile
        }
    }
}
</script>