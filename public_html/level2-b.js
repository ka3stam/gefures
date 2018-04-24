var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var i, j, APOSTASI = 100;// APOSTASI anamesa sta kentra 2 kuklwn & diastaseis keliwn n*n
var m = 3, n = 5;      // diastaseis pinaka circles
var x = APOSTASI / 2, y = APOSTASI / 2;
var rad = APOSTASI / 5; //aktina kuklou
var Island = [[0, 1, 0, 3, 2], [3, 0, 2, 2, 0], [4, 0, 2, 0, 1]];
var countB = 0; //ari8mos twn eggegrammenwn grammwn tou pinaka bridges
var startb1 = x + rad;//arxiki timi suntetagmenwn tou kentrou tou kuklou+rad (50+20)
var startb2 = y - rad / 2, tempi, tempj;
var w = rad; // platos tis clickable area
var numofnx;//deixnei ti 8esi tou n orizontia
var numofny = 0;//deixnei ti 8esi tou n ka8eta
var s; //metritis twn n pou einai kena
var countwrongmoves = 0; //metritis gia to poses fores energopoih8ike to swal 
var stage = 'c';

//array me apo8ikeumenes tis suntetagmenes twn apenanti nisiwn
//+ mia stili me ton ari8mo twn click(gefures) meta3y aytwn, default=0
var Bridges = new Array(80);
for (i = 0; i < 80; i++)
{
    Bridges[i] = new Array(9);
}
for (i = 0; i < m; i++)
{
    numofnx = 0; //ari8mos keliwn pou proigountai tou aristerou nisiou
    for (j = 0; j < n; j++)
    {
        if (Island[i][j] !== 0) //an uparxei kuklos sto keli
        {
            if (j < n - 1) //an oxi stin teleutaia stili tis grammis tote
            {
                tempj = j + 1;//apo8ikeuse stin metabliti tempj tin epomeni 8esi stilis
                s = 0;
                if (Island[i][tempj] === 0) //an stin epomeni 8esi stilis den uparxei kuklos tote
                {                         //au3ise tin tempj+1 mexri tempj = teleutaia stili tis grammis
                    while (Island[i][tempj] === 0 && tempj < n - 1)
                    {
                        tempj++;
                        s++; //ari8mos midenikwn nisiwn anamesa sta tuxon apenanti nisia
                    }
                }
                if (Island[i][tempj] !== 0 && tempj < n)
                {   //suntetagmenes aristerou kuklou
                    Bridges[countB][0] = i;
                    Bridges[countB][1] = j;
                    //suntetagmenes de3iou kuklou
                    Bridges[countB][2] = i;
                    Bridges[countB][3] = tempj;
                    //poses fores egine click stin perioxi auti
                    Bridges[countB][4] = 0;
                    if (i === 0 && j === 0)//an stin epanw aristeri gwnia tou canva, dil stin arxi 
                    {
                        Bridges[countB][5] = startb1;
                        Bridges[countB][6] = startb2;
                    } else
                    {
                        Bridges[countB][5] = startb1 + numofnx * APOSTASI;
                        Bridges[countB][6] = startb2 + numofny * APOSTASI;
                    }
                    Bridges[countB][7] = startb1 + (numofnx + s) * APOSTASI + APOSTASI - 2 * rad;
                    Bridges[countB][8] = startb2 + numofny * APOSTASI + w;
                    countB++;
                    numofnx++;
                }
            }
        } else
            numofnx++;
    }
    numofny++;
}
horizontal_lines = countB;
numofnx = 0;
for (j = 0; j < n; j++)
{
    numofny = 0;
    for (i = 0; i < m; i++)
    {
        if (Island[i][j] !== 0)
        {
            if (i < m - 1)//an oxi stin teleutaia grammi tis stilis tote
            {
                tempi = i + 1; //apo8ikeuse stin metabliti tempi tin epomeni 8esi grammis
                s = 0;
                if (Island[tempi][j] === 0)//an stin epomeni 8esi grammis den uparxei kuklos tote
                {                         //au3ise tin tempi+1 mexri tempi = teleutaia grammi tis stilis
                    while (Island[tempi][j] === 0 && tempi < m - 1)
                    {
                        tempi++;
                        s++;
                    }
                }
                if (Island[tempi][j] !== 0 && tempi < m)
                {  //suntetagmenes anw kuklou
                    Bridges[countB][0] = i;
                    Bridges[countB][1] = j;
                    //suntetagmenes katw kuklou
                    Bridges[countB][2] = tempi;
                    Bridges[countB][3] = j;
                    //poses fores egine click stin perioxi auti
                    Bridges[countB][4] = 0;
                    if (i === 0 && j === 0)
                    {
                        Bridges[countB][5] = startb2;
                        Bridges[countB][6] = startb1;
                    } else
                    {
                        Bridges[countB][5] = startb2 + numofnx * APOSTASI;
                        Bridges[countB][6] = startb1 + numofny * APOSTASI;
                    }
                    Bridges[countB][7] = startb2 + numofnx * APOSTASI + w;
                    Bridges[countB][8] = startb1 + (numofny + s) * APOSTASI + APOSTASI - 2 * rad;
                    countB++;
                    numofny++;
                }
            }
        } else
            numofny++;
    }
    numofnx++;
}

// dimiourgia kuklwn
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
                else {
                    ctx.fillStyle = 'red';
                    ctx.strokeStyle = 'white';
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
        //alert("BRAVO!!!");
        $(document).ready(function () {
            swal({
                title: "Μπράβο",
                text: "Ένωσες όλα τα νησιά σωστά!",
                type: "success",
                showConfirmButton: true
            },
                    function () {
                        window.location.href = 'level2-c.html';
                    });
        });
    }
}
;
//alert(Bridges[9][5]);

var IslandC = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];// antistoixos tou pinaka Island
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

//solution array, specified clicks/bridges of solution
var Solution = [1, 1, 1, 1, 2, 0, 2, 0, 1, 1];

window.addEventListener('load', drawIslandsAndBridges);
window.addEventListener('load', startGame);