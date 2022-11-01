import React, {Component } from "react";
import { connect, Connect } from "react-redux";
import { createRestaurant } from "../actions/restaurants";

class AddRestaurant extends Component{
    constructor(props) {
        super(props)
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription =this.onChangeDescription.bind(this);
        this.saveRestaurant = this.saveRestaurant.bind(this); 
        this.newRestaurant = this.newRestaurant.bind(this); 

        this.state ={
            id: null,
            name: " ",
            description: " ", 

            submitted: false,
        };
    }
    onChangeName(e){
        this.setState({
            name: e.target.value,
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value,
        });
    }

    saveRestaurant(){
        const{name, description} = this.state; 

        this.props
        .createRestaurant(name, description)
        .then((data)=>{
            this.setState({
                id: data.id,
                name: data.name, 
                description: data.description, 
            
                
                submitted: true, 
            }); 
            console.log(data);
        })
        .catch((e)=> {
            console.log(e);
        });
    }

    newRestaurant(){
        this.setState({
            id: null, 
            name: "", 
            description: "", 

            submitted: false, 
        });
    }

    render(){
        return(
            <div className = "submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4><strong>You Submitted successfully!</strong></h4>
                        <hr></hr>
                        <button className="btn btn-success" onClick={this.newRestaurant}>
                            Add
                        </button>
                    </div>
                ):(
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={this.state.name}
                            onChange={this.onChangeName}
                            name="name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor= "description">Description</label>
                        <input 
                        type="text"
                        className="form-control"
                        id="description"
                        required
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        name="description"
                        />
                    </div>
                       
                    <button onClick={this.saveRestaurant} className="btn btn-success">
                        Submit
                    </button>
                </div>
                )}
            </div>
        );
        
    }
}
export default connect(null, {createRestaurant})(AddRestaurant); 