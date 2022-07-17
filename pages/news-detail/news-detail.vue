<template>
	<view class="news-detail">
		<View class="goods-detail">商品名称:{{detail.goods_name}}</View>
		<view class="goods-detail">商品数量:{{detail.goods_number}}</view>
		<view class="goods-detail">商品重量:{{detail.goods_weight}}</view>
		<view class="goods-detail">商品价格:${{detail.goods_price}}</view>
		<view class="goods-detail">添加时间:{{detail.add_time | formatDate}}</view>
		<view class="goods-detail">更新时间:{{detail.upd_time | formatDate}}</view>
		<!-- <view class="goods-detail">
			{{detail.attrs}}
		</view>
		<view class="goods-detail">
			{{detail.pics}}
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_id: '',
				detail: {},
			}
		},
		onLoad(option) {
			this.goods_id = option.id;
			this.getDetail();
		},
		methods: {
			async getDetail() {
				const res = await this.$myRequest({
					url: '/goods/detail?goods_id=' + this.goods_id
					// url: '/goods/detail?goods_id=8888',
				})
				this.detail = res.data.message || {};
				console.log(this.detail);
			}
		}
	}
</script>

<style>
	.news-detail {
		font-size: 30rpx;
	}

	.goods-detail {
		padding: 10rpx 20rpx;
	}
</style>
