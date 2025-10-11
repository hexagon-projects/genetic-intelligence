<template>
    <div v-if="props.siswaCerdasData !== null" class="w-full px-4 pt-5 pb-3 flex flex-col gap-[16px]">
        <div class="text-[#0c141c] text-xl font-bold font-['Roboto'] leading-7">
            Hasil Tes Jatidiri Cerdas Dewasa
        </div>

        <div class="flex flex-col">
            <h1 class="text-[#111416] text-base font-semibold font-sora leading-normal">
                IQ
            </h1>
            <span class="text-[#111416] text-base font-normal font-roboto leading-normal">
                {{ props.siswaCerdasData.iq?.iq || '0' }}
            </span>
        </div>

        <div class="flex flex-col">
            <h1 class="text-[#111416] text-base font-semibold font-sora leading-normal">
                Interpretation
            </h1>
            <span class="text-[#111416] text-base font-normal font-roboto leading-normal" 
                  v-html="props.siswaCerdasData.iq?.description || 'Data tidak tersedia'">
            </span>
        </div>

        <div class="flex flex-col gap-[12px]">
            <h1 class="text-[#111416] text-lg font-bold font-['Roboto'] text-center">
                Grafik Skoring
            </h1>
            <div class="w-full">
                <canvas ref="chartCanvas" class="mx-auto"></canvas>
            </div>
        </div>

        <div class="flex flex-col gap-[12px]">
            <h1 class="text-[#111416] text-lg font-bold font-['Roboto'] text-center">
                Corak Berpikir
            </h1>
            <div class="flex flex-col">
                <div class="w-full relative mt-4">
                    <canvas ref="donutCanvas" class="mx-auto"></canvas>
                </div>
                <h2 class="text-[#111416] text-base font-semibold font-sora leading-normal">
                    {{ props.siswaCerdasData['corak-fikir']?.corakPikir || 'Data tidak tersedia' }}
                </h2>
                <span class="text-[#111416] text-base font-normal font-['Roboto'] leading-normal mt-4"
                    v-html="props.siswaCerdasData['corak-fikir']?.corakPikirDesc || 'Data tidak tersedia'">
                </span>
            </div>
        </div>

        <div class="flex flex-col gap-[12px]">
            <h1 class="text-[#111416] text-lg font-bold font-['Roboto']">
                Pola
            </h1>
            <span class="text-[#111416] text-base font-normal font-['Roboto'] leading-normal" 
                  v-html="props.siswaCerdasData.pola?.pola_desc || 'Data tidak tersedia'">
            </span>
        </div>

        <div class="flex flex-col gap-[16px]">
            <h1 class="text-[#111416] text-lg font-bold font-['Roboto']">
                Aspek Kemampuan
            </h1>
            <div v-for="(aspek, key) in dropdownData2" :key="key" class="flex flex-col gap-[12px]">
                <div class="flex items-center justify-between cursor-pointer" @click="toggleDropdown2(key)">
                    <h2 class="text-[#111416] text-base font-semibold font-sora leading-normal">{{ aspek.title }}</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"
                        :class="{ 'rotate-180': activeDropdown2 === key }" class="transition-transform duration-300">
                        <path d="M4 6L8 10L12 6" stroke="#4B5563" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </div>

                <div class="transition-all duration-300 overflow-hidden"
                    :class="activeDropdown2 === key ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'">
                    <div class="flex gap-2 mb-3">
                        <div class="px-3 py-1 rounded-full bg-primary text-white text-sm">
                            Skor {{ aspek.score }}
                        </div>
                        <div class="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                            {{ aspek.kategori }}
                        </div>
                    </div>
                    <span class="text-[#111416] text-base font-normal font-['Roboto'] leading-normal">{{ aspek.content }}</span>
                </div>
            </div>
        </div>
    </div>
    <NotFound v-else />
</template>

<script setup>
import NotFound from "./NotFound.vue";
import { ref, computed, onMounted, nextTick } from "vue";

const props = defineProps(["siswaCerdasData"]);
const activeDropdown2 = ref(null);
const chartCanvas = ref(null);
const donutCanvas = ref(null);

console.log(`props`, props.siswaCerdasData);

const dropdownData2 = computed(() => {
    if (!props.siswaCerdasData?.aspek) return [];

    return [
        {
            title: "Kemampuan Umum",
            content: props.siswaCerdasData.aspek['kemampuan-Umum']?.description || 'Data tidak tersedia',
            score: props.siswaCerdasData.aspek['kemampuan-Umum']?.score || 0,
            kategori: props.siswaCerdasData.aspek['kemampuan-Umum']?.kategori || 'Tidak tersedia'
        },
        {
            title: "Daya Tangkap",
            content: props.siswaCerdasData.aspek['daya-tangkap']?.description || 'Data tidak tersedia',
            score: props.siswaCerdasData.aspek['daya-tangkap']?.score || 0,
            kategori: props.siswaCerdasData.aspek['daya-tangkap']?.kategori || 'Tidak tersedia'
        },
        {
            title: "Daya Ingat",
            content: props.siswaCerdasData.aspek['daya-ingat']?.description || 'Data tidak tersedia',
            score: props.siswaCerdasData.aspek['daya-ingat']?.score || 0,
            kategori: props.siswaCerdasData.aspek['daya-ingat']?.kategori || 'Tidak tersedia'
        },
        {
            title: "Daya Analisa Sintesa",
            content: props.siswaCerdasData.aspek['daya-analisa-sintesa']?.description || 'Data tidak tersedia',
            score: props.siswaCerdasData.aspek['daya-analisa-sintesa']?.score || 0,
            kategori: props.siswaCerdasData.aspek['daya-analisa-sintesa']?.kategori || 'Tidak tersedia'
        },
        {
            title: "Penalaran Verbal",
            content: props.siswaCerdasData.aspek['penalaran-verbal']?.description || 'Data tidak tersedia',
            score: props.siswaCerdasData.aspek['penalaran-verbal']?.score || 0,
            kategori: props.siswaCerdasData.aspek['penalaran-verbal']?.kategori || 'Tidak tersedia'
        },
        {
            title: "Penalaran Non Verbal",
            content: props.siswaCerdasData.aspek['penalaran-non-verbal']?.description || 'Data tidak tersedia',
            score: props.siswaCerdasData.aspek['penalaran-non-verbal']?.score || 0,
            kategori: props.siswaCerdasData.aspek['penalaran-non-verbal']?.kategori || 'Tidak tersedia'
        },
        {
            title: "Kemampuan Numerik",
            content: props.siswaCerdasData.aspek['kemampuan-numerik']?.description || 'Data tidak tersedia',
            score: props.siswaCerdasData.aspek['kemampuan-numerik']?.score || 0,
            kategori: props.siswaCerdasData.aspek['kemampuan-numerik']?.kategori || 'Tidak tersedia'
        },
        {
            title: "Logika Berpikir",
            content: props.siswaCerdasData.aspek['logika-berpikir']?.description || 'Data tidak tersedia',
            score: props.siswaCerdasData.aspek['logika-berpikir']?.score || 0,
            kategori: props.siswaCerdasData.aspek['logika-berpikir']?.kategori || 'Tidak tersedia'
        },
        {
            title: "Antisipasi",
            content: props.siswaCerdasData.aspek['Antisipasi']?.description || 'Data tidak tersedia',
            score: props.siswaCerdasData.aspek['Antisipasi']?.score || 0,
            kategori: props.siswaCerdasData.aspek['Antisipasi']?.kategori || 'Tidak tersedia'
        }
    ];
});

const donutData = computed(() => {
  if (!props.siswaCerdasData?.ist) {
    return {
      corakPikir: props.siswaCerdasData?.['corak-fikir']?.corakPikir || 'Data tidak tersedia',
      corakPikirScore: props.siswaCerdasData?.['corak-fikir']?.corakPikirScore || 0,
      pola: props.siswaCerdasData?.pola?.pola || 'W',
      rw: 0,
      sw: 0
    };
  }

  return {
    corakPikir: props.siswaCerdasData['corak-fikir']?.corakPikir || 'Data tidak tersedia',
    corakPikirScore: props.siswaCerdasData['corak-fikir']?.corakPikirScore || 0,
    pola: props.siswaCerdasData.pola?.pola || 'W',
    rw: props.siswaCerdasData.ist.rw || 0,
    sw: props.siswaCerdasData.ist.sw || 0
  };
});

const toggleDropdown2 = (index) => {
    activeDropdown2.value = activeDropdown2.value === index ? null : index;
};

const drawChart = () => {
    const canvas = chartCanvas.value;
    if (!canvas || !props.siswaCerdasData?.grafikStandar) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const padding = { top: 20, right: 30, bottom: 40, left: 40 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const grafikStandar = props.siswaCerdasData.grafikStandar;
    const labels = ['SE', 'WA', 'AN', 'GE', 'RA', 'ZR', 'FA', 'WU', 'ME'];
    const values = labels.map(label => {
        const data = grafikStandar[label.toLowerCase()];
        return data?.sw || 0;
    });

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

    for (let i = 0; i < labels.length; i++) {
        const x = padding.left + (chartWidth / (labels.length - 1)) * i;
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

    labels.forEach((label, i) => {
        const x = padding.left + (chartWidth / (labels.length - 1)) * i;
        ctx.fillText(label, x, padding.top + chartHeight + 10);
    });

    const points = values.map((value, i) => ({
        x: padding.left + (chartWidth / (labels.length - 1)) * i,
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

        const minValue = Math.min(...values);
        if (values[i] === minValue) {
            ctx.fillStyle = '#EF4444';
        } else {
            ctx.fillStyle = '#3B82F6';
        }
        ctx.fill();
    });
};

const drawDonutChart = () => {
  const canvas = donutCanvas.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2;
  const outerRadius = Math.min(width, height) / 3;
  const innerRadius = outerRadius * 0.5;

  const rwPercentage = Math.round((donutData.value.rw / (donutData.value.rw + donutData.value.sw)) * 100) || 50;
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
};

onMounted(() => {
  nextTick(() => {
    if (props.siswaCerdasData) {
      drawChart();
      drawDonutChart();
    }
  });
});
</script>

<style scoped>
.rotate-180 {
    transform: rotate(180deg);
}

.max-h-0 {
    max-height: 0;
}

.max-h-96 {
    max-height: 24rem;
}
</style>