import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let musicStore = {
  musicID: null,
  musicList: [],
  currentMusic: null,
}

let vm = new Vue({
  data: {
    musicStore,
    lyric: null,
    islyric: true,
    isShowNav: true,
    isShowAudio: false,
    isDay: true,
  },
  watch: {
    musicStore: {
      handler() {
        //musicID，用于获取歌词
        let musicID = this.musicStore.musicID;
        this.axios.get('http://music.kele8.cn/lyric?id=' + musicID)
          .then(data => {
            //有歌词
            this.$root.islyric = true;
            // console.log(data);
            //处理歌词 使用正则处理
            let lyricArr = data.data.lrc.lyric.split('\n');
            // 删除最后一个 因为会报没有时间的错误
            lyricArr.pop();
            let reg = /\[(\d+):(\d+\.\d+)\](.*)/;
            // 歌词处理
            let newLyric = lyricArr.map(d => {
              if (reg.test(d)) {
                // 返回一个歌词的对象数组
                return {
                  time: (parseInt(RegExp.$1) * 60) + parseFloat(RegExp.$2),
                  lyric: RegExp.$3,
                }
              }
            });

            //去除歌词为空的元素
            this.lyric = newLyric.filter(item => {
              return item.lyric !== ''
            })
            // console.log(this.lyric)
          })
          .catch(err => {
            console.log(err);
            this.lyric = {
              time: 0,
              lyric: ''
            };
            // 无歌词
            this.$root.islyric = false;
          })
      },
      deep: true
    }
  },

  router,
  render: h => h(App),
}).$mount('#app')

window.onload = function(){
    let myDate = new Date();
    let hour = myDate.getHours();
    if (hour > 6 && hour < 18) {
      vm.$data.isDay = true;
    } else {
      vm.$data.isDay = false;
    }
    console.log(vm.$data.isDay);
}
