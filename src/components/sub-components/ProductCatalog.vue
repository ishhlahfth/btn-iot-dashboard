<template>
  <div class="inner-modal-fixed modal-md overflow-auto px-1 grid gap-4">
    <div class="divide-y divide-grey-4">
      <div class="flex justify-between pb-3">
        <span class="font-semibold text-heading4">PRODUCT CATALOG</span>
      </div>
      <p></p>
    </div>
    <form @submit.prevent="$emit('handleAddCatalog')" class="grid grid-cols-4 gap-2">
      <help-input
        v-model="newCatalog"
        class="w-full col-span-3"
        type="text"
        placeholder="Catalog name here"
      />
      <help-button
        bg-color="blue-500"
        icon="plus-circle"
        class="h-full w-full"
        label="Add"
        type="submit"
      />
    </form>
    <div class="grid gap-4">
      <template v-if="itemCatalogs.length">
        <div v-for="(itemCatalog, i) in itemCatalogs" :key="i" class="flex items-center">
          <help-input
            class="w-full"
            type="text"
            v-model="itemCatalog.value"
            :bgColor="itemCatalog.color"
            :disabled="itemCatalog.disabled"
          />
          <div class="flex items-center">
            <template v-if="itemCatalog.editable">
              <icon
                name="plus-circle"
                :size="5"
                class="absolute right-10 cursor-pointer hover:text-blue-500"
                @click="$emit('handleEditCatalog', itemCatalog, 'edit-name')"
              />
            </template>
            <template v-else>
              <icon
                name="edit"
                :size="5"
                class="absolute right-16 cursor-pointer hover:text-mint"
                @click="$emit('handleEditCatalog', itemCatalog)"
              />
              <icon
                name="trash"
                :size="5"
                class="absolute right-10 cursor-pointer hover:text-red-600"
                @click="$emit('handleDeleteCatalog', itemCatalog)"
              />
            </template>
          </div>
        </div>
      </template>
      <template v-else>
        <p class="sm:px-2 sm:ml-2 py-2 text-gold-dark bg-gold-soft rounded-sm text-center inline">
          No variant group found please add some
        </p>
      </template>
    </div>
    <div class="divide-y divide-grey-4">
      <p></p>
      <div class="flex justify-end pt-3">
        <help-button
          bg-color="bg-white"
          color="black-500"
          label="Close"
          class="border"
          @click="$emit('close')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/atoms/Icon.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpButton from '@/components/atoms/Button.vue';

export default {
  name: 'ProductCatalog',
  components: {
    Icon,
    HelpInput,
    HelpButton,
  },
  props: {
    itemCatalogs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      newCatalog: '',
    };
  },
  computed: {
    merchant() {
      return this.$store.state.merchant;
    },
    loading() {
      return this.$store.state.loading.merchant;
    },
    screenWidth() {
      return this.$store.state.screenWidth;
    },
  },
};
</script>

<style></style>
