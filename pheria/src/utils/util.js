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

export const timestampToString = (create_at, suffix) => {
  let diffTime = (new Date().getTime() - (create_at || 0)) / 1000
  if (diffTime < 60) diffTime = 'vừa mới'
  else if (diffTime > 60 && diffTime < 3600) {
      diffTime = Math.floor(diffTime / 60)
          + (Math.floor(diffTime / 60) > 1 ? (suffix ? ' phút' : 'm') : (suffix ? ' phút' : 'm')) + (suffix ? ' trước' : '')
  } else if (diffTime > 3600 && diffTime / 3600 < 24) {
      diffTime = Math.floor(diffTime / 3600)
          + (Math.floor(diffTime / 3600) > 1 ? (suffix ? ' giờ' : 'h') : (suffix ? ' giờ' : 'h')) + (suffix ? ' trước' : '')
  }
  else if (diffTime > 86400 && diffTime / 86400 < 30) {
      diffTime = Math.floor(diffTime / 86400)
          + (Math.floor(diffTime / 86400) > 1 ? (suffix ? ' ngày' : 'd') : (suffix ? ' ngày' : 'd')) + (suffix ? ' trước' : '')
  } else {
      diffTime = new Date(create_at || 0).toDateString()
  }
  return diffTime
}