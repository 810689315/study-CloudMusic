<template>
  <div>
    <router-link :to="`/SongerList/${songer.artist.id}`" class="songerCard" tag="div">
      <div
        class="songerimg"
        :style="{
          backgroundImage: `url(${songer.artist.picUrl}?imageView=1&type=webp&thumbnail=247x0)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      ></div>
      <div class="songername">{{ songer.artist.name }}</div>
      <p class="song">{{ songer.hotSongs[0].name }}</p>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "SongerCard",
  props: ["songer","index"],
  created() {
    // console.log(this.songer);
  },
};
</script>
<style lang="less" scoped>
.songerCard {
  color: white;
  width: 45vw;
  height: 40vh;
  background-color: rgb(225, 59, 55);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  margin: 2.5vw;
  float: left;
  .songerimg {
    width: 100%;
    height: 80%;
    background-color: skyblue;
  }
  .songername {
    width: 150px;
    // height: 40px;
    border-radius: 12px;
    text-align: center;
    line-height: 40px;
    padding: 0px 10px;
    background-color: orange;
    position: absolute;
    top: 72%;
    left: 40%;
  }
  .song {
    line-height: 8vh;
    display: inline-block;
    padding-left: 5vw;
    height: 8vh;
  }
}
</style>