<template>
  <add-varian-group v-if="flagAddVarian" @closeAddVarian="flagAddVarian = false" />
  <div v-else class="inner-modal-fixed overflow-auto px-1">
    <div class="divide-y divide-grey-4 pb-3">
      <div class="flex justify-between pb-3 items-center">
        <icon
          @click="$emit('closeSelectVarian')"
          name="chevron-left"
          class="text-blue-500 cursor-pointer"
          :size="10"
        />
        <span class="font-semibold text-heading4">Select Varian Group</span>
        <span></span>
      </div>
      <p></p>
    </div>
    <div class="grid gap-3 my-2">
      <div class="py-3 px-3 w-full rounded-md cursor-pointer" style="background: #F6F6F6">
        <div class="flex justify-between items-center">
          <span class="font-semibold">Ukuran</span>
          <span class="text-blue-500 font-medium">Change</span>
        </div>
        <div class="grid grid-cols-4 gap-1 py-2">
          <span
            class="text-center text-small font-medium bg-blue-500 py-2 px-2 rounded-2xl text-white hover:shadow-md"
            >Small</span
          >
          <span
            class="text-center text-small font-medium bg-blue-500 py-2 px-2 rounded-2xl text-white hover:shadow-md"
            >Large</span
          >
          <span
            class="text-center text-small font-medium bg-blue-500 py-2 px-2 rounded-2xl text-white hover:shadow-md"
            >Extra Large</span
          >
        </div>
      </div>
      <div class="py-3 px-3 w-full rounded-md cursor-pointer" style="background: #F6F6F6">
        <div class="flex justify-between items-center">
          <span class="font-semibold">Topping Makanan</span>
          <span class="text-blue-500 font-medium">Change</span>
        </div>
        <div class="grid grid-cols-4 gap-1 py-2">
          <span
            class="text-center text-small font-medium bg-blue-500 py-2 px-2 rounded-2xl text-white hover:shadow-md"
            >Small</span
          >
          <span
            class="text-center text-small font-medium bg-blue-500 py-2 px-2 rounded-2xl text-white hover:shadow-md"
            >Large</span
          >
          <span
            class="text-center text-small font-medium bg-blue-500 py-2 px-2 rounded-2xl text-white hover:shadow-md"
            >Extra Large</span
          >
          <span
            class="text-center text-small font-medium bg-blue-500 py-2 px-2 rounded-2xl text-white hover:shadow-md"
            >Extra Large</span
          >
          <span
            class="text-center text-small font-medium bg-blue-500 py-2 px-2 rounded-2xl text-white hover:shadow-md"
            >Extra Large</span
          >
          <span
            class="text-center text-small font-medium bg-blue-500 py-2 px-2 rounded-2xl text-white hover:shadow-md"
            >Extra Large</span
          >
          <span
            class="text-center text-small font-medium bg-blue-500 py-2 px-2 rounded-2xl text-white hover:shadow-md"
            >Extra Large</span
          >
        </div>
      </div>
      <div class="py-3 px-3 w-full rounded-md cursor-pointer" style="background: #F6F6F6">
        <div class="flex justify-between items-center">
          <span class="font-semibold">Ukuran</span>
          <span class="text-blue-500 font-medium">Change</span>
        </div>
        <div class="grid grid-cols-4 gap-1 py-2">
          <span
            class="text-center text-small font-medium bg-blue-500 py-2 px-2 rounded-2xl text-white hover:shadow-md"
            >Small</span
          >
          <span
            class="text-center text-small font-medium bg-blue-500 py-2 px-2 rounded-2xl text-white hover:shadow-md"
            >Large</span
          >
          <span
            class="text-center text-small font-medium bg-blue-500 py-2 px-2 rounded-2xl text-white hover:shadow-md"
            >Extra Large</span
          >
        </div>
      </div>
    </div>
    <div
      @click="flagAddVarian = true"
      class="w-full flex justify-center items-center bg-blue-500 my-10 py-2 px-2 cursor-pointer rounded-2xl text-white hover:shadow-md"
    >
      <help-button bg-color="blue-500" icon="plus-circle" icon-only />
      <span class="text-center text-small font-medium">Add Variation Group</span>
    </div>
    <div>
      <div
        @click="$emit('closeSelectVarian')"
        class="w-full flex justify-center items-center bg-blue-500 my-10 py-2 px-2 cursor-pointer rounded-2xl text-white hover:shadow-md"
      >
        <span class="text-center text-medium font-medium">Save</span>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/atoms/Icon.vue';
import HelpButton from '@/components/atoms/Button.vue';
import AddVarianGroup from '@/components/sub-components/AddVarianGroup.vue';

export default {
  name: 'VarianGroupOption',
  components: {
    Icon,
    HelpButton,
    AddVarianGroup,
  },
  data() {
    return {
      flagAddVarian: false,
    };
  },
};
</script>

<style></style>
