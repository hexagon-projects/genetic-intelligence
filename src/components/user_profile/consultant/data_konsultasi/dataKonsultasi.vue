<template>
    <div class="flex flex-col">
        <div class="flex w-full">
            <div class="w-1/2 mb-4">
                <label for="currPass" class="block text-sm font-myFont font-medium text-dark">Biaya Konsultasi :</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 -top-2 flex items-center ps-3.5 pointer-events-none">
                        <span class="w-4 h-4 text-dark font-semibold" aria-hidden="true">Rp.</span>
                    </div>
                    <input v-model="consultant_fee" type="number" class="mt-1 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru block ps-10 p-2" placeholder="1000000" required>
                </div>
            </div>
        </div>
        <div class="w-1/2 mb-4">
            <label for="day" class="block text-sm font-myFont font-medium text-dark">Hari :</label>
            <select v-model="selected_day" @change="getAvailable(selected_day)" name="day" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                <option value="Monday">Senin</option>
                <option value="Tuesday">Selasa</option>
                <option value="Wednesday">Rabu</option>
                <option value="Thursday">Kamis</option>
                <option value="Friday">Jumat</option>
                <option value="Saturday">Sabtu</option>
                <option value="Sunday">Minggu</option>
            </select>
        </div>
        <div class="w-3/4 mb-4">
            <label for="day" class="block text-sm font-myFont font-medium text-dark mb-1">Jam Kerja :</label>
            <div class="flex flex-row w-ful">
                <label class="inline-flex gap-2 w-1/3">
                    <input type="checkbox" @click="changeKonsulData" class="form-checkbox" name="time" value="08:00 - 10:00" />
                    <span class="w-full">08:00 - 10:00</span>
                </label>
                <label class="inline-flex gap-2 w-1/3">
                    <input type="checkbox" @click="changeKonsulData" class="form-checkbox" name="time" value="11:00 - 13:00" />
                    <span class="w-full">11:00 - 13:00</span>
                </label>
                <label class="inline-flex gap-2 w-1/3">
                    <input type="checkbox" @click="changeKonsulData" class="form-checkbox" name="time" value="14:00 - 16:00" />
                    <span class="w-full">14:00 - 16:00</span>
                </label>
            </div>
        </div>

        <button @click="saveKonsulData" class="px-2 py-2 mt-3 w-1/2 lg:w-1/4 self-start text-center rounded-lg bg-biru font-myFont font-medium text-light hover:opacity-75 hover:shadow-sm">
            Ubah Data
        </button>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import initAPI from '../../../../api/api'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

export default {
    name: 'DataKonsultasiKonsultan',
    props: ['userData'],
    setup(props){
        console.log(`lodaded dk`, props)
        const router = useRouter()
        const consultant_fee = ref(props.userData.fee)
        const selected_day = ref('Monday')
        let available_on = ref(props.userData.available_on)
        available_on = available_on.value

        const getAvailable = async (day) => {
            let checks = document.getElementsByName("time")
            checks.forEach(check => { check.checked = false });

            let available = JSON.parse(available_on)
            if(available[day]){
                available[day]['time'].forEach(time => {
                    let checks = document.getElementsByName("time")
                    checks.forEach(check => {
                        if(check.value == time){
                            check.checked = true;
                        }
                    });
                });
            }
        }

        const changeKonsulData = async () => {
            let available = JSON.parse(available_on)
            let day = selected_day.value
            let get_time = document.getElementsByName('time');
            let time = []
            for (let t = 0; t < get_time.length; t++) {
                if(get_time[t].checked){
                    time.push(get_time[t].value)
                }
            }

            if(!available[day]){
                available[day] = {
                    data : day == 'Monday' ? 0 : day == 'Tuesday' ? 1 : day == 'Wednesday' ? 2 : day == 'Thursday' ? 3 : day == 'Friday' ? 4 : day == 'Saturday' ? 5 : 6,
                    day : day
                }
            }

            available[day]['time'] = time
            available_on = JSON.stringify(available)
        }

        const saveKonsulData = async () => {
            const consultantId = props.userData.id
            const token = Cookies.get('token')

            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('fee', parseInt(consultant_fee.value));
            formData.append('available_on', available_on);

            if(token){
                try{
                    const response = await initAPI(
                        'post','consultants/'+consultantId, formData, token
                    );
        
                    if(response.status == 200){
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: response.data.message,
                            showConfirmButton: false,
                            timer: 2000
                        });
                        const updatedConsultant = await initAPI('get', 'consultants?id='+consultantId, null, token)
                        updatedConsultant.data.data[0].available_on = JSON.stringify(updatedConsultant.data.data[0].available_on)
                        store.commit('user', updatedConsultant.data.data[0])
                        localStorage.setItem('userData', JSON.stringify(updatedConsultant.data.data[0]))
                    }
                }catch(error){
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: 'Gagal mengubah data.',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } else {
                router.push('/login')
                localStorage.clear()
            }
        }

        onMounted(() => {
            getAvailable('Monday');
        })

        return {
            consultant_fee,
            selected_day,
            getAvailable,
            changeKonsulData,
            saveKonsulData
        }

    }
}
</script>