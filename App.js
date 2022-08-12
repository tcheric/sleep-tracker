import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Tabs from "./Tabs"; 
import { LogBox } from 'react-native';


export default function App() {
  LogBox.ignoreLogs(["Warning: Cannot update a component (`ForwardRef(BaseNavigationContainer)`) while rendering a different component (`ForwardRef`). To locate the bad setState() call inside `ForwardRef`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render"])

return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

// export default App