import React from 'react'
import {StackScreenProps} from '@react-navigation/stack'
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Movie } from '../interfaces/movieInterface'
import { RootStackParams } from '../navigation/Navigation'
import { useMovieDetails } from '../hooks/useMovieDetails'
import { MovieDetails } from '../components/MovieDetails';

const screenHeight = Dimensions.get('window').height;

interface Props extends StackScreenProps<RootStackParams,'DetailScreen'> {};

export const DetailScreen = ( { route }: Props ) => {

  const movie = route.params as Movie;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  const {isLoading, movieFull, cast} = useMovieDetails( movie.id );

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image
              source={{uri}}
              style={styles.posterImage}
          />
        </View>
      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}> {movie.original_title} </Text>
        <Text style={styles.title}> {movie.title} </Text>
      </View>


        {
          isLoading
          ? <ActivityIndicator size={30} color="grey" style={{ marginTop: 20 }}/>
          : <MovieDetails movieFull={ movieFull! } cast={ cast } />
        }

    </ScrollView>

  )
}

const styles = StyleSheet.create({
  imageContainer:{
    backgroundColor: 'red',
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10
        },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9,

    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25

  },
  imageBorder:{
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
  },
  posterImage: {
    flex: 1
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20
  },
  subTitle: {
    fontSize: 16,
    opacity: 0.8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})