<template>
  <div class="info-box">
    <com-header/>
    <div class="charts">
      <div id="temperature"></div>
      <div id="humidity"></div>
      <div id="distribution"></div>
    </div>
    <com-foot/>
  </div>
</template>

<script>
  import comHeader from 'src/components/header'
  import comFoot from 'src/components/foot'
  var echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/pie')
  require('echarts/lib/chart/line')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    components: {
      comHeader, comFoot
    },
    mounted () {
      var temp = echarts.init(document.getElementById('temperature'))
      var tempOption = {
        title: {
          text: '温度',
          subtext: '32℃',
          x: '50%',
          y: '40%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 26
          },
          subtextStyle: {
            fontWeight: 'bold',
            fontSize: 32,
            color: '#3ea1ff'
          }
        },
        series: [{
          name: ' ',
          type: 'pie',
          radius: ['50%', '75%'],
          avoidLabelOverlap: false,
          startAngle: 225,
          color: ['#CEED49', 'transparent'],
          hoverAnimation: false,
          legendHoverLink: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            value: 75,
            name: '1'
          }, {
            value: 25,
            name: '2'
          }]
        }, {
          name: '',
          type: 'pie',
          radius: ['50%', '75%'],
          avoidLabelOverlap: false,
          startAngle: 315,
          color: ['#85E4FB', 'transparent'],
          hoverAnimation: false,
          legendHoverLink: false,
          clockwise: false,
          itemStyle: {
            normal: {
              borderColor: 'transparent',
              borderWidth: '20'
            },
            emphasis: {
              borderColor: 'transparent',
              borderWidth: '20'
            }
          },
          z: 10,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            value: 50
          }, {
            value: 50
          }]
        }]
      }
      var humi = echarts.init(document.getElementById('humidity'))
      var humiOption = {
        title: {
          text: '湿度',
          subtext: '48%',
          x: '50%',
          y: '40%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 26
          },
          subtextStyle: {
            fontWeight: 'bold',
            fontSize: 32,
            color: '#3ea1ff'
          }
        },
        series: [{
          name: ' ',
          type: 'pie',
          radius: ['50%', '75%'],
          avoidLabelOverlap: false,
          startAngle: 225,
          color: ['#CEED49', 'transparent'],
          hoverAnimation: false,
          legendHoverLink: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            value: 75,
            name: '1'
          }, {
            value: 25,
            name: '2'
          }]
        }, {
          name: '',
          type: 'pie',
          radius: ['50%', '75%'],
          avoidLabelOverlap: false,
          startAngle: 315,
          color: ['#85E4FB', 'transparent'],
          hoverAnimation: false,
          legendHoverLink: false,
          clockwise: false,
          itemStyle: {
            normal: {
              borderColor: 'transparent',
              borderWidth: '20'
            },
            emphasis: {
              borderColor: 'transparent',
              borderWidth: '20'
            }
          },
          z: 10,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            value: 40
          }, {
            value: 60
          }]
        }]
      }
      var dis = echarts.init(document.getElementById('distribution'))
      var disOption = {
        title: {
          text: '尿点分布图',
          left: '50%',
          textAlign: 'center',
          textStyle: {
            fontSize: 30
          }
        },
        tooltip: {
          trigger: 'asix',
          axisPointer: {
            lineStyle: {
              color: '#ddd'
            }
          },
          backgroundColor: 'rgba(255,255,255,1)',
          padding: [5, 10],
          textStyle: {
            color: '#7588E4'
          },
          extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
        },
        legend: {
          right: 20,
          orient: 'vertical',
          data: ['今日', '昨日']
        },
        xAxis: {
          type: 'category',
          data: ['00:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
          boundaryGap: false,
          splitLine: {
            show: true,
            interval: 'auto',
            lineStyle: {
              color: ['#D4DFF5']
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#609ee9'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: ['#D4DFF5']
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#609ee9'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          }
        },
        series: [{
          type: 'line',
          smooth: true,
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 6,
          data: ['5', '2', '4', '8', '6', '5', '9', '6', '7', '3', '4', '3'],
          label: {
            normal: {
              show: true
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(216, 244, 247, 1)'
              }, {
                offset: 1,
                color: 'rgba(216, 244, 247, 1)'
              }], false)
            }
          },
          itemStyle: {
            normal: {
              color: '#58c8da'
            }
          },
          lineStyle: {
            normal: {
              width: 3
            }
          }
        }]
      }
      temp.setOption(tempOption)
      humi.setOption(humiOption)
      dis.setOption(disOption)
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  .info-box{
    width: 1170px;
    margin: 100px auto 0;
    &:after{
      content: "";
      display: block;
      clear: both;
    }
  }
  .charts{
    background: #fff;
    border-radius: 5px;
    margin-bottom: 50px;
  }
  #temperature, #humidity{
    width: 450px;
    height: 450px;
    margin: 0 60px;
    display: inline-block;
  }
  #distribution{
    width: 1000px;
    height: 550px;
    margin: 30px auto 20px;
  }
</style>
