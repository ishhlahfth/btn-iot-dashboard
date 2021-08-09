<template>
  <help-modal v-model="modal.sm" permanent>
    <confirmation
      title="Delete Item Catalog"
      :message="`Are you sure you want to delete item ${payloadCatalog.name} ?`"
      bg-color="red-500"
      @close="modal.sm = false"
      @cancel="modal.sm = false"
      @confirm="deleteCatalog"
      @load="loading.delete"
    />
  </help-modal>
  <div class="inner-modal-fixed modal-md overflow-auto px-1 flex flex-col sm:grid sm:gap-4">
    <div class="divide-y divide-grey-4">
      <div class="flex justify-between pb-3">
        <span class="font-semibold text-heading4">PRODUCT CATALOG</span>
      </div>
      <p></p>
    </div>
    <form @submit.prevent="addCatalog" class="grid grid-cols-4 gap-2 sm:py-0 py-3">
      <help-input
        v-model="newCatalog"
        class="w-full col-span-3"
        type="text"
        placeholder="Catalog name here"
      />
      <help-button
        bg-color="blue-500"
        icon="plus-circle"
        label="Add"
        type="submit"
        :loading="loading.add"
      />
    </form>
    <div class="grid gap-2 sm:gap-4 sm:py-0 py-2">
      <template v-if="itemCatalogs.length">
        <div v-for="(itemCatalog, i) in itemCatalogs" :key="i" class="flex items-center">
          <help-input
            class="w-full"
            type="text"
            v-model="itemCatalog.label"
            :background="itemCatalog.color"
            :disabled="itemCatalog.disabled"
          >
            <template v-slot>
              <div class="flex items-center justify-end">
                <div v-if="itemCatalog.editable">
                  <icon
                    name="plus-circle"
                    :size="5"
                    class="float-right cursor-pointer hover:text-blue-500"
                    @click="patchCatalog"
                  />
                </div>
                <div v-else class="flex items-center justify-end">
                  <icon
                    name="edit"
                    :size="5"
                    class="cursor-pointer hover:text-mint"
                    @click="handleEditCatalog(itemCatalog)"
                  />&nbsp;&nbsp;
                  <icon
                    name="trash"
                    :size="5"
                    class="cursor-pointer hover:text-red-600"
                    @click="confirmDelete(itemCatalog)"
                  />
                </div>
              </div>
            </template>
          </help-input>
        </div>
      </template>
      <template v-else>
        <p class="sm:px-2 sm:ml-2 py-2 text-gold-dark bg-gold-soft rounded-sm text-center inline">
          No variant group found please add some
        </p>
      </template>
    </div>
    <div class="divide-y divide-grey-4 sm:py-0 py-3">
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
import { useToast } from 'vue-toastification';
import Icon from '@/components/atoms/Icon.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpModal from '@/components/templates/Modal.vue';
import Confirmation from '@/components/modals/Confirmation.vue';
import API from '../../apis';

export default {
  name: 'ProductCatalog',
  emits: ['close', 'handleAddCatalog'],
  components: {
    Icon,
    HelpInput,
    HelpButton,
    HelpModal,
    Confirmation,
  },
  props: {
    itemCatalogs: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      newCatalog: '',
      modal: {
        sm: false,
      },
      payloadCatalog: {},
      loading: {
        delete: false,
        add: false,
      },
    };
  },
  computed: {
    merchant() {
      return this.$store.state.merchant;
    },
    screenWidth() {
      return this.$store.state.screenWidth;
    },
  },
  methods: {
    async addCatalog() {
      this.loading.add = true;
      const payload = {
        name: this.newCatalog,
        description: null,
        merchant_id: this.merchant.merchant_id,
        status: 'AVAILABLE',
        sort_no: 1,
      };
      try {
        const {
          data: { data },
        } = await API.post('catalogs', payload);
        this.toast.success(`Successfully add item ${data.name} in catalogs !`);
        this.newCatalog = '';
        this.$emit('handleAddCatalog');
      } catch (error) {
        this.toast.error(error.response.data.meta.message);
      }
      this.loading.add = false;
    },
    async deleteCatalog() {
      this.loading.delete = true;
      try {
        await API.delete(`catalogs/${this.payloadCatalog.id}`);
        this.toast.success(`Successfully delete item ${this.payloadCatalog.name} in catalogs !`);
        this.$emit('handleAddCatalog');
        this.modal.sm = false;
      } catch (error) {
        this.toast.error(error.response.data.meta.message);
      }
      this.loading.delete = false;
    },
    async patchCatalog() {
      const payload = {
        name: this.payloadCatalog.label,
        description: null,
        merchant_id: this.merchant.merchant_id,
        status: 'AVAILABLE',
        sort_no: 1,
      };
      try {
        const {
          data: { data },
        } = await API.patch(`catalogs/${this.payloadCatalog.id}`, payload);
        this.toast.success(`Successfully edit item ${data.name} in catalogs !`);
        this.$emit('handleAddCatalog');
      } catch (error) {
        this.toast.error(error.response.data.meta.message);
      }
    },
    handleEditCatalog(payload, param) {
      this.payloadCatalog = payload;
      if (param === 'edit-name') {
        payload.color = 'gray-100';
        payload.editable = false;
        payload.disabled = true;
        this.patchCatalog();
      } else {
        payload.color = 'white';
        payload.editable = true;
        payload.disabled = false;
      }
    },
    confirmDelete(payload) {
      this.modal.sm = true;
      this.payloadCatalog = payload;
    },
  },
};
</script>

<style></style>
