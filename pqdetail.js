const puppeteer = require("puppeteer");
const fs = require("fs");

puppeteer.launch({headless:true}).then(async browser=>{
    const page = await browser.newPage();
    const DOMAIN = 'http://zengpintang.net';
    await page.goto(DOMAIN);
    await page.waitForSelector("#nav112 a");
    const linkQy = await page.$eval("#nav112 a", node => node.href);
    const linkJw = await page.$eval("#nav116 a", node => node.href);

    // 企业动态
    // if(true){
    //     let resultArr = [];
        
    //     const page2 = await browser.newPage();
    //     await page2.goto(linkQy);
    
    //     let qysrc = await page2.$$eval(".fk-newsListTitle",nodes=>nodes.map(n=>n.href));
    //     for(let i = 0;i<qysrc.length;i++){
    //         const page3 = await browser.newPage();
    //         await Promise.all([
    //             // page.waitForNavigation(),
    //             await page3.goto(qysrc[i]),
    //             page3.waitForSelector('.jz_fix_ue_img'),
    //         ]);
    //         let qytext = await page3.$eval(".jz_fix_ue_img",n=>n.innerText);

    //         // 通过字符串塞选的方式太过于复杂
    //         // qytext = qytext.replace(/\(.+\)/g,'\n');
    //         // console.log(qytext);

    //         let qyimg = await page3.$$eval(".jz_fix_ue_img img",nodes=>nodes.map(n=>n.src));
    //         console.log(qyimg)
    //         let textArr = qytext.split(/[\n]+/g);
    //         textArr = textArr.filter(sentence =>{
    //             return !(sentence[0] == "（");
    //         })
    //         // console.log(textArr)
    //         let midArr = [];
    //         for(let i = 0;i<textArr.length;i++){
    //             if(textArr[i]){
    //                 midArr.push(textArr[i]);
    //             }
    //             if(qyimg[i]){
    //                 midArr.push(qyimg[i]);
    //             }
    //         }
    //         // console.log(midArr)
    //         resultArr.push(midArr)
    //         // resultArr.push([midArr])
    //     }
    //     // console.log(resultArr)
    //     // console.log(resultArr)
    //     await fs.writeFile("details.json",JSON.stringify(resultArr),async err =>{
    //         if(err) throw err;
    //         console.log("爬取的企业动态的详细数据已经保留");
    //     })
    // }
    // 酒文化
    if(true){
        let resultArr = [];
        
        const page2 = await browser.newPage();
        await page2.goto(linkJw);
    
        let qysrc = await page2.$$eval(".fk-newsListTitle",nodes=>nodes.map(n=>n.href));
        for(let i = 0;i<qysrc.length;i++){
            const page3 = await browser.newPage();
            await Promise.all([
                // page.waitForNavigation(),
                await page3.goto(qysrc[i]),
                page3.waitForSelector('.richContent.richContent2'),
            ]);
            let qytext = await page3.$eval(".richContent.richContent2",n=>n.innerText);

            // 通过字符串塞选的方式太过于复杂
            // qytext = qytext.replace(/\(.+\)/g,'\n');
            // console.log(qytext);

            let qyimg = await page3.$$eval(".richContent.richContent2 img",nodes=>nodes.map(n=>n.src));
            // console.log(qyimg)
            let textArr = qytext.split(/[\n]+/g);
            textArr = textArr.filter(sentence =>{
                return !(sentence[0] == "（");
            })
            // console.log(textArr)
            let midArr = [];
            for(let i = 0;i<textArr.length;i++){
                if(textArr[i]){
                    midArr.push(textArr[i]);
                }
                if(qyimg[i]){
                    midArr.push(qyimg[i]);
                }
            }
            console.log(midArr.length)
            resultArr.push(midArr)
            // resultArr.push([midArr])
        }
        // console.log(resultArr)
        // console.log(resultArr)
        await fs.writeFile("Jdetails.json",JSON.stringify(resultArr),async err =>{
            if(err) throw err;
            console.log("爬取的酒文化的详细数据已经保留");
        })
    }
    await browser.close();
})