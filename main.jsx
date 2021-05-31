const { StrictMode } = React
const { createStore } = Redux
const { Provider } = ReactRedux
const { render } = ReactDOM

const App = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
)

const store = createStore(rootReducer)

render(<StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
</StrictMode>, document.getElementById('root'))
