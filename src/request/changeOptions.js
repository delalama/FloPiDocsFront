import getEndPoint from "./Endpoints"

export default function changeOptions(safeDelete){

    const query = getEndPoint("changeSafeDelete") + localStorage.getItem("userId") + "&safeDelete=" + safeDelete;
   
    console.log(safeDelete);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "React POST Request Example" }),
    };
  
        fetch(query,requestOptions)
          .then(( response) => console.log(response ))
    
    return null;
}