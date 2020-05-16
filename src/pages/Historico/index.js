import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {
  Layout,
  Text,
  Avatar,
  Button,
  ListItem,
  List,
  Divider,
} from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import HeaderLogo from '../../components/HeaderLogo';
import styles from './styles';

export default function Historico() {
  const [historicos, setHistoricos] = React.useState([]);
  React.useEffect(() => {
    async function getHistorico() {
      try {
        const value = await AsyncStorage.getItem('@downz');
        if (value !== null) {
          console.log('lista', JSON.parse(value));
          setHistoricos(JSON.parse(value));
        }
      } catch (e) {
        console.log('erro ao listar histórico', e);
      }
    }
    getHistorico();
  }, []);
  const ItemImage = props => (
    <Avatar
      {...props}
      shape="square"
      resizeMode="cover"
      size="giant"
      source={{
        uri: props.source,
      }}
    />
  );
  const renderItem = ({item}) => (
    <ListItem
      title={item.title}
      accessoryLeft={() => <ItemImage source={item.img} />}
    />
  );
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Layout style={styles.mainContainer}>
        <HeaderLogo />
        <Text style={{textAlign: 'center'}} category="h6">
          Historico
        </Text>
        <View>
          <List
            data={historicos}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
          />
          {/* <ListItem
            title="UI Kitten"
            description="A set of React Native components"
            accessoryLeft={ItemImage}
          /> */}
        </View>
      </Layout>
    </SafeAreaView>
  );
}
