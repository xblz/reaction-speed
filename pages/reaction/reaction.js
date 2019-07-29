Page({
  data: {
    bgColor: {
      blue: '#229FFC',
      red: '#F24545',
      green: '#04CB53'
    },
    step: 'blue',
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
          tip: '点击继续',
          step: 'blue',
          icon: 'wait',
          time: (this.sumArr(result) / result.length).toFixed(2) + 'ms'
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
            tip: ''
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
    return parseInt(Math.random() * (4000 - 2000 + 1) + 2000, 10);
  },
  onShareAppMessage() {
    // this.setData({
    //   startTime: '',
    //   randomTime: '',
    //   timeout: '',
    //   title: '当红色变为绿色时，请尽快单击',
    //   tip: '单击任意位置开始',
    //   endTime: '',
    //   step: 'blue',
    //   icon: 'bolt',
    //   result: []
    // })
    return {
      title: '反应速度测试',
      path: `/pages/home/home`
    }
  },
})