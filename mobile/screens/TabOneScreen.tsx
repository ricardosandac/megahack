import * as React from 'react';
import { StyleSheet, StatusBar, Image, FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { pergunta }  from './TabBookScreen';
import api from '../src/services/api';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

interface Book {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

const dados = [
  {key: '0',
  image: require('../assets/images/livro1.png'),
  title: 'O menino maluquinho',
  progress: '0/6'},

  {key: '1',
  image: require('../assets/images/livro2.png'),
  title: 'A turma da Mônica',
  progress: '0/5'},

  {key: '2',
  image: require('../assets/images/livro3.png'),
  title: 'Dom Casmurro',
  progress: '0/8',},

  {key: '3',
  image: require('../assets/images/livro4.png'),
  title: 'As Aventuras de Mike',
  progress: '0/7'},

  {key: '4',
  image: require('../assets/images/livro5.png'),
  title: 'Revolução dos Bixos',
  progress: '0/10'},

];

function evenOdd(n: number){
  if(n%2 == 0){
    return styles.button2
  } else {
    return styles.button
  }
};

var soma = 0


export default function TabOneScreen() {
  

  function pergCalc(){
    soma = 0
    for (let index = 0; index < pergunta.length; index++) {
        if (pergunta[index].respondido !== '0') {
            soma = soma+1;
        }
    }
    return soma=soma/(pergunta.length-1);
  }

  const navigation = useNavigation();


  const[books,setBooks] = React.useState<Book[]>([]); 
  const[refresh,setRefresh] = React.useState();
  

  React.useEffect(() => {
    api.get('books').then(response => {
      setBooks(response.data);
    });
  }, []);
  

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

    <FlatList showsVerticalScrollIndicator={false} data={books} renderItem= {({item}) => 
      <View style={styles.Shadow}>
        <RectButton style={evenOdd(item.id)} onPress={() => navigation.navigate('Book')}>
          <Text style={styles.titleLivro}>{item.title}</Text>
          <Text style={styles.titleProgress}>0/6</Text>
          <Image style={styles.livros} source={{uri: item.image_url}} />  
          <Image style={styles.cards} source={require('../assets/images/cards.png')} />
          <View style={styles.progressbarview}> 
            <ProgressBar style={styles.progressbar} progress={pergCalc()} color='#A87DD1' />
          </View> 
        </RectButton>
      </View> } keyExtractor={(item, index) => index.toString()}
    /> 
    </>
  );
};


const styles = StyleSheet.create({
  Shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 5,
    shadowOpacity: 0.2
  },

  button: {
    width: '100%',
    height: 166,
    left: 0,
    top: 0,
    color: '#F1F1F1',
    backgroundColor: '#F1F1F1',

  },

  button2: {
    width: '100%',
    height: 166,
    left: 0,
    top: 0,
    color: '#FCFCFC',
    backgroundColor: '#FCFCFC',

  },

  progressbarview: {
    position: 'absolute',
    width: 250,
    height: 25,
    left: '32%',
    top: 107,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    

  },

  progressbar: {
    width: 250,
    height: 25,
    borderRadius: 30,
    backgroundColor: '#f7f7f7',
    borderWidth: 2,
    borderColor: '#A87DD1',
    

  },

  livros: {
    position: 'absolute',
    width: 85,
    height: 119,
    left: 20,
    top: 20,
  },

  cards: {
    position: 'absolute',
    width: 50,
    height: 29,
    right: '8%',
    top: 70,
  },

  titleLivro: {
    position: 'absolute',
    left: 133,
    top: 31,
    fontFamily: "HelveticaNeue",
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 19,
    color: '#45D0C1',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 1,
    shadowOpacity: 0.1
  },

  titleProgress: {
    position: 'absolute',
    right: '22%',
    top: 76,
    fontFamily: "HelveticaNeue",
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: '#A87DD1',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 1,
    shadowOpacity: 0.2
  }

});



