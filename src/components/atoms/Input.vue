<template>
  <div class="grid grid-flow-row auto-rows-max cursor-text" :class="{ 'gap-1': label }">
    <label :class="`font-medium ${labelClass}`">{{ label }}</label>
    <div
      v-if="type === 'textarea'"
      class="bg-white border border-grey-4 py-2.5 px-3 rounded-lg grid grid-flow-col auto-cols-max gap-2 place-items-center"
      :class="[
        { 'ring-2 ring-royal ring-offset-1': onFocus },
        { 'ring-2 ring-flame ring-offset-1': hasError },
      ]"
      @click="$refs.helpInput.focus()"
      @blur="$refs.helpInput.blur()"
    >
      <textarea
        class="resize-none w-full"
        spellcheck="false"
        ref="helpInput"
        :placeholder="placeholder"
        :value="modelValue"
        :rows="rows"
        @blur="onFocus = false"
        @focus="onFocus = true"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <div
      v-else
      class="bg-white border border-grey-4 py-2.5 px-3 rounded-lg grid gap-2 w-full"
      :class="[
        { 'ring-2 ring-royal ring-offset-1': onFocus },
        { 'ring-2 ring-flame ring-offset-1': hasError },
        { 'grid-flow-col': !leftIcon && !rightIcon },
        { 'with-left-and-right-icon': leftIcon && rightIcon },
        { 'with-left-icon': leftIcon },
        { 'with-right-icon': rightIcon },
        { 'search-bar': searchBar },
      ]"
      @click="$refs.helpInput.focus()"
      @blur="$refs.helpInput.blur()"
    >
      <icon v-if="leftIcon" :name="leftIcon" class="justify-self-center self-center" />
      <input
        class="w-full"
        ref="helpInput"
        spellcheck="false"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        v-maska="mask"
        @blur="onFocus = false"
        @focus="onFocus = true"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <help-button
        v-if="searchBar && !modelValue"
        icon-only
        icon="search"
        bg-color="transparent"
        color="grey-2"
      />
      <help-button
        type="button"
        v-if="searchBar && modelValue"
        icon-only
        icon="close"
        bg-color="transparent"
        color="grey-2"
        @click="$emit('update:modelValue', '')"
      />
      <icon v-if="rightIcon" :name="rightIcon" class="justify-self-center self-center" />
    </div>
    <p v-if="hasError" class="font-medium text-xsmall text-flame mt-0.5">
      This is an error message
      <!-- save this for later form validation -->
    </p>
  </div>
</template>

<script>
import HelpButton from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';

export default {
  name: 'HelpInput',
  components: {
    HelpButton,
    Icon,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    labelClass: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
      required: true,
    },
    rows: {
      type: Number,
      default: 3,
    },
    leftIcon: {
      type: String,
      default: '',
    },
    rightIcon: {
      type: String,
      default: '',
    },
    searchBar: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: String,
      default: '',
    },
    // hasError: {
    //   type: Boolean,
    //   default: false,
    // }
  },
  data() {
    return {
      onFocus: false,
      hasError: false,
    };
  },
};
</script>

<style>
.with-left-icon {
  grid-template-columns: 20px 1fr;
}
.with-right-icon {
  grid-template-columns: 1fr 20px;
}
.with-left-and-right-icon {
  grid-template-columns: 20px 1fr 20px;
}
.search-bar {
  grid-template-columns: 1fr 24px;
}
</style>
