import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fallbackMoviePoster, fetchMovieDetails,fetchMovieCredits, fetchSimilarMovies, image500, fetchMovieVideos } from '../api/tmdb'
import Cast from '../components/cast'
import Loading from '../components/loading'
import { styles, theme } from '../theme'
import MovieList from '../components/movieList'
import TrailerList from '../components/trailerList'


var {width, height} = Dimensions.get('window')
const ios = Platform.OS == 'ios'
const topMargin = ios? '' : 'mt-3'


export default function MovieScreen() {
  let movieName = "Joker"
  const {params: item} = useRoute();
  const navigation = useNavigation();
  const [isFavorite, toggleFavourite] = useState(false);
  const [movieDetails, setMovieDetails] = useState({})
  const [cast, setCast] = useState([])
  const [videos, setVideos] = useState([])
  const [similarMovies, setSimilarMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    //call the movie details api
   // console.info('itemid:', item.id)
    setLoading(true)
    getMovieDetails(item.id)
    getMovieCredits(item.id)
    getSimilarMovies(item.id)
    getMovieVideos(item.id)
  }, [item])

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id)
   // console.info('got movie details:', data)
    if(data) setMovieDetails(data)
    setLoading(false)
  }
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id)
    console.log('got movie credits:', data)
    if(data&& data.cast) setCast(data.cast)
    setLoading(false)
  }
  const getMovieVideos = async (id) => {
    const data = await fetchMovieVideos(id)
    if (data && data.results) setVideos(data.results)
    setLoading(false)
  }

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id)
    if(data&& data.results) setSimilarMovies(data.results)
    setLoading(false)
  }

  return (
  <ScrollView
    style= {movieScreenStyles.scrollView}
    >
      {/* back button and movie poster */}
      <View style= {movieScreenStyles.fullContainer}>
        <SafeAreaView style= {movieScreenStyles.safeAreaContainer}>
          <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.background} className="rounded-xl p-1">
            <ChevronLeftIcon style={movieScreenStyles.chevronStyle} />
         </TouchableOpacity>
         <TouchableOpacity onPress={()=> toggleFavourite(!isFavorite)}>
            <HeartIcon size="35" color={isFavorite? theme.background : "white"} />
         </TouchableOpacity>
        </SafeAreaView>
        {
          loading? (
            <Loading />
          ) : (
            <View style={movieScreenStyles.imageContainer}>
            <Image 
              // source={require('../assets/images/movie2.png')} 
              source={{uri: image500(movieDetails.poster_path) || fallbackMoviePoster}}
               style={movieScreenStyles.image}
            />
            <Image
               source={{uri: image500(movieDetails.poster_path) || fallbackMoviePoster}}
               style={movieScreenStyles.trailer}
            />
            <TouchableOpacity>
            </TouchableOpacity>
            <LinearGradient 
                colors={['transparent', 'rgba(23,23,23,0.1)', 'rgba(23,23,23,0.8)']}
                style={movieScreenStyles.linearGradient}
            />
          </View>
          )
        }
      </View>
      {/* movie details view */}
      <View style={movieScreenStyles.movieDetails}>
          <Text style={movieScreenStyles.textWhite}>
            {
              movieDetails?.title
            }
          </Text>
          {/* status, release date, runtime */}
          {
            movieDetails.id? (
              <Text style={movieScreenStyles.textNeutral}>
              {movieDetails.status} - {movieDetails?.release_date?.split('-')[0]} - {movieDetails?.runtime} mins
          </Text>
            ) : null
          }
          {/* genres */}
          <View style= {movieScreenStyles.genres}>
          {
            movieDetails.genres?.map((genre, index)=> {
              let showDot = index+1 != movieDetails.genres.length
              return (
                <Text key={index} style={movieScreenStyles.textNeutral}>
                  {genre?.name} {showDot? '• ' : null}
              </Text>
              )
            }) 
          }
          </View>
          {/* description */}
          <Text style={movieScreenStyles.description}>
            {
              movieDetails?.overview
            }
          </Text>
      </View>
      {/* cast */}
      {<Cast navigation={navigation} cast={cast}></Cast>}
      {/* similar movies */}
      {<MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies}></MovieList>}
      <TrailerList videos={videos} />
  </ScrollView>
  )
}
const movieScreenStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'black',
    paddingBottom: 20,
  },
  fullContainer: {
    width: '100%',
  },
  safeAreaContainer: {
    marginBottom: ios? 2 : 3,
    position: 'absolute',
    zIndex: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  chevronStyle: {
    size: 28,
    strokeWidth: 2.5,
    color: 'white',
    padding: 8,
  },
  imageContainer: {
    width: '100%',
    height: height*0.4,
    position: 'relative',
  },
  trailer: {
    width: width,
    height: height*0.4,
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: 1,
  },
  image: {
    width: width*0.3,
    height: height*0.2,
    resizeMode: 'cover',
    position: 'absolute',
    bottom: 4,
    left: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'darkgray',
    zIndex: 2,
  },
    movieDetails: {
    marginTop:  (height*0.5)-(height*0.5),
    flexDirection: 'column',
    padding: 2,
  },
  textWhite: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  textNeutral: {
    color: '#A0AEC0',
    fontWeight: '800',
    fontSize: 16,
    textAlign: 'center',
  },
  linearGradient: {
    width: '100%',
    height: height*0.4,
    position: 'absolute',
    bottom: 0,
  },
  genres: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 4,
    marginVertical: 2,
    flexWrap: 'wrap',
  },
  description: {
    color: '#a1a1a1',
    fontWeight: '900',
    fontSize: 16,
    textAlign: 'left',
    marginVertical: 16,
  }
})