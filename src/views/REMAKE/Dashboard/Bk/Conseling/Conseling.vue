<template>
  <Layout>
    <div class="bg-gray-100 min-h-screen p-5">
      <div class="w-full md:w-4/5 mx-auto">
        <!-- Navigation -->
        <div class="flex mb-5">
          <div class="bg-gray-400 flex p-3 rounded-full text-xs gap-5">
            <button
              v-for="(nav, index) in navigations"
              :key="index"
              @click="currentStatus = nav.status"
              :class="[
                'py-2 px-7 rounded-full inline-flex justify-center items-center',
                currentStatus === nav.status
                  ? 'bg-biru text-white hover:bg-blue-600'
                  : 'text-biru font-semibold hover:bg-gray-50'
              ]"
            >
              {{ nav.label }}
            </button>
          </div>
        </div>

        <!-- Content -->
        <Conseling :status="currentStatus" />
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Layout from "@/Layout/Bk/Layout.vue";
import Conseling from "../../../../../components/REMAKE/Bk/Conseling.vue";
import { ref } from "vue";

const navigations = [
  { label: "Conseling Queue", status: "pengajuan" },
  { label: "Conseling Approved", status: "approved" },
  { label: "Conseling", status: "conseling" },
  { label: "Post Conseling", status: "selesai" },
];

const currentStatus = ref("pengajuan"); // default
</script>
