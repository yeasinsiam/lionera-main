
const{orderConfirm} =require("./oderConfirmation.js");
const{uploadFile} =require("./uploadFile");



const Template = (type,data)=>{
    console.log(type,data)
    switch (type){
        case "order_confirm": 
            return orderConfirm(data) 
        case "data_uploaded": 
            return uploadFile(data)
    }
}

module.exports=Template