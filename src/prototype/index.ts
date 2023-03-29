import Vue from 'vue';

Vue.prototype.$copy = function (val) {
    if (!val) return {};
    return JSON.parse(JSON.stringify(val))
};
Vue.prototype.$apply = function (data) {
    return Object.assign({}, data, data);
};
Vue.prototype.$deepClone = function (val) {
    if (!val) return {};
    let a: any = {};
    a.o = val;
    return JSON.parse(JSON.stringify(a.o))
};

