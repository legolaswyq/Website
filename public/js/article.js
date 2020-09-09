const menu = document.querySelector('.menu').innerHTML;
console.log(menu)
const hides = document.querySelectorAll(".hide");
if (menu == 'basic') {
    hides.forEach(item => {
        item.classList.add('d-none');
    })
}