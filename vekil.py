#Kod hatalı olabilir. %100 güvenmeyin.
parti_sayisi = int(input("Kaç parti var?"))
partiler = []
oylar = []
for i in range(parti_sayisi):
    parti = input("Partinin adı giriniz:")
    oy = int(input("Partinin aldığı oy yüzdesini giriniz:"))
    partiler.append(parti)
    oylar.append(oy)

mv_sayisi = int(input("İlden çıkacak milletvekili sayısını giriniz:"))

baraj = 0.07 # 1=100 0.07=7

toplam_oy = sum(oylar)
for i in range(len(partiler)):
    oy_orani = oylar[i] / toplam_oy
    if oy_orani < baraj:
        partiler[i] = None
        oylar[i] = 0

paylar = []
for i in range(mv_sayisi):
    for j in range(len(partiler)):
        if partiler[j] != None:
            pay = oylar[j] / (i + 1)
            paylar.append((pay, partiler[j]))

paylar.sort(reverse=True)

mv_dagilimi = {}
for i in range(mv_sayisi):
    (pay, parti) = paylar[i]
    mv_dagilimi[parti] = mv_dagilimi.get(parti, 0) + 1

print(mv_dagilimi)
