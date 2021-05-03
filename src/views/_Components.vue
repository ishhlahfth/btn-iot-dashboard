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
        <section id="avatar" class="grid gap-8 auto-rows-max">
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
          </div>
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

          <div class="divide-y divide-grey-4 grid gap-2">
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
        </section>

        <section id="badge" class="grid gap-8 auto-rows-max">
          <p class="text-heading2 font-semibold text-midnight">Badge</p>
          <p>
            Pas untuk display hal-hal yg tipenya boolean atau enum. Misalnya status seperti
            <i>Terverifikasi</i>, <i>Pending</i>, <i>Verifikasi Gagal</i>, dan <i>Akun disabled</i>
          </p>

          <div class="divide-y divide-grey-4 grid gap-2">
            <div class="flex justify-between">
              <p class="font-semibold">Design</p>
              <help-button icon-only icon="code" bg-color="transparent" color="grey-1" />
            </div>
            <p></p>
          </div>

          <div class="grid grid-flow-col auto-cols-max gap-1">
            <help-badge label="Rp 300.120" color="positive" icon="chevron-up" />
            <help-badge label="Rp 300.120" icon="chevron-down" />
            <help-badge label="Verivied" color="positive" />
            <help-badge label="Not Verivied" />
          </div>

          <div class="divide-y divide-grey-4 grid gap-2">
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
              { field: 'examples', label: 'Examples' },
            ]"
            :rows="[
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
            ]"
          >
            <template v-slot:body="{ column, row }">
              <div v-if="column === 'examples'">
                <code
                  v-for="(example, index) in row.examples"
                  :key="index"
                  class="rounded bg-grey-4 bg-opacity-50 mr-1 px-2"
                >
                  {{ example }}
                </code>
              </div>
            </template>
          </help-table>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import HelpAvatar from '@/components/atoms/Avatar.vue';
import HelpBadge from '@/components/atoms/Badge.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpTable from '@/components/templates/Table.vue';

export default {
  name: 'Components',
  components: {
    HelpAvatar,
    HelpBadge,
    HelpButton,
    HelpTable,
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
