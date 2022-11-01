import{
    CREATE_RESTAURANT,
    RETRIVE_RESTAURANTS, 
    UPDATE_RESTAURANT,
    DELETE_RESTAURANT, 
} from "./types";

import RestaurantDataService from "../services/restaurant.service";

export const createRestaurant = (name, description) => async(dispatch) => {
    try{
        const res = await RestaurantDataService.create({name, description});

        dispatch({
            type:CREATE_RESTAURANT,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    }catch (err){
        return Promise.reject(err);
    }
};

export const retrieveRestaurants = () => async (dispatch) => {
    try{
        const res = await RestaurantDataService.getAll();

        dispatch({
            type: RETRIVE_RESTAURANTS,
            payload: res.data, 
        });
    }catch(err) {
        console.log(err);
    }
};

export const updateRestaurant = (id, data) => async(dispatch) =>{
    console.log(id, data, "kkkkkkkk");
    try{
        const res = await RestaurantDataService.update(id, data);

        dispatch({
            type: UPDATE_RESTAURANT,
            payload: data, 
        });
        return Promise.resolve(res.data);
    }catch(err){
        return Promise.reject(err);
    }
};

export const deleteRestaurant = (id) => async (dispatch) =>{
    try{
        await RestaurantDataService.delete(id);
        
        dispatch({
            type: DELETE_RESTAURANT, 
            payload: {id},
        });
    }catch(err){
        console.log(err);
    }
};

export const findRestaurantByName = (name) =>async (dispatch) =>{
    try{
        const res = await RestaurantDataService.findByName(name);
        dispatch({
            type: RETRIVE_RESTAURANTS, 
            payload: res.data, 
        });
    }catch(err){
        console.log(err);
    }
};