class PowerbiService{
    constructor(){}
    static async embedToken(groupId="43f75457-3e2a-4177-ac16-a00b71de170d",reportId="e4e1827f-7826-40c2-ae6b-8e606b3ecb72") {
        const accessToken = await this.getAccessToken();
        const url = `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}/GenerateToken`;
        const body = new URLSearchParams( {
            accessLevel: "view"
        })
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: body.toString(),
            });
            if (!response.ok) {
                throw new Error(`Erreur lors de la génération du embed jeton`);
            }
            const data = await response.json();
            return data.token;
        } catch (error) {
           throw error.message;
        }
     }

     static async getDataSet(datasetId="cec66f70-881a-4e8a-9d44-cf57f4bbf9be") {
        const accessToken = await this.getAccessToken();
        const url = `https://api.powerbi.com/v1.0/myorg/datasets/${datasetId}/executeQueries`;
        const body = {
            "queries": [
                {
                    "query": "EVALUATE VALUES(Produit)"
                }
            ],
            "serializerSettings": {
                "includeNulls": true
            }
        }
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(body),
            });
            if (!response.ok) {
               throw new Error(`Erreur lors de la récuperation`);
            }
            return await response.json();
        } catch (error) {
           throw error.message;
        }
     }

     static async  getAccessToken(username=process.env.USER_NAME, password=process.env.USER_PASSWORD) {
        const clientId = process.env.CLIENT_ID;
        const clientSecret = process.env.CLIENT_SECRET; 
        const url_authority = process.env.URL_AUTHORITY; 
        const body = new URLSearchParams({
            'grant_type': 'password',
            'client_id': clientId,
            'client_secret': clientSecret,
            'scope': 'https://analysis.windows.net/powerbi/api/.default',
            'username': username,
            'password': password,
        });
    
        try {
            const response = await fetch(url_authority, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: body.toString(),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erreur lors de l'obtention du jeton : ${errorData.error}`);
            }
            const data = await response.json();
            return data.access_token;
        } catch (error) {
            throw error;
        }
    }
}

module.exports={
    PowerbiService:PowerbiService
}