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
</template>

<script>
import HelpBadge from '../components/atoms/Badge.vue';
import HelpButton from '../components/atoms/Button.vue';

export default {
  name: 'AnotherPage',
  components: {
    HelpBadge,
    HelpButton,
  },
};
</script>

<style></style>
