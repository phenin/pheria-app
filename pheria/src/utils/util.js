import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async (key) => {

  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value
    }
  } catch (error) {
    // Error retrieving data
    return null
  }
};

export const setToken = async (key, value) => {
  try {
    await AsyncStorage.setItem(
      key, value
    );
  } catch (error) {
    // Error saving data
  }
};