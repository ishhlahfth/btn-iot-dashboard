<template>
  <help-modal v-model="modal.sm" permanent>
    <confirmation
      title="Changes confirmation"
      message="Are you sure you want to suspend this merchant?"
      @close="modal.sm = false"
      @cancel="modal.sm = false"
      @confirm="modal.sm = false"
    />
  </help-modal>

  <help-modal v-model="modal.md">
    <div class="grid gap-6 inner-modal-auto modal-md overflow-auto">
      <div class="flex justify-between items-center">
        <p class="text-heading4 font-semibold">Couvee Tj. Duren</p>
        <help-button
          icon-only
          icon="close"
          bg-color="transparent"
          color="grey-1"
          @click="modal.md = false"
        />
      </div>

      <div class="grid grid-cols-2 auto-rows-max gap-4 sm:gap-6 font-medium">
        <p class="text-grey-2">Sunday</p>
        <p class="place-self-end">08:00 - 21:00</p>
        <p class="text-grey-2">Monday</p>
        <p class="place-self-end">08:00 - 21:00</p>
        <p class="text-grey-2">Tuesday</p>
        <p class="place-self-end text-flame">Off</p>
        <p class="text-grey-2">Wednesday</p>
        <p class="place-self-end">08:00 - 21:00</p>
        <p class="text-grey-2">Thursday</p>
        <p class="place-self-end">08:00 - 21:00</p>
        <p class="text-grey-2">Friday</p>
        <p class="place-self-end">08:00 - 21:00</p>
        <p class="text-grey-2">Saturday</p>
        <p class="place-self-end">08:00 - 21:00</p>
      </div>
    </div>
  </help-modal>

  <help-modal v-model="modal.lg">
    <div class="grid gap-6 modal-lg inner-modal-auto overflow-auto">
      <div class="flex justify-between items-center">
        <p class="text-heading4 font-semibold">Banner detail</p>
        <help-button
          icon-only
          icon="close"
          bg-color="transparent"
          color="grey-1"
          @click="modal.lg = false"
        />
      </div>

      <div class="grid gap-2 md:gap-4 md:grid-flow-col md:grid-cols-12 mb-4">
        <div class="md:col-span-5 grid gap-2 md:gap-8 font-medium">
          <div class="grid gap-1">
            <p class="text-grey-2">Title</p>
            <p>Sekarang Bisa Pesan makan Dari Wehelpyou Eat, Banyak Metode Pembayarannya Loh</p>
          </div>

          <div class="grid gap-1">
            <p class="text-grey-2">Redirect URL</p>
            <a
              href="https://www.wehelpyou.id/post/sekarang-bisa-pesan-makan-dari-wehelpyou-eat-banyak-metode-pembayarannya-loh"
              target="blank"
              class="text-royal cursor-pointer hover:underline"
            >
              https://www.wehelpyou.id/post/sekarang-bisa-pesan-makan-dari-wehelpyou-eat-banyak-metode-pembayarannya-loh
            </a>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-1">
              <p class="text-grey-2">Starts at</p>
              <p>31 Nov 2021</p>
            </div>
            <div class="grid gap-1">
              <p class="text-grey-2">Ends at</p>
              <p>31 Dec 2021</p>
            </div>
          </div>
        </div>

        <div class="md:col-span-7 md:grid template-rows-auto-1fr-auto">
          <p class="font-medium mb-1 text-grey-2">Banner image</p>
          <help-thumbnail
            class="mb-1"
            width="100%"
            src="https://help-bns-bucket.s3-ap-southeast-1.amazonaws.com/6b1d3a40-6d81-4a6b-92e8-0fc90709c9b3.png"
            :height="screenWidth < 640 && !banner.image_url ? 128 : ''"
          />
        </div>
      </div>
    </div>
  </help-modal>

  <help-modal v-model="modal.xl">
    <div
      class="grid grid-flow-row sm:grid-flow-col gap-6 inner-modal-fixed modal-xl overflow-auto animate-pulse"
    >
      <div class="grid gap-4 auto-rows-max overflow-auto">
        <div class="w-full grid place-items-center py-8">
          <div class="w-44 h-44 rounded-full bg-grey-4"></div>
        </div>
        <div class="grid grid-cols-2 gap-y-4 gap-x-6 sm:gap-x-14 font-medium">
          <div v-for="i in 10" :key="i" class="rounded bg-grey-4 h-4" />
        </div>
        <div class="divide-y divide-grey-4">
          <p></p>
          <p></p>
        </div>
        <div class="grid grid-cols-2 gap-y-4 gap-x-6 sm:gap-x-14 font-medium">
          <div v-for="i in 6" :key="i" class="rounded bg-grey-4 h-4" />
        </div>
        <div class="divide-y divide-grey-4">
          <p></p>
          <p></p>
        </div>
        <div class="grid grid-cols-2 gap-y-4 gap-x-6 sm:gap-x-14 font-medium">
          <div class="rounded bg-grey-4 h-4"></div>
        </div>
        <div class="divide-y divide-grey-4 sm:hidden">
          <p></p>
          <p></p>
        </div>
      </div>

      <div class="overflow-auto hide-scrollbar">
        <div>
          <div class="sm:pl-2 py-1">
            <div class="rounded bg-grey-4 h-4 w-32"></div>
          </div>
          <div class="divide-y divide-grey-4">
            <menu-card v-for="i in 5" :key="i" :loading="true" />
          </div>
        </div>
      </div>
    </div>
  </help-modal>

  <div class="w-screen grid grid-flow-col grid-cols-12">
    <div class="col-span-2 h-screen overflow-auto">
      <div class="p-4 grid gap-4 auto-rows-max">
        <p class="font-bold mb-2"># Atoms</p>
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
        <!-- <a href="#tooltip">Tooltip</a> -->

        <p class="font-bold mb-2"># Molecules</p>
        <a href="#menu-card">Menu Card</a>
        <a href="#navbar">Navbar</a>
        <a href="#option">Option</a>
        <a href="#select">Select</a>
        <a href="#sidebar">Sidebar</a>
        <a href="#table-footer">Table Footer</a>

        <p class="font-bold mb-2"># Templates</p>
        <a href="#modal">Modal</a>
        <a href="#table">Table</a>

        <p class="font-bold mb-2"># Guides</p>
        <a href="#initiating-menu">Initiating Menu</a>
        <a href="#get-feature">Get Feature</a>
        <a href="#create-feature">Create Feature</a>
        <a href="#edit-feature">Edit Feature</a>
        <a href="#delete-feature">Delete Feature</a>
        <a href="#git-flow">Git Flow</a>
      </div>
    </div>

    <div class="col-span-10 h-screen overflow-auto">
      <div class="p-8 grid gap-12 auto-rows-min">
        <p class="text-heading2 bg-midnight-dark text-white py-4 px-6 rounded font-bold"># Atoms</p>

        <help-component id="avatar" title="Avatar" :props="props.avatar" :slots="slots.avatar">
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

        <help-component id="toggle" title="Toggle" :props="props.toggle" :events="events.toggle">
          <template v-slot:description>
            <p>
              Biasanya buat display sesuatu yg boolean. Bisa dipencet-pencet buat turn on/off juga.
            </p>
          </template>
          <template v-slot:design>
            <div class="grid grid-flow-col auto-cols-max gap-1">
              <help-toggle v-model="toggleState" @change="toggleState = $event" />
            </div>
          </template>
        </help-component>

        <p class="text-heading2 bg-midnight-dark text-white py-4 px-6 rounded font-bold">
          # Templates
        </p>

        <help-component id="modal" title="Modal" :props="props.modal" :slots="slots.modal">
          <template v-slot:description>
            <p>
              Ini frekuensi terpakainya tinggi. Di beberapa tempat, malah ada modal yang seolah-olah
              nggantiin perannya page. Oiya, component ini berfungsi sebagai ibaratnya frame-nya aja
              ya, biar contentnya stay customizable.
            </p>
            <p>
              Cara pakenya, taruh
              <code class="highlight">&lt;help-modal&gt;</code> di root element di suatu page, terus
              isi slotnya. Ada beberapa class yang possible buat dipake di dalem slotnya. Buat
              menentukan size modal ada 2 pilihan, kalau mau ngikut content-nya kasih class
              <code class="highlight">inner-modal auto</code> (biasanya buat modal-modal yg role-nya
              kayak modal pada umumnya), kalo udah pasti ukurannya pake
              <code class="highlight">inner-modal-fixed</code> (ini bagusnya buat modal gede yang
              hampir kayak page).
            </p>
            <p>
              Ada beberapa class juga yang dipake barengan sama 2 class sebelumnya buat menentukan
              size constraint-nya: <code class="highlight">modal-sm</code>,
              <code class="highlight">modal-md</code>, <code class="highlight">modal-lg</code>,
              <code class="highlight">modal-xl</code>. Usahakan pakai 4 class itu aja supaya
              konsisten ukuran-ukurannya.
            </p>

            <p>
              Jadi nanti contoh pemakaiannya begini. Misal buat modal konfirmasi yang nge-prompt
              user mau OK atau cancel, cukup pake modal yang kecil aja jadi nanti slot classnya
              <code class="highlight">&lt;div class="...inner-modal-auto modal-sm...&gt;</code>.
              Contoh lain misal bikin modal yang nampilin banyak detail pingin yang gede, lebih
              bijak kalo dibikin fixed
              <code class="highlight"
                >&lt;div class="...inner-modal-fixed modal-xl overflow-auto...&gt;
              </code>
              (jangan lupa kasih overflow-auto karena besar kemungkinan content-nya lebih banyak
              daripada containernya).
            </p>
          </template>
          <template v-slot:design>
            <div class="grid grid-flow-col auto-cols-max gap-1">
              <help-button
                label="show modal-sm"
                bg-color="transparent"
                color="grey-1"
                @click="modal.sm = true"
              />
              <help-button
                label="show modal-md"
                bg-color="transparent"
                color="grey-1"
                @click="modal.md = true"
              />
              <help-button
                label="show modal-lg"
                bg-color="transparent"
                color="grey-1"
                @click="modal.lg = true"
              />
              <help-button
                label="show modal-xl"
                bg-color="transparent"
                color="grey-1"
                @click="openMerchantDetail"
              />
            </div>
          </template>
        </help-component>

        <help-component
          id="table"
          title="Table"
          :props="props.table"
          :events="events.table"
          :slots="slots.table"
        >
          <template v-slot:description>
            <p>
              Wrapper &lt;table&gt; tag yang udah styling & fungsionalitasnya udah dibuat sedemikian
              rupa sehingga memudahkan kalo mau display data-data tabulasi. Mostly data-data yang
              ditampilin di dashboard adalah data tabulasi, jadi ini salah satu component yang akan
              sering dipake.
            </p>
            <p>
              Core-nya component ini ada di prop <code class="highlight">columns</code> sama
              <code class="highlight">rows</code>. Kedua props itu bentuknya array of object. Asal
              key di <code class="highlight">rows[i]</code> ada juga di salah satu
              <code class="highlight">columns[i].field</code>, value-nya pasti muncul tepat di cell
              yang diharapkan.
            </p>
            <p>
              Kadang di dalem &lt;td&gt; butuh lebih dari sekedar string. Nah buat mengakomodasi
              kemudahan ganti-ganti isi &lt;td&gt;, udah disediain slot. Di dalem slotnya, pasang
              logic berdasarkan column-nya. Jangan ngasih logic di
              <code class="highlight">Table.vue</code>-nya kayak pattern di
              <a
                href="https://bitbucket.org/helpappsdev/backoffice-help-public/src/develop/"
                target="blank"
              >
                Repo Dashboard Delivery
              </a>
              ya, karena nggak enak kalo bacanya nyampur. Rasanya lebih bijak kalo dedicated di tiap
              slot aja logicnya. Contohnya nanti dijelaskan lebih lanjut di
              <a href="#">GET Feature</a>.
            </p>
          </template>
          <template v-slot:design>
            <help-table :footer="false" :columns="table.columns" :rows="table.rows">
              <template v-slot:body="{ column, row }">
                <p v-if="column === 'menu'" class="text-royal font-medium cursor-pointer">
                  See Detail
                </p>
                <help-badge
                  v-if="column === 'verify_status'"
                  :label="row.verify_status"
                  :color="
                    row.verify_status === 'Terverifikasi'
                      ? 'positive'
                      : row.verify_status === 'Pending'
                      ? 'warning'
                      : 'negative'
                  "
                />
              </template>
            </help-table>
          </template>
        </help-component>

        <p class="text-heading2 bg-midnight-dark text-white py-4 px-6 rounded font-bold">
          # Guides
        </p>

        <div id="initiating-menu" class="grid gap-8">
          <p class="text-heading2 font-semibold text-midnight">Initiating Menu</p>
          <p>
            Sampai waktu dokumentasi ini dibuat, ada 6 menu di dashboard app ini:
            <router-link to="/bns/merchant">Merchant</router-link>,
            <router-link to="/bns/order">Order</router-link>,
            <router-link to="/bns/transfer">Transfer</router-link>,
            <router-link to="/bns/payment">Payment</router-link>,
            <router-link to="/bns/banner">Banner</router-link>, dan
            <router-link to="/bns/admin">Admin</router-link>. Nggak kecil kemungkinannya buat nambah
            lagi. Ini rangkuman tentang gimana caranya buat initialize menu baru.
          </p>
          <p>Misalnya ada requirement bikin menu Role</p>
          <ol class="list-decimal list-outside">
            <li>
              Buat file baru Role.vue di dalam directory <code class="highlight">@/views</code>
            </li>
            <li>
              Mulai init struktur page-nya sama name-nya dulu aja. Spacing-nya baik padding maupun
              gap <i>harus</i> segini ya karena udah cakep dan sesuai sama prototype-nya, kalo mau
              ganti artinya ganti di semua page +di Figma juga.
              <pre class="text-white bg-grey-1 rounded p-4 mt-2 overflow-x-auto">
<code>&lt;<span class="tag">template</span>&gt;
  &lt;<span class="tag">div</span> <span class="prop">class</span>=<span class="string">"p-4 sm:p-6 grid gap-4 sm:gap-6"</span>&gt;
    &lt;<span class="tag">p</span> <span class="prop">class</span>=<span class="string">"text-heading2 font-semibold"</span>&gt;Role&lt;/<span class="tag">p</span>&gt;
  &lt;/<span class="tag">div</span>&gt;
&lt;/<span class="tag">template</span>&gt;

&lt;<span class="tag">script</span>&gt;
<span class="script">export default {</span>
  <span class="prop">name: <span class="string">'Role'</span></span>,
<span class="script">}</span>
&lt;/<span class="tag">script</span>&gt;</code>
</pre>
            </li>
            <li>
              Berikutnya set routing. Tambahin object di dalem children path
              <code class="highlight">/bns</code>. Set path, name, sama import component
              <code class="highlight">Role.vue</code> yang tadi udah dibuat.
            </li>
            <li>
              Terakhir, tambahin menu di sidebar. Di Sidebar.vue, tambahin satu object lagi di dalem
              state <code class="highlight">links</code>. Keys di dalem objectnya sesuai
              <a href="#nav-item">komponen nav item</a>. Set path buat routing sama path yang baru
              aja ditambahin, label, sama kasih icon yang relevan.
            </li>
          </ol>
        </div>

        <div id="get-feature" class="grid gap-8">
          <p class="text-heading2 font-semibold text-midnight">Get Feature</p>
          <p>
            Normalnya endpoint yang wajib ada di suatu menu ya endpoint GET All. Jadi setelah menu
            selesai dibuat, waktunya fetch data terus di-apply di app ini. Consuming endpoint GET
            dari backend sebenernya sederhana. Rasanya lebih baik kalo ngikut pattern ini biar
            konsisten.
          </p>
          <p>
            Misalnya lanjut menu Role aja ya.
          </p>
          <ol class="list-decimal list-outside">
            <li>
              Data yang diambil most of the time divisualisasikan dalam bentuk tabel. Jadi pertama
              siapin template buat tabelnya.
              <pre class="text-white bg-grey-1 rounded p-4 mt-2 overflow-x-auto">
<code>&lt;<span class="tag">template</span>&gt;
  &lt;<span class="tag">div</span> <span class="prop">class</span>=<span class="string">"p-4 sm:p-6 grid gap-4 sm:gap-6"</span>&gt;
    &lt;<span class="tag">p</span> <span class="prop">class</span>=<span class="string">"text-heading2 font-semibold"</span>&gt;Role&lt;/<span class="tag">p</span>&gt;
    &lt;<span class="tag">div</span> <span class="prop">class</span>=<span class="string">"overflow-hidden"</span>&gt;
      &lt;<span class="tag">help-table</span>
        <span class="prop">path</span>=<span class="string">"role"</span>
        :<span class="prop">columns</span>="<span class="prop">columns</span>"
        :<span class="prop">rows</span>="<span class="prop">roles</span>"
        :<span class="prop">loading</span>="<span class="prop">loading</span>"
        :<span class="prop">pagination</span>="<span class="prop">rolePagination</span>"
      /&gt;
    &lt;/<span class="tag">div</span>&gt;
  &lt;/<span class="tag">div</span>&gt;
&lt;/<span class="tag">template</span>&gt;

&lt;<span class="tag">script</span>&gt;
<span class="script">import <span class="prop">HelpTable</span> from <span class="string">'@/components/templates/Table.vue'</span></span>;
<span class="script">export default {</span>
  <span class="prop">name: <span class="string">'Role'</span></span>,
  <span class="prop">components: <span class="script">{</span></span>,
    <span class="prop">HelpTable</span>
  <span class="script">}</span>,
<span class="script">}</span>
&lt;/<span class="tag">script</span>&gt;</code>
</pre>
            </li>
            <li>
              Bikin state <code class="highlight">columns</code>,
              <code class="highlight">roles</code>, <code class="highlight">rolePagination</code>,
              sama <code class="highlight">loading</code> (data apa aja yang mau ditampilin sesuai
              sama requirement tasknya ya tentunya).
              <pre class="text-white bg-grey-1 rounded p-4 mt-2 overflow-x-auto">
<code>&lt;<span class="tag">script</span>&gt;
<span class="script">import <span class="prop">HelpTable</span> from <span class="string">'@/components/templates/Table.vue'</span></span>;
<span class="script">export default {</span>
  <span class="prop">name: <span class="string">'Role'</span></span>,
  <span class="prop">components: <span class="script">{</span></span>,
    <span class="prop">HelpTable</span>
  <span class="script">}</span>,
  <span class="script"><span class="text-yellow-300">data</span>() <span class="script">{</span></span>,
    <span class="script">return {</span>
      <span class="prop">columns</span>: [
        { <span class="prop">field</span>: <span class="string">'name'</span>, <span class="prop">label</span>: <span class="string">'role name'</span>, <span class="prop">sortable</span>: <span class="text-blue-600">true</span> },
        { <span class="prop">field</span>: <span class="string">'description'</span>, <span class="prop">label</span>: <span class="string">'description'</span> },
        { <span class="prop">field</span>: <span class="string">'is_active'</span>, <span class="prop">label:</span> <span class="string">'status'</span>, <span class="prop">align</span>: <span class="string">'center'</span> },
      ],
      <span class="prop">roles</span>: []
      <span class="prop">rolePagination</span>: {
        <span class="prop">limit</span>: <span class="text-yellow-300">10</span>,
        <span class="prop">offset</span>: <span class="text-yellow-300">0</span>,
        <span class="prop">sort</span>: <span class="string">'name'</span>, <span class="text-green-700">// kalo endpoint-nya support</span>
        <span class="prop">order</span>: <span class="string">'asc'</span>, <span class="text-green-700">// kalo endpoint-nya support</span>
      }
      <span class="prop">loading</span>: <span class="text-blue-600">false</span>
    <span class="script">}</span>
  <span class="script">}</span>,
<span class="script">}</span>
&lt;/<span class="tag">script</span>&gt;</code>
</pre>
            </li>
            <li>
              Create suatu method yang berfungsi untuk ngehit endpoint, lengkap ngirim paginationnya
              juga lewat param. Baiknya pagination kita jagain default valuenya juga.
              <pre class="text-white bg-grey-1 rounded p-4 mt-2 overflow-x-auto">
<code>&lt;<span class="tag">script</span>&gt;
<span class="script">export default {</span>
  <span class="prop">methods: <span class="script">{</span></span>,
    <span class="text-blue-600">async</span> <span class="text-yellow-300">getRoles<span class="prop">(<span class="text-yellow-300">{</span> pagination <span class="text-yellow-300">}</span>)</span></span> { <span class="text-green-700">// bentuk paramnya object biar nggak kesusahan nanti waktu ada mekanisme filter</span>
      <span class="text-blue-600">const</span> <span class="prop">limit</span> = <span class="prop">pagination</span>?.<span class="prop">limit</span> || <span class="text-yellow-300">10</span>;
      <span class="text-blue-600">const</span> <span class="prop">offset</span> = <span class="prop">pagination</span>?.<span class="prop">offset</span> || <span class="text-yellow-300">0</span>;
      <span class="text-blue-600">const</span> <span class="prop">sort</span> = <span class="prop">pagination</span>?.<span class="prop">sort</span> || <span class="string">'name'</span>;
      <span class="text-blue-600">const</span> <span class="prop">order</span> = <span class="prop">pagination</span>?.<span class="prop">order</span> || <span class="string">'asc'</span>;
      <span class="text-blue-600">const</span> <span class="prop">search</span> = <span class="text-blue-600">this</span>.<span class="prop">searchValue</span> || <span class="string">''</span>;

      <span class="text-blue-600">let</span> <span class="prop">url</span> = <span class="string">`merchants?offset=<span class="prop">${offset}</span>&limit=<span class="prop">${limit}</span>&sort=<span class="prop">${sort}</span>&order=<span class="prop">${order}</span>`</span>;

      <span class="text-blue-600">this</span>.<span class="prop">loading</span> = <span class="text-blue-600">true</span>;
      <span class="script">try</span> {
        <span class="text-green-700">// hit endpoint</span>
        <span class="text-green-700">// ...</span>
        <span class="text-green-700">// map response-nya dulu (kalo perlu)</span>
        <span class="text-green-700">// ...</span>
        <span class="text-green-700">// assign ke this.roles</span>
        <span class="text-green-700">// ...</span>

        <span class="text-green-700">// PENTING: update pagination</span>
        <span class="text-blue-600">this</span>.<span class="prop">rolePagination</span> = { <span class="prop">limit, offset, sort, order</span> };
      } <span class="script">catch</span> (<span class="prop">error</span>) {
        <span class="text-green-700">// ...</span>
      }
      <span class="text-blue-600">this</span>.<span class="prop">loading</span> = <span class="text-blue-600">false</span>;
    }
  <span class="script">}</span>,
  <span class="text-yellow-300">mounted() <span class="script">{</span></span>,
    <span class="text-green-700">// jangan lupa di-summon</span>
    <span class="text-blue-600">this</span>.<span class="text-yellow-300">getRoles<span class="prop">(<span class="text-yellow-300">{</span> pagination: <span class="text-blue-600">this</span>.<span class="prop">rolePagination</span> <span class="text-yellow-300">}</span>)</span></span>;
  <span class="script">}</span>,
<span class="script">}</span>
&lt;/<span class="tag">script</span>&gt;</code>
</pre>
            </li>
            <li>
              Di step ini, kalo key di object-object
              <code class="highlight">this.roles</code> sesuai sama field-field di
              <code class="highlight">this.columns</code>, harusnya data-data udah muncul di
              cell-nya masing-masing.
            </li>
            <li>
              Misalnya pingin ganti isi dari &lt;td&gt; di kolom
              <code class="highlight">is_active</code> dari yang awalnya
              <code class="highlight">String</code> jadi
              <a href="#badge">&lt;help-badge&gt;</a> biar lebih cakep. Kita perlu apply logic di
              dalem slot &lt;help-table&gt;. Caranya nggak susah, ini contohnya.
              <pre class="text-white bg-grey-1 rounded p-4 mt-2 overflow-x-auto">
<code>&lt;<span class="tag">template</span>&gt;
  &lt;<span class="tag">div</span> <span class="prop">class</span>=<span class="string">"p-4 sm:p-6 grid gap-4 sm:gap-6"</span>&gt;
    &lt;<span class="tag">p</span> <span class="prop">class</span>=<span class="string">"text-heading2 font-semibold"</span>&gt;Role&lt;/<span class="tag">p</span>&gt;
    &lt;<span class="tag">div</span> <span class="prop">class</span>=<span class="string">"overflow-hidden"</span>&gt;
      &lt;<span class="tag">help-table</span>
        <span class="prop">path</span>=<span class="string">"role"</span>
        :<span class="prop">columns</span>="<span class="prop">columns</span>"
        :<span class="prop">rows</span>="<span class="prop">roles</span>"
        :<span class="prop">loading</span>="<span class="prop">loading</span>"
        :<span class="prop">pagination</span>="<span class="prop">rolePagination</span>"
      &gt;
        &lt;<span class="tag">template</span> <span class="prop">v-slot</span>="{ <span class="prop">column, row</span> }"&gt;
          &lt;<span class="tag">help-badge</span>
            <span class="prop">v-if</span>="<span class="prop">column</span> === <span class="string">'is_active'</span>" <span class="text-green-700">// jadi pas nama kolomnya === 'is_active' yang di-render component ini</span>
            :<span class="prop">label</span>="<span class="prop">row.is_active</span> ? '<span class="string">Active</span>' : '<span class="string">Inactive'</span>"
            :<span class="prop">color</span>="<span class="prop">row.is_active</span> ? '<span class="string">positive</span>' : '<span class="string">negative'</span>"
          />
        &lt;/<span class="tag">template</span>&gt;
      &lt;<span class="tag">help-table</span>&gt;
    &lt;/<span class="tag">div</span>&gt;
  &lt;/<span class="tag">div</span>&gt;
&lt;/<span class="tag">template</span>&gt;

&lt;<span class="tag">script</span>&gt;
<span class="script">import <span class="prop">HelpBadge</span> from <span class="string">'@/components/atoms/Badge.vue'</span></span>;
<span class="script">export default {</span>
  <span class="text-green-700">// ...</span>
<span class="script">}</span>
&lt;/<span class="tag">script</span>&gt;</code>
</pre>
            </li>
            <li>
              Sekarang karena tabelnya udah sesuai yang dipengenin, langkah terakhir adalah buat
              handle next page, previous page, sama sort. Pake event
              <code class="highlight">@onChangePagination</code> sama
              <code class="highlight">@sort</code>, panggil lagi aja method buat fetch data dari API
              endpoint yang sama.
              <pre class="text-white bg-grey-1 rounded p-4 mt-2 overflow-x-auto">
<code>&lt;<span class="tag">template</span>&gt;
  &lt;<span class="tag">div</span> <span class="prop">class</span>=<span class="string">"p-4 sm:p-6 grid gap-4 sm:gap-6"</span>&gt;
    &lt;<span class="tag">p</span> <span class="prop">class</span>=<span class="string">"text-heading2 font-semibold"</span>&gt;Role&lt;/<span class="tag">p</span>&gt;
    &lt;<span class="tag">div</span> <span class="prop">class</span>=<span class="string">"overflow-hidden"</span>&gt;
      &lt;<span class="tag">help-table</span>
        <span class="prop">path</span>=<span class="string">"role"</span>
        :<span class="prop">columns</span>="<span class="prop">columns</span>"
        :<span class="prop">rows</span>="<span class="prop">roles</span>"
        :<span class="prop">loading</span>="<span class="prop">loading</span>"
        :<span class="prop">pagination</span>="<span class="prop">rolePagination</span>"
        @<span class="prop">onChangePagination</span>="<span class="text-yellow-300">getRoles<span class="prop">(<span class="text-yellow-300">{</span> pagination: <span class="prop">$event</span> <span class="text-yellow-300">}</span>)</span></span>;"
        @<span class="prop">sort</span>="<span class="text-yellow-300">getRoles<span class="prop">(<span class="text-yellow-300">{</span> pagination: <span class="prop">$event</span> <span class="text-yellow-300">}</span>)</span></span>;"
      &gt;
        <span class="text-green-700">// ...</span>
      &lt;<span class="tag">help-table</span>&gt;
    &lt;/<span class="tag">div</span>&gt;
  &lt;/<span class="tag">div</span>&gt;
&lt;/<span class="tag">template</span>&gt;</code>
</pre>
            </li>
          </ol>
        </div>

        <div id="create-feature" class="grid gap-8">
          <p class="text-heading2 font-semibold text-midnight">Create Feature</p>
          <p>
            Beberapa menu perlu perlu fitur create. Kalo backend provide POST endpoint, maka
            biasanya pattern development featurenya
          </p>
          <ol class="list-decimal list-outside">
            <li>
              Pertama siapin button buat munculin form. Form ini nanti bakal muncul dalam bentuk
              modal. Peletakan button 'add'-nya biar konsisten, kasih di ujung kanannya page title,
              barengan sama button-button lain (filter, download, reorder, atau lainnya).
            </li>
            <li>
              Create state baru buat toggle state modal formnya yg isinya boolean, kasih aja default
              value <code class="highlight">false</code>.
            </li>
            <li>
              Set event <code class="highlight">@click</code> di button yang udah dibuat tadi.
              Ketika button ini diklik, modal state-nya set jadi
              <code class="highlight">true</code>.
            </li>
            <li>
              Bikin component baru di dalem directory
              <code class="highlight">@/components/modals</code>. Bikin isi modalnya di component
              ini terus panggil component ini di dalem slotnya
              <a href="#modal">&lt;help-modal&gt;</a>
            </li>
            <li>
              Consume endpoint POST-nya. Jangan lupa supaya konsisten, waktu nunggu response kasih
              loading di button submitnya.
            </li>
          </ol>
        </div>

        <div id="edit-feature" class="grid gap-8">
          <p class="text-heading2 font-semibold text-midnight">Edit Feature</p>
          <p>
            Sebenernya cukup luas konteksnya kalo istilahnya Edit. Tapi yang dibahas di sini itu
            konteksnya edit beberapa field sekaligus. Dari segi UI mirip banget sama fitur create.
            Makanya sebisa mungkin kalo di menu yang sama ada fitur create, component modalnya satu
            aja, dijadiin satu sama component modalnya form create. Contohnya fitur
            <router-link to="/bns/banner">edit banner</router-link>. Tapi kalo belum, ya bikin lagi
            no issue. Okay, pattern developmentnya biasanya begini.
          </p>
          <ol class="list-decimal list-outside">
            <li>
              Siapin akses ke popup modal formnya. Biar konsisten, bikin kolom baru terus tambahin
              button edit aja di tiap row.
            </li>
            <li>
              Kalo component modalnya pake form create, statenya pake state create modal juga. Kalo
              enggak, siapin modal state baru valuenya <code class="highlight">false</code>.
            </li>
            <li>
              Selanjutnya populate form editnya. Biasanya caranya consume endpoint GET by id. Nah
              sebelum itu ada yang perlu diselesaiin dulu. Ini perlu diinget: karena style app ini
              bukan pindah routing melainkan pake modal, nggak bisa dengan mudah passing id di route
              param. Maka dari itu, perlu state yang bisa diakses sama component modalnya sehingga
              pas component modalnya itu ke-render bisa consume endpoint GET by id-nya.
            </li>
            <li>
              Set event <code class="highlight">@click</code> di button edit tadi. Ketika button ini
              diklik, set modal state-nya jadi <code class="highlight">true</code> dan set id di
              vuex jadi id yang dikirim dari row.
              <pre class="text-white bg-grey-1 rounded p-4 mt-2 overflow-x-auto">
<code><span class="text-green-700">// Role.vue</span>
&lt;<span class="tag">template</span>&gt;
  &lt;<span class="tag">div</span> <span class="prop">class</span>=<span class="string">"p-4 sm:p-6 grid gap-4 sm:gap-6"</span>&gt;
    &lt;<span class="tag">p</span> <span class="prop">class</span>=<span class="string">"text-heading2 font-semibold"</span>&gt;Role&lt;/<span class="tag">p</span>&gt;
    &lt;<span class="tag">div</span> <span class="prop">class</span>=<span class="string">"overflow-hidden"</span>&gt;
      &lt;<span class="tag">help-table</span>
        <span class="prop">path</span>=<span class="string">"role"</span>
        :<span class="prop">columns</span>="<span class="prop">columns</span>"
        :<span class="prop">rows</span>="<span class="prop">roles</span>"
        :<span class="prop">loading</span>="<span class="prop">loading</span>"
        :<span class="prop">pagination</span>="<span class="prop">rolePagination</span>"
      &gt;
        &lt;<span class="tag">template</span> <span class="prop">v-slot</span>="{ <span class="prop">column, row</span> }"&gt;
          &lt;<span class="tag">help-button</span>
            <span class="prop">v-if</span>="<span class="prop">column</span> === <span class="string">'action'</span>" <span class="text-green-700">// jangan lupa bikin kolom action di state columns</span>
            <span class="prop">bg-color</span>=<span class="string">"royal"</span>
            <span class="prop">color</span>=<span class="string">"white"</span>
            <span class="prop">icon</span>=<span class="string">"edit"</span>
            <span class="prop">icon-only</span>
            @<span class="prop">click</span>="<span class="text-yellow-300">openEditRole</span>(<span class="prop"><span class="prop">row.id</span></span>)"
          />
        &lt;/<span class="tag">template</span>&gt;
      &lt;<span class="tag">help-table</span>&gt;
    &lt;/<span class="tag">div</span>&gt;
  &lt;/<span class="tag">div</span>&gt;
&lt;/<span class="tag">template</span>&gt;

&lt;<span class="tag">script</span>&gt;
<span class="script">export default {</span>
  <span class="text-green-700">// ...</span>
  <span class="prop">methods: <span class="script">{</span></span>
    <span class="text-yellow-300">openEditRole(<span class="prop">roleId</span>)</span> {
      <span class="text-blue-600">this</span>.<span class="prop">modalState</span> = <span class="text-blue-600">true</span>;
      <span class="text-blue-600">this</span>.<span class="prop">$store</span>.<span class="text-yellow-300">commit(<span class="string">'SET_ROLE_ID'</span>, <span class="prop">roleId</span>)</span>; <span class="text-green-700">// set state roleId di store buat dipake di modal nantinya</span>
    }
  <span class="script">}</span>,
<span class="script">}</span>
&lt;/<span class="tag">script</span>&gt;</code>
</pre>
              <pre class="text-white bg-grey-1 rounded p-4 mt-2 overflow-x-auto">
<code><span class="text-green-700">// store/index.js</span>
<span class="script">export default <span class="text-yellow-300">createStore(</span> {</span>
  <span class="text-green-700">// ...</span>
  <span class="prop">state: {</span>
    <span class="text-green-700">// ...</span>
    <span class="prop">roleId: </span>0,
  <span class="prop">}</span>,
  <span class="prop">mutations: {</span>
    <span class="text-green-700">// ...</span>
    <span class="text-yellow-300">SET_ROLE_ID(<span class="prop">state, payload</span>) {</span>
      <span class="prop">state.roleId</span> = <span class="prop">payload</span>
    <span class="text-yellow-300">}</span>
  <span class="prop">}</span>,
<span class="script">}</span></code>
</pre>
            </li>
            <li>
              State di vuex yang udah keganti sama <code class="highlight">roleId</code> yang akan
              di-fetch bisa diakses di component edit modalnya. Di component edit modal, ambil
              <code class="highlight">roleId</code> dari vuex, terus pas
              <code class="highlight">mounted()</code> consume endpoint GET by id. Populate form
              pake responsenya deh.
            </li>
            <li>
              Setelah formnya populated sama data existing, langkah terakhir adalah sediain method
              yg hit endpoint PATCH yang bakal kepanggil waktu formnya disubmit.
            </li>
          </ol>
        </div>

        <div id="delete-feature" class="grid gap-8">
          <p class="text-heading2 font-semibold text-midnight">Delete Feature</p>
          <p>
            Sebenernya jarang ada fitur delete di dashboard, karena sejak jaman develop dashboard
            delivery Mas Al mintanya no hard delete. Tapi in case ada yang minta develop fitur ini,
            kayak menu Banner misalnya, ini walkthrough-nya.
          </p>
          <ol class="list-decimal list-outside">
            <li>
              Siapin button buat delete row di suatu table. Konsep, layout, styling samain kayak di
              fitur edit cuma ya kasih aja warna merah selayaknya button delete.
            </li>
            <li>
              Jangan langsung hit API pas diklik ya. Kalo diklik, button ini nge-trigger open
              confirmation modal yang ngeprompt user-nya "Yakin mau dihapus?" intinya gitu.
              Component modalnya udah ada kok, tinggal pake. Yang ini
              <code class="highlight">@/component/modals/Confirmation.vue</code>.
            </li>
            <li>Nanti pas usernya klik yes, baru hit endpoint delete.</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Confirmation from '@/components/modals/Confirmation.vue';
import HelpComponent from '@/components/templates/_Component.vue';
import HelpAvatar from '@/components/atoms/Avatar.vue';
import HelpBadge from '@/components/atoms/Badge.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpCheckbox from '@/components/atoms/Checkbox.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpModal from '@/components/templates/Modal.vue';
import HelpOptionItem from '@/components/atoms/OptionItem.vue';
import HelpRadio from '@/components/atoms/Radio.vue';
import HelpThumbnail from '@/components/atoms/Thumbnail.vue';
import HelpToggle from '@/components/atoms/Toggle.vue';
import Icon from '@/components/atoms/Icon.vue';
import MenuCard from '@/components/molecules/MenuCard.vue';
import NavExpandableItem from '@/components/atoms/NavExpandableItem.vue';
import NavItem from '@/components/atoms/NavItem.vue';
import HelpTable from '@/components/templates/Table.vue';

export default {
  name: 'Components',
  components: {
    Confirmation,
    HelpComponent,
    HelpAvatar,
    HelpBadge,
    HelpButton,
    HelpCheckbox,
    HelpInput,
    HelpOptionItem,
    HelpModal,
    HelpRadio,
    HelpTable,
    HelpThumbnail,
    HelpToggle,
    Icon,
    MenuCard,
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
        toggle: [
          {
            prop: 'v-model',
            description: 'State togglenya (sementara pakai event @change, diubah manual)',
            type: 'Boolean',
            default: false,
          },
        ],
        modal: [
          {
            prop: 'v-model',
            description: 'State show/hide modalnya',
            type: 'Boolean',
            default: false,
          },
          {
            prop: 'permanent',
            description: 'Siapa tau pingin kalo diklik luarnya nggak ketutup',
            type: 'Boolean',
            default: false,
          },
        ],
        table: [
          {
            prop: 'columns',
            description:
              "Kolom tabelnya. Keynya: field (String) buat integrasi sama prop rows | label (String) text yang mau ditampilin | align (String) defaultnya 'left', terima 'center' sama 'right' juga | sortable (Boolean) opsional ini kalo kolomnya mau bisa diurutin",
            type: 'Array of Objects',
            default: '[ ]',
            examples: [
              [
                { field: 'name', label: 'nama developer' },
                { field: 'position', label: 'posisi', align: 'center' },
              ],
            ],
          },
          {
            prop: 'rows',
            description: 'Data-data yang mau diisi ke dalem tabelnya',
            type: 'Array of Objects',
            default: '[ ]',
            examples: [
              [
                { name: 'Even', position: 'Tech Lead' },
                { name: 'Fadhil', position: 'Backend' },
              ],
            ],
          },
          {
            prop: 'pagination',
            description:
              'Penting buat integrasi sama query-query endpoint. Fungsi utamanya buat dioper ke <table-footer />. Logic di dalem component ini cukup banyak yg mengandalkan prop ini.',
            type: 'Object',
            default: "{ limit: 10, offset: 0, sort: '', order: 'asc' }",
            examples: [
              {
                limit: 10,
                offset: 20,
                sort: 'date',
                order: 'desc',
              },
              {
                limit: 25,
                offset: 0,
                sort: 'name',
                order: 'asc',
              },
            ],
          },
          {
            prop: 'path',
            description:
              'Karena endpoint-endpoint dari backend nggak provide total row count, jadi kita bisa tau di next page masih ada data atau enggak dari prop ini. Ini bakal fetch data buat next page',
            type: 'String',
            default: '',
            examples: ['merchant', 'employee', 'transfer-queue'],
          },
          {
            prop: 'loading',
            description: 'Patokan muncul/enggaknya loading animation di dalem table',
            type: 'Boolean',
            default: false,
          },
          {
            prop: 'footer',
            description: 'Patokan muncul/enggaknya <table-footer />',
            type: 'Boolean',
            default: true,
          },
        ],
      },
      events: {
        toggle: [
          {
            event: '@change = ($event) => {}',
            description: 'Terpanggil waktu komponennya diklik',
            parameters: [{ name: '$event', param: 'negasi dari current state' }],
          },
        ],
        table: [
          {
            event: '@onChangePagination = ($event) => {}',
            description:
              'Event emit-an <table-footer />. Triggered waktu limit atau offset berubah.',
            parameters: [{ name: '$event', param: 'updated pagination' }],
          },
          {
            event: '@sort = ($event) => {}',
            description: 'Triggered waktu sort icon di column header diklik',
            parameters: [{ name: '$event', param: 'updated pagination' }],
          },
        ],
      },
      slots: {
        avatar: [
          {
            slot: 'default',
            description: 'Bisa buat ngasih element absolute yang relative ke avatar',
            props: [],
          },
        ],
        modal: [
          {
            slot: 'default',
            description: 'Space buat isi modalnya',
            props: [],
          },
        ],
        table: [
          {
            slot: 'header',
            description: 'Slot buat modify penampilan <th>',
            props: [
              { name: 'column', definition: 'object column (field, label, align, sortable)' },
            ],
          },
          {
            slot: 'body',
            description: 'Slot buat modify penampilan <td>',
            props: [
              { name: 'column', definition: 'field dari suatu column' },
              { name: 'row', definition: 'object row sesuai apa yang dikasih di prop rows' },
              {
                name: 'data',
                definition:
                  'spesifik ngasih isi cell-nya aja, jadi sama aja kayak row[column] sebenernya',
              },
            ],
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
      toggleState: true,
      modal: {
        sm: false,
        md: false,
        lg: false,
        xl: false,
      },
      table: {
        columns: [
          { field: 'name', label: 'name' },
          { field: 'city', label: 'city' },
          {
            field: 'verify_status',
            label: 'verification status',
            align: 'center',
          },
          { field: 'menu', label: 'merchant detail', align: 'center' },
        ],
        rows: [
          {
            city: 'Jakarta Barat',
            name: 'Adora Store',
            verify_status: 'Pending',
          },
          {
            city: 'Jakarta Barat',
            name: 'Amuz Store',
            verify_status: 'Terverifikasi',
          },
          {
            city: 'Jakarta Barat',
            name: 'Couvee Tj. Duren',
            verify_status: 'Gagal',
          },
        ],
      },
    };
  },
  methods: {
    openMerchantDetail() {
      this.modal.xl = true;
      this.$store.commit('SET_MERCHANT_ID', 181);
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  @apply text-royal;
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
  .script {
    color: #e667e6;
  }
}
ol {
  @apply ml-4;
}
</style>
