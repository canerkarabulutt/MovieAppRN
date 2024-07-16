import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185 } from '../api/tmdb';

var {width, height} = Dimensions.get('window');

export default function MovieList({title, data, hideSeeAll}) {
    let movieName = "Joker"
    const navigation = useNavigation();
  //  console.info('********data', data)
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{title}</Text>
        {
                !hideSeeAll && (
                    <TouchableOpacity>
                    <Text style={styles.text} className="text-lg font-bold">See All
                    </Text>
                </TouchableOpacity>
                )
        }
      </View>
      <ScrollView
        horizontal
        style={styles.scrollView}
        >
            {
                data.map((item, index) => {
                    return (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={()=> navigation.push('Movie', item)}
                        >
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{uri: image185(item.poster_path) || fallbackMoviePoster}}
                                     //source={require('../assets/images/movie2.png')}
                                     style={styles.imageView}
                                />
                                <Text style={styles.text}>
                                     {
                                     item.title.length>14? item.title.slice(0,14)+'...': item.title
                                     }
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
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
        marginBottom: 8,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 16,
        marginBottom: 16,
    },
    scrollView: {
        paddingHorizontal: 15,
        showsHorizontalScrollIndicator: false,
    },
    imageContainer: {
        marginRight: 16,
        marginVertical: 2,
    },
    imageView: {
        width: width*0.33,
        height: height*0.22,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'darkgray',
        resizeMode: 'repeat',
    },
    text: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 8,
    }
})