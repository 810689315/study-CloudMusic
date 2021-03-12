<template>
    <div class="loading">
        <div>
            <i></i>
            <i></i>
            <i></i>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"Loading",
}
</script>

<style lang="less" scoped>
    .loading{
        font-size: 14px;
        margin: 10px 0px;
        display: flex;
        justify-content: center;
        div{
            width: 16px;
            display: flex;
            justify-content: space-between;
            i{
                display: inline-block;
                margin-left: 2px;
                width: 40px;
                height: 20px;
                background-color: red;
                transform-origin: bottom;
                animation: loading 0.4s linear 0s infinite alternate-reverse;
                &:nth-of-type(2){
                    animation-delay: -0.2s;
                }
                &:nth-of-type(3){
                    animation-delay: -0.6s;
                }
            }
        }
    }
    @keyframes loading {
        0%{
            transform: scaleY(0.4);
        }
        100%{
            transform: scaleY(1.2);
        }
    }
</style>