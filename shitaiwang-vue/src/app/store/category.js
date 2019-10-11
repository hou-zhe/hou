import API from '../util/api.js';
export default {
        namespaced: true,
        state: {
                activeId: 0,                    //记录当前激活的一级分类的id值
                list: [],                            //保存所有商品分类
                fids: []                            //记录用户所有看过的fid
        },
        getters: {
                subList: function(state) {
                        return state.activeId === 0 ? [] : state.list.filter(item =>item.fid === state.activeId);
                }
        },
        mutations: {
                _appendData: function(state,payload) { state.list = state.list.concat(payload); },
                _recordFid: function(state,payload) { state.fids.push(payload); },
                _toggleId: function(state,payload) { state.activeId = payload;}
        },
        actions: {
                _getData({ commit }, fid) {
                        return API.category.getData(fid)
                                .then(data =>{
                                        commit('_recordFid', fid);
                                        commit('_appendData', data);
                                        return data;
                                });
                },
                toggleId({state,commit,dispatch},id) {
                        commit('_toggleId',id);
                        if(state.fids.indexOf(id) !==-1) return Promise.resolve();
                        return dispatch('_getData',id);
                },
                init: function({state,dispatch}) {
                        if(state.activeId !==0) return Promise.resolve(state.list[0].id);
                        return dispatch('_getData',0);
                }
        }
};