<template>
  <div class="suggestBox">
    <div @click="$emit('change',keywords)">搜索：{{ keywords }}</div>
    <ul>
      <li :class="{'isnightfont':!$root.isDay}" v-for="(v, index) in suggestList" :key="index" @click="$emit('change',v.name)">
        <i></i>{{ v.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchSuggest",
  props: ["keywords"],
  data() {
    return {
      suggestList: [],
    };
  },
  created() {
    this.sendMsg(this.keywords);
  },
  watch: {
    keywords(newValue) {
      this.sendMsg(newValue);
    },
  },
  methods: {
    sendMsg(val) {
      this.suggestList = [];
      this.axios
        .get("/search?keywords=" + val)
        .then((data) => {
          let res = data.data.result.songs;
          if (res.length > 10) {
            data = res.slice(0, 10);
          }

          let resData = data.map((d) => {
            d.song = {
              artists: d.artists,
            };
            return d;
          });

          return resData;
        })
        .then((resData) => {
          this.suggestList.push(resData[0]);
          for (let i = 1; i < 10; i++) {
            if (resData[i].name != resData[i - 1].name) {
              this.suggestList.push(resData[i]);
            }
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
div.suggestBox {
  width: 100vw;
  padding: 0px 0px 0px 10px;
  //建议搜索
  div {
    height: 50px;
    font-size: 15px;
    line-height: 50px;
    color: #507daf;

    border: 0 solid rgba(0, 0, 0, 0.1);
    border-bottom-width: 1px;
  }
  // 搜索内容
  ul {
    li {
      i {
        display: inline-block;
        margin: 0px 10px;
        transform: translateY(2px);
        width: 15px;
        height: 15px;
        background-image: url("../assets/search.svg");
        background-position: 0 0;
        background-repeat: no-repeat;
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