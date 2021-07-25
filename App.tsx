import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { Camera } from 'expo-camera';
import Permissions from './Permissions';

export default function App() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [lastPhotoURI, setLastPhotoURI] = useState<any>(null);
  const cameraRef = useRef<Camera | null>(null);

  if (lastPhotoURI !== null) {
    return (
      <ImageBackground
        source={{ uri: lastPhotoURI }}
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <TouchableOpacity
          style={{
            flex: 0.2,
            alignSelf: 'flex-end',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#666',
            marginBottom: 40,
            marginLeft: 20
          }}
          onPress={() => {
            setLastPhotoURI(null);
          }}
        >
          <Text style={{ fontSize: 30, padding: 10, color: 'white' }}>❌</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  return (
    <Permissions>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.2,
              alignSelf: 'flex-end',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#666',
              marginBottom: 40,
              marginLeft: 20
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 30, padding: 10, color: 'white' }}>♻</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0.2,
              alignSelf: 'flex-end',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#666',
              marginBottom: 40,
              marginLeft: 20
            }}
            onPress={async () => {
              if (cameraRef.current) {
                let photo = await cameraRef.current.takePictureAsync();
                if (photo.uri) {
                  setLastPhotoURI(photo.uri);
                }
              }
            }}
          >
            <Text style={{ fontSize: 30, padding: 10, color: 'white' }}>
              📸
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </Permissions>
  );
}