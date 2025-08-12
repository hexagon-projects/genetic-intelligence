<template>
  <div class="overflow-x-auto">
    <div
      class="flex gap-3 p-2 bg-gray-400 rounded-full text-xs min-w-max sm:justify-center"
    >
      <RouterLink
        :to="{ name: 'bk.views.profile' }"
        :class="[buttonClass, isActive('bk.views.profile')]"
      >
        Profil
      </RouterLink>

      <RouterLink
        :to="{ name: 'bk.views.placement' }"
        :class="[buttonClass, isActive('bk.views.placement')]"
      >
        Penemmpatan Tugas
      </RouterLink>

      <RouterLink
        :to="{ name: 'bk.views.submision-kta' }"
        :class="[buttonClass, isActive('bk.views.submision-kta')]"
      >
        Pengajuan KTA
      </RouterLink>
      <RouterLink
        :to="{ name: 'bk.views.journal' }"
        :class="[buttonClass, isActive('bk.views.journal')]"
      >
        Journal Harian
      </RouterLink>
      <RouterLink
        :to="{ name: 'bk.views.equivalen' }"
        :class="[buttonClass, isActive('bk.views.equivalen')]"
      >
        Equivalensi
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const buttonClass =
  "py-2 px-6 whitespace-nowrap rounded-full inline-flex justify-center items-center text-xs font-semibold transition-colors";

const isActive = (name) => {
  return route.name === name
    ? "bg-biru text-white"
    : "text-biru hover:bg-gray-50";
};
</script>
