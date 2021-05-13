//Import Needed utils
import React,{useState}  from 'react'
import Axios from 'axios'
import {v4} from 'uuid'

import './App.scss';
//Import in components
import Entity from "./components/entity"

function App() {
  const [input, updateInput] = useState("");
  const [recipes, updateRecipes] = useState([]);
  
  const apiKey = "xxx";
  
  //Parse user input into format allowed by API
  const formatIng = (ings) =>{
    const newForm = ings.replace(", ", ",+")
    return newForm
  }

  //Fetches a specific Recipes link by its API ID
  const genUrl = (ing)=>{
    const newForm = formatIng(ing)
    const nURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${newForm}&number=100&ranking=1`;
    return nURL;
  }

  //Queries Server for Recipes
  const getVals = async()=>{
    const data = await Axios.get(genUrl(input))
    updateRecipes(data.data)    
    
  }
  //Handles on Submit of the form
  const submitForm =  (e) =>{
    e.preventDefault();    
    getVals();
    updateInput("")
    
  }
  //Handles typing in the text box
  const updateQuery = (e) =>{
  updateInput(e.target.value)
  
    }  

    //The actual App
  return (
    <div className="App">
      <div className="seperator">
      <div className ="headerMain" ><h2 >Dinner Detective</h2></div>
        <div className="container">
        <div className="search-box">
          <form className="search-bar" onSubmit = {submitForm}>
          <input type="text"                
                 autoComplete="off"
                
                 value ={input}
                 onChange = {updateQuery}/>
          <span></span>
          </form>
       </div>
      </div>
      </div>
      
     <div className="recipes"> 
      {recipes.length === 0 && <div className="Space">   </div>}
      {recipes.length === 0 && <p>Type in any ingredients you have available (seperated by a comma and a space), and click enter!</p>}
      {recipes !== [] && recipes.map(val => <Entity key={v4()} val={val}/>)}
     </div>
  </div>

  );
}

export default App;

