import AsyncStorage from '@react-native-async-storage/async-storage';

export const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('accessToken');
    return value;
  } catch (error) {
    return null;
  }
};