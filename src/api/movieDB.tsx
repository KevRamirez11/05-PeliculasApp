import axios from 'axios';


const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '991f42e91950abfc103791c2a9979121',
        language: 'es-ES'
    }
});


export default movieDB;