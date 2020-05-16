import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  mainContainer: {
    flex: 1,

    paddingHorizontal: 10,
  },
  viewInput: {
    marginTop: '10%',
  },
  button: {
    marginTop: 5,
    // backgroundColor: '#FF0000',
    // borderColor: '#FF0000',
  },
  viewResult: {
    marginTop: 5,
  },
  topContainer: {
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    margin: 2,
    backgroundColor: '#CCC',
  },
  footerContainer: {
    justifyContent: 'space-around',
  },
  footerControl: {
    marginHorizontal: 2,
    marginVertical: 5,
  },
  textTumb: {
    textAlign: 'center',
    marginBottom: 5,
  },
  tumbImg: {
    width: 196,
    height: 110,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  textEscolha: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 14,
  },
});

export default styles;
