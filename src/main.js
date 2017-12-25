import makeGrid from './app/makeGrid'
import getVal from './app/getInputValue'

(function(){

    // all selectors
    const sizePicker =  document.querySelector("#sizePicker");
    const resetBtn =  document.querySelector("#reset_btn");
    const pixelCanvas =  document.querySelector("#pixel_canvas");

    // inital display
    resetBtn.style.display = 'none';

    // EventListeners 
    sizePicker.addEventListener('submit', renderGrid);
    resetBtn.addEventListener('click', resetTableBacground);
    pixelCanvas.addEventListener('click',setCellBackground);
    pixelCanvas.addEventListener('contextmenu',resetCellBackground);

    function renderGrid(evt){
        evt.preventDefault();
        const height = getVal('#input_height');
        const width = getVal('#input_width');
        pixelCanvas.innerHTML = makeGrid(height, width);
        resetBtn.style.display = 'inline-block';
    }

    function setCellBackground(evt) {
        if(isEventTargetHasThisName(evt,'td'))
            evt.target.style.backgroundColor =  getVal("#colorPicker");
    }

    function resetCellBackground(evt) {
        evt.preventDefault();
        if(isEventTargetHasThisName(evt,'td'))
            evt.target.style.backgroundColor =  "initial";
    }

    function resetTableBacground(evt){
        document.querySelectorAll("#pixel_canvas td").forEach(res => res.style.backgroundColor = "initial");
    }

    function isEventTargetHasThisName(evt, check) {
        return evt.target.tagName.toLowerCase() === check;
    }

})();
