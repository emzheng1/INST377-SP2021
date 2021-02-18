/* Put your javascript in here */

    let imgWidth = 130; 
    let imgCount = 3;
    let position = 0;
    let list = carousel.querySelector('ul');
    let listElems = carousel.querySelectorAll('li');
      
    carousel.querySelector('.prev').onclick = function() {
      position += imgWidth * imgCount;
      position = Math.min(position, 0)
      list.style.marginLeft = position + 'px';
    };

    carousel.querySelector('.next').onclick = function() {
      position -= imgWidth * imgCount;
      position = Math.max(position, -imgWidth * (listElems.length - imgCount));
      list.style.marginLeft = position + 'px';
    };