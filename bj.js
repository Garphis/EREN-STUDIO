const cards = ["TS.svg","TH.svg","TD.svg","TC.svg","QS.svg","QH.svg","QD.svg","QC.svg","KS.svg","KH.svg","KD.svg","KC.svg","JS.svg","JH.svg","JD.svg","JC.svg","AS.svg","AH.svg","AD.svg","AC.svg","9S.svg","9H.svg","9D.svg","9C.svg","8S.svg","8H.svg","8D.svg","8C.svg","7S.svg","7H.svg","7D.svg","7C.svg","6S.svg","6H.svg","6D.svg","6C.svg","5S.svg","5H.svg","5D.svg","5C.svg","4S.svg","4H.svg","4D.svg","4C.svg","3S.svg","3H.svg","3D.svg","3C.svg","2S.svg","2H.svg","2D.svg","2C.svg"];
const flipcard = new Audio("sounds/flipcard.mp3");
const win = new Audio("sounds/win.mp3");
const lose = new Audio("sounds/lose.mp3");
const bj = new Audio("sounds/blakjack.mp3");
bj.volume = 0.1;
const but = new Audio("sounds/button.mp3");

let clicked = false,
    getpara = false,
    bcc = false,
    savemoney = false,
    para =100,
    bahis = 0,
    puan = 0,
    as = 0;

    
para = JSON.parse(localStorage.getItem("paras"));

if(para== null)
{
    para=100;
    localStorage.setItem("paras", JSON.stringify(para));
}

document.querySelector(".money").innerHTML = `para: $${para}`;

if(JSON.parse(localStorage.getItem("lbcc"))==true )
{
    document.body.classList.add("body2");
}

function card()
{   
    if(!getpara)
    {
        bahis = Number(document.querySelector(".bahis").value)
        if(bahis > para)
        {
            document.querySelector(".uyarı").innerHTML = "bu kadar paranız yok";
        }

        else if(bahis == 0 || !Number.isInteger(bahis))
        {
            document.querySelector(".uyarı").innerHTML = "geçerli bir sayı girin";
        }

        else{
            document.querySelector(".shop").remove();
            getpara = true;
            document.querySelector(".bahis").remove();
            localStorage.setItem("paras", JSON.stringify(para));
            
            flipcard.play();
            if(!clicked){
                cek();
                cek();
                clicked=true;
                document.querySelector(".uyarı").innerHTML = `bahis: $${bahis}`;
                document.querySelector(".money").innerHTML = `para: $${para-bahis}`;
                para -= bahis;
            }

            else
            {
                cek();
            }
        }

    }
    
    else{
        cek();
    }

    
    
}

function bitti()
{
    if(clicked)
    {
    let pcpuan = Math.floor(Math.random() * (24 - 17) ) + 17;
    

    if(pcpuan > 21)
    {
        para += bahis * 2;
        document.querySelector(".money").innerHTML = `para: $${para}`;
        localStorage.setItem("paras",JSON.stringify(para));
        document.querySelector(".sonuc").innerHTML = "KAZANDINIZ";
        document.querySelector(".sonuc2").innerHTML = "rakip battı...";
        document.querySelector(".reset").remove();
        document.querySelector(".cardsbutton").remove();
        if(puan == 21)
        {
            document.querySelector(".sonuc").innerHTML = "KAZANDINIZ... BLACKJACK😎😎";
            bj.play();
        }
        else{
            win.play();
        }
    }

    else if(pcpuan > puan)
    {
        lose.play();
        document.querySelector(".sonuc").innerHTML = "KAYBETTİNİZ";
        document.querySelector(".reset").remove();
        document.querySelector(".cardsbutton").remove();
        if(savemoney)
        {
            para+=bahis/2;
            localStorage.setItem("paras",JSON.stringify(para));
        }

        else{
            localStorage.setItem("paras",JSON.stringify(para));
        }
         document.querySelector(".money").innerHTML = `para: $${para}`;
    }

    else if(pcpuan == puan){
        para += bahis;
        document.querySelector(".money").innerHTML = `para: $${para}`;
        localStorage.setItem("paras",JSON.stringify(para));
        document.querySelector(".sonuc").innerHTML = "BERABERE";
        document.querySelector(".reset").remove();
        document.querySelector(".cardsbutton").remove();
        win.play();
    }

    else if(pcpuan < puan)
    {
        para += bahis * 2;
        document.querySelector(".money").innerHTML = `para: $${para}`;
        localStorage.setItem("paras",JSON.stringify(para));
        document.querySelector(".sonuc").innerHTML = "KAZANDINIZ";
        document.querySelector(".reset").remove();
        document.querySelector(".cardsbutton").remove();
        if(puan == 21)
        {
            bj.play();
            document.querySelector(".sonuc").innerHTML = "KAZANDINIZ... BLACKJACK😎😎";
        }

        else{
            win.play();
        }
    }

    

    document.querySelector(".pcpuan").innerHTML = `PC PUANI: ${pcpuan}`;
    }
}

function reset()
{
    localStorage.setItem("paras",JSON.stringify(para));
    window.location.href = "bj.html";
}

function cek()
{
   const img = document.createElement("img");
   const randomcard = cards[Math.floor(Math.random() * cards.length)];
   img.src = `poker/${randomcard}`;
   img.width = 170;
   document.getElementById('cek').appendChild(img);

   if(randomcard[0] == "T" || randomcard[0] == "Q" || randomcard[0] == "J" || randomcard[0] == "K")
   {
    puan+=10;
   }

   else if(randomcard[0] == "9")
   {
    puan+=9;
   }

   else if(randomcard[0] == "8")
   {
    puan+=8;
   }

   else if(randomcard[0] == "7")
   {
    puan+=7;
   }

   else if(randomcard[0] == "6")
   {
    puan+=6;
   }

   else if(randomcard[0] == "5")
   {
    puan+=5;
   }

   else if(randomcard[0] == "4")
   {
    puan+=4;
   }

   else if(randomcard[0] == "3")
   {
    puan+=3;
   }

   else if(randomcard[0] == "2")
   {
    puan+=2;
   }

   else{
    puan+=11;
    as++;
   }

   if(puan > 21)
   {
    while(as != 0)
    {
        puan-=10;
        as--;
    }
   }

   if(as == 0 && puan>21)
   {
    lose.play();
    as = 0;
    document.querySelector(".reset").remove();
    document.querySelector(".cardsbutton").remove();
    document.querySelector(".sonuc").innerHTML = "KAYBETTİNİZ";
    
        if(savemoney)
        {
            para+=bahis/2;
            localStorage.setItem("paras",JSON.stringify(para));
        }

        else{
            localStorage.setItem("paras",JSON.stringify(para));
        }
        document.querySelector(".money").innerHTML = `para: $${para}`;
   }

   document.querySelector(".puan").innerHTML = `SENİN PUANIN:${puan}`;
}

function shop()
{
    document.body.innerHTML +=`
    <div class="shoplist">
        <div class="markettitle">
            <button onclick="closeshop()" class="closebutton">X</button>
            <p class="marketname">MARKET</p>
        </div>
        <div class="shopelement">
            <div class="shopelementimgdiv"><img src="img/colorchange.png" class="shopelementimg"></div>
            <div class="n-and-d">
                <div class="name">RENK DEĞİŞTİR</div>
                <div class="description">($500) arka plan rengini değiştir</div>
            </div>
            <div class="shopbuttondiv"><button onclick="buy(1)" class="shopbutton"><img class="marketimg" src="img/market.png"></button></div>
        </div>

        <div class="shopelement">
            <div class="shopelementimgdiv"><img src="img/gift.png" class="shopelementimg"></div>
            <div class="n-and-d">
                <div class="name">HEDİYE</div>
                <div class="description">($500) sana özel bir hediye</div>
            </div>
            <div class="shopbuttondiv"><button onclick="buy(2)" class="shopbutton"><img class="marketimg" src="img/market.png"></button></div>
        </div>

        <div class="shopelement">
            <div class="shopelementimgdiv"><img src="img/moneyback.png" class="shopelementimg"></div>
            <div class="n-and-d">
                <div class="name">HEDİYE</div>
                <div class="description">($1000) bu el kaybedersen, kaybettiğin paranın %50 sini geri verir</div>
            </div>
            <div class="shopbuttondiv"><button onclick="buy(3)" class="shopbutton"><img class="marketimg" src="img/market.png"></button></div>
        </div>
        
    </div>`;
}

function closeshop()
{
    document.querySelector(".shoplist").remove();
}

function buy(girdi)
{
    if(girdi==1 && bcc == false && para>=500)
    {
        bcc = true;
        para-=500;
        localStorage.setItem("lbcc",JSON.stringify(bcc));
        localStorage.setItem("paras",JSON.stringify(para));
        document.querySelector(".money").innerHTML = `para: $${para}`;
        document.body.classList.add("body2");
    }

    else if(girdi ==2 && para>=500)
    {
        para-=500;
        localStorage.setItem("paras",JSON.stringify(para));
        document.querySelector(".money").innerHTML = `para: $${para}`;
        document.body.innerHTML = '<video class="nggyu" src="vid/nevergonnagiveyouup.mp4" autoplay></video>';
    }

    else if(girdi == 3 && !savemoney && para>=1000)
    {
        para-=1000;
        localStorage.setItem("paras",JSON.stringify(para));
        document.querySelector(".money").innerHTML = `para: $${para}`;
        savemoney = true;
    }
}