
import React from 'react'
import { ActivityIndicator, Dimensions, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Carousel from 'react-native-snap-carousel';

import { useMovies } from '../hooks/useMovies'
import { MoviePoster } from '../components/MoviePoster'
import { FlatList } from 'react-native';
import { HorizontalSlider } from '../components/HorizontalSlider';

const {width: windowWidth} = Dimensions.get('window')

export const HomeScreen = () => {

  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();

  const { top } = useSafeAreaInsets();


  if ( isLoading )
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator color='blue' size={40} />
      </View>
    )

  return (
      <ScrollView>
      <View style={{marginTop: top + 20}}>
          {/* Carosel Principal */}
          <View style={{height:440}}>
            <Carousel 
              data={ nowPlaying }
              renderItem={ ( { item }: any) => <MoviePoster movie={ item }/> }
              sliderWidth={windowWidth}
              itemWidth={300}
              inactiveSlideOpacity={0.9}
            />
          </View>

          {/* Peliculas populares */}
          <HorizontalSlider title='Peliculas en cartelera' movies={ nowPlaying }/>
          <HorizontalSlider title='Populares' movies={ popular }/>
          <HorizontalSlider title='Mejor calificadas' movies={ topRated }/>
          <HorizontalSlider title='Proximamente' movies={ upcoming }/>
          


      </View>
    </ScrollView>
    
  )
}