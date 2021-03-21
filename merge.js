const fs = require("fs");

(async () => {
    // let resultjwh = "";
    await fs.readFile("jwhs.json",async (err,data)=> {
        let jwh= "";
        if (err) throw err;
        jwh = JSON.parse(data);
        await fs.readFile("Jdetails.json",async (err,data)=> {
            let jd = "";
            if (err) throw err;
            jd = JSON.parse(data);
            for(let i in jwh){
                jwh[i]["detail"] = jd[i];
            }
            await fs.writeFile("wineCulture.json",JSON.stringify(jwh),async err =>{
                if(err) throw err;
                console.log("酒文化数据合并成功");
            })
        });
    });
})();

(async () => {
    // let resultjwh = "";
    await fs.readFile("qydts.json",async (err,data)=> {
        let jwh= "";
        if (err) throw err;
        jwh = JSON.parse(data);
        await fs.readFile("details.json",async (err,data)=> {
            let jd = "";
            if (err) throw err;
            jd = JSON.parse(data);
            for(let i in jwh){
                jwh[i]["detail"] = jd[i];
            }
            await fs.writeFile("entrepriseNews.json",JSON.stringify(jwh),async err =>{
                if(err) throw err;
                console.log("企业动态数据合并成功");
            })
        });
    });
})();