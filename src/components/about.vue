<template>
  <div class="card">
    <!-- <h3>万物皆可说唱</h3> -->
      <h3 class="h3">万物皆可说唱</h3>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style lang="less" scoped>
div.card {
  height: 50vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 20px 0px;
  background-image: linear-gradient(
    135deg,
    rgba(224, 58, 53) 0%,
    rgba(224, 58, 53) 33.33%,
    rgba(254, 183, 62) 66.67%,
    rgba(254, 183, 62) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  h3 {
    font-size: 40px;
    font-weight: bold;
  }
}
</style>