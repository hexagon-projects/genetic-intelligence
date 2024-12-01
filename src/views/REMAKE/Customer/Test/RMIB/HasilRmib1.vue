<template>
    <!-- <div v-if="loading" class="preloader-overlay">
        <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div> -->

    <div>
        <Layout>
            <!-- Breadcrumb -->
            <div class="mx-0 lg:mx-[40px] mb-3 h-5 p-7 justify-center items-center gap-2 inline-flex">
                <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Beranda</div>
                <div class="w-4 h-4 relative opacity-75">
                    <img src="@/assets/img/chevron_forward.svg">
                </div>
                <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Hasil Tes</div>
                <div class="w-4 h-4 relative opacity-75">
                    <img src="@/assets/img/chevron_forward.svg">
                </div>
                <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Test RMIB</div>
            </div>
        
            <section class="mx-0 lg:mx-[40px] bg-white pb-20">
                <!-- <BelumTest v-if="!sudahTest"/> -->
                
                <div class="flex flex-col md:flex-row p-6 bg-white rounded-lg">
                    <div class="flex-1">
                    <h1 class="text-2xl font-bold">Hasil Tes RMIB</h1>
                    <p class="mt-2 text-gray-600">
                        Tes Rothwell-Miller Interest Blank (RMIB), merupakan test yang bertujuan untuk
                        mengidentifikasi minat kamu terhadap berbagai jenis pekerjaan. Berikut Hasil dari
                        test yang telah kamu lakukan:
                    </p>
                    <div class="mt-4">
                        <h2 class="font-semibold">Identitas</h2>
                        <p>Nama : John Doe</p>
                        <p>Gender : Laki - laki</p>
                        <p>Tanggal lahir : 04-04-2016</p>
                        <p>Tanggal tes : 27-08-2024</p>
                        <p>Usia : 8 Tahun 4 bulan 22 hari</p>
                        <p>Durasi Pengerjaan : 10:45</p>
                    </div>
                    <div class="mt-4 mb-5"> <!-- Added margin-bottom for spacing -->
                        <h2 class="font-semibold mb-2">Kata Kunci</h2> <!-- Added margin-bottom to the heading -->
                        <div class="flex space-x-2">
                            <button class="bg-[#3030f8] text-white px-3 py-2 rounded-lg">Outdoor (OUT)</button>
                            <button class="bg-[#3030f8] text-white px-4 py-2 rounded-lg">Medical (ME)</button>
                            <button class="bg-[#3030f8] text-white px-4 py-2 rounded-lg">Computational (COMP)</button>
                        </div>
                    </div>
                    </div>
                    <div class="flex-1 flex justify-center items-center">
                    <img src="./img/19962851_6203998 2.svg" alt="Illustration" class="w-1/2" />
                    </div>
                </div>
                <div class="mt-4 mb-5"> 
                    <h1 class="text-2xl font-bold mx-0 lg:mx-[20px]">Detail Hasil Test</h1> 
                </div>
                <div class="flex flex-wrap w-full lg:w-[100%] mx-0 lg:mx-[20px] gap-6"> 
                    <div class="px-6 py-2 bg-white rounded-lg border border-[#667084] flex-col justify-start items-center gap-3 inline-flex mb-5 w-full lg:w-[30%]"> <!-- Added width for responsiveness -->
                        <div class="w-full rounded-2xl py-5 flex items-center justify-center">
                            <div class="flex items-center">
                                <div class="w-8 h-8 relative mr-2">
                                    <img src="./img/Grade(1).svg" alt="Outdoor Icon" />
                                </div>
                                <div class="text-[#3030f8] text-xl font-medium font-roboto leading-9">
                                    Outdoor (OUT): Skor [Skor Klien]
                                </div>
                            </div>
                        </div>
                        <hr class="border-t border-[#667084] w-full mb-3"> 
                        <div class="flex items-start gap-3 w-full">
                            <div class="w-6 h-6 relative">
                                <img src="./img/ReadCvLogo.svg" alt="Detail Icon" />
                            </div>
                            <div class="text-[#3030f8] text-sm font-medium font-roboto leading-tight">
                                <strong>Interpretasi</strong>
                                <p class="text-[#667084] text-sm font-normal">Klien menunjukkan minat yang rendah/sedang/tinggi terhadap pekerjaan yang melibatkan aktivitas di luar ruangan. Ini berarti klien cenderung menikmati bekerja di lingkungan yang dinamis, di luar kantor, dan senang berpindah dari satu lokasi ke lokasi lain.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 w-full">
                            <div class="w-6 h-6 relative">
                                <img src="./img/IdentificationBadge.svg" alt="Detail Icon" />
                            </div>
                            <div class="text-[#3030f8] text-sm font-medium font-roboto leading-tight">
                                <strong>Contoh Pekerjaan</strong>
                                <p class="text-[#667084] text-sm font-normal">Surveyor lapangan, pemandu wisata, insinyur lapangan.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 w-full">
                            <div class="w-6 h-6 relative">
                                <img src="./img/Mailbox.svg" alt="Detail Icon" />
                            </div>
                            <div class="text-[#3030f8] text-sm font-medium font-roboto leading-tight">
                                <strong>Saran</strong>
                                <p class="text-[#667084] text-sm font-normal">Klien sebaiknya mencari peluang kerja yang menawarkan mobilitas tinggi, seperti posisi yang memungkinkan perjalanan atau pekerjaan di lingkungan alam terbuka.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Mechanical Section -->
                    <div class="px-5 py-2 bg-white rounded-lg border border-[#667084] flex-col justify-start items-center gap-3 inline-flex mb-5 w-full lg:w-[30%]"> <!-- Added width for responsiveness -->
                        <div class="w-full rounded-2xl py-5 flex items-center justify-center">
                            <div class="flex items-center">
                                <div class="w-8 h-8 relative mr-2">
                                    <img src="./img/Grade (2).svg" alt="Mechanical Icon" />
                                </div>
                                <div class="text-[#3030f8] text-xl font-medium font-roboto leading-9">
                                    Mechanical (ME): Skor [Skor Klien]
                                </div>
                            </div>
                        </div>
                        <hr class="border-t border-[#667084] w-full mb-3"> 
                        <div class="flex items-start gap-3 w-full">
                            <div class="w-6 h-6 relative">
                                <img src="./img/ReadCvLogo.svg" alt="Detail Icon" />
                            </div>
                            <div class="text-[#3030f8] text-sm font-medium font-roboto leading-tight">
                                <strong>Interpretasi</strong>
                                <p class="text-[#667084] text-sm font-normal">Klien menunjukkan minat yang rendah/sedang/tinggi terhadap pekerjaan yang melibatkan aktivitas di luar ruangan. Ini berarti klien cenderung menikmati bekerja di lingkungan yang dinamis, di luar kantor, dan senang berpindah dari satu lokasi ke lokasi lain.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 w-full">
                            <div class="w-6 h-6 relative">
                                <img src="./img/IdentificationBadge.svg" alt="Detail Icon" />
                            </div>
                            <div class="text-[#3030f8] text-sm font-medium font-roboto leading-tight">
                                <strong>Contoh Pekerjaan</strong>
                                <p class="text-[#667084] text-sm font-normal">Surveyor lapangan, pemandu wisata, insinyur lapangan.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 w-full">
                            <div class="w-6 h-6 relative">
                                <img src="./img/Mailbox.svg" alt="Detail Icon" />
                            </div>
                            <div class="text-[#3030f8] text-sm font-medium font-roboto leading-tight">
                                <strong>Saran</strong>
                                <p class="text-[#667084] text-sm font-normal">Klien sebaiknya mencari peluang kerja yang menawarkan mobilitas tinggi, seperti posisi yang memungkinkan perjalanan atau pekerjaan di lingkungan alam terbuka.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Computational Section -->
                    <div class="px-5 py-2 bg-white rounded-lg border border-[#667084] flex-col justify-start items-center gap-3 inline-flex mb-5 w-full lg:w-[30%]"> <!-- Added width for responsiveness -->
                        <div class="w-full rounded-2xl py-5 flex items-center justify-center">
                            <div class="flex items-center">
                                <div class="w-8 h-8 relative mr-2">
                                    <img src="./img/Grade (3).svg" alt="Computational Icon" />
                                </div>
                                <div class="text-[#3030f8] text-xl font-medium font-roboto leading-9">
                                    Computational (COMP): Skor
                                </div>
                            </div>
                        </div>
                        <hr class="border-t border-[#667084] w-full mb-3"> 
                        <div class="flex items-start gap-3 w-full">
                            <div class="w-6 h-6 relative">
                                <img src="./img/ReadCvLogo.svg" alt="Detail Icon" />
                            </div>
                            <div class="text-[#3030f8] text-sm font-medium font-roboto leading-tight">
                                <strong>Interpretasi</strong>
                                <p class="text-[#667084] text-sm font-normal">Klien menunjukkan minat yang rendah/sedang/tinggi terhadap pekerjaan yang melibatkan aktivitas di luar ruangan. Ini berarti klien cenderung menikmati bekerja di lingkungan yang dinamis, di luar kantor, dan senang berpindah dari satu lokasi ke lokasi lain.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 w-full">
                            <div class="w-6 h-6 relative">
                                <img src="./img/IdentificationBadge.svg" alt="Detail Icon" />
                            </div>
                            <div class="text-[#3030f8] text-sm font-medium font-roboto leading-tight">
                                <strong>Contoh Pekerjaan</strong>
                                <p class="text-[#667084] text-sm font-normal">Surveyor lapangan, pemandu wisata, insinyur lapangan.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 w-full">
                            <div class="w-6 h-6 relative">
                                <img src="./img/Mailbox.svg" alt="Detail Icon" />
                            </div>
                            <div class="text-[#3030f8] text-sm font-medium font-roboto leading-tight">
                                <strong>Saran</strong>
                                <p class="text-[#667084] text-sm font-normal">Klien sebaiknya mencari peluang kerja yang menawarkan mobilitas tinggi, seperti posisi yang memungkinkan perjalanan atau pekerjaan di lingkungan alam terbuka.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    </div>
</template>

<script setup>
import Layout from '@/Layout/Customer/Layout.vue';
</script>

<style scoped>
.preloader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 100%;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease, height 0.5s ease;
}
.preloader-overlay.hidden {
    opacity: 0;
    height: 0;
    overflow: hidden;
}
</style>