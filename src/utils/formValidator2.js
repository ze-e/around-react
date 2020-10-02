class FormValidator{
  constructor(form, selector){
    this.form = form;
    this.selector = selector;
    this.Error = new Object({inputName, errorName});
  }

  getErrors(){
    const inputList = Array.from(this.form.querySelectorAll(this.selector));
    const errorList =[];
    for(input in inputList){
      if (!input.validity.valid) {
        const newError = new Error({inputName: input.name, errorName: input.validationMessage});
        errorList.push(newError);
      }
    }
    const isValid =() => {return errorList.length > 0 ? false : true };
    return {isValid, errorList};
  }

  showErrors(errorElements, errorNames){
    return;
  }

}
export {FormValidator};