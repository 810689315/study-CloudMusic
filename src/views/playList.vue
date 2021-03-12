<template>
  <div class="listView">
    <!-- 返回图标 -->
    <i class="fa fa-arrow-left" @click="gotoLastView"></i>

    <section class="top" v-if="songs != null">
      <div class="head_box">
        <div class="left">
          <img :src="bgimg+'?imageView=1&type=webp&thumbnail=247x0'" alt="" />
        </div>
        <div class="right">
          <p>{{ songs.name }}</p>
          <div>
            <i
              class="arimg"
              :style="{
                backgroundImage: `url(${ar.avatarUrl}?imageView=1&type=webp&thumbnail=247x0)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }"
            ></i>
            <p class="arname">{{ ar.nickname }}</p>
          </div>
        </div>
      </div>
      <div
        class="blur_bj"
        :style="{
          backgroundImage: `url(${bgimg}?imageView=1&type=webp&thumbnail=247x0)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      ></div>
    </section>
    <p class="title">歌单详情</p>
    <Loading v-if="songs == null">小盒子正在为您加载数据</Loading>
    <section v-if="songsArr.length>0" :class="['bottom', `${$root.isShowAudio ? 'audioShow' : ''}`]">
      <ul>
        <li v-for="(s, index) in songsArr" :key="s.id">
          <SCard :item="s" @add-list="addMusicList(songsArr)"
            ><span>{{ index + 1 }}</span></SCard
          >
        </li>
      </ul>
      <p class="ctitle">精彩评论</p>
     <Loading v-if="commentdata == null">小盒子正在为您加载数据</Loading>
      <Comment
        v-for="c in commentdata"
        :key="c.commentId"
        :commentdata="c"
      ></Comment>
    </section>
  </div>
</template>
<script>
import Loading from "@/components/Loading";
import SCard from "@/components/SongCard";
import Comment from "@/components/Comment";
export default {
  data() {
    return {
      listID: null,
      songs: null,
      ar: null,
      songsArr: [],
      bgimg: "",
      commentdata: null,
    };
  },
  components: {
    SCard,
    Comment,
    Loading
  },
  created() {
    this.$root.isShowNav = false;
    this.listID = this.$route.params.id;
    this.axios
      .get("/playlist/detail?id=" + this.listID)
      .then((data) => {
        this.songs = data.data.playlist;
        this.ar = this.songs.creator;
        return this.songs;
      })
      .then((songs) => {
        this.bgimg = songs.coverImgUrl;
        // console.log(this.bgimg)
        return songs;
      })
      .then((songs) => {
        let idArr = songs.trackIds.map((d) => {
          return d.id;
        });
        this.songsIDstr = idArr.join(",");
        return this.songsIDstr;
      })
      .then((str) => {
        this.axios
          .get("http://music.kele8.cn/song/detail?ids=" + str)
          .then((data) => {
            data.data.songs.map((d) => {
              //   处理数据，和scard音乐卡片的数据类型不一样，要转换
              d.song = {
                artists: d.ar,
              };
              this.songsArr.push(d);
              return d;
            });
          });
      });

    this.axios.get("/comment/playlist?id=" + this.listID).then((data) => {
      // console.log(data);
      this.commentdata = data.data.comments;
    });
  },
  methods: {
    gotoLastView() {
      this.$root.isShowNav = true;
      //跳转到上一次浏览的页面  this.$router.go(-1)
      this.$router.go(-1);
    },
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
};
</script>
<style lang='less' scoped>
.listView {
  width: 100vw;
  height: 100vh;
  > i {
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 2;
    color: #fefefe;
  }
  .top {
    width: 100%;
    height: 27%;
    position: absolute;
    top: 0px;
    left: 0px;
    .head_box {
      margin-top: 3vh;
      width: 100%;
      position: absolute;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .left {
        max-width: 145px;
      }
      .right {
        width: 50vw;
        height: 18vh;
        > p {
          font-size: 17px;
          line-height: 22px;
          color: #fefefe;
          height: 44px;

          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          margin-bottom: 5vh;
        }
        div {
          // height: 30px;
          display: flex;
          .arimg {
            display: block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          .arname {
            color: #fefefe;
            font-size: 14px;
          }
        }
      }
    }
    .blur_bj {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      overflow: hidden;
      -webkit-filter: blur(5px);
      filter: blur(5px);
      z-index: -1;
    }
  }
  .title {
    height: 23px;
    margin-top: 27vh;
    line-height: 23px;
    padding: 0 10px;
    font-size: 12px;
    color: #666;
    background-color: #eeeff0;
  }

  .bottom {
    height: 71%;
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    ul {
      li {
        span {
          font-size: 17px;
          line-height: 7vh;
          padding: 0px 10px;
          color: #999;
        }
      }
    }
    .ctitle {
      height: 23px;
      line-height: 23px;
      padding: 0px 10px;
      font-size: 12px;
      color: #666;
      background-color: #eeeff0;
    }
  }
  .audioShow {
    height: 68%;
  }
}
</style>