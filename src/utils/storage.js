export const fetchFromLocalStorage =  () => {
    const existing = JSON.parse(localStorage.getItem('fav')) || [];
    return existing;
}


export const addToLocalStorage = (...obj) => {
    console.log(obj);
    const newObj = {
        id: obj[0],
        name: obj[1],
        img: obj[2]
    };
    let prev = fetchFromLocalStorage();

    // console.log(!prev.some(ob => ob.id !== newObj.id));
    // if (prev.length === 0)
    //     prev.push(newObj);
    if (!prev.some(ob => ob.id === newObj.id)) {
        prev.push(newObj);
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