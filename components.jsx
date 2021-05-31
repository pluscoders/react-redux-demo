const { connect } = ReactRedux

const AddTodo = (() => {
    const AddTodo = ({ dispatch }) => {
        let input

        return (
            <div>
                <form onSubmit={e => {
                    e.preventDefault()
                    if (!input.value.trim()) {
                        return
                    }
                    dispatch(addTodo(input.value))
                    input.value = ''
                }}>
                    <input ref={node => input = node} />
                    <button type="submit">
                        Add Todo
            </button>
                </form>
            </div>
        )
    }

    return connect()(AddTodo)
})()

const Link = ({ active, children, onClick }) => (
    <button
        onClick={onClick}
        disabled={active}
        style={{
            marginLeft: '4px',
        }}
    >
        {children}
    </button>
)

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
}

const FilterLink = (() => {
    const mapStateToProps = (state, ownProps) => ({
        active: ownProps.filter === state.visibilityFilter
    })

    const mapDispatchToProps = (dispatch, ownProps) => ({
        onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
    })

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(Link)
})()

const Todo = ({ onClick, completed, text }) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    >
        {text}
    </li>
)

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
}

const TodoList = ({ todos, toggleTodo }) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => toggleTodo(todo.id)}
            />
        )}
    </ul>
)

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    toggleTodo: PropTypes.func.isRequired
}

const VisibleTodoList = (() => {
    const getVisibleTodos = (todos, filter) => {
        switch (filter) {
            case VisibilityFilters.SHOW_ALL:
                return todos
            case VisibilityFilters.SHOW_COMPLETED:
                return todos.filter(t => t.completed)
            case VisibilityFilters.SHOW_ACTIVE:
                return todos.filter(t => !t.completed)
            default:
                throw new Error('Unknown filter: ' + filter)
        }
    }

    const mapStateToProps = state => ({
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    })

    const mapDispatchToProps = dispatch => ({
        toggleTodo: id => dispatch(toggleTodo(id))
    })

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(TodoList)
})()

const Footer = () => (
    <div>
        <span>Show: </span>
        <FilterLink filter={VisibilityFilters.SHOW_ALL}>
            All
    </FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
            Active
    </FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
            Completed
    </FilterLink>
    </div>
)