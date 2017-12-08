<template>
  <div>
    <mt-header title="媒体">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <div class="list">
      <div class="item" v-for="media in all">
        <img class="image" :src="media.url" v-lazy="media.url"/>
        <div class="title">
          <div>
            <span class="text" v-text="'由 '+media.nickname+' 上传'"></span>
          </div>
          <div>
            <span class="text" v-text="format(media.create)"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mediaList } from '../api/media'
  import { dateFormat } from '../utils/date'

  export default {
    name: 'Medias',
    data () {
      return {
        all: [],
        data: {
          public: {
            image: [],
            video: [],
            audio: []
          },
          private: {
            image: [],
            video: [],
            audio: []
          }
        }
      }
    },
    created () {
      this.getData()
    },
    methods: {

      format (date) {
        return dateFormat(date, 'yyyy-MM-dd hh:mm:ss')
      },

      isImage (mime, str) {
        return mime.indexOf('image') === 0
      },

      isAudio (mime) {
        return mime.indexOf('audio') === 0
      },

      isVideo (mime) {
        return mime.indexOf('audio') === 0
      },

      getData () {
        let that = this
        mediaList().then((res) => {
          console.log(res)
          if (res.code === 20000) {
            that.all = res.data
            res.data.forEach((item, _) => {
              if (item.type) {
                if (that.isImage(item.mime)) that.data.private.image.push(item)
                if (that.isAudio(item.mime)) that.data.private.audio.push(item)
                if (that.isVideo(item.mime)) that.data.private.video.push(item)
              } else {
                if (that.isImage(item.mime)) that.data.public.image.push(item)
                if (that.isAudio(item.mime)) that.data.public.audio.push(item)
                if (that.isVideo(item.mime)) that.data.public.video.push(item)
              }
            })
          }
        })
      }
    }
  }
</script>

<style>

  .list {
    text-align: center;
  }

  .item {
    margin-top: 10px;
    position: relative;
    width: 100%;
  }

  .title {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 50px;
    background-color:rgba(5,5,5,0.3);
    text-align: left;
  }
  .text {
    margin-left: 5px;
    color: #ccc;
  }
  .image {
    display: block;
    width: 100%;
  }

  .image[lazy=loading] {
    width: 100%;
    height: 300px;
    margin: auto;
  }

</style>
