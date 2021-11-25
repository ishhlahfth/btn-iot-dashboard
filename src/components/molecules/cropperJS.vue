<template>
  <div>
    <div>
      <v-img :src="image_name" class="profile-img"></v-img>
      <button class="icon primary white--text" @click="$refs.FileInput.click()">upload</button>
      <input ref="FileInput" type="file" style="display: none;" @change="onFileSelect" />
    </div>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-text>
          <VueCropper
            v-show="selectedFile"
            ref="cropper"
            :src="selectedFile"
            alt="Source Image"
          ></VueCropper>
        </v-card-text>
        <v-card-actions>
          <v-btn class="bg-blue-500 text-white p-4 rounded-lg" @click="saveImage(), (dialog = false)">Crop</v-btn>
          <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
  components: { VueCropper },
  props: ['image_name'],
  data() {
    return {
      mime_type: '',
      cropedImage: '',
      autoCrop: false,
      selectedFile: '',
      image: '',
      dialog: false,
      files: '',
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    saveImage() {
      const userId = this.$route.params.user_id;
      this.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData();
        formData.append('profile_photo', blob, 'name.jpeg');
        axios
          .post(`/api/user/${userId}/profile-photo`, formData)
          .then(() => {})
          .catch((error) => {
            this.toast.error(error.message);
          });
      }, this.mime_type);
    },
    onFileSelect(e) {
      const file = e.target.files[0];
      this.mime_type = file.type;
      if (typeof FileReader === 'function') {
        this.dialog = true;
        const reader = new FileReader();
        reader.onload = (event) => {
          this.selectedFile = event.target.result;
          this.$refs.cropper.replace(this.selectedFile);
        };
        reader.readAsDataURL(file);
      } else {
        this.toast.error('Sorry, FileReader API not supported');
      }
    },
  },
};
</script>
<style scoped>
.profile-img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.icon {
  position: absolute;
  top: 10px;
  right: 0;
  background: #e2e2e2;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
  text-align: center;
  color: #0000ff;
  font-size: 14px;
  cursor: pointer;
}
</style>
