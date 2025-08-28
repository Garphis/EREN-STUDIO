const cards = ["TS.svg","TH.svg","TD.svg","TC.svg","QS.svg","QH.svg","QD.svg","QC.svg","KS.svg","KH.svg","KD.svg","KC.svg","JS.svg","JH.svg","JD.svg","JC.svg","AS.svg","AH.svg","AD.svg","AC.svg","9S.svg","9H.svg","9D.svg","9C.svg","8S.svg","8H.svg","8D.svg","8C.svg","7S.svg","7H.svg","7D.svg","7C.svg","6S.svg","6H.svg","6D.svg","6C.svg","5S.svg","5H.svg","5D.svg","5C.svg","4S.svg","4H.svg","4D.svg","4C.svg","3S.svg","3H.svg","3D.svg","3C.svg","2S.svg","2H.svg","2D.svg","2C.svg"];
let puan = 0;
let as = 0;

function card()
{
   const img = document.createElement("img");
   const randomcard = cards[Math.floor(Math.random() * cards.length)];
   img.src = `poker/${randomcard}`;
   img.width = 150;
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
    alert(`patladın, toplanan puan:${puan}`);
    as = 0;
    document.querySelector(".reset").remove();
    document.querySelector(".cardsbutton").remove();
    document.querySelector(".sonuc").innerHTML = "KAYBETTİNİZ";
   }

   document.querySelector(".puan").innerHTML = `SENİN PUANIN:${puan}`;
}

function bitti()
{
    let pcpuan = Math.floor(Math.random() * (24 - 15) ) + 15;
    if(pcpuan > 21)
    {
        let pcpuan = Math.floor(Math.random() * (24 - 15) ) + 15;
        if(pcpuan > 21)
        {
            let pcpuan = Math.floor(Math.random() * (24 - 15) ) + 15;
            if(pcpuan > 21)
            {
                let pcpuan = Math.floor(Math.random() * (24 - 15) ) + 15;
            }
        }
    }

    if(pcpuan > 21)
    {
        document.querySelector(".sonuc").innerHTML = "KAZANDINIZ";
        document.querySelector(".reset").remove();
        document.querySelector(".cardsbutton").remove();
    }

    else if(pcpuan > puan)
    {
        document.querySelector(".sonuc").innerHTML = "KAYBETTİNİZ";
        document.querySelector(".reset").remove();
        document.querySelector(".cardsbutton").remove();
    }

    else if(pcpuan == puan){
        document.querySelector(".sonuc").innerHTML = "BERABERE";
        document.querySelector(".reset").remove();
        document.querySelector(".cardsbutton").remove();
    }

    else if(pcpuan < puan)
    {
        document.querySelector(".sonuc").innerHTML = "KAZANDINIZ";
        document.querySelector(".reset").remove();
        document.querySelector(".cardsbutton").remove();
        if(puan == 21)
        {
            document.querySelector(".sonuc").innerHTML = "KAZANDINIZ... BLACKJACK😎😎";
        }
    }

    

    document.querySelector(".pcpuan").innerHTML = `PC PUANI: ${pcpuan}`;
}

function reset()
{
    window.location.href = "bj.html";
}