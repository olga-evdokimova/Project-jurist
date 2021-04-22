/* 
    если заполнено поле и нажимается кнопка, то открывается следующая форма заместо этой
    если поля второй формы заполнены и нажимается кнопка, то данные с обоих форм отправляются на почту
*/

let form1 = document.querySelector("#form1")
let form2 = document.querySelector("#form2")

let textarea = form1.querySelector(".ask-form__textarea")
let button1 = form1.querySelector(".ask-form__btn")

let button2 = form2.querySelector(".ask-form__btn")
let inputname = form2.querySelector(".ask-form__name")
let inputphone = form2.querySelector(".ask-form__phone")
let inputlocation = form2.querySelector(".ask-form__location")

button1.addEventListener("click", e => {
    
    let isEmpty = textarea.value === "" 

    if (isEmpty) {
        textarea.classList.add("requred-error")
    } else {
        form1.classList.add("ask-form__hidden")
        form2.classList.remove("ask-form__hidden")
    }
    
})

button2.addEventListener("click", e => {


    let isFormFull = !(inputname.value === "")
        && !(inputphone.value === "")
        && !(inputlocation.value === "")



    if (isFormFull) {



        let data = `Первое поле: ${textarea.value}, Вторая форма: имя:${inputname.value} тел:${inputphone.value} лок:${inputlocation.value}`
        console.log(data)
        
    }
})