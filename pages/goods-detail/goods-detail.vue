<template>
	<view class="goods-detail">
		<swiper :indicator-dots="true" circular :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in swipers" :key="item.goods_id" style="height: 100%;">
				<view class="swiper-item" style="height: 100%;">
					<image :src="item.image_src"></image>
				</view>
			</swiper-item>
		</swiper>

		<view class="box1">
			<view class="price">
				<text>$6788</text>
				<text>$8888</text>
			</view>
			<view class="goods-name">
				<view v-for="item in goodsDetail" :key="item.goods_id">
					<view>商品编号:{{item.goods_id}}</view>
					<view>
						商品名字:{{ item.goods_name }}
					</view>
				</view>
			</view>
		</view>
		<view class="line">
		</view>


		<view class="box2">
			<view>货号:2022最新款</view>
			<view>库存:100</view>
		</view>
		<view class="line">
		</view>

		<view class="box3">
			<view class="tit">
				详情介绍
			</view>
			<view class="content">
				此人太懒,不想写介绍
			</view>
		</view>

		<view class="goods-carts">
			<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_id: '',
				goodsDetail: {},
				swipers: [],
				options: [{
					icon: 'chat',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
						color: '#fff'
					}
				],
				customButtonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #1E83FF, #0053B8)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #60F3FF, #088FEB)',
						color: '#fff'
					}
				],
				customButtonGroup1: [{
					text: '立即购买',
					backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
					color: '#fff'
				}]
			}
		},
		onLoad(option) {
			this.goods_id = option.goods_id;
			this.getGoodsDetail();
			this.getSwipers();
		},
		methods: {
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				console.log(e)
				this.options[2].info++
			},
			// 获取轮播图的数据
			async getSwipers() {
				const res = await this.$myRequest({
					url: '/home/swiperdata'
				});
				if (res.data.meta.status !== 200) {
					return uni.showToast({
						title: '获取数据失败',
						mask: true,
					})
				}
				this.swipers = res.data.message || [];
			},
			async getGoodsDetail() {
				const res = await this.$myRequest({
					url: '/goods/qsearch?query=' + this.goods_id
				})
				console.log("res", res);
				this.goodsDetail = res.data.message || {};
			}
		}
	}
</script>

<style>
	.goods-detail swiper {
		width: 750rpx;
		height: 700rpx;
	}

	.goods-detail swiper swiper-item .swiper-item image {
		width: 100%;
		height: 100%;
	}

	.box1 {
		padding: 10rpx;
	}

	.price {
		line-height: 80rpx;
		font-size: 35rpx;
		color: #B50E03;
	}

	.price text:last-child {
		padding-left: 10rpx;
		font-size: 26rpx;
		text-decoration: line-through;
		color: #ccc;
	}

	.goods-name {
		font-size: 30rpx;
		line-height: 60rpx;
	}

	.line {
		height: 10rpx;
		width: 750rpx;
		background-color: #eee;
	}

	.box2 {
		padding: 0 10rpx;
		font-size: 32rpx;
		line-height: 70rpx;
	}

	.box3 {
		padding: 0 10rpx;
	}

	.tit {
		line-height: 70rpx;
		font-size: 30rpx;
		border-bottom: 1px solid #eee;
	}

	.content {
		padding-bottom: 20rpx;
		font-size: 28rpx;
		color: #333;
	}

	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}
</style>
