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
