<template>
    <div class="lg:w-1/2">
        <div class="bg-white rounded-lg shadow-lg p-4">
            <div class="flex pb-4">
                <h1 class="text-base lg:text-xl text-start font-semibold font-myFont text-dark">{{ month }} - {{ year }}</h1>
            </div>
            <div class="overflow-x-scroll lg:overflow-x-hidden flex justify-between font-medium uppercase text-xs pt-4 pb-2 border-t">
                <div
                @click="handleClick(index, hari)"
                v-for="(hari, index) in dataHari"
                :key="index"
                class="px-3 border rounded-lg w-full mx-1 h-5 flex items-center justify-center border-biru text-biru shadow-md"
                :class="activeClass(index, hari)"
                >
                {{ hari }}
                </div>
            </div>
    
            <div class="mx-1 flex gap-2 justify-center mt-2 font-medium text-sm">
                <!-- {{ dataTgl }} -->
                <div @click="tgl.available && clickTgl(tgl.tglFull)" v-if="computedTgl.length > 0 && !loadingHari" v-for="(tgl, index) in computedTgl" :key="index" 
                    class="hover:animate-wiggle hover:text-white w-16 h-16 sm:w-[100px] sm:h-[100px] shadow-[1px_2px_12px_0_rgba(31,45,61,0.10)] rounded-lg border border-[#e0e6ed flex justify-center flex-col"
                    :class="{'bg-dark cursor-not-allowed': !tgl.available, 'cursor-pointer': tgl.available}"
                    >
                    <h1 v-if="tgl.available" class="flex flex-col text-biru sm:text-3xl text-xl text-center">
                        <span class="-mt-3 mb-1 text-sm">
                            {{ splitMonth }}
                        </span>
                        {{ tgl.tglSplit }}
                    </h1>
                    <h1 v-else class="flex flex-col text-light sm:text-3xl text-xl text-center">
                        <span class="-mt-3 mb-1 text-sm">
                            {{ splitMonth }}
                        </span>
                        {{ tgl.tglSplit }}
                    </h1>
                </div>
                <h1 v-else-if="computedTgl.length == 0 && !loadingHari" class="font-myFont text-center text-dark text-lg">
                    Pilih hari terlebih dahulu untuk melihat tanggal
                </h1>
                <span v-if="loadingHari" class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
            </div>
        </div>
    </div>

    <div class="lg:w-1/2">
        <div class="bg-white rounded-lg shadow-lg p-4 h-full">
            <div class="flex pb-4">
                <h1 class="text-base lg:text-xl text-start font-semibold font-myFont text-dark">Jam yang tersedia</h1>
            </div>
            <div v-if="mockTgl.length == 0 && !loading" class="flex justify-center font-medium text-xs pt-4 pb-2 border-t">
                <p class="font-myFont mt-4 text-center text-dark text-lg">Silahkan pilih tanggal terlebih dahulu</p>
            </div>
            <div v-else-if="mockTgl.length > 0 && !loading" class="flex flex-wrap justify-start gap-4 pt-4 pb-2 border-t">
                <div v-for="(jam, index) in mockTgl" :key="index" class="font-medium text-xs mt-2 mb-2">
                    <button @click="clickJam(jam)" class="px-4 py-2 rounded-full bg-biru text-light">
                        {{ jam }}
                    </button>
                </div>
            </div>
            <span v-if="loading" class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import initAPI from '../../../../api/api'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default {
    name: 'PilihHari',
    setup(){
        const router = useRouter()
        const hariReservasi = ref('')
        const tglReservasi = ref('')
        const waktuReservasi = ref('')
        const loading = ref(false)
        const loadingHari = ref(false)
        const mockTgl = ref([])
        const activeIndex = ref(null);
        const dataHari = ref([])
        const dataTgl = ref([])
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const splitMonth = month.slice(0, 3);
        const year = date.getFullYear();

        const feeValue = ref(null)
        const formattedFee = ref(null)

        const computedTgl = computed(() => dataTgl.value)

        onMounted(async() => {
            const token = Cookies.get('token')
            if(token){
                dataHari.value = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                
                try {
                    const fee = await initAPI('get', 'consultants', null, token)
                    console.log(`harga fee`, fee.data.data[0])
                    formattedFee.value = fee.data.data[0].formatted_fee
                    feeValue.value = fee.data.data[0].fee
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Terjadi kesalahan saat mengambil data',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } else {
                router.push('/login')
                localStorage.clear()
            }
        })

        const handleClick = (index, hari) => {
            console.log(`${index} - ${hari}`)
            toggleActive(index)
            setHari(hari)
        }

        const setHari = (hari) => {
            hariReservasi.value = hari
        }

        const toggleActive = async(index) => {
            loadingHari.value = !loadingHari.value
            let indexHari = ''
            switch (index) {
                case 0:
                    indexHari = 'Monday';
                    break;
                case 1:
                    indexHari = 'Tuesday';
                    break;
                case 2:
                    indexHari = 'Wednesday';
                    break;
                case 3:
                    indexHari = 'Thursday';
                    break;
                case 4:
                    indexHari = 'Friday';
                    break;
                case 5:
                    indexHari = 'Saturday';
                    break;
                case 6:
                    indexHari = 'Sunday';
                    break;
            }
            const token = Cookies.get('token')
            if(token){
                try {
                    const response = await initAPI('get', 'consultants/available-schedule/1?day='+indexHari, null, token)
                    const filterTgl = []
                    const arrTgl = response.data.filter(item => {
                        const data = {
                            tglSplit: item.date.split('-')[0],
                            tglFull: item.date,
                            available: item.available
                        }
                        filterTgl.push(data)
                    })
                    activeIndex.value = index;
                    dataTgl.value = filterTgl
                } catch (error) {
                    console.log(`error aisia ie`, error)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Terjadi kesalahan saat mengambil data',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } else {
                router.push('/login')
                localStorage.clear()
            }
            loadingHari.value = !loadingHari.value
        };

        const activeClass = (index, hari) => {
            return {
                'cursor-pointer hover:bg-biru hover:text-light border-opacity-50 text-opacity-40': activeIndex.value !== index,
                'cursor-pointer border bg-biru text-light text-opacity-100 font-semibold': activeIndex.value === index,
                // 'cursor-not-allowed border border-dark text-dark font-semibold border-opacity-60 text-opacity-60': hari == 'Saturday' || hari == 'Sunday'
            };
        };

        const clickTgl = async(tgl) => {
            tglReservasi.value = tgl
            loading.value = !loading.value
            console.log(`di klik`,tgl)
            const token = Cookies.get('token')
            if(token){
                try {
                    const response = await initAPI('get', `consultants/available-schedule/1/${hariReservasi.value}?date=${tgl}`, null, token)
                    mockTgl.value = response.data.time
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Terjadi kesalahan saat mengambil data',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } else {
                router.push('/login')
                localStorage.clear()
            }
            loading.value = !loading.value
            // dataHari.value = response.data
            console.log('hari',dataHari.value)
        }

        const store = useStore()
        const userData = computed(() => store.getters.getUserData)

        const clickJam = async(jam) => {
            const datas = {
                consultant_id: 1,
                customer_id: userData.value.id,
                date: tglReservasi.value,
                day: hariReservasi.value,
                time: jam,
                fee: feeValue.value,
                formatted_fee: formattedFee.value
            }
            console.log(datas)
            console.log(`klik jam`, jam)
            // localStorage.setItem('bookReservasi', JSON.stringify(datas))

            store.commit('setReservasi', datas)
            localStorage.setItem('setReservasi', JSON.stringify(datas))

            // console.log(datas)
            // const response = await initAPI('post', 'customers/reservations', datas, token)
            // console.log(response)
        }

        return {
            userData,
            hariReservasi,
            tglReservasi,
            waktuReservasi,
            loading,
            loadingHari,
            splitMonth,
            month,
            year,
            computedTgl,
            dataHari,
            dataTgl,
            mockTgl,
            clickTgl,
            clickJam,
            handleClick,
            activeClass
        }
    }
}
</script>