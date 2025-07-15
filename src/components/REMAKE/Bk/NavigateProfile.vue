<template>
  <div class="overflow-x-auto">
    <div
      class="flex gap-3 p-2 bg-gray-400 rounded-full text-xs min-w-max sm:justify-center"
    >
      <RouterLink
        :to="{ name: 'bk.views.profile' }"
        :class="[buttonClass, isActive('bk.views.profile')]"
      >
        Profile
      </RouterLink>

      <RouterLink
        :to="{ name: 'bk.views.placement' }"
        :class="[buttonClass, isActive('bk.views.placement')]"
      >
        Placement
      </RouterLink>

      <RouterLink
        :to="{ name: 'bk.views.submision-kta' }"
        :class="[buttonClass, isActive('bk.views.submision-kta')]"
      >
        Submission KTA
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
