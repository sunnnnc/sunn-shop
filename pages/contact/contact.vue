<template>
	<view class="contact">
		<image class="img" src="http://www.itcast.cn/2018czydz/images/gywmban.jpg" mode=""></image>
		<view class="info">
			<view @click="phone">联系电话: 15338299494(点击拨打)</view>
			<view>联系地址: 广东省</view>
		</view>
		<map class="map" :longitude="longitude" :latitude="latitude" :markers="markers" :scale="scale"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 中心经纬度
				longitude: 114.127136,
				latitude: 22.553821,
				// 缩放
				scale: 13,
				// 标记
				markers: [{
					longitude: 114.127136,
					latitude: 22.553821,
					iconPath: '../../static/icon/home-active.png',
					width: 30,
					height: 30,
				}]
			}
		},
		methods: {
			phone() {
				uni.makePhoneCall({
					phoneNumber: '15338299494'
				})
			},
		}
	}
</script>

<style>
	.img {
		width: 750rpx;
		height: 320rpx;
	}

	.info {
		padding: 10rpx 20rpx;
		font-size: 30rpx;
	}

	.info view {
		line-height: 80rpx;
		border-bottom: 1px solid #eee;
	}

	.map {
		width: 750rpx;
		height: 750rpx;
	}
</style>
