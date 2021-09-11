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

export const uploadSuperImages = (images) => {
  const ref = firestore()
  const myUsername = store.getState().user.user.userInfo?.username || ''
  return images.map(async (img, index) => {
      let uid = new Date().getTime() + index
      img.texts = img.texts.map(txt => {
          delete txt.animRatio
          delete txt.animX
          delete txt.animY
          return txt
      })
      img.labels = img.labels.map(label => {
          delete label.animRatio
          delete label.animX
          delete label.animY
          return label
      })
      const blob = await uriToBlob(img.uri)
      const rq = await storage()
          .ref(`story/${myUsername || 'others'}/${new Date().getTime() + Math.random()}.${img.extension.toLowerCase()}`)
          .put(blob, {
              contentType: `image/${img.extension.toLowerCase()}`
          })
      const downloadUri = await rq.ref.getDownloadURL()
      ref.collection('superimages').doc(`${uid}`).set({
          ...img,
          uri: downloadUri,
          uid,
          userId: myUsername
      })
      return {
          sourceId: uid,
          hashtags: Array.from(new Set(img.labels
              .filter(x => x.type === 'hashtag').map(x => x.text))),
          mention: Array.from(new Set(img.labels
              .filter(x => x.type === 'people').map(x => x.text.slice(1)))),
          address: Array.from(new Set(img.labels
              .filter(x => x.type === 'address').map(x => ({
                  place_name: x.text,
                  id: x.address_id
              })))),
      }
  })
}