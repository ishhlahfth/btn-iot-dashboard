<template>
  <div class="grid grid-flow-row auto-rows-max cursor-text" :class="{ 'gap-1': label }">
    <label :class="`font-medium ${labelClass}`">{{ label }}</label>
    <div
      v-if="type === 'textarea'"
      class="bg-white border border-grey-4 py-2.5 px-3 rounded-lg grid grid-flow-col gap-2 place-items-center"
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
      v-else-if="type === 'file'"
      class="bg-white border border-grey-4 rounded-lg grid gap-2 w-full"
      :class="[
        { 'ring-2 ring-royal ring-offset-1': onFocus },
        { 'ring-2 ring-flame ring-offset-1': hasError },
        { 'grid-flow-col': !leftIcon && !rightIcon },
        { 'with-left-and-right-icon': leftIcon && rightIcon },
        { 'with-left-icon': leftIcon },
        { 'with-right-icon': rightIcon },
        { 'search-bar': searchBar || hasSlot },
      ]"
      @blur="$refs.helpInput.blur()"
    >
      <div class="flex items-center justify-between bg-grey-lighter">
        <p class="text-grey-2 font-medium px-3" v-if="fileName">{{ fileName }}</p>
        <p v-else></p>
        <label
          class="px-4 bg-midnight text-white rounded-lg shadow-lg uppercase border border-blue cursor-pointer hover:text-grey"
        >
          <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            class="w-10"
          >
            <path
              d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
            />
          </svg>
          <input
            type="file"
            class="hidden"
            @input="$emit('update:modelValue', $event.target.files)"
            @change="handleChange"
          />
        </label>
      </div>
    </div>
    <div v-else-if="type === 'date'">
      <div
        class="bg-white border border-grey-4 px-3 rounded-lg grid gap-2 w-full"
        :class="[
          { 'ring-2 ring-royal ring-offset-1': onFocus },
          { 'ring-2 ring-flame ring-offset-1': hasError },
          { 'grid-flow-col': !leftIcon && !rightIcon },
          { 'with-left-and-right-icon': leftIcon && rightIcon },
          { 'with-left-icon': leftIcon },
          { 'with-right-icon': rightIcon },
          { 'search-bar': searchBar || hasSlot },
        ]"
        @click="$refs.helpInput.getElementById('selectedFile').click()"
        @blur="$refs.helpInput.blur()"
      >
        <icon v-if="leftIcon" :name="leftIcon" class="justify-self-center self-center" />
        <input
          class="w-full py-2.5"
          ref="helpInput"
          spellcheck="false"
          type="date"
          size="small"
          format="24hr"
          :placeholder="placeholder"
          :value="modelValue"
          v-maska="mask"
          @blur="onFocus = false"
          @focus="onFocus = true"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <p class="h-full bg-gray-300" style="width: 1px"></p>
        <input
          class="w-full2 py-2.5"
          ref="helpInput"
          spellcheck="false"
          type="time"
          :placeholder="placeholder"
          :value="modelValue2"
          v-maska="mask"
          @blur="onFocus = false"
          @focus="onFocus = true"
          @input="$emit('update:modelValue2', $event.target.value)"
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
        <slot></slot>
      </div>
    </div>
    <div
      v-else
      class="border bg-white border-grey-4 py-2.5 px-3 rounded-lg grid gap-2 w-full"
      :class="[
        { 'ring-2 ring-royal ring-offset-1': onFocus },
        { 'ring-2 ring-flame ring-offset-1': hasError },
        { 'grid-flow-col': !leftIcon && !rightIcon },
        { 'with-left-and-right-icon': leftIcon && rightIcon },
        { 'with-left-icon': leftIcon },
        { 'with-right-icon': rightIcon },
        { 'search-bar': searchBar || hasSlot },
      ]"
      @click="$refs.helpInput.focus()"
      @blur="$refs.helpInput.blur()"
    >
      <icon v-if="leftIcon" :name="leftIcon" class="justify-self-start self-center" />
      <input
        :disabled="disabled"
        class="w-full bg-white"
        :class="[{
          'cursor-pointer': pointer,
        }]"
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
      <slot></slot>
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
      type: [String, Number],
      default: '',
    },
    modelValue2: {
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
    background: {
      type: String,
      default: 'white',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    pointer: {
      type: Boolean,
      default: false,
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
      fileName: '',
    };
  },
  computed: {
    hasSlot() {
      return !!this.$slots.default;
    },
  },
  methods: {
    handleChange(e) {
      this.fileName = e.target.files[0].name;
    },
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
