<template>
	<view class="goods-list">
		<view @click="navigator(item.goods_name)" class="goods-item" v-for="item in hotGoods" :key="item.name">
			<image :src="item.goods_small_logo" mode=""></image>
			<view class="price">
				<text>${{item.goods_price}}</text>
				<text>$999</text>
			</view>
			<view class="name">
				{{ item.goods_name }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			hotGoods: {
				default: [],
			}
		},
		data() {
			return {

			}
		},
		methods: {
			navigator(id) {
				this.$emit("goodsItemClick", id);
			}
			// async getHotGoods() {
			// 	const res = await this.$myRequest({
			// 		url: '/goods/search'
			// 		// url: '/home/floordata'
			// 	})
			// 	if (res.data.meta.status !== 200) {
			// 		return uni.showToast({
			// 			title: '获取数据失败'
			// 		})
			// 	}
			// 	this.hotGoods = res.data.message || [];
			// },
		}
	}
</script>

<style>
	.goods-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 15rpx;
	}

	.goods-item {
		margin: 10rpx 0;
		padding: 15rpx;
		width: 350rpx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.goods-item image {
		display: block;
		margin: 0 auto;
		width: 100%;
		height: 300rpx;
	}

	.goods-item .price {
		margin: 20rpx 0 10rpx 0;
		color: #B50E03;
		font-size: 36rpx;
	}

	.goods-item .price text:nth-child(2) {
		margin-left: 17rpx;
		color: #ccc;
		font-size: 28rpx;
		text-decoration: line-through;
	}

	.goods-item .price .name {
		font-size: 28rpx;
		line-height: 50rpx;
		padding-bottom: 15rpx;
		padding-top: 10rpx;
	}
</style>
