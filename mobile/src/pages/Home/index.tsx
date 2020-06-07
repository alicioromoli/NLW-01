import React, { useState, useEffect }from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import { View, ImageBackground, Image, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios'
import api from '../../services/api'

interface UFResponse {
  sigla: string
}
interface CityResponse {
   nome: string
}


const Home = () => {
  const [uf, setUf] = useState('')
  const [city, setCity] = useState('')
  const navigation = useNavigation()
  const [ ufs, setUfs] = useState<string[]>([])
  const [cities, setCites] = useState<string[]>([])
  const [selectedUf, setSelectedUf] = useState('0')
  const [ selectedCity, setSelectedCity] = useState('0')

  useEffect(() => {
    axios.get<UFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res => {
        const UfInitials = res.data.map(uf => uf.sigla)
        setUfs(UfInitials)
    })
}, [])

useEffect(()=>{
  if(selectedUf === null){
      return
  }

  axios.get<CityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(res => {
      const cityNames = res.data.map(city => city.nome)
      setCites(cityNames)
  })

}, [selectedUf])

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf: selectedUf,
      city: selectedCity
    })
  }
  const placeholderUf = {
    label: 'Select a UF',
    value: null,
  };
  const placeholderCity = {
    label: 'Select a CITY',
    value: null,
  };
    return (
    <KeyboardAvoidingView 
      style={{ flex: 1}} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground
          source={require('../../assets/home-background.png') } 
          style={styles.container}
          imageStyle={{ width: 274, height: 368 }}
      >
          <View style={styles.main}>
              <Image source={require('../../assets/logo.png')} />
              <View>
                <Text style={styles.title}>Marketplace for waste collection</Text>
                <Text style={styles.description}>We help people to find the best collection point in a effection way</Text>
              </View>
          </View>

          <View style={styles.footer}>
          {/* <TextInput 
            style={styles.input}
            placeholder="Type your UF"
            value={uf}
            maxLength={2}
            autoCapitalize='characters'
            autoCorrect={false}
            onChangeText={setUf}
          /> */}
          <RNPickerSelect 
          style={pickerSelectStyles}
          placeholder={placeholderUf}
          onValueChange={(value) => setSelectedUf(value)}
          
          items={ufs.map(uf =>(
            {
              label: uf,
              value: uf
            }
          ))}
          />
          <RNPickerSelect 
          style={pickerSelectStyles}
          placeholder={placeholderCity}
          onValueChange={(value) => setSelectedCity(value)}
          
          items={cities.map(city =>(
            {
              label: city,
              value: city
            }
          ))}
          />
          {/* <TextInput 
            style={styles.input}
            placeholder="Type your City"
            value={city}
            autoCorrect={false}
            onChangeText={setCity}
          /> */}
          

          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                  <View style={styles.buttonIcon}>
                      <Text>
                          <Icon name="arrow-right" color="#FFF" size={24}/>
                      </Text>
                  </View>
                  <Text style={styles.buttonText}>
                      Enter
                  </Text>
              </RectButton>
          </View>
      </ImageBackground>
    </KeyboardAvoidingView>
    )
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

export default Home