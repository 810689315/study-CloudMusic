<template>
  <div class="comment_box">
    <div class="hcmt_head">
      <a href="#"><img :src="commentdata.user.avatarUrl+'?imageView=1&type=webp&thumbnail=247x0'" alt="" /></a>
    </div>
    <div class="hcmt_wrap">
      <div class="wrap_top">
        <div class="cmt_meta">
          <div class="username">{{ commentdata.user.nickname }}</div>
          <div class="cmt_time">{{ commentdata.time }}</div>
        </div>
        <div :class="`cmt_like ${islike ? 'like' : ''}`">
          <span class="likecount">{{ commentdata.likedCount }}</span>
          <i class="fa fa-thumbs-o-up like_icon" @click.once="addlike"></i>
        </div>
      </div>
      <div class="cmt_content">
        {{ commentdata.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ["commentdata"],
  data() {
    return {
      islike: false,
    };
  },
  created() {
    // console.log(this.commentdata);
  },
  methods: {
    addlike() {
      this.commentdata.likedCount++;
      this.islike = true;
    },
  },
};
</script>
<style lang="less" scope>
.like {
  color: rgb(230, 59, 60);
}
.comment_box {
  display: flex;
  flex-direction: row;
  .hcmt_head {
    height: 35px;
    margin: 0px 10px;
    flex: none;
    a {
      position: relative;
      display: block;
      color: #507daf;
      img {
        display: block;
        border-radius: 50%;
        width: 30px;
        height: 30px;
      }
    }
  }
  .hcmt_wrap {
    padding-left: 0px;
    padding-right: 10px;
    padding-bottom: 11px;
    flex: auto;
    width: 0;
    position: relative;
    .wrap_top {
      display: flex;
      flex-direction: row;
      .cmt_meta {
        flex: auto;
        width: 0;
        font-size: 0;
        .username {
          max-width: 100%;
          display: inline-block;
          align-content: center;
          font-size: 14px;
          color: #666;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: auto;
        }
        .cmt_time {
          font-size: 9px;
          color: #999;
        }
      }
      .cmt_like {
        width: 65px;
        height: 22px;
        line-height: 22px;
        font-size: 11px;
        // color: #999;
        flex: none;
        text-align: right;
        .likecount {
          display: inline-block;
          min-width: 30px;
          padding-left: 5px;
          vertical-align: middle;
        }
        .like_icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          font-size: 16px;
          margin-left: 6px;
          line-height: 1;
          vertical-align: middle;
          cursor: pointer;
        }
      }
    }
    .cmt_content {
      position: relative;
      color: #333;
      font-size: 15px;
      line-height: 22px;
      margin-top: 5px;
      vertical-align: middle;
    }
  }
}
</style>