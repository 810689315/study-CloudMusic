<template>
  <div id="app" :class="{'isnight':!$root.isDay}">
    <TopNav v-if="$root.isShowNav" class="nav"></TopNav>
    <router-view
      :class="`${$root.isShowNav ? 'views' : 'showviews'} ${
        $root.isShowAudio ? 'showAudio' : ''} ${!$root.isDay ?'isnight':''} ${!$root.isDay ? 'isnightfont' : ''}`"
    />
    <PlayView v-if="$root.musicStore.musicID"></PlayView>
    <div v-if="$root.musicStore.musicID" class="fakerAudio"></div>
  </div>
</template>
<script>
import TopNav from "@/components/TopNav";
import PlayView from "@/components/Playmusic";
export default {
  name: "APP",
  created() {},
  components: {
    TopNav,
    PlayView,
  },
};
</script>
<style lang='less'>
#app {
  width: 100%;
  height: 100vh;
  .nav {
    position: fixed;
    top: 0px;
  }
  .views {
    position: fixed;
    width: 100vw;
    top: 22vh;
    height: 78vh;
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .showviews {
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .showAudio {
    padding-bottom: 60px;
  }
}
</style>
