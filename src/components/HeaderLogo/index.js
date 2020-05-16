import React from 'react';
import {View, Image} from 'react-native';

// import { Container } from './styles';
import logoPequena from '../../assets/logo_pequena.png';
import styles from './styles';

export default function HeaderLogo() {
  return (
    <View style={styles.viewContainer}>
      <Image style={styles.image} source={logoPequena} />
    </View>
  );
}
