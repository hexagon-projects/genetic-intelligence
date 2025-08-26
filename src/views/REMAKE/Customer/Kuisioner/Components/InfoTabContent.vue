<script setup>
</script>

<template>
    <!-- Data Anak -->
    <div class="space-y-4 md:space-y-6">
        <div class="flex justify-between items-center">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-1">
                        <input type="radio" id="male" name="gender" :value='1' :checked="jenisKelamin == 'Laki-laki'"
                            @change="emit('update:jenisKelamin', $event.target.value)">
                        <label for="male">Laki Laki</label>
                    </div>
                    <div class="flex items-center gap-1">
                        <input type="radio" id="female" name="gender" :value='2' :checked="jenisKelamin == 'Perempuan'"
                            @change="emit('update:jenisKelamin', $event.target.value)">
                        <label for="female">Perempuan</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            <div class="space-y-2 flex flex-col">
                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Nama Depan</label>
                <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="namaDepan"
                    @input="emit('update:namaDepan', $event.target.value)" placeholder="Nama Depan">
            </div>
            <div class="space-y-2 flex flex-col">
                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Nama Belakang</label>
                <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="namaBelakang"
                    @input="emit('update:namaBelakang', $event.target.value)" placeholder="Nama Belakang">
            </div>
            <div class="space-y-2 flex flex-col">
                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Tempat Lahir</label>
                <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="tempatLahir"
                    @input="emit('update:tempatLahir', $event.target.value)" placeholder="Tempat Lahir">
            </div>
            <div class="space-y-2 flex flex-col">
                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Tanggal Lahir</label>
                <input type="date" class="p-3 rounded-lg bg-[#F5F5F5]" :value="tanggalLahir"
                    @input="emit('update:tanggalLahir', $event.target.value)">
            </div>
            <div class="space-y-2 flex flex-col">
                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Usia</label>
                <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="usia"
                    @input="emit('update:usia', $event.target.value)" placeholder="Usia">
            </div>
            <div class="space-y-2 flex flex-col">
                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Suku</label>
                <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="suku"
                    @input="emit('update:suku', $event.target.value)" placeholder="Suku">
            </div>
            <div class="space-y-2 flex flex-col">
                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Alamat Rumah</label>
                <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="alamatRumah"
                    @input="emit('update:alamatRumah', $event.target.value)" placeholder="Alamat Rumah">
            </div>
            <div class="space-y-2 flex flex-col">
                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Anak Ke</label>
                <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="anak"
                    @input="emit('update:anak', $event.target.value)" placeholder="Anak Ke">
            </div>
            <div class="space-y-2 flex flex-col">
                <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Jumlah Saudara</label>
                <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="jumlahSaudara"
                    @input="emit('update:jumlahSaudara', $event.target.value)" placeholder="Jumlah Saudara">
            </div>
        </div>

        <div>
            <button @click="emit('submit')"
                class="py-3 px-6 rounded-full text-white flex items-center gap-2 ml-auto text-sm md:text-base bg-primary">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M21 11.9999C20.7348 11.9999 20.4804 12.1053 20.2929 12.2928C20.1054 12.4804 20 12.7347 20 12.9999V18.9999C20 19.2652 19.8946 19.5195 19.7071 19.707C19.5196 19.8946 19.2652 19.9999 19 19.9999H5C4.73478 19.9999 4.48043 19.8946 4.29289 19.707C4.10536 19.5195 4 19.2652 4 18.9999V4.99994C4 4.73472 4.10536 4.48037 4.29289 4.29283C4.48043 4.1053 4.73478 3.99994 5 3.99994H11C11.2652 3.99994 11.5196 3.89458 11.7071 3.70705C11.8946 3.51951 12 3.26516 12 2.99994C12 2.73472 11.8946 2.48037 11.7071 2.29283C11.5196 2.1053 11.2652 1.99994 11 1.99994H5C4.20435 1.99994 3.44129 2.31601 2.87868 2.87862C2.31607 3.44123 2 4.20429 2 4.99994V18.9999C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 21.9999 5 21.9999H19C19.7956 21.9999 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 18.9999V12.9999C22 12.7347 21.8946 12.4804 21.7071 12.2928C21.5196 12.1053 21.2652 11.9999 21 11.9999ZM6 12.7599V16.9999C6 17.2652 6.10536 17.5195 6.29289 17.707C6.48043 17.8946 6.73478 17.9999 7 17.9999H11.24C11.3716 18.0007 11.5021 17.9755 11.6239 17.9257C11.7457 17.8759 11.8566 17.8026 11.95 17.7099L18.87 10.7799L21.71 7.99994C21.8037 7.90698 21.8781 7.79637 21.9289 7.67452C21.9797 7.55266 22.0058 7.42195 22.0058 7.28994C22.0058 7.15793 21.9797 7.02722 21.9289 6.90536C21.8781 6.7835 21.8037 6.6729 21.71 6.57994L17.47 2.28994C17.377 2.19621 17.2664 2.12182 17.1446 2.07105C17.0227 2.02028 16.892 1.99414 16.76 1.99414C16.628 1.99414 16.4973 2.02028 16.3754 2.07105C16.2536 2.12182 16.143 2.19621 16.05 2.28994L13.23 5.11994L6.29 12.0499C6.19732 12.1434 6.12399 12.2542 6.07423 12.376C6.02446 12.4979 5.99924 12.6283 6 12.7599ZM16.76 4.40994L19.59 7.23994L18.17 8.65994L15.34 5.82994L16.76 4.40994ZM8 13.1699L13.93 7.23994L16.76 10.0699L10.83 15.9999H8V13.1699Z"
                            fill="#E6E6E6" />
                    </svg>
                </span>
                Simpan
            </button>
        </div>
    </div>

    <!-- Data Orang Tua -->
    <div class="space-y-4 md:space-y-6">
        <div class="space-y-4 md:space-y-6">
            <h2 class="text-sm md:text-xl font-bold">Data Ayah</h2>
            <div class="flex justify-between items-center">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-1">
                            <input type="radio" id="ibu" name="parentType" value="Ibu" :checked="parentType === 'Ibu'"
                                @change="emit('update:parentType', $event.target.value)">
                            <label for="ibu">Ibu</label>
                        </div>
                        <div class="flex items-center gap-1">
                            <input type="radio" id="ayah" name="parentType" value="Ayah"
                                :checked="parentType === 'Ayah'"
                                @change="emit('update:parentType', $event.target.value)">
                            <label for="ayah">Ayah</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Nama</label>
                    <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentName"
                        @input="emit('update:parentName', $event.target.value)" placeholder="Nama Lengkap">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Tempat Lahir</label>
                    <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="tempatLahir"
                        @input="emit('update:tempatLahir', $event.target.value)" placeholder="Tempat Lahir">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Tanggal Lahir</label>
                    <input type="date" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentBirthDate"
                        @input="emit('update:parentBirthDate', $event.target.value)">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Agama</label>
                    <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentReligion"
                        @input="emit('update:parentReligion', $event.target.value)" placeholder="Agama">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Kewarganegaraan</label>
                    <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentKewarganegaraan"
                        @input="emit('update:parentKewarganegaraan', $event.target.value)"
                        placeholder="Kewarganegaraan">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Anak Ke</label>
                    <input type="number" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentAnakKe"
                        @input="emit('update:parentAnakKe', $event.target.value)" placeholder="Anak Ke">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Jumlah Saudara</label>
                    <input type="number" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentJumlahSodara"
                        @input="emit('update:parentJumlahSodara', $event.target.value)" placeholder="Jumlah Saudara">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Pernikahan Ke</label>
                    <input type="number" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentPernikahanKe"
                        @input="emit('update:parentPernikahanKe', $event.target.value)" placeholder="Pernikahan Ke">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Umur Saat Menikah</label>
                    <input type="number" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentUmurMenikah"
                        @input="emit('update:parentUmurMenikah', $event.target.value)" placeholder="Umur Saat Menikah">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Pendidikan Terakhir</label>
                    <select class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentPendidikan"
                        @input="emit('update:parentPendidikan', $event.target.value)">
                        <option value="">Pilih Pendidikan</option>
                        <option value="SD">SD</option>
                        <option value="SMP">SMP</option>
                        <option value="SMA">SMA</option>
                        <option value="D1">D1</option>
                        <option value="D2">D2</option>
                        <option value="D3">D3</option>
                        <option value="D4">D4</option>
                        <option value="S1">S1</option>
                        <option value="S2">S2</option>
                        <option value="S3">S3</option>
                    </select>
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Pekerjaan</label>
                    <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentPekerjaan"
                        @input="emit('update:parentPekerjaan', $event.target.value)" placeholder="Pekerjaan">
                </div>
            </div>
            <div>
                <button @click="emit('saveParentData')"
                    class="py-3 px-6 rounded-full text-white flex items-center gap-2 ml-auto text-sm md:text-base bg-primary">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M21 11.9999C20.7348 11.9999 20.4804 12.1053 20.2929 12.2928C20.1054 12.4804 20 12.7347 20 12.9999V18.9999C20 19.2652 19.8946 19.5195 19.7071 19.707C19.5196 19.8946 19.2652 19.9999 19 19.9999H5C4.73478 19.9999 4.48043 19.8946 4.29289 19.707C4.10536 19.5195 4 19.2652 4 18.9999V4.99994C4 4.73472 4.10536 4.48037 4.29289 4.29283C4.48043 4.1053 4.73478 3.99994 5 3.99994H11C11.2652 3.99994 11.5196 3.89458 11.7071 3.70705C11.8946 3.51951 12 3.26516 12 2.99994C12 2.73472 11.8946 2.48037 11.7071 2.29283C11.5196 2.1053 11.2652 1.99994 11 1.99994H5C4.20435 1.99994 3.44129 2.31601 2.87868 2.87862C2.31607 3.44123 2 4.20429 2 4.99994V18.9999C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 21.9999 5 21.9999H19C19.7956 21.9999 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 18.9999V12.9999C22 12.7347 21.8946 12.4804 21.7071 12.2928C21.5196 12.1053 21.2652 11.9999 21 11.9999ZM6 12.7599V16.9999C6 17.2652 6.10536 17.5195 6.29289 17.707C6.48043 17.8946 6.73478 17.9999 7 17.9999H11.24C11.3716 18.0007 11.5021 17.9755 11.6239 17.9257C11.7457 17.8759 11.8566 17.8026 11.95 17.7099L18.87 10.7799L21.71 7.99994C21.8037 7.90698 21.8781 7.79637 21.9289 7.67452C21.9797 7.55266 22.0058 7.42195 22.0058 7.28994C22.0058 7.15793 21.9797 7.02722 21.9289 6.90536C21.8781 6.7835 21.8037 6.6729 21.71 6.57994L17.47 2.28994C17.377 2.19621 17.2664 2.12182 17.1446 2.07105C17.0227 2.02028 16.892 1.99414 16.76 1.99414C16.628 1.99414 16.4973 2.02028 16.3754 2.07105C16.2536 2.12182 16.143 2.19621 16.05 2.28994L13.23 5.11994L6.29 12.0499C6.19732 12.1434 6.12399 12.2542 6.07423 12.376C6.02446 12.4979 5.99924 12.6283 6 12.7599ZM16.76 4.40994L19.59 7.23994L18.17 8.65994L15.34 5.82994L16.76 4.40994ZM8 13.1699L13.93 7.23994L16.76 10.0699L10.83 15.9999H8V13.1699Z"
                                fill="#E6E6E6" />
                        </svg>
                    </span>
                    Simpan Data Ayah
                </button>
            </div>
        </div>

        <div class="space-y-4 md:space-y-6">
            <h2 class="text-sm md:text-xl font-bold">Data Ibu</h2>
            <div class="flex justify-between items-center">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-1">
                            <input type="radio" id="ibu" name="parentType" value="Ibu" :checked="parentType === 'Ibu'"
                                @change="emit('update:parentType', $event.target.value)">
                            <label for="ibu">Ibu</label>
                        </div>
                        <div class="flex items-center gap-1">
                            <input type="radio" id="ayah" name="parentType" value="Ayah"
                                :checked="parentType === 'Ayah'"
                                @change="emit('update:parentType', $event.target.value)">
                            <label for="ayah">Ayah</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Nama</label>
                    <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentName"
                        @input="emit('update:parentName', $event.target.value)" placeholder="Nama Lengkap">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Tempat Lahir</label>
                    <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="tempatLahir"
                        @input="emit('update:tempatLahir', $event.target.value)" placeholder="Tempat Lahir">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Tanggal Lahir</label>
                    <input type="date" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentBirthDate"
                        @input="emit('update:parentBirthDate', $event.target.value)">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Agama</label>
                    <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentReligion"
                        @input="emit('update:parentReligion', $event.target.value)" placeholder="Agama">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Kewarganegaraan</label>
                    <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentKewarganegaraan"
                        @input="emit('update:parentKewarganegaraan', $event.target.value)"
                        placeholder="Kewarganegaraan">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Anak Ke</label>
                    <input type="number" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentAnakKe"
                        @input="emit('update:parentAnakKe', $event.target.value)" placeholder="Anak Ke">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Jumlah Saudara</label>
                    <input type="number" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentJumlahSodara"
                        @input="emit('update:parentJumlahSodara', $event.target.value)" placeholder="Jumlah Saudara">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Pernikahan Ke</label>
                    <input type="number" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentPernikahanKe"
                        @input="emit('update:parentPernikahanKe', $event.target.value)" placeholder="Pernikahan Ke">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Umur Saat Menikah</label>
                    <input type="number" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentUmurMenikah"
                        @input="emit('update:parentUmurMenikah', $event.target.value)" placeholder="Umur Saat Menikah">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Pendidikan Terakhir</label>
                    <select class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentPendidikan"
                        @input="emit('update:parentPendidikan', $event.target.value)">
                        <option value="">Pilih Pendidikan</option>
                        <option value="SD">SD</option>
                        <option value="SMP">SMP</option>
                        <option value="SMA">SMA</option>
                        <option value="D1">D1</option>
                        <option value="D2">D2</option>
                        <option value="D3">D3</option>
                        <option value="D4">D4</option>
                        <option value="S1">S1</option>
                        <option value="S2">S2</option>
                        <option value="S3">S3</option>
                    </select>
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Pekerjaan</label>
                    <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentPekerjaan"
                        @input="emit('update:parentPekerjaan', $event.target.value)" placeholder="Pekerjaan">
                </div>
            </div>
            <div>
                <button @click="emit('saveParentData')"
                    class="py-3 px-6 rounded-full text-white flex items-center gap-2 ml-auto text-sm md:text-base bg-primary">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M21 11.9999C20.7348 11.9999 20.4804 12.1053 20.2929 12.2928C20.1054 12.4804 20 12.7347 20 12.9999V18.9999C20 19.2652 19.8946 19.5195 19.7071 19.707C19.5196 19.8946 19.2652 19.9999 19 19.9999H5C4.73478 19.9999 4.48043 19.8946 4.29289 19.707C4.10536 19.5195 4 19.2652 4 18.9999V4.99994C4 4.73472 4.10536 4.48037 4.29289 4.29283C4.48043 4.1053 4.73478 3.99994 5 3.99994H11C11.2652 3.99994 11.5196 3.89458 11.7071 3.70705C11.8946 3.51951 12 3.26516 12 2.99994C12 2.73472 11.8946 2.48037 11.7071 2.29283C11.5196 2.1053 11.2652 1.99994 11 1.99994H5C4.20435 1.99994 3.44129 2.31601 2.87868 2.87862C2.31607 3.44123 2 4.20429 2 4.99994V18.9999C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 21.9999 5 21.9999H19C19.7956 21.9999 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 18.9999V12.9999C22 12.7347 21.8946 12.4804 21.7071 12.2928C21.5196 12.1053 21.2652 11.9999 21 11.9999ZM6 12.7599V16.9999C6 17.2652 6.10536 17.5195 6.29289 17.707C6.48043 17.8946 6.73478 17.9999 7 17.9999H11.24C11.3716 18.0007 11.5021 17.9755 11.6239 17.9257C11.7457 17.8759 11.8566 17.8026 11.95 17.7099L18.87 10.7799L21.71 7.99994C21.8037 7.90698 21.8781 7.79637 21.9289 7.67452C21.9797 7.55266 22.0058 7.42195 22.0058 7.28994C22.0058 7.15793 21.9797 7.02722 21.9289 6.90536C21.8781 6.7835 21.8037 6.6729 21.71 6.57994L17.47 2.28994C17.377 2.19621 17.2664 2.12182 17.1446 2.07105C17.0227 2.02028 16.892 1.99414 16.76 1.99414C16.628 1.99414 16.4973 2.02028 16.3754 2.07105C16.2536 2.12182 16.143 2.19621 16.05 2.28994L13.23 5.11994L6.29 12.0499C6.19732 12.1434 6.12399 12.2542 6.07423 12.376C6.02446 12.4979 5.99924 12.6283 6 12.7599ZM16.76 4.40994L19.59 7.23994L18.17 8.65994L15.34 5.82994L16.76 4.40994ZM8 13.1699L13.93 7.23994L16.76 10.0699L10.83 15.9999H8V13.1699Z"
                                fill="#E6E6E6" />
                        </svg>
                    </span>
                    Simpan Data Ibu
                </button>
            </div>
        </div>
    </div>

    <!-- Data Saudara -->
    <div class="space-y-4 md:space-y-6">
        <div class="space-y-4 md:space-y-6">
            <h2 class="text-sm md:text-xl font-bold">Data Ayah</h2>
            <div class="flex justify-between items-center">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-1">
                            <input type="radio" id="ibu" name="parentType" value="Ibu" :checked="parentType === 'Ibu'"
                                @change="emit('update:parentType', $event.target.value)">
                            <label for="ibu">Ibu</label>
                        </div>
                        <div class="flex items-center gap-1">
                            <input type="radio" id="ayah" name="parentType" value="Ayah"
                                :checked="parentType === 'Ayah'"
                                @change="emit('update:parentType', $event.target.value)">
                            <label for="ayah">Ayah</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Nama</label>
                    <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentName"
                        @input="emit('update:parentName', $event.target.value)" placeholder="Nama Lengkap">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Tempat Lahir</label>
                    <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="tempatLahir"
                        @input="emit('update:tempatLahir', $event.target.value)" placeholder="Tempat Lahir">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Tanggal Lahir</label>
                    <input type="date" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentBirthDate"
                        @input="emit('update:parentBirthDate', $event.target.value)">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Agama</label>
                    <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentReligion"
                        @input="emit('update:parentReligion', $event.target.value)" placeholder="Agama">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Kewarganegaraan</label>
                    <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentKewarganegaraan"
                        @input="emit('update:parentKewarganegaraan', $event.target.value)"
                        placeholder="Kewarganegaraan">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Anak Ke</label>
                    <input type="number" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentAnakKe"
                        @input="emit('update:parentAnakKe', $event.target.value)" placeholder="Anak Ke">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Jumlah Saudara</label>
                    <input type="number" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentJumlahSodara"
                        @input="emit('update:parentJumlahSodara', $event.target.value)" placeholder="Jumlah Saudara">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Pernikahan Ke</label>
                    <input type="number" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentPernikahanKe"
                        @input="emit('update:parentPernikahanKe', $event.target.value)" placeholder="Pernikahan Ke">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Umur Saat Menikah</label>
                    <input type="number" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentUmurMenikah"
                        @input="emit('update:parentUmurMenikah', $event.target.value)" placeholder="Umur Saat Menikah">
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Pendidikan Terakhir</label>
                    <select class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentPendidikan"
                        @input="emit('update:parentPendidikan', $event.target.value)">
                        <option value="">Pilih Pendidikan</option>
                        <option value="SD">SD</option>
                        <option value="SMP">SMP</option>
                        <option value="SMA">SMA</option>
                        <option value="D1">D1</option>
                        <option value="D2">D2</option>
                        <option value="D3">D3</option>
                        <option value="D4">D4</option>
                        <option value="S1">S1</option>
                        <option value="S2">S2</option>
                        <option value="S3">S3</option>
                    </select>
                </div>
                <div class="space-y-2 flex flex-col">
                    <label for="" class="text-[#8E8E8E] text-xs md:text-sm">Pekerjaan</label>
                    <input type="text" class="p-3 rounded-lg bg-[#F5F5F5]" :value="parentPekerjaan"
                        @input="emit('update:parentPekerjaan', $event.target.value)" placeholder="Pekerjaan">
                </div>
            </div>
            <div>
                <button @click="emit('saveParentData')"
                    class="py-3 px-6 rounded-full text-white flex items-center gap-2 ml-auto text-sm md:text-base bg-primary">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M21 11.9999C20.7348 11.9999 20.4804 12.1053 20.2929 12.2928C20.1054 12.4804 20 12.7347 20 12.9999V18.9999C20 19.2652 19.8946 19.5195 19.7071 19.707C19.5196 19.8946 19.2652 19.9999 19 19.9999H5C4.73478 19.9999 4.48043 19.8946 4.29289 19.707C4.10536 19.5195 4 19.2652 4 18.9999V4.99994C4 4.73472 4.10536 4.48037 4.29289 4.29283C4.48043 4.1053 4.73478 3.99994 5 3.99994H11C11.2652 3.99994 11.5196 3.89458 11.7071 3.70705C11.8946 3.51951 12 3.26516 12 2.99994C12 2.73472 11.8946 2.48037 11.7071 2.29283C11.5196 2.1053 11.2652 1.99994 11 1.99994H5C4.20435 1.99994 3.44129 2.31601 2.87868 2.87862C2.31607 3.44123 2 4.20429 2 4.99994V18.9999C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 21.9999 5 21.9999H19C19.7956 21.9999 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 18.9999V12.9999C22 12.7347 21.8946 12.4804 21.7071 12.2928C21.5196 12.1053 21.2652 11.9999 21 11.9999ZM6 12.7599V16.9999C6 17.2652 6.10536 17.5195 6.29289 17.707C6.48043 17.8946 6.73478 17.9999 7 17.9999H11.24C11.3716 18.0007 11.5021 17.9755 11.6239 17.9257C11.7457 17.8759 11.8566 17.8026 11.95 17.7099L18.87 10.7799L21.71 7.99994C21.8037 7.90698 21.8781 7.79637 21.9289 7.67452C21.9797 7.55266 22.0058 7.42195 22.0058 7.28994C22.0058 7.15793 21.9797 7.02722 21.9289 6.90536C21.8781 6.7835 21.8037 6.6729 21.71 6.57994L17.47 2.28994C17.377 2.19621 17.2664 2.12182 17.1446 2.07105C17.0227 2.02028 16.892 1.99414 16.76 1.99414C16.628 1.99414 16.4973 2.02028 16.3754 2.07105C16.2536 2.12182 16.143 2.19621 16.05 2.28994L13.23 5.11994L6.29 12.0499C6.19732 12.1434 6.12399 12.2542 6.07423 12.376C6.02446 12.4979 5.99924 12.6283 6 12.7599ZM16.76 4.40994L19.59 7.23994L18.17 8.65994L15.34 5.82994L16.76 4.40994ZM8 13.1699L13.93 7.23994L16.76 10.0699L10.83 15.9999H8V13.1699Z"
                                fill="#E6E6E6" />
                        </svg>
                    </span>
                    Simpan Data Saudara
                </button>
            </div>
        </div>
    </div>
</template>