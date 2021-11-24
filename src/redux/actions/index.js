import axios from 'axios';
import { GET_POKEMONS } from './constants.js';
import { GET_TYPES } from './constants.js';
import { GET_DETAIL } from './constants.js';
import { REMOVE_DETAIL } from './constants.js';
import { SORT_BY_NAME } from './constants.js';
import { SORT_BY_NUMBER } from './constants.js';
import { FILTER_BY_TYPE } from './constants.js';

export function getPokemons() {
    return async function (dispatch) {
        try {
                let pokemonsApi = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=150`);
                let pokemons = await Promise.all(pokemonsApi.data.results.map(async pokemon => await axios (pokemon.url))) 
                pokemons = pokemons.map(pokemon => {
                    return {
                        id: pokemon.data.id,
                        name: pokemon.data.name.toUpperCase(),
                        image: pokemon.data.sprites.other.dream_world.front_default,
                        types: pokemon.data.types.map(t => {
                            return t.type.name.toUpperCase()
                        })
                    }
                })    
            return dispatch({
                type: GET_POKEMONS,
                payload: pokemons
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getTypes() {
    return async function (dispatch) {
        try {
            let typesApi = await axios.get(`https://pokeapi.co/api/v2/type`)
            let types = typesApi.data.results.map(type => type.name)
            return dispatch({
                type: GET_TYPES,
                payload: types
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            let detail = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            detail = {
                    id: detail.data.id,
                    name: detail.data.name.toUpperCase(),
                    image: detail.data.sprites.other.dream_world.front_default,
                    height: detail.data.height,
                    weight: detail.data.weight,
                    hp: detail.data.stats[0].base_stat,
                    attack: detail.data.stats[1].base_stat,
                    defense: detail.data.stats[2].base_stat,
                    speed: detail.data.stats[5].base_stat,
                    types: detail.data.types.map(t => {
                        return t.type.name.toUpperCase()
                    })
            }
            return dispatch({
                type: GET_DETAIL,
                payload: detail
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function removeDetail() {
    return{
        type: REMOVE_DETAIL
    }
}

export function sortByName(order) {
    return{
        type: SORT_BY_NAME,
        payload: order
    }
}

export function sortByNumber(order) {
    return{
        type: SORT_BY_NUMBER,
        payload: order
    }
}

export function filterByType(type) {
    return{
        type: FILTER_BY_TYPE,
        payload: type
    }
}