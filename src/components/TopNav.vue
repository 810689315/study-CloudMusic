<template>
  <div class="nav">
    <header>
      <h3>说唱新世代的小盒子</h3>
    </header>
    <ul :class="`topnav ${!$root.isDay?'isnight':''}`">
      <li><router-link :class="{'isnightfont':!$root.isDay}" to="/">推荐音乐</router-link></li>
      <li><router-link :class="{'isnightfont':!$root.isDay}" to="/hot">热歌榜</router-link></li>
      <li><router-link :class="{'isnightfont':!$root.isDay}" to="/songer">歌手</router-link></li>
      <li><router-link :class="{'isnightfont':!$root.isDay}" to="/search">搜索</router-link></li>
    </ul>
  </div>
</template>
<script>
export default {
  name:"TopNav",
}
</script>
<style lang='less' scoped>
.nav {
  header {
    width: 100vw;
    height: 16vh;
    background:url("../assets/rap.webp") no-repeat;
    background-position: center;
    background-size: 100%;
    background-size: cover;
    // background-color: #C20C0C;
    color: white;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    user-select: none;
    h3 {
      font-size: 20px;
      flex: 1;
    }
    div.dl {
      width: 100px;
      height: 36px;
      border-radius: 36px;
      background-color: #fff;
      color: rgb(226,55,53);
      line-height: 36px;
      text-align: center;
      cursor: pointer;
    }
  }
  ul.topnav {
    display: flex;
    justify-content: space-around;
    line-height: 40px;
    border-bottom: 1px solid transparent;
    box-sizing: border-box;
    li {
      a {
        color: #333;
        text-decoration: none;
        &.ex-active {
          color: rgb(226,55,53);
          position: relative;
        }
        &.ex-active::after {
          content: "";
          display: block;
          width: 100%;
          border-bottom: 3px solid rgb(226,55,53);
          position: absolute;
          bottom: -45%;
        }
      }
    }
  }
}
</style>