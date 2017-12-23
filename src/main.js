import makeGrid from './app/makeGrid'
import getVal from './app/getInputValue'

(function(){

    // inital display
    document.querySelector("#reset_btn").style.display = 'none';

    // EventListeners 
    document.querySelector("#sizePicker").addEventListener('submit', renderGrid);
    document.querySelector("#reset_btn").addEventListener('click', resetTableBacground);
    document.querySelector("#pixel_canvas").addEventListener('click',setCellBackground);
    document.querySelector("#pixel_canvas").addEventListener('contextmenu',resetCellBackground);

    function renderGrid(evt){
        evt.preventDefault();
        const height = getVal('#input_height');
        const width = getVal('#input_width');
        document.querySelector("#pixel_canvas").innerHTML = makeGrid(height, width);
        document.querySelector("#reset_btn").style.display = 'inline-block';
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
        return event.target.tagName.toLowerCase() === check;
    }

})();
