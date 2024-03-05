<template>
    <section id="img-login" class="bg-biru min-h-screen xl:h-full">
        <div class="container mx-auto">
            <div class="flex justify-center pt-32 pb-36">
                <div class="bg-white mx-4 w-full lg:w-9/12 lg:mx-auto px-10 py-4 drop-shadow-2xl rounded-lg">
                    <div class="flex flex-col justify-center items-center mb-6">
                        <h2 class="text-black text-2xl font-myFont font-bold mb-2">Daftar</h2>
                        <span class="font-myFont text-gray-500 text-sm">
                            Sudah Punya Akun? 
                            <router-link :to="{name: 'views.login'}" class="font-myFont text-biru text-sm hover:text-blue-600">
                                Klik untuk Masuk
                            </router-link>
                        </span>
                    </div>

                    <div class="mb-5">
                        <div
                        class="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100"
                        >
                            <ol class="relative z-10 flex justify-between text-sm font-medium text-gray-500">
                            <li class="flex items-center gap-2 bg-white p-2">
                                <span :class="{
                                    'h-6 w-6 rounded-full text-center text-white text-[10px]/6 font-bold bg-biru': currForm === 0,
                                    'h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold': currForm !== 0
                                    }">
                                    1
                                </span>
                                <span class="hidden sm:block"> Tipe Akun </span>
                            </li>

                            <li class="flex items-center gap-2 bg-white p-2">
                                <span :class="{
                                    'h-6 w-6 rounded-full text-center text-white text-[10px]/6 font-bold bg-biru': currForm === 1,
                                    'h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold': currForm !== 1
                                    }">
                                    2
                                </span>
                                <span class="hidden sm:block"> Detail Akun </span>
                            </li>

                            <li class="flex items-center gap-2 bg-white p-2">
                                <span
                                    :class="{
                                    'h-6 w-6 rounded-full text-center text-white text-[10px]/6 font-bold bg-biru': currForm === 2,
                                    'h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold': currForm !== 2
                                    }">
                                    3
                                </span>
                                <span class="hidden sm:block"> Detail Personal </span>
                            </li>

                            <li class="flex items-center gap-2 bg-white p-2">
                                <span :class="{
                                    'h-6 w-6 rounded-full text-center text-white text-[10px]/6 font-bold bg-biru': currForm === 3,
                                    'h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold': currForm !== 3
                                    }">
                                    4
                                </span>
                                <span class="hidden sm:block"> Pembayaran </span>
                            </li>
                            </ol>
                        </div>
                    </div>
 
                    <div v-if="currForm === 0">
                        <ul class="flex items-start justify-center gap-8 mt-10 mb-4 md:flex-row flex-col">
                            <li
                                class="w-full border lg:w-[32%] px-10 bg-white rounded-lg hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in"
                                :class="{'scale-105 shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] border-biru': tipeValue == 1}"
                                >
                                <h2 class="text-center text-dark font-myFont font-semibold text-lg tracking-wider mt-8 mb-3">
                                    Pelajar / Mahasiswa
                                </h2>
                                <img src="../../../assets/img/PelajarGroup.png" class="w-[221px] md:w-[213px] lg:w-[191px] mx-auto mb-4" alt="">
                                <!-- <p class="text-center tracking-tighter block mb-4">
                                    <span class="text-4xl text-dark font-myFont font-bold">Rp. 250.000</span>
                                </p> -->
                                <button v-if="tipeValue == null || tipeValue !== 1" @click="pilihTipe(1)" 
                                class="w-full p-2 border border-biru bg-white text-biru rounded-md font-semibold hover:bg-biru hover:text-light transition-all duration-150 ease-in mb-8"
                                >
                                    Pilih
                                </button>
                                <button v-if="tipeValue !== null && tipeValue == 1" 
                                class="cursor-not-allowed w-full p-2 bg-biru bg-opacity-75 text-light rounded-md font-semibold mb-8"
                                >
                                    Dipilih
                                </button>
                            </li>

                            <li
                                class="w-full border lg:w-[32%] px-10 bg-white rounded-lg hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in"
                                :class="{'scale-105 shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] border-biru': tipeValue == 0}"
                                >
                                <h2 class="text-center text-dark font-myFont font-semibold text-lg tracking-wider mt-8 mb-3">
                                    Non Pelajar
                                </h2>
                                <img src="../../../assets/img/NonpelajarGroup.png" class="mx-auto max-w-[222px] lg:w-full mb-4" alt="">
                                <!-- <p class="text-center tracking-tighter block mb-4">
                                    <span class="text-4xl text-dark font-myFont font-bold">Rp. 500.000</span>
                                </p> -->
                                <button @click="pilihTipe(0)" 
                                v-if="tipeValue == null || tipeValue !== 0"
                                class="w-full p-2 border border-biru bg-white text-biru rounded-md font-semibold hover:bg-biru hover:text-light transition-all duration-150 ease-in mb-8"
                                >
                                    Pilih
                                </button>
                                <button v-if="tipeValue !== null && tipeValue == 0"
                                class="cursor-not-allowed w-full p-2 bg-biru bg-opacity-75 text-light rounded-md font-semibold mb-8"
                                >
                                    Dipilih
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div v-else-if="currForm === 1">
                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="nama_depan" class="block text-sm font-myFont font-medium text-gray-600">Nama Depan:</label>
                                <input v-model="namaDepan" type="text" id="nama_depan" name="nama_depan" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Nama Depan" />
                                <!-- <a v-if="nameValidation && nameVal.length < 1" class="text-xs text-red-500">Nama depan tidak boleh kosong.</a> -->
                            </div>
                            <div class="w-full mb-4">
                                <label for="nama_belakang" class="block text-sm font-myFont font-medium text-gray-600">Nama Belakang:</label>
                                <input v-model="namaBelakang" type="text" id="nama_belakang" name="nama_belakang" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Nama Belakang" />
                            </div>
                        </div>
                        
                        <div :class="{'items-center': (!validasiPassword && !validasiPassword !== '') || (!validasiEmail && !validasiEmail !== '')}" class="flex justify-center gap-2">
                            <div class="w-full mb-4">
                                <label for="email" class="block text-sm font-myFont font-medium text-gray-600">Email:</label>
                                <input v-model="emailVal" @input="validation" type="email" id="email" name="email" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Email" />
                                <a v-if="validasiEmail && validasiEmail !== ''" class="text-xs text-red-500">{{ validasiEmail }}</a>
                            </div>
    
                            <div class="w-full mb-4">
                                <label for="password" class="block text-sm font-myFont font-medium text-gray-600">Password:</label>
                                <input v-model="passwordVal" @keyup="validation" type="password" id="password" name="password" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Password" />
                                <a v-if="validasiPassword && validasiPassword !== ''" class="text-xs text-red-500">{{ validasiPassword }}</a>
                            </div>
                        </div>

                        <div v-if="tipeValue == 1" class="flex justify-center gap-2"
                        :class="{'items-center': !validasiWA && !validasiWA !== ''}"
                        >
                            <div class="w-full mb-4">
                                <label for="jenjang_pendidikan" class="block text-sm font-myFont font-medium text-gray-600">Jenjang Pendidikan:</label>
                                <select v-model="jenjang_pendidikan" id="jenjang_pendidikan" name="jenjang_pendidikan" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                                    <option value="" disabled selected>-- Pilih Opsi --</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="SD">SD</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="SMP">SMP</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="SMA">SMA</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="SMK">SMK</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="perguruan_tinggi">Perguruan Tinggi</option>
                                </select>
                            </div>

                            <div class="w-full mb-4">
                                <label for="nama_sekolah" class="block text-sm font-myFont font-medium text-gray-600">Nama Sekolah / Nama Perguruan Tinggi:</label>
                                <input v-model="nama_sekolah" type="text" id="nama_sekolah" name="nama_sekolah" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Nama Sekolah" />
                            </div>
    
                            <!-- <div class="w-full mb-4">
                                <label for="no_whatsapp" class="block text-sm font-myFont font-medium text-gray-600">No Whatsapp:</label>
                                <input v-model="noWhatsapp" @keyup="validation" type="text" id="no_whatsapp" name="no_whatsapp" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="08xxxxx" />
                                <a v-if="validasiWA && validasiWA !== ''" class="text-xs text-red-500">{{ validasiWA }}</a>
                            </div> -->
                        </div>
                        <div v-else-if="tipeValue == 0" class="w-full mb-4">
                            <label for="no_whatsapp" class="block text-sm font-myFont font-medium text-gray-600">No Whatsapp:</label>
                            <input v-model="noWhatsapp" @keyup="validation" type="text" id="no_whatsapp" name="no_whatsapp" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="08xxxxx" />
                            <a v-if="validasiWA && validasiWA !== ''" class="text-xs text-red-500">{{ validasiWA }}</a>
                        </div>

                        <transition name="fade" mode="out-in">
                            <div v-if="jenjang_pendidikan !== '' && tipeValue == 1" class="flex justify-center gap-2">
                                <div v-if="jenjang_pendidikan !== 'perguruan_tinggi'" class="w-full mb-4">
                                    <label for="grade" class="block text-sm font-myFont font-medium text-gray-600">Kelas:</label>
                                    <input v-model="grade" type="text" id="grade" name="grade" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Contoh: 1" />
                                </div>
    
                                <div v-if="jenjang_pendidikan == 'SMK'" class="w-full mb-4">
                                    <label for="jurusan" class="block text-sm font-myFont font-medium text-gray-600">Jurusan:</label>
                                    <input v-model="majoring" type="text" id="jurusan" name="jurusan" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Kosongkan jika tidak ada" />
                                </div>
    
                                <div v-if="jenjang_pendidikan == 'perguruan_tinggi'" class="w-full mb-4">
                                    <label for="semester" class="block text-sm font-myFont font-medium text-gray-600">Semester:</label>
                                    <input v-model="grade" type="text" id="semester" name="semester" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Semester" />
                                </div>
    
                                <div v-if="jenjang_pendidikan == 'perguruan_tinggi'" class="w-full mb-4">
                                    <label for="prodi" class="block text-sm font-myFont font-medium text-gray-600">Prodi:</label>
                                    <input v-model="majoring" type="text" id="prodi" name="prodi" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Prodi" />
                                </div>
                            </div>
                        </transition>
                        <div v-if="tipeValue == 1" class="w-full mb-4">
                            <label for="no_whatsapp" class="block text-sm font-myFont font-medium text-gray-600">No Whatsapp:</label>
                            <input v-model="noWhatsapp" @keyup="validation" type="text" id="no_whatsapp" name="no_whatsapp" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="08xxxxx" />
                            <a v-if="validasiWA && validasiWA !== ''" class="text-xs text-red-500">{{ validasiWA }}</a>
                        </div>
                    </div>

                    <div v-else-if="currForm === 2" class="mx-2">
                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="tempat_lahir" class="block text-sm font-myFont font-medium text-gray-600">Tempat Lahir:</label>
                                <input v-model="tempatLahir" type="text" id="tempat_lahir" name="tempat_lahir" class="text-base mt-1 px-2 py-[8px] lg:py-[8px] border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Contoh: Bandung" />
                            </div>
                            <div class="w-full mb-4">
                                <label for="tgl_lahir" class="block text-sm font-myFont font-medium text-gray-600">Tanggal Lahir:</label>
                                <VueDatePicker class="py-1" v-model="date" :enable-time-picker="false" placeholder="Tanggal" text-input />
                                <!-- <input v-model="tglLahir" type="date" id="tgl_lahir" name="tgl_lahir" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Tanggal Lahir" /> -->
                            </div>
                        </div>

                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="child_number" class="block text-sm font-myFont font-medium text-gray-600">Anak Ke:</label>
                                <input v-model="child_number" type="text" id="child_number" name="child_number" class="text-base mt-1 px-2 py-[8px] lg:py-[8px] border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Contoh: 2" />
                            </div>
                            <div class="w-full mb-4">
                                <label for="jml_saudara" class="block text-sm font-myFont font-medium text-gray-600">Jumlah Bersaudara:</label>
                                <input v-model="from_child_number" type="text" id="jml_saudara" name="jml_saudara" class="text-base mt-1 px-2 py-[8px] lg:py-[8px] border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Contoh: 2" />
                            </div>
                        </div>

                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="agama" class="block text-sm font-myFont font-medium text-gray-600">Agama:</label>
                                <select v-model="agama" name="agama" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                                    <option value="" disabled selected>-- Pilih Agama --</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="Islam">Islam</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="Kristen">Kristen</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="Katholik">Katholik</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="Hindu">Hindu</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="Buddha">Buddha</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="Lainya">Lainya</option>
                                </select>
                                <!-- <input v-model="agama" type="text" id="agama" name="agama" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Agama" /> -->
                            </div>

                            <div class="w-full mb-4">
                                <label for="jenis_kelamin" class="block text-sm font-myFont font-medium text-gray-600">Jenis Kelamin:</label>
                                <select v-model="jenisKelamin" name="jenis_kelamin" id="jenis_kelamin" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                                    <option value="" disabled selected>-- Pilih Opsi --</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="1">Laki - Laki</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="2">Perempuan</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="gol_darah" class="block text-sm font-myFont font-medium text-gray-600">Golongan Darah:</label>
                                <select v-model="golDarah" name="gol_darah" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                                    <option value="" disabled selected>-- Pilih Gol. Darah --</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="A">A</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="B">B</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="AB">AB</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="O">O</option>
                                </select>
                                <!-- <input v-model="golDarah" type="text" name="gol_darah" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Golongan Darah" /> -->
                            </div>

                            <div class="w-full mb-4">
                                <label for="status_nikah" class="block text-sm font-myFont font-medium text-gray-600">Status Nikah:</label>
                                <select v-model="statusNikah" name="status_nikah" id="status_nikah" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                                    <option class="text-xs selection:text-xs" value="" disabled selected>-- Pilih Opsi --</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="0">Belum Kawin</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="1">Kawin</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="2">Cerai Hidup</option>
                                    <option class="text-xs md:text-sm lg:text-base" value="3">Cerai Mati</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="ethnic" class="block text-sm font-myFont font-medium text-gray-600">Suku:</label>
                                <input v-model="ethnic" type="text" id="ethnic" name="ethnic" class="text-base mt-1 px-2 py-[8px] lg:py-[8px] border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Contoh: Sunda" />
                            </div>
                            <div class="w-full mb-4">
                                <label for="nationality" class="block text-sm font-myFont font-medium text-gray-600">Kebangsaan:</label>
                                <input v-model="nationality" type="text" id="nationality" name="nationality" class="text-base mt-1 px-2 py-[8px] lg:py-[8px] border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Contoh: Indonesia" />
                            </div>
                        </div>

                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="provinsi" class="block text-sm font-myFont font-medium text-gray-600">Provinsi:</label>
                                <select v-model="provinsi" @change="getKota" name="provinsi" id="provinsi" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                                    <option value="" selected>-- Pilih Provinsi --</option>
                                    <option class="text-xs md:text-sm lg:text-base" v-for="(option, index) in provinceOptions" :key="index" :value="option.id">
                                        {{ option.text }}
                                    </option>
                                </select>
                                <!-- <Select2 
                                @select="getKota"
                                v-model="provinsi" 
                                :options="provinceOptions"
                                :settings="{width: '100%', placeholder: 'Pilih Provinsi'}"
                                class="mt-1 p-[5px] border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white"
                                /> -->
                                <!-- <input v-model="provinsi" type="text" id="provinsi" name="provinsi" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Provinsi" /> -->
                                <!-- <a v-if="nameValidation && nameVal.length < 1" class="text-xs text-red-500">Nama depan tidak boleh kosong.</a> -->
                            </div>
                            <div class="w-full mb-4">
                                <label for="kota" class="block text-sm font-myFont font-medium text-gray-600">Kota:</label>
                                <select v-model="kota" @change="getKecamatan" name="kota" id="kota" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                                    <option value="" selected>-- Pilih Kota --</option>
                                    <option class="text-xs md:text-sm lg:text-base" v-for="(option, index) in cityOptions" :key="index" :value="option.id">
                                        {{ option.text }}
                                    </option>
                                </select>
                                <!-- <Select2 
                                @select="getKecamatan"
                                v-model="kota" 
                                :options="cityOptions"
                                :settings="{width: '100%', placeholder: 'Pilih Kota'}"
                                class="mt-1 p-[5px] border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white"
                                /> -->
                                <!--<input v-model="kota" type="text" id="kota" name="kota" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Kota" />-->
                            </div>
                        </div>
                        
                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="kecamatan" class="block text-sm font-myFont font-medium text-gray-600">Kecamatan:</label>
                                <select v-model="kecamatan" @change="getKelurahan" name="kecamatan" id="kecamatan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                                    <option value="" selected>-- Pilih Kecamatan --</option>
                                    <option class="text-xs md:text-sm lg:text-base" v-for="(option, index) in districtsOptions" :key="index" :value="option.id">
                                        {{ option.text }}
                                    </option>
                                </select>
                                <!-- <Select2 
                                @select="getKelurahan"
                                v-model="kecamatan" 
                                :options="districtsOptions"
                                :settings="{width: '100%', placeholder: 'Pilih Kecamatan'}"
                                class="mt-1 p-[5px] border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white"
                                /> -->
                                <!-- <input v-model="kecamatan" type="text" id="kecamatan" name="kecamatan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Kecamatan" /> -->
                            </div>
                            <div class="w-full mb-4">
                                <label for="kelurahan" class="block text-sm font-myFont font-medium text-gray-600">Kelurahan:</label>
                                <select v-model="kelurahan" @change="saveVillagesId" name="kelurahan" id="kelurahan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                                    <option value="" selected>Pilih Kelurahan</option>
                                    <option class="text-xs md:text-sm lg:text-base" v-for="(item, index) in villagesOptions" :value="item.id" :key="index">{{ item.text }}</option>
                                </select>
                                <!-- <Select2 
                                @select="saveVillagesId"
                                v-model="kelurahan" 
                                :options="villagesOptions"
                                :settings="{width: '100%', placeholder: 'Pilih Kelurahan'}"
                                class="mt-1 p-[5px] border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white"
                                /> -->
                                <!-- <input v-model="kelurahan" type="text" id="kelurahan" name="kelurahan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Kelurahan" /> -->
                            </div>
                        </div>

                        <div class="w-full mb-4">
                            <label for="alamat" class="block text-sm font-myFont font-medium text-gray-600">Alamat Lengkap:</label>
                            <textarea v-model="alamatLengkap" type="text" id="alamat" name="alamat" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Alamat Lengkap"></textarea>
                        </div>
                    </div>

                    <div v-else-if="currForm === 3">
                        <!-- Form pembayaran -->
                        <div class="lg:hidden flex flex-col items-center gap-2">
                            <div class="w-full">
                                <label for="code_voucher" class="block text-xs md:text-sm font-myFont font-medium text-gray-600">Kode Voucher:</label>
                                <input v-model="code_voucher" type="text" name="code_voucher" class="mt-1 p-2 border placeholder:text-sm rounded-md w-full bg-white focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Kode"/>
                            </div>
                            <div class="flex items-center gap-1">
                                <PhInfo :size="28"/>
                                <p class="font-myFont text-neutral-500 text-xs">Jika punya, Gunakan kode voucher saat mendaftar untuk meraih keuntungan tambahan.</p>
                            </div>
                        </div>

                        <hr class="my-4">

                        <div class="lg:hidden flex flex-col justify-center items-center gap-2">
                            <div class="w-full">
                                <label for="metode_pembayaran" class="block text-xs md:text-sm font-myFont font-medium text-gray-600">Metode Pembayaran:</label>
                                <input v-model="paymentType" type="text" name="metode_pembayaran" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Pilih Metode Pembayaran" readonly />
                            </div>
                            <div class="w-full">
                                <label for="total_fee" class="block text-xs md:text-sm font-myFont font-medium text-gray-600">Total Pembayaran:</label>
                                <input v-model="totalFee" type="text" name="total_fee" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Rp.0" readonly />
                            </div>
                            <div class="w-full mb-2">
                                <label for="payment_code" class="block text-xs md:text-sm font-myFont font-medium text-gray-600">Biaya Admin:</label>
                                <input v-model="feePaymentMethod" type="text" name="payment_code" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Rp.0" readonly />
                            </div>
                            <!-- <div class="w-full flex items-center gap-1">
                                <div class="w-1/2 md:w-full lg:w-0">
                                    <label for="metode_pembayaran" class="block text-sm font-myFont font-medium text-gray-600">Metode Pembayaran:</label>
                                    <input v-model="paymentType" type="text" name="metode_pembayaran" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" readonly />
                                </div>
                                <div class="w-1/2 md:w-full lg:w-0">
                                    <label for="total_fee" class="block text-sm font-myFont font-medium text-gray-600">Total Pembayaran:</label>
                                    <input v-model="totalFee" type="text" name="total_fee" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" readonly />
                                </div>
                            </div>
                            <div class="w-full flex items-center gap-1 mb-2">
                                <div class="w-1/2 md:w-full lg:w-0">
                                    <label for="payment_code" class="block text-sm font-myFont font-medium text-gray-600">Biaya Admin:</label>
                                    <input v-model="feePaymentMethod" type="text" name="payment_code" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" readonly />
                                </div>
                                <div class="w-1/2 md:w-full lg:w-0">
                                    <label for="code_voucher" class="block text-sm font-myFont font-medium text-gray-600">Kode Voucher:</label>
                                    <input v-model="code_voucher" type="text" name="code_voucher" class="mt-1 p-2 border placeholder:text-sm rounded-md w-full bg-white focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Isi jika punya"/>
                                </div>
                            </div> -->
                        </div>
                        <div class="hidden lg:flex items-center gap-4">
                            <div class="w-1/4 mb-4">
                                <label for="code_voucher" class="block text-sm font-myFont font-medium text-gray-600">Kode Voucher:</label>
                                <input v-model="code_voucher" type="text" name="code_voucher" class="mt-1 p-2 border placeholder:text-sm rounded-md w-full bg-white focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Kode"/>
                            </div>
                            <div class="flex items-center mt-2 gap-1">
                                <PhInfo :size="20"/>
                                <p class="font-myFont text-neutral-500 text-sm">Jika punya, Gunakan kode voucher saat mendaftar untuk meraih keuntungan tambahan.</p>
                            </div>
                        </div>

                        <hr class="hidden lg:block mt-1 mb-4">

                        <div class="hidden lg:flex justify-center items-center gap-2 mt-2">
                            <div class="w-1/3 mb-4">
                                <label for="metode_pembayaran" class="block text-sm font-myFont font-medium text-gray-600">Metode Pembayaran:</label>
                                <input v-model="paymentType" type="text" name="metode_pembayaran" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" readonly />
                            </div>
                            <div class="w-1/3 mb-4">
                                <label for="total_fee" class="block text-sm font-myFont font-medium text-gray-600">Total Pembayaran:</label>
                                <input v-model="totalFee" type="text" name="total_fee" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" readonly />
                            </div>
                            <div class="w-1/3 mb-4">
                                <label for="payment_code" class="block text-sm font-myFont font-medium text-gray-600">Biaya Admin:</label>
                                <input v-model="feePaymentMethod" type="text" name="payment_code" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" readonly />
                            </div>
                        </div>
                        <!-- end form pembayaran -->

                        <!-- Form Pilih Bank -->
                        <!-- <div v-else-if="tipeValue == 0" class="flex justify-center items-center gap-2">
                            <div class="w-1/3 mb-4">
                                <label for="metode_pembayaran" class="block text-sm font-myFont font-medium text-gray-600">Metode Pembayaran:</label>
                                <input v-model="paymentType" type="text" name="metode_pembayaran" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" readonly />
                            </div>
                            <div class="w-1/3 mb-4">
                                <label for="total_fee" class="block text-sm font-myFont font-medium text-gray-600">Total Pembayaran:</label>
                                <input v-model="totalFee" type="text" name="total_fee" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" readonly />
                            </div>
                            <div class="w-1/3 mb-4">
                                <label for="payment_code" class="block text-sm font-myFont font-medium text-gray-600">Biaya Admin:</label>
                                <input v-model="feePaymentMethod" type="text" name="payment_code" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" readonly />
                            </div>
                        </div> -->

                        <div class="-ml-2 flex flex-col gap-2 max-h-36">
                            <div class="py-2 px-2 grid grid-cols-4 gap-2 overflow-y-scroll w-full">
                                <a @click="pilihPayment(payment.paymentMethod, payment.paymentName, payment.totalFee)" v-for="(payment, index) in paymentMethod" :key="index" class="cursor-pointer hover:animate-wiggle bg-white border rounded-lg shadow-sm px-2 py-2">
                                    <img :src="payment.paymentImage" :alt="payment.paymentName">
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- end form pilih bank -->

                    <div class="flex justify-between items-center mt-4">
                        <button v-if="currForm >= 1" @click="toggleTabs(-1)" class="bg-gray-300 font-myFont text-black p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
                            Sebelumnya
                        </button>
                        <button v-if="tipeValue !== null" @click="handleButtonClick()" :disabled="isNextButtonDisabled" :class="{'ml-auto': currForm === 0, 'bg-gray-600 opacity-80 cursor-not-allowed': isNextButtonDisabled}" class="bg-biru font-myFont text-white p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
                            {{ currForm === 3 ? 'Bayar' : 'Selanjutnya' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import initAPI from '../../../api/api'
import DOMPurify from 'dompurify'
import jQuery from "jquery";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { PhInfo } from "@phosphor-icons/vue";
import { useRouter } from 'vue-router'

export default{
    name: 'RegisterPage',
    // components: {Select2},
    components: {VueDatePicker, PhInfo},
    setup(){
        const router = useRouter()
        const $ = jQuery;
        window.$ = $;
        const date = ref();
        const provinceOptions = ref([])
        const cityOptions = ref([])
        const districtsOptions = ref([])
        const villagesOptions = ref([])

        const currForm = ref(0)
        const tipeValue = ref(null)
        const jenjang_pendidikan = ref('')
        const nama_sekolah = ref('')
        const grade = ref('')
        const majoring = ref('')
        const namaDepan = ref('')
        const namaBelakang = ref('')
        const emailVal = ref('')
        const passwordVal = ref('')
        const noWhatsapp = ref('')
        const golDarah = ref('')
        const agama = ref('')
        const tempatLahir = ref('')
        const tglLahir = ref('')
        const jenisKelamin = ref('')
        const statusNikah = ref('')
        const child_number = ref('')
        const from_child_number = ref('')
        const ethnic = ref('')
        const nationality = ref('')
        const provinsi = ref('')
        const kota = ref('')
        const kecamatan = ref('')
        const kelurahan = ref('')
        const alamatLengkap = ref('')
        const paymentMethod = ref([])
        const paymentType = ref('')
        const paymentCode = ref('')
        const totalFee = ref('')
        const feePaymentMethod = ref('')
        const biayaPendaftaran = ref('')
        const code_voucher = ref('')

        const validasiWA = ref('')
        const validasiEmail = ref('')
        const validasiPassword = ref('')

        const pilihTipe = async(params) => {
            const token = JSON.parse(localStorage.getItem('token'))
            tipeValue.value = params
            let endpoint = params == 1 ? 'register-student' : 'register-non-student'
            const response = await initAPI('get', `register/payment?type=${endpoint}`, null, token)
            // console.log(response.data.price.replace('.', ''))
            biayaPendaftaran.value = response.data.price.replace('.', '')
        }

        onMounted(async() => {
            const response = await initAPI('get', 'payment/methods', null, null)
            paymentMethod.value = response.data.paymentFee

            const province = await initAPI('get', 'region/provinces', null, null)
            console.log(province.data)
            const formattedProvince = province.data.map(item => ({
                id: item.id,
                text: item.name
            }));
            provinceOptions.value = formattedProvince

            // const biayapendaftaran = await initAPI('get', 'register/payment', null, null)
            // console.log(`biaya`,biayaPendaftaran)
            // biayaPendaftaran.value = biayapendaftaran.data.price
        })

        const getKota = async() => {
            console.log(`kota:`, provinsi.value)
            const kota = await initAPI('get', 'region/regencies?province_id='+provinsi.value, null, null)
            console.log(`kota`, kota)
            const formattedKota = kota.data.map(item => ({
                id: item.id,
                text: item.name
            }));
            cityOptions.value = formattedKota
        }

        const getKecamatan = async() => {
            console.log(`kecataman:`, kota.value)
            const kecamatan = await initAPI('get', 'region/districts?regency_id='+kota.value, null, null)
            console.log(`kecamatan`, kecamatan)
            const formattedKecamatan = kecamatan.data.map(item => ({
                id: item.id,
                text: item.name
            }));
            districtsOptions.value = formattedKecamatan
        }

        const getKelurahan = async() => {
            console.log(`kelurahan yeuh:`, kecamatan.value)
            const kelurahan = await initAPI('get', 'region/villages?district_id='+kecamatan.value, null, null)
            console.log(`kelurahan`, kelurahan)
            const formattedKelurahan = kelurahan.data.map(item => ({
                id: item.id,
                text: item.name
            }));
            villagesOptions.value = formattedKelurahan
        }

        const saveVillagesId = () => {
            console.log(`ie yeuh villagena`, kelurahan.value)
        }

        const pilihPayment = (code, payment, fee) => {
            console.log(`${payment} - ${fee}`)
            paymentType.value = payment
            paymentCode.value = code
            feePaymentMethod.value = fee
            totalFee.value = 'Rp.'+biayaPendaftaran.value
            // alert('wkwkwk ajg')
        }

        const toggleTabs = (increment) => {
            const currTab = currForm.value + increment;
            console.log('eh', currTab)

            if (currTab >= 0 && currTab <= 4) {
                currForm.value = currTab;
            }
        };

        const handleButtonClick = () => {
            if (currForm.value === 3) {
            // hitApiBayar();
                Register()
            } else if(currForm.value === 2) {
                Register('nonbayar')
                toggleTabs(1);
            } else {
                toggleTabs(1);
            }

        };

        const isNextButtonDisabled = computed(() => {
            switch (currForm.value) {
                case 0:
                return false
                case 1:
                return !namaDepan.value 
                    || !namaBelakang.value 
                    || !emailVal.value 
                    || validasiEmail.value !== '' 
                    || !passwordVal.value 
                    || validasiPassword.value !== '' 
                    || !noWhatsapp.value 
                    || isNaN(noWhatsapp.value)
                    || (tipeValue.value == 1 && !jenjang_pendidikan.value)
                    || (tipeValue.value == 1 && !nama_sekolah.value)
                    || (tipeValue.value == 1 && !grade.value)
                case 2:
                return !golDarah.value 
                    || !agama.value 
                    || !tempatLahir.value 
                    || !date.value 
                    || !jenisKelamin.value 
                    || !statusNikah.value 
                    || !provinsi.value 
                    || !kota.value 
                    || !kecamatan.value 
                    || !kelurahan.value 
                    || !alamatLengkap.value
                    || !child_number.value
                    || !from_child_number.value
                    || !ethnic.value
                    || !nationality.value
                case 3:
                return !paymentType.value || !totalFee.value
                default:
                return true;
            }
        });

        const validation = () => {
            if(isNaN(noWhatsapp.value)){
                // console.log(`kudu number ajig`)
                validasiWA.value = 'No Whatsapp hanya bisa di isi oleh angka'
            } else if(emailVal.value && !emailVal.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                validasiEmail.value = 'Email tidak valid'
            } else if(passwordVal.value && passwordVal.value.length < 8) {
                validasiPassword.value = 'Password harus 8 karakter'
            } else {
                validasiWA.value = ''
                validasiEmail.value = ''
                validasiPassword.value = ''
            }
        }

        const Register = async(param) => {
            console.log(`ie date entah`,date.value)
            const rawDate = new Date(date.value);

            const year = rawDate.getFullYear();
            const month = (rawDate.getMonth() + 1).toString().padStart(2, '0')
            const day = rawDate.getDate().toString().padStart(2, '0')

            const formattedDate = `${year}-${month}-${day}`;
            console.log(`diolah`, formattedDate)

            const data = JSON.stringify({
                "first_name": DOMPurify.sanitize(namaDepan.value),
                "last_name": DOMPurify.sanitize(namaBelakang.value),
                "email": DOMPurify.sanitize(emailVal.value),
                "password": DOMPurify.sanitize(passwordVal.value),
                "number": DOMPurify.sanitize(noWhatsapp.value),
                "religion": DOMPurify.sanitize(agama.value),
                "blood_group": DOMPurify.sanitize(golDarah.value),
                "birth_place": DOMPurify.sanitize(tempatLahir.value),
                // "birth_date": DOMPurify.sanitize(tglLahir.value),
                "birth_date": formattedDate,
                "gender": jenisKelamin.value,
                "village_id": kelurahan.value,
                "address": alamatLengkap.value,
                "status": statusNikah.value,
                "payment_method_code": paymentCode.value,
                "fee": feePaymentMethod.value,
                "school_code": DOMPurify.sanitize(code_voucher.value),
                // "fee": parseInt(biayaPendaftaran.value) + parseInt(feePaymentMethod.value),
                "is_student": tipeValue.value,
                "school_name": DOMPurify.sanitize(nama_sekolah.value),
                "grade": DOMPurify.sanitize(grade.value),
                "majoring": DOMPurify.sanitize(majoring.value),
                "ethnic": DOMPurify.sanitize(ethnic.value),
                "nationality": DOMPurify.sanitize(nationality.value),
                "child_number": DOMPurify.sanitize(child_number.value),
                "from_child_number": DOMPurify.sanitize(from_child_number.value)
            })
            console.log(data)

            try {
                const endpoint = param == 'nonbayar' ? 'v2/register' : 'register'
                const response = await initAPI('post', endpoint, data, null)
                console.log(`register nih`,response.data)
                if (response.status === 200) {
                    if(response.data.is_free == true){
                        Swal.fire({
                            icon: 'success',
                            title: 'Registrasi Berhasil.',
                            text: response.data.message,
                            showConfirmButton: true,
                            confirmButtonColor: "#0b40f4",
                            confirmButtonText: "OK",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                router.push('/login')
                            }
                        })
                    } else if(response.data.is_free == false){
                        localStorage.setItem('merchantId', JSON.stringify(response.data.payment_data.merchant_order_id))
                        console.log('Register berhasil:', response.data.data.paymentUrl)
                        const url = response.data.data.paymentUrl
                        let fixedUrl = ''
                        let refValue = ''
                        if(url.includes('ref=')){
                            fixedUrl = 'https://sandbox.duitku.com/TopUp/v2/TopUpVAPage.aspx?ref='
                            refValue = url.split('ref=')[1]
                        }else if(url.includes('reference=')){
                            console.log('reference', url)
                            fixedUrl = 'https://sandbox.duitku.com/topup/v2/TopUpCreditCardPayment.aspx?reference='
                            refValue = url.split('reference=')[1]
                        }
                        window.location.href = fixedUrl+refValue
                        console.log('ref',refValue)
                        console.log(`${fixedUrl}-${refValue}`)
                    }
                }
            } catch (error) {
                if (error.response) {
                    let message
                    if(error.response.data.email || error.response.data.error.includes('email')) message = 'Email tidak valid' 
                    if(error.response.data.password) message = 'Password harus 8 karakter atau lebih' 
                    if(error.response.data.email && error.response.data.password) message = 'Email tidak valid dan Password kurang dari 8 karakter'
                    Swal.fire({
                        icon: 'error',
                        title: 'Registrasi Gagal',
                        text: message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            }
        }

        return{
            date,
            feePaymentMethod,
            biayaPendaftaran,
            currForm,
            tipeValue,
            jenjang_pendidikan,
            nama_sekolah,
            grade,
            majoring,
            code_voucher,
            namaDepan,
            namaBelakang,
            emailVal,
            passwordVal,
            noWhatsapp,
            golDarah,
            child_number,
            from_child_number,
            ethnic,
            nationality,
            agama,
            tempatLahir,
            tglLahir,
            jenisKelamin,
            statusNikah,
            provinsi,
            kota,
            kelurahan,
            kecamatan,
            alamatLengkap,
            handleButtonClick,
            toggleTabs,
            isNextButtonDisabled,
            paymentMethod,
            paymentType,
            paymentCode,
            totalFee,
            pilihPayment,
            provinceOptions,
            cityOptions,
            districtsOptions,
            villagesOptions,
            getKota,
            getKecamatan,
            getKelurahan,
            saveVillagesId,
            validation,
            pilihTipe,
            validasiWA,
            validasiEmail,
            validasiPassword
        }
    }
}
</script>

<style scoped>
#img-login {
  min-height:100%;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url("../../../assets/img/bg-login2.jpg");
  /* background:linear-gradient(0deg, rgba(255, 0, 150, 0.3), rgba(38, 173, 197, 0.3)), url("../../../assets/img/bg-login2.jpg"); */
  background-repeat: no-repeat;
    background-size: 100% 100%;
      /* background:linear-gradient(0deg, rgba(255, 0, 150, 0.3), rgba(38, 173, 197, 0.3)), url("../../../assets/img/bg-login.jpg");
      background-size:cover; */
}

.custom-height {
    height: 100px; /* Sesuaikan dengan tinggi yang diinginkan */
}

select:focus option:checked {
    font-size: 0.875rem; /* text-sm */
}  

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>