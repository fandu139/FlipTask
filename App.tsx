import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation'
import { navigationRef } from './src/helper/navigation';
import { NavigationState } from '@react-navigation/core';
import AuthContext from './src/context/AppContext';
import fetchData from './src/config/fetch';

const getActiveRoute = (state: NavigationState) => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRoute(route.state as NavigationState);
  }

  return route;
};

export default function App() {
  const routeNameRef = useRef<string>();
  const [historyTransactionData, setHistoryTransactionData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      const manipulateData = Object.entries(data?.response?.data).map((e) => ( { [e[0]]: e[1] } ));
      setHistoryTransactionData(manipulateData);
    }

    getData();
  }, [])

  return (
    <AuthContext.Provider
      value={{
        historyTransactionData,
        setHistoryTransactionData,
      }}
    >
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name;
        }}
        onStateChange={(state) => {
          const previousRouteName = routeNameRef.current;
          const { name: currentRouteName, params } = getActiveRoute(
            state as NavigationState,
          );

          routeNameRef.current = currentRouteName;
        }}
      >
        <RootNavigation />
      </NavigationContainer>  
    </AuthContext.Provider>   
  );
}

const Styles = StyleSheet.create({
  iconMore: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});