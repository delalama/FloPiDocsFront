
export default function getEndPoint(value) {
    var host = 'http://localhost:8080';
    var endpoint;
    switch(value) {
        case "login": 
            endpoint = '/user/login'; 
            break;
        case "getAllDocumentsByUserId": 
            endpoint = '/document/getAllDocumentsByUserId?userId=';
            break;
        case "getFieldsByDocumentId": 
            endpoint = '/field/getFieldByDocumentId?documentId=';
            break;
        case "countByUserId": 
            endpoint = '/document/countByUserId?userId='; break;
        case "saveDocument": 
            endpoint = '/document/createDocument?userId='; break;
        case "getOptions": 
            endpoint = '/accountOptions/getAccountOptions?userId='; break;
        case "changeSafeDelete": 
            endpoint = '/accountOptions/changeSafeDelete?userId='; break;
        case "deleteField": 
            endpoint = '/field/deleteFieldById?fieldId='; break;
    }
    return host + endpoint; 
}
