let shop = document.getElementById("row");

let bascket = JSON.parse(localStorage.getItem("data")) ||  [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x)=>{
            let {id,name,price,img} = x;
            let search = bascket.find((x) => x.id === id) || [];
        return  `
        <div id=product-id-${id} class="col-4">
                          <img src=${img}>
                          <h4>${name}</h4>
                          <p>${price}DA</p>
                            <div class="buttons">
                            <ion-icon onclick="decrement(${id})" name="remove-outline"></ion-icon>
                            <div id=${id} class="quantity">
                                ${search.item === undefined ? 0 : search.item}
                            </div>
                            <ion-icon onclick="increment(${id})" name="add-outline"></ion-icon>
                            </div>
                        <a onclick="increment(${id})" class="add-cart" >Add To Cart</a>
         </div>
        `;
    }).join(""));
};

generateShop()

let increment = (id)=>{
    let selectedItem = id;
    let search = bascket.find((x)=> x.id === selectedItem.id);

    if (search === undefined) {
        bascket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }

    //console.log(bascket);
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(bascket));
};
let decrement = (id)=>{
    let selectedItem = id;
    let search = bascket.find((x)=> x.id === selectedItem.id);

    if (search === undefined) return
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    
    update(selectedItem.id);
    bascket = bascket.filter((x) => x.item !== 0);
    //console.log(bascket);
    localStorage.setItem("data", JSON.stringify(bascket));
};
let update = (id)=>{
    let search = bascket.find((x)=>x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation()
};

let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = bascket.map((x) => x.item ).reduce((x,y)=>x+y,0)
};

calculation();
