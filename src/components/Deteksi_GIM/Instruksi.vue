<template>
    <div class="hidden lg:flex lg:flex-col justify-center items-center">
        <iframe
            class="w-11/12 lg:w-3/4 mb-2 rounded-md border-4"
            width="560"
            height="315"
            :src="'https://www.youtube.com/embed/jN0aELsVQFA?si=NgJw_7NvNQEk__08'"
            frameborder="0"
            allowfullscreen
        ></iframe>
    </div>
    <div class="lg:hidden flex flex-col justify-center items-center">
        <iframe
            class="w-full lg:w-3/4 mb-2 rounded-md border-4"
            :src="'https://www.youtube.com/embed/jN0aELsVQFA?si=NgJw_7NvNQEk__08'"
            frameborder="0"
            allowfullscreen
        ></iframe>
    </div>
</template>

<script>
export default {
    name: 'InstruksiDeteksi'
}
</script>