const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports =function validShopInput(data){
        let errors = {};
       // Zu empty Strings machen weil Validator nur mit Strings arbeiten kann
        data.name = !isEmpty(data.name) ? data.name : "";
        data.adress = !isEmpty(data.adresse) ? data.adresse : "";


        if (Validator.isEmpty(data.name)) {
            errors.name = "Name field is required";
          }
        if (Validator.isEmpty(data.adresse)){
            errors.adresse = "Address is required";
        }
       
        return{
            errors,
            isValid: isEmpty(errors)
        }
    }        

