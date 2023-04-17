import { useEffect, useReducer } from 'react';
import { todoReducer } from "./todoReducer";

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodos = () => {
  const [ todos, dispatch ] = useReducer( todoReducer , [], init );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify( todos ));
    
  }, [todos])
  

  const handleNewTodo = ( todo ) => {
    const action = {
      type: 'Add Todo',
      payload: todo
    }

    dispatch( action );
  }

  const handleDeleTodo = ( id ) => {
    dispatch({
      type: 'Remove Todo',
      payload: id
    })
  }

  const handleToggleTodo = ( id ) => {
    // console.log({id});
    dispatch({
      type: 'Toggle Todo',
      payload: id
    })
  }  

  return {
    todos,

    todosCount: todos.length,
    todosPendingCount: todos.filter(todo => !todo.done).length,
    handleNewTodo,
    handleDeleTodo,
    handleToggleTodo,
  }
}
