class FormValidator{
  //validate a form
  formValidator(form, selector){
    const inputList = Array.from(form.querySelectorAll(selector));
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }) ? true : false;
  }

  //valid individual field
  fieldValidator(input, errorFunction){
    !input.validity.valid ? errorFunction(input.validationMessage) : errorFunction('');
  }
}

export const formValidator = new FormValidator();
