<template>
    <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Detail Customers</h1>
    <hr class="mt-4">
    <div class="flex flex-col justify-center items-center overflow-y-scroll">
        <img v-if="props.detailSiswa.image !== null" class="w-[180px] h-[180px] p-4" :src="baseUrl+'open/customers/'+props.detailSiswa.image" alt="">
        <img v-if="props.detailSiswa.image == null" class="w-[180px] h-[180px] p-4" src="https://placehold.co/400x400" alt="">
        <div v-if="props.detailSiswa" class="w-full p-4 h-[240px]">
            <div class="flex flex-row gap-2">
                <div class="w-full">
                    <div class="flex flex-row items-center mb-4">
                        <div class="w-3/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Nama
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ props.detailSiswa.name }}
                                </p>
                            </div>
                        </div>
                        <div class="w-2/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    No Telp
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ props.detailSiswa.number }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-row items-center mb-4">
                        <div class="w-3/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Tempat Lahir
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ props.detailSiswa.birth_place }}
                                </p>
                            </div>
                        </div>
                        <div class="w-2/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Tanggal Lahir
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ props.detailSiswa.birth_date }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-row items-center mb-4">
                        <div class="w-3/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Jenis Kelamin
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ props.detailSiswa.gender }}
                                </p>
                            </div>
                        </div>
                        <div class="w-2/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Golongan Darah
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ props.detailSiswa.blood_group }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-row items-center mb-4">
                        <div class="w-3/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Agama
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ props.detailSiswa.religion }}
                                </p>
                            </div>
                        </div>
                        <div class="w-2/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Status
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ props.detailSiswa.status }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-row items-center mb-4">
                        <div class="w-3/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Suku
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ props.detailSiswa.ethnic != null ? props.detailSiswa.ethnic : '-' }}
                                </p>
                            </div>
                        </div>
                        <div class="w-2/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Kebangsaan
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ props.detailSiswa.nationality != null ? props.detailSiswa.nationality : '-' }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-row items-center mb-4">
                        <div class="w-3/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Anak Ke
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ props.detailSiswa.child_number != null ? props.detailSiswa.child_number : '-' }}
                                </p>
                            </div>
                        </div>
                        <div class="w-2/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Dari Jumlah Saudara
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ props.detailSiswa.from_child_number != null ? props.detailSiswa.from_child_number : '-' }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-row items-center mb-4">
                        <div class="w-full">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Alamat
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ props.detailSiswa.address }}
                                </p>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ props.detailSiswa.region }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <hr class="pb-3">

                    <div class="flex flex-row items-center gap-2 mb-4">
                        <div class="w-3/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Status Pelajar
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ props.detailSiswa.is_student == 1 ? 'Pelajar' : 'Non Pelajar' }}
                                </p>
                            </div>
                        </div>
                        <div class="w-2/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Status Daftar
                                </h1>
                                <p :class="{
                                    'bg-dark': props.detailSiswa.is_payment_gim == 'Belum Bayar',
                                    'bg-success': props.detailSiswa.is_payment_gim == 'Sudah Bayar',
                                    }" class="font-myFont font-medium text-light text-sm rounded-md -py-1 px-1 w-fit">
                                    {{ props.detailSiswa.is_payment_gim == 'Belum Bayar' ? 'Belum Bayar' : props.detailSiswa.is_payment_gim }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-row items-center gap-2 mb-4">
                        <div class="w-full">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                   {{ props.detailSiswa.institutions.type !== 'Perguruan Tinggi' ? 'Nama Sekolah' : props.detailSiswa.institutions.type }}
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ props.detailSiswa.institutions.name }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-row items-center gap-2 mb-4">
                        <div class="w-3/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Jurusan
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ props.detailSiswa.majoring !== null ? props.detailSiswa.majoring : '-' }}
                                </p>
                            </div>
                        </div>
                        <div class="w-2/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Kelas
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ props.detailSiswa.grade }}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="flex flex-col gap-1">
                <div class="flex items-center gap-3">
                    <div class="flex flex-row w-1/2 justify-between items-center shadow-md mb-5 p-3 rounded-md">
                        <div class="flex flex-col">
                            <h1 class="font-myFont font-medium text-dark text-xs">Test GIM</h1>
                            <h1 class="font-myFont font-medium text-dark text-sm">
                                {{ 
                                    props.detailSiswa.is_detected == 'Belum' ? 'Belum Dilakukan' 
                                    : props.detailSiswa.is_detected == 'Sudah Disubmit' || props.detailSiswa.is_detected == 'Dalam Review' ? 'Sudah Submit' 
                                    : 'Sudah Dilakukan'
                                }}
                            </h1>
                        </div>
                        <div :class="{
                                'text-success': props.detailSiswa.is_detected == 'Sudah Disubmit' 
                                || props.detailSiswa.is_detected == 'Dalam Review'
                                || props.detailSiswa.is_detected == 'Selesai Terdeteksi',
                                'text-danger': props.detailSiswa.is_detected == 'Belum' 
                            }" 
                                class="flex items-center px-1 h-8 rounded-sm">
                            <PhCheckFat v-if="props.detailSiswa.is_detected == 'Sudah Disubmit' 
                                || props.detailSiswa.is_detected == 'Dalam Review'
                                || props.detailSiswa.is_detected == 'Selesai Terdeteksi'"
                                :size="26" weight="bold"
                            />
                            <PhXCircle v-else :size="26" weight="bold"/>
                        </div>
                    </div>
                    
                    <div class="flex flex-row w-1/2 justify-between items-center shadow-md mb-5 p-3 rounded-md">
                        <div class="flex flex-col">
                            <h1 class="font-myFont font-medium text-dark text-xs">Test Assessment</h1>
                            <h1 class="font-myFont font-medium text-dark text-sm">
                                {{ 
                                    props.detailSiswa.customer_assessment == null || props.detailSiswa.customer_assessment == 'null' ? 'Belum Dilakukan' 
                                    : 'Sudah Dilakukan'
                                }}
                            </h1>
                        </div>
                        <div :class="{
                            'text-danger': !props.detailSiswa.customer_assessment, 
                            'text-success': props.detailSiswa.customer_assessment
                            }" 
                            class="flex items-center px-1 h-8 rounded-sm">
                            <PhCheckFat v-if="props.detailSiswa.customer_assessment" :size="26" weight="bold"/>
                            <PhXCircle v-else-if="!props.detailSiswa.customer_assessment" :size="26" weight="bold"/>
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <div class="flex flex-row w-1/2 justify-between items-center shadow-md mb-5 p-3 rounded-md">
                        <div class="flex flex-col">
                            <h1 class="font-myFont font-medium text-dark text-xs">Test Iq</h1>
                            <h1 class="font-myFont font-medium text-dark text-sm">
                                {{ 
                                    !props.detailSiswa.customer_iq || props.detailSiswa.customer_iq == null ? 'Belum Dilakukan' 
                                    : 'Sudah Dilakukan'
                                }}
                            </h1>    
                        </div>
                        <div :class="{
                            'text-danger': !props.detailSiswa.customer_iq, 
                            'text-success': props.detailSiswa.customer_iq
                            }" 
                            class="flex items-center px-1 h-8 rounded-sm">
                            <PhCheckFat v-if="props.detailSiswa.customer_iq" :size="26" weight="bold"/>
                            <PhXCircle v-else-if="!props.detailSiswa.customer_iq" :size="26" weight="bold"/>
                        </div>
                    </div>

                    <div class="flex flex-row w-1/2 justify-between items-center shadow-md mb-5 p-3 rounded-md">
                        <div class="flex flex-col">
                            <h1 class="font-myFont font-medium text-dark text-xs">Konsultasi lebih lanjut</h1>
                            <h1 class="font-myFont font-medium text-dark text-sm">
                                {{ 
                                    props.detailSiswa.is_advance == 'Tidak' ? 'Belum Dilakukan' 
                                    : 'Sudah Dilakukan'
                                }}
                            </h1>    
                        </div>
                        <div :class="{
                            'text-danger': props.detailSiswa.is_advance == 'Tidak', 
                            'text-success': props.detailSiswa.is_advance !== 'Tidak'
                            }" 
                            class="flex items-center px-1 h-8 rounded-sm">
                            <PhCheckFat v-if="props.detailSiswa.is_advance !== 'Tidak'" :size="26" weight="bold"/>
                            <PhXCircle v-else-if="props.detailSiswa.is_advance == 'Tidak'" :size="26" weight="bold"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { PhXCircle, PhCheckFat } from '@phosphor-icons/vue';

export default{
    components: {PhXCircle, PhCheckFat},
    props: ['detailSiswa'],
    setup(props){
        // console.log(`props modal lg`, props)

        return {
            props
        }
    }
}
</script>