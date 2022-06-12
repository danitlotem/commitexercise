import './App.css';
import Tabs from './Components/Tabs';
import {Provider} from 'react-redux';
import store from './store/store';
function App() {
	return (
		<Provider store={store}>
			<Tabs />
		</Provider>
	);
}

export default App;
