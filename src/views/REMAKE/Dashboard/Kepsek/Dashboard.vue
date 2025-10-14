<template>
  <div v-if="loading" class="preloader-overlay">
    <span
      class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
  </div>

  <Layout v-if="!loading">
    <section class="bg-[#F6F6F9] py-[66px] px-[20px] md:px-[60px] font-sora">
      <div class="flex flex-col gap-[36px]">
        <div class="flex justify-between items-center gap-6">
          <div class="flex flex-col gap-3">
            <h1 class="text-[#0c141c] text-3xl md:text-4xl font-semibold leading-10">
              Selamat Datang Kembali, {{ staffName }}
            </h1>
            <span class="self-stretch text-[#4c7099] text-sm font-normal leading-tight">Berikut ringkasan aktivitas
              pengujian siswa</span>
          </div>

          <!-- Download Hasil -->

        </div>

        <!-- Card SMKN 64 -->
        <div v-if="sekolahId === 215397" class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-[16px]">
          <DataCard bgColor="bg-[#6366f1]" :image="Users" :number="data_test_counts[0]" :title="'Total Pengguna'" />
          <DataCard bgColor="bg-[#06b6d4]" :image="Ist" :number="smkn64Data ? smkn64Data.istCustomer : 0"
            :title="'Total Test Jatidiri Cerdas Dewasa'" />
          <DataCard bgColor="bg-[#ec4899]" :image="Karir" :number="smkn64Data ? smkn64Data.karierCustomer : 0"
            :title="'Total Test Jatidiri Karir'" />
          <DataCard bgColor="bg-[#10b981]" :image="Belajar" :number="smkn64Data ? smkn64Data.belajarCustomer : 0"
            :title="'Total Test Jatidiri Gaya Belajar'" />
          <DataCard bgColor="bg-[#E9CA49]" :image="Potensi" :number="smkn64Data ? smkn64Data.mapingCustomer : 0"
            :title="'Total Test Jatidiri Potensi'" />
        </div>

        <!-- Card SMKN 11 -->
        <div v-else-if="sekolahId === 19502" class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
          <DataCard bgColor="bg-[#6366f1]" :image="Users" :number="data_test_counts[0]" :title="'Total Pengguna'" />
          <DataCard bgColor="bg-[#06b6d4]" :image="Ist" :number="smkn64Data ? smkn64Data.istCustomer : 0"
            :title="'Total Test Jatidiri Cerdas Dewasa'" />
          <DataCard bgColor="bg-[#ec4899]" :image="Karir" :number="smkn64Data ? smkn64Data.karierCustomer : 0"
            :title="'Total Test Jatidiri Karir'" />
          <DataCard bgColor="bg-[#10b981]" :image="Belajar" :number="smkn64Data ? smkn64Data.belajarCustomer : 0"
            :title="'Total Test Jatidiri Bahagia'" />
        </div>

        <!-- Card SMKN 2 Sumedang -->
        <div v-else-if="sekolahId === 215399" class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
          <DataCard bgColor="bg-[#6366f1]" :image="Users" :number="data_test_counts[0]" :title="'Total Pengguna'" />
          <DataCard bgColor="bg-[#06b6d4]" :image="Ist" :number="smkn64Data ? smkn64Data.istCustomer : 0"
            :title="'Total Test Jatidiri Cerdas Dewasa'" />
          <DataCard bgColor="bg-[#ec4899]" :image="Karir" :number="smkn64Data ? smkn64Data.karierCustomer : 0"
            :title="'Total Test Jatidiri Karir'" />
          <DataCard bgColor="bg-[#10b981]" :image="Belajar" :number="smkn64Data ? smkn64Data.belajarCustomer : 0"
            :title="'Total Test Jatidiri Bahagia'" />
        </div>

        <!-- Card Duta Family Preschool -->
        <div v-else-if="sekolahId === 215394" class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
          <DataCard bgColor="bg-[#6366f1]" :image="Users" :number="data_test_counts[0]" :title="'Total Pengguna'" />
          <DataCard bgColor="bg-[#06b6d4]" :image="Ist" :number="smkn64Data ? smkn64Data.istCustomer : 0"
            :title="'Total Test Jatidiri Cerdas Dewasa'" />
          <DataCard bgColor="bg-[#ec4899]" :image="Karir" :number="smkn64Data ? smkn64Data.karierCustomer : 0"
            :title="'Total Test Jatidiri Karir'" />
          <DataCard bgColor="bg-[#10b981]" :image="Belajar" :number="smkn64Data ? smkn64Data.belajarCustomer : 0"
            :title="'Total Test Jatidiri Bahagia'" />
        </div>

        <!-- Card Baznas -->
        <div v-else-if="sekolahId === 215400" class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
          <DataCard bgColor="bg-[#6366f1]" :image="Users" :number="data_test_counts[0]" :title="'Total Pengguna'" />
          <DataCard bgColor="bg-[#06b6d4]" :image="Ist" :number="smkn64Data ? smkn64Data.istCustomer : 0"
            :title="'Total Test Jatidiri Cerdas Dewasa'" />
          <DataCard bgColor="bg-[#ec4899]" :image="Karir" :number="smkn64Data ? smkn64Data.karierCustomer : 0"
            :title="'Total Test Jatidiri Potensi'" />
        </div>

        <!-- Card FK Unjani -->
        <div v-else-if="sekolahId === 215401" class="w-0 h-0 -mt-6">
        </div>

        <!-- Card SMKN 2 Cimahi -->
        <div v-else-if="sekolahId === 215402" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[16px]">
          <DataCard bgColor="bg-[#6366f1]" :image="Users" :number="data_test_counts[0]" :title="'Total Pengguna'" />
          <DataCard bgColor="bg-[#ec4899]" :image="Karir"
            :number="statistik ? statistik.karierStatistik.karierTotal : 0" :title="'Total Test Jatidiri Karir'" />
          <DataCard bgColor="bg-[#10b981]" :image="Belajar" :number="statistik ? statistik.jatidiriKendali.total : 0"
            :title="'Total Test Jatidiri Kendali'" />
          <DataCard bgColor="bg-[#10b981]" :image="Potensi" :number="statistik ? statistik.jatidiriMental.total : 0"
            :title="'Total Test Jatidiri Kendali Mental'" />
          <DataCard bgColor="bg-[#06b6d4]" :image="Ist" :number="smkn64Data ? smkn64Data.istCustomer : 0"
            :title="'Total Test Jatidiri Cerdas'" />
          <DataCard bgColor="bg-[#06b6d4]" :image="Ist" :number="smkn64Data ? smkn64Data.istCustomer : 0"
            :title="'Total Test Jatidiri Cerdas Dewasa'" />
        </div>

        <!-- Card Hexagon -->
        <div v-else-if="sekolahId === 215396" class="max-h-0 max-w-0">
          
        </div>

        <!-- Card -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
          <DataCard bgColor="bg-[#6366f1]" :image="Users" :number="data_test_counts[0]" :title="'Total Pengguna'" />
          <DataCard bgColor="bg-[#31d583]" :image="Sejati" :number="data_test_counts[1]"
            :title="'Total Mengikuti Test Jatidiri Sejati'" />
          <DataCard bgColor="bg-[#53B1FD]" :image="Belajar" :number="data_test_counts[2]"
            :title="'Total Test Jatidiri Belajar'" />
          <DataCard v-if="institutionType == 'TK' || institutionType == 'SD' || institutionType == 'SDLB'"
            bgColor="bg-[#fcb022]" :image="Belajar" :number="data_test_counts[3]" :title="'CPM'" />
          <DataCard v-else bgColor="bg-[#fcb022]" :image="Cerdas" :number="data_test_counts[3]"
            :title="'Total Test Jatidiri Cerdas'" />
        </div>
      </div>

      <!-- Dashboard SMKN 64 -->
      <div v-if="sekolahId === 215397" class="pt-6">
        <div class="w-full h-full flex flex-col md:flex-row gap-4 md:gap-6 pt-6">
          <div class="w-full h-full md:w-[70%]">
            <JatidiriKarirChart :karierData="smkn64Data?.karierStatistik?.grouped || {}" />
          </div>

          <div class="w-full md:w-[30%]">
            <ProgressChart />
          </div>
        </div>

        <JatidiriIstChart :iqData="smkn64Data?.averageIq?.sw_counts || {}" class="mt-6" />
        <JatidiriBelajarChart :data="data_pie_1.series[0].data" :loading="loading" class="mt-6" />
      </div>

      <!-- Dashboard SMKN 11 -->
      <div v-else-if="sekolahId === 19502" class="pt-6">
        <div class="w-full">
          <JatidiriIstChart :iqData="smkn64Data?.averageIq?.sw_counts || {}" />
        </div>

        <div class="w-full flex flex-col md:flex-row gap-4 md:gap-6 pt-6">
          <div class="w-full md:w-[70%]">
            <JatidiriKarirChart :karierData="smkn64Data?.karierStatistik?.grouped || {}" />
          </div>

          <div class="w-full md:w-[30%]">
            <JatidiriBahagiaChart />
          </div>
        </div>
      </div>

      <!-- Dashboard SMKN 2 SUMEDANG -->
      <div v-else-if="sekolahId === 215399" class="pt-6">
        <div class="w-full flex flex-col md:flex-row gap-4 md:gap-6 pt-6">
          <div class="w-full md:w-[60%]">
            <JatidiriKarirChart :karierData="smkn64Data?.karierStatistik?.grouped || {}" />
          </div>

          <div class="w-full md:w-[40%]">
            <JatidiriIstChart :iqData="smkn64Data?.averageIq?.sw_counts || {}" />
          </div>
        </div>
      </div>

      <!-- Dashboard Duta Family Preschool -->
      <div v-else-if="sekolahId === 215394" class="pt-6">
        <JatidiriAnakChart :parent-data="smkn64Data?.parent || []" :teacher-data="smkn64Data?.teacher || []"
          class="mt-6" />
      </div>

      <!-- Dashboard Baznas -->
      <div v-else-if="sekolahId === 215400" class="pt-6">
        <div class="w-full flex flex-col md:flex-row gap-4 md:gap-6 pt-6">
          <div class="w-full md:w-[60%]">
            <JatidiriIstChart :iqData="smkn64Data?.averageIq?.sw_counts || {}" />
          </div>

          <div class="w-full md:w-[40%]">
            <JatidiriPotensiChart />
          </div>
        </div>
      </div>

      <!-- Dashboard FK Unjani -->
      <div v-else-if="sekolahId === 215401" class="pt-6">
        <div class="w-full h-fit flex flex-col md:flex-row gap-4 md:gap-6 pt-6">
          <div class="w-full min-h-full md:w-[70%] flex flex-col justify-between gap-6">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[16px]">
              <DataCard bgColor="bg-[#6366f1]" :image="Users" :number="data_test_counts[0]" :title="'Total Pengguna'" />
              <DataCard bgColor="bg-[#10b981]" :image="Belajar"
                :number="statistikTangguhData ? statistikTangguhData?.mms : 0" :title="'Total Test MMS'" />
              <DataCard bgColor="bg-[#06b6d4]" :image="Belajar"
                :number="statistikTangguhData ? statistikTangguhData?.map : 0" :title="'Total Test MAP'" />
              <DataCard bgColor="bg-[#ec4899]" :image="Belajar"
                :number="statistikTangguhData ? statistikTangguhData?.lbc : 0" :title="'Total Test LBC'" />
              <DataCard bgColor="bg-[#10b981]" :image="Belajar"
                :number="statistikTangguhData ? statistikTangguhData?.bri : 0" :title="'Total Test BRI'" />
              <DataCard bgColor="bg-[#fcb022]" :image="Belajar"
                :number="statistikTangguhData ? statistikTangguhData?.crs : 0" :title="'Total Test CRS'" />
            </div>
            <CRSChart class="w-full h-fit" :data="statistikTangguhData?.crsStatistik" :loading="loading" />
          </div>

          <div class="w-full h-full md:w-[30%]">
            <ProgressChart :users="data_test_counts[0]" :statistik="statistikTangguhData" />
          </div>
        </div>
        <div class="w-full h-full flex flex-col md:flex-row gap-4 md:gap-6 pt-6">
          <div class="w-full h-full md:w-[50%]">
            <MAPChart :map-statistik="statistikTangguhData?.mapStatistik" :loading="loading" />
          </div>

          <div class="w-full min-h-full md:w-[50%]">
            <LBCChart v-if="statistikTangguhData" :lbc="statistikTangguhData?.lbcStatistik" class="w-full h-full" />
          </div>
        </div>
        <div class="w-full flex flex-col md:flex-row gap-4 md:gap-6 pt-6">
          <div class="w-full md:w-[50%]">
            <MMSChart v-if="statistikTangguhData" :data="statistikTangguhData?.mmsStatistik" />
          </div>

          <div class="w-full md:w-[50%]">
            <BRIChart v-if="statistikTangguhData" :data="statistikTangguhData?.briStatistik" />
          </div>
        </div>
      </div>

      <!-- Dashboard SMKN 2 Cimahi -->
      <div v-else-if="sekolahId === 215402">
        <div class="grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-6 pt-6">
          <GenderChart :gender-data="demografi?.gender" :age-data="demografi?.age" />

          <div class="w-full flex flex-col md:flex-row gap-4 md:gap-6">
            <div class="w-full">
              <JatidiriKarirChart class="w-full" :karier-data="statistik?.karierStatistik.grouped || []" />
            </div>
          </div>
          <div class="w-full h-full flex flex-col md:flex-row gap-4 md:gap-6">
            <div class="w-full min-h-full md:w-[40%]">
              <JatidiriKendaliChart class="h-full" :kendali-data="statistik?.jatidiriKendali" />
            </div>

            <div class="w-full md:w-[60%]">
              <JatidiriMentalChart :mental-data="statistik?.jatidiriMental" />
            </div>
          </div>
        </div>
      </div>

      <!-- Dashboard Hexagon -->
      <div v-else-if="sekolahId === 215396" class="">
        <GenderChart :sekolah-id="sekolahId" class="pt-6" :gender-data="demografi?.gender" :age-data="demografi?.age" />
        <div class="grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-6 pt-6">
          <JatidiriGIM :options="data_bar.chartOptions" :series="data_bar.series" />

          <div class="w-full h-full flex flex-col md:flex-row gap-4 md:gap-6">
            <div class="w-full min-h-full h-full md:w-[60%]">
              <JatidiriIstChart class="h-full" :iq-data="statistik?.iqpotensi || []" />
            </div>

            <div class="w-full md:w-[40%]">
              <JatidiriCerdasChart />
            </div>
          </div>

          <!-- <div class="w-full flex flex-col md:flex-row gap-4 md:gap-6">
            <div class="w-full md:w-[50%]">
              <JatidiriBakatChart/>
            </div>

            <div class="w-full md:w-[50%]">
              <JatidiriPotensiChart />
            </div>
          </div> -->

          <div class="w-full flex flex-col md:flex-row gap-4 md:gap-6">
            <div class="w-full md:w-[70%]">
              <JatidiriKarirChart :karier-data="statistik?.karierStatistik.grouped || []" />
            </div>

            <div class="w-full md:w-[30%]">
              <JatidiriBahagiaChart :bahagia-data="statistik?.jatidiriBahagia || []" />
            </div>
          </div>
          <div class="w-full h-full flex flex-col md:flex-row gap-4 md:gap-6">
            <div class="w-full min-h-full md:w-[40%]">
              <JatidiriKendaliChart class="h-full" :kendali-data="statistik?.jatidiriKendali" />
            </div>

            <div class="w-full md:w-[60%]">
              <JatidiriMentalChart :mental-data="statistik?.jatidiriMental" />
            </div>
          </div>
          <div class="w-full h-full flex flex-col md:flex-row gap-4 md:gap-6">
            <div class="w-full md:w-[60%]">
              <JatidiriAnxietyChart :anxiety-data="statistik?.jatidiriAnxiety" />
            </div>
            <div class="w-full min-h-full md:w-[40%]">
              <JatidiriStressChart class="h-full" :data="statistik?.jatidiriStres" />
            </div>
          </div>
          <div class="w-full h-full flex flex-col md:flex-row gap-4 md:gap-6">
            <div class="w-full min-h-full md:w-[50%]">
              <JatidiriQ1Chart :data="statistik?.jatidiriQ1" />
            </div>

            <div class="w-full md:w-[50%]">
              <JatidiriQ2Chart :data="statistik?.jatidiriQ2" />
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="sekolahId === 3795" class="">
        <div class="grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-6 pt-6">
          <JatidiriGIM :options="data_bar.chartOptions" :series="data_bar.series" />
          <JatidiriIstChart :iq-data="statistik?.iqpotensi || []" />
          <GenderChart :gender-data="demografi?.gender" :age-data="demografi?.age" />

          <div class="w-full flex flex-col md:flex-row gap-4 md:gap-6">
            <div class="w-full md:w-[70%]">
              <JatidiriKarirChart :karier-data="statistik?.karierStatistik.grouped || []" />
            </div>

            <div class="w-full md:w-[30%]">
              <JatidiriBahagiaChart :bahagia-data="statistik?.jatidiriBahagia || []" />
            </div>
          </div>
          <div class="w-full h-full flex flex-col md:flex-row gap-4 md:gap-6">
            <div class="w-full min-h-full md:w-[40%]">
              <JatidiriKendaliChart class="h-full" :kendali-data="statistik?.jatidiriKendali" />
            </div>

            <div class="w-full md:w-[60%]">
              <JatidiriMentalChart :mental-data="statistik?.jatidiriMental" />
            </div>
          </div>
          <div class="w-full h-full flex flex-col md:flex-row gap-4 md:gap-6">
            <div class="w-full md:w-[60%]">
              <JatidiriAnxietyChart :anxiety-data="statistik?.jatidiriAnxiety" />
            </div>
            <div class="w-full min-h-full md:w-[40%]">
              <JatidiriStressChart class="h-full" :data="statistik?.jatidiriStres" />
            </div>
          </div>
          <div class="w-full h-full flex flex-col md:flex-row gap-4 md:gap-6">
            <div class="w-full min-h-full md:w-[50%]">
              <JatidiriQ1Chart :data="statistik?.jatidiriQ1" />
            </div>

            <div class="w-full md:w-[50%]">
              <JatidiriQ2Chart :data="statistik?.jatidiriQ2" />
            </div>
          </div>
        </div>
      </div>

      <div v-else class="">
        <div class="grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-6 pt-6">
          <JatidiriIstChart :iq-data="statistik?.iqpotensi || []" />
          <GenderChart :gender-data="demografi?.gender" :age-data="demografi?.age" />

          <div class="w-full flex flex-col md:flex-row gap-4 md:gap-6">
            <div class="w-full md:w-[70%]">
              <JatidiriKarirChart :karier-data="statistik?.karierStatistik.grouped || []" />
            </div>

            <div class="w-full md:w-[30%]">
              <JatidiriBahagiaChart :bahagia-data="statistik?.jatidiriBahagia || []" />
            </div>
          </div>
          <div class="w-full h-full flex flex-col md:flex-row gap-4 md:gap-6">
            <div class="w-full min-h-full md:w-[40%]">
              <JatidiriKendaliChart class="h-full" :kendali-data="statistik?.jatidiriKendali" />
            </div>

            <div class="w-full md:w-[60%]">
              <JatidiriMentalChart :mental-data="statistik?.jatidiriMental" />
            </div>
          </div>
          <div class="w-full h-full flex flex-col md:flex-row gap-4 md:gap-6">
            <div class="w-full md:w-[60%]">
              <JatidiriAnxietyChart :anxiety-data="statistik?.jatidiriAnxiety" />
            </div>
            <div class="w-full min-h-full md:w-[40%]">
              <JatidiriStressChart class="h-full" :data="statistik?.jatidiriStres" />
            </div>
          </div>
          <div class="w-full h-full flex flex-col md:flex-row gap-4 md:gap-6">
            <div class="w-full min-h-full md:w-[50%]">
              <JatidiriQ1Chart :data="statistik?.jatidiriQ1" />
            </div>

            <div class="w-full md:w-[50%]">
              <JatidiriQ2Chart :data="statistik?.jatidiriQ2" />
            </div>
          </div>
        </div>
      </div>

      <!-- <div v-if="sekolahId !== 215397" class="bg-white p-4 flex flex-col rounded-xl mt-10">
        <div class="flex flex-col justify-start lg:flex-row lg:justify-between items-start lg:items-center mb-5 px-4">
          <div class="text-[#0c141c] leading-loose space-y-4">
            <div class="text-lg md:text-xl font-semibold mb-5">
              Keterangan Klarifikasi Hasil Test:
            </div>

            <div class="bg-[#F4F3FF] p-5 rounded-lg" v-if="data_desc" v-for="(desc, index) in data_desc"
              :key="desc[0].id">
              <div class="flex items-start gap-4">
                <div class="flex justify-center items-center w-12 h-12 bg-white rounded-full shadow-md">
                  <svg v-if="index == 0" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1771_11163)">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M15.8824 6.42999C16.1614 5.77702 16.9169 5.4739 17.5699 5.75292C19.0358 6.37934 20.6844 6.42783 22.1846 5.88866C22.8528 5.64849 23.5892 5.99549 23.8294 6.66372C24.0696 7.33197 23.7226 8.06836 23.0544 8.30853C20.9429 9.06739 18.6226 8.99914 16.5594 8.1175C15.9065 7.83847 15.6034 7.08295 15.8824 6.42999ZM6.4215 18.2594C4.96209 17.6233 3.31449 17.57 1.81701 18.1105C1.14911 18.3517 0.412232 18.0056 0.171145 17.3377C-0.0699423 16.6698 0.276058 15.9329 0.943959 15.6919C3.05956 14.9282 5.38725 15.0035 7.44908 15.9023C8.09999 16.1861 8.39764 16.9438 8.11389 17.5946C7.83013 18.2456 7.07243 18.5433 6.4215 18.2594ZM9.54352 7.70885C9.04143 7.20674 8.22736 7.20674 7.72525 7.70885C7.22315 8.21095 7.22315 9.02501 7.72525 9.52713L14.4727 16.2746C14.9748 16.7767 15.7889 16.7767 16.291 16.2746C16.7931 15.7725 16.7931 14.9584 16.291 14.4563L9.54352 7.70885Z"
                        fill="#2626C6" />
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M18.1073 1.82595C18.3533 1.15985 18.0128 0.420445 17.3467 0.17445C16.6806 -0.0715459 15.9412 0.269024 15.6952 0.935132C14.9181 3.03933 14.9658 5.35961 15.8289 7.43004L15.8302 7.43326C16.3237 8.60803 16.4577 9.90274 16.2152 11.1537C15.9731 12.403 15.3664 13.5525 14.4718 14.4574C13.5493 15.3732 12.376 15.9949 11.1001 16.2439C10.4032 16.3799 9.94853 17.0552 10.0845 17.7521C10.2206 18.449 10.8958 18.9038 11.5927 18.7677C13.37 18.4209 15.0043 17.5541 16.2884 16.2773L16.2954 16.2703C17.5498 15.0035 18.4004 13.3931 18.7397 11.6429C19.0788 9.89323 18.8916 8.08233 18.2017 6.43906C17.5891 4.96839 17.5555 3.32047 18.1073 1.82595ZM12.8336 7.7563C13.5306 7.62074 13.9858 6.94579 13.8502 6.24876C13.7146 5.55175 13.0397 5.09661 12.3426 5.23217C10.5734 5.57628 8.9457 6.43646 7.66465 7.70429L7.65421 7.71473C6.4023 8.9825 5.55342 10.5923 5.21444 12.3415C4.87546 14.0906 5.06151 15.901 5.7492 17.5447L5.75226 17.5519C6.37902 19.0245 6.42756 20.6794 5.88816 22.1861C5.64886 22.8547 5.99681 23.5906 6.66534 23.8299C7.33388 24.0693 8.06984 23.7214 8.30916 23.0529C9.06615 20.9381 8.99856 18.6159 8.11998 16.5488C7.62927 15.3741 7.49669 14.0806 7.7389 12.8307C7.98089 11.582 8.58615 10.4327 9.47871 9.52678C10.3981 8.61898 11.5652 8.00301 12.8336 7.7563Z"
                        fill="#C1C1FD" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1771_11163">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <svg v-if="index == 1" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M4.44001 0.23999C3.04818 0.23999 1.92001 1.36816 1.92001 2.75999V21.24C1.92001 22.6318 3.04818 23.76 4.44001 23.76H19.56C20.9518 23.76 22.08 22.6318 22.08 21.24V8.49548C22.0795 7.82742 21.8136 7.18679 21.3408 6.71468L15.6053 0.977476C15.1329 0.505362 14.4924 0.240162 13.8245 0.23999H4.44001Z"
                      fill="#C1C1FD" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M12.1025 10.9499C12.1025 10.2541 12.6665 9.68994 13.3625 9.68994H17.5625C18.5325 9.68994 19.1387 10.7399 18.6537 11.5799C18.4286 11.9698 18.0127 12.2099 17.5625 12.2099H13.3625C12.6667 12.2099 12.1025 11.6458 12.1025 10.9499Z"
                      fill="#2626C6" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M12.1025 17.6179C12.1025 16.9221 12.6665 16.3579 13.3625 16.3579H17.5625C18.5325 16.3579 19.1387 17.4081 18.6537 18.2479C18.4286 18.6377 18.0127 18.8779 17.5625 18.8779H13.3625C12.6665 18.8779 12.1025 18.3139 12.1025 17.6179Z"
                      fill="#2626C6" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M10.5065 14.6207C11.0729 15.0247 11.2044 15.8114 10.8005 16.378L8.45349 19.6607C8.00075 20.2932 7.08858 20.3685 6.53829 19.8186L5.13052 18.4125C4.45629 17.7151 4.78989 16.5494 5.73086 16.3142C6.15241 16.209 6.59863 16.3283 6.91132 16.63L7.26738 16.986L8.74921 14.9112C9.15429 14.346 9.94098 14.2159 10.5065 14.6207Z"
                      fill="#2626C6" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M10.5065 7.84696C11.074 8.25119 11.2056 9.03925 10.8005 9.60599L8.4535 12.8904C8.00076 13.523 7.08859 13.5982 6.5383 13.0483L5.13053 11.6405C4.46933 10.9308 4.82419 9.77159 5.76928 9.55371C6.17728 9.45976 6.60516 9.57428 6.91133 9.85971L7.26739 10.2142L8.74922 8.14096C9.15328 7.57474 9.93996 7.44308 10.5065 7.84696Z"
                      fill="#2626C6" />
                  </svg>
                  <svg v-if="index == 2" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M17.0263 1.31313C14.6563 -0.0151362 11.8571 -0.351804 9.23975 0.37663C6.62241 1.10506 4.39957 2.83943 3.05653 5.20107C1.71349 7.5627 1.35935 10.3598 2.07143 12.9816C2.7835 15.6035 4.50395 17.8371 6.85716 19.1948V23.1428C6.85716 23.3702 6.94746 23.5882 7.10821 23.7489C7.26895 23.9097 7.48697 24 7.7143 24H16.2857C16.5131 24 16.7311 23.9097 16.8918 23.7489C17.0526 23.5882 17.1429 23.3702 17.1429 23.1428V19.7143H19.7143C20.3963 19.7143 21.0503 19.4434 21.5326 18.9611C22.0148 18.4789 22.2857 17.8248 22.2857 17.1428V10.2857C22.2855 8.45768 21.798 6.66275 20.8736 5.08569C19.9492 3.50863 18.6212 2.20642 17.0263 1.31313Z"
                      fill="#C1C1FD" />
                    <path
                      d="M8.95715 4.6029C7.64972 5.35839 6.64828 6.54804 6.12685 7.96517C5.60541 9.38229 5.59692 10.9373 6.10287 12.36C6.33944 13.0252 7.05773 13.3595 7.74001 13.1778C11.1943 12.2623 14.712 9.78861 16.848 7.85833C17.4137 7.34576 17.532 6.49204 17.028 5.92119C16.0416 4.80376 14.6991 4.06186 13.2281 3.82128C11.7571 3.5807 10.2482 3.85624 8.95715 4.60118V4.6029Z"
                      fill="#2626C6" />
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="font-bold">
                    <span class="text-[#3030F8]">{{ desc[0] }}%</span> siswa
                    memiliki
                    {{
                      index == 0
                        ? "kecerdasan dominan"
                        : index == 1
                          ? "gaya belajar"
                          : "klasifikasi IQ"
                    }}
                    <span class="text-[#3030F8]">{{
                      index == 2 ? desc[1].category : desc[1].name
                    }}</span>
                  </p>
                  <p class="text-sm mb-1">Catatan untuk siswa:</p>
                  <p v-if="index !== 1" class="text-sm">
                    {{ index == 2 ? desc[1].desc : desc[1].description }}
                  </p>
                  <div v-if="index == 1">
                    <p v-for="(item, index) in parsedDesc" class="text-sm">
                      {{ item }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="data_desc.length == 0" class="bg-[#F4F3FF] p-5 rounded-lg">
              <span class="mx-auto text-black text-base font-roboto font-normal">
                Siswa belum melakukan test yang tersedia
              </span>
            </div>
          </div>
        </div>
      </div> -->

      <div v-if="sekolahId === 215401" class="pt-6">
        <OverviewTangguh :id="sekolahId" :name="namaSekolah" :total="data_test_counts[0]"
          :data-siswa="tangguhData?.customers" />
      </div>
      <div v-else>
        <Overview :total="data_test_counts[0]" :data-siswa="dataSiswa" :id-sekolah="sekolahId" />
      </div>
    </section>
  </Layout>
</template>

<script setup>
import Layout from "@/Layout/Kepsek/Layout.vue";
import initAPI from "../../../../api/api";
import Cookies from "js-cookie";
import { RouterLink } from "vue-router";
import { ref, onMounted, watch } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import JatidiriIstChart from "./components/JatidiriIstChart.vue";
import DataCard from "./components/DataCard.vue";
import Ist from '../../../../assets/icons/ist2.png'
import Bakat from '../../../../assets/icons/bakat.svg'
import Bahagia from '../../../../assets/icons/bahagia.svg'
import Belajar from '../../../../assets/icons/belajar.png'
import Karir from '../../../../assets/icons/karir.png'
import Users from '../../../../assets/icons/users.png'
import Potensi from '../../../../assets/icons/potensi.svg'
import Stress from '../../../../assets/icons/stress.svg'
import Sejati from '../../../../assets/icons/sejati.png'
import Cerdas from '../../../../assets/icons/cerdas.png'
import JatidiriSejatiChart from "./components/JatidiriSejatiChart.vue";
import JatidiriBelajarChart from "./components/JatidiriBelajarChart.vue";
import JatidiriCerdasChart from "./components/JatidiriCerdasChart.vue";
import JatidiriQ1Chart from "./components/JatidiriQ1Chart.vue";
import JatidiriMentalChart from "./components/JatidiriMentalChart.vue";
import JatidiriStressChart from "./components/JatidiriStressChart.vue";
import JatidiriKendaliChart from "./components/JatidiriKendaliChart.vue";
import JatidiriAnxietyChart from "./components/JatidiriAnxietyChart.vue";
import JatidiriBahagiaChart from "./components/JatidiriBahagiaChart.vue";
import JatidiriKarirChart from "./components/JatidiriKarirChart.vue";
import JatidiriPotensiChart from "./components/JatidiriPotensiChart.vue";
import JatidiriBakatChart from "./components/JatidiriBakatChart.vue";
import ProgressChart from "./components/ProgressChart.vue";
import JatidiriAnakChart from "./components/JatidiriAnakChart.vue";
import OverviewTangguh from "./components/OverviewTangguh.vue";
import Overview from "./components/Overview.vue";
import CRSChart from "./components/CRSChart.vue";
import MAPChart from "./components/MAPChart.vue";
import LBCChart from "./components/LBCChart.vue";
import MMSChart from "./components/MMSChart.vue";
import BRIChart from "./components/BRIChart.vue";
import JatidiriQ2Chart from "./components/jatidiriQ2Chart.vue";
import GenderChart from "./components/GenderChart.vue";
import JatidiriGIM from "./components/JatidiriGIM.vue";

const staffName = ref(JSON.parse(localStorage.getItem('userData')).staff?.name)
const sekolahId = ref(JSON.parse(localStorage.getItem('userData')).staff?.institution_id)
const namaSekolah = ref(JSON.parse(localStorage.getItem('userData')).staff?.institutions.name)
const institutionType = ref(JSON.parse(localStorage.getItem('userData')).staff?.institutions.type)
const schoolType = ref('')
const dataSiswa = ref('')
const demografi = ref(null)
const statistik = ref(null)
const smkn64Data = ref(null);
const tangguhData = ref(null);
const statistikTangguhData = ref(null);
const data_test_counts = ref([0, 0, 0, 0]);

const fetchSMKN64Data = async () => {
  if (sekolahId.value === 215394) {
    try {
      const response = await initAPI("get", `statistik-admin/tk?institutId=${sekolahId.value}`, null, token);
      smkn64Data.value = response.data;
    } catch (error) {
      console.error("Error fetching SMKN64 data:", error);
    }
  } else {
    try {
      const response = await initAPI("get", `statistik-admin/staitsik?institutId=${sekolahId.value}`, null, token);
      smkn64Data.value = response.data;
    } catch (error) {
      console.error("Error fetching SMKN64 data:", error);
    }
  }
};

const fetchDemografi = async () => {
  try {
    const response = await initAPI("get", `statistik/demografi?institutionId=${sekolahId.value}`, null, token);
    demografi.value = response.data;
  } catch (error) {
    console.error("Error fetching SMKN64 data:", error);
  }
};

const fetchStatistik = async () => {
  try {
    const response = await initAPI("get", `statistik/assement?institutionId=${sekolahId.value}`, null, token);
    statistik.value = response.data;
  } catch (error) {
    console.error("Error fetching SMKN64 data:", error);
  }
};

const fetchStatistikTangguhData = async () => {
  try {
    const response = await initAPI("get", `statistik-admin/statistik-tangguh?institutId=${sekolahId.value}`, null, token);
    // console.log('Statistik Tangguh', response.data)
    statistikTangguhData.value = response.data;
  } catch (error) {
    console.error("Error fetching SMKN64 data:", error);
  }
};

const fetchPenggunaTangguhData = async () => {
  try {
    const response = await initAPI("get", `statistik-admin/pengguna-tangguh?institutId=${sekolahId.value}`, null, token);
    // console.log('Pengguna Tangguh', response.data)
    tangguhData.value = response.data;
  } catch (error) {
    console.error("Error fetching SMKN64 data:", error);
  }
};

const processJatidiriKarirData = () => {
  if (!smkn64Data.value || !smkn64Data.value.karierStatistik) return;

  const karierData = smkn64Data.value.karierStatistik.grouped;

  jatidiriKarirSeries.value[0].data = [
    karierData.sci.count,
    karierData.eri.count,
    karierData.wri.count
  ];
};

const data_bar = ref({
  series: [
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
  chartOptions: {
    chart: {
      type: "bar",
      height: 300,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Neokorteks Kiri Introvert",
        "Limbik Kanan Ekstrovert",
        "Limbik Kiri Introvert",
        "Limbik Kiri Ekstrovert",
        "Limbik Kanan Introvert",
        "Neokorteks Kanan Ekstrovert",
        "Neokorteks Kanan Introvert",
        "Neokorteks Kiri Ekstrovert",
        "Otak Tengah",
      ],
    },
  },
});

const data_pie_1 = ref({
  series: [
    {
      data: [0, 0, 0, 0, 0, 0],
    },
  ],
  chartOptions: {
    chart: {
      type: "bar",
      height: 300,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Visual",
        "Auditori",
        "Kinestetik",
        "Visual & Auditori",
        "Visual & Kinestetik",
        "Auditori & Kinestetik",
      ],
    },
  },
});

const data_pie_2 = ref({
  series: [{
    name: "Jumlah", // opsional, bisa kamu ubah jadi "Persentase" dll
    data: [0, 0, 0, 0, 0]
  }],
  chartOptions: {
    chart: {
      type: "radar",
      height: 500,
      toolbar: {
        show: false,
      },
    },
    colors: ["#1ab7ea"],
    xaxis: {
      categories: [
        "> 119",
        "111 - 119",
        "91 - 110",
        "80 - 90",
        "< 80"
      ],
      labels: {
        style: {
          colors: "#666",
          fontSize: "14px"
        }
      }
    },
    yaxis: {
      show: true,
      labels: {
        style: {
          colors: "#666",
          fontSize: "12px"
        }
      }
    },
    stroke: {
      width: 2
    },
    fill: {
      opacity: 0.4
    },
    markers: {
      size: 4
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} siswa`
      }
    },
    legend: {
      show: false
    }
  }
});

const data_desc = ref([]);
const parsedDesc = ref('')

const token = Cookies.get("token");
const fetchDataStatusAPI = async () => {
  try {
    const response = await initAPI("get", "staff/data-stats", null, token);

    data_test_counts.value = response.data.data_test_counts;
    data_bar.value.series[0].data = response.data.data_gim_result.counts;
    data_pie_1.value.series[0].data = response.data.data_assessment_result.counts;
    // data_pie_2.value.series = response.data.data_iq_result.counts;
    data_pie_2.value.series = [
      {
        name: "Jumlah",
        data: response.data.data_iq_result.counts
      }
    ];


    arrAssessment.value.map(
      (item, index) =>
      (item.persentase =
        Math.floor(response.data.data_assessment_result.percentage[index]) + "%")
    );
    arrIq.value.map(
      (item, index) =>
        (item.persentase = Math.floor(response.data.data_iq_result.percentage[index]) + "%")
    );

    if (response.data.data_gim_result.desc !== null) {
      data_desc.value.push([
        //   Math.max(...response.data.data_gim_result.percentage),
        Math.floor(Math.max(...response.data.data_gim_result.percentage)),
        response.data.data_gim_result.desc,
      ]);
    }

    if (response.data.data_assessment_result.desc !== null) {
      parsedDesc.value = JSON.parse(response.data.data_assessment_result.desc.description)
      data_desc.value.push([
        Math.floor(Math.max(...response.data.data_assessment_result.percentage)),
        response.data.data_assessment_result.desc,
      ]);
    }

    if (response.data.data_cpm_result.desc !== null && (
      schoolType.value !== 'SMK' || schoolType.value !== 'SMA' ||
      schoolType.value !== 'SMP' || schoolType.value !== 'Perguruan Tinggi'
    )) {
      data_desc.value.push([
        Math.floor(Math.max(...response.data.data_cpm_result.percentage)),
        response.data.data_cpm_result.desc,
      ]);
    }

    if (response.data.data_iq_result.desc !== null && (
      schoolType.value !== 'TK' || schoolType.value !== 'SD'
    )) {
      data_desc.value.push([
        Math.floor(Math.max(...response.data.data_iq_result.percentage)),
        response.data.data_iq_result.desc,
      ]);
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat mengambil data statistic dashboard.",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

const getSiswa = async () => {
  try {
    const institutionId = localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData')).staff.institution_id : null
    const response = await initAPI("get", `customers?institution_id=${institutionId}`, null, token);
    // console.log(response.data)

    dataSiswa.value = response.data.data
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat mengambil data Assessment user.",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}

const getCurrentLoginData = async () => {
  const formData = new FormData()
  formData.append('refresh_user', 'true')

  const userData = await initAPI('post', 'login', formData, token)
  schoolType.value = userData.data.customer.institution.type
}

onMounted(async () => {
  await Promise.all([fetchDataStatusAPI(), getSiswa(), getCurrentLoginData(), fetchSMKN64Data(), fetchPenggunaTangguhData(), fetchStatistikTangguhData(), fetchStatistik(), fetchDemografi()]);
});

const arrAssessment = ref([
  { kategori: "Visual", persentase: "0%", color: "bg-[#8098F9]" },
  { kategori: "Auditori", persentase: "0%", color: "bg-[#444CE7]" },
  { kategori: "Kinestik", persentase: "0%", color: "bg-[#6172F3]" },
  { kategori: "Visual & Auditori", persentase: "0%", color: "bg-[#6172F3]" },
  { kategori: "Visual & Kinestetik", persentase: "0%", color: "bg-[#6172F3]" },
  {
    kategori: "Auditori &  Kinestetik",
    persentase: "0%",
    color: "bg-[#6172F3]",
  },
]);

const arrIq = ref([
  { kategori: "> 119", persentase: "0%", color: "bg-[#175CD3]" },
  { kategori: "111 - 119", persentase: "0%", color: "bg-[#1570EF]" },
  { kategori: "91 - 110", persentase: "0%", color: "bg-[#2E90FA]" },
  { kategori: "80 - 90", persentase: "0%", color: "bg-[#53B1FD]" },
  { kategori: "< 80", persentase: "0%", color: "bg-[#84CAFF]" },
]);

watch(smkn64Data, () => {
  if (smkn64Data.value) {
    processJatidiriKarirData();
  }

});
</script>
