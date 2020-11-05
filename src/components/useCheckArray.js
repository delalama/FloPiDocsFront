export default function useCheckArray(){
  const checkedArray = [];

  function setCheckedArray(){

  }

  function addCheckedId(props){
        checkedArray.push(props.row.id);
        console.log('array ' + checkedArray);
  }
  return {checkedArray, setCheckedArray, addCheckedId};
}