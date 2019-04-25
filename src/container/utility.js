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

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    };

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    };

    return isValid;
};

export const updateFormOnInput = (event, inputIdentifier, form) => {
    const updatedForm = {
        ...form
    };
    const updatedFormElement = { 
        ...updatedForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
    
    return [updatedForm, formIsValid];

};

export const flattenArray = (arr) => arr.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flattenArray(b) : b), []
);

 export const deepCopy = (obj) => {
    let target = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      let v = obj[key];
      if (v) {
        if (typeof v === "object") {
          target[key] = deepCopy(v);
        } else {
          target[key] = v;
        }
      } else {
        target[key] = v;
      }
    }
    return target;
};