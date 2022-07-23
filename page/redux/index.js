 // Create store
 const {createStore}  = window.Redux;
const  initialState = [
    'Nha'
];
const ulElement = document.querySelector("#list-name");
const formElement = document.getElementById("formName");


const nameReducer = (state= initialState, action) =>{
    switch(action.type){
        case 'ADD_NAME': {
            const newList = [...state];
            newList.push(action.payload);
            return newList;
        }
        default:{
            return state;
        }
    }
   
};
const storeName = createStore (nameReducer);
const renderListName = (nameList) =>{
    if(!ulElement || ! Array.isArray(nameList) || nameList.length === 0){
        return ;
    };
    ulElement.innerHTML= '';
    nameList.forEach((item) =>{
      let liElement = document.createElement("li");
      liElement.textContent = item;
      ulElement.appendChild(liElement);
    });

};
if(formElement){
    const handleSubmitForm = (e) =>{
        e.preventDefault();
        let nameInput = document.querySelector("#input-name");
        if(!nameInput.value){
            return ;
        }
        const action = {
            type:"ADD_NAME",
            payload: nameInput.value
        };
        storeName.dispatch(action);
        nameInput.value = "";
    };
    formElement.addEventListener("submit", handleSubmitForm)
};
storeName.subscribe(()=>{
    const newListName =storeName.getState();
    renderListName(newListName);
});
const initialNameList = storeName.getState();
renderListName(initialNameList);
