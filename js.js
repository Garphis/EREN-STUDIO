
oyuncutext = document.querySelector(".oyuncu");
pctext = document.querySelector(".bilgisayar");
kazanantext = document.querySelector(".kazanan");
wintext = document.querySelector(".win");
losetext = document.querySelector(".lose");
tietext = document.querySelector(".tie");

const play = ["tas","kagıt","makas"];
let win=0;
let lose = 0;
let tie = 0;


function tas()
{
    let secim = play[0];
    oyun(secim);
}

function kagıt()
{
    let secim = play[1];
    oyun(secim);
}

function makas()
{
    let secim = play[2];
    oyun(secim);
}

function oyun(secim)
{
    let pcsecim =  play[Math.floor(Math.random() * play.length)];

    if(pcsecim == secim)
    {
        kazanantext.innerHTML= `kazanan: <img class="draw" src="img/draw.png">`;
        tie++;
    }

    else if(pcsecim == "tas" && secim == "kagıt")
    {
        kazanantext.innerHTML= `kazanan: <img class="player" src="img/player.png">`;
        win++;
    }

    else if(pcsecim == "kagıt" && secim == "makas")
    {
        kazanantext.innerHTML= `kazanan: <img class="player" src="img/player.png">`;
        win++;
    }

    else if(pcsecim == "makas" && secim == "tas")
    {
        kazanantext.innerHTML= `kazanan: <img class="player" src="img/player.png">`;
        win++;
    }

    else{
        kazanantext.innerHTML= `kazanan: <img class="computer" src="img/computer.png">`;
        lose++;
    }

    pctext.innerHTML = `bilgisayarın secimi: <img class="secimimg" src="img/${pcsecim}.png">`;
    oyuncutext.innerHTML = `senin secimin: <img class="secimimg" src="img/${secim}.png">`;

    wintext.innerHTML = `kazanc: ${win}`;
    losetext.innerHTML = `kaybedis: ${lose}`;
    tietext.innerHTML = `berabere: ${tie}`;

}

function reset()
{
    win = 0;
    lose = 0;
    tie = 0;
    wintext.innerHTML = `kazanc: 0`;
    losetext.innerHTML = `kaybedis: 0`;
    tietext.innerHTML = `berabere: 0`;
}

function tkm()
{
    window.location.href = "taskagıtmakas.html";
}

function bj()
{
    window.location.href = "bj.html";
}