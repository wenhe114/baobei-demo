
<!--
 * @Description: 地图标记
 * @Autor: bolingsun
 * @Date: 2022-02-23 13:38:59
-->
<template>
  <div class="map-maker-wrapper">
    <!-- <Header title="选择地址">
      <template v-slot:right>
        <div class="btn-confrim" @click="handleSubmit">确定</div>
      </template>
    </Header> -->
    <baidu-map
      class="bm-view"
      ak="你的百度ak"
      :center="mapCenter"
      :zoom="mapZoom"
      :scroll-wheel-zoom="true"
      @ready="onReady"
    >
      <bm-local-search
        :keyword="keyword"
        @searchcomplete="onSearchComplete"
        :auto-viewport="true"
        :panel="false"
      ></bm-local-search>
    </baidu-map>

    <div class="search-wrap">
      <div class="search">
        <input class="search-input" type="text" v-model="keyword" />
        <span class="search-btn" @click="handleSearch">搜索</span>
      </div>


      <div v-show="showResultFlag" class="search-result">
        <div v-for="(item, index) in searchResult" class="item" :key="index" @click="handleSelect(item)">
          <p class="title">{{ item.title }}</p>
          <p class="address">{{ item.address }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'vant'
// import Header from '@/components/Header'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { BmLocalSearch } from 'vue-baidu-map'
const defaultInfo = {
  lng: 0,
  lat: 0,
  addressStr: '',
  title: '',
  province: '', // 省
  city: '', // 市
  district: '' // 区
}
export default {
  name: 'MapMaker',
  components: {
    // Header,
    BaiduMap,
    BmLocalSearch
  },
  data() {
    return {
      BMap: null,
      map: null,
      mapZoom: 15,
      mapCenter: { lng: 116.404, lat: 39.915 },
      keyword: '',
      searchResult: [], // 检索结果列表
      showResultFlag: true,
      selectInfo: Object.assign({}, defaultInfo)
    }
  },
  methods: {
    // 地图初始化回调
    onReady({ BMap, map }) {
      this.BMap = BMap
      this.map = map
      // console.log('BMap', BMap)
    },
    handleSearch() {
    },
   
    handleSubmit() {
      console.log('this.selectInfo', this.selectInfo)
    },
    // 搜索回调
    onSearchComplete(res) {
      console.log('res', res)
      if (res && res.Xr) {
        this.searchResult = [...res.Xr]
        if (this.onceFlag) {
          this.onceFlag = false
        } else {
          this.showResultFlag = true
        }
      }
    },
    handleSelect(item) {
      let self = this
      console.log('item', item)
      let title = item.title
      let { lng, lat } = item.marker.point
      console.log('lng,lat', lng, lat)
      // 以下代码是为了根据经纬度去转换出 省、市、区的信息出来。如果，不需要，可以自行修改。
      let point = new this.BMap.Point(lng, lat)
      let geoc = new this.BMap.Geocoder()
      geoc.getLocation(point, function (res) {
        // console.log('res111', res)
        let addString =
          res.addressComponents.province + res.addressComponents.city + res.addressComponents.district + title
        console.log('addString', addString)
        self.onceFlag = true
        self.showResultFlag = false
        self.keyword = addString
        self.map.clearOverlays() //清除地图上所有覆盖物
        self.map.addOverlay(new self.BMap.Marker({ lng, lat }))
        self.mapCenter.lng = lng
        self.mapCenter.lat = lat
        self.mapZoom = 30
      })
    }
  }
}
</script>

<style lang="less" scoped>
.map-maker-wrapper {
  position: relative;
}
.btn-confrim {
  width: 120px;
  height: 56px;
  line-height: 56px;
  background-color: #5ac9d4;
  border-radius: 8px;
  color: #ffffff;
  text-align: center;
}
.bm-view {
  width: 100%;
  height: calc(100vh - 88px);
}
.search-wrap {
  position: absolute;
  top: 120px;
  left: 0;
  width: 100vw;
  box-sizing: border-box;
  padding: 0 32px;
  // background-color: red;
  .search {
    background-color: #fff;
    padding: 28px 32px;
    border-radius: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    .search-img {
      width: 48px;
      height: 48px;
    }
    .search-input {
      flex: 1;
      outline: none;
      border: none;
      background: none;
      font-size: 28px;
      color: #313233;
    }
    .search-btn {
      font-size: 28px;
      font-weight: 600;
      color: #313233;
    }
  }
  .search-result {
    background-color: #fff;
    padding: 0 32px;
    border-radius: 24px;
    max-height: 720px;
    overflow: scroll;
    .item {
      border-bottom: 1px solid #ebeef2;
      padding: 32px 0;
      &:last-child {
        border-bottom: none;
      }
      .title {
        font-size: 28px;
        font-weight: 600;
        color: #313233;
      }
      .address {
        font-size: 24px;
        font-weight: 400;
        color: #9ca5b3;
        margin-top: 8px;
      }
    }
  }
}
</style>

