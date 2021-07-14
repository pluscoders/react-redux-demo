const addTodo = text => {
  const id = createTodo(text)

  return {
    type: 'ADD_TODO',
    id,
    text
  }
}

const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

const toggleTodo = id => {
  toggleTodoStatus(id)
  
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}