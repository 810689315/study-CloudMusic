<template>
  <div>
    <div :class="`view ${!$root.isDay?'isnight':''}`" >
      <div v-if="songerInfo.artist && songerHotSong">
        <!-- <i class="fa fa-arrow-left" @click="gotoLastView"></i> -->
        <div
          class="songerimg"
          :style="{
            backgroundImage: `url(${songerInfo.artist.picUrl}?imageView=1&type=webp&thumbnail=247x0)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        ></div>
        <p :class="{'isnightfont':!$root.isDay}">{{ songerInfo.artist.briefDesc }}</p>
        <div class="songername">{{ songerInfo.artist.name }}</div>
        <ul v-if="songerHotSong">
          <li v-for="s in songerHotSong" :key="s.id">
            <SCard :item="s" @add-list="addMusicList(songerHotSong)"></SCard>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SCard from "@/components/SongCard";
export default {
  name: "SongerList",
  props: [],
  data() {
    return {
      songerInfo: {},
      songid: 0,
      songerHotSong: [],
    };
  },
  components: {
    SCard,
  },
  methods: {
    // gotoLastView() {
    //   this.$root.isShowNav = true;
    //   //跳转到上一次浏览的页面  this.$router.go(-1)
    //   this.$router.go(-1);
    // },
    addMusicList(newSong) {
      if (this.$root.musicStore.musicList != []) {
        this.$root.musicStore.musicList = this.$root.musicStore.musicList.filter(
          () => {
            return false;
          }
        );
      }
      let newArr = this.$root.musicStore.musicList;
      newSong.map((d) => {
        //map处理每一个数组里的元素，这里是处理的是将要添加进歌单列表里的每一个的音乐
        let isfind = false; //是否找到
        for (let n of newArr) {
          //遍历newArr数组
          if (n.id == d.id) {
            //map数组里面的歌曲的id值，和newArr数组里面遍历出来的id值，进行比较
            isfind = true; //相等的话就找到了，isfind为true，不继续遍历newArr，查找下一个map里面的歌曲
            break;
          }
        }
        if (!isfind) newArr.push(d); //一直不找到就把map里面的歌曲添加到newArr数组里面
      });
      this.$root.musicStore.musicList = newArr;
    },
  },
  created() {
    this.songid = this.$route.params.id;
    this.$axios
      .get("/artists/detail?id=" + this.songid)
      .then((data) => {
        this.songerInfo = data.data;
        return this.songerInfo;
      })
      .then((info) => {
        this.songerHotSong = info.hotSongs.filter((item, index) => {
          item.song = {
            artists: item.ar,
          };
          return index < 20;
        });
      });
  },
};
</script>

<style lang="less" scoped>
.view {
  width: 100%;
  // height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  // i {
  //   color: white;
  //   position: fixed;
  //   top: 23vh;
  //   left: 5px;
  // }
  .songerimg {
    width: 100%;
    height: 40vh;
  }
  .songername {
    width: 150px;
    border-radius: 12px;
    text-align: center;
    line-height: 40px;
    padding: 0px 10px;
    background-color: orange;
    position: absolute;
    top: 37vh;
    left: 60%;
  }
  p {
    margin: 0px 70px;
    // margin-bottom: 20px;
    padding: 10px;
    text-indent: 28px;
    font-size: 14px;
    margin-top: 5vh;
    color: black;
    border: 1px solid rgb(226, 55, 56);
    border-radius: 32px;
  }
  ul {
    padding: 20px;
  }
}
</style>