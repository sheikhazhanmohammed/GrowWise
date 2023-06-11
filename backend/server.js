const axios = require('axios'); 
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());


//ROUTES
//CREATE
app.post("/call",async(req,res)=>{
    let data
    try{
    let payload = req.body;

    let res = await axios.post('http://159.89.161.29:8000/analyse', payload);

    data = res.data;
    console.log(data);
    }
    catch(error){
        console.log(error.message);
    }
    // res.json ("hello")

    try{
        let JSONArrayToSEND=[]
        for (const crop of data.result.SuitableCrops ){
            console.log(crop)
            let IMList=[]
            let temp=null
            for (const product of crop.products){
                const query = product.replace(" ","+");
                
                const URL = "https://dir.indiamart.com/search-ajax.mp?ss="+query+"&mcatid=121040&catid=99&prdsrc=1"
                //console.log(query)
                const config = { 
                    method: 'get', 
                    url: URL 
                } 

                let IMres = await axios(config);
                
                IMList.push(IMres.data.results);
                temp={"Crop":crop.cropName,product:product,IMList:IMList,
                startMonth: crop.startMonth,
                endMonth: crop.endMonth,
                farmingTechnique: crop.farmingTechnique,
                shelfLife: crop.shelfLife,
              }
            }
            JSONArrayToSEND.push(temp)
        }
        res.json({data,JSONArrayToSEND})
        // res.json(IMres.data.results);
    }catch(err){
        console.error(err.message);
    }
     
})

// LISTEN ON PORT 5000
app.listen(5000, ()=>{
    console.log("Server started on port 5000");
})
 
