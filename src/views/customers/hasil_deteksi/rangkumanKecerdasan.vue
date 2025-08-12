<template>
    <div v-if="rangkumanKecerdasan" class="bg-white rounded-lg shadow-sm p-4 h-full overflow-hidden">
        <div class="flex flex-col">
            <div v-html="rangkumanKecerdasan.value"></div>
            <!-- <h1 class="font-myFont font-semibold text-center text-dark text-lg mb-4">Rangkuman Tipe Kecerdasan</h1>
    
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
            </p> -->
        </div>
    </div>
</template>

<script>
export default {
    props: ['gimDatas'],
    setup(props){
        const userResultDetect = JSON.parse(localStorage.getItem('userResult'))

        console.log(`rangkuman`, props)
        const rangkumanKecerdasan = props.gimDatas[1]

        return {
            userResultDetect,
            rangkumanKecerdasan
        }
    }
}
</script>