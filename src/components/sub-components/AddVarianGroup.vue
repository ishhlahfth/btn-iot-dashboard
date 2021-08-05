<template>
  <div class="inner-modal-fixed overflow-auto modal-sm px-1 pb-4">
    <div class="divide-y divide-grey-4 pb-3">
      <div class="flex justify-between pb-3 items-center">
        <icon
          @click="$emit('closeAddVarian')"
          name="chevron-left"
          class="text-blue-500 cursor-pointer"
          :size="10"
        />
        <span class="font-semibold text-heading4">Add Varian Group</span>
        <span></span>
      </div>
      <p></p>
    </div>
    <div class="grid gap-3 mb-3">
      <span class="font-semibold">Variation Group Name</span>
      <help-input class="w-full col-span-3" type="text" placeholder="Catalog name here" />
    </div>
    <section class="grid gap-3">
      <span class="font-semibold">Varian Options</span>
      <div class="flex items-center">
        <help-input class="w-full col-span-3" type="text" placeholder="Catalog name here" />
        <icon
          name="plus-circle"
          :size="5"
          class="absolute right-10 cursor-pointer text-mint shadow-sm hover:text-mint-dark"
        />
      </div>
      <div class="flex items-center">
        <help-input class="w-full col-span-3" type="text" placeholder="Catalog name here" />
        <icon
          name="plus-circle"
          :size="5"
          class="absolute right-10 cursor-pointer text-mint shadow-sm hover:text-mint-dark"
        />
      </div>
    </section>
    <div>
      <div
        @click="$emit('closeAddVarian')"
        class="w-full flex justify-center items-center bg-blue-500 my-10 py-2 px-2 cursor-pointer rounded-2xl text-white hover:shadow-md"
      >
        <help-button bg-color="blue-500" icon="plus-circle" icon-only />
        <span class="text-center text-medium font-medium">Add Varian Group</span>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/atoms/Icon.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpButton from '@/components/atoms/Button.vue';

export default {
  name: 'AddVarianGroup',
  components: {
    Icon,
    HelpInput,
    HelpButton,
  },
};
</script>

<style></style>
