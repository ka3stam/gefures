function savemode() {
    localStorage.setItem("currentactions", JSON.stringify(Bridges));
    localStorage.setItem("theseIslands", JSON.stringify(Island));
    localStorage.setItem("thewidth", JSON.stringify(n));
    localStorage.setItem("theheight", JSON.stringify(m));
    localStorage.setItem("thesolution", JSON.stringify(Solution));
    localStorage.setItem("theCisland", JSON.stringify(IslandC));
    localStorage.setItem("thecountB", JSON.stringify(countB));
    localStorage.setItem("thehorizontal_lines", JSON.stringify(horizontal_lines));
    localStorage.setItem("the-stage", stage);


    swal({
        title: "Αποθήκευση...",
        timer: 500,
        showConfirmButton: false
    });
}

function clearSavedData() {
    localStorage.removeItem("currentactions");
}

//an exei ginei apothikeusi emfanise menoy alliws emfanise 1o guro toy antistoixou epipedou
function checksaveddata1() {
    x = localStorage.getItem("currentactions");
    if (x === null)
        window.location.href = 'level1-a.html';
    else
        window.location.href = 'newgamemenu.html';
}
function checksaveddata2() {
    x = localStorage.getItem("currentactions");
    if (x === null)
        window.location.href = 'level2-a.html';
    else
        window.location.href = 'newgamemenu2.html';
}
function checksaveddata3() {
    x = localStorage.getItem("currentactions");
    if (x === null)
        window.location.href = 'level3-a.html';
    else
        window.location.href = 'newgamemenu3.html';
}