import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          // If authenticated, render the specified component
          <Stack.Screen name="PrivateScreen" component={Component} {...rest} />
        ) : (
          // If not authenticated, you can redirect to the login page or any other logic
          // For simplicity, let's simulate a redirect to the login page by rendering null
          null
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PrivateRoute;
