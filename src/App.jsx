import { Provider } from "react-redux"
import { RecipeApp } from "./pages/Recipe"
import store from "./store"

function App() {
  return (
    <>
      <Provider store={store}>
        <RecipeApp />
      </Provider>
    </>
  )
}

export default App
