# Partiler ve ittifaklar
partiler = ["Adalet Partisi", "Zafer Partisi", "CHP", "İYİ Parti", "BBP", "AK Parti", "YRP", "MHP", "YSP", "TİP", "TKP", "TKH", "SOL", "Millet Partisi", "Hak ve Özgürlükler Partisi", "Genç Parti", "Memleket Partisi", "Büyük Türkiye Partisi", "Adalet Birlik Partisi", "Anavatan Partisi", "Yenilik Partisi", "Halkın Kurtuluş Partisi", "Milli Yol Partisi", "Vatan Partisi", "Güç Birliği Partisi", "Bağımsız Türkiye Partisi"]
ittifaklar = {"Ata İttifakı": ["Adalet Partisi", "Zafer Partisi"], 
              "Millet İttifakı": ["CHP", "İYİ Parti"], 
              "Cumhur İttifakı": ["BBP", "AK Parti", "YRP", "MHP"], 
              "Emek ve Özgürlük İttifakı": ["YSP", "TİP"], 
              "Sosyalist Güç Birliği İttifakı": ["TKP", "TKH", "SOL"]}

# Oy oranlarını tutacak bir sözlük
oy_oranlari = {}

# İttifak çatısı altındaki partilerin oy oranlarını sor
for ittifak in ittifaklar:
  print(f"{ittifak} çatısı altında giren partilerin oy oranları:")
  for parti in ittifaklar[ittifak]:
    oy = float(input(f"{parti}: "))
    oy_oranlari[parti] = oy

# İttifak çatısı altında girmeyen partilerin oy oranlarını sor
print("İttifak çatısı altında girmeyen partilerin oy oranları:")
for parti in partiler:
  if parti not in oy_oranlari: # Daha önce sorulmamışsa
    oy = float(input(f"{parti}: "))
    oy_oranlari[parti] = oy

# %7'nin altında oy alan veya ittifakta %7'nin altında kalan partileri listeden çıkart
sonuc = {}
for parti in oy_oranlari:
  if oy_oranlari[parti] >= 7: # %7'nin üzerinde oy almışsa
    sonuc[parti] = oy_oranlari[parti]
  else: # %7'nin altında oy almışsa
    for ittifak in ittifaklar: # Hangi ittifaka dahil olduğunu bul
      if parti in ittifaklar[ittifak]:
        toplam_oy = sum(oy_oranlari[p] for p in ittifaklar[ittifak]) # İttifakın toplam oyunu hesapla
        if toplam_oy >= 7: # İttifak %7'nin üzerinde ise
          sonuc[parti] = oy_oranlari[parti] # Sonuca ekle
        break # İttifak aramayı bırak

# Sonucu ekrana yazdır
print("Sonuç:")
for parti in sonuc:
  print(f"{parti}: {sonuc[parti]}%")


# Milletvekili sayısını sor
mv_sayisi = int(input("İlden çıkacak milletvekili sayısını giriniz:"))

# D'Hondt sistemi ile milletvekili sayılarını hesapla
paylar = []
for i in range(mv_sayisi):
  for parti in sonuc:
    pay = sonuc[parti] / (i + 1)
    paylar.append((pay, parti))

paylar.sort(reverse=True)

mv_dagilimi = {}
for i in range(mv_sayisi):
  (pay, parti) = paylar[i]
  mv_dagilimi[parti] = mv_dagilimi.get(parti, 0) + 1

# Milletvekili dağılımını ekrana yazdır
print("Milletvekili dağılımı:")
for parti in mv_dagilimi:
  print(f"{parti}: {mv_dagilimi[parti]}")
