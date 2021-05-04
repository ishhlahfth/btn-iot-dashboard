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
        <a href="#nav-expandable-item">Nav Expandable Item</a>
        <a href="#nav-item">Nav Item</a>
        <a href="#option-item">Option Item</a>
        <a href="#radio-button">Radio Button</a>
        <a href="#thumbnail">Thumbnail</a>
        <a href="#toggle">Toggle</a>
        <a href="#tooltip">Tooltip</a>

        <p class="font-bold mb-2">Molecules</p>
        <a href="#menu-card">Menu Card</a>
        <a href="#navbar">Navbar</a>
        <a href="#option">Option</a>
        <a href="#select">Select</a>
        <a href="#sidebar">Sidebar</a>
        <a href="#table-footer">Table Footer</a>

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

        <help-component id="avatar" title="Avatar" :props="props.avatar">
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

        <help-component id="badge" title="Badge" :props="props.badge">
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

        <help-component id="button" title="Button" :props="props.button">
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
                <help-button label="cancel" bg-color="transparent" color="grey-1" />
              </div>
              <div>
                <help-button label="save" :loading="true" loading-label="updating" />
              </div>
              <div>
                <help-button icon-only icon="close" bg-color="transparent" color="grey-1" />
              </div>
            </div>
          </template>
        </help-component>

        <help-component id="checkbox" title="Checkbox" :props="props.checkbox">
          <template v-slot:description>
            <p>
              Berfungsi seperti checkbox pada umumnya. Cuma stylingnya aja yang disesuaiin sama UI
              yang lain.
            </p>
          </template>
          <template v-slot:design>
            <div class="grid grid-flow-col auto-cols-max gap-6">
              <help-checkbox v-model:checked="checkboxState" label="Checkbox label" />
              <help-checkbox
                v-for="obj in anArrayOfObj"
                :key="obj.id"
                v-model:checked="obj.state"
                :label="`Item ${obj.state}`"
              />
            </div>
          </template>
        </help-component>

        <help-component id="icon" title="Icon" :props="props.icon">
          <template v-slot:description>
            <p>
              Wrapper untuk display icon. Component ini dibuat biar seragam stylingnya dan juga biar
              gampang kalo mau ambil icon, tinggal sebut namanya aja. Icon yang dipake semua dari
              <a href="https://heroicons.com/" target="blank">heroicons.com</a>. Warna icon-icon ini
              bakal di-define di parent-nya. Bungkus sama div, div-nya kasih
              <code>class="text-red-600"</code> nanti baru jadi merah
            </p>
          </template>
          <template v-slot:design>
            <div class="grid grid-flow-col auto-cols-max gap-1">
              <icon name="user-group" />
              <icon name="cube" />
              <icon name="download" />
              <icon name="chevron-down" />
              <div class="text-red-600">
                <icon name="shield" />
              </div>
              <icon name="edit" :size="6" />
              <icon name="photograph" :size="6" />
            </div>
          </template>
          <template v-slot:update-guide>
            <ul class="list-disc list-outside">
              <li>Nambahin icon baru:</li>
              <ol class="list-decimal list-outside">
                <li>Buka <a href="https://heroicons.com/" target="blank">heroicons.com</a></li>
                <li>Pilih icon yang mau di-add (disarankan yang Solid, bukan yang Outline)</li>
                <li>Hover lalu copy JSX-nya</li>
                <li>Paste ke dalem &lt;template&gt; component Icon.vue</li>
                <li>Hapus tag &lt;svg&gt;-nya</li>
                <li>
                  Kalau sisa lebih dari 1 &lt;path&gt; tag, bungkus pakai &lt;template&gt; kayak
                  icon "clipboard"
                </li>
                <li>Kasih v-if dengan kondisi namanya</li>
                <li>Kalau cuma sisa 1 &lt;path&gt; tag, langsung kasih v-if</li>
              </ol>
            </ul>
          </template>
        </help-component>

        <help-component id="input" title="Input" :props="props.input">
          <template v-slot:description>
            Input field seperti input pada umumnya, stylingnya aja yang udah disesuaiin
          </template>
          <template v-slot:design>
            <div class="grid auto-cols-max gap-1">
              <div class="grid grid-flow-col auto-cols-max gap-1">
                <help-input
                  v-model="inputState"
                  label="Username"
                  placeholder="Type your username"
                />
                <help-input v-model="inputState" placeholder="This input has no label" />
              </div>

              <help-input
                v-model="inputState"
                label="Right icon"
                placeholder="With a right icon"
                right-icon="search"
              />
              <help-input
                v-model="inputState"
                label="Left icon"
                placeholder="With a left icon"
                left-icon="user-group"
              />
              <help-input
                v-model="inputState"
                label="Search Bar"
                placeholder="Search merchant name here"
                search-bar
              />
              <help-input
                v-model="inputState"
                label="Textarea"
                placeholder="This input is for larger edit experience"
                type="textarea"
                :rows="3"
              />
            </div>
          </template>
        </help-component>

        <help-component
          id="nav-expandable-item"
          title="Nav Expandable Item"
          :props="props.navExpandableItem"
        >
          <template v-slot:description>
            <p>
              Khusus dibuat untuk component <a href="#sidebar">sidebar</a>, so far nggak reusable.
              Ini buat menu yang beranak.
            </p>
          </template>
          <template v-slot:design>
            <div class="bg-midnight w-64">
              <nav-expandable-item
                :menu="{
                  path: '/components',
                  label: 'Menu',
                  icon: 'user',
                  subMenu: [
                    { path: '/bns/dummy-page-1', label: 'First', icon: '' },
                    { path: '/bns/dummy-page-2', label: 'Second', icon: '' },
                    { path: '/bns/dummy-page-3', label: 'Third', icon: '' },
                  ],
                }"
              />
            </div>
          </template>
        </help-component>

        <help-component id="nav-item" title="Nav Item" :props="props.navItem">
          <template v-slot:description>
            <p>
              Khusus dibuat untuk component <a href="#sidebar">sidebar</a>, so far nggak reusable.
              Ini buat menu yang enggak beranak.
            </p>
          </template>
          <template v-slot:design>
            <div class="bg-midnight w-64">
              <nav-item
                :menu="{
                  path: '/',
                  label: 'Menu',
                  icon: 'user',
                }"
              />
            </div>
          </template>
        </help-component>

        <help-component id="option-item" title="Option Item" :props="props.optionItem">
          <template v-slot:description>
            <p>
              Khusus dibuat untuk component <a href="#select">select</a>, so far nggak reusable.
            </p>
          </template>
          <template v-slot:design>
            <div class="grid grid-flow-col auto-cols-max gap-1">
              <help-option-item label="Unselected" />
              <help-option-item label="Selected" selected />
            </div>
          </template>
        </help-component>

        <help-component id="radio-button" title="Radio Button" :props="props.radioButton">
          <template v-slot:description>
            <p>Input radio button kayak native radio button, cuma stylingnya aja yg disesuaiin.</p>
          </template>
          <template v-slot:design>
            <div class="grid grid-flow-col auto-cols-max gap-6">
              <help-radio v-model="radioState1" group="example-group" label="Radio 1" />
              <help-radio v-model="radioState2" group="example-group" label="Radio 2" />
              <help-radio v-model="radioState3" group="example-group" label="Radio 3" />
            </div>
          </template>
        </help-component>

        <help-component id="thumbnail" title="Thumbnail" :props="props.thumbnail">
          <template v-slot:description>
            <p>
              Wrapper tag &lt;img&gt; buat display image apapun lengkap sama placeholdernya juga.
            </p>
          </template>
          <template v-slot:design>
            <div class="grid grid-flow-col auto-cols-max gap-1">
              <help-thumbnail src="" :width="196" :height="80" />
              <help-thumbnail
                src="https://wehelpyou-content.s3-ap-southeast-1.amazonaws.com/banners/Cashback50-BannerInApps_Low_.png"
                :width="196"
                :height="80"
              />
              <help-thumbnail
                src="https://www.couvee.co.id/wp-content/uploads/2019/11/CF4566E9-0DC2-43F1-ABC9-F1BED1F0A9CE-768x768.jpg"
                :width="80"
                :height="80"
              />
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
import HelpCheckbox from '@/components/atoms/Checkbox.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpOptionItem from '@/components/atoms/OptionItem.vue';
import HelpRadio from '@/components/atoms/Radio.vue';
import HelpThumbnail from '@/components/atoms/Thumbnail.vue';
import Icon from '@/components/atoms/Icon.vue';
import NavExpandableItem from '@/components/atoms/NavExpandableItem.vue';
import NavItem from '@/components/atoms/NavItem.vue';
// import HelpTable from '@/components/templates/Table.vue';

export default {
  name: 'Components',
  components: {
    HelpComponent,
    HelpAvatar,
    HelpBadge,
    HelpButton,
    HelpCheckbox,
    HelpInput,
    HelpOptionItem,
    HelpRadio,
    // HelpTable,
    HelpThumbnail,
    Icon,
    NavExpandableItem,
    NavItem,
  },
  data() {
    return {
      props: {
        avatar: [
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
        badge: [
          {
            prop: 'label',
            description: 'Isinya',
            type: 'String',
            default: '',
          },
          {
            prop: 'icon',
            description: 'Kalo di kirinya mau ada icon. Referensinya <icon /> name',
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
        button: [
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
        checkbox: [
          {
            prop: 'v-model:checked',
            description: 'Checkbox state',
            type: 'Boolean',
            default: false,
          },
          {
            prop: 'label',
            description: 'Text untuk checkbox',
            type: 'String',
            default: '',
          },
          {
            prop: 'disabled',
            description: 'Native disabled state untuk input checkbox',
            type: 'Boolean',
            default: false,
          },
        ],
        icon: [
          {
            prop: 'name',
            description: 'Nama iconnya. List available name-nya di v-if tiap path svg-nya',
            type: 'Boolean',
            default: '',
            examples: ['chevron-up', 'close', 'home'],
          },
          {
            prop: 'size',
            description:
              'Dimensi wrappernya. Udah pasti square. Accepts tailwind width/height variables tanpa prefix',
            type: 'String, Number',
            default: false,
          },
        ],
        input: [
          {
            prop: 'v-model',
            description: 'Input value state',
            type: 'String',
            default: '',
          },
          {
            prop: 'label',
            description: 'Label text di atas input fieldnya',
            type: 'String',
            default: '',
          },
          {
            prop: 'label-class',
            description: 'Tambahan class buat label, accepts all tailwind utilities',
            type: 'String',
            default: '',
          },
          {
            prop: 'placeholder',
            description: 'Placeholder text di dalem input field',
            type: 'String',
            default: '',
          },
          {
            prop: 'type',
            description: 'Native input type',
            type: 'String',
            default: 'text',
            examples: ['textarea', 'password', 'email'],
          },
          {
            prop: 'rows',
            description: 'Native rows prop untuk <textarea> tag',
            type: 'Number',
            default: 3,
          },
          {
            prop: 'left-icon',
            description: 'Siapa tau mau naruh icon di kiri. Accepts all <icon> name.',
            type: 'String',
            default: '',
            examples: ['code', 'cube', 'dots-vertical'],
          },
          {
            prop: 'right-icon',
            description: 'Siapa tau mau naruh icon di kanan. Accepts all <icon> name.',
            type: 'String',
            default: '',
            examples: ['download', 'refresh', 'search'],
          },
          {
            prop: 'search-bar',
            description: 'Mengubah field jadi search bar lengkap dgn icon search & clear',
            type: 'Boolean',
            default: false,
          },
          {
            prop: 'mask',
            description: 'Format v-maska biar output state sesuai yang diharapkan',
            type: 'String',
            default: '',
            examples: ['##-##-##', '##:##', 'more at beholdr.github.io/maska/'],
          },
        ],
        navExpandableItem: [
          {
            prop: 'menu',
            description: "Object berisi key 'path', 'label', 'icon', dan 'subMenu'",
            type: 'Object',
            default: '',
            examples: [
              {
                path: '/components',
                label: 'Menu',
                icon: 'user',
                subMenu: [
                  { path: '/bns/dummy-1', label: 'First', icon: '' },
                  { path: '/bns/dummy-2', label: 'Second', icon: '' },
                  { path: '/bns/dummy-3', label: 'Third', icon: '' },
                ],
              },
            ],
          },
          {
            prop: 'mini-sidebar',
            description: 'Mini sidebar state buat di-watch',
            type: 'Boolean',
            default: false,
          },
        ],
        navItem: [
          {
            prop: 'menu',
            description: "Object berisi key 'path', 'label', dan 'icon'",
            type: 'Object',
            default: '',
            examples: [
              {
                path: '/',
                label: 'Menu',
                icon: 'user',
              },
            ],
          },
        ],
        optionItem: [
          {
            prop: 'selected',
            description: 'State yg jadi penanda item ini lagi dipilih apa enggak',
            type: 'Boolean',
            default: false,
          },
          {
            prop: 'label',
            description: 'Text isi itemnya',
            type: 'String, Number',
            default: '',
          },
        ],
        radioButton: [
          {
            prop: 'v-model',
            description: 'Radio button state',
            type: 'Boolean',
            default: false,
          },
          {
            prop: 'group',
            description: 'Identifier yang mengelompokkan beberapa radio button',
            type: 'String',
            default: '',
          },
          {
            prop: 'label',
            description: 'Text untuk radio button',
            type: 'String',
            default: '',
          },
          {
            prop: 'disabled',
            description: 'Native disabled state untuk input radio button',
            type: 'Boolean',
            default: false,
          },
        ],
        thumbnail: [
          {
            prop: 'width',
            description:
              'Lebar thumbnail. Kalo ngasih Number bakal diconvert ke px, kalo String langsung jadi width-nya',
            type: 'Number, String',
            default: 160,
            examples: [320, '85%', '50vw'],
          },
          {
            prop: 'height',
            description: 'Tinggi thumbnail. Sama kayak width.',
            type: 'Number, String',
            default: 160,
            examples: [80, '25%', '75vh'],
          },
          {
            prop: 'src',
            description: 'Native src prop buat <img> tag',
            type: 'String',
            default: '',
            examples: ['https://help-bns-bucket...'],
          },
          {
            prop: 'use-bg',
            description: "Prop src dipake jadi 'background-image'-nya CSS",
            type: 'Boolean',
            default: false,
          },
        ],
      },
      checkboxState: true,
      anArrayOfObj: [
        { state: false, id: 1 },
        { state: false, id: 2 },
        { state: true, id: 3 },
      ],
      inputState: '',
      radioState1: true,
      radioState2: true,
      radioState3: false,
    };
  },
};
</script>

<style lang="scss" scoped>
a {
  @apply text-royal;
}
ul,
ol {
  @apply pl-4;
  li {
    @apply mb-2;
  }
}
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
