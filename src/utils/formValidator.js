import {settings} from "../utils/settings.js";

class FormValidator{
constructor(formElement){
  this._settings = settings;
  this._formElement = formElement;
}

_showInputError(inputElement, errorMessage){
  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(this._settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._settings.errorClass);
};

_hideInputError(inputElement){
  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(this._settings.inputErrorClass);
  errorElement.classList.remove(this._settings.errorClass);
  errorElement.textContent = "";
};

_checkInputValidity(item){
  if (!item.validity.valid) {
    this._showInputError(item, item.validationMessage);
  } else {
    this._hideInputError(item);
  }
};

_hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

_toggleButtonState (inputList, buttonElement){
  if (this._hasInvalidInput(inputList)) {
    buttonElement.classList.add(this._settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    //reattach submit event handlers if input is valid
    buttonElement.classList.remove(this._settings.inactiveButtonClass);
    buttonElement.disabled = false;

  }
};

enableValidation (){
  const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
  const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
  this._toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input",  () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(inputList, buttonElement);
    });
  });
};

}
export {FormValidator};