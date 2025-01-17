/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    if(this.scrollY >= 50) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*=============== SWIPER POPULAR ===============*/
var swiperPopular = new Swiper(".popular__container", {
    spaceBetween: 32,
    grabCursor:true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

/*=============== VALUE ACCORDION ===============*/

const accordianItems = document.querySelectorAll('.value__accordian-item');

accordianItems.forEach((item)=>{
    const accordainHeader = item.querySelector('.value__accordian-header');

    accordainHeader.addEventListener('click', ()=>{
        const openItem = document.querySelector('.accordian-open')

        toggleItem(item);

        if(openItem && openItem !==item){
            toggleItem(openItem);
        }

    })
})

const toggleItem = (item)=>{
    const accordainContent = item.querySelector('.value__accordian-content');

    if(item.classList.contains('accordian-open')){
        accordainContent.removeAttribute('style');
        item.classList.remove('accordian-open');
    }
    else{
        accordainContent.style.height = accordainContent.scrollHeight + 'px';
        item.classList.add('accordian-open');
    }

}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current=>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop -58,
              sectionId = current.getAttribute('id')

        if(scrollY>sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }
        else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}

window.addEventListener('scroll', scrollActive);

/*=============== SHOW SCROLL UP ===============*/ 

function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');

    if(this.scrollY >= 350) scrollUp.classList.add('show-scroll');
    else{
        scrollUp.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUp);

/*=============== DARK LIGHT THEME ===============*/ 

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = ()=> document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun';

if(selectedTheme){
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add':'remove'](iconTheme);     
}

themeButton.addEventListener('click', ()=>{
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal('.home__title, .popular__container, .subscribe__container, .footer__container')
sr.reveal('.home__description, .footer__info', {delay:500})
sr.reveal('.home__search', {delay:600})
sr.reveal('.home__value', {delay:700})
sr.reveal('.home__images', {delay:500, origin: 'bottom'})
sr.reveal('.logos__img', {interval: 100})
sr.reveal('.value__images, .contact__content', {origin: 'left'})
sr.reveal('.value__content, .contact__images ', {origin: 'right'})
