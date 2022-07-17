<template>
	<view class="news">
		<news-item @itemClick="goDetail" :news="news"></news-item>
	</view>
</template>

<script>
	import newsList from '../../components/news-item/news-item'
	export default {
		data() {
			return {
				news: [],
			}
		},
		onLoad() {
			this.getNews();
		},
		components: {
			"news-item": newsList
		},
		methods: {
			// 获取数据
			async getNews() {
				const res = await this.$myRequest({
					url: '/goods/search'
				})
				this.news = res.data.message.goods || [];
				this.news = this.news.filter(item => item.goods_small_logo);
			},

			// 跳转到详情页
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/news-detail/news-detail?id=' + id,
				})
			}
		}
	}
</script>

<style>

</style>
