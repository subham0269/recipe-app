export const fetchRandomRecipeData = async () => {
    try {
        const listsofApi = Array.from({length: 9}, () => fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(res => res.json()));
        const responses = await Promise.all(listsofApi);
        const formattedResponse = responses.map(recipe => recipe.meals[0]);
        return formattedResponse;
    } catch (err) {
        console.log('error while fetching from api', err)
    }
}

export const fetchFilteredRecipe = async (str) => {
    try {
        const responses = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${str}`).then(res => res.json());
        return responses;
    } catch (err) {
        console.log('error while fetching from api', err)
    }
    
}

export const fetchAllRecipeFilters = async () => {
    try {
        const responses = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list').then(res => res.json());
        return responses.meals;
    } catch (err) {
        console.log('error while fetching from api', err)
    }
    
}

export const fetchSearchedRecipe = async (search) => {
    try {
        const responses = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`).then(res => res.json());
        // console.log(responses.meals)
        return responses.meals;
    } catch (err) {
        console.log('error while fetching recipe from api', err)
    }
}


// const 


export default fetchRandomRecipeData;