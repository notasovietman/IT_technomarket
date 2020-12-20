
let sliderPrice = document.querySelector('.price-slider');

if (sliderPrice) {

  let sliderLineActive = document.querySelector('.slider-line-active');
  let sliderPriceFrom = document.querySelector('.slider-from');
  let sliderPriceTo = document.querySelector('.slider-to');
  let inputPriceFrom = document.querySelector('.price-from');
  let inputPriceTo = document.querySelector('.price-to');
  let initialOffsetLeftPriceFrom = sliderPriceFrom.offsetLeft;
  let initialOffsetLeftPriceTo = sliderPriceTo.offsetLeft;
  let currentOffsetLeftPriceFrom = initialOffsetLeftPriceFrom;
  let currentOffsetLeftPriceTo = initialOffsetLeftPriceTo;
  let rulerWidth = initialOffsetLeftPriceTo - initialOffsetLeftPriceFrom - 20;
  let minPrice = Number(sliderPrice.dataset.minprice);
  let maxPrice = Number(sliderPrice.dataset.maxprice);
  let rulerStep = (maxPrice - minPrice) / (initialOffsetLeftPriceTo - initialOffsetLeftPriceFrom - 20);
  let posFromStart;
  let posToStart;

  sliderPriceFrom.onmousedown = sliderFromMouseDown;
  sliderPriceTo.onmousedown = sliderToMouseDown;
  inputPriceFrom.onblur = inputPriceFromBlur;
  inputPriceTo.onblur = inputPriceToBlur;

  function updateSlider() {
    sliderPriceFrom.style.left = currentOffsetLeftPriceFrom + 'px';
    sliderPriceTo.style.left = currentOffsetLeftPriceTo + 'px';

    inputPriceFrom.value = Math.round(minPrice + rulerStep * (currentOffsetLeftPriceFrom - initialOffsetLeftPriceFrom ));
    inputPriceTo.value = Math.round(maxPrice - rulerStep * (initialOffsetLeftPriceTo - currentOffsetLeftPriceTo));

    sliderLineActive.style.left = currentOffsetLeftPriceFrom + 20 + 'px';
    sliderLineActive.style.width = currentOffsetLeftPriceTo - currentOffsetLeftPriceFrom + 'px';
  }

  function inputPriceFromBlur(evt) {
    evt.preventDefault();
    if (isNaN(this.value)) {
      this.value = minPrice;
    }
    else {
      this.value = Math.round(this.value);

      if (this.value < minPrice) {
        this.value = minPrice;
      }
      else if (this.value > inputPriceTo.value) {
        this.value = inputPriceTo.value;
      }

      currentOffsetLeftPriceFrom = initialOffsetLeftPriceFrom + Math.round(this.value - minPrice) / rulerStep;
      updateSlider();
    }
  }

  function inputPriceToBlur(evt) {
    evt.preventDefault();
    if (isNaN(this.value)) {
      this.value = maxPrice;
    }
    else {
      this.value = Math.round(this.value);

      if (this.value > maxPrice) {
        this.value = maxPrice;
      }
      else if (this.value < inputPriceFrom.value) {
        this.value = inputPriceFrom.value;
      }

      currentOffsetLeftPriceTo = initialOffsetLeftPriceTo - Math.round(maxPrice - this.value) / rulerStep;
      updateSlider();
    }
  }

  function sliderFromMouseDown(evt) {
    evt.preventDefault();
    posFromStart = evt.clientX;
    document.onmousemove = sliderFromMouseMove;
    document.onmouseup = sliderMouseUp;
  }

  function sliderToMouseDown(evt) {
    evt.preventDefault();
    posToStart = evt.clientX;
    document.onmousemove = sliderToMouseMove;
    document.onmouseup = sliderMouseUp;
  }

  function sliderFromMouseMove(evt) {
    evt.preventDefault();
    let posNew = evt.clientX;
    let newOffset = sliderPriceFrom.offsetLeft + posNew - posFromStart;
    posFromStart = posNew;

    if(newOffset < initialOffsetLeftPriceFrom) {
      currentOffsetLeftPriceFrom = initialOffsetLeftPriceFrom;
      updateSlider();
    }
    else if (newOffset > currentOffsetLeftPriceTo - 20) {
      currentOffsetLeftPriceFrom = currentOffsetLeftPriceTo - 20;
      updateSlider();
    }
    else {
      currentOffsetLeftPriceFrom = newOffset;
      updateSlider();
    }
  }

  function sliderToMouseMove(evt) {
    evt.preventDefault();
    let posNew = evt.clientX;
    let newOffset = sliderPriceTo.offsetLeft + posNew - posToStart;
    posToStart = posNew;

    if(newOffset > initialOffsetLeftPriceTo) {
      currentOffsetLeftPriceTo = initialOffsetLeftPriceTo;
      updateSlider();
    }
    else if (newOffset < currentOffsetLeftPriceFrom + 20) {
      currentOffsetLeftPriceTo = currentOffsetLeftPriceFrom + 20;
      updateSlider();
    }
    else {
      currentOffsetLeftPriceTo = newOffset;
      updateSlider();
    }
  }

  function sliderMouseUp(evt) {
    evt.preventDefault();
    document.onmouseup = null;
    document.onmousemove = null;
  }
}