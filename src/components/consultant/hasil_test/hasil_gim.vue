<template>
  <section class="bg-gray-100 pb-10"
  :class="{'lg:pb-28' : dataSubmit.length == 0, 'lg:pb-7': dataSubmit.length > 0}"
  >
          <div class="mx-4 pt-4">
              <ol class="flex text-gray-500 font-semibold">
                  <li class="before:px-1.5">
                      <a class="text-dark text-base cursor-default">
                          Beranda
                      </a>
                  </li>
              </ol>
          </div>

          <div v-if="isModalOpen && detailDataSubmit" class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
            >
                <div class="hidden lg:block relative w-1/2 top-4 mx-auto shadow-xl rounded-md bg-white">
                    <!-- Modal body -->
                    <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Detail Hasil Test</h1>
                    <hr class="mt-4">
                    <div v-if="detailDataSubmit" class="w-full p-4 mx-auto max-h-[460px] overflow-y-scroll">
                        <div>
                            <div class="flex flex-col">
                                <h1 class="text-dark text-xl font-myFont font-medium mb-2">Hasil GIM</h1>
                                <div class="mb-2 flex justify-between items-center">
                                    <span class="font-myFont font-medium text-dark text-base">Tipe Kecerdasan</span>
                                    <span class="font-myFont text-base text-dark font-medium">{{ detailDataSubmit.customers_results.gim.name }}</span>
                                </div>
                                <div class="mb-2 flex justify-between items-center">
                                    <span class="font-myFont font-medium text-dark text-base">Tipe</span>
                                    <span class="font-myFont text-base text-dark font-medium">{{ detailDataSubmit.customers_results.gim.type }}</span>
                                </div>
                                <div class="mb-2 flex justify-between items-center">
                                    <span class="font-myFont font-medium text-dark text-base">Otak Dominan</span>
                                    <span class="font-myFont text-base text-dark font-medium">{{ detailDataSubmit.customers_results.gim.dominance_op_system }}</span>
                                </div>
                                <div class="mb-2 flex flex-col">
                                    <span class="mb-2 font-myFont font-medium text-dark text-base">Kata Kunci</span>
                                    <span class="font-myFont text-base text-dark font-medium">{{ detailDataSubmit.customers_results.gim.keyword }}</span>
                                </div>
                            </div>
                            <hr class="my-4">
                            <div class="flex flex-col">
                                <h1 class="text-dark text-xl font-myFont font-medium mb-2">Customer</h1>
                                <div class="mb-2 flex justify-between items-center">
                                    <span class="font-myFont font-medium text-dark text-base">Nama</span>
                                    <span class="font-myFont text-dark text-base font-medium">{{ detailDataSubmit.name }}</span>
                                </div>
                                <div class="mb-2 flex justify-between items-center">
                                    <span class="font-myFont font-medium text-dark text-base">Tempat, Tanggal Lahir</span>
                                    <span class="font-myFont text-dark text-base font-medium">{{ detailDataSubmit.birth_place }}, {{ detailDataSubmit.birth_date }}</span>
                                </div>
                                <div class="mb-2 flex justify-between items-center">
                                    <span class="font-myFont font-medium text-dark text-base">Jenis Kelamin</span>
                                    <span class="font-myFont text-dark text-base font-medium">{{ detailDataSubmit.gender }}</span>
                                </div>
                                <div class="mb-2 flex justify-between items-center">
                                    <span class="font-myFont font-medium text-dark text-base">Golongan Darah</span>
                                    <span class="font-myFont text-dark text-base font-medium">{{ detailDataSubmit.blood_group }}</span>
                                </div>
                                <div class="mb-2 flex justify-between items-center">
                                    <span class="font-myFont font-medium text-dark text-base">No Telp</span>
                                    <span class="font-myFont text-dark text-base font-medium">{{ detailDataSubmit.number }}</span>
                                </div>
                                <div class="mb-2 flex flex-col">
                                    <span class="mb-2 font-myFont font-medium text-dark text-base">Alamat</span>
                                    <span class="font-myFont text-dark text-base font-medium">{{ detailDataSubmit.address }}</span>
                                    <span class="font-myFont text-dark text-base font-medium">{{ detailDataSubmit.region }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="pt-4">
                    <!-- Modal footer -->
                    <div class="px-4 py-2 flex justify-end items-center space-x-4">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" @click="toggleModal">Tutup</button>
                    </div>
                </div>

                <div class="block lg:hidden relative w-full top-1 mx-auto shadow-xl rounded-md bg-white">
                    <!-- Modal body -->
                    <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Detail Reservasi</h1>
                    <hr class="mt-4">
                    <div class="max-h-[460px] overflow-y-scroll flex flex-col justify-center items-center">
                        <div v-if="detailCustomers" class="w-full p-4">
                            <div class="flex flex-row gap-2">
                                <div class="w-full">
                                    <h1 class="text-dark text-lg font-myFont font-medium mt-20 mb-2">Jadwal</h1>
                                    <div class="flex flex-row items-center mb-4">
                                        <div class="w-3/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Jam
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{  }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-2/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Tanggal
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{  }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <hr class="my-4">

                                    <h1 class="text-dark text-lg font-myFont font-medium mb-2">Consultant</h1>
                                    <div class="flex flex-row items-center mb-4">
                                        <div class="w-3/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Nama
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{  }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-2/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Jenis Kelamin
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{  }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-full">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    No Telp
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{  }}
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
                                                    {{  }}
                                                </p>
                                                <!-- <p class="font-myFont font-medium text-dark text-xs">
                                                    {{  }}
                                                </p> -->
                                            </div>
                                        </div>
                                    </div>

                                    <hr class="my-4">

                                    <h1 class="text-dark text-lg font-myFont font-medium mb-2">Customer</h1>
                                    <div class="flex flex-row items-center mb-4">
                                        <div class="w-3/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Nama
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{  }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-2/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Jenis Kelamin
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-full">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    No Telp
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{  }}
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
                                                    {{  }}
                                                </p>
                                                <!-- <p class="font-myFont font-medium text-dark text-xs">
                                                    {{  }}
                                                </p> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="pt-4">
                    <!-- Modal footer -->
                    <div class="px-4 py-2 flex justify-end items-center space-x-4">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" @click="toggleModal">Tutup</button>
                    </div>
                </div>
            </div>

          <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 pb-10 gap-4">
              <div class="w-full px-7 mx-auto">
                  <div class="flex flex-col bg-white w-full p-6 rounded-lg shadow-lg">
                      <h1 class="font-myFont text-dark text-lg mb-4">List Hasil Test Grafologi</h1>
                      <div class="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between mb-3">
                          <div class="flex items-center gap-4">
                            <div class="relative inline-block text-start w-64">
                                <small class="text-dark font-myFont">Kecerdasan</small>
                                <div class="flex items-center gap-1 mt-1">
                                    <button @click="toggleFilter('kecerdasan')" ref="dropdownRefKecerdasan" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-dark shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                    {{ queryParams.gim }}
                                    <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                    </svg>
                                    </button>
                                    <button v-if="isFilterKecerdasan" @click="resetFilter('kecerdasan')" class="text-light p-[2px] bg-danger rounded-md"><PhX/></button>
                                </div>
                                <div v-if="showFilter == 'kecerdasan'" class="absolute left-22 z-10 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                    <div class="py-1 h-48 overflow-auto" role="none">
                                        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                        <a @click="filterKecerdasan('Neokorteks Kiri Introvert')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Neokorteks Kiri Introvert</a>
                                        <a @click="filterKecerdasan('Limbik Kanan Ekstrovert')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Limbik Kanan Ekstrovert</a>
                                        <a @click="filterKecerdasan('Limbik Kiri Introvert')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Limbik Kiri Introvert</a>
                                        <a @click="filterKecerdasan('Limbik Kiri Ekstrovert')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Limbik Kiri Ekstrovert</a>
                                        <a @click="filterKecerdasan('Limbik Kanan Introvert')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Limbik Kanan Introvert</a>
                                        <a @click="filterKecerdasan('Neokorteks Kanan Ekstrovert')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Neokorteks Kanan Ekstrovert</a>
                                        <a @click="filterKecerdasan('Neokorteks Kanan Introvert')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Neokorteks Kanan Introvert</a>
                                        <a @click="filterKecerdasan('Neokorteks Kiri Ekstrovert')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Neokorteks Kiri Ekstrovert</a>
                                        <a @click="filterKecerdasan('Otak Tengah')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Otak Tengah</a>
                                    </div>
                                </div>
                            </div>
                            <div class="relative inline-block text-left w-28">
                                <small class="text-dark font-myFont">Golongan Darah</small>
                                <div class="flex items-center gap-1 mt-1">
                                    <button @click="toggleFilter('goldar')" ref="dropdownRefGoldar" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-dark shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                    {{ queryParams.blood_group }}
                                    <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                    </svg>
                                    </button>
                                    <button v-if="isFilterGoldar" @click="resetFilter('goldar')" class="text-light p-[2px] bg-danger rounded-md"><PhX/></button>
                                </div>
                                <div v-if="showFilter == 'goldar'" class="absolute left-22 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                    <div class="py-1" role="none">
                                        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                        <a @click="filterGoldar('A')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">A</a>
                                        <a @click="filterGoldar('B')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">B</a>
                                        <a @click="filterGoldar('AB')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">AB</a>
                                        <a @click="filterGoldar('O')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">O</a>
                                    </div>
                                </div>
                            </div>
                            <div class="relative inline-block text-left w-28">
                                <small class="text-dark font-myFont">Jenis Kelamin</small>
                                <div class="flex items-center gap-1 mt-1">
                                    <button @click="toggleFilter('gender')" ref="dropdownRefGender" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-dark shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                    {{ queryParams.gender }}
                                    <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                    </svg>
                                    </button>
                                    <button v-if="isFilterGender" @click="resetFilter('gender')" class="text-light p-[2px] bg-danger rounded-md"><PhX/></button>
                                </div>
                                <div v-if="showFilter == 'gender'" class="absolute left-22 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                    <div class="py-1" role="none">
                                        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                        <a @click="filterGender('1')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Laki-laki</a>
                                        <a @click="filterGender('2')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Perempuan</a>
                                    </div>
                                </div>
                            </div>
                            <div class="relative inline-block text-left w-28">
                                <small class="text-dark font-myFont">Pelajar</small>
                                <div class="flex items-center gap-1 mt-1">
                                    <button @click="toggleFilter('is_student')" ref="dropdownRefStudent" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-dark shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                    {{ queryParams.is_student }}
                                    <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                    </svg>
                                    </button>
                                    <button v-if="isFilterStudent" @click="resetFilter('is_student')" class="text-light p-[2px] bg-danger rounded-md"><PhX/></button>
                                </div>
                                <div v-if="showFilter == 'is_student'" class="absolute left-22 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                    <div class="py-1" role="none">
                                        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                        <a @click="filterStudent('1')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Ya</a>
                                        <a @click="filterStudent('0')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Tidak</a>
                                    </div>
                                </div>
                            </div>
                          </div>

                          <input v-model="cari" @input="debouncedGetSearchData()" type="text" name="cari" class="font-myFont rounded-md border border-gray-300 py-2 px-3 -mb-5" placeholder="Cari Data">
                      </div>

                      <div class="flex justify-center w-full" v-if="loading" >
                          <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                      </div>

                      <div v-else-if="dataSubmit.length > 0 && !loading" class="overflow-x-auto">
                          <table class="w-full text-sm text-left text-gray-500">
                              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                              <tr>
                                  <th scope="col" class="py-3 px-6">No</th>
                                  <th scope="col" class="py-3 px-6">Nama Customer</th>
                                  <th scope="col" class="py-3 px-6">Tipe Kecerdasan</th>
                                  <th scope="col" class="py-3 px-6">Tanggal Submit</th>
                                  <th scope="col" class="py-3 px-6">Tanggal Approve</th>
                                  <th scope="col" class="py-3 px-6">Detail</th>
                              </tr>
                              </thead>
                              <tbody>
                                  <tr v-for="(data, index) in dataSubmit" :key="index" class="bg-white border-b">
                                      <td class="py-4 px-6">
                                          {{ (currPage - 1) * itemsPerPage + index + 1 }}
                                      </td>
                                      <td class="py-4 px-6">{{ data.name }}</td>
                                      <td class="py-4 px-6">{{ data.customers_results.gim.name }}</td>
                                      <td class="py-4 px-6">{{ data.customers_results.created_at }}</td>
                                      <td class="py-4 px-6">{{ data.customers_results.updated_at }}</td>
                                      <td class="py-4 px-6">
                                          <button @click="clickDetail(data.id)" class="flex items-center gap-1 px-4 py-2 bg-biru font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                              <PhFileSearch :size="22"/>
                                          </button>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>

                      <span v-else-if="dataSubmit.length == 0 && !loading" class="font-myFont text-center text-dark text-lg mt-7">Data kosong</span>
                      <div class="flex justify-between items-center mt-4">
                          <span class="font-myFont text-xs md:text-sm lg:text-sm text-start lg:text-center text-dark">
                              {{ totalDari == null ? 0 : totalDari }} sampai {{ totalKe == null ? 0 : totalKe }} dari {{ totalData }} data.
                          </span>
                          <a class="flex items-center font-myFont text-dark text-xs lg:text-base">
                              Halaman
                              <div class="mx-2 flex items-center gap-1">
                                  <a @click="prevPages(prevPage)" class="cursor-pointer text-sm md:text-base lg:text-xl text-dark text-opacity-70 hover:text-opacity-100 hover:shadow-sm">
                                      <PhCaretLeft/>
                                  </a>
                                  <span class="px-2 py-1 border rounded-lg">
                                      {{ currPage }}
                                  </span>
                                  <a @click="nextPages(nextPage)" class="cursor-pointer text-sm md:text-base lg:text-xl text-dark text-opacity-70 hover:text-opacity-100 hover:shadow-sm">
                                      <PhCaretRight/>
                                  </a>
                              </div> 
                              Dari {{ totalHalaman }}
                          </a>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  
</template>

<script>
import { PhCaretLeft, PhCaretRight, PhFileSearch, PhX } from '@phosphor-icons/vue';
import { onMounted, ref, onBeforeMount, onBeforeUnmount } from 'vue'
import initAPI from '../../../api/api';
import _debounce from 'lodash/debounce';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default {
  name: 'ReviewTest',
  components: {PhCaretLeft, PhCaretRight, PhFileSearch, PhX},
  setup(){
      const isModalOpen = ref(false)
      const detailDataSubmit = ref(false)

      const loading = ref(false)
      const dataSubmit = ref([])
      const totalHalaman = ref('')
      const itemsPerPage = ref(null)
      const currPage = ref(null)
      const nextPage = ref(null)
      const prevPage = ref(null)
      const totalDari = ref(null)
      const totalKe = ref(null)
      const totalData = ref(null)
      const cari = ref(null)

      const showFilter = ref(null)
      const isFilterKecerdasan = ref(false)
      const isFilterGoldar = ref(false)
      const isFilterGender = ref(false)
      const isFilterStudent = ref(false)

      const queryParams = {
        'search': '',
        'gim': 'All',
        'blood_group': 'All',
        'gender': 'All',
        'is_student': 'All',
        'is_advance': 'All',
        'page': '',
      }

      const resetFilter = (filter) => {
          switch(filter){
            case 'kecerdasan':
              isFilterKecerdasan.value = false
            case 'goldar':
              isFilterGoldar.value = false
            case 'gender':
              isFilterGender.value = false
            case 'is_student':
              isFilterStudent.value = false
          }

          for (const [key, value] of Object.entries(queryParams)) {
              queryParams[key] = 'All'
          }
          getAllData()
      }

      const toggleFilter = (filter) => {
          showFilter.value = filter
      }

      const dropdownRefKecerdasan = ref(null);
      const dropdownRefGoldar = ref(null);
      const dropdownRefGender = ref(null);
      const dropdownRefStudent = ref(null);

      const closeDropdown = (e) => {
        if (dropdownRefKecerdasan.value && dropdownRefKecerdasan.value.contains(e.target)) {
          showFilter.value = 'kecerdasan';
        }else if(dropdownRefKecerdasan.value && dropdownRefGoldar.value.contains(e.target)){
          showFilter.value = 'goldar';
        }else if(dropdownRefGender.value && dropdownRefGender.value.contains(e.target)){
          showFilter.value = 'gender';
        }else if(dropdownRefStudent.value && dropdownRefStudent.value.contains(e.target)){
          showFilter.value = 'is_student';
        }else{
          showFilter.value = null;
        }
      };
      
      onMounted(() => {
          document.body.addEventListener('click', closeDropdown);
      });

      onBeforeUnmount(() => {
          document.body.removeEventListener('click', closeDropdown);
      });

      onBeforeMount(async() => {
          getAllData()
      })

      const getAllData = async() => {
          loading.value = !loading.value
          let allParams = 'is_detected=3'
          console.log(queryParams)
          for (const [key, value] of Object.entries(queryParams)) {
            allParams = value != '' && value != 'All' ? allParams+='&'+key+'='+value : allParams
          }
          console.log(allParams)
          const token = JSON.parse(localStorage.getItem('token'))
          const response = await initAPI('get', 'customers?'+allParams, null, token)
          console.log(response.data)
          dataSubmit.value = response.data.data
          totalHalaman.value = response.data.last_page
          itemsPerPage.value = response.data.per_page
          currPage.value = response.data.current_page
          nextPage.value = response.data.next_page_url
          prevPage.value = response.data.prev_page_url
          totalDari.value = response.data.from
          totalKe.value = response.data.to
          totalData.value = response.data.total
          loading.value = !loading.value
          console.log(`data`,dataSubmit.value)
      }

      const debouncedGetSearchData = _debounce(() => {
        queryParams.search = cari.value !== '' ? cari.value : ''
        getAllData()
      }, 500)

      const filterKecerdasan = async (params) => {
        isFilterKecerdasan.value = true
        queryParams.gim = params
        getAllData()
      }

      const filterGoldar = async (params) => {
        isFilterGoldar.value = true
        queryParams.blood_group = params
        getAllData()
      }

      const filterGender = async (params) => {
        isFilterGender.value = true
        queryParams.gender = params
        getAllData()
      }

      const filterStudent = async (params) => {
        isFilterGender.value = true
        queryParams.is_student = params
        getAllData()
      }

      const nextPages = async(url) => {
          console.log(url)
          if(url !== null && cari.value){
              loading.value = !loading.value
              const token = JSON.parse(localStorage.getItem('token'))
              const response = await initAPI('get', url+'&search='+cari.value, null, token)
              console.log(response.data)
              dataSubmit.value = response.data.data
              totalHalaman.value = response.data.last_page
              itemsPerPage.value = response.data.per_page
              currPage.value = response.data.current_page
              nextPage.value = response.data.next_page_url
              prevPage.value = response.data.prev_page_url
              totalDari.value = response.data.from
              totalKe.value = response.data.to
              totalData.value = response.data.total
              loading.value = !loading.value
              console.log(`data`,dataSubmit.value)
          } else if(url !== null && !cari.value){
              loading.value = !loading.value
              const token = JSON.parse(localStorage.getItem('token'))
              const response = await initAPI('get', url, null, token)
              console.log(response.data)
              dataSubmit.value = response.data.data
              totalHalaman.value = response.data.last_page
              itemsPerPage.value = response.data.per_page
              currPage.value = response.data.current_page
              nextPage.value = response.data.next_page_url
              prevPage.value = response.data.prev_page_url
              totalDari.value = response.data.from
              totalKe.value = response.data.to
              totalData.value = response.data.total
              loading.value = !loading.value
              console.log(`data`,dataSubmit.value)
          }
      }

      const prevPages = async(url) => {
          console.log(url)
          if(url !== null && cari.value){
              loading.value = !loading.value
              const token = JSON.parse(localStorage.getItem('token'))
              const response = await initAPI('get', url+'&search='+cari.value, null, token)
              console.log(response.data)
              dataSubmit.value = response.data.data
              totalHalaman.value = response.data.last_page
              itemsPerPage.value = response.data.per_page
              currPage.value = response.data.current_page
              nextPage.value = response.data.next_page_url
              prevPage.value = response.data.prev_page_url
              totalDari.value = response.data.from
              totalKe.value = response.data.to
              totalData.value = response.data.total
              loading.value = !loading.value
              console.log(`data`,dataSubmit.value)
          } else if(url !== null && !cari.value){
              loading.value = !loading.value
              const token = JSON.parse(localStorage.getItem('token'))
              const response = await initAPI('get', url+'&search='+cari.value, null, token)
              console.log(response.data)
              dataSubmit.value = response.data.data
              totalHalaman.value = response.data.last_page
              itemsPerPage.value = response.data.per_page
              currPage.value = response.data.current_page
              nextPage.value = response.data.next_page_url
              prevPage.value = response.data.prev_page_url
              totalDari.value = response.data.from
              totalKe.value = response.data.to
              totalData.value = response.data.total
              loading.value = !loading.value
              console.log(`data`,dataSubmit.value)
          }
      }

      const clickDetail = (id) => {
            toggleModal()
            const unik = dataSubmit.value.find(item => item.id === id);
            console.log(`unik`,unik)
            detailDataSubmit.value = unik
        }

        const toggleModal = () => {
            isModalOpen.value = !isModalOpen.value
            // if(submitDisabled.value == false) submitDisabled.value = true
        }

      return {
          loading,
          isModalOpen,
          detailDataSubmit,
          dataSubmit,
          totalHalaman,
          itemsPerPage,
          currPage,
          nextPage,
          prevPage,
          totalDari,
          totalKe,
          totalData,
          showFilter,
          isFilterKecerdasan,
          isFilterGoldar,
          isFilterGender,
          isFilterStudent,
          dropdownRefKecerdasan,
          dropdownRefGoldar,
          dropdownRefGender,
          dropdownRefStudent,
          cari,
          queryParams,
          debouncedGetSearchData,
          filterKecerdasan,
          filterGoldar,
          filterGender,
          filterStudent,
          toggleFilter,
          resetFilter,
          nextPages,
          prevPages,
          clickDetail,
          toggleModal
      }
  }
}
</script>