<template>
    <div class="flex flex-col">
        <h1 class="font-myFont font-semibold text-center text-dark text-lg mb-4">Rangkuman Tipe Kecerdasan</h1>

        <p class="mx-2 text-start font-myFont text-sm text-gray-600 mb-2">
            Tipe kecerdasan Neokorteks Kiri yang berarti melihat kepada logika anda, yang
membuat anda rasional & objektif
        </p>
        <p class="mx-2 text-start font-myFont text-sm text-gray-600">
            Tipe kecerdasan tersebut dikendalikan dari luar diri anda menuju kedalam diri anda,
paling berorientasi pada hasil, anda memiliki keseimbangan dari dunia material dan
spiritual, penuh kekuatan, ambisi dan orientasi pada harta, namun juga royal. Pola
dasar ini memahami keberadaan uang sebagai alat, melambangkan sikap seorang
pemimpin dan pebisnis yang memiliki mimpi dan rencana yang besar, mampu melihat
peluang di balik yang tidak disadari orang lain, sehingga anda mahir menjadi
komandan pada satu organisasi.
        </p>
    </div>
</template>

<script>
export default {
    setup(){
        const userResultDetect = JSON.parse(localStorage.getItem('userResult'))

        return {
            userResultDetect
        }
    }
}
</script>