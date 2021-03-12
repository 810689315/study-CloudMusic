<template>
  <div>
    <!-- 搜索框 -->
    <form>
      <div class="inputcover">
        <i></i>
        <input
          type="search"
          v-model="keywords"
          placeholder="搜索歌曲"
          @input="inputing = true"
        />
      </div>
    </form>
    <!-- 搜索建议 关键词 搜索结果 -->
    <component
      :is="search"
      :keywords="keywords"
      :history="history"
      @change="change"
      @changeHistory="changeHistory"
    ></component>
  </div>
</template>

<script>
import HotSearch from "@/components/HotSearch";
import SearchSuggest from "@/components/SearchSuggest";
import Res from "@/components/searchResult";
export default {
  components: {
    HotSearch,
    SearchSuggest,
    Res,
  },
  data() {
    return {
      history: [],
      keywords: "", //搜索框里面的内容
      search: "HotSearch", //改变搜索的小view区域
      inputing: false, //标记是否是文本框输入
    };
  },
  watch: {
    keywords: function (newValue) {
      if (newValue == "") {
        this.search = "HotSearch";
      } else if (this.inputing) {
        this.search = "SearchSuggest";
      }
    },
  },
  created() {},
  methods: {
    change(val) {
      this.keywords = val;
      this.inputing = false;
      this.search = "Res";
    },
    changeHistory(obj) {
      if (obj.str == "push") {
        this.history.push(obj.keywords);
      } else {
        this.history = this.history.filter((v) => v != obj.keywords);
      }
    },
  },
};
</script>

<style lang="less" scoped>
// 搜索框
form {
  padding: 15px 10px;
  position: relative;
  border-bottom: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  .inputcover {
    position: relative;
    width: 100%;
    height: 30px;
    padding: 0 0 0 30px;
    box-sizing: border-box;
    background: #ebecec;
    border-radius: 30px;
    i {
      width: 13px;
      height: 13px;
      background-image: url("../assets/search.svg");
      display: inline-block;
      vertical-align: middle;
      background-position: 0 0;
      background-size: contain;
      background-repeat: no-repeat;
      position: absolute;
      left: 13px;
      top: 9px;
    }
    input {
      width: 100%;
      height: 30px;
      padding-right: 15px;
      line-height: 18px;
      background: rgba(0, 0, 0, 0);
      font-size: 14px;
      color: #333;
      outline: none;
      border-radius: 0;
      border: 0;
      font: 14px/1.5 Helvetica, sans-serif, STHeiTi;
      &::-webkit-input-placeholder {
        color: #999;
      }
      &::-webkit-search-cancel-button {
        -webkit-appearance: none;
        position: relative;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        background: url("../assets/xBar.svg") no-repeat center;
        background-size: 100% 100%;
        color: rgba(0, 0, 0, 0);
      }
    }
  }
}
</style>