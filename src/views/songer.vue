<template>
  <div class="view">
    <div v-if="songer.length == songerID.length">
      <SongerCard v-for="(s,index) in songer" :index="index" :key="s.id" :songer="s"></SongerCard>
    </div>
    <div v-if="songer.length != songerID.length">
      <Loading>小盒子正在为您加载数据</Loading>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import SongerCard from "../components/SongerCard";
export default {
  name: "Songer",
  components: {
    SongerCard,
    Loading,
  },
  data() {
    return {
      songerID: [
        "12798895",
        "31880229",
        "13027202",
        "12564922",
        // "12292307",
        //  "12554787",
        // "31312385",
        // "32959015",
        // "30000024",
        // "12198789",
        // "31561897",
        // "13006194",
        // "31060560",
        // "12570417",
        // "34256711",
        // "12283512",
        // "12606197",
        // "12565130",
        // "1198123",
        // "29949235",
        // "12967449",
        // "12109219",
        // "12410061",
        // "12206205",
        // "12318046",
      ],
      songer: [],
    };
  },
  created() {
    this.songerID.map((songerID) => {
      this.$axios.get("/artists/detail?id=" + songerID).then((data) => {
        this.songer.push(data.data);
      });
      return this.songer;
    });
  },
};
</script>

<style lang="less" scoped>
</style>