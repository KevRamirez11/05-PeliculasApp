import React from 'react'
import { Text, View } from 'react-native';
import currencyFormatter from 'currency-formatter';
import { MovieFull } from '../interfaces/movieInterface';
import { Cast } from '../interfaces/creditsInterface';
import Icon from 'react-native-vector-icons/Ionicons';
import { CastItem } from './CastItem';
import { FlatList } from 'react-native-gesture-handler';

interface Props {
    movieFull: MovieFull;
    cast: Cast[];
}

export const MovieDetails = ({ movieFull, cast }: Props) => {
  return (
    <>
        {/* Detalles */}
        <View style={{ marginHorizontal: 20 }}>
            
            {/* Encabezado */}
            <View style={{ flexDirection: 'row' }}>
                <Icon name="star-outline"
                        color='grey'
                        size={16}

                />
                <Text> { movieFull.vote_average }</Text>
                <Text style={{ marginLeft: 5 }}>
                    - {movieFull.genres.map( g => g.name).join(', ')}
                </Text>
            </View>

            {/* Historia de la pelicula */}
            <Text style={{ fontSize: 20, marginTop: 29, fontWeight: 'bold' }}>
                Historia
            </Text >
            <Text style={{fontSize: 16}}>
                { movieFull.overview }
            </Text>

            {/* Presupuesto */}
            <Text style={{ fontSize: 20, marginTop: 29, fontWeight: 'bold' }}>
                Presupuesto
            </Text>
            <Text style={{fontSize: 18}}>
                { currencyFormatter.format( movieFull.budget, {code: 'USD'} ) }
            </Text>
            
            {/* Cast */}
            <View style={{ marginTop: 10, marginBottom: 40}}>
                <Text style={{ fontSize: 20, marginTop: 29, fontWeight: 'bold', }}>
                    Actores
                </Text>
                <FlatList
                    data={cast}
                    keyExtractor={ (item) => item.id.toString() }
                    renderItem={({item}) => <CastItem actor={ item } /> }
                    horizontal={true}
                    showsHorizontalScrollIndicator={false} 
                    style={{ marginTop: 10, height: 70 }}
                />
            </View>

        </View>
    </>
  )
}
