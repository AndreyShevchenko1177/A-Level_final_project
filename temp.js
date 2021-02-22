let toRegexp = (str) => {
    str = str.replace(/ +/g, " ").trim();
    str = "/" + str.split(" ").join("|") + "/";
    return str;
};

let toQuery = (str, fields = ["POLE1", "POLE2"]) => {
    str = toRegexp(str);
    let arr = fields.map((s) => {
        console.log(s, typeof s);
        return { [s]: str };
    });
    return { $or: arr };
};

toQuery("   klk     lk nnnj    klkm    555   ");

async function categories(cats, parentId = null) {
    let result = await gql(
        `query categories($query:String){
                                CategoryFind(query: $query){
                                  _id
                                  name,
                                  goods{
                                    name
                                  },
                                  parent{
                                    name
                                  }
                                }
  }`,
        { query: JSON.stringify([{ "parent._id": parentId }]) }
    );
    if (result.errors) return;
    //cats = document.getElementById("cats")
    for (let { name, _id } of result.data.CategoryFind) {
        let li = document.createElement("li");
        li.innerText = name;
        let loaded;
        li.onclick = () => {
            if (!loaded) {
                categories(li, _id);
                loaded = true;
            }
        };
        cats.append(li);
    }
}

categories();

<li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul id="cats" class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <!-- <li><a class="dropdown-item" href="#">Action</a></li> -->
                <!-- <li><a class="dropdown-item" href="#">Another action</a></li> -->
                <!-- <li><a class="dropdown-item" href="#">Something else here</a></li> -->
                </ul>
              </li>