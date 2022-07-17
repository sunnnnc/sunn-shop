import App from './App'
import {
	myRequest
} from './util/api.js'


// #ifndef VUE3
import Vue from 'vue'
Vue.prototype.$myRequest = myRequest
Vue.config.productionTip = false
Vue.filter('formatDate', (value) => {
	const nDate = new Date(value);
	const year = nDate.getFullYear();
	const month = (nDate.getMonth() + 1).toString().padStart(2, 0); //补0
	// month = month < 10 ? '0' + month : month;
	const day = nDate.getDate();
	return year + '年' + month + '月' + day + '日';
})
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
