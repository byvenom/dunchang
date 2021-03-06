
import React , {useEffect, useState} from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import MainImage from '../Commons/MainImage'
import GridCards from '../Commons/GridCards'
import { Row,Button } from 'antd'
function MoviePage() {

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint,1)
       
        
    }, [])

    const fetchMovies = (endpoint,num) => {
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            setMovies([...Movies,...response.results])
            if(num===1){
            setMainMovieImage(response.results[0])
            }
            setCurrentPage(response.page)
        })
    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint,2)
       
    }
    return (
        <div style={{ width: '100%' , margin: '0'}}>

            {/* Main Image */}
            {MainMovieImage &&
            <MainImage 
            image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
            title={MainMovieImage.original_title}
            text={MainMovieImage.overview}
            fleg="1"/>
            
            }
            <div style={{ width: '85%', margin: '1rem auto'}}>

                <h2>최신 영화</h2>
                <hr />

                {/* Movie Grid Cards */}
            <Row gutter={[16,16]}>
                {Movies && Movies.map((movie,index) => (
                    <React.Fragment key={index}>

                    <GridCards
                        MoviePage
                        image={movie.poster_path?
                            `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                        movieId={movie.id}
                        movieName={movie.original_title}
                    
                    
                    />
                    </React.Fragment>
                ))}
            </Row>
            

            </div>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Button type="link" size="large" onClick={loadMoreItems}> 더보기</Button>
            </div>
            
        </div>
    )
}

export default MoviePage
