import React from 'react'
import { Provider, Subscribe } from 'unstated'

import styled from 'styled-components'

import TodosContainer from './store'

import TodoLists from './components/todolists/TodoLists'

function App () {
  return (
    <Provider>
      <Wrapper>
        <Subscribe to={[TodosContainer]}>
          {todos => {
            const lists = todos.getList()
            return (
              <TodosWrapper>
                <button type="button" className="collapsible" onClick={() => todos.addList([])}>
                  Create new list
                </button>
                {
                  lists.map((list, index) => {
                    return <TodoLists index={index} items={list} toggleComplete={todos.toggleComplete} createTodo={todos.createTodo}/>;
                  })
                }
              </TodosWrapper>
            )
          }}
        </Subscribe>
      </Wrapper>
    </Provider>
  )
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`

const TodosWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`

export default App
