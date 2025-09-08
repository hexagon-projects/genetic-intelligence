<script setup>
import Brain from '../../../../../assets/icons/brain.webp'
</script>

<script>
import Cookies from 'js-cookie'
import initAPI from '../../../../../api/api';
import NewButton from '../../../../../components/customer/NewButton.vue';

export default {
  data() {
    return {
      currentStep: 1,
      token: Cookies.get('token'),
      userData: JSON.parse(localStorage.getItem('userData') || '{}'),
      apiData: null,
      loading: true,
      activeDropdown2: null,
      activeDropdown3: null,
      chartData: {
        labels: [],
        values: []
      },
      donutData: {
        corakPikir: '',
        corakPikirScore: 0,
        pola: '',
        rw: 0,
        sw: 0
      }
    }
  },
  computed: {
    isPrevDisabled() {
      return this.currentStep === 1;
    },
    buttonText() {
      return this.currentStep === 3 ? "Selesai" : "Selanjutnya";
    },
    iqData() {
      if (!this.apiData) return { iq: '0', description: '' };
      return {
        iq: this.apiData.iq?.iq || '0',
        description: this.apiData.iq?.description || 'Data tidak tersedia'
      };
    },
    dropdownData2() {
      if (!this.apiData?.aspek) return [];
      return [
        {
          title: "Kemampuan Umum",
          content: this.apiData.aspek['kemampuan-Umum']?.description || 'Data tidak tersedia',
          score: this.apiData.aspek['kemampuan-Umum']?.score || 0,
          kategori: this.apiData.aspek['kemampuan-Umum']?.kategori || 'Tidak tersedia'
        },
        {
          title: "Daya Tangkap",
          content: this.apiData.aspek['daya-tangkap']?.description || 'Data tidak tersedia',
          score: this.apiData.aspek['daya-tangkap']?.score || 0,
          kategori: this.apiData.aspek['daya-tangkap']?.kategori || 'Tidak tersedia'
        },
        {
          title: "Daya Ingat",
          content: this.apiData.aspek['daya-ingat']?.description || 'Data tidak tersedia',
          score: this.apiData.aspek['daya-ingat']?.score || 0,
          kategori: this.apiData.aspek['daya-ingat']?.kategori || 'Tidak tersedia'
        },
        {
          title: "Daya Analisa Sintesa",
          content: this.apiData.aspek['daya-analisa-sintesa']?.description || 'Data tidak tersedia',
          score: this.apiData.aspek['daya-analisa-sintesa']?.score || 0,
          kategori: this.apiData.aspek['daya-analisa-sintesa']?.kategori || 'Tidak tersedia'
        }
      ];
    },
    dropdownData3() {
      if (!this.apiData?.aspek) return [];
      return [
        {
          title: "Penalaran Verbal",
          content: this.apiData.aspek['penalaran-verbal']?.description || 'Data tidak tersedia',
          score: this.apiData.aspek['penalaran-verbal']?.score || 0,
          kategori: this.apiData.aspek['penalaran-verbal']?.kategori || 'Tidak tersedia'
        },
        {
          title: "Penalaran Non Verbal",
          content: this.apiData.aspek['penalaran-non-verbal']?.description || 'Data tidak tersedia',
          score: this.apiData.aspek['penalaran-non-verbal']?.score || 0,
          kategori: this.apiData.aspek['penalaran-non-verbal']?.kategori || 'Tidak tersedia'
        },
        {
          title: "Kemampuan Numerik",
          content: this.apiData.aspek['kemampuan-numerik']?.description || 'Data tidak tersedia',
          score: this.apiData.aspek['kemampuan-numerik']?.score || 0,
          kategori: this.apiData.aspek['kemampuan-numerik']?.kategori || 'Tidak tersedia'
        },
        {
          title: "Logika Berpikir",
          content: this.apiData.aspek['logika-berpikir']?.description || 'Data tidak tersedia',
          score: this.apiData.aspek['logika-berpikir']?.score || 0,
          kategori: this.apiData.aspek['logika-berpikir']?.kategori || 'Tidak tersedia'
        },
        {
          title: "Antisipasi",
          content: this.apiData.aspek['Antisipasi']?.description || 'Data tidak tersedia',
          score: this.apiData.aspek['Antisipasi']?.score || 0,
          kategori: this.apiData.aspek['Antisipasi']?.kategori || 'Tidak tersedia'
        }
      ];
    },
    polaDescription() {
      return this.apiData?.pola?.pola_desc || 'Data tidak tersedia';
    },
    corakDescription() {
      const desc = this.apiData?.['corak-fikir']?.corakPikirDesc || 'Data tidak tersedia';
      return desc.replace(/<[^>]*>/g, '');
    },
    // Add computed property to get IST scores
    istScores() {
      if (!this.apiData?.ist) return {};
      return {
        se: this.apiData.ist.se || 0,
        wa: this.apiData.ist.wa || 0,
        an: this.apiData.ist.an || 0,
        ge: this.apiData.ist.ge || 0,
        ra: this.apiData.ist.ra || 0,
        zr: this.apiData.ist.zr || 0,
        fa: this.apiData.ist.fa || 0,
        wu: this.apiData.ist.wu || 0,
        me: this.apiData.ist.me || 0,
        rw: this.apiData.ist.rw || 0,
        sw: this.apiData.ist.sw || 0
      };
    },
    // Add computed property to get grafikStandar data
    grafikStandarData() {
      if (!this.apiData?.grafikStandar) return {};
      return this.apiData.grafikStandar;
    }
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true;
        const customerId = this.userData?.id;
        if (!customerId) {
          console.error('Customer ID tidak ditemukan');
          return;
        }

        const response = await initAPI('GET', `customers/ist?customer_id=${customerId}`, null, this.token);
        console.log(response)

        if (response.data && response.data.data) {
          this.apiData = response.data.data;
          this.setupChartData();
          this.setupDonutData();
        }
      } catch (error) {
        console.error('Error fetching IST data:', error);
      } finally {
        this.loading = false;
      }
    },
    async downloadPDF() {
      try {
        this.downloadLoading = true;
        const userId = this.userData?.id;
        
        if (!userId) {
          console.error('User ID tidak ditemukan');
          return;
        }

        // Membuat request ke API
        const response = await fetch(`https://api.jatidiri.app/api/result-ist/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Gagal mengunduh PDF');
        }

        // Mengubah response menjadi blob
        const blob = await response.blob();
        
        // Membuat URL objek dari blob
        const url = window.URL.createObjectURL(blob);
        
        // Membuat elemen anchor untuk download
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `hasil-ist-${userId}.pdf`;
        
        // Menambahkan ke DOM dan melakukan klik
        document.body.appendChild(a);
        a.click();
        
        // Membersihkan
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
      } catch (error) {
        console.error('Error downloading PDF:', error);
        alert('Gagal mengunduh PDF. Silakan coba lagi.');
      } finally {
        this.downloadLoading = false;
      }
    },
    setupChartData() {
      if (!this.apiData?.grafikStandar) return;

      const grafikStandar = this.apiData.grafikStandar;
      const labels = ['SE', 'WA', 'AN', 'GE', 'RA', 'ZR', 'FA', 'WU', 'ME'];
      const values = [];

      labels.forEach(label => {
        const data = grafikStandar[label.toLowerCase()];
        values.push(data?.sw || 0);
      });

      this.chartData = {
        labels: labels,
        values: values
      };
    },
    setupDonutData() {
      if (!this.apiData) return;

      const rw = this.apiData.ist?.rw || 0;
      const sw = this.apiData.ist?.sw || 0;

      this.donutData = {
        corakPikir: this.apiData['corak-fikir']?.corakPikir || 'Data tidak tersedia',
        corakPikirScore: this.apiData['corak-fikir']?.corakPikirScore || 0,
        pola: this.apiData.pola?.pola || 'W',
        rw: rw,
        sw: sw
      };
    },
    goNext() {
      if (this.currentStep < 3) {
        this.currentStep++;
      } else if (this.currentStep === 3) {
        this.$router.push('/');
      }
    },
    goBack() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    toggleDropdown2(index) {
      this.activeDropdown2 = this.activeDropdown2 === index ? null : index;
    },
    toggleDropdown3(index) {
      this.activeDropdown3 = this.activeDropdown3 === index ? null : index;
    },
    drawChart() {
      const canvas = this.$refs.chartCanvas;
      if (!canvas || this.chartData.labels.length === 0) return;

      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const padding = { top: 20, right: 30, bottom: 40, left: 40 };
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;

      const minY = 50;
      const maxY = 170;
      const yRange = maxY - minY;

      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 1;

      for (let i = 0; i <= 6; i++) {
        const y = padding.top + (chartHeight / 6) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(padding.left + chartWidth, y);
        ctx.stroke();
      }

      for (let i = 0; i < this.chartData.labels.length; i++) {
        const x = padding.left + (chartWidth / (this.chartData.labels.length - 1)) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, padding.top + chartHeight);
        ctx.stroke();
      }

      ctx.fillStyle = '#6B7280';
      ctx.font = '12px Arial';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      for (let i = 0; i <= 6; i++) {
        const value = maxY - (yRange / 6) * i;
        const y = padding.top + (chartHeight / 6) * i;
        ctx.fillText(Math.round(value).toString(), padding.left - 10, y);
      }

      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      this.chartData.labels.forEach((label, i) => {
        const x = padding.left + (chartWidth / (this.chartData.labels.length - 1)) * i;
        ctx.fillText(label, x, padding.top + chartHeight + 10);
      });

      const points = this.chartData.values.map((value, i) => ({
        x: padding.left + (chartWidth / (this.chartData.labels.length - 1)) * i,
        y: padding.top + chartHeight - ((value - minY) / yRange) * chartHeight
      }));

      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();

      points.forEach((point, i) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);

        const minValue = Math.min(...this.chartData.values);
        if (this.chartData.values[i] === minValue) {
          ctx.fillStyle = '#EF4444';
        } else {
          ctx.fillStyle = '#3B82F6';
        }
        ctx.fill();
      });
    },
    drawDonutChart() {
      const canvas = this.$refs.donutCanvas;
      if (!canvas) return;

      const container = canvas.parentElement;
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      this.$nextTick(() => {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        const width = rect.width || 300;
        const height = rect.height || 200;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);

        ctx.clearRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;
        const outerRadius = Math.min(width, height) / 3;
        const innerRadius = outerRadius * 0.5;

        const rwPercentage = Math.round((this.donutData.rw / (this.donutData.rw + this.donutData.sw)) * 100);
        const swPercentage = 100 - rwPercentage;

        const data = [
          { label: 'RW (Corak Berfikir)', value: rwPercentage, color: '#EF4444' },
          { label: 'SW (Cara Berfikir)', value: swPercentage, color: '#6366F1' }
        ];

        const total = data.reduce((sum, item) => sum + item.value, 0);
        let currentAngle = -Math.PI / 2;

        data.forEach((segment) => {
          const sliceAngle = (segment.value / total) * 2 * Math.PI;

          ctx.beginPath();
          ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle);
          ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
          ctx.closePath();
          ctx.fillStyle = segment.color;
          ctx.fill();

          currentAngle += sliceAngle;
        });

        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius * 0.8, 0, 2 * Math.PI);
        ctx.fillStyle = '#FEF3C7';
        ctx.fill();

        const iconRadius = innerRadius * 0.3;

        ctx.beginPath();
        ctx.arc(centerX, centerY - iconRadius * 0.2, iconRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#F59E0B';
        ctx.fill();

        ctx.fillStyle = '#374151';
        ctx.fillRect(centerX - iconRadius * 0.4, centerY + iconRadius * 0.3, iconRadius * 0.8, iconRadius * 0.4);

        ctx.strokeStyle = '#DC2626';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(centerX - iconRadius * 0.3, centerY - iconRadius * 0.3, iconRadius * 0.2, 0, Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX + iconRadius * 0.3, centerY - iconRadius * 0.1, iconRadius * 0.2, Math.PI, 2 * Math.PI);
        ctx.stroke();

        ctx.fillStyle = '#6B7280';
        ctx.font = '11px Arial';

        const angle1 = -Math.PI / 4;
        const labelRadius = outerRadius + 20;
        const label1X = centerX + Math.cos(angle1) * labelRadius;
        const label1Y = centerY + Math.sin(angle1) * labelRadius;

        ctx.strokeStyle = '#E5E7EB';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX + Math.cos(angle1) * outerRadius, centerY + Math.sin(angle1) * outerRadius);
        ctx.lineTo(label1X, label1Y);
        ctx.stroke();

        ctx.textAlign = 'left';
        ctx.fillText('Corak Berfikir', label1X + 5, label1Y);

        const angle2 = 3 * Math.PI / 4;
        const label2X = centerX + Math.cos(angle2) * labelRadius;
        const label2Y = centerY + Math.sin(angle2) * labelRadius;

        ctx.beginPath();
        ctx.moveTo(centerX + Math.cos(angle2) * outerRadius, centerY + Math.sin(angle2) * outerRadius);
        ctx.lineTo(label2X, label2Y);
        ctx.stroke();

        ctx.textAlign = 'right';
        ctx.fillText('Cara Berfikir', label2X - 5, label2Y);
      });
    }
  },
  async mounted() {
    await this.fetchData();

    this.$nextTick(() => {
      if (this.currentStep === 2) {
        this.drawChart();
      } else if (this.currentStep === 3) {
        this.drawDonutChart();
      }
    });

    window.addEventListener('resize', () => {
      setTimeout(() => {
        if (this.currentStep === 2) {
          this.drawChart();
        } else if (this.currentStep === 3) {
          this.drawDonutChart();
        }
      }, 100);
    });
  },
  updated() {
    this.$nextTick(() => {
      if (this.currentStep === 2) {
        this.drawChart();
      } else if (this.currentStep === 3) {
        this.drawDonutChart();
      }
    });
  }
}
</script>

<template>
  <div class="w-full p-4 min-h-screen bg-[#F1F7FD] font-sora">
    <div
      class="w-full h-full md:max-w-[50%] lg:max-w-[35%] xl:max-w-[30%] mx-auto space-y-4 md:space-y-6 lg:space-y-8 relative pb-36">
      <div class="flex justify-center items-center gap-4 animate-fadeIn">
        <div class="py-1 px-3 rounded-lg bg-[#DBE0FD] w-fit transform transition-all duration-300 hover:scale-105">
          <p class="text-sm md:text-sm text-[#374151] font-medium">Hasil Tes</p>
        </div>
        <h1 class="text-base md:text-base font-semibold text-black">Intelligenz Struktur Test (IST)</h1>
      </div>

      <div v-if="loading" class="text-center py-8">
        <p class="text-gray-500">Memuat data...</p>
      </div>

      <template v-else>
        <div class="">
          <p class="text-left text-[10px] text-[#9A9A9A]">{{ currentStep }}/3</p>
          <div class="w-full grid grid-cols-3 gap-4 transition-all duration-700 ease-in-out">
            <div class="relative" v-for="(step, index) in 3" :key="index">
              <div class="w-full h-2 rounded-lg bg-[#EFEFEF] transition-all duration-300"></div>
              <div
                class="absolute inset-0 h-2 rounded-lg bg-primary transition-all duration-700 ease-in-out transform origin-left"
                :class="{ 'w-full scale-x-100': currentStep > index + 1, 'w-full scale-x-100': currentStep === index + 1, 'w-0 scale-x-0': currentStep < index + 1 }">
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6" v-if="currentStep === 1">
          <div class="w-full h-[256px] bg-white rounded-xl object-contain flex justify-center items-center">
            <img :src="Brain" alt="Hasil IST" class="py-4 w-[50%] max-h-[256px] mx-auto rounded-xl object-contain">
          </div>
          <div class="text-center space-y-3">
            <h5 class="text-xl font-medium">IQ {{ iqData.iq }}</h5>
            <p class="text-base" v-html="iqData.description"></p>
          </div>

        </div>

        <div class="space-y-6" v-if="currentStep === 2">
          <div class="w-full space-y-3">
            <div class="w-full h-fit bg-white rounded-xl p-4 shadow-sm">
              <div class="w-full h-full flex flex-col">
                <h3 class="text-sm font-medium text-gray-700 mb-2">Grafik Skoring</h3>
                <div class="flex-1 relative">
                  <canvas ref="chartCanvas" class="w-full h-full"></canvas>
                </div>
              </div>
            </div>
            <p class="text-justify text-base" v-html="polaDescription"></p>
          </div>

          <div class="space-y-3">
            <div class="space-y-2" v-for="(item, index) in dropdownData2" :key="index">
              <div class="flex items-center gap-4 cursor-pointer" @click="toggleDropdown2(index)">
                <p class="text-base text-[#A4A4A4]" :class="{ 'text-black': activeDropdown2 === index }">{{ item.title
                }}
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none"
                  :class="{ 'rotate-180': activeDropdown2 === index }" class="transition-transform duration-300">
                  <path
                    d="M10.2652 4.76517C10.4116 4.61872 10.4116 4.38128 10.2652 4.23484C10.1187 4.08839 9.88128 4.08839 9.73484 4.23483L7.14904 6.82062C6.51444 7.45522 5.48555 7.45522 4.85095 6.82062L2.26517 4.23484C2.11872 4.08839 1.88128 4.08839 1.73484 4.23483C1.58839 4.38128 1.58839 4.61872 1.73484 4.76516L4.32062 7.35095C5.24811 8.27845 6.75188 8.27845 7.67937 7.35095L10.2652 4.76517Z"
                    fill="#A4A4A4" />
                </svg>
              </div>

              <div class="border-l border-primary p-2 transition-all duration-300 overflow-hidden"
                :class="activeDropdown2 === index ? ' opacity-100' : 'max-h-0 opacity-0'">
                <div class="flex gap-2 mb-2">
                  <div class="py-1 sm:py-1.5 px-3 sm:px-4 rounded-full bg-primary w-fit text-xs sm:text-sm text-white">
                    Skor {{ item.score }}
                  </div>
                  <div
                    class="py-1 sm:py-1.5 px-3 sm:px-4 rounded-full bg-gray-200 w-fit text-xs sm:text-sm text-gray-700">
                    {{ item.kategori }}
                  </div>
                </div>
                <p class="text-base font-medium">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6" v-if="currentStep === 3">
          <div class="w-full space-y-3">
            <div class="w-full h-[256px] bg-white rounded-xl p-4 shadow-sm">
              <div class="w-full h-full flex flex-col">
                <div class="flex-1 relative">
                  <canvas ref="donutCanvas" class="w-full h-full"></canvas>
                </div>
              </div>
            </div>
            <div class="text-center space-y-3">
              <h5 class="text-xl font-medium">{{ donutData.corakPikir }}</h5>
              <p class="text-base text-justify" v-html="corakDescription"></p>
            </div>
          </div>

          <div class="space-y-3">
            <div class="space-y-2" v-for="(item, index) in dropdownData3" :key="index">
              <div class="flex items-center gap-4 cursor-pointer" @click="toggleDropdown3(index)">
                <p class="text-base text-[#A4A4A4]" :class="{ 'text-black': activeDropdown3 === index }">{{ item.title
                }}
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none"
                  :class="{ 'rotate-180': activeDropdown3 === index }" class="transition-transform duration-300">
                  <path
                    d="M10.2652 4.76517C10.4116 4.61872 10.4116 4.38128 10.2652 4.23484C10.1187 4.08839 9.88128 4.08839 9.73484 4.23483L7.14904 6.82062C6.51444 7.45522 5.48555 7.45522 4.85095 6.82062L2.26517 4.23484C2.11872 4.08839 1.88128 4.08839 1.73484 4.23483C1.58839 4.38128 1.58839 4.61872 1.73484 4.76516L4.32062 7.35095C5.24811 8.27845 6.75188 8.27845 7.67937 7.35095L10.2652 4.76517Z"
                    fill="#A4A4A4" />
                </svg>
              </div>

              <div class="border-l border-primary p-2 transition-all duration-300 overflow-hidden"
                :class="activeDropdown3 === index ? ' opacity-100' : 'max-h-0 opacity-0'">
                <div class="flex gap-2 mb-2">
                  <div class="py-1 sm:py-1.5 px-3 sm:px-4 rounded-full bg-primary w-fit text-xs sm:text-sm text-white">
                    Skor {{ item.score }}
                  </div>
                  <div
                    class="py-1 sm:py-1.5 px-3 sm:px-4 rounded-full bg-gray-200 w-fit text-xs sm:text-sm text-gray-700">
                    {{ item.kategori }}
                  </div>
                </div>
                <p class="text-base font-medium">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div
        class="fixed bottom-4 left-4 right-4 md:max-w-[50%] lg:max-w-[35%] xl:max-w-[30%] mx-auto space-y-4">
        <NewButton v-if="currentStep === 3" @click="downloadPDF" :text="'Download PDF'" class="font-semibold" text-size="text-sm" bg-color="bg-white"
          text-color="text-primary" border-color="border-primary" />
        <div class="flex items-center gap-2">
          <div class="w-fit">
            <button @click="goBack" :disabled="isPrevDisabled" class="rounded-full flex justify-center items-center relative z-10 border-4 border-[#7474FB]
                               shadow-[inset_0_-4px_6px_-1px_rgba(0,0,0,0.2),inset_0_4px_6px_-1px_rgba(255,255,255,0.5)]
                               transition-all duration-500 bg-primary w-14 h-14 transform active:scale-95"
              :class="{ 'opacity-50 cursor-not-allowed hover:scale-100': isPrevDisabled }">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"
                class="transition-all duration-300">
                <path
                  d="M19.9991 27.56C19.7457 27.56 19.4924 27.4667 19.2924 27.2667L10.5991 18.5734C9.18573 17.16 9.18573 14.84 10.5991 13.4267L19.2924 4.73336C19.6791 4.34669 20.3191 4.34669 20.7057 4.73336C21.0924 5.12003 21.0924 5.76003 20.7057 6.14669L12.0124 14.84C11.3724 15.48 11.3724 16.52 12.0124 17.16L20.7057 25.8534C21.0924 26.24 21.0924 26.88 20.7057 27.2667C20.5057 27.4534 20.2524 27.56 19.9991 27.56Z"
                  :fill="isPrevDisabled ? '#9A9A9A' : 'white'" />
              </svg>
            </button>
          </div>
          <button @click="goNext" :disabled="isNextDisabled" class="w-full bg-primary text-white border-[#7474FB] text-base rounded-full py-3 border-4 text-center font-sora 
                       shadow-[inset_0_-4px_6px_-1px_rgba(0,0,0,0.2),inset_0_4px_6px_-1px_rgba(255,255,255,0.6)]
                       transition-all duration-500 transform active:scale-95 relative overflow-hidden"
            :class="{ 'opacity-50 cursor-not-allowed hover:scale-100': isNextDisabled }">
            <transition name="button-text" mode="out-in">
              <span :key="buttonText" class="relative z-10">{{ buttonText }}</span>
            </transition>
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000">
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.rotate-180 {
  transform: rotate(180deg);
}

.max-h-0 {
  max-height: 0;
}

.button-text-enter-active,
.button-text-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.button-text-enter-from,
.button-text-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>