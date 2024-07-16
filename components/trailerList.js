import React from 'react';
import { View, Text, ScrollView, Image, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function Trailers({ videos }) {
  const navigation = useNavigation();

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trailers</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {videos.map((video, index) => (
          <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('VideoPlayer', { videoUrl: `https://www.youtube.com/watch?v=${video.key}` })}>
            <View style={styles.videoContainer}>
              <Image
                source={{ uri: `https://img.youtube.com/vi/${video.key}/hqdefault.jpg` }}
                style={styles.thumbnail}
              />
              <Text style={styles.videoTitle}>
                {video.name.length > 10 ? video.name.slice(0, 35) + "..." : video.name}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollView: {
    flexDirection: 'row',
  },
  videoContainer: {
    marginRight: 16,
  },
  thumbnail: {
    width: width * 0.8,
    height: width * 0.45,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'darkgray',
  },
  videoTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
});
