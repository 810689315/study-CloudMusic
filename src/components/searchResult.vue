<template>
  <div>
    <!-- 搜索结果 -->
    <ul v-if="searchResult.length != 0">
      <li v-for="(h, index) in searchResult" :key="index">
        <SCard :item="h" :keywords="keywords"></SCard>
      </li>
    </ul>
    <Loading v-if="isLoad"></Loading>
    <p @click="moreMusic" style="color:black">{{ str }}</p>
  </div>
</template>

<script>
import SCard from "@/components/SongCard";
import Loading from "@/components/Loading";
export default {
  name: "",
  props: ["keywords"],
  data() {
    return {
      searchResult: [],
      page: 1,
      str: "加载更多",
      isLoad: true,
    };
  },
  components: {
    SCard,
    Loading,
  },
  created() {
    this.$emit("changeHistory", { keywords: this.keywords, str: "push" });
    this.loadMusic();
  },
  methods: {
    loadMusic() {
      let offset = (this.page - 1) * 30;
      this.axios
        .get("/search?keywords=" + this.keywords + "&type=1&&offset=" + offset)
        .then((data) => {
          console.log(data);
          let resData = data.data.result.songs.map((d) => {
            d.song = {
              artists:[d.artists[0]],
            };
            return d;
          });
          this.searchResult = resData
          console.log(this.searchResult);
          this.isLoad = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoad = false;
          this.str = "没有更多歌曲";
          this.page = -1;
        });
    },
    moreMusic() {
      if (this.page != -1) {
        this.page++;
        this.isLoad = true;
        this.loadMusic();
      }
    },
  },
};
</script>

<style lang="less" scoped>
// 搜索结果
ul {
  width: 100vw;
  padding-left: 20px;
}
p {
  margin-top: 10px;
  background-color: wheat;
  text-align: center;
}
</style>