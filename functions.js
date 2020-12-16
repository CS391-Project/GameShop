var item_list = [ "0,GTA V,129,gta5.jpg,Rockstar,Good Game", "1,Cyberpunk 2077,139,cyperpunk2077.jpg,Steam,Buggy", "2,Starwars,149,starwars.jpg,Origin,Epic",
    "3,Witcher 3,149,witcher3.jpg,Steam,Legendary","4,Among Us,10,amongus.jpg,Steam, Fun with friends" ]
var category_list = ["Rockstar","Origin","Steam","Epic Games"]
var itemDescription =["ABOUT THIS GAME When a young street hustler, a retired bank robber and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld, the U.S. government and the entertainment industry, they must pull off a series of dangerous heists to survive in a ruthless city in which they can trust nobody, least of all each other. Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4k and beyond, as well as the chance to experience the game running at 60 frames per second.The game offers players a huge range of PC-specific customization options, including over 25 separate configurable settings for texture quality, shaders, tessellation, anti-aliasing and more, as well as support and extensive customization for mouse and keyboard controls. Additional options include a population density slider to control car and pedestrian traffic, as well as dual and triple monitor support, 3D compatibility, and plug-and-play controller support.","Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. You can customize your character’s cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.","A galaxy-spanning adventure awaits in Star Wars Jedi: Fallen Order, a new third-person action-adventure title from Respawn Entertainment. This narratively driven, single-player game puts you in the role of a Jedi Padawan who narrowly escaped the purge of Order 66 following the events of Episode 3: Revenge of the Sith. On a quest to rebuild the Jedi Order, you must pick up the pieces of your shattered past to complete your training, develop new powerful Force abilities and master the art of the iconic lightsaber - all while staying one step ahead of the Empire and its deadly Inquisitors.","The Witcher: Wild Hunt is a story-driven open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences. In The Witcher, you play as professional monster hunter Geralt of Rivia tasked with finding a child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.","Play with 4-10 player online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone!"]

function fill_items()
{
    display_Items(item_list)
}

function fill_category()
{
    var text = "";
    for (i=0; i<category_list.length; i++)
    {
        text += "<input type=checkbox" + " class=filter" + " id=" + category_list[i] + " value=" + category_list[i] + ">"
        text += "<label for=" + category_list[i] + ">" + category_list[i] + "</label> <br>"
    }
    document.getElementById("categories").innerHTML = text;
}

function display_Items(item_list)
{
    var text = ``;

    /*
            <div>
            <img class="imgHome" src="Resources/gta5.jpg"  alt="sadfsa ">
            <p>21412tl</p>
            <button>asfas</button>
        </div>
     */
    for(i=0; i<item_list.length;i++)
    {
        text += `<div>`
        var item = item_list[i]
        var parsed_item = item.split(",")
        var id = parsed_item[0]
        var name = parsed_item[1]
        var price = parsed_item[2]
        var link = parsed_item[3]

        var button_action = "display_info(this.name)"

        text+= `<img class="imgHome" src="Resources/${link}"  alt="${name}">`
        text+= `<p>${name}</p>`
        text+= `<p>${price} TL</p>`
        text+= `<button onclick="${button_action}" name="${id}" value="Info">More Info</button>`

        text += `</div>`
    }

    document.getElementById("Items").innerHTML = text;

}

function apply_filter()
{

    var filter_list = document.getElementsByClassName("filter")
    var filtered_categories = []
    var new_list = []

    for(i =0; i < filter_list.length; i++)
    {
        if(filter_list[i].checked) filtered_categories.push(filter_list[i].value)
    }

    for(i=0; i < item_list.length;i++)
    {
        var item = item_list[i]
        var parsed_item = item.split(",")

        if (!filtered_categories.length) {
            new_list.push(item_list[i])
        } else {

            if(filtered_categories.includes(parsed_item[4])) new_list.push(item_list[i])
        }
    }

    display_Items(new_list)

}


function getInfoOnItem(item_id) {
    localStorage.setItem("id",item_id);
    var ivalue = item_list[item_id]
    var ipvalue = ivalue.split(',')
    var iid = ipvalue[0]
    iname = ipvalue[1]
    iprice = ipvalue[2]
    ilink = ipvalue[3]
    idescription = itemDescription[item_id]
    var val = ipvalue[1]
}
function getName(item_id){

    var ivalue = item_list[item_id]
    console.log(ivalue)
    var ipvalue = ivalue.split(',')
    var val = ipvalue[1]

    document.getElementById("gameName").innerText = val;


}
function getPrice(item_id){
    var ivalue = item_list[item_id]
    var ipvalue = ivalue.split(',')
    var val = ipvalue[2]
    val += ' TL'
    document.getElementById("price").innerText = val;
}
function getLink(item_id){
    var ivalue = item_list[item_id]
    var ipvalue = ivalue.split(',')
    var val = ipvalue[3]
    document.getElementById('link').setAttribute('src', 'Resources/'+val);

}
function getDesc(item_id){
    var ivalue = itemDescription[item_id]
    var val = ivalue
    console.log(val)
    document.getElementById("desc").innerText = val;
}

function display_info(item_id)
{
    window.open('moreInfo.html')
    getInfoOnItem(item_id)


}
//This function saves added elements to local storage that key is "product" and separating it by coma ',' to get all elements id that added to basket
function addToBasket(){
    const products = localStorage.getItem("product");

    if (products){
        var text = products
        text += ','
        text += localStorage.getItem("id")
    } else {
        text = localStorage.getItem("id")
    }
    localStorage.setItem("product",text);
}

function getProducts(){
    const products = localStorage.getItem("product")
    if (products) {
        return products.split(',');
    }
    return '';
}

function getProductDataAsObject(productId) {
    const productData = item_list[productId]
    const splotProductData = productData.split(',');

    return {
        productId:splotProductData[0],
        productName:splotProductData[1],
        productDescription: itemDescription[productId],
        productPrice:splotProductData[2],
        imageName:splotProductData[3],
        productDeveloper:splotProductData[4],
        productReview:splotProductData[5],
    }
}

function removeFromBasket(productId){
    const allProducts = getProducts();
    if (allProducts.includes(productId.toString())) {
        const removed= allProducts.splice(allProducts.indexOf(productId.toString()), 1);
    }
    const mergedProducts = allProducts.join(',');
    localStorage.setItem("product",mergedProducts);

    showBasket();
    displayTotal()
}

function calculateBasketTotalPrice() {
    const allProducts = getProducts();
    let totalPrice = 0.0;
    for (let productId of allProducts) {
        const product = getProductDataAsObject(productId);

        totalPrice += parseFloat(product.productPrice)
    }
    return totalPrice;
}

function displayTotal() {
    var basketTable = document.getElementById('basketTotalPrice');
    basketTable.innerHTML ='Total Price: ' + calculateBasketTotalPrice() + ' TL';
}

function checkout() {
    localStorage.removeItem("product");
    localStorage.removeItem("id");
    showBasket();
    displayTotal()
    alert('Checkout succesful !');
}

function showBasket()
{

    /*
        <table>
        <thead>
        <tr>
            <th>Product Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Developer</th>
            <th>Review</th>
            <th>Price</th>
            <th>Actions</th>
        </tr>
     */
    var basketTable = document.getElementById('Basket');
    basketTable.innerHTML =''
    let productIDs = getProducts();
    var basketTableDef = document.getElementById('basketTable');
    var checkoutArea = document.getElementById('checkOutArea');

    if (!productIDs.length) {
        checkoutArea.style.visibility = 'hidden';
        console.log('hide')
        basketTableDef.innerHTML = '<h4>Your basket is empty. Please add some items to checkout !</h4>'

    }

    var newHtml = "<tr>"

    for (let productId of productIDs) {
        const product = getProductDataAsObject(productId)

        if (product) {

            var tr = "<tr>";

            tr += "<td>" + product.productName + "</td>" + "<td><img class='basketImg' src='Resources/" + product.imageName + "'</td>" +
                "<td>" + product.productDescription + "</td>" + "<td>" + product.productDeveloper + "</td>" +
                "<td>" + product.productReview + "</td>" + "<td>" + product.productPrice + "</td>" +
                "<td><button type='button' onclick='removeFromBasket("+ product.productId + ")'" + ">Remove</button></td>";

            tr += "</tr>"

            basketTable.innerHTML += tr;
        }
        // newHtml += "<td>" + name + "<br>Price: " + price + "<br> <input type=button onclick=" + button_action + " class=item name=" + id + " value=Info ></td>"
        // newHtml += "<td><img src=" +"Resources/" + link + " alt=" + name + "></td>"
    }

    //document.getElementById("Items").innerHTML = text;

}

function login()
{
    var mail_address = document.getElementById("mail").value;
    var pass = document.getElementById("pass").value;

    var credentials = mail_address + ";" + pass

    var user_list = localStorage.getItem("user_list").split(",")

    if(user_list.includes(credentials)) alert("Login Successful")
    else alert("Login Failed")

}

function register()
{
    console.log("Registering")

    var mail_address = document.getElementById("register_mail").value;
    var pass = document.getElementById("register_pass").value;

    var list = localStorage.getItem("user_list")


    var user_list = []


    if(list == null) user_list.push([mail_address + ";" + pass])
    else  
    {
        user_list = list.split(",")
        user_list.push([mail_address + ";" + pass])
    }

    localStorage.setItem("user_list", user_list)

    alert("User Registered")
    
}

function reset_site()
{
    var admin_pass = document.getElementById("admin_pass").value

    if(admin_pass == "1234")
    {
        localStorage.clear()
        alert("Successful")
    } 
    else alert("Failed")
}