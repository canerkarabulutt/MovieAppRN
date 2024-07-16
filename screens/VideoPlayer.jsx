import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme'

export default function VideoPlayerScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { videoUrl } = route.params;

  return (
    <View style={vpStyles.container}>
      <View style={vpStyles.header}>
      <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.background} className="rounded-xl p-1">
            <ChevronLeftIcon style={vpStyles.chevronStyle} />
         </TouchableOpacity>
      </View>
      <WebView
        source={{ uri: videoUrl }}
        style={styles.webview}
        allowsFullscreenVideo
      />
    </View>
  );
}

const vpStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'relative',
    top: 16,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevronStyle: {
    size: 28,
    strokeWidth: 2.5,
    color: 'white',
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 5,
  },
  webview: {
    flex: 1,
    marginTop: 160,
  },
});

