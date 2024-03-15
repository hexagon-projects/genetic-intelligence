<template>
    <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Detail Customers</h1>
    <hr class="mt-4">
    <div class="flex flex-col justify-center items-center overflow-x-scroll">
        <img v-if="detailCustomers.image !== null" class="w-[180px] h-[180px] p-4" :src="baseUrl+'open/customers/'+detailCustomers.image" alt="">
        <img v-if="detailCustomers.image == null" class="w-[180px] h-[180px] p-4" src="https://placehold.co/400x400" alt="">
        <div v-if="detailCustomers" class="w-full p-4">
            <div class="flex flex-row gap-2">
                <div class="w-full">
                    <div class="flex flex-row items-center mb-4">
                        <div class="w-3/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Nama
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ detailCustomers.name }}
                                </p>
                            </div>
                        </div>
                        <div class="w-2/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Jenis Kelamin
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ detailCustomers.gender }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-row items-center gap-2 mb-4">
                        <div class="w-3/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    No Telp
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ detailCustomers.number }}
                                </p>
                            </div>
                        </div>
                        <div class="w-2/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Email
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ detailCustomers.user.email }}
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
                                    {{ detailCustomers.birth_place }}
                                </p>
                            </div>
                        </div>
                        <div class="w-2/5">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Tanggal Lahir
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ detailCustomers.birth_date }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-row items-center gap-2 mb-4">
                        <div class="w-full">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Status
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ detailCustomers.status }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-row items-center gap-2 mb-4">
                        <div class="w-full">
                            <div class="flex flex-col items-start">
                                <h1 class="font-myFont font-medium text-dark text-sm">
                                    Alamat
                                </h1>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ detailCustomers.address }}
                                </p>
                                <p class="font-myFont font-medium text-dark text-xs">
                                    {{ detailCustomers.region }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>