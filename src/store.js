import { Container } from 'unstated'

const list = [
  {
    id: 1,
    completed: false,
    text: 'Read README'
  },
  {
    id: 2,
    completed: false,
    text: 'Add one todo'
  },
  {
    id: 3,
    completed: false,
    text: 'Add filters'
  },
  {
    id: 4,
    completed: false,
    text: 'Add multiple lists'
  },
  {
    id: 5,
    completed: false,
    text: 'Optional: add tests'
  }
];

const defaultState = {
  data: [ list ]
}

class TodosContainer extends Container {
  constructor (props) {
    super(props)
    this.state = this.readStorage()
  }

  readStorage () {
    if (window && window.localStorage) {
      const state = window.localStorage.getItem('appState')
      if (state) {
        return JSON.parse(state)
      }
    }

    return defaultState
  }

  syncStorage () {
    if (window && window.localStorage) {
      const state = JSON.stringify(this.state)
      window.localStorage.setItem('appState', state)
    }
  }

  getList () {
    return this.state.data;
  }

  toggleComplete = async (id, index) => {
    const item = this.state.data[index].find(i => i.id === id)
    const completed = !item.completed

    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated
    await this.setState(state => {
      const list = state.data[index].map(item => {
        if (item.id !== id) return item
        return {
          ...item,
          completed
        }
      })

      const data = state.data;
      data[index] = list;

      return { data };
    })

    this.syncStorage()
  }

  createTodo = async (listId, text) => {
    await this.setState(state => {
      const item = {
        completed: false,
        text,
        id: state.data[listId].length + 1
      }

      state.data[listId] = [...state.data[listId], item];
      return { data: state.data }
    })

    this.syncStorage()
  }

  addList = async (list = []) => {
    await this.setState(state => ({ data: [ ...state.data, list] }));
    this.syncStorage();
  }
}

export default TodosContainer
