export const fetchFromLocalStorage =  () => {
    const existing = JSON.parse(localStorage.getItem('fav')) || [];
    return existing;
}


export const addToLocalStorage = obj => {
    console.log('utils storage',obj);
    // const newObj = {
    //     id: obj.id,
    //     name: obj.name,
    //     img: obj.img
    // };
    let prev = fetchFromLocalStorage();

    // console.log(!prev.some(ob => ob.id !== newObj.id));
    // if (prev.length === 0)
    //     prev.push(newObj);
    if (!prev.some(ob => ob.id === obj.id)) {
        prev.push(obj);
        localStorage.setItem('fav', JSON.stringify(prev));
    }
    return prev;
}



export const removeFromLocal = (ob) => {
    const currFavList = fetchFromLocalStorage();
    if (currFavList.length !== 0) {
        const filteredList = currFavList.filter(a => a.id !== ob);
        console.log(filteredList);
        localStorage.setItem('fav', JSON.stringify(filteredList));
    }

    return fetchFromLocalStorage();
}