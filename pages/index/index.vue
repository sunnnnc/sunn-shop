<template>
	<view class="home">
		<swiper :indicator-dots="true" circular :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in swipers" :key="item.goods_id" style="height: 100%;">
				<view class="swiper-item" style="height: 100%;">
					<image :src="item.image_src"></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 导航区域 -->
		<view class="nav">
			<view class="nav-item" v-for="item in navItem" :key="item.name" @click="navItemClick(item.navigator_url)">
				<view>
					<image :src="item.image_src" mode=""></image>
				</view>
			</view>
		</view>

		<!-- 推荐商品区域 -->
		<view class="hot-goods">
			<view class="tit">推荐商品</view>
			<goods-list :hotGoods="hotGoods" @goodsItemClick="goGoodsDetail"></goods-list>
		</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue'
	export default {
		data() {
			return {
				swipers: [],
				navItem: [],
				hotGoods: [],
			}
		},
		onLoad() {
			this.getSwipers();
			this.getNavItem();
			this.getHotGoods();
		},
		components: {
			"goods-list": goodsList,
		},
		methods: {
			// 获取轮播图的数据
			async getSwipers() {
				// uni.request({
				// 	url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
				// 	// 推荐使用箭头函数 this指向问题
				// 	success: (res) => {
				// 		if (res.data.meta !== 200) {
				// 			return uni.showToast({
				// 				title: '获取轮播图失败',
				// 				mask: true,
				// 			})
				// 		}
				// 		this.swipers = res.data.message || [];
				// 	}
				// })


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

			// 获取导航区域图标
			async getNavItem() {
				const res = await this.$myRequest({
					url: '/home/catitems'
				});
				if (res.data.meta.status !== 200) {
					return uni.showToast({
						title: '获取数据失败',
						mask: true,
					})
				}
				this.navItem = res.data.message || [];
				this.navItem[1].navigator_url = "/pages/contact/contact";
				this.navItem[2].navigator_url = "/pages/pics/pics";
				// this.navItem[3].navigator_url = "";

			},

			// 获取商品
			async getHotGoods() {
				const res = await this.$myRequest({
					url: '/goods/search'
					// url: '/home/floordata'
				})
				if (res.data.meta.status !== 200) {
					return uni.showToast({
						title: '获取数据失败'
					})
				}
				this.hotGoods = res.data.message.goods || [];
				this.hotGoods = this.hotGoods.filter(item => item.goods_small_logo)
				// const hotGoods = res.data.message || [];
				// let productList = [];
				// hotGoods.forEach(item => {
				// 	item.product_list.forEach((list) => {
				// 		productList.push(list)
				// 	});
				// });
				// this.hotGoods = productList || [];
			},

			// 导航跳转
			navItemClick(url) {
				uni.navigateTo({
					url
				})
			},

			// 导航到商品详情页
			goGoodsDetail(id) {
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?goods_id=' + id,
				})
			}
		}
	}
</script>

<style>
	.home swiper {
		width: 750rpx;
		height: 380rpx;
	}

	.home swiper swiper-item .swiper-item image {
		width: 100%;
		height: 100%;
	}

	.nav {
		display: flex;
		margin: 10rpx 0;
		/* justify-content: space-between; */
	}

	.nav-item {
		/* width: 150rpx; */
		width: 25%;
		height: 120rpx;
	}

	.nav-item view {
		height: 100%;
		width: 100%;
		/* background: #B50E03; */
	}

	.nav-item view image {
		height: 100%;
		width: 100%;
	}

	.hot-goods {
		margin-top: 10px;
		background-color: #eee;
		overflow: hidden;
	}

	.hot-goods .tit {
		margin: 7px 0; //元素塌陷
		height: 50px;
		line-height: 50px;
		color: #B50E03;
		text-align: center;
		letter-spacing: 20px;
		background: #fff;
	}
</style>
