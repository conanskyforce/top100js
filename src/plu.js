module.exports = function install(Vue,options){
  Vue.prototype.$fetch = function(url){
  	return fetch(url);
  }
}