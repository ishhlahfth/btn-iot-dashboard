<template>
  <div class="grid grid-flow-row auto-rows-max gap-1">
    <label class="font-medium">{{ label }}</label>
    <div
      v-if="type === 'textarea'"
      class="border border-grey-4 py-2.5 px-3 rounded-lg grid grid-flow-col auto-cols-max gap-2 place-items-center"
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
      class="border border-grey-4 py-2.5 px-3 rounded-lg grid grid-flow-col auto-cols-max gap-2 place-items-center"
      :class="[
        { 'ring-2 ring-royal ring-offset-1': onFocus },
        { 'ring-2 ring-flame ring-offset-1': hasError },
      ]"
      @click="$refs.helpInput.focus()"
      @blur="$refs.helpInput.blur()"
    >
      <slot name="prepend"></slot>
      <input
        ref="helpInput"
        spellcheck="false"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @blur="onFocus = false"
        @focus="onFocus = true"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <slot name="append"></slot>
    </div>
    <p v-if="hasError" class="font-medium text-xsmall text-flame mt-0.5">
      This is an error message
      <!-- save this for later form validation -->
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelpInput',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    label: {
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

<style></style>
