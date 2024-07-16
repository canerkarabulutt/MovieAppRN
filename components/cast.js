import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { fallbackMoviePoster, fallbackPersonPoster, image185 } from '../api/tmdb'
import { StyleSheet } from 'react-native'

export default function Cast({cast, navigation}) {
    let personName= "Keanu Reevs"
    let characterName= "John Wick"
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Cast</Text>
      <ScrollView
        horizontal
        style={styles.scrollContainer}
      >
        {
            cast && cast.map((person, index)=> {
                return (
                    <TouchableOpacity
                        key={index}
                        style={styles.touchable}
                        onPress={()=> navigation.navigate('Person', person)}
                    >
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.imageView}
                                //source={require('../assets/images/castImage.png')}
                                source={{uri: image185(person?.profile_path) || fallbackPersonPoster}}
                            />
                        </View>

                        <Text style={styles.characterText}>
                            {
                                person?.character.length>10? person.character.slice(0,12)+"...": person.character
                            }
                        </Text>
                        <Text style={styles.nameText}>
                            {
                                person.original_name.length>14? person.original_name.slice(0,14)+"...": person.original_name
                            }
                        </Text>
                        
                    </TouchableOpacity>
                )
            })
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
    },
    headerText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 16,
        marginBottom: 16,
    },
    scrollContainer: {
        paddingHorizontal: 12,
    },
    touchable: {
        marginRight: 12,
        alignItems: 'center',
    },
    imageContainer: {
        overflow: 'hidden',
        borderRadius: 43,
        height: 86,
        width: 82,
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
    },
    imageView: {
        height: 104,
        width: 80,
    },
    characterText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'semibold',
        marginTop: 8,
    },
    nameText: {
        color: 'darkgray',
        fontSize: 14,
        marginTop: 2,
    }
})