import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Navigator } from './src/navigator/Navigator'
import { PermissionsProvider } from './src/context/PermissionsContext'
import { Provider } from 'react-redux'
import { store } from './src/app/store'
import { RootNavigator } from './src/navigator/RootNavigator'
import { NativeBaseProvider } from "native-base";

const AppState = ({ children }) => {
  return (
    <PermissionsProvider>
      {children}
    </PermissionsProvider>
  )
}


const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <AppState>
            <RootNavigator />
          </AppState>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})