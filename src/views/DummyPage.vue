<template>
  <div class="p-6 grid gap-6">
    <div class="w-full bg-grey-4 flex justify-between">
      <p class="text-heading2 font-semibold">Page Please</p>
      <help-button label="filter" @click="clicked" />
    </div>
    <div class="w-full bg-mint">
      <p class="text-white">Content 1</p>
    </div>
    <div class="w-full bg-grey-2">
      <p class="text-white">Content 2</p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum labore ab illum ipsam
        aliquid quos sapiente nesciunt illo ullam quae quam quisquam dicta quidem suscipit
        voluptatibus eveniet corporis, exercitationem quod?
      </p>
    </div>
    <div class="w-full bg-grey-3">
      <p class="text-white">Content 2</p>
      <p class="text-white">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum labore ab illum ipsam
        aliquid quos sapiente nesciunt illo ullam quae quam quisquam dicta quidem suscipit
        voluptatibus eveniet corporis, exercitationem quod?
      </p>
      <p class="text-grey-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum labore ab illum ipsam
        aliquid quos sapiente nesciunt illo ullam quae quam quisquam dicta quidem suscipit
        voluptatibus eveniet corporis, exercitationem quod?
      </p>
    </div>
  </div>
</template>

<script>
import HelpButton from '../components/atoms/Button.vue';

export default {
  name: 'DummyPage',
  components: {
    HelpButton,
  },
  methods: {
    clicked() {
      console.log('click!');
    },
  },
};
</script>

<style></style>
