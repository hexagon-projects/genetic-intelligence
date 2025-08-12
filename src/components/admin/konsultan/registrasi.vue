<template>
    <section class="bg-gray-100 pb-28">
        <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 hover:text-dark text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'admin.views.konsultan'}" class="text-gray-400 hover:text-dark text-base">
                    Konsultan
                </RouterLink>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'admin.views.konsultan.register'}" class="text-base text-dark hover:text-dark/70">
                    Registrasi Konsultan
                </RouterLink>
            </ol>
        </div>

        <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 pb-10 gap-4">
            <formRegistrasi/>
        </div>
    </section>
</template>

<script>
import formRegistrasi from './form/form_registrasi.vue'

export default {
    name: 'RegistrasiKonsultan',
    components: {formRegistrasi}
}
</script>