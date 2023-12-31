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
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    commit("removeTodo", id);
  },
  async filterTodos({ commit }, e) {
    //Get selected number
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );

    commit("setTodos", response.data);
  },
  async updateTodo({ commit }, updTodo) {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
      updTodo
    );
    commit("updTodo", response.data);
    // console.log(response.data, "Todo Data");
  },
};
const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo), // Adding the response to the UI
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
  updTodo: (state, updTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
