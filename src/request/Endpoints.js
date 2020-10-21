function getEndpoint(value) {
    var host = 'http://localhost:8080';
    var endpoint;
    switch(value) {
        case "login": endpoint = '/user/login';
        case "getAllDocumentsByUserId": endpoint = 'document/getAllDocumentsByUserId?userId=';
        case "whatever": endpoint = 'whatever';
    }
    return host + endpoint; 
}