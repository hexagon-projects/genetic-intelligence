<template>
  <section class="py-[57px] bg-white">
    <div class="mx-[60px] flex justify-center items-start gap-[32px]">
      <!-- Card Selamat Datang -->
      <div class="shadow-md w-[800px] h-[425px] relative bg-[#3030f8] rounded-3xl flex flex-col justify-between">
          <!-- Logo JD -->
          <div class="absolute -right-5 bottom-2 opacity-50">
            <img class="w-[278px] h-[390px]" src="@/assets/img/logo-card-dashboard.svg">
          </div>
          <!-- End Logo JD -->
  
          <div class="mx-[24px] my-[32px] flex flex-col h-full">
            <div class="flex flex-col gap-[8px]">
              <span class="text-white font-sora font-medium leading-normal text-base">Selamat Datang!</span>
              <h1 class="text-3xl font-sora font-semibold leading-9 text-white">
                Aditya Darussalam
              </h1>
            </div>
  
            <div class="relative self-end mt-auto bg-white w-[750px] rounded-b-3xl rounded-tr-3xl">
              <!-- temukan potensi -->
              <div class="absolute pt-[21px] -top-16 pb-[18px] rounded-t-3xl w-[578px] bg-white">
                <h1 class="mx-[33px] text-2xl font-bold">
                  Temukan Potensimu:
                </h1>
              </div>
  
              <div class="absolute rounded-bl-2xl -right-4 -top-[80px] p-4">
                <!-- Inverted Radius -->
                <div class="absolute bg-transparent pemisah bottom-0 -left-[2px]"></div>
                <!-- End Inverted Radius -->
  
                <button class="bg-white w-[154px] rounded-3xl p-2 flex justify-center items-center">
                  <a class="text-[#3030f8] text-base font-normal font-roboto flex items-center gap-[12px]">
                  Lihat Hasil
                    <div class="w-[32px] h-[32px] flex items-center justify-center bg-[#3030f8] rounded-[50%]">
                      <img src="@/assets/icons/arrow-go.svg" alt="go">
                    </div>
                  </a>
                </button>
              </div>
  
              <!-- type dan otak dominan -->
              <div class="w-[684px] h-[96px] mx-[33px] mb-[21px] flex items-center">
                <div class="w-[296px] flex items-center border-r-2">
                  <div class="flex items-center gap-[24px] p-[24px]">
                    <img src="https://placehold.co/32x32" class="rounded-[50%]">
                  <div class="flex flex-col">
                    <span class="text-base">Siapakah Dirimu?</span>
                    <span class="text-sm">Sang pelaksana (Cermat)</span>
                  </div>
                  </div>
                </div>
  
                <div class="w-[388px] h-[96px] flex items-center">
                  <div class="pl-11 flex items-center gap-[24px] p-[24px]">
                    <img src="https://placehold.co/32x32" class="rounded-[50%]">
                    <div class="flex flex-col">
                      <span class="text-base">Sistem Operasi Kecerdasan Dominan:</span>
                      <span class="text-sm">Sang pelaksana (Cermat)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>

      <!-- Card Identitas -->
      <div class="w-96 h-[408px] flex-col justify-start items-start inline-flex">
        <div class="self-stretch px-9 py-4 bg-[#3030f8] rounded-tl-3xl rounded-tr-3xl justify-center items-center gap-2.5 inline-flex">
            <div class="grow shrink basis-0 text-white text-2xl font-medium font-['Roboto'] leading-loose">Identitas</div>
            <div class="w-6 h-6 relative">
              <img src="@/assets/icons/Edit.svg" alt="edit">
            </div>
        </div>
        <div class="self-stretch p-6 bg-white rounded-bl-3xl rounded-br-3xl shadow-md justify-start items-start gap-4 inline-flex">
            <div class="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
                <div class="justify-center items-center gap-4 inline-flex">
                    <img class="w-14 h-14 rounded-full" src="https://via.placeholder.com/56x56" />
                    <div class="w-[217px] flex-col justify-start items-start gap-2 inline-flex">
                        <div class="self-stretch text-[#0b0b79] text-lg font-medium font-['Roboto'] leading-7">Aditya Darussalam</div>
                        <div class="text-center text-[#667084] text-sm font-normal font-['Roboto'] leading-tight">adityadarussalam@gmail.com</div>
                    </div>
                </div>
                <div class="self-stretch h-16 px-4 py-1 rounded-2xl border border-[#667084] flex-col justify-center items-start gap-1 flex">
                    <div class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Alamat</div>
                    <div class="text-center text-[#0b0b79] text-lg font-normal font-['Roboto'] leading-7">Bandung</div>
                </div>
                <div class="self-stretch h-16 px-4 py-1 rounded-2xl border border-[#667084] flex-col justify-center items-start gap-1 flex">
                    <div class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Tanggal Lahir</div>
                    <div class="text-center text-[#0b0b79] text-lg font-normal font-['Roboto'] leading-7">13-01-1986</div>
                </div>
                <div class="self-stretch h-16 px-4 py-1 rounded-2xl border border-[#667084] flex-col justify-center items-start gap-1 flex">
                    <div class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Gender</div>
                    <div class="text-center text-[#0b0b79] text-lg font-normal font-['Roboto'] leading-7">Laki - laki</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Progres Tes -->
  <section class="bg-[#F0F7FD] py-[67px]">
    <div class="flex flex-col gap-[16px] items-center mb-[56px]">
      <div class="bg-[#D6D6FE] rounded-3xl flex justify-center items-center w-[122px] h-[32px]">
        <span class="font-roboto font-medium text-[#3030F8]">Lakukan Tes</span>
      </div>

      <h1 class="text-[#0B0B79] font-semibold text-3xl font-sora">Progres Tes</h1>

      <h3 class="text-[#667085] font-normal text-base font-sora">
        Berikut tahapan proses dalam menggunakan Jatidiri.app untuk memahami diri melalui berbagai tes:
      </h3>
    </div>

    <div class="bg-white mx-[60px] px-[24px] py-[32px] rounded-xl">
      <div class="flex flex-col items-center">
        <img src="@/assets/img/Steper.svg">

        <div class="mx-10 h-[196px] justify-start items-start gap-7 inline-flex">
          <div class="grow shrink basis-0 flex-col justify-center items-center gap-6 inline-flex">
              <div class="px-4 justify-center items-center inline-flex">
                  <div class="text-center text-black text-2xl font-medium font-['Roboto'] leading-loose">Test GIM</div>
              </div>
              <div class="self-stretch text-center text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Tes kepribadian untuk menemukan karakter, kekuatan, kelemahan, minat, potensi, serta pilihan karir kamu.</div>
              <div class="self-stretch text-center text-[#3030f8] text-base font-normal font-['Roboto'] leading-normal">Status : Selesai</div>
          </div>
          <div class="grow shrink basis-0 flex-col justify-center items-center gap-6 inline-flex">
              <div class="px-4 justify-center items-center inline-flex">
                  <div class="text-center text-black text-2xl font-medium font-['Roboto'] leading-loose">Test Assesment</div>
              </div>
              <div class="self-stretch text-center text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Tes instrumen untuk mengetahui gaya belajar kamu agar guru dapat membuat metode pembelajaran yang sesuai dan efektif.</div>
              <div class="self-stretch text-center text-[#3030f8] text-base font-normal font-['Roboto'] leading-normal">Status : Selesai</div>
          </div>
          <div class="grow shrink basis-0 flex-col justify-center items-center gap-6 inline-flex">
              <div class="px-4 justify-center items-center inline-flex">
                  <div class="text-center text-black text-2xl font-medium font-['Roboto'] leading-loose">Test IQ</div>
              </div>
              <div class="self-stretch text-center text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Tes instrumen untuk mengetahui skor IQ kamu dengan cepat dan akurat, memberikan gambaran jelas tentang kemampuan kognitifmu.</div>
              <div class="h-11 pl-6 pr-2 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
                  <div class="text-white text-base font-normal font-['Roboto'] leading-normal">Tes Sekarang</div>
                  <div class="p-2.5 bg-white rounded-3xl justify-start items-center gap-2.5 flex">
                      <div class="w-3 h-3 relative">
                        <img src="@/assets/icons/arrow-go-biru.svg" alt="go">
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </div>
    </div>
  </section>

  <!-- Resume GIM -->
  <section class="bg-white py-[60px]">
    <div class="mx-[60px] flex items-center justify-center gap-[118px]">
      <img class="w-[400px] h-[340px]" src="@/assets/icons/icon-resume-gim.svg">

      <div class="flex flex-col gap-[16px] h-[300px]">
        <div class="bg-[#D6D6FE] rounded-3xl flex justify-center items-center w-[98px] h-[32px]">
          <span class="font-roboto font-medium text-[#3030F8]">Hasil Tes</span>
        </div>

        <h1 class="text-black text-3xl font-sora font-semibold">
          Sang Pelaksana (Cermat)
        </h1>

        <h3 class="text-black text-lg font-roboto font-medium">
          Sang Pelaksana (Cermat)
        </h3>

        <div class="flex flex-col gap-[24px]">
          <span class="text-[#667085] text-base font-roboto font-normal">
            Tipe kecerdasan ini berfokus pada pengendalian dari luar menuju dalam diri. Orang dengan tipe ini cenderung tajam dalam mengamati detail, menyukai keteraturan, metode, dan ketepatan. Mereka mandiri, dapat diandalkan, jujur, dan konsisten dalam tindakan dan perkataan. Fondasi yang kuat membuat mereka terbuka terhadap banyak peluang baru.
          </span>

          <button class="w-[215px] h-11 pl-6 pr-2 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
              <div class="text-white text-base font-normal font-['Roboto'] leading-normal">Baca Selengkapnya</div>
              <div class="p-2.5 bg-white rounded-3xl justify-start items-center gap-2.5 flex">
                  <div class="w-3 h-3 relative">
                    <img src="@/assets/icons/arrow-go-biru.svg" alt="go">
                  </div>
              </div>
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Resume assesmen & IQ -->
  <section class="bg-white py-[50px]">
    <div class="flex items-center justify-center gap-[24px]">
      <div class="w-[498px] h-[598px] pl-[70px] pr-[69.04px] pt-8 pb-[21.28px] bg-[#3030f8] rounded-3xl shadow flex-col justify-end items-center inline-flex">
        <div class="self-stretch h-[544.72px] flex-col justify-start items-center gap-6 inline-flex">
            <div class="self-stretch h-[86px] flex-col justify-center items-center gap-4 flex">
                <div class="w-[326px] text-center text-[#f0f7fd] text-2xl font-semibold font-['Sora'] leading-loose">Resume Assesment Kamu</div>
                <div class="justify-start items-center gap-4 inline-flex">
                    <div class="px-4 py-1 bg-[#d6d6fe] rounded-[99px] justify-center items-center gap-2.5 flex">
                        <div class="text-[#3030f8] text-lg font-normal font-['DM Sans'] leading-[30px]">Visual</div>
                    </div>
                    <div class="px-4 py-1 bg-[#fee3e1] rounded-[99px] justify-center items-center gap-2.5 flex">
                        <div class="text-[#f04437] text-lg font-normal font-['DM Sans'] leading-[30px]">Auditori</div>
                    </div>
                    <div class="px-4 py-1 bg-[#d0fadf] rounded-[99px] justify-center items-center gap-2.5 flex">
                        <div class="text-[#12b669] text-lg font-normal font-['DM Sans'] leading-[30px]">Kinestik</div>
                    </div>
                </div>
            </div>
            <div class="self-stretch h-[434.72px] flex-col justify-start items-start gap-6 flex">
                <div class="w-[354.96px] h-[386.72px] relative">
                    <div class="w-[168.60px] h-[168.60px] left-[186.36px] top-[139.54px] absolute">
                        <div class="w-[168.60px] h-[168.60px] left-0 top-0 absolute bg-white rounded-full"></div>
                        <div class="w-[152.29px] h-[152.29px] left-[6.35px] top-[6.35px] absolute">
                            <div class="w-[152.29px] h-[152.29px] left-0 top-0 absolute bg-white rounded-full"></div>
                            <div class="w-[147.61px] h-[141.41px] left-[2.72px] top-[5.44px] absolute">
                                <div class="w-[112.47px] h-[62.99px] left-0 top-[8.97px] absolute">
                                    <div class="w-[38.71px] h-[20.23px] left-[25.88px] top-0 absolute">
                                    </div>
                                    <div class="w-[38.71px] h-[20.23px] left-[73.75px] top-[42.76px] absolute">
                                    </div>
                                    <div class="w-[30.34px] h-[20.23px] left-0 top-[42.76px] absolute">
                                    </div>
                                </div>
                                <div class="w-[146.49px] h-[141.21px] left-[1.12px] top-[0.20px] absolute">
                                    <div class="w-[60.52px] h-[75.35px] left-[11.72px] top-[43.35px] absolute">
                                        <div class="w-[60.52px] h-[37.99px] left-0 top-[37.36px] absolute">
                                        </div>
                                        <div class="w-[36.27px] h-[43.34px] left-[9.66px] top-[-0px] absolute">
                                            <div class="w-[36.27px] h-[34.96px] left-0 top-0 absolute">
                                                <div class="w-[7.88px] h-[4.88px] left-[0.76px] top-[23.78px] absolute">
                                                </div>
                                                <div class="w-[23.48px] h-[18.87px] left-[12.79px] top-[12.56px] absolute">
                                                    <div class="w-[23.48px] h-[11.09px] left-[-0px] top-[7.78px] absolute">
                                                    </div>
                                                    <div class="w-[17.05px] h-[13.79px] left-[3.54px] top-0 absolute">
                                                        <div class="w-[15.57px] h-[5.23px] left-[1.48px] top-[4.60px] absolute">
                                                        </div>
                                                        <div class="w-[16.95px] h-[3.66px] left-0 top-0 absolute">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-[93.17px] h-[65.96px] left-[-0px] top-[75.24px] absolute">
                                        <div class="w-[93.17px] h-[65.96px] left-0 top-0 absolute">
                                            <div class="w-[87.22px] h-[33.20px] left-[1.77px] top-[1.60px] absolute">
                                            </div>
                                        </div>
                                        <div class="w-[54.61px] h-[34.40px] left-[9.17px] top-[31.57px] absolute">
                                            <div class="w-[54.61px] h-[15.61px] left-0 top-[18.79px] absolute">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-[93.30px] h-[141.21px] left-[53.19px] top-0 absolute">
                                        <div class="w-[52.17px] h-[52.14px] left-[19.24px] top-0 absolute">
                                            <div class="w-[9.33px] h-[10.40px] left-[24.45px] top-[23.06px] absolute">
                                                <div class="w-1 h-[6.83px] left-[3.14px] top-[2.13px] absolute">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="w-[43.91px] h-[50.50px] left-[35.26px] top-[90.70px] absolute">
                                        </div>
                                    </div>
                                </div>
                                <div class="w-[37.78px] h-[29.15px] left-[22.43px] top-[38.55px] absolute">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-[142px] h-[142px] left-[28.63px] top-[244.72px] absolute">
                        <div class="w-[142px] h-[142px] left-0 top-0 absolute bg-white rounded-full"></div>
                        <div class="w-[121.12px] h-[121.12px] left-[10.44px] top-[10.44px] absolute">
                            <div class="w-[121.12px] h-[121.12px] left-0 top-0 absolute bg-[#5959f9] rounded-full"></div>
                            <div class="w-[101.22px] h-[85.84px] left-[10.44px] top-[17.75px] absolute">
                                <div class="w-[101.22px] h-[68.53px] left-0 top-[17.31px] absolute">
                                    <div class="w-[68.26px] h-[68.53px] left-0 top-0 absolute">
                                    </div>
                                    <div class="w-[93.80px] h-[68.45px] left-[7.42px] top-[0.09px] absolute">
                                        <div class="w-[26.64px] h-[27.19px] left-0 top-[8.50px] absolute">
                                            <div class="w-[26.64px] h-[27.19px] left-0 top-0 absolute">
                                            </div>
                                        </div>
                                        <div class="w-[28.82px] h-[29.36px] left-[21.39px] top-[13.41px] absolute">
                                        </div>
                                        <div class="w-[29.10px] h-[29.30px] left-[48.54px] top-[39.15px] absolute">
                                        </div>
                                        <div class="w-[43.01px] h-[35.33px] left-[50.79px] top-0 absolute">
                                            <div class="w-[30.33px] h-[32.73px] left-0 top-[2.59px] absolute">
                                                <div class="w-[8.07px] h-[8.37px] left-[10.15px] top-[18.85px] absolute">
                                                </div>
                                                <div class="w-[3.60px] h-[8.90px] left-[0.23px] top-[15.34px] absolute">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="w-[34.38px] h-[7.07px] left-[6.91px] top-[16.24px] absolute">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-[188.55px] h-[188.55px] left-0 top-0 absolute">
                        <div class="w-[188.55px] h-[188.55px] left-0 top-0 absolute">
                            <div class="w-[188.55px] h-[188.55px] left-0 top-0 absolute bg-[#d9d9d9] rounded-full"></div>
                            <div class="w-[188.55px] h-[188.55px] left-0 top-0 absolute">
                                <div class="w-[188.55px] h-[188.55px] left-0 top-0 absolute bg-white rounded-full"></div>
                                <div class="w-[167.70px] h-[167.70px] left-[9.97px] top-[9.97px] absolute bg-[#5959f9] rounded-full"></div>
                                <div class="w-[174.65px] h-[160.76px] left-[10.35px] top-[15.81px] absolute">
                                    <div class="w-[153.44px] h-[159.04px] left-0 top-0 absolute">
                                    </div>
                                    <div class="w-[30.63px] h-[34.46px] left-[89.94px] top-[97.98px] absolute">
                                    </div>
                                    <div class="w-[36.98px] h-[35.93px] left-[75.16px] top-[48.96px] absolute">
                                    </div>
                                    <div class="w-[83.75px] h-[84.85px] left-[90.90px] top-[75.91px] absolute">
                                        <div class="w-[72.20px] h-[54.30px] left-0 top-0 absolute">
                                        </div>
                                    </div>
                                    <div class="w-[35.52px] h-[37.53px] left-[30.40px] top-[37.08px] absolute">
                                    </div>
                                    <div class="w-[35.03px] h-[36.38px] left-[38.47px] top-[85.07px] absolute">
                                    </div>
                                </div>
                                <div class="w-[29.87px] h-[51.91px] left-[126.77px] top-[31.72px] absolute">
                                    <div class="w-[29.87px] h-[51.91px] left-0 top-0 absolute">
                                    </div>
                                </div>
                                <div class="w-[53.97px] h-[18.52px] left-[32.17px] top-[150.71px] absolute">
                                    <div class="w-[53.93px] h-[18.52px] left-[0.04px] top-0 absolute">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-[188px] h-[188px] left-0 top-0 absolute bg-black/50 rounded-full"></div>
                        <div class="w-[68px] h-16 left-[60px] top-[62px] absolute flex-col justify-start items-center inline-flex">
                            <div class="self-stretch text-center text-white text-4xl font-medium font-['Roboto'] leading-10">34%</div>
                            <div class="self-stretch text-center text-white text-base font-normal font-['Roboto'] leading-normal">Visual</div>
                        </div>
                    </div>
                </div>
                <div class="self-stretch text-center text-white text-base font-medium font-['Roboto'] underline leading-normal">Baca Selengkapnya</div>
            </div>
        </div>
    </div>

    <div class="w-[498px] h-[598px] pl-[95px] pr-[94px] pt-[41px] pb-[29px] bg-[#3030f8] rounded-3xl shadow flex-col justify-end items-center inline-flex">
      <div class="self-stretch h-[528px] flex-col justify-center items-center gap-16 inline-flex">
          <div class="self-stretch h-[440px] flex-col justify-start items-center gap-14 flex">
              <div class="self-stretch h-[86px] flex-col justify-start items-center gap-4 flex">
                  <div class="w-[326px] text-center text-white text-2xl font-semibold font-['Sora'] leading-loose">Resume IQ Kamu</div>
                  <div class="self-stretch justify-center items-center gap-4 inline-flex">
                      <div class="px-4 py-1 bg-[#d0fadf] rounded-[99px] justify-center items-center gap-2.5 flex">
                          <div class="text-[#027947] text-lg font-normal font-['DM Sans'] leading-[30px]">Average - Cukup</div>
                      </div>
                  </div>
              </div>
              <div class="w-[298px] h-[298px] relative">
                  <div class="w-[170.85px] h-[102.88px] left-[64.32px] top-[116.95px] absolute">
                  </div>
                  <div class="left-[118px] top-[113px] absolute text-white text-[98px] font-bold font-['Sora'] leading-[72px]">3</div>
              </div>
          </div>
          <div class="text-white text-base font-medium font-['Roboto'] underline leading-normal">Baca Selengkapnya</div>
      </div>
  </div>
    </div>
  </section>

  <!-- Reservasi -->
  <section class="bg-white py-[46px]">
    <div class="flex items-center justify-center mx-[60px]">
      <div class="w-[1215px] h-[168.21px] px-[68px] py-6 flex-col justify-center items-center gap-2.5 inline-flex">
          <div class="flex justify-center items-center w-[1215px] h-[168.21px] bg-gradient-to-br from-[#3030f8] to-[#43b0ff] rounded-3xl">
            <div class="w-[1078px] h-[206.60px] justify-center items-center gap-[38px] inline-flex">
              <div class="w-[220.17px] h-[206.60px] relative">
                  <img src="@/assets/icons/dashboard-reservasi.svg" alt="reservasi">
              </div>
              <div class="grow shrink basis-0 h-[84px] justify-between items-center flex">
                  <div class="h-[84px] pb-5 justify-center items-center flex">
                      <div class="w-[498px] text-white text-2xl font-semibold font-sora leading-loose">Tertarik mengenal diri kamu lebih dalam? yuk cek langsung ke ahlinya!</div>
                  </div>
                  
                  <button class="pl-6 pr-2 py-1.5 bg-white rounded-full justify-center items-center gap-3 flex">
                      <div class="text-[#3030f8] text-base font-normal font-roboto leading-normal">Reservasi Sekarang!</div>
                      <div class="p-2.5 bg-[#3030f8] rounded-3xl justify-start items-center gap-2.5 flex">
                          <div class="w-3 h-3 relative">
                            <img src="@/assets/icons/arrow-go.svg" alt="go">
                          </div>
                      </div>
                    </button>
              </div>
          </div>
          </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pemisah {
  width: 19px;
  height: 20px;
  border-bottom-left-radius: 1rem;
  box-shadow: -5px 8px 0px 0px #FFFFFF; 
}
</style>