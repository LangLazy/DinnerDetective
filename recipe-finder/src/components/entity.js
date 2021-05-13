import React from 'react'
import Axios from 'axios'

const Entity = ({val}) =>{
    const {id, image, title, missedIngredients, usedIngredients} = val
    const apiKey = "b6248cff160b480e9d1393eaf0292b8f";
    const getNewLink = async () =>{
        const newUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
        const newData = await Axios.get(newUrl)
        const pData = newData.data
        const {sourceUrl} = pData
        window.open(sourceUrl, "_blank")
        
    }


    const findRecp = () =>{
        getNewLink()         
    }  
    const getVal = (elm) =>{
        const {name} = elm
        return name
    }
    const getIngs = (obj) =>{
        const newIngs = obj.map(getVal)
        return newIngs
    } 
    
    return(
        
        <div  className="recipe">
        <h2 >{title}</h2>
        <img className="Space"src={image} alt = {title}/>
        <div  ><b>Used Ingredients:</b> {getIngs(usedIngredients).toString()}</div>
        
        <div className="Space"><b>Missing Ingredients:</b> {getIngs(missedIngredients).toString()}</div>
        <button onClick={findRecp}>
            Recipe
        </button>
    </div>

    )
}

export default Entity;