export default function getEndPoint(value) {
    var host = "http://localhost:8080";
    var endpoint;
    // eslint-disable-next-line default-case
    switch (value) {
      case "login":
        endpoint = "/users/login";
        break;
      case "newUser":
        endpoint = "/users/";
        break;
      case "emailAlreadyExists":
        endpoint = "/users/emailAlreadyExists";
        break;
      case "getFieldsByDocumentId":
        endpoint = "/field/getFieldByDocumentId?documentId=";
        break;
      case "countByUserId":
        endpoint = "/document/countByUserId?userId=";
        break;
      case "getAllDocumentsByUserId":
        endpoint = "/document?userId=";
        break;
      case "saveDocument":
        endpoint = "/document/createDocument?userId=";
        break;
      case "findByTitle":
        endpoint = "/document/findByTitle";
        break;
      case "findByPurpose":
        endpoint = "/document/findByPurpose";
        break;
      case "saveField":
        endpoint = "/field/";
        break;
      case "deleteField":
        endpoint = "/field/deleteFieldById?fieldId=";
        break;
      case "getOptions":
        endpoint = "/accountOptions/getAccountOptions?userId=";
        break;
      case "changeSafeDelete":
        endpoint = "/accountOptions/changeSafeDelete?userId=";
        break;
    }
  return host + endpoint;
}
