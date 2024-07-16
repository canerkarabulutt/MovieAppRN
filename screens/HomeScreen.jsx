import { View, Text, Platform, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { fetchPopularMovies, fetchTrendingMovies,fetchTopRatedMovies,fetchUpcomingMovies } from '../api/tmdb';


const ios = Platform.OS == 'ios';

export default function HomeScreen() {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [popular, setPopular] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation();

    useEffect(() => {
      getTrendingMovies()
      getUpcomingMovies()
      getTopRatedMovies()
      getPopularMovies()
    }, [])

    const getTrendingMovies = async () => {
      const data = await fetchTrendingMovies();
      //console.log('got trending movies:', data);
      if (data&& data.results) {
        setTrending(data.results)
        setLoading(false)
      }
    }
    const getUpcomingMovies = async () => {
      const data = await fetchUpcomingMovies();
     // console.log('got upcoming movies:', data);
      if (data&& data.results) {
        setUpcoming(data.results)
        setLoading(false)
      }
    }

    const getPopularMovies = async () => {
      const data = await fetchPopularMovies();
      if (data&& data.results) {
        setPopular(data.results)
        setLoading(false)
      }
    }
    const getTopRatedMovies = async () => {
      const data = await fetchTopRatedMovies();
     // console.log('got top rated movies:', data);
      if (data&& data.results) {
        setTopRated(data.results)
        setLoading(false)
      }
    }

  return (
    <View style= {[homeScreenStyles.container, { backgroundColor: isDarkMode ? 'white' : 'gray'}]} >
      {/* search bar and logo */}
      <SafeAreaView style= {homeScreenStyles.safeAreaContainer}>
        <StatusBar style="dark" />
        <View style={homeScreenStyles.headerTitle}>
            <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
            <Text style={homeScreenStyles.headerText}>
                <Text style={styles.text}>M</Text>ovies
            </Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
                <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
            </TouchableOpacity>
        </View>
      </SafeAreaView>
      {
        loading? (
          <Loading />
        ) : (
          <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}
        >
          {/* Trending movies carousel*/}
          {trending.length>0 && <TrendingMovies data={trending} />}
          {/* Upcoming movies row*/}
          <MovieList title="Upcoming" data={upcoming} />
          {/* Popular movies row*/}
          <MovieList title="Popular" data={popular} />
          {/* Top Rated movies row*/}
          <MovieList title="Top Rated" data={topRated} />
        </ScrollView> 
        )
      }

    </View>
  )
}

const homeScreenStyles = StyleSheet.create ({
    container: {
        flex: 1,
    },
    safeAreaContainer: {
        marginBottom: Platform.OS == 'ios' ? 2 : 3,
    },
    headerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 4,
    },
    headerText: {
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold', 
    }
})