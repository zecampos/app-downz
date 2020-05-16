import React from 'react';
import {View, Image, PermissionsAndroid, Alert, ScrollView} from 'react-native';
import {
  Layout,
  Text,
  Icon,
  Input,
  Button,
  Card,
  Spinner,
} from '@ui-kitten/components';
import styles from './styles';
import HeaderLogo from '../../components/HeaderLogo';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

let dirs = RNFetchBlob.fs.dirs;

export default function Home({navigation}) {
  const [link, setLink] = React.useState('');
  const [infoLink, setInfoLink] = React.useState({
    id: 0,
    title: '',
    thumbnail: {
      url: '',
    },
    formats: [],
  });
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const [error, setError] = React.useState(false);
  const Footer = props => (
    <>
      <Text style={styles.textEscolha}>Escolha o formato</Text>
      <View {...props} style={[props.style, styles.footerContainer]}>
        {props.formats.map(item => (
          <Button
            key={item.itag}
            style={styles.footerControl}
            size="small"
            status="basic"
            onPress={() => handleDownload(item.url, props.title, props.img)}>
            {item.height} x {item.width} - quality - {item.quality}
          </Button>
        ))}
      </View>
    </>
  );

  async function handleSearch(url) {
    setMsg('Buscando informações do vídeo');
    setLoading(true);
    setError(false);
    try {
      let data = {
        url,
      };
      const linksFormats = await axios.post(
        'https://api-downz.herokuapp.com/getinfo',
        data,
      );

      setInfoLink(linksFormats.data);
      setSuccess(true);
      setLoading(false);
      setError(false);
    } catch (e) {
      console.log('erro ao obter formatos', e);
      setLoading(false);
      setError(true);
    }
  }

  function downloadFile(url, title, img) {
    setMsg('Sua mídia esta sendo baixada');
    setLoading(true);
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title,
        path: `${dirs.DownloadDir}/${title}.mp4`,
      },
    })
      .fetch('GET', url, {})
      .then(res => {
        console.log('The file saved to ', res.path());
        successDownload(title, img);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  }
  function resetData() {
    setSuccess(false);
    setLink('');
    setInfoLink({
      id: 0,
      title: '',
      thumbnail: {
        url: '',
      },
      formats: [],
    });
    setMsg('');
  }
  async function successDownload(titulo, img) {
    try {
      const item = {
        id: Math.round(Math.random() * 36 ** 12).toString(36),
        title: titulo,
        img,
      };
      const value = await AsyncStorage.getItem('@downz');
      const list = JSON.parse(value);
      list.push(item);
      await AsyncStorage.setItem('@downz', JSON.stringify(list));
      resetData();
      navigation.navigate('Historico');
    } catch (e) {
      console.log('erro ao salvar item no historico');
    }
  }
  async function handleDownload(url, title, img) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFile(url, title, img);
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }
  React.useEffect(() => {
    async function checkLocalSotrage() {
      try {
        const value = await AsyncStorage.getItem('@downz');

        if (!value) {
          const list = [];
          await AsyncStorage.setItem('@downz', JSON.stringify(list));
          console.log('nao criado');
        } else {
          console.log('ja existe');
        }
      } catch (e) {
        console.log('erro,', e);
      }
    }
    checkLocalSotrage();
  }, []);
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Layout style={styles.mainContainer}>
        <HeaderLogo />
        <View style={styles.viewInput}>
          <Input
            placeholder="cole o link aqui e depois clique buscar"
            value={link}
            onChangeText={nextValue => setLink(nextValue)}
          />
          <Button
            disabled={loading}
            onPress={() => handleSearch(link)}
            style={styles.button}>
            Buscar
          </Button>
        </View>
        {error ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text status="danger">Erro na sua solicitação</Text>
          </View>
        ) : null}
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Spinner status="primary" />
            <Text>{msg}</Text>
          </View>
        ) : (
          <ScrollView style={styles.viewResult}>
            {success ? (
              <Card
                footer={() => (
                  <Footer
                    formats={infoLink.formats}
                    title={infoLink.title}
                    img={infoLink.thumbnail.url}
                  />
                )}>
                <View>
                  <Text style={styles.textTumb}>{infoLink.title}</Text>
                  <Image
                    style={styles.tumbImg}
                    source={{uri: infoLink.thumbnail.url}}
                  />
                </View>
              </Card>
            ) : null}
          </ScrollView>
        )}
      </Layout>
    </SafeAreaView>
  );
}
