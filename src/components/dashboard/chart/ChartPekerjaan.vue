<template>
    <div class="lg:w-1/2">
        <div class="flex flex-col gap-4">
            <div class="bg-white rounded-lg shadow-xl p-4 h-full overflow-hidden">
                <div class="flex flex-col justify-center">
                    <h1 class="font-myFont text-center text-black text-xl font-semibold mb-4">Pilihan pekerjaan yang tepat untukmu</h1>
                    <div class="w-1/2 self-center">
                        <canvas id="chartPekerjaan"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { onMounted } from 'vue'

export default {
    name: 'ChartPekerjaan',
    setup(){
        onMounted(() => {
            const ctx = document.getElementById('chartPekerjaan');
            const dataPendidikan = {
                labels: ['Peternakan', 'Sistem Informasi', 'Kedokteran', 'Esport'],
                datasets: [
                    {
                    label: 'Persentase',
                    data: [300, 50, 100],
                    backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
                    hoverOffset: 8,
                    },
                ],
            };

            const chartPendidikan = new Chart(ctx, {
                type: 'doughnut',
                data: dataPendidikan,
                options: {
                    plugins: {
                        legend: {
                            position: 'top',
                            align: 'center',
                            labels: {
                                boxWidth: 15,
                            },
                        },
                        doughnutLabel: {
                            labels: [
                                {
                                    text: 'Pilihan pendidikan yang tepat untukmu',
                                    font: {
                                    size: '14',
                                    },
                                    color: '#111',
                                },
                                {
                                    text: 'Total',
                                    font: {
                                    size: '12',
                                    },
                                    color: '#111',
                                },
                                {
                                    text: '450',
                                    font: {
                                    size: '16',
                                    weight: 'bold',
                                    },
                                    color: '#111',
                                },
                            ],
                            align: 'start',
                        },
                    },
                },
            });
        });
    }
}
</script>