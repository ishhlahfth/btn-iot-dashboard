<template>
  <div class="w-screen grid grid-flow-col grid-cols-12">
    <div class="col-span-2 h-screen overflow-auto">
      <div class="p-4 grid gap-4 auto-rows-max">
        <p class="font-bold mb-2">Atoms</p>
        <a href="#avatar">Avatar</a>
        <a href="#badge">Badge</a>
        <a href="#button">Button</a>
        <a href="#checkbox">Checkbox</a>
        <a href="#icon">Icon</a>
        <a href="#input">Input</a>
        <a href="#navexpandableitem">Nav Expandable Item</a>
        <a href="#navitem">Nav Item</a>
        <a href="#optionitem">Option Item</a>
        <a href="#radiobutton">Radio Button</a>
        <a href="#thumbnail">Thumbnail</a>
        <a href="#toggle">Toggle</a>
        <a href="#tooltip">Tooltip</a>

        <p class="font-bold mb-2">Molecules</p>
        <a href="#menucard">Menu Card</a>
        <a href="#navbar">Navbar</a>
        <a href="#option">Option</a>
        <a href="#select">Select</a>
        <a href="#sidebar">Sidebar</a>
        <a href="#tablefooter">Table Footer</a>

        <p class="font-bold mb-2">Templates</p>
        <a href="#modal">Modal</a>
        <a href="#table">Table</a>

        <p class="font-bold mb-2">Guides</p>
        <a href="#">Initiating Menu</a>
        <a href="#">GET Features</a>
        <a href="#">POST Features</a>
        <a href="#">PATCH Features</a>
        <a href="#">DELETE Features</a>
        <a href="#">Initiating Modal</a>
        <a href="#">Git Flow</a>
      </div>
    </div>

    <div class="col-span-10 h-screen overflow-auto">
      <div class="p-8 grid gap-12 auto-rows-min">
        <!-- <section id="avatar" class="grid gap-8 auto-rows-max">
          <p class="text-heading2 font-semibold text-midnight">Avatar</p>
          <p>
            Komponen buat nampilin thumbnail yg bulet. Sebenernya fungsinya kayak komponen
            <a href="#thumbnail">thumbnail</a>, cuma ini lebih straightforward dan spesifik buat
            avatar kayak avatar admin atau logo partner aja.
          </p>

          <div class="divide-y divide-grey-4 grid gap-2">
            <div class="flex justify-between">
              <p class="font-semibold">Design</p>
              <help-button icon-only icon="code" bg-color="transparent" color="grey-1" />
            </div>
            <p></p>
          </div>
          <div class="grid grid-flow-col auto-cols-max gap-1">
            <help-avatar
              src="https://img.okezone.com/content/2017/07/11/205/1734089/rhythm-of-people-jadi-ajang-iga-massardi-kolaborasi-bareng-kikan-hingga-coki-netral-8pUCnHgLmx.jpg"
            />
            <help-avatar
              src="https://www.whiteboardjournal.com/wp-content/uploads/2020/07/Fathia-12.jpg"
            />
            <help-avatar :src="require('@/assets/partnerlogo/OVO-logo-circle.png')" :size="40" />
            <help-avatar
              :src="require('@/assets/partnerlogo/lalamove-logo-circle.png')"
              :size="40"
            />
            <help-avatar
              src="https://nos.jkt-1.neo.id/mcdonalds/assets/ico/richlink.jpg"
              :size="32"
            />
            <help-avatar src="" :size="32" placeholder="Putri" />
          </div> -->
        <!-- <pre class="text-white bg-grey-1 rounded p-4 overflow-x-auto">
<code>&lt;<span class="tag">help-avatar</span> <span class="prop">src</span>=<span class="string">""</span> :<span class="prop">size</span>="32" <span class="prop">placeholder</span>=<span class="string">"Putri"</span> /&gt;</code>
<code>&lt;<span class="tag">help-avatar</span>
  <span class="prop">src</span>=<span class="string">"https://www.whiteboardjournal.com/wp-content/uploads/2020/07/Fathia-12.jpg"</span>
  :<span class="prop">size</span>="32"
/&gt;
&lt;<span class="tag">help-avatar</span> <span class="prop">src</span>=<span class="string">"https://nos.jkt-1.neo.id/mcdonalds/assets/ico/richlink.jpg"</span> :<span class="prop">size</span>="32" /&gt;
&lt;<span class="tag">help-avatar</span> :<span class="prop">src</span>=<span class="string">"require('@/assets/partnerlogo/OVO-logo-circle.png')"</span> :<span class="prop">size</span>="40" /&gt;
&lt;<span class="tag">help-avatar</span> :<span class="prop">src</span>=<span class="string">"require('@/assets/partnerlogo/lalamove-logo-circle.png')"</span> :<span class="prop">size</span>="40" /&gt;
&lt;<span class="tag">help-avatar</span>
  <span class="prop">src</span>="<span class="string">https://awsimages.detik.net.id/community/media/visual/2020/09/25/kristo-immanuel_34.jpeg?"</span>
  :<span class="prop">size</span>="64"
/&gt;</code>
</pre> -->

        <!-- <div class="divide-y divide-grey-4 grid gap-2">
            <p class="font-semibold">Props</p>
            <p></p>
          </div>
          <help-table
            :footer="false"
            :columns="[
              { field: 'prop', label: 'Prop' },
              { field: 'description', label: 'Description' },
              { field: 'type', label: 'Type' },
              { field: 'default', label: 'Default' },
            ]"
            :rows="[
              {
                prop: 'size',
                description: 'Diameter avatar, akan dianggap px',
                type: 'Number',
                default: 64,
              },
              {
                prop: 'src',
                description: 'Image yang akan ditampilkan',
                type: 'String',
                default: '',
              },
              {
                prop: 'placeholder',
                description: 'Text untuk diambil index ke-0-nya apabila src tidak ada',
                type: 'String',
                default: '',
              },
            ]"
          />
        </section> -->

        <help-component id="avatar" title="Avatar" :props="avatarProps">
          <template v-slot:description>
            <p>
              Komponen buat nampilin thumbnail yg bulet. Sebenernya fungsinya kayak komponen
              <a href="#thumbnail">thumbnail</a>, cuma ini lebih straightforward dan spesifik buat
              avatar kayak avatar admin atau logo partner aja.
            </p>
          </template>

          <template v-slot:design>
            <div class="grid grid-flow-col auto-cols-max gap-1">
              <help-avatar
                src="https://img.okezone.com/content/2017/07/11/205/1734089/rhythm-of-people-jadi-ajang-iga-massardi-kolaborasi-bareng-kikan-hingga-coki-netral-8pUCnHgLmx.jpg"
              />
              <help-avatar
                src="https://www.whiteboardjournal.com/wp-content/uploads/2020/07/Fathia-12.jpg"
              />
              <help-avatar :src="require('@/assets/partnerlogo/OVO-logo-circle.png')" :size="40" />
              <help-avatar
                :src="require('@/assets/partnerlogo/lalamove-logo-circle.png')"
                :size="40"
              />
              <help-avatar
                src="https://nos.jkt-1.neo.id/mcdonalds/assets/ico/richlink.jpg"
                :size="32"
              />
              <help-avatar src="" :size="32" placeholder="Admin" />
            </div>
          </template>
        </help-component>

        <help-component id="badge" title="Badge" :props="badgeProps">
          <template v-slot:description>
            <p>
              Pas untuk display hal-hal yg tipenya boolean atau enum. Misalnya status seperti
              <i>Terverifikasi</i>, <i>Pending</i>, <i>Verifikasi Gagal</i>, dan
              <i>Akun disabled</i>
            </p>
          </template>

          <template v-slot:design>
            <div class="grid grid-flow-col auto-cols-max gap-1">
              <help-badge label="Rp 300.120" color="positive" icon="chevron-up" />
              <help-badge label="Rp 300.120" icon="chevron-down" />
              <help-badge label="Verivied" color="positive" />
              <help-badge label="Not Verivied" />
            </div>
          </template>
        </help-component>

        <help-component id="button" title="Button" :props="buttonProps">
          <template v-slot:description>
            <p>
              Berfungsi seperti button pada umumnya.
            </p>
          </template>
          <template v-slot:design>
            <div class="grid grid-flow-col auto-cols-max gap-1 place-items-center">
              <div>
                <help-button label="yes i'm sure" />
              </div>
              <div>
                <help-button label="edit" icon="edit" />
              </div>
              <div>
                <help-button
                  label="cancel"
                  bg-color="transparent"
                  color="grey-1"
                />
              </div>
              <div>
                <help-button
                  icon-only
                  icon="close"
                  bg-color="transparent"
                  color="grey-1"
                />
              </div>
            </div>
          </template>
        </help-component>
      </div>
    </div>
  </div>
</template>

<script>
import HelpComponent from '@/components/templates/_Component.vue';
import HelpAvatar from '@/components/atoms/Avatar.vue';
import HelpBadge from '@/components/atoms/Badge.vue';
import HelpButton from '@/components/atoms/Button.vue';
// import HelpTable from '@/components/templates/Table.vue';

export default {
  name: 'Components',
  components: {
    HelpComponent,
    HelpAvatar,
    HelpBadge,
    HelpButton,
    // HelpTable,
  },
  data() {
    return {
      avatarProps: [
        {
          prop: 'size',
          description: 'Diameter avatar, akan dianggap px',
          type: 'Number',
          default: 64,
        },
        {
          prop: 'src',
          description: 'Image yang akan ditampilkan',
          type: 'String',
          default: '',
          examples: ['https://...', "require('@/assets/...')"],
        },
        {
          prop: 'placeholder',
          description: 'Text untuk diambil index ke-0-nya apabila src tidak ada',
          type: 'String',
          default: '',
        },
      ],
      badgeProps: [
        {
          prop: 'label',
          description: 'Isinya',
          type: 'String',
          default: '',
        },
        {
          prop: 'icon',
          description: 'Kalo di kirinya mau ada icon. Referensinya icon name',
          type: 'String',
          default: '',
          examples: ['chevron-up', 'chevron-down'],
        },
        {
          prop: 'color',
          description: 'Tema badgenya. Sementara cuma 3 presetnya',
          type: 'String',
          default: 'negative',
          examples: ['positive', 'negative', 'warning'],
        },
      ],
      buttonProps: [
        {
          prop: 'bg-color',
          description: 'Warna background button, accepts tailwind color variables tanpa prefix',
          type: 'String',
          default: 'midnight',
          examples: ['mint', 'grey-500', 'red-600'],
        },
        {
          prop: 'color',
          description:
            'Warna text dan content lainnya, accepts tailwind color variables tanpa prefix',
          type: 'String',
          default: 'white',
          examples: ['mint-soft', 'grey-500', 'red-600'],
        },
        {
          prop: 'label',
          description: 'Text di dalem buttonnya',
          type: 'String',
          default: '',
          examples: ['cancel', 'save changes'],
        },
        {
          prop: 'icon',
          description: 'Icon di kiri label, refer ke <icon /> name',
          type: 'String',
          default: '',
          examples: ['filter', 'close', 'edit'],
        },
        {
          prop: 'icon-only',
          description: 'Button tanpa label. Style buttonnya jadi lingkaran isinya icon aja.',
          type: 'Boolean',
          default: 'false',
        },
        {
          prop: 'loading',
          description: 'Loading state di dalam button',
          type: 'Boolean',
          default: false,
        },
        {
          prop: 'loading-label',
          description: 'Text yang ditampilin pas prop loading === true',
          type: 'String',
          default: '',
          examples: ['saving', 'transfering', 'updating'],
        },
        {
          prop: 'type',
          description: 'Native type button',
          type: 'String',
          default: '',
          examples: ['submit', 'button'],
        },
        {
          prop: 'disabled',
          description: 'Disabled state, kalo true jadi gabisa interaksi',
          type: 'Boolean',
          default: 'false',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
code {
  .tag {
    // color: #4788b6;
    @apply text-mint;
  }
  .prop {
    color: #00d0ff;
  }
  .string {
    // color: #a47553;
    @apply text-gold;
  }
}
</style>
