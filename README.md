# Genel Mimari: 
## Bu uygulama, birden fazla internet sitesi için şablon olarak kullanılır. 
## Her projesinin dosyaları aws de kendi ismiyle oluşturulmuş klasör altında tutulur.
## Her projesinin değişkenleri ve parametreleri postgresql'de ve env dosyasında tutulur

# Yeni Websitesi Eklerken;
## Yeni proje vercel içerisinde yaratılıp article git reposu bağlandıktan sonra env verisi olarak çalışan eski bir projenin verileri girilip ilk yükleme yapılır. Daha sonra mevcut proje için env verileri güncellenir.
## Sitenin özel alanları db ve env dosyalarına eklenir
## db'deki article_project_auto_generate_files tablosuna colors.scss dosyasında $color ile başlayan parametreler güncellenerek sitede kullanılacak renkler belirlenir.