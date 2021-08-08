<template>
  <help-modal v-model="modal.sm" permanent>
    <confirmation
      title="Delete Option Varian"
      message="Are you sure you want to delete this option varian ?"
      @close="modal.sm = false"
      @cancel="modal.sm = false"
      @confirm="deleteOption"
    />
  </help-modal>
  <help-modal v-model="modal.varian" permanent>
    <confirmation
      title="Delete Varian Group"
      :message="`Are you sure you want to delete ${data.name} ?`"
      @close="modal.varian = false"
      @cancel="modal.varian = false"
      @confirm="deleteVarianGroup"
    />
  </help-modal>
  <div class="inner-modal-fixed overflow-auto modal-sm px-1 pb-4">
    <div class="divide-y divide-grey-4 pb-3">
      <div class="flex justify-between pb-3 items-center">
        <icon
          @click="handleBack"
          name="chevron-left"
          class="text-blue-500 cursor-pointer"
          :size="10"
        />
        <span v-if="!isChanged" class="font-semibold text-heading4">Add Varian Group</span>
        <span v-if="isChanged" class="font-semibold text-heading4">Change Varian Group</span>
        <span>
          <icon
          v-if="isChanged"
          @click="modal.varian = true"
          name="trash-outline"
          class="text-red-500 cursor-pointer"
          :size="8"
          />
        </span>
      </div>
      <p></p>
    </div>
    <div class="grid gap-3 mb-3">
      <span class="font-semibold">Variation Group Name</span>
      <help-input class="w-full col-span-3" type="text" placeholder="Catalog name here" v-model="nameGroup" />
    </div>
    <section class="grid gap-3">
      <span class="font-semibold">Varian Options</span>
      <div v-for="(el, i) in options" :key="i" class="flex items-center">
        <help-input
          class="w-full col-span-3"
          type="text"
          placeholder="Catalog name here"
          v-model="el.name"
          :disabled="el.disable"
          :background="el.bgColor"
        >
          <template v-slot>
            <div class="flex items-center justify-end">
              <icon
                v-if="el.disable"
                name="minus-circle"
                :size="6"
                class="float-right cursor-pointer text-red-600 shadow-sm hover:text-red-400"
                @click="confirmDelete(el)"
              />
              <icon
                v-else
                name="plus-circle"
                :size="5"
                class="float-right cursor-pointer text-mint shadow-sm hover:text-mint-dark"
                @click="handleAddOption(el)"
              />
            </div>
          </template>
        </help-input>
      </div>
    </section>
    <div>
      <div
        v-if="!isChanged"
        @click="addVarianGorup"
        class="w-full flex justify-center items-center bg-blue-500 my-10 py-2 px-2 cursor-pointer rounded-2xl text-white hover:shadow-md"
      >
        <help-button bg-color="blue-500" icon="plus-circle" icon-only />
        <span class="text-center text-medium font-medium">Add Varian Group</span>
      </div>
      <div
        v-if="isChanged"
        @click="changeVarianGorup"
        class="w-full flex justify-center items-center bg-blue-500 my-10 py-2 px-2 cursor-pointer rounded-2xl text-white hover:shadow-md"
      >
        <help-button bg-color="blue-500" icon="plus-circle" icon-only />
        <span class="text-center text-medium font-medium">Add Varian Group</span>
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
  name: 'AddVarianGroup',
  emits: ['closeAddVarian', 'refetch'],
  components: {
    Icon,
    HelpInput,
    HelpButton,
    HelpModal,
    Confirmation,
  },
  props: {
    isChanged: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      nameGroup: '',
      payload: {},
      modal: {
        sm: false,
        varian: false,
      },
      options: [
        {
          name: '',
          description: '',
          disable: false,
          bgColor: 'white',
        },
      ],
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
    async addVarianGorup() {
      const filter = this.options.filter((el) => el.name);
      const payload = {
        name: this.nameGroup,
        description: this.nameGroup,
        merchant_id: this.merchant.merchant_id,
        options: filter.map((el) => ({
          name: el.name,
          description: el.description,
        })),
      };
      try {
        const {
          data: { data },
        } = await API.post('variations', payload);
        this.toast.success(`Successfully add varian ${data.name} !`);
      } catch (error) {
        this.toast.error(error.response.data.meta.message);
      }
      this.$emit('closeAddVarian');
      this.$emit('refetch');
    },
    async changeVarianGorup() {
      const filter = this.options.filter((el) => el.name);
      const payload = {
        name: this.nameGroup,
        description: this.nameGroup,
        merchant_id: this.merchant.merchant_id,
        options: filter.map((el) => ({
          ...el,
          id: el.id ? el.id : null,
          name: el.name,
          description: el.description,
        })),
      };
      try {
        const {
          data: { data },
        } = await API.patch(`variations/${this.data.id}`, payload);
        this.toast.success(`Successfully update varian ${data.name} !`);
      } catch (error) {
        this.toast.error(error.response.data.meta.message);
      }
      this.$emit('closeAddVarian');
      this.$emit('refetch');
    },
    handleAddOption(payload) {
      payload.description = payload.name;
      payload.bgColor = 'gray-100';
      payload.disable = true;
      this.options.unshift({
        name: '',
        description: '',
      });
    },
    async deleteVarianGroup() {
      try {
        await API.delete(`variations/${this.data.id}`);
        this.toast.success(`Successfully delete option ${this.data.name}`);
        this.modal.varian = false;
        this.handleBack();
      } catch (error) {
        this.toast.error(error.response.data.meta.message);
      }
    },
    async deleteOption() {
      if (this.payload.id) {
        try {
          await API.delete(`/variation-options/${this.payload.id}`);
          this.toast.success(`Successfully delete option ${this.payload.name}`);
        } catch (error) {
          this.toast.error(error.response.data.meta.message);
        }
        this.options = this.options.filter((el) => el.name !== this.payload.name);
      } else {
        this.options = this.options.filter((el) => el.name !== this.payload.name);
      }
      this.modal.sm = false;
    },
    confirmDelete(payload) {
      this.modal.sm = true;
      this.payload = payload;
    },
    handleBack() {
      this.$emit('closeAddVarian');
      this.$emit('refetch');
    },
  },
  mounted() {
    if (this.isChanged) {
      this.nameGroup = this.data.name;
      this.options = this.data.options.map((el) => ({
        ...el,
        disable: true,
        bgColor: 'gray-100',
      }));
      this.options.unshift({
        name: '',
        description: '',
        disable: false,
        bgColor: 'white',
      });
    }
  },
};
</script>

<style></style>
