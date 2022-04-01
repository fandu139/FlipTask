import React from 'react';
import Colors from '../../theme/colors';
import { StyleSheet, View } from 'react-native';

const Dot: React.FC = () => <View style={styles.dot} />;

const styles = StyleSheet.create({
  dot: {
    backgroundColor: Colors.GRAY90,
    width: 5,
    height: 5,
    borderRadius: 5 / 2,
    marginVertical: 2,
  },
});

export default Dot;
