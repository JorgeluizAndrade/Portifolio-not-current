const menuItems = document.querySelectorAll('.header__nav a[href^="#"]');

function getScrollByHref(element) {
  const id = element.getAttribute('href');
  return document.querySelector(id).offsetTop;
}

function scrollToPosition(to) {
  window.scrollTo({
    top: to,
    behavior: "smooth",
  });
  smoothScrollTo(0, to);
}

function scrollToIdOnClick(event) {
  event.preventDefault();
  const to = getScrollByHref(event.currentTarget) - 80;
  scrollToPosition(to);
}

menuItems.forEach(item => {
  item.addEventListener('click', scrollToIdOnClick);
});

function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 1000;


  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 100 / 60); 
};