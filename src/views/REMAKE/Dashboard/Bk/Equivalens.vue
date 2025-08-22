<template>
  <Layout>
    <div class="bg-gray-100 p-5 min-h-screen">
      <div class="w-full md:w-4/5 mx-auto">
        <main class="w-full mx-auto px-4">
          <div class="flex mb-5">
            <!-- navigation profile -->
            <NavigateProfile />
          </div>
          <Equivalen />
        </main>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Layout from "@/Layout/Bk/Layout.vue";
import NavigateProfile from "../../../../components/REMAKE/Bk/NavigateProfile.vue";
import Equivalen from "../../../../components/REMAKE/Bk/Equivalen.vue";

</script>
