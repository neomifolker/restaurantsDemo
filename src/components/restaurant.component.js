import React, {Component} from "react";
import{connect} from "react-redux"; 
import { useParams } from "react-router-dom";
import {updateRestaurant, deleteRestaurant} from "../actions/restaurants";
import RestaurantDataService from "../services/restaurant.service";



class Restaurant extends Component{
    constructor(props){
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getRestaurant = this.getRestaurant.bind(this);
        this.updateContent  = this.updateContent.bind(this); 
        this.removeRestaurant = this.removeRestaurant.bind(this);
         
        
        this.state = {
            currentRestaurant: {
                id: null, 
                name: "",
                describtion: "", 
                 
            }, 
            message: "", 
        };    

    }
    
   
    componentDidMount(){
        console.log(this.props.match.params.id, "funka!!!");
        this.getRestaurant( this.props.match.params.id);  
 
    }


    onChangeName(e){
        const name = e.target.value;

        this.setState(function(prevState){
            return{
                currentRestaurant: {
                    ...prevState.currentRestaurant,
                    name: name
                }
            };
        });
    }

    onChangeDescription(e){
        const description = e.target.value;

        this.setState((prevState)=> ({
            currentRestaurant: {
                ...prevState.currentRestaurant, 
                description: description, 
            },
        }));
    }

    getRestaurant(id){
        console.log(id)
        
        RestaurantDataService.get(id)
        .then(response => {
            this.setState({
                currentRestaurant: response.data 
            });
            console.log(response.data);
        })
        .catch((e)=>{
            console.log(e);
        });
    }

    updateContent(){
        this.props
        .updateRestaurant(this.state.currentRestaurant.id, this.state.currentRestaurant)
        .then((response)=>{
            console.log(response);

            this.setState({ message: "The Restaurant information was updated successfully!"});
        })
        .catch((e)=> {
            console.log(e);
        });
    }

    removeRestaurant(){
        this.props
        .deleteRestaurant(this.state.currentRestaurant.id)
        .then(()=>{
            this.props.history.push("/restaurants");
        })
        .catch((e)=>{
            console.log(e);
        });
    }

    render(){
        const {currentRestaurant} = this.state;
       
        

        return(
            <div>
                {currentRestaurant ? ( 
                    <div className="edit-form">
                        <h4> Restaurants</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input 
                                type="text" 
                                className="form-control"
                                id="name"
                                value={currentRestaurant.name}
                                onChange={this.onChangeName} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input 
                                type="text"
                                className="form-control" 
                                id="description"
                                value={currentRestaurant.description}
                                onChange={this.onChangeDescription}
                                 />
                            </div>
                        </form>

                        <button
                        className="badge badge-danger mr-2"
                        onClick={this.removeRestaurant}
                        >
                          Delete
                        </button>

                        <button 
                        type="submit"
                        className="badge badge-success"
                        onClick={this.updateContent}
                        >
                          Update  
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ):(
                    <div> 
                        <br />
                        <p>Please click on a Restaurant...</p>
                    </div>
                )}
            </div>
        );
    }
}
export default connect(null, {updateRestaurant, deleteRestaurant})(Restaurant);