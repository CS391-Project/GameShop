var item_list = [ "GTA V,129,gta5.jpg,Rockstar,Good Game", "Cyberpunk 2077,139,cyperpunk2077.jpg,Steam,Buggy", "Starwars,149,starwars.jpg,Origin,Epic",
"Witcher 3,149,witcher3.jpg,Steam,Legendary","Among Us,10,amongus.jpg,Steam, Fun with friends" ]
var category_list = ["Rockstar","Origin","Steam","Epic Games"]

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
    var text = "<tr>"
    
    for(i=0; i<item_list.length;i++)
    {
        var item = item_list[i]
        var parsed_item = item.split(",")
        var name = parsed_item[0]
        var price = parsed_item[1]
        var link = parsed_item[2]

        text += "<td>" + name + "<br>Price: " + price + "<br> <input type=button class=item name=" + name + " value=Info ></td>"
        text += "<td><img src=" +"Resources/" + link + " alt=" + name + "></td>"

        if((i+1) % 4 == 0)
        {
            text += "</tr>"
            text += "<tr>"
        }
    }
    document.getElementById("Items").innerHTML = text;

}

function apply_filter()
{
    console.log("apply_Filter")
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
        if(filtered_categories.includes(parsed_item[3])) new_list.push(item_list[i])
    }

    display_Items(new_list)

}