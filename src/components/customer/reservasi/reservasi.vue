<template>
    <section class="bg-gray-100 pb-8 text-dark">
        <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold dark:text-white-dark">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'user.views.reservasi'}" class="text-base text-dark hover:text-dark/70">
                    Reservasi
                </RouterLink>
            </ol>
        </div>
        <div class="flex flex-col lg:flex-row justify-center mx-7 pt-4 gap-4">
            <div class="lg:w-1/2">
                <div class="bg-white rounded-lg shadow-lg p-4">
                    <div class="flex justify-center pb-4">
                        <span class="uppercase text-sm font-myFont font-semibold text-dark">january - 2022</span>
                    </div>
                    <div class="flex justify-between font-medium uppercase text-xs pt-4 pb-2 border-t">
                        <div class="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-red-500 text-red-500 shadow-md">
                            sun
                        </div>
                        <span class="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
                            mon
                        </span>
                        <span class="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
                            tue
                        </span>
                        <span class="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
                            wed
                        </span>
                        <span class="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
                            thu
                        </span>
                        <span class="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
                            fri
                        </span>
                        <span class="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
                            sat
                        </span>
                    </div>

                    <div class="flex justify-between font-medium text-sm pb-2">
                        <button @click="clickTgl" class="px-1 text-gray-400 w-14 flex justify-center items-center">
                            30
                        </button>
                        <span class="px-1 text-gray-400 w-14 flex justify-center items-center">
                            31
                        </span>
                        <span class="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
                            01
                        </span>
                    </div>
                </div>
            </div>
            <div class="lg:w-1/2">
                <div class="bg-white rounded-lg shadow-lg p-4">
                    <div class="flex justify-center pb-4">
                        <span class="uppercase text-sm font-myFont font-semibold text-dark">Jam yang tersedia</span>
                    </div>
                    <div class="flex justify-between font-medium uppercase text-xs pt-4 pb-2 border-t">
                        <p>Silahkan pilih tanggal terlebih dahulu</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import initAPI from '../../../api/api';

export default {
    name: 'Reservasi',
    setup(){

        const clickTgl = async() => {
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', 'consultants/available-schedule/1', null, token)
            console.log(response)
        }

        return {
            clickTgl
        }
    }
}
</script>