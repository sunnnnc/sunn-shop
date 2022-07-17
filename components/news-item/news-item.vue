<template>
	<view>
		<view class="news-item" @click="navigator(item.goods_id)" v-for="(item,index) in news" :key="index">
			<image :src="item.goods_small_logo" mode=""></image>
			<view class="right">
				<view class="tit">
					{{item.goods_name}}
				</view>
				<view class="info">
					<text>
						添加时间:{{item.add_time | formatDate }}
					</text>
					<text>
						更新时间:{{item.upt_time}}
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['news'],
		data() {
			return {}
		},
		filters: {
			formatDate(value) {
				const nDate = new Date(value);
				const year = nDate.getFullYear();
				const month = (nDate.getMonth() + 1).toString().padStart(2, 0); //补0
				// month = month < 10 ? '0' + month : month;
				const day = nDate.getDate();
				return year + '年' + month + '月' + day + '日';
			}
		},
		methods: {
			navigator(id) {
				this.$emit("itemClick", id);
			}
		},
	}
</script>

<style>
	.news-item {
		display: flex;
		padding: 10rpx 20rpx;
		border-bottom: 1px solid #B50E03;
	}

	.news-item image {
		min-width: 200rpx;
		max-width: 200rpx;
		height: 150rpx;
	}

	.news-item .right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 15rpx;

	}

	.news-item .right .tit {
		font-size: 30rpx;
	}

	.news-item .right .info {
		font-size: 24rpx;

	}

	.news-item .right .info text:last-child {
		margin-left: 30rpx;
	}
</style>
