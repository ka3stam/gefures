//function continuestage(){
Bridges = localStorage.getItem("currentactions");
Bridges = JSON.parse(Bridges);

Island = localStorage.getItem("theseIslands");
Island = JSON.parse(Island);

n = localStorage.getItem("thewidth");
n = JSON.parse(n);

m = localStorage.getItem("theheight");
m = JSON.parse(m);

Solution = localStorage.getItem("thesolution");
Solution = JSON.parse(Solution);

IslandC = localStorage.getItem("theCisland");
IslandC = JSON.parse(IslandC);

countB = localStorage.getItem("thecountB");
countB = JSON.parse(countB);

horizontal_lines = localStorage.getItem("thehorizontal_lines");
horizontal_lines = JSON.parse(horizontal_lines);

stage = localStorage.getItem("the-stage");
//}
var c = document.getElementById("myCanvas");
c.width = n * 100;
c.height = m * 100;

var ctx = c.getContext("2d");
var i, j, APOSTASI = 100;// APOSTASI anamesa sta kentra 2 kuklwn & diastaseis keliwn n*n
var x = APOSTASI / 2, y = APOSTASI / 2;
var rad = APOSTASI / 5; //aktina kuklou
var startb1 = x + rad;//arxiki timi suntetagmenwn tou kentrou tou kuklou+rad (50+20)
var startb2 = y - rad / 2, tempi, tempj;
var w = rad; // platos tis clickable area
var numofnx;//deixnei ti 8esi tou n orizontia
var numofny = 0;//deixnei ti 8esi tou n ka8eta
var s; //metritis twn n pou einai kena
var countwrongmoves = 0; //metritis gia to poses fores energopoih8ike to swal


// dimiourgia kuklwn-nisiwn
function drawIslandsAndBridges()
{
    ctx.clearRect(0, 0, c.width, c.height, "white");
    ctx.font = '36px sans-serif';
    ctx.lineWidth = 1.6;
    y = APOSTASI / 2;
    for (i = 0; i < m; i++)
    {
        x = APOSTASI / 2;
        for (j = 0; j < n; j++)
        {
            if (Island[i][j] !== 0)
            {
                ctx.beginPath();
                ctx.strokeStyle = 'blue';
                if (Island[i][j] === IslandC[i][j]) {
                    ctx.fillStyle = 'green';
                    ctx.strokeStyle = 'white';
                } else if (Island[i][j] > IslandC[i][j])
                    ctx.fillStyle = 'white';
                else
                {
                    ctx.fillStyle = 'red';
                    ctx.strokeStyle = 'white';
                    if (countwrongmoves < 1)
                    {
                        swal({
                            title: "Να θυμάσαι πως",
                            text: "Οι γέφυρες δεν πρέπει να υπερβαίνουν τον αριθμό του νησιού που συνδέονται, ούτε να διασταυρώνονται με άλλες γέφυρες",
                            imageUrl: "message.jpg", timer: 3000, allowOutsideClick: true,
                            showConfirmButton: true

                        });
                        countwrongmoves = countwrongmoves + 1;
                    } else if (countwrongmoves < 3)
                    {
                        countwrongmoves = countwrongmoves + 1;
                    } else
                    {
                        countwrongmoves = 0;
                    }
                }

                ctx.arc(x, y, rad, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
                ctx.strokeText(Island[i][j], x - rad / 2, 2 + y + rad / 2);
            }
            x = x + APOSTASI;
        }
        y = y + APOSTASI;
    }
    ctx.strokeStyle = 'blue';
    for (i = 0; i < horizontal_lines; i++)
    {
        if (Bridges[i][4] === 1)
        {
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(Bridges[i][5], Bridges[i][6] + 10);
            ctx.lineTo(Bridges[i][7], Bridges[i][6] + 10);
            ctx.stroke();
        }
        if (Bridges[i][4] === 2)
        {
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(Bridges[i][5] - 2, Bridges[i][6]);
            ctx.lineTo(Bridges[i][7] + 2, Bridges[i][6]);
            ctx.moveTo(Bridges[i][5] - 2, Bridges[i][8]);
            ctx.lineTo(Bridges[i][7] + 2, Bridges[i][8]);
            ctx.stroke();
        }
    }
    for (i = horizontal_lines; i < countB; i++)
    {
        if (Bridges[i][4] === 1)
        {
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(Bridges[i][5] + 10, Bridges[i][6]);
            ctx.lineTo(Bridges[i][5] + 10, Bridges[i][8]);
            ctx.stroke();
        }
        if (Bridges[i][4] === 2)
        {
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(Bridges[i][5], Bridges[i][6] - 2);
            ctx.lineTo(Bridges[i][5], Bridges[i][8] + 2);
            ctx.moveTo(Bridges[i][7], Bridges[i][6] - 2);
            ctx.lineTo(Bridges[i][7], Bridges[i][8] + 2);
            ctx.stroke();
        }

    }
    counter = 0;
    for (i = 0; i < countB; i++)
    {
        if (Bridges[i][4] === Solution[i])
            counter++;
    }
    if (counter === countB)
    {
        if (stage === 'a') {
            $(document).ready(function () {
                swal({
                    title: "Μπράβο",
                    text: "Ένωσες όλα τα νησιά σωστά και ολοκλήρωσες το Επίπεδο 1 !",
                    type: "success",
                    showConfirmButton: true
                },
                        function () {
                            window.location.href = 'level2-a.html';
                        });
            });

        } else
        {
            $(document).ready(function () {
                swal({
                    title: "Μπράβο",
                    text: "Ένωσες όλα τα νησιά σωστά!",
                    type: "success",
                    showConfirmButton: true
                },
                        function () {
                            clearSavedData();
                            window.location.href = 'level1-' + stage + '.html';
                            //localStorage.clear();
                        });
            });
        }
    }
}
;
//alert(Bridges[9][5]);

function startGame() {
    ctx.canvas.addEventListener('click', function (event)
    {
        var mouseX = event.clientX - ctx.canvas.offsetLeft;
        var mouseY = event.clientY - ctx.canvas.offsetTop;
        //alert(mouseX+" | "+mouseY);
        for (i = 0; i < countB; i++)
        {
            if (mouseX > Bridges[i][5] && mouseX < Bridges[i][7] && mouseY > Bridges[i][6] && mouseY < Bridges[i][8])
            {
                Bridges[i][4]++;
                o = Bridges[i][0]; // ari8mos keliou grammis
                t = Bridges[i][1];// ari8mos keliou stilis
                h = Bridges[i][2]; // ari8mos keliou grammis
                f = Bridges[i][3];// ari8mos keliou stilis
                IslandC[o][t]++;// au3anw +1 ston neo pinaka wste na sugkrinw me ti lusi
                IslandC[h][f]++;
                if (Bridges[i][4] === 3) //an ginoun 3 click midenise kai to antistoixo keli
                {
                    Bridges[i][4] = 0;
                    IslandC[o][t] = IslandC[o][t] - 3; //den bazw apeu8eias 0 gt to ka8ena apo ayta apeu8unetai se ena nisi 
                    IslandC[h][f] = IslandC[h][f] - 3;  //to opoio mporei na dexetai apo 4 diaforetikes pleures gefures
                }
                drawIslandsAndBridges();
                break;
            }
        }
    });
}
;

window.addEventListener('load', drawIslandsAndBridges);
window.addEventListener('load', startGame);
