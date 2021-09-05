import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: '#e1e4e8',
  },
});

export default ProgressiveImage = ({
  source,
  style,
  resizeMode,
}) => {
  return (
    <View style={styles.container}>
      <Image source={source} style={style} resizeMode={resizeMode} />
    </View>
  );
};
