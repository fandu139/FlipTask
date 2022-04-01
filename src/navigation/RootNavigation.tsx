import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HistoryTransaksiScreen from '../screens/HistoryTransaction/List';
import HistoryTransaksiDetailScreen from '../screens/HistoryTransaction/Detail';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={"HistoryTransaksiScreen"}>
      <Stack.Screen
        name="HistoryTransaksiScreen"
        component={HistoryTransaksiScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HistoryTransaksiDetailScreen"
        component={HistoryTransaksiDetailScreen}
        options={{ title: 'Detail History Transaksi' }}
      />
    </Stack.Navigator>
  )
};

export default RootNavigation;