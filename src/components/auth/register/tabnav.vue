<template>
    <ul class="flex gap-2 mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="cursor-pointer -mb-px last:mr-0 flex-auto text-center">
            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-bind:class="{'text-secondary bg-white': openTab !== 1, 'text-white bg-secondary': openTab === 1}">
                Data Login
            </a>
        </li>
        <li class="cursor-pointer -mb-px last:mr-0 flex-auto text-center">
            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-bind:class="{'text-secondary bg-white': openTab !== 2, 'text-white bg-secondary': openTab === 2}">
                Data Diri
            </a>
        </li>
        <li class="cursor-pointer -mb-px last:mr-0 flex-auto text-center">
            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-bind:class="{'text-secondary bg-white': openTab !== 3, 'text-white bg-secondary': openTab === 3}">
                Pembayaran
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'TabNav'
}
</script>