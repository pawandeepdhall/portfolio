'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

const btns = document.querySelectorAll("[data-target]");
const close_modals = document.querySelectorAll(".project-close-modal");
const over = document.getElementById("over");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.target).classList.add("active");
    over.classList.add("active");
  });
});

close_modals.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".project-modal");
    modal.classList.remove("active");
    over.classList.remove("active");
  });
});

window.onclick = (event) => {
  if (event.target == over) {
    const modals = document.querySelectorAll(".project-modal");
    modals.forEach((modal) => modal.classList.remove("active"));
    over.classList.remove("active");
  }
};
// contact form variables

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Thanks for your submission!";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! There was a problem submitting your form"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)

    document.querySelectorAll('.abutton').forEach(button => {

      let duration = 3000,
          svg = button.querySelector('svg'),
          svgPath = new Proxy({
              y: null,
              smoothing: null
          }, {
              set(target, key, value) {
                  target[key] = value;
                  if(target.y !== null && target.smoothing !== null) {
                      svg.innerHTML = getPath(target.y, target.smoothing, null);
                  }
                  return true;
              },
              get(target, key) {
                  return target[key];
              }
          });
  
      button.style.setProperty('--duration', duration);
  
      svgPath.y = 20;
      svgPath.smoothing = 0;
  
      button.addEventListener('click', e => {
          
          e.preventDefault();
  
          if(!button.classList.contains('loading')) {
  
              button.classList.add('loading');
  
              gsap.to(svgPath, {
                  smoothing: .3,
                  duration: duration * .065 / 1000
              });
  
              gsap.to(svgPath, {
                  y: 12,
                  duration: duration * .265 / 1000,
                  delay: duration * .065 / 1000,
                  ease: Elastic.easeOut.config(1.12, .4)
              });
  
              setTimeout(() => {
                  svg.innerHTML = getPath(0, 0, [
                      [3, 14],
                      [8, 19],
                      [21, 6]
                  ]);
              }, duration / 2);
  
          }
  
      });
  
  });
  
  function getPoint(point, i, a, smoothing) {
      let cp = (current, previous, next, reverse) => {
              let p = previous || current,
                  n = next || current,
                  o = {
                      length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
                      angle: Math.atan2(n[1] - p[1], n[0] - p[0])
                  },
                  angle = o.angle + (reverse ? Math.PI : 0),
                  length = o.length * smoothing;
              return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
          },
          cps = cp(a[i - 1], a[i - 2], point, false),
          cpe = cp(point, a[i - 1], a[i + 1], true);
      return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
  }
  
  function getPath(update, smoothing, pointsNew) {
      let points = pointsNew ? pointsNew : [
              [4, 12],
              [12, update],
              [20, 12]
          ],
          d = points.reduce((acc, point, i, a) => i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${getPoint(point, i, a, smoothing)}`, '');
      return `<path d="${d}" />`;
  }
  
  var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}


// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}