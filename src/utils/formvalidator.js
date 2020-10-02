export default function formValidator(form, selector){
  console.log(form, selector);
  const inputList = Array.from(form.querySelectorAll(selector));
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }) ? true : false;
}