import React, { useState, useEffect } from 'react'
// import axios from 'axios';
import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import { getAllPokemon, getPokemon } from './Services/Action';
const PokeManList = () => {
    const [data, setData] = useState([])
    const [prevPage, setPrevPage] = useState()
    const [nextPage, setNextPage] = useState()
    const [pokeApi, setPokeApi] = useState('https://pokeapi.co/api/v2/pokemon')

    useEffect(() => {
        async function fetchData() {
            let response = await getAllPokemon(pokeApi)
            await loadPokeMon(response.results)
            setNextPage(response.next)
            setPrevPage(response.previous)
        }
        fetchData()

        // let cancel
        // axios.get(pokeApi, {
        //     cancelToken: new axios.CancelToken(c => cancel = c)
        // })
        //     .then((res) => {
        //         setNextPage(res.data.next)
        //         setPrevPage(res.data.previous)
        //         setData(res.data.results)
        //     })
        //     .catch(err => console.log(err))

        // return () => {
        //     cancel()
        // }
        // getData()

    }, [pokeApi])

    const loadPokeMon = async (data) => {
        let _pokemonData = await Promise.all(data.map(async poke => {
            let pokemonRecord = await getPokemon(poke)
            return pokemonRecord;
        }))
        setData(_pokemonData)
    }

    const gotoNextPage = () => {
        setPokeApi(nextPage)
    }
    const gotoPreviousPage = () => {
        setPokeApi(prevPage)
    }
    return (
        <Container>
            <Row xs={1} md={3} className="g-4">
                {data && data.map((item, id) => (
                    <Col key={item.name + id}>
                        <Card>
                            <Card.Img variant="top" src={item.sprites.front_default} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>Order : {item.order}</Card.Text>
                                <Card.Text>height : {item.height}</Card.Text>
                                {
                                    item && item.types?.map((type, id) => (
                                        <Card.Text key={id}>Type : {type.type.name}</Card.Text>
                                    ))
                                }
                            </Card.Body>
                        </Card>
                    </Col>

                ))
                }
            </Row>


            {
                prevPage && <button type="submit" className="btn btn-primary btn-block mt-2" onClick={gotoPreviousPage}>
                    Previous
                </button>
            }

            {
                nextPage && <button type="submit" className="btn btn-primary btn-block mt-2" onClick={gotoNextPage}>
                    Next
                </button>
            }
        </Container >
    )
}

export default PokeManList
