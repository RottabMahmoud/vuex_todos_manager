import axios from "axios";

const state = {
  todos: [
    {
      id: 12,
      title: "HEllo Rottab",
    },
    {
      id: 123,
      title: "Hello Admin",
    },
  ],
};
const getters = {
  allTodos: (state) => state.todos,
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    commit("setTodos", response.data);
    // console.log(response.data);
  },

  async addTodo({ commit }, title) {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { title, completed: false } // Posting to the Server
    );

    commit("newTodo", response.data); // Calling the Mutation to Add the todo to the UI
  },
};
const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo), // Adding the response to the UI
};

export default {
  state,
  getters,
  actions,
  mutations,
};
