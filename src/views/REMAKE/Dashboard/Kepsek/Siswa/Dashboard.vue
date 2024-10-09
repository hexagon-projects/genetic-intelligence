<template>
  <div v-if="loading" class="preloader-overlay">
    <span
      class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"
    ></span>
  </div>

  <Layout v-if="!loading">
    <section class="bg-[#F6F6F9] py-[66px] px-[20px] md:px-[60px]">
      <div class="flex flex-col gap-[36px]">
        <div class="flex justify-between items-center mb-5">
          <div class="text-[#32324D] font-['Roboto'] leading-loose">
            <div class="text-xl md:text-3xl font-semibold">List Siswa</div>
            <span class="text-gray-500 text-sm">200 entries found</span>
          </div>

          <button
            class="text-white rounded-md py-2 px-3 bg-[#12B76A] font-medium flex items-center gap-3"
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
        <div class="flex flex-wrap justify-between items-center gap-4">
          <div class="flex flex-wrap gap-4">
            <div class="text-[#32324D] font-['Roboto'] leading-loose relative">
              <select
                name="Kelas"
                class="p-1 px-3 pr-10 rounded-lg bg-transparent border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option selected>Kelas</option>
                <option value="#">10</option>
                <option value="#">11</option>
                <option value="#">12</option>
              </select>
              <!-- SVG Icon for Kelas -->
              <svg
                width="8"
                height="4"
                viewBox="0 0 8 4"
                fill="none"
                class="absolute right-3 top-1/2 transform -translate-y-1/2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.5 0.444444C7.5 0.564815 7.45671 0.668981 7.37012 0.756944L4.30762 3.86806C4.22103 3.95602 4.11849 4 4 4C3.88151 4 3.77897 3.95602 3.69238 3.86806L0.629883 0.756944C0.543294 0.668981 0.5 0.564815 0.5 0.444444C0.5 0.324074 0.543294 0.219907 0.629883 0.131944C0.716471 0.0439815 0.81901 0 0.9375 0H7.0625C7.18099 0 7.28353 0.0439815 7.37012 0.131944C7.45671 0.219907 7.5 0.324074 7.5 0.444444Z"
                  fill="#8E8EA9"
                />
              </svg>
            </div>
            <div class="text-[#32324D] font-['Roboto'] leading-loose relative">
              <select
                name="Kelas"
                class="p-1 px-3  pr-10 rounded-lg bg-transparent border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option selected>Kecerdasan Dominan</option>
                <option value="#">10</option>
                <option value="#">11</option>
                <option value="#">12</option>
              </select>
              <!-- SVG Icon for Kelas -->
              <svg
                width="8"
                height="4"
                viewBox="0 0 8 4"
                fill="none"
                class="absolute right-3 top-1/2 transform -translate-y-1/2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.5 0.444444C7.5 0.564815 7.45671 0.668981 7.37012 0.756944L4.30762 3.86806C4.22103 3.95602 4.11849 4 4 4C3.88151 4 3.77897 3.95602 3.69238 3.86806L0.629883 0.756944C0.543294 0.668981 0.5 0.564815 0.5 0.444444C0.5 0.324074 0.543294 0.219907 0.629883 0.131944C0.716471 0.0439815 0.81901 0 0.9375 0H7.0625C7.18099 0 7.28353 0.0439815 7.37012 0.131944C7.45671 0.219907 7.5 0.324074 7.5 0.444444Z"
                  fill="#8E8EA9"
                />
              </svg>
            </div>
            <div class="text-[#32324D] font-['Roboto'] leading-loose relative">
              <select
                name="Kelas"
                class="p-1 px-3 pr-10 rounded-lg bg-transparent border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option selected>Gaya Belajar</option>
                <option value="#">10</option>
                <option value="#">11</option>
                <option value="#">12</option>
              </select>
              <!-- SVG Icon for Kelas -->
              <svg
                width="8"
                height="4"
                viewBox="0 0 8 4"
                fill="none"
                class="absolute right-3 top-1/2 transform -translate-y-1/2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.5 0.444444C7.5 0.564815 7.45671 0.668981 7.37012 0.756944L4.30762 3.86806C4.22103 3.95602 4.11849 4 4 4C3.88151 4 3.77897 3.95602 3.69238 3.86806L0.629883 0.756944C0.543294 0.668981 0.5 0.564815 0.5 0.444444C0.5 0.324074 0.543294 0.219907 0.629883 0.131944C0.716471 0.0439815 0.81901 0 0.9375 0H7.0625C7.18099 0 7.28353 0.0439815 7.37012 0.131944C7.45671 0.219907 7.5 0.324074 7.5 0.444444Z"
                  fill="#8E8EA9"
                />
              </svg>
            </div>
            <div class="text-[#32324D] font-['Roboto'] leading-loose relative">
              <select
                name="Kelas"
                class="p-1 px-3 pr-10 rounded-lg bg-transparent border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option selected>Grade IQ</option>
                <option value="#">10</option>
                <option value="#">11</option>
                <option value="#">12</option>
              </select>
              <!-- SVG Icon for Kelas -->
              <svg
                width="8"
                height="4"
                viewBox="0 0 8 4"
                fill="none"
                class="absolute right-3 top-1/2 transform -translate-y-1/2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.5 0.444444C7.5 0.564815 7.45671 0.668981 7.37012 0.756944L4.30762 3.86806C4.22103 3.95602 4.11849 4 4 4C3.88151 4 3.77897 3.95602 3.69238 3.86806L0.629883 0.756944C0.543294 0.668981 0.5 0.564815 0.5 0.444444C0.5 0.324074 0.543294 0.219907 0.629883 0.131944C0.716471 0.0439815 0.81901 0 0.9375 0H7.0625C7.18099 0 7.28353 0.0439815 7.37012 0.131944C7.45671 0.219907 7.5 0.324074 7.5 0.444444Z"
                  fill="#8E8EA9"
                />
              </svg>
            </div>
            <!-- Repeat the structure for other select elements -->
          </div>
          <div class="flex gap-4">
            <div class="text-[#32324D] font-['Roboto'] leading-loose relative">
              <select
                name="Sort By"
                class="p-1 px-3 pr-10 rounded-lg bg-transparent border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option selected>Sort By</option>
                <option value="#">A-Z</option>
                <option value="#">Z-A</option>
              </select>
              <!-- SVG Icon for Sort By -->
              <svg
                width="8"
                height="4"
                viewBox="0 0 8 4"
                fill="none"
                class="absolute right-3 top-1/2 transform -translate-y-1/2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.5 0.444444C7.5 0.564815 7.45671 0.668981 7.37012 0.756944L4.30762 3.86806C4.22103 3.95602 4.11849 4 4 4C3.88151 4 3.77897 3.95602 3.69238 3.86806L0.629883 0.756944C0.543294 0.668981 0.5 0.564815 0.5 0.444444C0.5 0.324074 0.543294 0.219907 0.629883 0.131944C0.716471 0.0439815 0.81901 0 0.9375 0H7.0625C7.18099 0 7.28353 0.0439815 7.37012 0.131944C7.45671 0.219907 7.5 0.324074 7.5 0.444444Z"
                  fill="#8E8EA9"
                />
              </svg>
            </div>
            <div class="text-[#32324D] font-['Roboto'] leading-loose fles fles-row">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.92188 8.40146L7.71354 6.16506C8.07292 5.53762 8.26042 4.83989 8.26042 4.13694C8.26042 1.85629 6.40625 0 4.13021 0C1.85417 0 0 1.85629 0 4.13694C0 6.4176 1.85417 8.27389 4.13021 8.27389C4.85677 8.27389 5.57552 8.07342 6.21615 7.69071L8.41406 9.91929C8.46354 9.96876 8.53385 10 8.60417 10C8.67448 10 8.74479 9.97136 8.79427 9.91929L9.92188 8.77896C10.026 8.67222 10.026 8.5056 9.92188 8.40146ZM4.12972 1.61133C5.52034 1.61133 6.65055 2.74385 6.65055 4.13671C6.65055 5.52958 5.52034 6.6621 4.12972 6.6621C2.7391 6.6621 1.60889 5.52958 1.60889 4.13671C1.60889 2.74385 2.7391 1.61133 4.12972 1.61133Z" fill="#8E8EA9"/>
</svg>

              <input
                type="search"
                placeholder="Search for an entry"
                class="p-1 px-3 rounded-lg bg-transparent border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Overview Data Siswa -->
       <div class="space-y-4">
         <div
           class="bg-transparent border border-gray-300 p-4 flex flex-col rounded-xl"
         >
           <div class="flex justify-between items-center mb-5"></div>
   
           <div class="overflow-auto w-full">
             <table
               class="w-full border-separate border-spacing-0 text-left text-gray-500 text-sm font-['Roboto'] leading-normal"
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
   
               <tbody v-for="(item, index) in arrListScore">
                 <tr class="border-b">
                   <td class="py-3 px-4 flex items-center gap-2">
                     <img
                       src="../karina.jpg"
                       alt="Eka"
                       class="w-8 h-8 rounded-full mr-2"
                     />
                     {{ item.nama }}
                   </td>
                   <td class="py-3 px-4">{{ item.kelas }}</td>
                   <td class="py-3 px-4">{{ item.sekolah }}</td>
                   <td class="py-3 px-4">{{ item.t_tes }}</td>
                   <td class="py-3 px-4">{{ item.total_tes }}</td>
                   <td class="py-3 px-4">
                     <button
                       class="bg-[#3030F8] text-white px-4 py-2 rounded flex items-center gap-2"
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
         <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="text-[#32324D] font-['Roboto'] leading-loose relative">
              <select
                name="Kelas"
                class="p-1 px-3 pr-10 rounded-lg bg-transparent border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="20" selected>20</option>
                <option value="10">10</option>
                <option value="5">5</option>
              </select>
              <!-- SVG Icon for Kelas -->
              <svg
                width="8"
                height="4"
                viewBox="0 0 8 4"
                fill="none"
                class="absolute right-3 top-1/2 transform -translate-y-1/2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.5 0.444444C7.5 0.564815 7.45671 0.668981 7.37012 0.756944L4.30762 3.86806C4.22103 3.95602 4.11849 4 4 4C3.88151 4 3.77897 3.95602 3.69238 3.86806L0.629883 0.756944C0.543294 0.668981 0.5 0.564815 0.5 0.444444C0.5 0.324074 0.543294 0.219907 0.629883 0.131944C0.716471 0.0439815 0.81901 0 0.9375 0H7.0625C7.18099 0 7.28353 0.0439815 7.37012 0.131944C7.45671 0.219907 7.5 0.324074 7.5 0.444444Z"
                  fill="#8E8EA9"
                />
              </svg>
            </div>
            <p>Entries per page.</p>
          </div>

          <div class="flex gap-2">
            <button>&lt;</button>
              <button class="py-1 px-3 hover:text-[#271FE0]" :class="{'rounded-md shadow-md bg-white' : true}">1</button>
              <button class="py-1 px-3 hover:text-[#271FE0]" :class="{'rounded-md shadow-md bg-white' : false}">2</button>
              <button class="py-1 px-3 hover:text-[#271FE0]" :class="{'rounded-md shadow-md bg-white' : false}">3</button>
              <button class="py-1 px-3 hover:text-[#271FE0]" :class="{'rounded-md shadow-md bg-white' : false}">...</button>
              <button class="py-1 px-3 hover:text-[#271FE0]" :class="{'rounded-md shadow-md bg-white' : false}">10</button>
            <button>></button>
          </div>
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

const arrListScore = ref([
  { img: "karina.jpg", nama: "Eka", kelas: "12 RPL 1", sekolah: "SMKN 1 CIANJUR", t_tes:"22 Mar 2024", total_tes: 1},
  { img: "karina.jpg", nama: "Eka", kelas: "12 RPL 1", sekolah: "SMKN 1 CIANJUR", t_tes:"22 Mar 2024", total_tes: 1},
  { img: "karina.jpg", nama: "Eka", kelas: "12 RPL 1", sekolah: "SMKN 1 CIANJUR", t_tes:"22 Mar 2024", total_tes: 1},
  { img: "karina.jpg", nama: "Eka", kelas: "12 RPL 1", sekolah: "SMKN 1 CIANJUR", t_tes:"22 Mar 2024", total_tes: 1},
  { img: "karina.jpg", nama: "Eka", kelas: "12 RPL 1", sekolah: "SMKN 1 CIANJUR", t_tes:"22 Mar 2024", total_tes: 1},
  { img: "karina.jpg", nama: "Eka", kelas: "12 RPL 1", sekolah: "SMKN 1 CIANJUR", t_tes:"22 Mar 2024", total_tes: 1},
]);
</script>
