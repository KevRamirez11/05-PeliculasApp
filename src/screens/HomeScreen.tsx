
import React from 'react'
import { ActivityIndicator, Dimensions, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Carousel from 'react-native-snap-carousel';
import ImageColors from 'react-native-image-colors'

import { useMovies } from '../hooks/useMovies'
import { MoviePoster } from '../components/MoviePoster'

import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getImageColors } from '../helpers/getColores';

const {width: windowWidth} = Dimensions.get('window')

export const HomeScreen = () => {

  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
  const { top } = useSafeAreaInsets();

  const getPosterColors = async( index: number ) => {
      const movie = nowPlaying[index];
      const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

      const [primary, secondary ] = await getImageColors( uri );
  }


  if ( isLoading )
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator color='blue' size={40} />
      </View>
    )

  return (
      <GradientBackground>
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
                    onSnapToItem={ index => getPosterColors( index ) }
                  />
                </View>

                {/* Peliculas populares */}
                <HorizontalSlider title='Peliculas en cartelera' movies={ nowPlaying }/>
                <HorizontalSlider title='Populares' movies={ popular }/>
                <HorizontalSlider title='Mejor calificadas' movies={ topRated }/>
                <HorizontalSlider title='Proximamente' movies={ upcoming }/>
            </View>
        </ScrollView> 
      </GradientBackground>
  )
}