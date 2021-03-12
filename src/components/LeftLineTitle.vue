<template>
  <div><slot></slot></div>
</template>

<script>
export default {
  name:"LeftLineTitle"
};
</script>

<style lang="less" scoped>
div {
  margin-top: 20px;
  line-height: 20px;
  padding-left: 10px;
  position: relative;
  font-size: 17px;
  &::before {
    content: "";
    position: absolute;
    width: 2px;
    height: 80%;
    background-color: red;
    left: 0px;
    top: -50%;
    transform: translateY(75%);
  }
}
</style>