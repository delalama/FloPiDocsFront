
export default function getEndPoint(value) {
    var host = 'http://localhost:8080';
    var endpoint;
    // eslint-disable-next-line default-case
    switch(value) {
        case "login": 
            endpoint = '/users/login'; 
            break;
        case "getAllDocumentsByUserId": 
            endpoint = '/document/getAllDocumentsByUserId?userId=';
            break;
        case "getFieldsByDocumentId": 
            endpoint = '/fields/getFieldByDocumentId?documentId=';
            break;
        case "countByUserId": 
            endpoint = '/document/countByUserId?userId='; break;
        case "saveDocument": 
            endpoint = '/document/createDocument?userId='; break;
        case "saveField": 
            endpoint = '/fields/'; break;
        case "getOptions": 
            endpoint = '/accountOptions/getAccountOptions?userId='; break;
        case "changeSafeDelete": 
            endpoint = '/accountOptions/changeSafeDelete?userId='; break;
        case "deleteField": 
            endpoint = '/field/deleteFieldById?fieldId='; break;
        case "newUser": 
            endpoint = '/users/'; break;
        case "emailAlreadyExists": 
            endpoint = '/users/emailAlreadyExists'; break;
        case "findByTitleAndPurposeContains": 
            endpoint = '/document/findByTitleAndPurposeContains'; break;
    }
    return host + endpoint; 
}
