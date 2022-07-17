<template>
	<view class="goods-list">
		<goods-list @goodsItemClick="goDetail" :hotGoods="hotGoods"></goods-list>
		<view class="isOver" v-if="flag">---已经加载全部---</view>
	</view>
</template>

<script>
	import goodList from '../../components/goods-list/goods-list.vue'
	export default {
		data() {
			return {
				pagenum: 1,
				hotGoods: [],
				flag: false,
			}
		},
		components: {
			"goods-list": goodList
		},
		methods: {
			// 获取商品列表的数据
			async getGoodsList(callback) {
				const res = await this.$myRequest({
					url: '/goods/search?pagenum=' + this.pagenum
				})

				this.hotGoods = [...this.hotGoods, ...res.data.message.goods];
				this.hotGoods = this.hotGoods.filter(item => item.goods_small_logo);
				callback && callback();
			},
			// 导航到商品详情页
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?goods_id=' + id,
				})
			}

		},
		onLoad() {
			this.getGoodsList();
		},
		onReachBottom() {
			// 触底触发
			if (this.hotGoods.length > 100) {
				return this.flag = true;
			}

			this.pagenum++;
			this.getGoodsList();
		},
		onPullDownRefresh() {
			this.pagenum = 1;
			this.hotGoods = [];
			this.flag = false;
			setTimeout(() => {
				this.getGoodsList(() => {
					uni.stopPullDownRefresh();
				});
			}, 1000)
		}
	}
</script>

<style>
	.goods-list {
		background-color: #eee;
	}

	.isOver {
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		color: #ccc;
		font-size: 26rpx;
	}
</style>
