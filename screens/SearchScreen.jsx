import {View,Text,Dimensions,TextInput,TouchableOpacity,ScrollView, Image, StyleSheet} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { debounce } from "lodash";
import { searchMovies } from "../api/tmdb";
import { image185 } from "../api/tmdb";
import { fallbackMoviePoster } from "../api/tmdb";
import { styles } from "../theme";

const { width, height } = Dimensions.get("window");

const SearchScreen = () => {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = value=>{
    if(value && value.length>2) {
        setLoading(true)
        searchMovies({
            query: value,
            include_data: 'false',
            language: 'en-US',
            page: '1'
        }).then(data=>{
            setLoading(false)
            if(data && data.results) setResults(data.results)
        })
    } else {
        setLoading(false)
        setResults([])
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

  const movieName = "Joker";
  return (
    <SafeAreaView style={searchScreenStyles.safeAreaView}>
      <View style={searchScreenStyles.searchContainer}>
        <TextInput
            onChangeText={handleTextDebounce}
          style={searchScreenStyles.textInput}
          placeholder="Search..."
          placeholderTextColor={"lightgray"}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={searchScreenStyles.touchable}
        >
          <XMarkIcon size="20" color="white" />
        </TouchableOpacity>
      </View>
      {/* search results */}
      {
        loading? (
            <Loading />
        ) : (
            results.length > 0 ? (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 15 }}
                  style={searchScreenStyles.scrollView}
                >
                  <Text style={searchScreenStyles.textWhite}>
                    Results ({results.length})
                  </Text>
                  <View style={searchScreenStyles.viewContainer}>
                    {results.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => navigation.push("Movie", item)}
                          className="mb-1"
                        >
                          <View className="space-y-2 mb-2">
                            <Image
                             // source={require("../assets/images/movie2.png")}
                             source={{uri: image185(item?.poster_path) || fallbackMoviePoster}}
                              style={searchScreenStyles.imageView}
                            />
                            <Text style={searchScreenStyles.textView}>
                              {movieName.length > 14
                                ? movieName.slice(0, 14) + "..."
                                : movieName}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </ScrollView>
              ) : (
                <View style={searchScreenStyles.defaultImageContainer}>
                  <Image
                    source={require("../assets/images/searchIcon.png")}
                    style={searchScreenStyles.defaultImage}
                  />
                </View>
              )
            
        )
      }

    </SafeAreaView>
  )
}

export default SearchScreen;

const searchScreenStyles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "black",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 40,
    marginHorizontal: 16,
  },
  textInput: {
    color: "white",
    fontSize: 18,
    fontWeight: "semibold",
    flex: 1,
    paddingLeft: 16,
    letterSpacing: 1.5,
  },
  touchable: {
    borderRadius: 50,
    padding: 12,
    margin: 4,
    backgroundColor: "gray",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "black",
    marginVertical: 4,
  },
  viewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 4,
  },
  imageView: {
    width: width * 0.45,
    height: height * 0.3,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "darkgray",
    resizeMode: "repeat",
  },
  textWhite: {
    color: "white",
    fontSize: 16,
    fontWeight: "semibold",
    textAlign: "center",
    marginLeft: 6,
    marginBottom: 8,
  },
  textView: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 6,
    marginBottom: 4,
  },
  defaultImageContainer: {
    flex: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  defaultImage: {
    width: width,
    height: height,
    resizeMode: 'cover',}
});
