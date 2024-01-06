<template>
<div class="bg-secondary h-screen">
  <div class="container mx-auto items-center">
      <div class="flex flex-col flex-wrap items-center min-h-screen justify-center">
        <h1 class="font-myFont mx-4 font-semibold text-white text-center text-2xl md:text-4xl lg:text-5xl mb-4">Daftar untuk konsultasi sekarang juga!</h1>
        <div class="bg-white p-8 mx-2 shadow-lg rounded-xl">
          <div class="flex flex-wrap justify-center">
              <h1 class="font-myFont font-medium mb-4">
                  Sudah punya akun? 
                  <router-link :to="{name: 'views.login'}" class="hover:text-secondary">Klik Untuk Masuk</router-link>
              </h1>
              <div class="w-full">
              <ul class="flex gap-2 mb-0 list-none flex-wrap pt-2 pb-2 flex-row">
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
              <div class="flex flex-col bg-white w-full mb-6 shadow-lg rounded">
                  <div class="px-4 py-5 flex-auto">
                  <div class="tab-content tab-space">
                     <!-- <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}"> -->
                      <!-- </div> -->
                      <div v-if="openTab === 1">
                        <div class="flex gap-4">
                          <input type="email" name="email" class="rounded-md border border-gray-300 w-full py-2 px-3" placeholder="Email">
                          <input type="password" name="password" class="rounded-md border border-gray-300 w-full py-2 px-3" placeholder="Password">
                        </div>
                      </div>

                      <div v-else-if="openTab === 2">
                        <div class="grid grid-cols-2 gap-4">
                          <div class="col-span-1">
                            <label for="input1" class="block text-sm myFont font-medium text-gray-700">Label 1</label>
                            <input type="text" id="input1" name="input1" class="mt-1 p-2 w-full border rounded-md">
                          </div>

                          <div class="col-span-1">
                            <label for="input2" class="block text-sm myFont font-medium text-gray-700">Label 2</label>
                            <input type="text" id="input2" name="input2" class="mt-1 p-2 w-full border rounded-md">
                          </div>

                          <div class="col-span-1">
                            <label for="input3" class="block text-sm myFont font-medium text-gray-700">Label 3</label>
                            <input type="text" id="input3" name="input3" class="mt-1 p-2 w-full border rounded-md">
                          </div>

                          <div class="col-span-1">
                            <label for="input4" class="block text-sm myFont font-medium text-gray-700">Label 4</label>
                            <input type="text" id="input4" name="input4" class="mt-1 p-2 w-full border rounded-md">
                          </div>

                          <div class="col-span-1">
                            <label for="input5" class="block text-sm myFont font-medium text-gray-700">Label 5</label>
                            <input type="text" id="input5" name="input5" class="mt-1 p-2 w-full border rounded-md">
                          </div>

                          <div class="col-span-1">
                            <label for="input6" class="block text-sm myFont font-medium text-gray-700">Label 6</label>
                            <input type="text" id="input6" name="input6" class="mt-1 p-2 w-full border rounded-md">
                          </div>

                          <div class="col-span-full">
                            <label for="alamat" class="block text-sm font-myFont font-medium text-gray-700">Alamat</label>
                            <textarea name="alamat" class="mt-1 p-2 w-full border rounded-md"></textarea>
                          </div>
                        </div>
                      </div>

                      <div v-else="openTab === 3">
                        <p>
                            Efficiently unleash cross-media information without
                            cross-media value. Quickly maximize timely deliverables for
                            real-time schemas.
                            <br />
                            <br />
                            mohamad andre rahmat
                        </p>
                      </div>
                      
                  </div>
                  </div>
              </div>
              <div class="flex justify-between items-center">
                  <button v-if="openTab > 1" @click="toggleTabs(-1)" class="shadow-lg text-white font-myFont bg-gray-500 hover:opacity-80 px-4 py-2 rounded-lg">
                      Sebelumnya
                  </button>
                  <button @click="handleButtonClick()" :class="{ 'ml-auto': openTab === 1 }" class="shadow-lg text-white font-myFont bg-secondary hover:opacity-80 px-4 py-2 rounded-lg">
                    {{ openTab === 3 ? 'Bayar' : 'Selanjutnya' }}
                  </button>
              </div>
              </div>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "emerald-tabs",
  setup() {
    const openTab = ref(1);

    const toggleTabs = (increment) => {
      const currTab = openTab.value + increment;

      if (currTab >= 1 && currTab <= 3) {
        openTab.value = currTab;
      }
    };

    const handleButtonClick = () => {
    if (openTab.value === 3) {
      // hitApiBayar();
      alert('goblog sia')
    } else {
      toggleTabs(1);
    }

  };

    return {
      openTab,
      toggleTabs,
      handleButtonClick
    };
  },
};
</script>

<!-- <div class="bg-secondary h-screen">
    <div class="container mx-auto">
      <div class="flex flex-wrap items-center h-screen">
        <div class="w-full">
          <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a class="text-xs border font-myFont font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{'text-black bg-white': openTab !== 1, 'text-secondary bg-white': openTab === 1}">
                Data Diri
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a class="text-xs border font-myFont font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{'text-black bg-white': openTab !== 2, 'text-secondary bg-white': openTab === 2}">
                Data Login
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a class="text-xs border font-myFont font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(3)" v-bind:class="{'text-black bg-white': openTab !== 3, 'text-white bg-emerald-600': openTab === 3}">
                Pembarayan
              </a>
            </li>
          </ul>
          <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div class="px-4 py-5 flex-auto">
              <div class="tab-content tab-space">
                <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                  <p>
                    Collaboratively administrate empowered markets via
                    plug-and-play networks. Dynamically procrastinate B2C users
                    after installed base benefits.
                    <br />
                    <br />
                    Dramatically visualize customer directed convergence
                    without revolutionary ROI.
                  </p>
                </div>
                <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                  <p>
                    Completely synergize resource taxing relationships via
                    premier niche markets. Professionally cultivate one-to-one
                    customer service with robust ideas.
                    <br />
                    <br />
                    Dynamically innovate resource-leveling customer service for
                    state of the art customer service.
                  </p>
                </div>
                <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
                  <p>
                    Efficiently unleash cross-media information without
                    cross-media value. Quickly maximize timely deliverables for
                    real-time schemas.
                    <br />
                    <br />
                    Dramatically maintain clicks-and-mortar solutions
                    without functional solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div> -->

<!-- <div class="flex gap-4 mb-2">
  <input type="text" name="email" class="rounded-md border border-gray-300 w-full py-2 px-3" placeholder="Nama Depan">
  <input type="text" name="password" class="rounded-md border border-gray-300 w-full py-2 px-3" placeholder="Nama Belakang">
</div>
<div class="flex gap-4 mb-2">
  <input type="text" name="email" class="rounded-md border border-gray-300 w-full py-2 px-3" placeholder="Email">
  <input type="text" name="password" class="rounded-md border border-gray-300 w-full py-2 px-3" placeholder="Password">
</div> -->