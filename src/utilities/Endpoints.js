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
    case "User":
      endpoint = "/users?userId=";
      break;
    case "emailAlreadyExists":
      endpoint = "/users/emailAlreadyExists";
      break;
    case "countByUserId":
      endpoint = "/document/countByUserId?userId=";
      break;
    case "getAllDocumentsByUserId":
      endpoint = "/document?userId=";
      break;
    case "document":
      endpoint = "/document";
      break;
    case "exportDocument":
      endpoint = "/document/exportDocument?documentId=";
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
    case "tag":
      endpoint = "/tag";
      break;
    case "findByTag":
      endpoint = "/document/findByTag";
      break;
    case "saveField":
      endpoint = "/field/";
      break;
    case "field":
      endpoint = "/field/";
      break;
    case "getFieldsByDocumentId":
      endpoint = "/field/getFieldByDocumentId?documentId=";
      break;
    case "deleteField":
      endpoint = "/field/deleteFieldById?fieldId=";
      break;
    case "getOptions":
      endpoint = "/accountOption?userId=";
      break;
    case "changeSafeDelete":
      endpoint = "/accountOption/changeSafeDelete?userId=";
      break;
  }
  return host + endpoint;
}
