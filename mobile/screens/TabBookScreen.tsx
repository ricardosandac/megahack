import * as React from 'react';
import { StyleSheet, StatusBar, Image, FlatList, Platform, Modal, Animated } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { ProgressBar } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { FadeInFromBottomAndroidSpec } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs';
import api from '../src/services/api';
import TabOneScreen  from './TabOneScreen';

var figurinhas = [
  {imagem: require('../assets/cards/1.png')},
  {imagem: require('../assets/cards/2.png')},
  {imagem: require('../assets/cards/3.png')},
  {imagem: require('../assets/cards/4.png')},
];

export var pergunta = [
    {key: '0',
    pergunta: '1',
    respondido: '0',
    },
    {key: '0',
    pergunta: '2',
    respondido: '0',
    },
    {key: '0',
    pergunta: '3',
    respondido: '0',
    },
    {key: '0',
    pergunta: '4',
    respondido: '0',
    },
    {key: '0',
    pergunta: '5',
    respondido: '0',
    },
    {key: '0',
    pergunta: '6',
    respondido: '0',
    },
];

var modalOpened=0;
var soma=0;

export default function TabBookScreen() {
  const navigation = useNavigation();

  var per = pergunta;


  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  
  
  const [modalOpen, setmodalOpen] = React.useState(false);
  const [modalOpen50, setmodalOpen50] = React.useState(false);
  const [modalOpen75, setmodalOpen75] = React.useState(false);
  const [modalOpen100, setmodalOpen100] = React.useState(false);
  const [treasureModalOpen, settreasureModalOpen] = React.useState(false);
  const [treasureModalOpen2, settreasureModalOpen2] = React.useState(false);
  const [treasureModalOpen3, settreasureModalOpen3] = React.useState(false);

  function pergCalc(){
    soma = 0
    for (let index = 0; index < pergunta.length; index++) {
        if (pergunta[index].respondido !== '0') {
            soma = soma+1;
            if ((soma/(pergunta.length)) == 1 && modalOpened == 0) {
              modalOpened=1;
              howManyCards(4);
            }   
        }
    }
    return soma=soma/(pergunta.length-1);
  }

  const [itemState, setitemState] = React.useState(pergunta);

  function loadQuestionsAnswers(t: string,n: number) {
      if (t == 'shadow'){
          if (pergunta[n].respondido=='1') {return styles.shadow1} else if(pergunta[n].respondido=='2') {return styles.shadow2} else {return styles.shadow};
      } else if(t == 'respostaCerta') {
          if (pergunta[n].respondido=='0') {return styles.resposta} else {return styles.respostaCerta};
      }
  }; 

  function answer(i: number,r: string){
      if(pergunta[i].respondido=='0') {
          pergunta[i].respondido=r;
      }
  }


  function howManyCards(n: number) {
    var corretas = 0;
    for (let index = 0; index < pergunta.length; index++) {
      if (pergunta[index].respondido == '1') {
        corretas=corretas+1;
      };
    }
    console.log((corretas/(pergunta.length)));
    if (n==1) {
      if ((corretas/(pergunta.length))>=0.5) {
        settreasureModalOpen(true);
      } else {settreasureModalOpen(false);fadeOut();} 
    } else if (n==2) {
      if ((corretas/(pergunta.length))>=0.75) {
        settreasureModalOpen2(true);fadeOut();
      } else {settreasureModalOpen(false);fadeOut();}  
    } else if (n==3) {
      if ((corretas/(pergunta.length))==1) {
        settreasureModalOpen2(false);settreasureModalOpen3(true);fadeOut();
      }  else {settreasureModalOpen(false);fadeOut();} 
    } else if(n==4) {
      if ((corretas/(pergunta.length))>=0.5 && (corretas/(pergunta.length))<0.75) {
        setmodalOpen50(true)
        return
      }
      if ((corretas/(pergunta.length))>=0.75 && (corretas/(pergunta.length))<1) {
        setmodalOpen75(true)
        return
      }
      if ((corretas/(pergunta.length))==1) {
        setmodalOpen100(true);
        return
      } else {
        setmodalOpen(true)
      }
    }
  };

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    
    
    <View style={{ flex: 1 }} >

    <Modal animationType='fade' visible={modalOpen}>
        <View>
          <RectButton style={styles.buttonBox} onPress={() => {setmodalOpen(false)}}>
            <Text style={styles.winText} >Parabéns, finalizou todas as perguntas!</Text>
            <LottieView style={[{right: 80, left: 40, bottom: 10}]} source={require('../assets/images/sad.json')} autoPlay loop onAnimationFinish={() => {fadeIn()}}></LottieView> 
            <Text style={[styles.winText, {top: 500}]} >Infelizmente você não acertou mais de 50% das perguntas para ganhar baús</Text>
          </RectButton>
        </View>
      </Modal>

      <Modal animationType='fade' visible={modalOpen50}>
        <View>
          <RectButton style={styles.buttonBox} onPress={() => {setmodalOpen50(false);howManyCards(1)}}>
            <Text style={styles.winText} >Parabéns você acertou mais de 50% das perguntas</Text>
            <LottieView style={[{right: 40, bottom: 40},styles.shadowCard]} source={require('../assets/images/treasure.json')}onAnimationFinish={() => {fadeIn()}}></LottieView> 
            <Text style={[styles.winText, {top: 500}]} >Você acaba de ganhar 1 baú de figurinha</Text>
          </RectButton>
        </View>
      </Modal>

      <Modal animationType='fade' visible={modalOpen75} >
        <View>
        <RectButton style={styles.buttonBox} onPress={() => {setmodalOpen75(false);howManyCards(1)}}>
            <Text style={styles.winText} >Parabéns você acertou mais de 75% das perguntas</Text>
            <LottieView style={[{right: 60, bottom: 40},styles.shadowCard]} source={require('../assets/images/treasure.json')}onAnimationFinish={() => {fadeIn()}}></LottieView> 
            <LottieView style={[{right: 20, bottom: 40},styles.shadowCard]} source={require('../assets/images/treasure.json')}onAnimationFinish={() => {fadeIn()}}></LottieView>
            <Text style={[styles.winText, {top: 530}]} >Você acaba de ganhar 2 baús de figurinha</Text>
          </RectButton>
          </View>
      </Modal>

      <Modal animationType='fade' visible={modalOpen100}>
        <View>
        <RectButton style={styles.buttonBox} onPress={() => {setmodalOpen100(false);howManyCards(1)}}>
            <Text style={styles.winText} >Parabéns você acertou 100% das perguntas</Text>
            <LottieView style={[{right: 100, bottom: 40},styles.shadowCard]} source={require('../assets/images/treasure.json')}onAnimationFinish={() => {fadeIn()}}></LottieView>
            <LottieView style={[{right: 60, bottom: 40},styles.shadowCard]} source={require('../assets/images/treasure.json')}onAnimationFinish={() => {fadeIn()}}></LottieView> 
            <LottieView style={[{right: 20, bottom: 40},styles.shadowCard]} source={require('../assets/images/treasure.json')}onAnimationFinish={() => {fadeIn()}}></LottieView>
            <Text style={[styles.winText, {top: 530}]} >Você acaba de ganhar 3 baús de figurinha</Text>
          </RectButton>
          </View>
      </Modal>


      <Modal  animationType='slide' visible={treasureModalOpen}>
        <RectButton style={styles.buttonBox} onPress={() => {howManyCards(2)}}>
          <LottieView style={styles.sun} source={require('../assets/images/sun.json')} autoPlay loop></LottieView>
          <LottieView style={styles.treasure} source={require('../assets/images/treasure.json')} autoPlay loop={false} onAnimationFinish={() => {fadeIn()}}></LottieView>  
          <Animated.View
        style={[{opacity: fadeAnim}, styles.shadowCard
        ]}
        >
        <Image style={styles.cards} source={figurinhas[getRandomInt(0, figurinhas.length)].imagem} />
        </Animated.View>          
        </RectButton>

        <Modal animationType='fade' visible={treasureModalOpen2} >
          <RectButton style={styles.buttonBox} onPress={() => {howManyCards(3)}}>
            <LottieView style={styles.sun} source={require('../assets/images/sun.json')} autoPlay loop></LottieView>
            <LottieView style={styles.treasure} source={require('../assets/images/treasure.json')} autoPlay loop={false} onAnimationFinish={() => {fadeIn()}}></LottieView>  
            <Animated.View
            style={[{opacity: fadeAnim}, styles.shadowCard
            ]}
            >
            <Image style={styles.cards} source={figurinhas[getRandomInt(0, figurinhas.length)].imagem} />
            </Animated.View>          
          </RectButton>
        </Modal>

        <Modal animationType='fade' visible={treasureModalOpen3} >
          <RectButton style={styles.buttonBox} onPress={() => {settreasureModalOpen3(false);settreasureModalOpen(false);fadeOut()}}>
            <LottieView style={styles.sun} source={require('../assets/images/sun.json')} autoPlay loop></LottieView>
            <LottieView style={styles.treasure} source={require('../assets/images/treasure.json')} autoPlay loop={false} onAnimationFinish={() => {fadeIn();console.log(figurinhas.length)}}></LottieView>  
            <Animated.View
            style={[{opacity: fadeAnim},
            styles.shadowCard]}
            >
            <Image style={styles.cards} source={figurinhas[getRandomInt(0, figurinhas.length)].imagem} />
            </Animated.View>          
          </RectButton>
        </Modal>
        
      </Modal>

      
      
      <ViewPager style={styles.viewPager} initialPage={0} transitionStyle='curl' >
        <View style={styles.page}>
          <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Non odio euismod lacinia at quis risus sed vulputate. Quisque egestas diam in arcu cursus euismod quis viverra. Id semper risus in hendrerit gravida rutrum quisque non. Gravida neque convallis a cras semper auctor neque vitae tempus. Nunc scelerisque viverra mauris in. Tincidunt arcu non sodales neque sodales ut. Eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Urna nec tincidunt praesent semper feugiat nibh. Non enim praesent elementum facilisis leo. Feugiat vivamus at augue eget. Ut diam quam nulla porttitor massa id neque.At consectetur lorem donec massa sapien faucibus et molestie ac. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus. Ut porttitor leo a diam sollicitudin tempor. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Cursus mattis molestie a iaculis at. Tincidunt praesent semper feugiat nibh sed pulvinar. Pretium fusce id velit ut. Cras ornare arcu dui vivamus arcu felis bibendum ut. Est pellentesque elit ullamcorper dignissim.</Text>
        </View>
        <View style={styles.page}>
          <Text>Volutpat commodo sed egestas egestas fringilla phasellus. Facilisi etiam dignissim diam quis enim lobortis scelerisque. Aliquam vestibulum morbi blandit cursus risus at ultrices. Consequat id porta nibh venenatis cras. Sed felis eget velit aliquet. Accumsan lacus vel facilisis volutpat est velit egestas. Erat imperdiet sed euismod nisi. Nisi porta lorem mollis aliquam. In aliquam sem fringilla ut. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Nunc consequat interdum varius sit amet mattis vulputate enim. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Augue ut lectus arcu bibendum. Et netus et malesuada fames. Amet porttitor eget dolor morbi non arcu risus quis. Sed ullamcorper morbi tincidunt ornare massa eget egestas.Sed nisi lacus sed viverra. Cursus sit amet dictum sit amet justo. Sit amet luctus venenatis lectus magna fringilla urna porttitor. Sed odio morbi quis commodo odio aenean sed adipiscing. Amet consectetur adipiscing elit ut aliquam. Lorem sed risus ultricies tristique. Pellentesque eu tincidunt tortor aliquam nulla facilisi. Enim nec dui nunc mattis enim. Massa tincidunt dui ut ornare. Blandit cursus risus at ultrices mi tempus imperdiet. Risus commodo viverra maecenas accumsan lacus. Facilisis gravida neque convallis a cras semper auctor. Donec ultrices tincidunt arcu non. Risus sed vulputate odio ut. A lacus vestibulum sed arcu non odio euismod.</Text>
        </View>



        <View style={styles.page}>
        <View>
            <Image style={styles.indice} source={require('../assets/images/indice1.png')}></Image>
          </View>
        <View>
            <View style={loadQuestionsAnswers('shadow',0)} >
            <Text style={styles.pergunta} >Com quantos anos Harry Potter fez seu trigésimo aniversário?</Text>
            </View>
        <View style={loadQuestionsAnswers('shadow',0)}> 
        <RectButton style={styles.button} onPress={() => {answer(0,'2');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={styles.resposta} >50</Text>
        </RectButton>
        </View>
        <View style={loadQuestionsAnswers('shadow',0)}>
        <RectButton style={styles.button} onPress={() => {answer(0,'1');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={loadQuestionsAnswers('respostaCerta',0)} >30</Text>
        </RectButton>
        </View>
        <View style={loadQuestionsAnswers('shadow',0)}>
        <RectButton style={styles.button} onPress={() => {answer(0,'2');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={styles.resposta}>0</Text>
        </RectButton>
        </View>
        <View style={loadQuestionsAnswers('shadow',0)}>
        <RectButton style={styles.button} onPress={() => {answer(0,'2');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={styles.resposta}>20</Text>
        </RectButton>
        </View>
        </View>
        </View>



        <View style={styles.page}>
          <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Non odio euismod lacinia at quis risus sed vulputate. Quisque egestas diam in arcu cursus euismod quis viverra. Id semper risus in hendrerit gravida rutrum quisque non. Gravida neque convallis a cras semper auctor neque vitae tempus. Nunc scelerisque viverra mauris in. Tincidunt arcu non sodales neque sodales ut. Eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Urna nec tincidunt praesent semper feugiat nibh. Non enim praesent elementum facilisis leo. Feugiat vivamus at augue eget. Ut diam quam nulla porttitor massa id neque.At consectetur lorem donec massa sapien faucibus et molestie ac. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus. Ut porttitor leo a diam sollicitudin tempor. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Cursus mattis molestie a iaculis at. Tincidunt praesent semper feugiat nibh sed pulvinar. Pretium fusce id velit ut. Cras ornare arcu dui vivamus arcu felis bibendum ut. Est pellentesque elit ullamcorper dignissim.</Text>
        </View>
        <View style={styles.page}>
          <Text>Volutpat commodo sed egestas egestas fringilla phasellus. Facilisi etiam dignissim diam quis enim lobortis scelerisque. Aliquam vestibulum morbi blandit cursus risus at ultrices. Consequat id porta nibh venenatis cras. Sed felis eget velit aliquet. Accumsan lacus vel facilisis volutpat est velit egestas. Erat imperdiet sed euismod nisi. Nisi porta lorem mollis aliquam. In aliquam sem fringilla ut. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Nunc consequat interdum varius sit amet mattis vulputate enim. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Augue ut lectus arcu bibendum. Et netus et malesuada fames. Amet porttitor eget dolor morbi non arcu risus quis. Sed ullamcorper morbi tincidunt ornare massa eget egestas.Sed nisi lacus sed viverra. Cursus sit amet dictum sit amet justo. Sit amet luctus venenatis lectus magna fringilla urna porttitor. Sed odio morbi quis commodo odio aenean sed adipiscing. Amet consectetur adipiscing elit ut aliquam. Lorem sed risus ultricies tristique. Pellentesque eu tincidunt tortor aliquam nulla facilisi. Enim nec dui nunc mattis enim. Massa tincidunt dui ut ornare. Blandit cursus risus at ultrices mi tempus imperdiet. Risus commodo viverra maecenas accumsan lacus. Facilisis gravida neque convallis a cras semper auctor. Donec ultrices tincidunt arcu non. Risus sed vulputate odio ut. A lacus vestibulum sed arcu non odio euismod.</Text>
        </View>
        <View style={styles.page}>
          <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Non odio euismod lacinia at quis risus sed vulputate. Quisque egestas diam in arcu cursus euismod quis viverra. Id semper risus in hendrerit gravida rutrum quisque non. Gravida neque convallis a cras semper auctor neque vitae tempus. Nunc scelerisque viverra mauris in. Tincidunt arcu non sodales neque sodales ut. Eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Urna nec tincidunt praesent semper feugiat nibh. Non enim praesent elementum facilisis leo. Feugiat vivamus at augue eget. Ut diam quam nulla porttitor massa id neque.At consectetur lorem donec massa sapien faucibus et molestie ac. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus. Ut porttitor leo a diam sollicitudin tempor. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Cursus mattis molestie a iaculis at. Tincidunt praesent semper feugiat nibh sed pulvinar. Pretium fusce id velit ut. Cras ornare arcu dui vivamus arcu felis bibendum ut. Est pellentesque elit ullamcorper dignissim.</Text>
        </View>
        <View style={styles.page}>
          <Text>Volutpat commodo sed egestas egestas fringilla phasellus. Facilisi etiam dignissim diam quis enim lobortis scelerisque. Aliquam vestibulum morbi blandit cursus risus at ultrices. Consequat id porta nibh venenatis cras. Sed felis eget velit aliquet. Accumsan lacus vel facilisis volutpat est velit egestas. Erat imperdiet sed euismod nisi. Nisi porta lorem mollis aliquam. In aliquam sem fringilla ut. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Nunc consequat interdum varius sit amet mattis vulputate enim. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Augue ut lectus arcu bibendum. Et netus et malesuada fames. Amet porttitor eget dolor morbi non arcu risus quis. Sed ullamcorper morbi tincidunt ornare massa eget egestas.Sed nisi lacus sed viverra. Cursus sit amet dictum sit amet justo. Sit amet luctus venenatis lectus magna fringilla urna porttitor. Sed odio morbi quis commodo odio aenean sed adipiscing. Amet consectetur adipiscing elit ut aliquam. Lorem sed risus ultricies tristique. Pellentesque eu tincidunt tortor aliquam nulla facilisi. Enim nec dui nunc mattis enim. Massa tincidunt dui ut ornare. Blandit cursus risus at ultrices mi tempus imperdiet. Risus commodo viverra maecenas accumsan lacus. Facilisis gravida neque convallis a cras semper auctor. Donec ultrices tincidunt arcu non. Risus sed vulputate odio ut. A lacus vestibulum sed arcu non odio euismod.</Text>
        </View>
      


        <View style={styles.page}>
        <View>
            <Image style={styles.indice} source={require('../assets/images/indice2.png')}></Image>
          </View>
        <View>
            <View style={loadQuestionsAnswers('shadow',1)} >
            <Text style={styles.pergunta} >O que Harry Potter possui na testa?</Text>
            </View>
        <View style={loadQuestionsAnswers('shadow',1)}> 
        <RectButton style={styles.button} onPress={() => {answer(1,'2');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={styles.resposta} >Uma varinha</Text>
        </RectButton>
        </View>
        <View style={loadQuestionsAnswers('shadow',1)}>
        <RectButton style={styles.button} onPress={() => {answer(1,'2');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={styles.resposta} >Uma vassoura</Text>
        </RectButton>
        </View>
        <View style={loadQuestionsAnswers('shadow',1)}>
        <RectButton style={styles.button} onPress={() => {answer(1,'2');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={styles.resposta}>Espinhas</Text>
        </RectButton>
        </View>
        <View style={loadQuestionsAnswers('shadow',1)}>
        <RectButton style={styles.button} onPress={() => {answer(1,'1');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={loadQuestionsAnswers('respostaCerta',1)}>Um raio</Text>
        </RectButton>
        </View>
        </View>
        </View>


        


        <View style={styles.page}>
          <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Non odio euismod lacinia at quis risus sed vulputate. Quisque egestas diam in arcu cursus euismod quis viverra. Id semper risus in hendrerit gravida rutrum quisque non. Gravida neque convallis a cras semper auctor neque vitae tempus. Nunc scelerisque viverra mauris in. Tincidunt arcu non sodales neque sodales ut. Eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Urna nec tincidunt praesent semper feugiat nibh. Non enim praesent elementum facilisis leo. Feugiat vivamus at augue eget. Ut diam quam nulla porttitor massa id neque.At consectetur lorem donec massa sapien faucibus et molestie ac. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus. Ut porttitor leo a diam sollicitudin tempor. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Cursus mattis molestie a iaculis at. Tincidunt praesent semper feugiat nibh sed pulvinar. Pretium fusce id velit ut. Cras ornare arcu dui vivamus arcu felis bibendum ut. Est pellentesque elit ullamcorper dignissim.</Text>
        </View>
        <View style={styles.page}>
          <Text>Volutpat commodo sed egestas egestas fringilla phasellus. Facilisi etiam dignissim diam quis enim lobortis scelerisque. Aliquam vestibulum morbi blandit cursus risus at ultrices. Consequat id porta nibh venenatis cras. Sed felis eget velit aliquet. Accumsan lacus vel facilisis volutpat est velit egestas. Erat imperdiet sed euismod nisi. Nisi porta lorem mollis aliquam. In aliquam sem fringilla ut. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Nunc consequat interdum varius sit amet mattis vulputate enim. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Augue ut lectus arcu bibendum. Et netus et malesuada fames. Amet porttitor eget dolor morbi non arcu risus quis. Sed ullamcorper morbi tincidunt ornare massa eget egestas.Sed nisi lacus sed viverra. Cursus sit amet dictum sit amet justo. Sit amet luctus venenatis lectus magna fringilla urna porttitor. Sed odio morbi quis commodo odio aenean sed adipiscing. Amet consectetur adipiscing elit ut aliquam. Lorem sed risus ultricies tristique. Pellentesque eu tincidunt tortor aliquam nulla facilisi. Enim nec dui nunc mattis enim. Massa tincidunt dui ut ornare. Blandit cursus risus at ultrices mi tempus imperdiet. Risus commodo viverra maecenas accumsan lacus. Facilisis gravida neque convallis a cras semper auctor. Donec ultrices tincidunt arcu non. Risus sed vulputate odio ut. A lacus vestibulum sed arcu non odio euismod.</Text>
        </View>
        <View style={styles.page}>
          <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Non odio euismod lacinia at quis risus sed vulputate. Quisque egestas diam in arcu cursus euismod quis viverra. Id semper risus in hendrerit gravida rutrum quisque non. Gravida neque convallis a cras semper auctor neque vitae tempus. Nunc scelerisque viverra mauris in. Tincidunt arcu non sodales neque sodales ut. Eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Urna nec tincidunt praesent semper feugiat nibh. Non enim praesent elementum facilisis leo. Feugiat vivamus at augue eget. Ut diam quam nulla porttitor massa id neque.At consectetur lorem donec massa sapien faucibus et molestie ac. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus. Ut porttitor leo a diam sollicitudin tempor. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Cursus mattis molestie a iaculis at. Tincidunt praesent semper feugiat nibh sed pulvinar. Pretium fusce id velit ut. Cras ornare arcu dui vivamus arcu felis bibendum ut. Est pellentesque elit ullamcorper dignissim.</Text>
        </View>
        <View style={styles.page}>
          <Text>Volutpat commodo sed egestas egestas fringilla phasellus. Facilisi etiam dignissim diam quis enim lobortis scelerisque. Aliquam vestibulum morbi blandit cursus risus at ultrices. Consequat id porta nibh venenatis cras. Sed felis eget velit aliquet. Accumsan lacus vel facilisis volutpat est velit egestas. Erat imperdiet sed euismod nisi. Nisi porta lorem mollis aliquam. In aliquam sem fringilla ut. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Nunc consequat interdum varius sit amet mattis vulputate enim. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Augue ut lectus arcu bibendum. Et netus et malesuada fames. Amet porttitor eget dolor morbi non arcu risus quis. Sed ullamcorper morbi tincidunt ornare massa eget egestas.Sed nisi lacus sed viverra. Cursus sit amet dictum sit amet justo. Sit amet luctus venenatis lectus magna fringilla urna porttitor. Sed odio morbi quis commodo odio aenean sed adipiscing. Amet consectetur adipiscing elit ut aliquam. Lorem sed risus ultricies tristique. Pellentesque eu tincidunt tortor aliquam nulla facilisi. Enim nec dui nunc mattis enim. Massa tincidunt dui ut ornare. Blandit cursus risus at ultrices mi tempus imperdiet. Risus commodo viverra maecenas accumsan lacus. Facilisis gravida neque convallis a cras semper auctor. Donec ultrices tincidunt arcu non. Risus sed vulputate odio ut. A lacus vestibulum sed arcu non odio euismod.</Text>
        </View>
      
      
        <View style={styles.page} >
        <View>
            <Image style={styles.indice} source={require('../assets/images/indice3.png')}></Image>
          </View>
        <View>
            <View style={loadQuestionsAnswers('shadow',2)} >
            <Text style={styles.pergunta} >Harry Potter é um...</Text>
            </View>
        <View style={loadQuestionsAnswers('shadow',2)}> 
        <RectButton style={styles.button} onPress={() => {answer(2,'2');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={styles.resposta} >Mago</Text>
        </RectButton>
        </View>
        <View style={loadQuestionsAnswers('shadow',2)}>
        <RectButton style={styles.button} onPress={() => {answer(2,'1');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={loadQuestionsAnswers('respostaCerta',2)} >Bruxo</Text>
        </RectButton>
        </View>
        <View style={loadQuestionsAnswers('shadow',2)}>
        <RectButton style={styles.button} onPress={() => {answer(2,'2');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={styles.resposta}>Jibóia</Text>
        </RectButton>
        </View>
        <View style={loadQuestionsAnswers('shadow',2)}>
        <RectButton style={styles.button} onPress={() => {answer(2,'2');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={styles.resposta}>Feiticeiro</Text>
        </RectButton>
        </View>
        </View>
        </View>



        <View style={styles.page}>
          <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Non odio euismod lacinia at quis risus sed vulputate. Quisque egestas diam in arcu cursus euismod quis viverra. Id semper risus in hendrerit gravida rutrum quisque non. Gravida neque convallis a cras semper auctor neque vitae tempus. Nunc scelerisque viverra mauris in. Tincidunt arcu non sodales neque sodales ut. Eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Urna nec tincidunt praesent semper feugiat nibh. Non enim praesent elementum facilisis leo. Feugiat vivamus at augue eget. Ut diam quam nulla porttitor massa id neque.At consectetur lorem donec massa sapien faucibus et molestie ac. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus. Ut porttitor leo a diam sollicitudin tempor. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Cursus mattis molestie a iaculis at. Tincidunt praesent semper feugiat nibh sed pulvinar. Pretium fusce id velit ut. Cras ornare arcu dui vivamus arcu felis bibendum ut. Est pellentesque elit ullamcorper dignissim.</Text>
        </View>
        <View style={styles.page}>
          <Text>Volutpat commodo sed egestas egestas fringilla phasellus. Facilisi etiam dignissim diam quis enim lobortis scelerisque. Aliquam vestibulum morbi blandit cursus risus at ultrices. Consequat id porta nibh venenatis cras. Sed felis eget velit aliquet. Accumsan lacus vel facilisis volutpat est velit egestas. Erat imperdiet sed euismod nisi. Nisi porta lorem mollis aliquam. In aliquam sem fringilla ut. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Nunc consequat interdum varius sit amet mattis vulputate enim. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Augue ut lectus arcu bibendum. Et netus et malesuada fames. Amet porttitor eget dolor morbi non arcu risus quis. Sed ullamcorper morbi tincidunt ornare massa eget egestas.Sed nisi lacus sed viverra. Cursus sit amet dictum sit amet justo. Sit amet luctus venenatis lectus magna fringilla urna porttitor. Sed odio morbi quis commodo odio aenean sed adipiscing. Amet consectetur adipiscing elit ut aliquam. Lorem sed risus ultricies tristique. Pellentesque eu tincidunt tortor aliquam nulla facilisi. Enim nec dui nunc mattis enim. Massa tincidunt dui ut ornare. Blandit cursus risus at ultrices mi tempus imperdiet. Risus commodo viverra maecenas accumsan lacus. Facilisis gravida neque convallis a cras semper auctor. Donec ultrices tincidunt arcu non. Risus sed vulputate odio ut. A lacus vestibulum sed arcu non odio euismod.</Text>
        </View>
        <View style={styles.page}>
          <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Non odio euismod lacinia at quis risus sed vulputate. Quisque egestas diam in arcu cursus euismod quis viverra. Id semper risus in hendrerit gravida rutrum quisque non. Gravida neque convallis a cras semper auctor neque vitae tempus. Nunc scelerisque viverra mauris in. Tincidunt arcu non sodales neque sodales ut. Eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Urna nec tincidunt praesent semper feugiat nibh. Non enim praesent elementum facilisis leo. Feugiat vivamus at augue eget. Ut diam quam nulla porttitor massa id neque.At consectetur lorem donec massa sapien faucibus et molestie ac. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus. Ut porttitor leo a diam sollicitudin tempor. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Cursus mattis molestie a iaculis at. Tincidunt praesent semper feugiat nibh sed pulvinar. Pretium fusce id velit ut. Cras ornare arcu dui vivamus arcu felis bibendum ut. Est pellentesque elit ullamcorper dignissim.</Text>
        </View>
        <View style={styles.page}>
          <Text>Volutpat commodo sed egestas egestas fringilla phasellus. Facilisi etiam dignissim diam quis enim lobortis scelerisque. Aliquam vestibulum morbi blandit cursus risus at ultrices. Consequat id porta nibh venenatis cras. Sed felis eget velit aliquet. Accumsan lacus vel facilisis volutpat est velit egestas. Erat imperdiet sed euismod nisi. Nisi porta lorem mollis aliquam. In aliquam sem fringilla ut. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Nunc consequat interdum varius sit amet mattis vulputate enim. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Augue ut lectus arcu bibendum. Et netus et malesuada fames. Amet porttitor eget dolor morbi non arcu risus quis. Sed ullamcorper morbi tincidunt ornare massa eget egestas.Sed nisi lacus sed viverra. Cursus sit amet dictum sit amet justo. Sit amet luctus venenatis lectus magna fringilla urna porttitor. Sed odio morbi quis commodo odio aenean sed adipiscing. Amet consectetur adipiscing elit ut aliquam. Lorem sed risus ultricies tristique. Pellentesque eu tincidunt tortor aliquam nulla facilisi. Enim nec dui nunc mattis enim. Massa tincidunt dui ut ornare. Blandit cursus risus at ultrices mi tempus imperdiet. Risus commodo viverra maecenas accumsan lacus. Facilisis gravida neque convallis a cras semper auctor. Donec ultrices tincidunt arcu non. Risus sed vulputate odio ut. A lacus vestibulum sed arcu non odio euismod.</Text>
        </View>
      
      
        <View style={styles.page} >
        <View>
            <Image style={styles.indice} source={require('../assets/images/indice4.png')}></Image>
          </View>
        <View>
            <View style={loadQuestionsAnswers('shadow',3)} >
            <Text style={styles.pergunta} >Harry?</Text>
            </View>
        <View style={loadQuestionsAnswers('shadow',3)}> 
        <RectButton style={styles.button} onPress={() => {answer(3,'1');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={loadQuestionsAnswers('respostaCerta',3)} >Potter</Text>
        </RectButton>
        </View>
        <View style={loadQuestionsAnswers('shadow',3)}>
        <RectButton style={styles.button} onPress={() => {answer(3,'1');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={loadQuestionsAnswers('respostaCerta',3)} >Styles</Text>
        </RectButton>
        </View>
        <View style={loadQuestionsAnswers('shadow',3)}>
        <RectButton style={styles.button} onPress={() => {answer(3,'1');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={loadQuestionsAnswers('respostaCerta',3)}>O Príncipe</Text>
        </RectButton>
        </View>
        <View style={loadQuestionsAnswers('shadow',3)}>
        <RectButton style={styles.button} onPress={() => {answer(3,'1');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={loadQuestionsAnswers('respostaCerta',3)}>de Sousa Costa</Text>
        </RectButton>
        </View>
        </View>
        </View>



        <View style={styles.page}>
          <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Non odio euismod lacinia at quis risus sed vulputate. Quisque egestas diam in arcu cursus euismod quis viverra. Id semper risus in hendrerit gravida rutrum quisque non. Gravida neque convallis a cras semper auctor neque vitae tempus. Nunc scelerisque viverra mauris in. Tincidunt arcu non sodales neque sodales ut. Eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Urna nec tincidunt praesent semper feugiat nibh. Non enim praesent elementum facilisis leo. Feugiat vivamus at augue eget. Ut diam quam nulla porttitor massa id neque.At consectetur lorem donec massa sapien faucibus et molestie ac. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus. Ut porttitor leo a diam sollicitudin tempor. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Cursus mattis molestie a iaculis at. Tincidunt praesent semper feugiat nibh sed pulvinar. Pretium fusce id velit ut. Cras ornare arcu dui vivamus arcu felis bibendum ut. Est pellentesque elit ullamcorper dignissim.</Text>
        </View>
        <View style={styles.page}>
          <Text>Volutpat commodo sed egestas egestas fringilla phasellus. Facilisi etiam dignissim diam quis enim lobortis scelerisque. Aliquam vestibulum morbi blandit cursus risus at ultrices. Consequat id porta nibh venenatis cras. Sed felis eget velit aliquet. Accumsan lacus vel facilisis volutpat est velit egestas. Erat imperdiet sed euismod nisi. Nisi porta lorem mollis aliquam. In aliquam sem fringilla ut. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Nunc consequat interdum varius sit amet mattis vulputate enim. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Augue ut lectus arcu bibendum. Et netus et malesuada fames. Amet porttitor eget dolor morbi non arcu risus quis. Sed ullamcorper morbi tincidunt ornare massa eget egestas.Sed nisi lacus sed viverra. Cursus sit amet dictum sit amet justo. Sit amet luctus venenatis lectus magna fringilla urna porttitor. Sed odio morbi quis commodo odio aenean sed adipiscing. Amet consectetur adipiscing elit ut aliquam. Lorem sed risus ultricies tristique. Pellentesque eu tincidunt tortor aliquam nulla facilisi. Enim nec dui nunc mattis enim. Massa tincidunt dui ut ornare. Blandit cursus risus at ultrices mi tempus imperdiet. Risus commodo viverra maecenas accumsan lacus. Facilisis gravida neque convallis a cras semper auctor. Donec ultrices tincidunt arcu non. Risus sed vulputate odio ut. A lacus vestibulum sed arcu non odio euismod.</Text>
        </View>



        <View style={styles.page}>
        <View>
            <Image style={styles.indice} source={require('../assets/images/indice5.png')}></Image>
          </View>
        <View>
            <View style={loadQuestionsAnswers('shadow',4)} >
            <Text style={styles.pergunta} >Quem ganha participando do Hackaton?</Text>
            </View>
        <View style={loadQuestionsAnswers('shadow',4)}> 
        <RectButton style={styles.button} onPress={() => {answer(4,'1');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={loadQuestionsAnswers('respostaCerta',4)} >Todo mundo</Text>
        </RectButton>
        </View>
        <View style={loadQuestionsAnswers('shadow',4)}>
        <RectButton style={styles.button} onPress={() => {answer(4,'2');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={styles.resposta} >Eu</Text>
        </RectButton>
        </View>
        <View style={loadQuestionsAnswers('shadow',4)}>
        <RectButton style={styles.button} onPress={() => {answer(4,'2');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={styles.resposta}>Meu time</Text>
        </RectButton>
        </View>
        <View style={loadQuestionsAnswers('shadow',4)}>
        <RectButton style={styles.button} onPress={() => {answer(4,'2');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={styles.resposta}>Seu time</Text>
        </RectButton>
        </View>
        </View>
        </View>



        <View style={styles.page}>
          <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Non odio euismod lacinia at quis risus sed vulputate. Quisque egestas diam in arcu cursus euismod quis viverra. Id semper risus in hendrerit gravida rutrum quisque non. Gravida neque convallis a cras semper auctor neque vitae tempus. Nunc scelerisque viverra mauris in. Tincidunt arcu non sodales neque sodales ut. Eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Urna nec tincidunt praesent semper feugiat nibh. Non enim praesent elementum facilisis leo. Feugiat vivamus at augue eget. Ut diam quam nulla porttitor massa id neque.At consectetur lorem donec massa sapien faucibus et molestie ac. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus. Ut porttitor leo a diam sollicitudin tempor. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Cursus mattis molestie a iaculis at. Tincidunt praesent semper feugiat nibh sed pulvinar. Pretium fusce id velit ut. Cras ornare arcu dui vivamus arcu felis bibendum ut. Est pellentesque elit ullamcorper dignissim.</Text>
        </View>
        <View style={styles.page}>
          <Text>Volutpat commodo sed egestas egestas fringilla phasellus. Facilisi etiam dignissim diam quis enim lobortis scelerisque. Aliquam vestibulum morbi blandit cursus risus at ultrices. Consequat id porta nibh venenatis cras. Sed felis eget velit aliquet. Accumsan lacus vel facilisis volutpat est velit egestas. Erat imperdiet sed euismod nisi. Nisi porta lorem mollis aliquam. In aliquam sem fringilla ut. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Nunc consequat interdum varius sit amet mattis vulputate enim. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Augue ut lectus arcu bibendum. Et netus et malesuada fames. Amet porttitor eget dolor morbi non arcu risus quis. Sed ullamcorper morbi tincidunt ornare massa eget egestas.Sed nisi lacus sed viverra. Cursus sit amet dictum sit amet justo. Sit amet luctus venenatis lectus magna fringilla urna porttitor. Sed odio morbi quis commodo odio aenean sed adipiscing. Amet consectetur adipiscing elit ut aliquam. Lorem sed risus ultricies tristique. Pellentesque eu tincidunt tortor aliquam nulla facilisi. Enim nec dui nunc mattis enim. Massa tincidunt dui ut ornare. Blandit cursus risus at ultrices mi tempus imperdiet. Risus commodo viverra maecenas accumsan lacus. Facilisis gravida neque convallis a cras semper auctor. Donec ultrices tincidunt arcu non. Risus sed vulputate odio ut. A lacus vestibulum sed arcu non odio euismod.</Text>
        </View>
        <View style={styles.page}>
          <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Non odio euismod lacinia at quis risus sed vulputate. Quisque egestas diam in arcu cursus euismod quis viverra. Id semper risus in hendrerit gravida rutrum quisque non. Gravida neque convallis a cras semper auctor neque vitae tempus. Nunc scelerisque viverra mauris in. Tincidunt arcu non sodales neque sodales ut. Eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Urna nec tincidunt praesent semper feugiat nibh. Non enim praesent elementum facilisis leo. Feugiat vivamus at augue eget. Ut diam quam nulla porttitor massa id neque.At consectetur lorem donec massa sapien faucibus et molestie ac. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus. Ut porttitor leo a diam sollicitudin tempor. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Cursus mattis molestie a iaculis at. Tincidunt praesent semper feugiat nibh sed pulvinar. Pretium fusce id velit ut. Cras ornare arcu dui vivamus arcu felis bibendum ut. Est pellentesque elit ullamcorper dignissim.</Text>
        </View>
        <View style={styles.page}>
          <Text>Volutpat commodo sed egestas egestas fringilla phasellus. Facilisi etiam dignissim diam quis enim lobortis scelerisque. Aliquam vestibulum morbi blandit cursus risus at ultrices. Consequat id porta nibh venenatis cras. Sed felis eget velit aliquet. Accumsan lacus vel facilisis volutpat est velit egestas. Erat imperdiet sed euismod nisi. Nisi porta lorem mollis aliquam. In aliquam sem fringilla ut. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Nunc consequat interdum varius sit amet mattis vulputate enim. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Augue ut lectus arcu bibendum. Et netus et malesuada fames. Amet porttitor eget dolor morbi non arcu risus quis. Sed ullamcorper morbi tincidunt ornare massa eget egestas.Sed nisi lacus sed viverra. Cursus sit amet dictum sit amet justo. Sit amet luctus venenatis lectus magna fringilla urna porttitor. Sed odio morbi quis commodo odio aenean sed adipiscing. Amet consectetur adipiscing elit ut aliquam. Lorem sed risus ultricies tristique. Pellentesque eu tincidunt tortor aliquam nulla facilisi. Enim nec dui nunc mattis enim. Massa tincidunt dui ut ornare. Blandit cursus risus at ultrices mi tempus imperdiet. Risus commodo viverra maecenas accumsan lacus. Facilisis gravida neque convallis a cras semper auctor. Donec ultrices tincidunt arcu non. Risus sed vulputate odio ut. A lacus vestibulum sed arcu non odio euismod.</Text>
        </View>
      


        <View style={styles.page}>
        <View>
            <Image style={styles.indice} source={require('../assets/images/indice6.png')}></Image>
          </View>
        <View>
            <View style={loadQuestionsAnswers('shadow',5)} >
            <Text style={styles.pergunta} >Com quantos anos Harry Potter fez seu trigésimo aniversário?</Text>
            </View>
        <View style={loadQuestionsAnswers('shadow',5)}> 
        <RectButton style={styles.button} onPress={() => {answer(5,'2');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={styles.resposta} >50</Text>
        </RectButton>
        </View>
        <View style={loadQuestionsAnswers('shadow',5)}>
        <RectButton style={styles.button} onPress={() => {answer(5,'1');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={loadQuestionsAnswers('respostaCerta',5)} >30</Text>
        </RectButton>
        </View>
        <View style={loadQuestionsAnswers('shadow',5)}>
        <RectButton style={styles.button} onPress={() => {answer(5,'2');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={styles.resposta}>0</Text>
        </RectButton>
        </View>
        <View style={loadQuestionsAnswers('shadow',5)}>
        <RectButton style={styles.button} onPress={() => {answer(5,'2');let _itemState = itemState.filter(
                (_item, _index) => _index == _index
            );
            setitemState(_itemState);}}>
            <Text style={styles.resposta}>20</Text>
        </RectButton>
        </View>
        </View>
        </View>



      
      </ViewPager>
      <View style={styles.progressbarview}>   
      <ProgressBar style={styles.progressbar} progress={pergCalc()} color='#A87DD1' />
      </View> 
  </View>
  );
}



var styles = StyleSheet.create({
  viewPager: {
      height: '85%',
      width: '80%',
      alignSelf: 'center',
      top: '3%',
      flex: 1,
      position: 'absolute',
      
  },

  page: {
    alignItems: 'center',
    textAlign: 'justify',
  },

  pagePergunta: {
  textAlign: 'justify',
  shadowOffset: {
    width: 0,
    height: 0
  },
  shadowRadius: 15,
  shadowOpacity: 0.51,
  },

  text: {
  fontSize: 16
  },

  perguntaBox: {
  width: 330,
  height: 30,
  },

  pergunta: {
  color: 'white',
  textAlignVertical: 'center',
  fontFamily: "Cabin_600SemiBold",
  fontSize: 24,
  textAlign: 'left',
  marginHorizontal: 20,
  marginVertical: 10,
  shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 3,
    shadowOpacity: 0.4

  },
  button: {
  width: 300,
  height: 35,
  left: 0,
  color: '#A87DD1',
  backgroundColor: 'rgba(0,0,0,0)',
  borderRadius: 10,
  marginBottom: 5,

  },
  shadow: {
  width: 300,
  marginVertical: 30,
  marginHorizontal: 10,
  backgroundColor: '#A87DD1',
  borderRadius: 10,
  shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 2,
    shadowOpacity: 0.2
  },

  shadow1: {
  width: 300,
  marginVertical: 30,
  marginHorizontal: 10,
  backgroundColor: 'green',
  borderRadius: 10,
  shadowOffset: {
      width: 0,
      height: 0
      },
      shadowRadius: 2,
      shadowOpacity: 0.5
  },

  resposta:{
    fontFamily: "Cabin_600SemiBold",
    top: 8,
    alignContent:'center',
    alignItems: 'center',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    shadowOffset: {
        width: 0,
        height: 0
        },
        shadowRadius: 1,
        shadowOpacity: 1
  },
  respostaCerta:{
    fontFamily: "Cabin_600SemiBold",
    top: 8,
    alignContent:'center',
    alignItems: 'center',
    fontSize: 20,
    color: '#05B15F',
    textAlign: 'center',
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 0
        },
        shadowRadius: 10,
        shadowOpacity: 0.3
},
    shadow2: {
    width: 300,
    marginVertical: 30,
    marginHorizontal: 20,
    backgroundColor: '#D64949',
    borderRadius: 10,
    shadowOffset: {
        width: 0,
        height: 0
        },
        shadowRadius: 2,
        shadowOpacity: 0.5
    },
    indice: {
        height: 60,
        width: 60,
        shadowOffset: {
            width: 0,
            height: 1
            },
            shadowRadius: 0.4,
            shadowOpacity: 0.5
        },
  progressbar: {
    alignSelf: 'center',
    width: 300,
    height: 20,
    borderRadius: 30,
    backgroundColor: '#f7f7f7',
    borderWidth: 2,
    borderColor: '#A87DD1',
  },

  progressbarview: {
    alignSelf: 'center',
    width: 250,
    height: 20,
    top: '90%',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 1,
    shadowOpacity: 0.5
  },
  sun: {
    alignSelf: 'center',
  },
  treasure: {
    right: 30,
    top: -20
  },
  buttonBox: {
    height: '100%',
    width: '100%',
    backgroundColor: '#A87DD1'
  },
  winText: {
    width: '80%',
    top: 250,
    color: 'white',
    alignSelf: 'center',
    textAlignVertical: 'center',
    fontFamily: "Cabin_600SemiBold",
    fontSize: 24,
    textAlign: 'center',shadowColor: 'yellow',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 1,
    shadowOpacity: 0.5
  },
  shadowCard: {
    shadowColor: 'yellow',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 10,
    shadowOpacity: 5
  },
  cards: {
    top: 200,
    height: 180,
    width: 180,
    alignSelf: 'center',
    resizeMode: 'center',
    shadowColor: 'yellow',
  },

  }); 
