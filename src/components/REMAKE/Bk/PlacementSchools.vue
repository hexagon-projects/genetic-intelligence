<template>
  <div class="bg-white p-5 rounded-2xl">
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <div class="flex gap-3 bg-gray-100 py-2 px-3 rounded-full items-center">
        <img src="@/assets/icons/basic.svg" class="w-5" alt="contact" />
        <small class="font-sora font-semibold">Placment Schools</small>
      </div>
    </div>
    <!-- Address tampil -->
    <div>
      <div v-if="placementData.length > 0">
        <div v-for="(item, index) in placementData" :key="index">
          <div class="grid grid-cols-1 md:grid-cols-10 mb-3 items-start">
            <div class="flex flex-col gap-2 md:col-span-4">
              <small class="font-sora font-semibold text-gray-500">Schools</small>
              <small class="font-sora font-semibold">{{
                item.institution.name
              }}</small>
            </div>
            <div class="flex flex-col gap-2 md:col-span-2">
              <small class="font-sora font-semibold text-gray-500">Ragion</small>
              <small class="font-sora font-semibold">{{
                item.institution.region
              }}</small>
            </div>
            <div class="flex flex-col gap-2 md:col-span-3">
              <div class="md:grid md:grid-cols-2 gap-2 flex justify-between items-center">
                <div>
                  <span class="text-gray-800 font-medium">Home Base</span>
                  <p class="text-sm text-gray-500">
                    Switch For the primary Placement
                  </p>
                </div>
  
                <!-- Checkbox Toggle dengan kondisi -->
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="home_base"
                    class="sr-only"
                    :checked="activeHomeBaseId === item.id"
                    @change="setPrimary(item.id)"
                  />
                  <div
                    class="toggle-bg w-16 h-9 rounded-full relative transition-colors duration-300"
                    :class="
                      activeHomeBaseId === item.id
                        ? 'bg-biru'
                        : 'bg-gray-300'
                    "
                  >
                    <div
                      class="toggle-circle w-7 h-7 bg-white rounded-full absolute top-1 shadow transition-all duration-300"
                      :style="{
                        left:
                          activeHomeBaseId === item.id
                            ? 'calc(100% - 2.25rem)'
                            : '0.25rem',
                      }"
                    ></div>
                  </div>
                </label>
              </div>
            </div>
            <div class="flex flex-col gap-2 md:col-span-1">
              <small class="font-sora font-semibold text-gray-500"
                >Document</small
              >
              <a
                :href="`${baseURL}/storage/${item.file}`"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 underline text-sm"
              >
                View Doc
              </a>
            </div>
          </div>
          <hr class="my-3" />
        </div>

      </div>
      <div v-else class="text-center text-gray-500 text-sm italic mt-4 my-5">
        There is no school placement data yet.
      </div>

      <div class="flex flex-col gap-2 items-start md:col-span-2">
        <RouterLink
          :to="{ name: 'bk.views.placement' }"
          class="flex gap-3 items-center cursor-pointer bg-primary text-white px-3 py-2 rounded-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-folder-plus bg-white bg-opacity-25 rounded-sm p-1 w-5"
            viewBox="0 0 16 16"
          >
            <path
              d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z"
            />
            <path
              d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5"
            />
          </svg>
          <small class="font-sora text-xs">Add new Placement</small>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import initAPI from "@/api/api";
import Cookies from "js-cookie";
import { useStore } from "vuex";

const props = defineProps(["userDatas"]);

const emit = defineEmits(["placementUpdated"]);

const placementData = ref([]);
const baseURL =
  import.meta.env.VITE_API_BASE_URL_STORAGE || "http://127.0.0.1:8000";

const activeHomeBaseId = ref(null);

const getPlacementData = async () => {
  const token = Cookies.get("token");
  try {
    const response = await initAPI("get", "placement", null, token);
    placementData.value = response.data.data;
    emit("placementUpdated", placementData.value.length > 0);

    // Cek yang home_base === 'Primary'
    const primary = placementData.value.find(
      (item) => item.home_base === "Primary"
    );
    activeHomeBaseId.value = primary?.id || null;
  } catch (error) {
    console.error("Gagal ambil data placement", error);
  }
};

const setPrimary = async (id) => {
  if (activeHomeBaseId.value === id) return;

  const token = Cookies.get("token");
  try {
    const form = new FormData();
    form.append("placement_id", id); // sesuaikan dengan backend
    form.append("home_base", "Primary");

    const response = await initAPI("post", "placement/set-primary", form, token); // endpoint custom

    if (response.status === 200) {
      activeHomeBaseId.value = id;
      await getPlacementData(); // refresh data
    }
  } catch (error) {
    console.error("Gagal set primary", error);
  }
};


onMounted(async () => {
  await getPlacementData();
});
</script>

<style scoped>
/* Custom animations */
.toggle-switch {
  transition: all 0.3s ease;
}

.toggle-circle {
  transition: transform 0.3s ease;
}

.toggle-switch:checked + .toggle-bg {
  background-color: #10b981;
}

.toggle-switch:focus + .toggle-bg {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
}
</style>
