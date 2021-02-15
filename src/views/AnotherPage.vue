<template>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum voluptatem pariatur eum,
    porro fuga asperiores ipsum ipsam incidunt velit aliquid?
  </p>
  <div class="flex h-24">
    <help-button label="sign in" />
    <span>
      <help-button label="edit" icon="edit" />
    </span>
    <span>
      <help-badge label="Rp 300.120" icon="chevron-up" />
    </span>
    <help-badge label="Rp 300.120" icon="chevron-down" />
    <help-badge label="Rp 300.120" icon="chevron-up" />
    <help-badge label="Rp 300.120" />
  </div>
  <div class="flex h-24">
    <p class="bg-flame self-start">Alignment Test 1</p>
    <div class="bg-mint-dark">No Self Align</div>
  </div>
  <!-- <help-toggle /> -->
  <p>- - - - -</p>
  <help-toggle v-model="toggleState1" />
  <help-toggle v-model="toggleState2" />
  <help-toggle v-model="toggleState3" />
</template>

<script>
import HelpBadge from '../components/atoms/Badge.vue';
import HelpButton from '../components/atoms/Button.vue';
import HelpToggle from '../components/atoms/Toggle.vue';

export default {
  name: 'AnotherPage',
  components: {
    HelpBadge,
    HelpButton,
    HelpToggle,
  },
  data() {
    return {
      toggleState1: true,
      toggleState2: true,
      toggleState3: false,
    };
  },
};
</script>

<style></style>
