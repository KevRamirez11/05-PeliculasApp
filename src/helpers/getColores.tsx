
import ImageColors from 'react-native-image-colors'


export const getImageColors = async( uri: string ) => {

    const colors = await ImageColors.getColors(uri, {})

    let primary;
    let secondary;
    let tercero;

    console.log(colors)
    if ( colors.platform === 'android' ) {
        primary = colors.dominant
        secondary = colors.average
        tercero = colors.muted

    } else if ( colors.platform === 'ios' ){
        primary = colors.primary
        secondary = colors.secondary
        tercero = colors.background
    }

    return [primary, secondary, tercero]
}
