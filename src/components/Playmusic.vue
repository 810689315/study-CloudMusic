<template>
  <div class="player" v-if="this.$root.musicStore.musicID">
    <!-- 音乐播放器 -->
    <audio
      autoplay
      ref="audio"
      @timeupdate="timeUpdate"
      @pause="pause"
      @play="playSong"
      @ended="next"
      :src="`https://music.163.com/song/media/outer/url?id=${this.$root.musicStore.musicID}.mp3`"
    ></audio>

    <!-- 播放状态栏 -->
    <div class="play_bar" v-if="this.$root.musicStore.musicID">
      <i ref="songicon">
        <img
          :src="
            $root.musicStore.currentMusic.al
              ? $root.musicStore.currentMusic.al.picUrl
              : $root.musicStore.currentMusic.artists[0].img1v1Url
          +'?imageView=1&type=webp&thumbnail=247x0'"
          alt=""
        />
        <!-- <img :src="$root.musicStore.currentMusic.al ? $root.musicStore.currentMusic.al.picUrl : $root.musicStore.currentMusic.artists[0].img1v1Url" alt=""> -->
      </i>

      <i @click="isFullScreen = true" class="songname"
        >{{ $root.musicStore.currentMusic.name }}-{{
          $root.musicStore.currentMusic.song.artists[0].name
        }}</i
      >

      <span @click="changePlay">
        <canvas width="150" height="150" ref="processBtn"></canvas>
        <i v-if="!isPlay" class="fa fa-play play_icon"></i>
        <i v-if="isPlay" class="fa fa-pause play_icon"></i>
      </span>
    </div>

    <transition name="fullaudio">
      <!-- 全屏播放页面 -->
      <div class="full_screen" v-show="isFullScreen">
        <div
          class="blur_bj"
          :style="{
            backgroundImage: `url(${
              $root.musicStore.currentMusic.al
                ? $root.musicStore.currentMusic.al.picUrl
                : $root.musicStore.currentMusic.artists[0].img1v1Url
            }?imageView=1&type=webp&thumbnail=247x0)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        ></div>
        <div class="content">
          <!-- 顶部导航 -->
          <div class="fs_head">
            <!-- 返回图标 -->
            <span @click="isFullScreen = false">
              <i class="fa fa-arrow-left"></i>
            </span>
            <span>{{ $root.musicStore.currentMusic.name }}</span>
          </div>

          <!-- 歌曲大图 -->
          <div class="song_img" ref="songimg">
            <img
              :src="
                $root.musicStore.currentMusic.al
                  ? $root.musicStore.currentMusic.al.picUrl
                  : $root.musicStore.currentMusic.artists[0].img1v1Url
              +'?imageView=1&type=webp&thumbnail=247x0'"
              alt=""
            />
          </div>

          <!-- 歌词框 -->
          <div class="lyric_list" v-if="$root.lyric">
            <ul :style="{ transform: `translateY(-${moveTop}px)` }">
              <li
                v-for="(ly, ind) in $root.lyric"
                :key="ind"
                ref="lyricstrip"
                :class="{ active: currentIndex == ind }"
              >
                {{ ly.lyric }}
              </li>
            </ul>
          </div>
          <!-- 没有歌词的时候的歌词框 -->
          <div v-if="!$root.islyric" class="no_lyric_view">
            <span>暂无更多歌词</span>
          </div>

          <!-- 进度条 -->
          <div class="progress_bar">
            <input
              type="range"
              min="0"
              :max="duration"
              :value="currentTime"
              @change="changeTime"
              :style="{
                backgroundSize: (currentTime * 100) / duration + '% 100%',
              }"
            />
          </div>

          <!-- 控制栏-->
          <div class="control_bar">
            <button @click="changePlayStyle">
              <i
                :class="[
                  'fa',
                  {
                    'fa-refresh': playStyle == 0,
                    'fa-random': playStyle == 1,
                    'fa-repeat': playStyle == 2,
                  },
                ]"
              ></i>
            </button>

            <button @click="prev"><i class="fa fa-backward"></i></button>

            <button @click="changePlay">
              <i v-if="!isPlay" class="fa fa-play"></i>
              <i v-if="isPlay" class="fa fa-pause"></i>
            </button>

            <button @click="next"><i class="fa fa-forward"></i></button>

            <button @click="isShowList = !isShowList">
              <i class="fa fa-bars"></i>
            </button>
          </div>

          <transition name="fs-slist">
            <!-- 歌单 -->
            <div class="fs_slist" v-show="isShowList">
              <p @click="isShowList = !isShowList">三</p>
              <ul>
                <li
                  v-for="(value, index) in $root.musicStore.musicList"
                  :key="index"
                  :style="{
                    color: value.id == $root.musicStore.musicID ? 'red' : '',
                  }"
                  @click="cutMusic(value)"
                >
                  {{ value.name }}
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Playmusic",
  props: [],
  data() {
    return {
      isPlay: true, //记录是否在播放
      isFullScreen: false, //记录是否进入全屏播放页面
      isShowList: false, //记录是否显示歌单框
      duration: 0, //播放器总时长
      currentTime: 0, //当前播放时间
      moveTop: 0, //歌词上移距离
      currentIndex: 0, //当前歌词下标
      playStyle: 0, //播放风格，0是列表循环，1是随机播放，2是单曲循环
    };
  },
  methods: {
    // 歌曲切换
    cutMusic(value) {
      this.$root.musicStore.musicID = value.id;
      this.$root.musicStore.currentMusic = value;
    },
    //上一曲
    prev() {
      let currentIndex = 0;
      let songDatas = this.$root.musicStore.musicList;
      switch (this.playStyle) {
        // 列表循环
        case 0:
          {
            for (let i in songDatas) {
              if (songDatas[i].id === this.$root.musicStore.musicID) {
                currentIndex = i;
                break;
              }
            }
            currentIndex--;
            if (currentIndex < 0) {
              currentIndex = songDatas.length - 1;
            }
          }
          break;
        //随机播放
        case 1:
          {
            currentIndex = parseInt(Math.random() * songDatas.length);
          }
          break;
        //单曲循环
        case 2:
          {
            for (let i in songDatas) {
              if (songDatas[i].id === this.$root.musicStore.musicID) {
                currentIndex = i;
                break;
              }
            }
            this.$refs.audio.currentTime = 0;
          }
          break;
        default:
          console.log("playStyle出错了");
      }

      this.$root.musicStore.currentMusic = songDatas[currentIndex];
      this.$root.musicStore.musicID = songDatas[currentIndex].id;
    },
    //下一曲
    next() {
      let currentIndex = 0;
      let songDatas = this.$root.musicStore.musicList;
      switch (this.playStyle) {
        // 列表循环
        case 0:
          {
            for (let i in songDatas) {
              if (songDatas[i].id === this.$root.musicStore.musicID) {
                currentIndex = i;
                break;
              }
            }
            currentIndex++;
            if (currentIndex > songDatas.length - 1) {
              currentIndex = 0;
            }
          }
          break;
        //随机播放
        case 1:
          {
            currentIndex = parseInt(Math.random() * songDatas.length);
          }
          break;
        //单曲循环
        case 2:
          {
            for (let i in songDatas) {
              if (songDatas[i].id === this.$root.musicStore.musicID) {
                currentIndex = i;
                break;
              }
            }
            this.$refs.audio.currentTime = 0;
          }
          break;
        default:
          console.log("playStyle出错了");
      }
      this.$root.musicStore.currentMusic = songDatas[currentIndex];
      this.$root.musicStore.musicID = songDatas[currentIndex].id;
    },
    //audio暂停事件
    pause(event) {
      this.isPlay = true;
      this.changePlay();
      this.timeUpdate(event);
    },
    //audio播放事件
    playSong(event) {
      this.isPlay = false;
      this.changePlay();
      this.timeUpdate(event);
    },
    //进度条改变播放时间
    changeTime(event) {
      let time = event.target.value;
      this.currentTime = time;
      this.$refs.audio.currentTime = time;
    },
    //改变播放状态  播放<==>暂停
    changePlay() {
      let audio = this.$refs.audio;
      let randImg = this.$refs.songicon;
      let songImg = this.$refs.songimg;
      if (this.isPlay) {
        audio.pause();
        this.isPlay = false;
        randImg.style.animationPlayState = "paused";
        songImg.style.animationPlayState = "paused";
      } else {
        audio.play();
        this.isPlay = true;
        randImg.style.animationPlayState = "running";
        songImg.style.animationPlayState = "running";
      }
    },
    //播放器获取时间事件
    timeUpdate(event) {
      // audio元素
      let audio = event.target;
      // 当前播放时间
      let currentTime = audio.currentTime;
      // 播放总时长
      let duration = audio.duration;

      // 歌词移动代码
      if (this.$root.islyric) {
        for (let i = 0; i < this.$root.lyric.length; i++) {
          if (i > this.$root.lyric.length - 1) {
            this.currentIndex = i;
            break;
          }
          if (i < this.$root.lyric.length - 1) {
            if (
              this.$root.lyric[i].time <= currentTime &&
              currentTime < this.$root.lyric[i + 1].time
            ) {
              if (i >= 4) {
                this.moveTop = this.$refs.lyricstrip[i - 2].offsetTop;
              } else {
                this.moveTop = 0;
              }
              this.currentIndex = i;
              break;
            }
          }
        }
        if (currentTime >= this.$root.lyric[this.$root.lyric.length - 1].time) {
          this.currentIndex = this.$root.lyric.length - 1;
          this.moveTop = this.$refs.lyricstrip[
            this.$root.lyric.length - 3
          ].offsetTop;
        }
      }

      this.duration = duration;
      this.currentTime = currentTime;
      this.drawCircle(currentTime, duration);
    },
    //画布
    drawCircle(currentTime, duration) {
      let cv = this.$refs.processBtn.getContext("2d");
      cv.beginPath();
      cv.strokeStyle = "white";
      cv.lineWidth = 7;
      cv.arc(75, 75, 60, 0, 2 * Math.PI);
      cv.stroke();
      cv.closePath();

      cv.beginPath();
      cv.strokeStyle = "red";
      cv.lineWidth = 7;
      cv.arc(75, 75, 60, 0, 2 * Math.PI * parseFloat(currentTime / duration));
      cv.stroke();
      cv.closePath();
    },
    changePlayStyle() {
      this.playStyle = this.playStyle + 1;
      this.playStyle = this.playStyle % 3;
    },
  },
  created() {
    this.$root.isShowAudio = true;
  },
};
</script>

<style lang="less" scoped>
.player {
  position: fixed;
  z-index: 10;
  bottom: 0px;
  width: 100%;
  background-color: #333;
  audio {
    height: 50px;
  }

  .play_bar {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    > i {
      &:nth-of-type(1) {
        background-color: black;
        width: 50px;
        height: 50px;
        border: 1px solid white;
        border-radius: 50%;
        overflow: hidden;
        animation: rotation 5s linear 0s infinite;
      }
      &:nth-of-type(2) {
        flex: 1;
        color: white;
        text-align: left;
        text-indent: 30px;
        font-size: 20px;
        line-height: 40px;
        font-style: normal;
      }
      &.songname {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }
    span {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 15px;
      text-align: center;
      position: relative;
      canvas {
        width: 50px;
        height: 50px;
      }
      i.play_icon {
        text-align: center;
        color: white;
        font-size: 16px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
      }
    }
  }
  .full_screen {
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    color: white;
    position: relative;
    .blur_bj {
      width: 100vw;
      height: 100vh;
      box-sizing: border-box;
      overflow: hidden;
      background-color: black;
      -webkit-filter: blur(15px);
      filter: blur(15px);
      z-index: -1;
      position: absolute;
      top: 0px;
      left: 0px;
    }
    .content {
      z-index: 1;
      height: 85vh;
      .fs_head {
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        span {
          display: inline-block;
          text-align: center;
          &:nth-of-type(1) {
            width: 60px;
            font-size: 18px;
          }
          &:nth-of-type(2) {
            flex: 1;
            text-indent: -60px;
            line-height: 40px;
            font-size: 20px;

            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
        }
      }
      .song_img {
        width: 300px;
        height: 300px;
        overflow: hidden;
        border-radius: 50%;
        margin: 30px auto;
        background-color: black;
        animation: rotation 5s linear infinite;
      }
      .lyric_list {
        width: 100vw;
        height: 20vh;
        overflow: hidden;
        text-align: center;
        ul {
          text-align: center;
          font-size: 17px;
          transition: all 0.08s linear;
          li {
            padding: 6px 0px;
            &.active {
              color: #ffdc00;
            }
          }
        }
      }
      .no_lyric_view {
        transform: translate(41vw, -10vh);
      }
      .progress_bar {
        margin: 0px 15px;
        input[type="range"] {
          position: absolute;
          width: 90%;
          height: 3px;
          bottom: 110px;
          appearance: none;
          border-radius: 10px;
          background: -webkit-linear-gradient(red, red) no-repeat, #fff;
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #fff;
          }
        }
      }
      .control_bar {
        position: absolute;
        width: 90%;
        height: 50px;
        bottom: 50px;
        display: flex;
        left: 50%;
        transform: translateX(-50%);
        button {
          flex: 1;
          outline: none;
          border: none;
          background-color: transparent;
          color: #fff;
          font-size: 16px;
        }
      }
      .fs_slist {
        position: absolute;
        width: 100vw;
        height: 60vh;
        bottom: 0px;
        border-radius: 32px 32px 0px 0px;
        background-color: rgba(0, 0, 0, 0.7);
        overflow-y: auto;
        color: #fff;
        z-index: 10;
        p {
          text-align: center;
          line-height: 30px;
          // margin: 10px 0px 0px 0px;
          padding: 10px 0px;
        }
        ul {
          padding: 0px 30px;
          height: 52vh;

          overflow-x: hidden;
          overflow-y: auto;
          li {
            padding: 10px 0px;
          }
        }
      }
    }
  }
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fullaudio-enter,
.fullaudio-leave-to {
  transform: translateY(100vh);
}
.fullaudio-enter-to,
.fullaudio-leave {
  transform: translateY(0vh);
}
.fullaudio-enter-active,.fullaudio-leave-active{
  transition: all 0.3s linear;
}

.fs-slist-enter,
.fs-slist-leave-to {
  transform: translateY(100%);
}
.fs-slist-enter-to,
.fs-slist-leave {
  transform: translateY(0vh);
}
.fs-slist-enter-active,.fs-slist-leave-active{
  transition:all 0.3s linear;
}
</style>