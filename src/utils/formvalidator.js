export function formValidator(form, selector){
  const inputList = Array.from(form.querySelectorAll(selector));
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }) ? true : false;
}

export function fieldValidator(input, errorFunction){
  !input.validity.valid ? errorFunction(input.validationMessage) : errorFunction('');
}