import { AppProvider } from './src/hooks/appContext';
import MainScreen from './src/layouts/MainScreen';

const App = () => {
  return (
    <AppProvider>
      <MainScreen/>
    </AppProvider>
  );
};

export default App;
