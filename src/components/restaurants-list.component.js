import { connect } from "react-redux";
import React, {Component} from "react";
import { retrieveRestaurants, findRestaurantByName } from "../actions/restaurants";
import {Link} from "react-router-dom";

class RestaurantsList extends Component{
    constructor(props){
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.setActiveRestaurant = this.setActiveRestaurant.bind(this);
        this.findByName = this.findByName.bind(this);
        
        
        this.state= {
            currentRestaurant: null, 
            currentIndex: -1,
            searchName: " ", 
        };
    }

    componentDidMount(){
        this.props.retrieveRestaurants();
    }

    onChangeSearchName(e){
        const searchName= e.target.value;
        this.setState({
            searchName: searchName,
        });
    }

    refreshData(){
        this.setState({
            currentRestaurant: null,
            currentIndex: -1,
        });
    }

    setActiveRestaurant(restaurant, index) {
        console.log("hej", restaurant, index);
        this.setState({
            currentRestaurant: restaurant,
            currentIndex: index
        });
        
    }

    findByName(){
        this.refreshData();
        this.props.findRestaurantByName(this.state.searchName);
    }

    render(){
        const{searchName, currentIndex} = this.setState;
        const {currentRestaurant} = this.state;
        const{restaurants}= this.props;
        return(
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input 
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={this.onChangeSearchName}
                         />
                         <div className="input-group-append">
                            <button className="btn btn-outline-secondary"
                            type="button"
                            onClick={this.findByName}
                            >
                             Search   
                            </button>
                         </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Restaurants List</h4>
                    
                    <ul className="list-group">
                        {restaurants &&
                        restaurants.map((restaurant, index)=> (
                            <li 
                            className={"list-group-item " + 
                            (index === currentIndex ? "active" : " ")
                            }
                            onClick={() => this.setActiveRestaurant(restaurant, index)}
                            key={index}
                            >
                            {restaurant.name}    
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-md-4">
                    
                    {currentRestaurant ? (
                     <div>
                        <h4>Restaurant</h4>
                    <div> 
                    <label>
                        <strong>Name:</strong>
                    </label>{" "}
                    {currentRestaurant.name}
                    </div>
                    <div>
                        <label>
                            <strong>Description:</strong>
                        </label>{" "}
                        {currentRestaurant.description}
                        </div>
                        
            
                        <Link 
                        to={"/restaurants/" + currentRestaurant.id}
                        className= "badge badge-warning"
                        >
                          Edit
                        </Link>
                        </div>
                    ):(
                        <div> 
                            <br />
                            <p>Please click on a restaurant</p>
                        </div>
                    )}
                </div>
            </div>

        );
    }

}


const mapStateToProps = (state) => {
    return {
        restaurants: state.restaurants
    };
};

export default connect(mapStateToProps, {
    retrieveRestaurants, 
    findRestaurantByName 
})(RestaurantsList);