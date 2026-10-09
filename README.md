# Vexora Discord Bot

Discord.js 14 ile geliştirilmiş, slash komutları kullanan çok amaçlı Discord botu.

## Gereksinimler

- Node.js 20 veya üzeri
- Discord Developer Portal'da oluşturulmuş bir uygulama ve bot

## Kurulum

1. Discord Developer Portal'da bir bot oluşturup bot token'ını ve uygulama ID'sini alın.
2. OAuth2 URL Generator'da `bot` ve `applications.commands` kapsamlarını seçerek botu sunucunuza davet edin. İzinlerde `Manage Roles`, `Ban Members`, `Kick Members`, `Moderate Members`, `Manage Messages` ve `Read Message History` izinlerini seçin.
3. Proje klasöründe `.env.example` dosyasını `.env` olarak kopyalayın. `DISCORD_TOKEN` ve `DISCORD_CLIENT_ID` değerlerini yalnızca `.env` dosyasına yazın; `.env.example` dosyası şablondur.

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

4. Önce slash komutlarını tüm sunucular için global olarak kaydedin, sonra botu başlatın. Kayıt komutu başarılı mesajı vermelidir; global komutların Discord'da görünmesi biraz zaman alabilir.

```sh
npm.cmd install
npm.cmd run commands:register
npm.cmd start
```

Sunucu ayarlarında botun en yüksek rolünü, yöneteceği rollerin üzerine taşıyın.

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `/rol-ver kullanici rol` | Kullanıcıya rol verir |
| `/rol-al kullanici rol` | Kullanıcıdan rol alır |
| `/yasakla kullanici sebep mesaj_saniye` | Kullanıcıyı yasaklar |
| `/yasak-kaldir kullanici_id sebep` | Kullanıcı ID'siyle yasağı kaldırır |
| `/at kullanici sebep` | Kullanıcıyı sunucudan atar |
| `/sustur kullanici dakika sebep` | Kullanıcıyı 1–40320 dakika susturur |
| `/sustur-kaldir kullanici` | Kullanıcının susturmasını kaldırır |
| `/temizle sayi` | Kanaldaki 1–100 mesajı siler |
| `/ping` | Discord API yanıt süresini gösterir |
| `/kullanici-bilgi kullanici` | Kullanıcı bilgilerini gösterir |
| `/sunucu-bilgi` | Sunucu bilgilerini gösterir |
| `/yardim` | Komut listesini gösterir |
