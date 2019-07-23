//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bgColor: {
      blue: '#2b87d1',
      red: '#ce2636',
      green: '#4bdb6a'
    },
    step: 'red',
    icon: 'bolt',
    title: '当红色变为绿色时，请尽快单击',
    tip: '单击任意位置开始',
    time: '',
    tries: '',
    startTime: '',
    endTime: '',
    randomTime: '',
    result: []
  },
  //事件处理函数
  bindViewTap() {
    const {
      startTime,
      endTime,
      randomTime,
      result
    } = this.data;

    const time = new Date().getTime();
    if (result.length === 5) {
      this.setData({
        startTime: '',
        randomTime: '',
        timeout: '',
        title: '当红色变为绿色时，请尽快单击',
        tip: '单击任意位置开始',
        endTime: '',
        step: 'red',
        result: []
      })
      this.bindViewTap();
    } else if (!startTime) {
      const randomTime = this.randomNum();
      const timeout = setTimeout(() => {
        this.setData({
          title: '点击',
          step: 'green'
        })
      }, randomTime);
      this.setData({
        startTime: time,
        randomTime,
        timeout,
        title: '等待绿色',
        tip: '',
        endTime: '',
        step: 'red',
        icon: 'more'
      })
    } else if (!endTime) {
      if (time - startTime < randomTime) {
        clearTimeout(this.data.timeout)
        this.setData({
          startTime: '',
          endTime: '',
          randomTime: '',
          timeout: '',
          title: '时间过短',
          tip: '点击重新开始',
          step: 'blue',
          icon: 'wait',
          result:[],
          time: (this.sumArr(result) / result.length ).toFixed(2) + 'ms'
        })
      } else {
        this.setData({
          startTime: '',
          endTime: time,
          randomTime: '',
          title: `${time - startTime - randomTime}ms`,
          tip: '点击继续',
          result: [...result, time - startTime - randomTime],
          step: 'blue',
          icon: 'wait',
          time: (this.sumArr([...result, time - startTime - randomTime]) / (result.length + 1)).toFixed(2) + 'ms'
        })

        if (this.data.result.length === 5) {
          clearTimeout(this.data.timeout)
          this.setData({
            startTime: '',
            endTime: '',
            timeout: '',
            title: '测试结束',
            tip: '测试结果如下，点击重新开始'
          })
        }

      }
    }
  },
  sumArr(arr) {
    var sum = 0;
    arr.forEach((val, index, arr) => {
      sum += val;
    })
    return sum;
  },
  randomNum() {
    return parseInt(Math.random() * (10000 - 1000 + 1) + 1000, 10);
  },
  onShareAppMessage() {
    this.setData({
      startTime: '',
      randomTime: '',
      timeout: '',
      title: '当红色变为绿色时，请尽快单击',
      tip: '单击任意位置开始',
      endTime: '',
      step: 'red',
      icon:'bolt',
      result: []
    })
    return {
      title: '反应速度测试',
      path: `/pages/index/index`
    }
  },
})