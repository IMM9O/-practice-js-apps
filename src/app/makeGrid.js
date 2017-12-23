function makeGrid(height,width){
    let grid = '';
    for (let h = 0; h < height ; h++) {
        grid += `<tr>`;
        for (let w = 0; w < width; w++) {
            grid += `<td></td>`;
        }
        grid += `</tr>`;
    }
    return grid;
}

export default makeGrid;