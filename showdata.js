
let db = [

            {
                id: 1,
                name: "RTX 4070",
                price: 700,
                description: "RTX 4070 is the best graphics card",
                img: "images/database/4070.jpg",
            },
            {
                id: 2,
                name: "RTX 4060 TI",
                price: 450,
                description: "RTX 4060 TI is the best graphics card",
                img: "images/database/4060ti.jpg",
            },
            {
                id: 3,
                name: "RTX 3060 TI",
                price: 340,
                description: "RTX 3060 TI is the best graphics card",
                img: "images/database/rtx 3060 ti.jpg",
            },
            {
                id: 4,
                name: "RTX 4090",
                price: 2000,
                description: "RTX 4090 is the best graphics card",
                img: "images/database/RTX 4090.jpg",
            },
            {
                id: 5,
                name: "GTX 1660",
                price: 150,
                description: "GTX 1660 is the best graphics card",
                img: "images/database/gtx1660.jpg",
            },
            {
                id: 6,
                name: "RTX 2080 TI",
                price: 150,
                description: "RTX 2080 TI is the best graphics card",
                img: "images/database/2080 ti.jpg",
            },
            {
                id: 7,
                name: "RTX 4080",
                price: 150,
                description: "RTX 4080 is the best graphics card",
                img: "images/database/4080.jpg",
            },
            {
                id: 8,
                name: "RTX 3090",
                price: 150,
                description: "RTX 3090 is the best graphics card",
                img: "images/database/3090.jpg",
            }, 
            {
                id: 9,
                name: "GTX 1660 TI",
                price: 150,
                description: "GTX 1660 TI is the best graphics card",
                img: "images/database/1660 ti.jpg",
            },
            
            
        
        ]
let cart =[]

let showcase =document.querySelector(".showcase");

function setEventsToButtons(){
    let buttons = document.querySelectorAll(".btn")
    buttons.forEach((item)=> {
        item.addEventListener("click", function(){
            let containe = false

            cart.forEach(i =>{
                 if (i.id == item.dataset.id){
                    containe = true 
                    i.count += 1
                }
                
            })
            if (containe == false){
                let NewCartItem={
                    id: item.dataset.id,
                    count:1

                }
                console.log("+")
                cart.push(NewCartItem)
                

            }
            

            
            cartRender()
           console.log(cart)
        })

    })
}



async function showcards(data)
{
    // let response = await fetch("db/goods.json");
    // let resulte = await response.json();
    // console.log(response);
    // console.log(resulte);
    showcase.innerHTML = "";
    data.forEach((item)=> {

        let card = document.createElement("div");
        card.classList.add("card")
        card.innerHTML = `
        <div class="cardImg">
        <img src="${item.img}" alt="">
        </div>
    <div class="cardContent">
    <h3>${item.name}</h3>
    <p>${item.description}</p>
    <h3>${item.price} $</h3>
    <button class="btn" data-id="${item.id}">Add to cart</button>
        </div>

        `
        showcase.appendChild(card); 
      
    })
    setEventsToButtons() 
}
showcards(db);
document.querySelector("#admin").addEventListener("click", (e)=>{
    e.preventDefault();
    let login = prompt("Enter admin login");
    let password = prompt("Enter admin password");
    if(login == "admin" && password == "admin"){
        document.querySelector(".adminform").classList.add("active")
    }
})
document.querySelector("#adminsubmit").addEventListener("click", function(e){
    e.preventDefault();
    let goodtitle = document.querySelector("#goodtitle")
    let goodprice = document.querySelector("#goodprice")
    let gooddescription = document.querySelector("#gooddescription")
    let goodimg = document.querySelector("#goodimg")
    goodtitle.classList.remove("error")
    goodprice.classList.remove("error")
    gooddescription.classList.remove("error")
    goodimg.classList.remove("error")

    let noerror = true;
    if (goodtitle.value ==""){
        noerror = false
        goodtitle.classList.add("error")


    }
    if (goodprice.value ==""){
        noerror = false
        goodtitle.classList.add("error")


    }
   if (gooddescription.value ==""){
        noerror = false
        goodtitle.classList.add("error")

    }
    if (goodimg.value ==""){
        noerror = false
        goodtitle.classList.add("error")

    

    }
    if (noerror == true){
        let newItem = {
            id:1,
            name: goodtitle.value,
            price: goodprice.value,
            description: gooddescription.value,
            img: goodimg.value
        }
        db.push(newItem)
    showcards(db)
    }

} )
function cartRender(){
    let cartList = document.querySelector(".cart_content__list")
    cartList.innerHTML = "";
    let totalcost = 0
    cart.forEach((cartitem) => {
        db.forEach(good =>{
            if(good.id == cartitem.id){
                cartList.innerHTML +=`
                <li class="cart_content__item" data-id="${cartitem.id}">
                <img src="${good.img}" alt="" class="cart_content__img">
                <div class="cart_content__item_title">${good.name}</div>
                <div class="cart_content__price">${good.price}
                
                </div>
                <div class="cart_content__count"> count: ${cartitem.count}</div>
                <button class="cart_content__button remove_from_cart_btn" data-id="${cartitem.id}">×</button>
                
            </li>
                `
                totalcost += good.price * cartitem.count
               
                


            }
            
        })
    })
    document.querySelector(".cart_content__totalprice").innerHTML = totalcost +"$"
removefromCart()

}
function removefromCart(){
    let allbuttons = document.querySelectorAll(".remove_from_cart_btn")
    allbuttons.forEach(btn =>{
        btn.addEventListener("click",function(){
            let reqId = btn.dataset.id
            cart.forEach((item, index) =>{
                if (item.id == reqId){
                    item.count -= 1
                    if(item.count == 0){
                        cart.splice(index,1)
                        
                    }
                

                }
                

            })
            cartRender()
            

            
            
            
        })

    })

}
document.querySelector("#buttonicomimg1").addEventListener("click", function(){
    document.querySelector(".cart_content").classList.toggle("active")
})

let searchbutton = document.querySelector(".searchbox__button")
searchbutton.addEventListener("click",search )


function search(){
    let searchinput = document.querySelector(".searchbox__input");
    let searchtext = searchinput.value
    console.log(searchtext);
    if (searchtext && searchtext.trim().length > 0){
        searchtext = searchtext.trim().toUpperCase()
       showcards(db.filter(item => {
           return item.name.includes(searchtext)
       }))
   

   }
   else{
    showcards(db)
   }
}




