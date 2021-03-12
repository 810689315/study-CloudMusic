<template>
  <div class="card" @click="play(item)">
    <slot></slot>
    <div class="left">
      <p
        :class="`songName ${!$root.isDay ? 'isnightfont' : ''}`"
        v-html="$options.filter.hightlight(item.name, keywords)"
      ></p>
      <p class="songDetail">
        <span
          v-html="
            $options.filter.hightlight(item.song.artists[0].name, keywords)
          "
        ></span>
        -
        <span v-html="$options.filter.hightlight(item.name, keywords)"></span>
      </p>
    </div>
    <div class="right">
      <transition name="playBtn">
        <span v-if="$root.musicStore.currentMusic?(($root.musicStore.currentMusic.id==item.id)?false:true):true"></span>
      </transition>
      <transition name="nowPlay">
        <div v-if="$root.musicStore.currentMusic?($root.musicStore.currentMusic.id==item.id):false" >
          <Loading></Loading>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
export default {
  name: "SongCard",
  props: ["item", "keywords"],
  components: {
    Loading,
  },
  created() {
    // console.log(this.item)
  },
  filter: {
    hightlight(val, keywords) {
      if (typeof keywords == "undefined") {
        return val;
      }
      let reg = new RegExp(keywords, "i");
      if (reg.test(val)) {
        return val.replace(
          reg,
          '<span style="color:red;">' + keywords + "</span>"
        );
      }
      return val;
    },
  },
  methods: {
    play(item) {
      // 播放器当前播放的音乐id
      this.$root.musicStore.musicID = item.id;
      // 播放器当前播放的音乐
      this.$root.musicStore.currentMusic = item;
      // 去重
      let newArr = this.$root.musicStore.musicList;
      let isfind = false;
      for (let n of newArr) {
        if (n.id == item.id) {
          isfind = true;
        }
      }
      if (!isfind) this.$root.musicStore.musicList.push(item);

      this.$emit("add-list");
      // this.$root.isPlayBtnShow = !this.$root.isPlayBtnShow;
      // console.log( this.$root.isPlayBtnShow);
    },
  },
};
</script>

<style lang="less" scoped>
.card {
  display: flex;
  padding-right: 10px;
  height: 7vh;
  border: 0 solid rgba(0, 0, 0, 0.1);
  border-bottom-width: 1px;
  align-items: center;
  .left {
    flex: 1;
    padding-right: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .songName {
      font-size: 14px;
      color: #333;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .songDetail {
      margin-top: 3px;
      font-size: 12px;
      color: #888;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }
  .right {
    width: 22px;
    height: 22px;
    position: relative;
    font-size: 12px;
    span {
      display: inline-block;
      background: url("../assets/logoSpirtImg.png") no-repeat;
      background-size: 166px 97px;
      width: 22px;
      height: 22px;
      background-position: -24px 0;
    }
    div {
      width: 100%;
      height: 100%;
    }
  }
}
.playBtn-leave-active {
  animation: playMusic 0.5s;
}
.nowPlay-enter {
  transform: scale(0);
}
.nowPlay-enter-to {
  transform: scale(1);
}
.nowPlay-enter-active {
  transition: all 0.5s;
  transition-delay: 0.7s;
}
@keyframes playMusic {
  // 0%{
  //     transform: translateX(0px);
  // }
  // 5%{
  //   transform: translateX(10px);
  // }
  // 15%{
  //     transform: translateX(-10px);
  // }
  // 25%{
  //   transform: translateX(10px);
  // }
  // 35%{
  //   transform: translateX(-10px);
  // }
  0% {
    transform: translate(0);
  }
  30% {
    transform: translateY(-2vh);
  }
  100% {
    transform: translateY(100vh);
  }
}
</style>