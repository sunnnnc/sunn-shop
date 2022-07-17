<template>
	<view class="pics">
		<scroll-view class="left" scroll-y>
			<view :class="active===index? 'active' : ''" v-for="(item,index) in cates" :key="item.id"
				@click="leftClickHandle(index,item.cat_id)">
				{{ item.cat_name }}
			</view>
		</scroll-view>
		<scroll-view class="right" scroll-y>
			<view class="item" v-for="(item,index) in secondData" :key="item.cat_id">
				<template v-for="(children,index) in item.children">
					<image @click="previewImg(children.cat_icon)" :src="children.cat_icon" mode=""></image>
					<text>{{children.cat_name}}</text>
					<text v-if="!item.children.length">暂无数据</text>
				</template>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cates: [],
				active: 0,
				secondData: [],
			}
		},
		onLoad() {
			this.getPicsCate();
			this.leftClickHandle(0)
		},
		methods: {
			async getPicsCate() {
				const res = await this.$myRequest({
					url: '/categories',
					// url: '/home/floordata'
				})
				this.cates = res.data.message || [];
			},

			async leftClickHandle(index, id) {
				this.active = index;
				// 获取右侧的数据
				const res = await this.$myRequest({
					url: '/categories',
					// url: '/goods/search?cid=' + id,
				});
				this.secondData = res.data.message[index].children;
				// this.secondData = res.data.message;
			},

			previewImg(url) {
				uni.previewImage({
					urls: [url],
				})
			},
		},
	}
</script>

<style>
	page {
		height: 100%;
	}

	.pics {
		height: 100%;
		display: flex;
	}

	.left {
		width: 200rpx;
		height: 100%;
		border-right: 1px solid #eee;
	}

	.pics .left view {
		height: 60px;
		line-height: 60px;
		color: #333;
		text-align: center;
		font-size: 30rpx;
		border-top: 1px solid #eee;
	}

	.pics .left view.active {
		background: #B50E03;
		color: #fff;
	}

	.pics .right {
		/* background: #eee; */
		height: 100%;
		width: 520rpx;
		margin: 0 auto;
	}

	.pics .right .item image {
		width: 520rpx;
		height: 520rpx;
		border-radius: 5px;
	}
</style>
