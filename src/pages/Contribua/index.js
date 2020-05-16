import React from 'react';
import {SafeAreaView, Linking, View} from 'react-native';
import {Layout, Text, Button} from '@ui-kitten/components';
import HeaderLogo from '../../components/HeaderLogo';
import styles from './styles';

export default function Contribua() {
  async function handleDoacao() {
    await Linking.openURL('https://picpay.me/jose.guilherme.campos1/5.0');
  }
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Layout style={styles.mainContainer}>
        <HeaderLogo />
        <View>
          <Text style={{textAlign: 'center'}} category="h6">
            Contribua
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
            marginTop: 5,
          }}>
          <Text style={{textAlign: 'center'}} category="p1">
            Se este App te ajudou de alguma forma e você gostaria de retribuir
            de alguma forma, você pode clicar no botão abaixo e será
            redirecionado para um site!
          </Text>
          <Button onPress={() => handleDoacao()} style={{marginTop: 10}}>
            Doar
          </Button>
        </View>
      </Layout>
    </SafeAreaView>
  );
}
