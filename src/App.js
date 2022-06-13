import "./App.css";
import Tabs from "./Components/Tabs";
//import Example from "./Components/example";
import { Provider } from "react-redux";
import store from "./store/store";
function App() {
  return (
    <Provider store={store}>
      <Tabs />
      {/* <Example /> */}
    </Provider>
  );
}

export default App;
