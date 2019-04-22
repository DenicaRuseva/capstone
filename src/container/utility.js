const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    };
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    };

    if(rules.isPhone) {
        const pattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        isValid = pattern.test(value) && isValid
    };

    if(rules.isLettersOnly) {
        const pattern = /^[a-zA-Z]+$/;
        isValid = pattern.test(value) && isValid;
    };

    return isValid;
};

export const updateFormOnInput = (event, inputIdentifier, orderForm) => {
    const updatedForm = {
        ...orderForm
    };
    const updatedFormElement = { 
        ...updatedForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;
    
    return updatedForm;

};