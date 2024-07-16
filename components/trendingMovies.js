import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { image500 } from '../api/tmdb';

var {width, height} = Dimensions.get('window');
export default function TrendingMovies({ data }) {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Movie', item);
    }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Trending</Text>
      <Carousel
        data={data}
        renderItem={({item}) => <MovieCard item={item} handleClick={handleClick} />}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width*0.6}
        slideStyle={{display: 'flex', alignItems: 'center'}}
        />
    </View>
  )
}

const MovieCard = ({ item, handleClick }) => {
 // console.log('item.poster_path', item.poster_path)
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
       // source={require('../assets/images/moviePoster1.png')}
        source={{uri: image500(item.poster_path)}}
        style={styles.image}
      />
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 12,
  },
  image: {
    width: width * 0.6,
    height: height * 0.4,
    borderRadius: 20,
    borderWidth: 1,
    borderBlockColor: 'darkgray',
  },
})
