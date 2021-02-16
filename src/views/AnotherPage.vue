<template>
  <div class="p-4 grid grid-flow-row gap-6">
    <p>
      This page is a temporary page used to store all components made adjusted to Buy and Sell Figma
      Prototype
    </p>

    <div class="grid grid-flow-row auto-cols-max gap-1">
      <p class="font-medium">Buttons</p>
      <div>
        <help-button label="edit" icon="edit" />
      </div>
      <div>
        <help-button label="yes i'm sure" />
      </div>
      <div>
        <help-button label="save as draft" type="secondary" icon="download" />
      </div>
    </div>

    <div class="grid grid-flow-row auto-cols-min gap-1">
      <p class="font-medium">Badges</p>
      <div>
        <help-badge label="Rp 300.120" color="positive" icon="chevron-up" />
      </div>
      <div>
        <help-badge label="Rp 300.120" icon="chevron-down" />
      </div>
      <div>
        <help-badge label="Verivied" color="positive" />
      </div>
      <div>
        <help-badge label="Not Verivied" />
      </div>
    </div>

    <div class="grid grid-flow-row gap-1">
      <p class="font-medium">Checkboxes</p>
      <div class="grid grid-flow-col auto-cols-max gap-1">
        <help-checkbox v-model="checkboxState1" />
        <help-checkbox v-model="checkboxState2" />
        <help-checkbox v-model="checkboxState3" />
      </div>
    </div>
    <div class="grid grid-flow-row gap-1">
      <p class="font-medium">Toggles</p>
      <div class="grid grid-flow-col auto-cols-max gap-1">
        <help-toggle v-model="toggleState1" />
        <help-toggle v-model="toggleState2" />
        <help-toggle v-model="toggleState3" />
      </div>
    </div>
    <div class="grid grid-flow-row gap-1"></div>
  </div>
</template>

<script>
import HelpCheckbox from '../components/atoms/Checkbox.vue';
import HelpBadge from '../components/atoms/Badge.vue';
import HelpButton from '../components/atoms/Button.vue';
import HelpToggle from '../components/atoms/Toggle.vue';

export default {
  name: 'AnotherPage',
  components: {
    HelpCheckbox,
    HelpBadge,
    HelpButton,
    HelpToggle,
  },
  data() {
    return {
      toggleState1: true,
      toggleState2: true,
      toggleState3: false,
      checkboxState1: true,
      checkboxState2: true,
      checkboxState3: false,
    };
  },
};
</script>

<style></style>
