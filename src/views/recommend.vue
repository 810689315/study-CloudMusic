<template>
  <div>
    <LLTitle>推荐歌单</LLTitle>
    <div class="imgList" v-if="songList.length>0">
      <SLCard v-for="s in songList" :key="s.id" :item="s"></SLCard>
    </div>
    <Loading v-if="songList.length == 0">小盒子正在为您加载数据</Loading>
    <LLTitle>Ta也在听</LLTitle>
    <ul class="hotMusic" v-if="newSong.length>0">
      <li v-for="s in newSong" :key="s.id"><SCard :item="s" @add-list="addMusicList(newSong)"></SCard></li>
    </ul>
    <Loading v-if="newSong.length == 0">小盒子正在为您加载数据</Loading>
    <about></about>
  </div>
</template>

<script>
import LLTitle from "@/components/LeftLineTitle";
import SLCard from "@/components/SongListCard";
import SCard from "@/components/SongCard";
import about from "@/components/about";
import Loading from "@/components/Loading";
export default {
  name: "Recommend",
  data() {
    return {
      songList: [],
      newSong: [],
    };
  },
  created() {
    // this.axios.get("/personalized?limit=6")
    // this.axios.get("/top/playlist/acg?limit=6")
    this.axios.get("http://musicapi.leanapp.cn/search?keywords=%E8%AF%B4%E5%94%B1%E6%96%B0%E4%B8%96%E4%BB%A3&type=1000&&offset=1")
      .then((data) => {
        this.songList = data.data.result.playlists.slice(1,7);
      })
    this.axios.get("/playlist/detail?id=6613071830")
      .then((data) => {
          let trackIDs = data.data.playlist.trackIds
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
                this.newSong.push(d);
                return d;
              });
            });
        });
  },
  methods:{
    addMusicList(newSong){
      if(this.$root.musicStore.musicList!=[]){
        this.$root.musicStore.musicList=this.$root.musicStore.musicList.filter(()=>{return false});
      }
      //将歌曲列表添加进vue根实例的musicStore里面
      // this.$root.musicStore.musicList=[];
      // this.$root.musicStore.musicList=this.$root.musicStore.musicList.concat(songList);
      // console.log(newSong);
      let newArr=this.$root.musicStore.musicList;
        newSong.map(d=>{//map处理每一个数组里的元素，这里是处理的是将要添加进歌单列表里的每一个的音乐
          let isfind=false; //是否找到
          for(let n of newArr){ //遍历newArr数组
            if(n.id == d.id){ //map数组里面的歌曲的id值，和newArr数组里面遍历出来的id值，进行比较
              isfind = true;  //相等的话就找到了，isfind为true，不继续遍历newArr，查找下一个map里面的歌曲
              break;
            }
          }
          if(!isfind) newArr.push(d);//一直不找到就把map里面的歌曲添加到newArr数组里面
        });
      this.$root.musicStore.musicList=newArr;
      // console.log(this.$root.musicStore.musicList)
    }
  },
  components: {
    LLTitle,
    SLCard,
    SCard,
    about,
    Loading,
  },
};
</script>

<style lang='less' scoped>
.imgList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.hotMusic {
  margin-top: 10px;
  padding-left: 10px;
}
</style>