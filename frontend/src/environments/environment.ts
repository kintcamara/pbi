const  TENANT_ID="4d24a5e1-43ac-47f2-8666-7018b13dec8a";
export const environment = {
    URL_API_SERVICE_PBI: "http://localhost:3000",
    TENANT_ID:TENANT_ID,
    URL_GENERATE_ACCESS_TOKEN:`https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
    APP_CLIENT:{auth: {
        clientId: 'eb695b1b-68c0-471b-a942-9c85da7bfec0',
        authority: `https://login.microsoftonline.com/${TENANT_ID}`,
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
    }
   },
    production: false,
};