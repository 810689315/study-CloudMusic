<template>
  <div>
    <!-- 热门搜索 -->
    <section class="hotWord">
      <ul>
        <li
        :class="`${!$root.isDay ? 'isnightfont' : ''}`"
          v-for="(w, index) in hotWord"
          :key="index"
          @click="$emit('change', w)"
        >
          {{ w }}
        </li>
      </ul>
    </section>
    <!-- 这里应该用localStorage.getItem() -->
    <!-- 历史记录 -->
    <section class="history">
      <ul>
        <li v-for="(h, index) in history" :key="index" :class="` ${!$root.isDay ? 'isnightfont' : ''}`">
          <i class="hlogo"></i>
          {{ h }}
          <i
            class="dlogo"
            @click="$emit('changeHistory', { keywords: h, str: 'del' })"
          ></i>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "HotSearch",
  props: ["history"],
  data() {
    return {
      hotWord: [
        "说唱新世代",
        "于贞",
        "生命诗",
        "懒狗代",
        "马思唯",
        "KnowKnow",
        "返老还童",
        "Subs",
        "懒惰",
        "W8VES(万悟)",
        "陈近南",
        "黄子韬",
        "七哥",
        "李宇春",
        "马伯骞",
      ],
    };
  },
};
</script>

<style lang="less" scoped>
// 关键词
section.hotWord {
  h3 {
    font-size: 12px;
    line-height: 12px;
    color: #666;
    padding: 10px 0px 10px 10px;
  }
  ul {
    padding: 20px 10px;
    li {
      display: inline-block;
      height: 32px;
      margin-right: 8px;
      margin-bottom: 8px;
      padding: 0 14px;
      font-size: 14px;
      line-height: 32px;
      color: #333;
      border: 1px solid;
      border-color: #d3d4da;
      border-radius: 32px;
    }
  }
}
section.history {
  .logo {
    width: 100vw;
    height: 17vh;
    background: url("../assets/rap.webp") no-repeat;
    background-position: center;
    background-size: cover;
  }
  ul {
    li {
      position: relative;
      i {
        display: inline-block;
        width: 15px;
        height: 15px;
        background-position: 0 0;
        background-repeat: no-repeat;
      }
      .hlogo {
        background-image: url("../assets/history.svg");
        margin: 0px 10px;
        transform: translateY(2px);
      }
      .dlogo {
        background-image: url("../assets/detel.svg");
        background-size: 80%;
        position: absolute;
        top: 20px;
        right: 10px;
      }
      padding-right: 10px;
      font-size: 15px;
      line-height: 45px;
      color: #333;
      border: 0 solid rgba(0, 0, 0, 0.1);
      border-bottom-width: 1px;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }
}
</style>