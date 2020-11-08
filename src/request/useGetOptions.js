import { useEffect, useState } from "react"
import getEndPoint from "../utilities/Endpoints"

export default function useGetOptions(){
    const [searching,setSearching] = useState(false);
    const [options,setOptions] = useState(false);

    const query = getEndPoint("getOptions") + localStorage.getItem("userId");

    function getOptions() {
        setSearching(true);
        fetch(query)
          .then( (response) => response.json() )
          .then( (response) => setOptions(response.safeDelete, localStorage.setItem('safeDelete', response.safeDelete) ))
          .finally(() => setSearching(false));
    }

    useEffect(() => {
        getOptions();
      }, []);

    function refresh() {
        setTimeout(function(){ getOptions(); }, 500);
    }
    
    return {options, searching, refresh}
}