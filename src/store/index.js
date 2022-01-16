import { createStore } from "vuex"

export default createStore({
    state: {
        todos: [],
        messages: []
    },

    mutations: {
        //todos mutations
        pushTask(state, payload) {
            state.todos = [payload, ...state.todos];
        },

        deleteTask(state, payload) {
            const id = payload;
            const newArr = state.todos.filter(el => el.id !== id);
            state.todos = [...newArr];
        },

        setStatus(state, payload) {
            const { id, time } = payload;

            state.todos.forEach(el => {
                if (el.id === id) {
                    if (el.isFinish) {
                        el.isFinish = false;
                        el.finishAt = null;
                    } else {
                        el.isFinish = true;
                        el.finishAt = time;
                    }
                }
            })
        },

        initialByLocal(state, payload) {
            state.todos = [...payload];
        },

        clearTask(state, payload) {
            state.todos = [];
        },

        //messages mutations
        pushMsg(state, payload) {
            state.messages = [payload, ...state.messages];
        },

        deleteMsg(state, payload) {
            const target = payload;
            let newArr = [];
            state.messages.forEach((el, index) => {
                if (index !== target) {
                    newArr.push(el);
                }
            });

            state.messages = [...newArr];
        }

    }
})