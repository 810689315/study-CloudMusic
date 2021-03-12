<template>
  <div class="card">
    <router-link :to="`/playlist/${item.id}`" tag="div">
      <div class="cardImg">
        <img :src="item.coverImgUrl+'?imageView=1&type=webp&thumbnail=247x0'" alt="" />
        <span v-if="item.playCount">🎧{{ item.playCount | formatNum }}</span>
      </div>
      <p :class="`${!$root.isDay ? 'isnightfont' : ''}`">{{ item.name }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "SongListCard",
  props: ["item"],
  filters: {
    formatNum(val) {
      if (val < 10000) {
        return val;
      } else if (val < 100000000) {
        return (val / 10000).toFixed(2) + "万";
      } else {
        return (val / 100000000).toFixed(2) + "亿";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.card {
  padding: 20px 0px 0px 0px;
  >div{
    .cardImg {
      width: 32vw;
      height: 32vw;
      background-color: black;
      position: relative;
      span {
        color: #999;
        font-size: 12px;
        position: absolute;
        right: 3px;
        top: 3px;
      }
    }
    p {
      padding: 6px 2px 0px 6px;
      width: 32vw;
      font-size: 13px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      color: #333;
    }
  }
}
</style>