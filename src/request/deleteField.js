import getEndpoint from './Endpoints';

export default function deleteField(fieldId){

    const query = getEndpoint('deleteField') + fieldId;

    
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "React POST Request Example" }),
      };
    
      fetch(query,requestOptions)
    .then((response) => console.log(response ))
    .finally(console.log("field Deleted"));

}