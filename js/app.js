/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/ 
const main = document.querySelector('main');
const navbarList = document.querySelector('#navbar__list');
let sections = [...document.querySelectorAll('.sections')];
let count = sections.length;
const navLinks = document.querySelectorAll('li a');
const upButton = document.querySelector('#up')
const newButton = document.querySelector('#new-section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// Increase Count func
increaseCount = () => {
   count = count + 1;
}
// IsinViewport func
isInViewport = (el) => {
   const rect = el.getBoundingClientRect();
   return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
   );
}
// Update navbar func
updateNav = () => {for(let i = 0; i < sections.length; i++){
   let li = document.createElement('li');
   li.innerHTML = `<li id="link${i+1}"><a href="#${sections[i].id}" class="menu__link">${sections[i].dataset.nav}</a> </li>`;
   navbarList.appendChild(li);
}}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
updateNav();

// Add class 'active' to section when near top of viewport
window.addEventListener('scroll', () => {
   for(let i = 0; i <sections.length; i++){
   if (isInViewport(sections[i]) === true){
      sections[i].classList.add('your-active-class');
   } else {
      sections[i].classList.remove('your-active-class');
   }
}});

// Go up button
// Make go up button visible at 400px
window.onscroll = () => {
   if(window.pageYOffset >= 400){
      upButton.style.display = 'block';
   } else {
      upButton.style.display = 'none';
   }
}
// make go up button functional with smooth scroll
upButton.onclick = () => {
   window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
   })
}

// New section button
newButton.addEventListener('click', () =>{
   increaseCount();
   // Create New section
   const newSection = document.createElement('section');
   // Add id, class and dataset to the new section
   Object.assign(newSection, {
      id: 'section'+ count,
      className: 'sections',
   })
   newSection.dataset.nav = 'section '+ count
   // Create New div
   const newDiv = document.createElement('div');
   // Add class to the div
   Object.assign(newDiv, {
      className: 'landing__container'
   })
   // Create H2 tag, 2 P tags and update their content
   const newH2 = document.createElement('h2');
   newH2.innerText = 'Section ' + count;
   const newP1 = document.createElement('p');
   newP1.innerText = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora adipisci totam, error aperiam facere voluptatibus quisquam qui veritatis corrupti sed neque numquam minus aliquam blanditiis, quia impedit voluptate reiciendis dolorum?'
   const newP2 = document.createElement('p');
   newP2.innerText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eos qui unde nobis vitae natus ab odio, ipsa sit, expedita ex fugiat molestiae deleniti odit maiores maxime? Provident, porro vero!'
   // Appending new tags to the new div
   newDiv.appendChild(newH2);
   newDiv.appendChild(newP1);
   newDiv.appendChild(newP2);
   // Appending new div to the new section
   newSection.appendChild(newDiv)
   // Appending new section to the html document
   main.insertAdjacentElement('beforeend', newSection)
   // Updating the sections array with the new section addition
   sections.push(newSection);
   // Clearing the previous navbar in order to update it with the new section added
   document.querySelector('#navbar__list').innerHTML = '';
   updateNav();
})
