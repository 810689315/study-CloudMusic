<template>
  <div v-if="playList" class="hotView">
    <div class="logo"></div>
    <div class="time">更新时间:{{ nowtime | formateDate("MM月dd日") }}</div>
    <ul class="hotMusic">
      <li v-for="(s, index) in hotSong" :key="s.id">
        <SCard :item="s" @add-list="addMusicList(hotSong)"
          ><span
            :class="[
              index == 0 ? 'cred' : ``,
              index == 1 ? 'cred' : ``,
              index == 2 ? 'cred' : ``,
            ]"
            >{{ (index + 1) | getNum }}</span
          ></SCard
        >
      </li>
    </ul>
    <Loading v-if="isLoad">小盒子正在为您加载数据</Loading>
    <p @click="moreMusic" style="color:black">{{ tipmsg }}</p>
  </div>
</template>

<script>
import SCard from "@/components/SongCard";
import Loading from "@/components/Loading";
export default {
  name: "Hot",
  data() {
    return {
      hotSong: [],
      playList: [],
      page: 1,
      tipmsg: "加载更多",
      isLoad: false,
      nowtime: "",
    };
  },
  created() {
    this.loadMusic();
    this.nowtime = new Date();
  },
  methods: {
    loadMusic() {
      this.isLoad = true;
      this.axios
        .get("playlist/detail?id=4873026690")
        .then((data) => {
          let trackIDs = data.data.playlist.trackIds.slice(
            (this.page - 1) * 20,
            this.page * 20
          );
          this.playList = data.data.playlist;
          let ids = trackIDs.map((d) => {
            return d.id;
          });
          return ids;
        })
        .then((ids) => {
          this.axios
            .get("http://music.kele8.cn/song/detail?ids=" + ids)
            .then((songData) => {
              songData.data.songs.map((d) => {
                //   处理数据，和Scard音乐卡片的数据类型不一样，要转换
                d.song = {
                  artists: d.ar,
                };
                this.hotSong.push(d);
                return d;
              });
            });
        });
    },
    moreMusic() {
      if (this.page < 15) {
        this.page++;
        this.isLoad = true;
        this.loadMusic();
      } else {
        this.tipmsg = "已经到达底部了";
        this.isLoad = false;
      }
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
      // console.log();
    },
  },
  components: {
    SCard,
    Loading,
  },
  filters: {
    formateDate(v, formatStr) {
      let date = new Date(v);
      let formatObj = {
        "(Y+)": date.getFullYear(), // (Y+) 匹配占位符Y : 值 就要替换的值
        "(M+)": date.getMonth() + 1, //月
        "(d+)": date.getDate(),
        "(h+)": date.getHours(),
        "(m+)": date.getMinutes(),
        "(s+)": date.getSeconds(),
      };
      for (let key in formatObj) {
        let reg = new RegExp(key);
        if (reg.test(formatStr)) {
          let str = formatObj[key] < 10 ? "0" + formatObj[key] : formatObj[key]; //小于10是因为保证月日时秒分都有两位数字
          formatStr = formatStr.replace(reg, str);
        }
      }
      return formatStr;
    },
    getNum(v) {
      if (v < 10) {
        return "0" + v;
      } else {
        return v;
      }
    },
  },
};
</script>

<style lang='less' scoped>
.hotView {
  width: 100vw;
  .logo {
    width: 100vw;
    height: 17vh;
    background: url("../assets/rapLogo.jpg") no-repeat;
    background-position: center;
    // background-size: 100%;
    background-size: cover;
  }
  .time{
    position: absolute;
    top: 14vh;
    left: 10px;
    color: white;
  }
  span {
    font-size: 17px;
    line-height: 7vh;
    padding: 0px 10px;
    color: #999;
  }
  .cred {
    color: brown;
  }
  p {
    margin-top: 10px;
    background-color: wheat;
    text-align: center;
  }
}
</style>