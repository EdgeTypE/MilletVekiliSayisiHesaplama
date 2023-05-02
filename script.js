 document.getElementById("myForm").addEventListener("submit", function(event){
    event.preventDefault()
  })
    window.onload = function () {
    var hesaplabutonu = document.querySelector(".btn-primary");
    hesaplabutonu.addEventListener("click", hesapla);
  };

  var ekranbutton = document.getElementById("screenshot");



  // Butona tıklandığında fonksiyon çalıştır
  ekranbutton.addEventListener("click", function() {
    // Sayfanın tamamının ekran görüntüsünü al
    html2canvas(document.body, {
      onrendered: function(canvas) {
        // Ekran görüntüsünün verisini al
        var data = canvas.toDataURL();
        // Veriyi bir bağlantıya dönüştür
        var link = document.createElement("a");
        link.href = data;
        // Bağlantıya bir isim ver
        link.download = "ekran-goruntusu.png";
        // Bağlantıyı tıkla
        link.click();
      }
    });
  });

  var iller = document.getElementById ("iller");
  iller.onchange = function () {
    // Seçilen ilin milletvekili sayısını al
    var mv = iller.value;
    // Milletvekili sayısını mvsayisi değişkenine ata
    mvsayisi = mv;
  };
  function hesapla () {
    sonuclar.style.visibility = "visible";
    Tmillet.style.visibility = "visible";
    Amillet.style.visibility = "visible";
    Cmillet.style.visibility = "visible";
    Emillet.style.visibility = "visible";
    // Belirli bir seçiciye uyan tüm giriş alanlarını seç
    var partiler = document.querySelectorAll ("input[type=number]");
    // Giriş alanları üzerinde döngü ile gezin
    for (var i = 0; i < partiler.length; i++) {
      // Giriş alanının değerini sayıya dönüştür
      var oy = parseFloat (partiler[i].value);
      // Seçim barajını kontrol et
      //if (oy < 7) {
      if (oy < 7 && !partiler[i].name.includes("İYİ") && !partiler[i].name.includes("Milliyetçi") && !partiler[i].name.includes("Büyük") && !partiler[i].name.includes("Refah") && !partiler[i].name.includes("İşçi")) {
        // Parti barajı geçemediyse oy oranını 0 yap
        partiler[i].value = 0;
        oy = 0;
      }
    }
    // Milletvekili sayısını belirle
    //var mvsayisi = 10; // Örnek olarak 10 alındı
    // Partilere ayrılan milletvekili sayısını tutacak bir liste oluştur
    var mvlistesi = [];
    // Partiler listesi üzerinde döngü ile gezin
    for (var i = 0; i < partiler.length; i++) {
      // Her partiye başlangıçta 0 milletvekili ver
      mvlistesi.push (0);
    }
    // Milletvekili sayısı kadar döngü yap

    for (var i = 0; i < mvsayisi; i++) {
      // En yüksek N değerini ve hangi partiye ait olduğunu tutacak değişkenler oluştur
      var enyuksekN = -1;
      var enyuksekindex = -1;
      // Partiler listesi üzerinde döngü ile gezin
      for (var j = 0; j < partiler.length; j++) {
        // Partinin toplam oy sayısını al
        var V = parseFloat (partiler[j].value);
        // Partinin ayrılan milletvekili sayısını al
        var s = mvlistesi[j];
        // Partinin N değerini hesapla
        var N = V / (s+1);
        // Eğer N değeri en yüksek N değerinden büyükse
        if (N > enyuksekN) {
          // En yüksek N değerini ve indexini güncelle
          enyuksekN = N;
          enyuksekindex = j;
        }
      }
      // En yüksek N değerine sahip olan partiye bir milletvekili ver
      mvlistesi[enyuksekindex]++;
    }

    var sonuc = "";
    for (var i = 0; i < partiler.length; i++) {
      sonuc += partiler[i].id + ": " + mvlistesi[i] + "<br>";
    }
      sonuc = sonuc.split("<br>").filter(function(e) { return e != "" }).sort(function(a,b) { return b.split(":")[1] - a.split(":")[1] }).join("<br>");
      var millet_toplam = "Millet İttifakı: " + (mvlistesi[0] + mvlistesi[1]);
      var cumhur_toplam = "Cumhur İttifakı: " + (mvlistesi[4] + mvlistesi[5] + mvlistesi[6] + mvlistesi[7]);
      var ata_toplam = "Ata İttifakı: " + (mvlistesi[8] + mvlistesi[9]);
      var emek_toplam = "Emek ve Özgürlük İttifakı: " + (mvlistesi[2] + mvlistesi[3]);
      document.getElementById("sonuclar").innerHTML = sonuc;
      document.getElementById("Tmillet").innerHTML = millet_toplam;
      document.getElementById("Cmillet").innerHTML = cumhur_toplam;
      document.getElementById("Amillet").innerHTML = ata_toplam;
      document.getElementById("Emillet").innerHTML = emek_toplam;


    
