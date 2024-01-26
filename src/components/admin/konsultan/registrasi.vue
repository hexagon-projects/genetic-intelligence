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
            <div class="w-full px-7 mx-auto">
                <div class="flex flex-col bg-white w-full p-6 rounded-lg shadow-lg">
                    <h1 class="font-myFont text-dark text-lg mb-4">Registrasi Konsultan</h1>
                    <form class="w-full">
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block tracking-wide font-myFont text-dark font-sm mb-2" for="grid-first-name">
                                Nama Depan
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" id="grid-last-name" type="text" placeholder="Doe">
                            <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                            <label class="block tracking-wide font-myFont text-dark font-sm mb-2" for="grid-last-name">
                                Nama Belakang
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Doe">
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block tracking-wide font-myFont text-dark font-sm mb-2" for="grid-first-name">
                                Email
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="email@email.com">
                            <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                            <label class="block tracking-wide font-myFont text-dark font-sm mb-2" for="grid-last-name">
                                Password
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Password">
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block tracking-wide font-myFont text-dark font-sm mb-2" for="grid-first-name">
                                Tempat Lahir
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Contoh: Bandung">
                            <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                            <label class="block tracking-wide font-myFont text-dark font-sm mb-2" for="grid-last-name">
                                Tanggal Lahir
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="date" placeholder="Doe">
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block tracking-wide font-myFont text-dark font-sm mb-2" for="grid-first-name">
                                Jenis Kelamin
                            </label>
                            <div class="relative">
                                <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-biru">
                                <option value="" selected disabled>Pilih Jenis Kelamin</option>
                                <option value="1">Laki - Laki</option>
                                <option value="2">Perempuan</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                            <label class="block tracking-wide font-myFont text-dark font-sm mb-2" for="grid-last-name">
                                No Whatsapp
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="08xxxxxxx">
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                            <label class="block tracking-wide font-myFont text-dark font-sm mb-2" for="grid-password">
                                Fee
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" id="grid-last-name" type="text" placeholder="Contoh: 500000">
                            <!-- <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> -->
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                            <label class="block tracking-wide font-myFont text-dark font-sm mb-2" for="grid-password">
                                Alamat
                            </label>
                            <textarea rows="4" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" id="grid-last-name" type="text" placeholder="Alamat"></textarea>
                            <!-- <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> -->
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>