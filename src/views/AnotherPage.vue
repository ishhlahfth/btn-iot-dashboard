<template>
  <div class="p-4 grid grid-flow-row gap-6">
    <p>
      This page is a temporary page used to store all components made adjusted to Buy and Sell Figma
      Prototype
    </p>

    <div class="grid grid-flow-row auto-cols-max gap-1">
      <p class="font-medium">Buttons</p>
      <div class="grid grid-flow-col auto-cols-max gap-1">
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
    </div>

    <div class="grid grid-flow-row auto-cols-min gap-1">
      <p class="font-medium">Badges</p>
      <div class="grid grid-flow-col auto-cols-max gap-1">
        <div>
          <help-badge label="Rp 300.120" color="positive" icon="chevron-up" />
        </div>
        <div>
          <help-badge label="Rp 300.120" icon="chevron-down" />
        </div>
      </div>
      <div class="grid grid-flow-col auto-cols-max gap-1">
        <div>
          <help-badge label="Verivied" color="positive" />
        </div>
        <div>
          <help-badge label="Not Verivied" />
        </div>
      </div>
    </div>

    <div class="grid grid-flow-row auto-cols-min gap-1">
      <p class="font-medium">Option Items</p>
      <div class="grid grid-flow-col auto-cols-max gap-1">
        <help-option-item label="Unselected" />
        <help-option-item label="Selected" selected />
      </div>
    </div>

    <div class="grid grid-flow-row auto-cols-min gap-1">
      <p class="font-medium">Option</p>
      <div class="grid grid-flow-col auto-cols-max gap-2">
        <div class="w-52">
          <help-select
            :options="['Today', 'Yesterday', 'Last 7 Days', 'This Month']"
            default="Yesterday"
          />
          <p class="text-xsmall text-mint">Fixed width</p>
        </div>
        <div>
          <help-select
            :options="[
              'Gopay',
              'Ovo',
              'Shopee Pay',
              'Dana',
              'Very long text label but not lorem ipsum',
            ]"
          />
          <p class="text-xsmall text-mint">Auto width</p>
        </div>
        <div class="w-44">
          <help-select
            :options="[
              'I Write Sins Not Tragedies',
              'Brick By Boring Brick',
              'Love The Way You Lie',
            ]"
          />
          <p class="text-xsmall text-mint">Fixed width (notice the ellipsis)</p>
        </div>
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
      <p class="font-medium">Radio</p>
      <div class="grid grid-flow-col auto-cols-max gap-1">
        <help-radio v-model="radioState1" name="example-group" />
        <help-radio v-model="radioState2" name="example-group" />
        <help-radio v-model="radioState3" name="example-group" />
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

    <div class="grid grid-flow-row gap-1">
      <p class="font-medium">Avatars</p>
      <div class="grid grid-flow-col auto-cols-max gap-1">
        <help-avatar src="" :size="32" placeholder="Putri" />
        <help-avatar
          src="https://www.whiteboardjournal.com/wp-content/uploads/2020/07/Fathia-12.jpg"
          :size="32"
        />
        <help-avatar src="https://nos.jkt-1.neo.id/mcdonalds/assets/ico/richlink.jpg" :size="32" />
        <help-avatar
          src="https://instagram.fjog3-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/66827581_515397049002415_3097204635080124637_n.jpg?_nc_ht=instagram.fjog3-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=8W0W1Qiyo2wAX8f_PRo&tp=1&oh=4d9fe038537653efbb8b6cf3c30bf4c5&oe=6055D48F"
          :size="64"
        />
        <help-avatar
          src="https://awsimages.detik.net.id/community/media/visual/2020/09/25/kristo-immanuel_34.jpeg?"
          :size="64"
        />
      </div>
    </div>

    <div class="grid grid-flow-row gap-1">
      <p class="font-medium">Icons</p>
      <div class="grid grid-flow-col auto-cols-max gap-1">
        <icon name="user-group" />
        <icon name="cube" />
        <icon name="filter" />
        <icon name="download" />
        <icon name="chevron-down" />
        <icon name="photograph" />
        <icon name="shield" />
      </div>
    </div>

    <div class="grid grid-flow-row gap-1">
      <p class="font-medium">Thumbnails</p>
      <div class="grid grid-flow-col auto-cols-max gap-1">
        <help-thumbnail src="" :width="196" :height="80" />
        <help-thumbnail
          src="https://wehelpyou-content.s3-ap-southeast-1.amazonaws.com/banners/Cashback50-BannerInApps_Low_.png"
          :width="196"
          :height="80"
        />
        <help-thumbnail
          src="https://wehelpyou-content.s3-ap-southeast-1.amazonaws.com/banners/60%25_10k-BannerApps(1).png"
          :width="196"
          :height="80"
        />
        <help-thumbnail
          src="https://wehelpyou-content.s3-ap-southeast-1.amazonaws.com/banners/BannerApps.png"
          :width="196"
          :height="80"
        />
      </div>
      <div class="grid grid-flow-col auto-cols-max gap-1">
        <help-thumbnail src="" :width="104" :height="104" />
        <help-thumbnail
          src="https://www.couvee.co.id/wp-content/uploads/2019/11/CF4566E9-0DC2-43F1-ABC9-F1BED1F0A9CE-768x768.jpg"
          :width="104"
          :height="104"
        />
        <help-thumbnail
          src="https://www.couvee.co.id/wp-content/uploads/2019/07/AF8C8EEC-5DB4-4CD0-8095-95ED05936730-768x768.jpg"
          :width="104"
          :height="104"
        />
        <help-thumbnail
          src="https://nos.jkt-1.neo.id/mcdonalds/foods/October2019/nhj93oZApoMavF1lC6Wm.png"
          :width="104"
          :height="104"
        />
        <help-thumbnail
          src="https://nos.jkt-1.neo.id/mcdonalds/foods/August2019/H0YCaF0JIpZX2Jwzzx5O.png"
          :width="104"
          :height="104"
        />
      </div>
    </div>

    <div class="grid grid-flow-row gap-1">
      <p class="font-medium">Inputs</p>
      <div class="grid grid-flow-row auto-cols-max gap-1">
        <help-input
          v-model="inputValue"
          label="Uyeah"
          placeholder="This is placeholder"
          type="text"
        />
        <help-input v-model="inputValue" placeholder="This input has no label" type="text" />
        <help-input v-model="inputValue" label="Date" placeholder="##-##-####" type="text">
          <template v-slot:prepend>
            <icon name="user-group" />
          </template>
          <template v-slot:append>
            <icon name="search" />
          </template>
        </help-input>
      </div>
    </div>
  </div>
</template>

<script>
import HelpAvatar from '../components/atoms/Avatar.vue';
import HelpCheckbox from '../components/atoms/Checkbox.vue';
import HelpBadge from '../components/atoms/Badge.vue';
import HelpButton from '../components/atoms/Button.vue';
import HelpInput from '../components/atoms/Input.vue';
import HelpOptionItem from '../components/atoms/OptionItem.vue';
import HelpSelect from '../components/molecules/Select.vue';
import HelpRadio from '../components/atoms/Radio.vue';
import HelpThumbnail from '../components/atoms/Thumbnail.vue';
import HelpToggle from '../components/atoms/Toggle.vue';
import Icon from '../components/atoms/Icon.vue';

export default {
  name: 'AnotherPage',
  components: {
    HelpAvatar,
    HelpCheckbox,
    HelpBadge,
    HelpButton,
    HelpInput,
    HelpOptionItem,
    HelpSelect,
    HelpRadio,
    HelpThumbnail,
    HelpToggle,
    Icon,
  },
  data() {
    return {
      toggleState1: true,
      toggleState2: true,
      toggleState3: false,
      checkboxState1: true,
      checkboxState2: true,
      checkboxState3: false,
      radioState1: true,
      radioState2: true,
      radioState3: false,
      inputValue: '',
    };
  },
};
</script>

<style></style>
