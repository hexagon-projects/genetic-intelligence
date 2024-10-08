<template>
    <div class="w-full h-auto flex justify-center pt-2 pb-28">
        <div class="mx-[30px] md:mx-[60px] w-[872px] h-auto p-9 bg-white rounded-3xl shadow flex-col justify-center items-center gap-6 inline-flex">
            <div class="w-full flex flex-col lg:flex-row md:justify-between items-center">
                <span class="text-black text-lg md:text-xl lg:text-2xl font-medium font-['Roboto'] leading-loose">Jawablah Pertanyaan Dibawah Ini</span>
            </div>
    
            <!-- Soal --> 
            <div class="self-start w-full">
                <div class="flex flex-col mb-[50px]">
                    <div class="text-black text-base font-normal font-['Roboto'] leading-normal text-justify">
                        <span class="w-full text-black text-sm md:text-base font-normal font-['Roboto'] leading-normal">
                            Tuliskan di bawah ini tiga (3) macam pekerjaan yang paling ingin Kamu lakukan atau paling Kamu sukai (tidak harus pekerjaan yang tercantum dalam daftar yang sebelumnya ada)
                        </span>
                    </div>
                </div>
    
                <div class="w-full flex flex-col gap-5">
                    <div class="flex items-center">
                        <span class="text-black text-base font-normal">1.</span>
                        <input v-model="answers[0]" type="text" class="w-full p-2 border rounded-md border-[#3030f8] text-[#667084] outline-none ml-2" placeholder="Masukkan pekerjaan yang paling Anda sukai" />
                    </div>
                    <div class="flex items-center">
                        <span class="text-black text-base font-normal">2.</span>
                        <input v-model="answers[1]" type="text" class="w-full p-2 border rounded-md border-[#3030f8] text-[#667084] outline-none ml-2" placeholder="Masukkan pekerjaan yang paling Anda sukai" />
                    </div>
                    <div class="flex items-center">
                        <span class="text-black text-base font-normal">3.</span>
                        <input v-model="answers[2]" type="text" class="w-full p-2 border rounded-md border-[#3030f8] text-[#667084] outline-none ml-2" placeholder="Masukkan pekerjaan yang paling Anda sukai" />
                    </div>
                </div>
            </div>
    
            <div class="flex flex-col items-center gap-[24px]">
                <button @click="submitAnswers" class="hover:shadow-2xl hover:translate-x-1 transition-all h-11 pl-6 pr-4 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
                    <div class="text-white text-base font-normal font-['Roboto'] leading-normal">Kirim Jawaban</div>
                    <div class="w-6 h-6 relative">
                        <img src="@/assets/icons/test_gim/chevron_right.svg" alt="icon"/>
                    </div>
                </button>
            </div>
        </div>
    </div>
    </template>
    
    <script setup>
    import { ref } from 'vue';
    import Swal from 'sweetalert2';
    
    // Reactive state untuk jawaban
    const answers = ref(['', '', '']); // Inisialisasi dengan tiga input kosong
    
    // Fungsi untuk mengirim jawaban
    const submitAnswers = () => {
        // Validasi semua jawaban
        if (answers.value.some(answer => answer.trim() === '')) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Semua field harus diisi!',
                showConfirmButton: true,
            });
            return;
        }
    
        // Simpan jawaban ke Local Storage
        localStorage.setItem('essayAnswers', JSON.stringify(answers.value));
    
        Swal.fire({
            icon: 'success',
            title: 'Sukses',
            text: 'Jawaban Anda telah disimpan!',
            showConfirmButton: true,
        });
        
        // Reset jawaban
        answers.value = ['', '', '']; // Kosongkan input setelah pengiriman
    };
    </script>