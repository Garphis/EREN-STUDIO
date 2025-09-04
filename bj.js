const cards = ["TS.svg","TH.svg","TD.svg","TC.svg","QS.svg","QH.svg","QD.svg","QC.svg","KS.svg","KH.svg","KD.svg","KC.svg","JS.svg","JH.svg","JD.svg","JC.svg","AS.svg","AH.svg","AD.svg","AC.svg","9S.svg","9H.svg","9D.svg","9C.svg","8S.svg","8H.svg","8D.svg","8C.svg","7S.svg","7H.svg","7D.svg","7C.svg","6S.svg","6H.svg","6D.svg","6C.svg","5S.svg","5H.svg","5D.svg","5C.svg","4S.svg","4H.svg","4D.svg","4C.svg","3S.svg","3H.svg","3D.svg","3C.svg","2S.svg","2H.svg","2D.svg","2C.svg"];
const enemycards = ["TS.svg","TH.svg","TD.svg","TC.svg","QS.svg","QH.svg","QD.svg","QC.svg","KS.svg","KH.svg","KD.svg","KC.svg","JS.svg","JH.svg","JD.svg","JC.svg","AS.svg","AH.svg","AD.svg","AC.svg","9S.svg","9H.svg","9D.svg","9C.svg","8S.svg","8H.svg","8D.svg","8C.svg","7S.svg","7H.svg","7D.svg","7C.svg","6S.svg","6H.svg","6D.svg","6C.svg","5S.svg","5H.svg","5D.svg","5C.svg","4S.svg","4H.svg","4D.svg","4C.svg","3S.svg","3H.svg","3D.svg","3C.svg","2S.svg","2H.svg","2D.svg","2C.svg"];
const flipcard = new Audio("sounds/flipcard.mp3");
const win = new Audio("sounds/win.mp3");
const lose = new Audio("sounds/lose.mp3");
const bj = new Audio("sounds/blakjack.mp3");
const but = new Audio("sounds/button.mp3");
win.volume=0.8;
bj.volume = 0.3;

let clicked = false,
    getpara = false,
    bcc = false,
    savemoney = false,
    pcfirstcard= true,
    bahis = 0,
    puan = 0,
    pcpuan = 0,
    pcas = 0,
    as = 0,
    hiddencardreal = null,
    showcardbuyed = false;

    
    para = JSON.parse(localStorage.getItem("paras"));
    showcardprice = JSON.parse(localStorage.getItem("price"));

    if(para== null)
    {
    para=100;
    localStorage.setItem("paras", JSON.stringify(para));
    }

    if(showcardprice == null)
    {
        showcardprice=5000;
        localStorage.setItem("price", JSON.stringify(showcardprice));
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
            enemypuan(enemycards);
            enemypuan(enemycards);
            document.querySelector(".shop").remove();
            getpara = true;
            document.querySelector(".bahis").remove();
            localStorage.setItem("paras", JSON.stringify(para));
            
            flipcard.play();
            if(!clicked){
                cek(cards);
                cek(cards);
                clicked=true;
                document.querySelector(".uyarı").innerHTML = `bahis: $${bahis}`;
                document.querySelector(".money").innerHTML = `para: $${para-bahis}`;
                para -= bahis;
            }

            else
            {
                cek(cards);
            }
        }

    }
    
    else{
        cek(cards);
    }
}

function bitti()
{
    if(clicked)
    {
        if(showcardbuyed==false)
        {
            document.getElementById("hiddencard").src = `poker/${hiddencardreal}`;
        }
        

        while(pcpuan<17)
        {
            pcfirstcard= true;
            enemypuan(enemycards);
        }

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
            document.querySelector(".gelenpara").innerHTML = `+${bahis}`;
        }

        else if(pcpuan > puan)
        {
            lose.play();
            document.querySelector(".sonuc").innerHTML = "KAYBETTİNİZ";
            document.querySelector(".reset").remove();
            document.querySelector(".cardsbutton").remove();
            document.querySelector(".gelenpara").classList.add("gelenpara-");
            if(savemoney)
            {
                para+=bahis/2;
                localStorage.setItem("paras",JSON.stringify(para));
                document.querySelector(".gelenpara").innerHTML = `-${bahis/2} (yarısı korundu)`;
            }

            else
            {
                localStorage.setItem("paras",JSON.stringify(para));
                document.querySelector(".gelenpara").innerHTML = `-${bahis}`;
            }
            document.querySelector(".money").innerHTML = `para: $${para}`;
        }

        else if(pcpuan == puan)
        {
            para += bahis;
            document.querySelector(".money").innerHTML = `para: $${para}`;
            localStorage.setItem("paras",JSON.stringify(para));
            document.querySelector(".sonuc").innerHTML = "BERABERE";
            document.querySelector(".reset").remove();
            document.querySelector(".cardsbutton").remove();
            document.querySelector(".gelenpara").classList.add("gelenpara0");
            win.play();
            document.querySelector(".gelenpara").innerHTML = `+0`;
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

            else
            {
                win.play();
            }
        }
            
        document.querySelector(".gelenpara").innerHTML = `+${bahis}`;
        document.querySelector(".pcpuan").innerHTML = `PC PUANI: ${pcpuan}`;
    }
}

function reset()
{
    localStorage.setItem("paras",JSON.stringify(para));
    window.location.href = "bj.html";
}

function cek(gelen)
{
   const img = document.createElement("img");
   const randomcard = gelen[Math.floor(Math.random() * gelen.length)];
   img.src = `poker/${randomcard}`;
   img.width = 170;
   document.getElementById('cek').appendChild(img);

   if(randomcard[0] == "T" || randomcard[0] == "Q" || randomcard[0] == "J" || randomcard[0] == "K") {
        puan += 10;
    }
    else if(randomcard[0] == "9") puan += 9;
    else if(randomcard[0] == "8") puan += 8;
    else if(randomcard[0] == "7") puan += 7;
    else if(randomcard[0] == "6") puan += 6;
    else if(randomcard[0] == "5") puan += 5;
    else if(randomcard[0] == "4") puan += 4;
    else if(randomcard[0] == "3") puan += 3;
    else if(randomcard[0] == "2") puan += 2;
    else {
        puan += 11;
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
    document.querySelector(".gelenpara").classList.add("gelenpara-");
    
        if(savemoney)
            {
                para+=bahis/2;
                localStorage.setItem("paras",JSON.stringify(para));
                document.querySelector(".gelenpara").innerHTML = `-${bahis/2} (yarısı korundu)`;
            }

            else
            {
                localStorage.setItem("paras",JSON.stringify(para));
                document.querySelector(".gelenpara").innerHTML = `-${bahis}`;
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
            <p class="money2 money">para: $100</p>
            <p class="marketname">MARKET</p>
            <button onclick="closeshop()" class="closebutton">X</button>
        </div>
        <div class="shopelement" style="background: #1c2cba;background: linear-gradient(141deg,rgba(28, 44, 186, 1) 0%, rgba(107, 45, 173, 1) 29%, rgba(40, 156, 90, 1) 60%, rgba(141, 205, 114, 1) 83%, rgba(237, 221, 83, 1) 100%);">
            <div class="shopelementimgdiv"><img src="img/colorchange.png" class="shopelementimg"></div>
            <div class="n-and-d">
                <div class="name">RENK DEĞİŞTİR</div>
                <div class="description">($500) arka plan rengini havalı renklerle değiştirir</div>
            </div>
            <div class="shopbuttondiv"><button onclick="buy(1)" class="shopbutton"><img class="marketimg" src="img/market.png"></button></div>
        </div>

        <div class="shopelement" style="background-color:red">
            <div class="shopelementimgdiv"><img src="img/gift.png" class="shopelementimg"></div>
            <div class="n-and-d">
                <div class="name">HEDİYE</div>
                <div class="description">($500) sana özel rastgele bir hediye verir</div>
            </div>
            <div class="shopbuttondiv"><button onclick="buy(2)" class="shopbutton"><img class="marketimg" src="img/market.png"></button></div>
        </div>

        <div class="shopelement" style="background-color:green">
            <div class="shopelementimgdiv"><img src="img/moneyback.png" class="shopelementimg"></div>
            <div class="n-and-d">
                <div class="name">PARAKURTARAN</div>
                <div class="description">($1000) bu el kaybedersen, kaybettiğin paranın %50 sini geri verir</div>
            </div>
            <div class="shopbuttondiv"><button onclick="buy(3)" class="shopbutton"><img class="marketimg" src="img/market.png"></button></div>
        </div>

        <div class="shopelement" style="background-color:white">
            <div class="shopelementimgdiv"><img style="margin-top:4px" src="img/openingcard.jpg" class="shopelementimg"></div>
            <div class="n-and-d">
                <div class="name">BABY GAMER</div>
                <div class="description buyed">($${showcardprice}) rakibin 2. kartınıda görürsün, aldıkça fiyatı artar</div>
            </div>
            <div class="shopbuttondiv"><button onclick="buy(4)" class="shopbutton"><img class="marketimg" src="img/market.png"></button></div>
        </div>
        
    </div>`;
    document.querySelector(".money2").innerHTML = `para: $${para}`;
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
        document.querySelector(".money2").innerHTML = `para: $${para}`;
        document.body.classList.add("body2");
    }

    else if(girdi ==2 && para>=500)
    {
        para-=500;
        localStorage.setItem("paras",JSON.stringify(para));
        document.querySelector(".money").innerHTML = `para: $${para}`;
        document.querySelector(".money2").innerHTML = `para: $${para}`;
        document.body.innerHTML = '<video class="nggyu" src="vid/nevergonnagiveyouup.mp4" autoplay></video>';
    }

    else if(girdi == 3 && !savemoney && para>=1000)
    {
        para-=1000;
        localStorage.setItem("paras",JSON.stringify(para));
        document.querySelector(".money").innerHTML = `para: $${para}`;
        document.querySelector(".money2").innerHTML = `para: $${para}`;
        savemoney = true;
    }

    else if(girdi == 4 &&  para>=showcardprice)
    {
        para-=showcardprice;
        showcardprice*=2;
        showcardbuyed = true;
        localStorage.setItem("paras",JSON.stringify(para));
        document.querySelector(".buyed").innerHTML = `($${showcardprice}) rakibin 2. kartınıda görürsün, aldıkça fiyatı artar`;
        document.querySelector(".money").innerHTML = `para: $${para}`;
        document.querySelector(".money2").innerHTML = `para: $${para}`;
        localStorage.setItem("price",JSON.stringify(showcardprice));
    }
}

function enemypuan(enemycard)
{

   const imgenemy = document.createElement("img");
   const enemycardss = enemycard[Math.floor(Math.random() * enemycard.length)];
   if(pcfirstcard){
        imgenemy.src = `poker/${enemycardss}`;
        pcfirstcard = false;
   }
   else{
        if(showcardbuyed == false)
        {
        imgenemy.src = `poker/2B.svg`;
        imgenemy.id = "hiddencard";
        hiddencardreal = enemycardss;
        }
        else{
            imgenemy.src = `poker/${enemycardss}`;
            pcfirstcard = false;
        }
    }
   
   imgenemy.classList.add("enemycardspos");
   imgenemy.width = 170;
   document.getElementById('enemyarea').appendChild(imgenemy);

   

   if(enemycardss[0] == "T" || enemycardss[0] == "Q" || enemycardss[0] == "J" || enemycardss[0] == "K")
   {
      pcpuan += 10;
   }
   else if(enemycardss[0] == "9") pcpuan += 9;
   else if(enemycardss[0] == "8") pcpuan += 8;
   else if(enemycardss[0] == "7") pcpuan += 7;
   else if(enemycardss[0] == "6") pcpuan += 6;
   else if(enemycardss[0] == "5") pcpuan += 5;
   else if(enemycardss[0] == "4") pcpuan += 4;
   else if(enemycardss[0] == "3") pcpuan += 3;
   else if(enemycardss[0] == "2") pcpuan += 2;
   else {
      pcpuan += 11;
      pcas++;
   }

   if(pcpuan > 21) {
      while(pcas != 0) {
         pcpuan -= 10;
         pcas--;
      }
   }

}

