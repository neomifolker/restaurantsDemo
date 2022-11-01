import{
    CREATE_RESTAURANT, 
    RETRIVE_RESTAURANTS, 
    UPDATE_RESTAURANT, 
    DELETE_RESTAURANT
} from "../actions/types";

const intitialState = [];

function restaurantReducer(restaurants = intitialState, action){
    const{type, payload} = action; 

    switch (type){
        case CREATE_RESTAURANT:
            return[...restaurants, payload];

        case RETRIVE_RESTAURANTS:
            return payload;
        
        case UPDATE_RESTAURANT:
            return restaurants.map((restaurant)=> {
                if(restaurant.id === payload.id){
                    return{
                        ...restaurant,
                        ...payload,
                    };
                }else{
                    return restaurant;
                }
            }); 
        case DELETE_RESTAURANT:
            return restaurants.filter(({id}) => id !== payload.id);
        
        default:
            return restaurants;
    }
};

export default restaurantReducer;