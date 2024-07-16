import {View,Text,Dimensions, Platform, ScrollView, TouchableOpacity, Image, StyleSheet} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { fetchPersonDetails, image342, fallbackPersonPoster, fetchPersonMovies } from "../api/tmdb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";

const PersonScreen = () => {
  const {params: item} = useRoute()
  const navigation = useNavigation()
  const [isFavorite, toggleFavourite] = useState(false)
  const [personDetails, setPersonDetails] = useState({})
  const [personMovies, setPersonMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getPersonDetails(item.id)
    getPersonMovies(item.id)
  }, [item])

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id)
    if(data) setPersonDetails(data)
    setLoading(false)
  }
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id)
    if(data && data.cast) setPersonMovies(data.cast)
    setLoading(false)
  }

  return (
    <ScrollView style={personScreenStyles.scrollView}>
      {/* back button and person poster */}
      <SafeAreaView style={personScreenStyles.safeAreaContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className="rounded-xl p-1"
        >
          <ChevronLeftIcon style={personScreenStyles.chevronStyle} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavourite(!isFavorite)}>
          <HeartIcon size="35" color={isFavorite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>
      {/* person details view */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View style={personScreenStyles.pictureContainer}>
            <View style={personScreenStyles.pictureView}>
              <Image
                //source={require("../assets/images/castImage.png")}
                source={{uri: image342(personDetails?.profile_path) || fallbackPersonPoster}}
                style={{ width: width * 0.76, height: height * 0.45 }}
              />
            </View>
            <View className="mt-6">
                <Text style={personScreenStyles.textWhite}>
                    {
                        personDetails?.name
                    }
                </Text>
              <Text style={personScreenStyles.textNeutral}>
                {
                    personDetails?.place_of_birth
                }
              </Text>
            </View>
          </View>
          <View style={personScreenStyles.infoView}>
            <View style={personScreenStyles.infoBorderedView}>
                <Text style={personScreenStyles.infoTitle}>
                    {
                        personDetails?.gender==1? 'Female':'Male'
                    }
                </Text>
                <Text style={personScreenStyles.infoSubtitle}>
                     Male
                </Text>
            </View>
            <View style={personScreenStyles.infoBorderedView}>
                <Text style={personScreenStyles.infoTitle}>
                    Birthday
                </Text>
                <Text style={personScreenStyles.infoSubtitle}>
                    {
                        personDetails?.birthday
                    }
                </Text>
            </View>
            <View style={personScreenStyles.infoBorderedView}>
              <Text style={personScreenStyles.infoTitle}>Known for</Text>
                <Text style={personScreenStyles.infoSubtitle}>
                    {
                        personDetails?.known_for_department
                    }
                </Text>
            </View>
            <View className="px-3 items-center">
              <Text style={personScreenStyles.infoTitle}>Popularity</Text>
                 <Text style={personScreenStyles.infoSubtitle}>
                    {
                        personDetails?.popularity?.toFixed(2)
                    } %
                </Text>
            </View>
          </View>
          <View style={personScreenStyles.biographyView}>
            <Text style={personScreenStyles.biography}>Biography</Text>
            <Text style={personScreenStyles.biographyText}>
                    {
                        personDetails?.biography || 'N/A'
                    }
            </Text>
          </View>
          {/* person known for movies */}
          <MovieList data={personMovies} title="Movies" hideSeeAll={true}/>
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;
const personScreenStyles = StyleSheet.create ({
  scrollView: {
    flex: 1,
    backgroundColor: "black",
  },
  safeAreaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 4,
  },
  chevronStyle: {
    size: 28,
    strokeWidth: 2.5,
    color: "white",
  },
  pictureContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "gray",
    shadowRadius: 45,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
  },
  pictureView: {
    alignItems: "center",
    borderRadius: 144,
    overflow: "hidden",
    height: 288,
    width: 288,
    borderWidth: 2,
    borderColor: "#A0AEC0",
  },
  image: {
    width: width * 0.76,
    height: height * 0.45,
  },
  textWhite: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  textNeutral: {
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoView: {
    marginRight: 8,
    marginHorizontal: 0,
    padding: 16,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "gray",
    borderRadius: 40,
    borderColor: "#a1a1a1",
    borderWidth: 1,
  },
  infoBorderedView: {
    borderRightWidth: 2.5,
    borderColor: "#CBD5E0",
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  infoTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },
  infoSubtitle: {
    color: "#D1D5DB",
    fontSize: 14,
    fontWeight: "bold",
  },
  biographyView: {
    marginVertical: 24,
    marginHorizontal: 16,
  },
  biography: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
    font: "bold",
    textAlign: "left",
  },
  biographyText: {
    color: "gray",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "left",
    marginVertical: 8,
  },
});
