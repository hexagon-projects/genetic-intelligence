<template>
  <div v-if="loading" class="preloader-overlay">
    <span
      class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"
    ></span>
  </div>

  <Layout v-if="!loading">
    <section class="bg-[#F6F6F9] py-[66px] px-[20px] md:px-[60px]">
      <div class="flex flex-col gap-[36px]">
        <div class="flex justify-between items-center mb-5 px-4">
          <div class="text-[#0c141c] font-['Roboto'] leading-loose">
            <div class="text-xl md:text-3xl font-semibold">Overview Data Siswa</div>
            <span class="text-gray-500 text-sm">200 entries found</span>
          </div>

          <button
            class="text-white rounded-md py-2 px-3 bg-green-400 font-medium flex items-center gap-3"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 7.5V9.5C10.5 9.76522 10.3946 10.0196 10.2071 10.2071C10.0196 10.3946 9.76522 10.5 9.5 10.5H2.5C2.23478 10.5 1.98043 10.3946 1.79289 10.2071C1.60536 10.0196 1.5 9.76522 1.5 9.5V7.5M3.5 5L6 7.5M6 7.5L8.5 5M6 7.5V1.5"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            Export Data
          </button>
        </div>
      </div>

      <div class="flex flex-col mb-3">
        <div class="flex">
          <div class="text-[#0c141c] font-['Roboto'] leading-loose">
            <select name="Kelas" id="" class="p-3 rounded-md bg-transparent border border-gray-400">
              <option selected>Kelas</option>
              <option value="#">10</option>
              <option value="#">11</option>
              <option value="#">12</option>
            </select>
          </div>
          <div class="text-[#0c141c] font-['Roboto'] leading-loose">
            <select name="Kelas" id="" class="p-3 rounded-md bg-transparent border border-gray-400">
              <option selected>Kelas</option>
              <option value="#">10</option>
              <option value="#">11</option>
              <option value="#">12</option>
            </select>
          </div>
          <div class="text-[#0c141c] font-['Roboto'] leading-loose">
            <select name="Kelas" id="" class="p-3 rounded-md bg-transparent border border-gray-400">
              <option selected>Kelas</option>
              <option value="#">10</option>
              <option value="#">11</option>
              <option value="#">12</option>
            </select>
          </div>
          <div class="text-[#0c141c] font-['Roboto'] leading-loose">
            <select name="Kelas" id="" class="p-3 rounded-md bg-transparent border border-gray-400">
              <option selected>Kelas</option>
              <option value="#">10</option>
              <option value="#">11</option>
              <option value="#">12</option>
            </select>
          </div>
            <div class="text-xl md:text-3xl font-semibold">Overview Data Siswa</div>
        </div>
      </div>

      <!-- Overview Data Siswa -->
      <div class="bg-white p-4 flex flex-col rounded-xl">
        <div class="flex justify-between items-center mb-5 px-4"></div>

        <div class="overflow-auto w-full">
          <table
            class="w-full border-separate border-spacing-0 text-left text-[#0c141c] text-sm font-['Roboto'] leading-normal"
          >
            <thead class="text-[#344053]">
              <tr>
                <th class="py-3 px-4">PROFIL</th>
                <th class="py-3 px-4">KELAS</th>
                <th class="py-3 px-4">NAMA SEKOLAH</th>
                <th class="py-3 px-4">TERAKHIR TES</th>
                <th class="py-3 px-4">TOTAL TES</th>
                <th class="py-3 px-4">AKSI</th>
              </tr>
            </thead>

            <tbody>
              <tr class="border-b">
                <td class="py-3 px-4 flex items-center gap-2">
                  <img src="../karina.jpg" alt="Eka" class="w-8 h-8 rounded-full mr-2" />
                  Eka
                </td>
                <td class="py-3 px-4">10 rpl 1</td>
                <td class="py-3 px-4">SMKN 1 Cianjur</td>
                <td class="py-3 px-4">22 MAR, 2024</td>
                <td class="py-3 px-4">1</td>
                <td class="py-3 px-4">
                  <button
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
                  >
                    Lihat Detail
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.66669 8.33335L8.33335 1.66669M8.33335 1.66669H1.66669M8.33335 1.66669V8.33335"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script setup>
import Layout from "@/Layout/Kepsek/Layout.vue";
import initAPI from "../../../../../api/api";
import Cookies from "js-cookie";
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar, Pie, Doughnut } from "vue-chartjs";
</script>
