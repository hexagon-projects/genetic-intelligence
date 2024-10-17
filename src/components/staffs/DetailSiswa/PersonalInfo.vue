<template>
    <div class="w-full px-4 pt-5 pb-3 flex flex-col gap-[16px]">
        <div class="text-[#0c141c] text-xl font-bold font-['Roboto'] leading-7">
            Personal Information
        </div>

        <div class="p-4 w-full flex items-center border-t">
            <div class="w-full flex flex-col">
                <span class="text-[#4f7296] text-sm font-normal font-sora leading-[21px]">
                    Nama Depan
                </span>
                <span class="text-[#0c141c] text-sm font-normal font-sora leading-[21px]">
                    {{ props.siswaDatas.first_name }}
                </span>
            </div>
            <div class="w-full flex flex-col">
                <span class="text-[#4f7296] text-sm font-normal font-sora leading-[21px]">
                    Nama Depan
                </span>
                <span class="text-[#0c141c] text-sm font-normal font-sora leading-[21px]">
                    {{ props.siswaDatas.last_name }}
                </span>
            </div>
        </div>

        <div class="p-4 w-full flex items-center border-t">
            <div class="w-full flex flex-col">
                <span class="text-[#4f7296] text-sm font-normal font-sora leading-[21px]">
                    Tempat Lahir
                </span>
                <span class="text-[#0c141c] text-sm font-normal font-sora leading-[21px]">
                    {{ props.siswaDatas.birth_place }}
                </span>
            </div>
            <div class="w-full flex flex-col">
                <span class="text-[#4f7296] text-sm font-normal font-sora leading-[21px]">
                    Tanggal Lahir
                </span>
                <span class="text-[#0c141c] text-sm font-normal font-sora leading-[21px]">
                    {{ props.siswaDatas.birth_date }}
                </span>
            </div>
        </div>

        <div class="p-4 w-full flex items-center border-t">
            <div class="w-full flex flex-col">
                <span class="text-[#4f7296] text-sm font-normal font-sora leading-[21px]">
                    Golongan Darah
                </span>
                <span class="text-[#0c141c] text-sm font-normal font-sora leading-[21px]">
                    {{ props.siswaDatas.blood_group }}
                </span>
            </div>
            <div class="w-full flex flex-col">
                <span class="text-[#4f7296] text-sm font-normal font-sora leading-[21px]">
                    Agama
                </span>
                <span class="text-[#0c141c] text-sm font-normal font-sora leading-[21px]">
                    {{ props.siswaDatas.religion }}
                </span>
            </div>
        </div>

        <div class="p-4 w-full flex items-center border-t">
            <div class="w-full flex flex-col">
                <span class="text-[#4f7296] text-sm font-normal font-sora leading-[21px]">
                    Jenis Kelamin
                </span>
                <span class="text-[#0c141c] text-sm font-normal font-sora leading-[21px]">
                    {{ props.siswaDatas.gender }}
                </span>
            </div>
            <div class="w-full flex flex-col">
                <span class="text-[#4f7296] text-sm font-normal font-sora leading-[21px]">
                    Status Nikah
                </span>
                <span class="text-[#0c141c] text-sm font-normal font-sora leading-[21px]">
                    {{ props.siswaDatas.status }}
                </span>
            </div>
        </div>

        <div class="p-4 w-full flex items-center border-t">
            <div class="w-full flex flex-col">
                <span class="text-[#4f7296] text-sm font-normal font-sora leading-[21px]">
                    Alamat Lengkap
                </span>
                <span class="text-[#0c141c] text-sm font-normal font-sora leading-[21px]">
                    {{ props.siswaDatas.address }} {{ props.siswaDatas.region }}
                </span>
            </div>
            <div class="w-full flex flex-col">
                <span class="text-[#4f7296] text-sm font-normal font-sora leading-[21px]">
                    Email
                </span>
                <span class="text-[#0c141c] text-sm font-normal font-sora leading-[21px]">
                    {{ props.siswaDatas.user.email }}
                </span>
            </div>
        </div>
    </div>

    <div class="w-full px-4 pt-5 pb-3 flex flex-col gap-[16px]">
        <div class="text-[#0c141c] text-xl font-bold font-['Roboto'] leading-7">
            Educational Information
        </div>

        <div class="p-4 w-full flex items-center border-t">
            <div class="w-full flex flex-col">
                <span class="text-[#4f7296] text-sm font-normal font-sora leading-[21px]">
                    Jenjang Pendidikan
                </span>
                <span class="text-[#0c141c] text-sm font-normal font-sora leading-[21px]">
                    {{ props.siswaDatas.institutions.type }}
                </span>
            </div>
            <div class="w-full flex flex-col">
                <span class="text-[#4f7296] text-sm font-normal font-sora leading-[21px]">
                    Nama Sekolah
                </span>
                <span class="text-[#0c141c] text-sm font-normal font-sora leading-[21px]">
                    {{ props.siswaDatas.institutions.name }}
                </span>
            </div>
        </div>

        <div class="p-4 w-full flex items-center border-t">
            <div class="w-full flex flex-col">
                <span class="text-[#4f7296] text-sm font-normal font-sora leading-[21px]">
                    Jurusan
                </span>
                <span class="text-[#0c141c] text-sm font-normal font-sora leading-[21px]">
                    {{ props.siswaDatas.majoring || '-' }}
                </span>
            </div>
            <div class="w-full flex flex-col">
                <span class="text-[#4f7296] text-sm font-normal font-sora leading-[21px]">
                    Kelas
                </span>
                <span class="text-[#0c141c] text-sm font-normal font-sora leading-[21px]">
                    {{ props.siswaDatas.grade || '-' }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['siswaDatas'])
</script>