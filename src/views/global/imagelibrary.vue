<template>
  <div v-if="listID.length > 0">
    <div class="choose-image-box" v-for="(pic, index1) of listID" :key="index1">
      <div class="hover-image">
        <i @click="showPreview(pic)" class="icon-size el-icon-zoom-in"></i>
        <i @click="choosePic(pic, pics.name.split(',')[index1])" class="icon-size el-icon-circle-check"></i>
      </div>
      <el-image
        :class="{'choose-image': true, 'border-image': choosePics.map(x => x.id).includes(pic)}"
        :style="'width: 100px; height: 100px'"
        :src="pic | smallGoogleImage"
        :fit="'cover'">
      </el-image><br>
      
      <p class="image-name"><i class="el-icon-success" v-if="choosePics.map(x => x.id).includes(pic)"></i>{{pics.name.split(',')[index1] | removeExtension}}</p>
    </div>
    <VueEasyLightbox
      :visible="visible"
      :imgs="imgs"
      :index="index"
      @hide="handleHide"
    ></VueEasyLightbox>
    <el-button type="warning" class="full-width" @click="loadMorePic" :disabled="preventLoad" style="margin-top: 20px" plain>Tải thêm ảnh</el-button>
  </div>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox'

export default {
  props: ['pics'],
  components: {
    VueEasyLightbox
  },
  data() {
    return {
      numberPic: 60,
      choosePics: [],
      listID: [],
      preventLoad: false,
      imgs: 'http://via.placeholder.com/350x150',
      visible: false,
      index: 0
    }
  },
  mounted() {
    this.listID = this.pics.pictureId.split(',').slice(0, this.numberPic);
  },
  methods: {
    showPreview(url) {
      this.visible = true;
      this.imgs = this.$options.filters.smallGoogleImage(url);
    },
    handleHide() {
      this.visible = false
    },
    choosePic(id, name) {
      if(!this.choosePics.map(x => x.id).includes(id)) {
        this.choosePics.push({id: id, name: name});
        this.$emit('choosePicAction', {id: id, name: name, action: 'add'});
      } else {
        this.choosePics = this.choosePics.filter(x => x.id !== id);
        this.$emit('choosePicAction', {id: id, name: name, action: 'delete'});
      }
      // this.$emit('choosePicAction', this.choosePics);
    },
    loadMorePic() {
      let morePic = this.pics.pictureId.split(',').slice(this.listID.length, this.listID.length + this.numberPic);
      this.listID = [...this.listID, ...morePic];
      this.disabledLoading(this.currentPage);
    },
    disabledLoading(index) {
      this.preventLoad = this.pics.pictureId.split(',').length - this.listID.length < this.numberPic;
    } 
  }
}
</script>

<style>
.choose-image-box {
  position: relative;
}
.hover-image {
  position: absolute;
  background-color: rgba(0,0,0,0.4);
  height: 100px;
  width: 100px;
  border-radius: 7px;
  margin: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;

}
.icon-size {
  color: white;
  font-size: 25px;
}

.hover-image:hover {
  opacity: 1;
}
i{
  cursor: pointer;
}
.img-swiper {
  display: block;
}
.auto-none {
  display: none;
}
.show {
  display: block;
}
.border-image {
  box-shadow: 0 0 3px 4px #67c23a;
}
</style>
