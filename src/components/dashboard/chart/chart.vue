<template>
    <div class="flex flex-col lg:flex-row justify-center mx-4 py-8 gap-4">
        <ChartPendidikan/>
        <ChartPekerjaan/>
    </div>
</template>

<script>
import ChartPendidikan from './ChartPendidikan.vue';
import ChartPekerjaan from './ChartPekerjaan.vue'

export default {
    name: 'DashboardChart',
    components: {ChartPendidikan, ChartPekerjaan}
}
</script>