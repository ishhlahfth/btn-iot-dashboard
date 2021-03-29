<template>
  <div class="grid grid-flow-col gap-x-4 py-2 sm:p-2 menu-card" @click="expandVariant">
    <template v-if="!loading">
      <img
        v-if="localImageUrl"
        :src="localImageUrl"
        alt="menu"
        class="w-20 h-20 sm:w-26 sm:h-26 object-cover rounded"
      />
      <div
        v-else
        class="w-20 h-20 sm:w-26 sm:h-26 border-2 border-dashed border-grey-4 rounded grid place-items-center text-small"
      >
        No Image
      </div>
      <div class="flex flex-col justify-between">
        <div class="grid gap-1 sm:gap-2">
          <div class="grid sm:gap-1">
            <div class="grid grid-flow-col gap-2 auto-cols-max place-items-center">
              <p class="font-medium">{{ name }}</p>
              <help-badge
                :label="availabilityStatus"
                :color="availabilityStatus === 'Available' ? 'positive' : 'negative'"
              />
              <help-button
                icon-only
                icon="dots-vertical"
                bg-color="transparent"
                color="grey-1"
                @click="openItemStatusModal"
              />
            </div>
            <p class="text-small text-grey-3">{{ category }}</p>
          </div>
          <p class="text-small text-grey-2 mb-2 sm-truncate">
            {{ description }}
          </p>
        </div>
        <p class="text-small font-medium">{{ convertToRp(price) }}</p>
      </div>
      <div class="hidden h-26 sm:grid grid-flow-col place-items-center gap-2">
        <help-button
          icon-only
          icon="chevron-down"
          bg-color="transparent"
          color="grey-1"
          @click="variantOpened = !variantOpened"
        />
      </div>
    </template>

    <template v-else>
      <div class="w-20 h-20 sm:w-26 sm:h-26 bg-grey-4 rounded animate-pulse"></div>
      <div class="flex flex-col justify-between">
        <div class="grid gap-1 sm:gap-2">
          <div class="grid gap-1">
            <div class="rounded bg-grey-4 h-4 w-32 animate-pulse"></div>
            <div class="rounded bg-grey-4 h-3 w-16 animate-pulse"></div>
          </div>
          <div class="rounded bg-grey-4 h-4 mb-2 animate-pulse"></div>
        </div>
        <div class="rounded bg-grey-4 h-4 w-16 animate-pulse"></div>
      </div>
    </template>
  </div>

  <transition name="slide" appear>
    <template v-if="variantOpened">
      <div class="pb-2 sm:pb-0">
        <div class="grid text-small divide-y divide-grey-4">
          <template v-if="variants.length">
            <template v-for="(variant, i) in variants" :key="i">
              <div class="p-2">
                <p class="mb-2">{{ variant.name }}</p>
                <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 text-grey-2">
                  <template v-for="(option, i) in variant.options" :key="i">
                    <help-radio
                      v-if="variant.is_mandatory"
                      :label="`${option.name} (${convertToRp(option.price)})`"
                      disabled
                    />
                    <help-checkbox
                      v-else
                      :label="`${option.name} (${convertToRp(option.price)})`"
                      disabled
                    />
                  </template>
                </div>
              </div>
            </template>
          </template>
          <template v-else>
            <p class="sm:px-2 sm:ml-2 py-4 text-center text-gold-dark bg-gold-soft rounded-md">
              No variations available for this item
            </p>
          </template>
        </div>
        <div class="grid">
          <help-button
            v-if="$store.state.screenWidth < 640"
            :label="localIsActive ? 'disable product' : 'enable product'"
            bg-color="transparent"
            color="flame-dark"
          />
        </div>
      </div>
    </template>
  </transition>
</template>

<script>
import HelpBadge from '@/components/atoms/Badge.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpCheckbox from '@/components/atoms/Checkbox.vue';
import HelpRadio from '@/components/atoms/Radio.vue';
import mixin from '@/mixin';

export default {
  name: 'MenuCard',
  mixins: [mixin],
  components: {
    HelpBadge,
    HelpButton,
    HelpCheckbox,
    HelpRadio,
  },
  emits: ['openItemStatusModal'],
  props: {
    raw: {
      type: Object,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'Untitled',
    },
    category: {
      type: String,
      default: '-',
    },
    description: {
      type: String,
      default: '-',
    },
    price: {
      type: Number,
      default: 0,
    },
    availabilityStatus: {
      type: String,
      default: 'AVAILABLE',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    variants: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      variantOpened: false,
      localIsActive: false,
      localImageUrl: '',
    };
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
  },
  methods: {
    expandVariant() {
      if (this.screenWidth < 640) {
        this.variantOpened = !this.variantOpened;
      }
    },
    openItemStatusModal() {
      this.$emit('openItemStatusModal');
      this.$store.commit('SET_ITEM', this.raw);
    },
  },
  async mounted() {
    this.localIsActive = this.isActive;
    this.localImageUrl = await this.$store.dispatch('loadImage', this.imageUrl);
  },
};
</script>

<style lang="scss" scoped>
.sm-truncate {
  @apply truncate;
  @media screen and (min-width: 640px) {
    overflow: initial;
    text-overflow: initial;
    white-space: initial;
  }
}
.menu-card {
  grid-template-columns: 5rem 1fr;
  @media screen and (min-width: 640px) {
    grid-template-columns: auto 1fr auto auto;
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
