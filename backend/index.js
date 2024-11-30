const express = require('express');
const cors= require('cors');
require('dotenv').config();

const {PowerbiService} = require('./powerbi-service');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


app.post('/datasets', async (req, res) => {
    const {datasetId}=req.body;
    try{
        if(!datasetId){
          return res.status(422).json({error:'datasetId is required'})
        }
        const data= await PowerbiService.getDataSet(datasetId);
        return res.status(200).json(data)
    }catch(error){
        return res.status(401).json({error});
    }
});

app.post('/', async (req, res) => {
    const {reportId,groupId}=req.body;
    try{
        if(!(reportId && groupId)){
            return res.status(422).json({error:'reportId or groupId is required'})
        }
        const data= await PowerbiService.embedToken(groupId,reportId);
        return res.status(200).json(data)
    }catch(error){
        return res.status(401).json({error});
    }
});
app.get('/', async (req, res) => {
   try{
    const data= await PowerbiService.getAccessToken();
    return res.status(200).json(data)
   }catch(error){
      return res.status(401).json({error});
   }
});
app.listen(port, () => {
    console.log(`L'application est en cours d'exécution sur http://localhost:${port}`);
});