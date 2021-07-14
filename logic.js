function createTodo(text) {
    if (typeof text !== 'string') throw new TypeErro(`${text} is not a string`)

    const todo = {
        id: Date.now(),
        text,
        completed: false
    }

    _todos.push(todo)

    return todo.id
}

function getAllTodos() {
    return _todos.map(todo => ({ ...todo })) // return a copy so they cannot be manipulated by reference
}

function toggleTodoStatus(id) {
    if (typeof id !== 'number') throw new TypeError(`${id} is not a number`)

    const todo = _todos.find(todo => todo.id === id)

    if (!todo) throw new Error(`todo with id ${id} not found`)

    todo.completed = !todo.completed
}