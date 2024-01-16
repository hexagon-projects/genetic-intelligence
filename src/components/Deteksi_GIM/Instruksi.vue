<template>
    <div class="hidden lg:flex lg:flex-col justify-center items-center">
        <iframe
            class="w-11/12 md:w-1/2 lg:w-3/4 mb-2 rounded-md border-4"
            width="560"
            height="315"
            :src="'https://drive.google.com/file/d/1lwTFBaXmEkgyOi4nT-DO2xfrvmfDv8jo/preview'"
            frameborder="0"
            allowfullscreen
        ></iframe>
    </div>
    <div class="lg:hidden flex flex-col justify-center items-center">
        <iframe
            class="w-full md:w-1/2 lg:w-3/4 mb-2 rounded-md border-4"
            :src="'https://drive.google.com/file/d/1lwTFBaXmEkgyOi4nT-DO2xfrvmfDv8jo/preview'"
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