
export default function getEndPoint(value: string) {
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
        case "whatever": 
            endpoint = 'whatever'; break;
    }
    return host + endpoint; 
}
