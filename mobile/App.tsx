import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Roboto_400Regular, Roboto_900Black,  useFonts } from '@expo-google-fonts/roboto';
import { Cabin_600SemiBold } from '@expo-google-fonts/cabin';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_900Black,
    Cabin_600SemiBold
  }); 
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!fontsLoaded) {
    return <AppLoading />
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
