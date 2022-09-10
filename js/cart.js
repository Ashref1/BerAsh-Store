let label = document.getElementById('label')
let ShoppingCart = document.getElementById('shopping-cart')


let bascket = JSON.parse(localStorage.getItem("data")) ||  [];

let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = bascket.map((x) => x.item ).reduce((x,y)=>x+y,0)
};

calculation();

let generateCartItems = () => {
    if (bascket.length !==0) {
        return (ShoppingCart.innerHTML = bascket
            .map((x) =>{
                let {id, item} = x;
                let search = shopItemsData.find((y) =>y.id === id) || [];
                let {img,name,price} = search
            return `
            <form action="https://formsubmit.co/c7972cf99ff1df6772aeb478a30d9468" method="POST">

            <!--Honeypot--->
              <input type="text" name="_honey" style="display : none;">
              
            <!--Disable Captcha--->
              <input type="hidden" name="_captcha" value="false">

              <input type="hidden" name="_next" value="https://www.youtube.com">


            <div class="cart-item">

                     <label for="image"></label>
                     <input type="hidden" name="image" id="image" value="${img}" required>
                     <img class="product-image" src= ${img} width="160">

                     <ion-icon onclick="removeItem(${id})" class="close-outline" name="close-outline"></ion-icon>

                 <div class="details">
                  <div class="title-price-x">
                     <h4 class="title-price">

                     <label for="product-name"></label>
                     <input type="hidden" name="product-name" id="product-name" value="${name}" required>
                     <p class="product-name">${name}</p>

                     <label for="price"></label>
                     <input type="hidden" name="price" id="price" value="${price}DA" required>
                     <p class="cart-item-price">${price}DA</p>

                     </h4>
                  </div>

                    <div class="c-buttons">
                            <h4>Quantité:</h4>
                            <ion-icon onclick="decrement(${id})" name="remove-outline"></ion-icon>
                            <div id=${id} class="quantity">${item}</div>
                            <ion-icon onclick="increment(${id})" name="add-outline"></ion-icon>
                    </div>

                  <div class="product-size">
                    <label for="Size">La Taille:</label><br>
                    <input type="radio" name="size" value="S" required>S<br>
                    <input type="radio" name="size" value="M" required>M<br>
                    <input type="radio" name="size" value="L" required>L<br>
                    <input type="radio" name="size" value="XL" required>XL<br>
                 </div>

                    <label for="total"></label>
                    <input type="hidden" name="total" id="total" value="${item * search.price}DA" required>
                    <h3 class="total-price">Total :${item * search.price} DA</h3>

              </div>
            </div> 

            <br>

            <label for="name">Name:</label>
            <input type="text" name="name" id="name" required>

            <br>

            <label for="phone">Phone Number:</label>
            <input type="tel" type="number" name="phone" id="phone" minlength="10" maxlength="10" required>

            <input type="submit" value="Commander" class="send-btn">
            </form>
            `;
        })
        .join(""));
    } else {
        ShoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="HomeBtn">Back To Home</button>
        </a>
        `;
    }
};

generateCartItems();

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

    generateCartItems();
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
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(bascket));
};

let update = (id)=>{
    let search = bascket.find((x)=>x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

let removeItem = (id)=>{
    let selectedItem = id;
    // console.log(selectedItem.id);

    bascket = bascket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculation();

    localStorage.setItem("data", JSON.stringify(bascket));
};

let clearCart = () => {
    bascket = []
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(bascket));
    calculation();
}

let totalAmount = () => {
    if (bascket.length !==0) {
        let amount = bascket.map((x)=>{
            let {item,id} = x;
            let search = shopItemsData.find((y) =>y.id === id) || [];
            return item * search.price;
        }).reduce((x,y)=>x+y,0)
        //console.log(amount);
        label.innerHTML = `
        <h2>Total Bill : ${amount} DA</h2>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
    } else return;
};

totalAmount();