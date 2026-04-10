# Fatura Entegratör - n8n Node Dönüşüm Planı

## Özet

Mevcut `n8n-nodes-kargo-entegrator` paketini `n8n-nodes-fatura-entegrator` olarak dönüştürüyoruz.
Kargo ile ilgili tüm dosyalar temizlenecek, Fatura Entegratör API'sine uygun resource/action yapısı oluşturulacak.

---

## Kaynak Referanslar

| Kaynak | Konum |
|--------|-------|
| Postman Collection | `docs/Fatura Entegratör.postman_collection.json` |
| PHP Client | `docs/gurmeinvoice-php-client-main/` |
| SaaS Backend (Laravel) | `docs/fatura-entegrator-saas-main/` |
| API Routes | `docs/fatura-entegrator-saas-main/routes/api.php` |

---

## Fatura Entegratör API Endpoint Haritası

| Resource | Method | Endpoint | Açıklama |
|----------|--------|----------|----------|
| **Customer** | GET | `/api/customers` | Müşteri listele |
| | GET | `/api/customers/{id}` | Müşteri detay |
| | POST | `/api/customers` | Müşteri oluştur |
| | DELETE | `/api/customers/{id}` | Müşteri sil |
| **Invoice** | GET | `/api/invoices` | Fatura listele (filtreli) |
| | GET | `/api/invoices/{id}` | Fatura detay |
| | POST | `/api/invoices` | Fatura oluştur |
| | DELETE | `/api/invoices/{id}` | Fatura sil |
| **Product** | GET | `/api/products` | Ürün listele |
| | GET | `/api/products/{id}` | Ürün detay |
| | POST | `/api/products` | Ürün oluştur |
| | DELETE | `/api/products/{id}` | Ürün sil |
| **Integration/Invoice** | GET | `/api/integrations/invoice` | Fatura entegrasyonları listele |
| | GET | `/api/integrations/invoice/{id}` | Fatura entegrasyonu detay |
| **Integration/SaleChannel** | GET | `/api/integrations/sale-channel` | Satış kanalları listele |
| | GET | `/api/integrations/sale-channel/{id}` | Satış kanalı detay |
| | POST | `/api/integrations/sale-channel` | Satış kanalı oluştur |


---

## Dosya Yapısı Dönüşümü

### Silinecek Dosyalar (Kargo)

```
credentials/KargoEntegratorApi.credentials.ts
nodes/KargoEntegrator/                          (tüm dizin)
  ├── KargoEntegrator.node.ts
  ├── KargoEntegrator.node.json
  ├── KargoEntegratorTrigger.node.ts
  ├── kargoentegrator.svg
  ├── resources/
  │   ├── shipment.ts
  │   ├── return.ts
  │   ├── cargo.ts
  │   ├── warehouse.ts
  │   └── settings.ts
  └── actions/
      ├── shipment.actions.ts
      ├── return.actions.ts
      ├── cargo.actions.ts
      ├── warehouse.actions.ts
      └── settings.actions.ts
```

### Oluşturulacak Dosyalar (Fatura)

```
credentials/FaturaEntegratorApi.credentials.ts
nodes/FaturaEntegrator/
  ├── FaturaEntegrator.node.ts
  ├── FaturaEntegrator.node.json
  ├── FaturaEntegratorTrigger.node.ts
  ├── faturaentegrator.svg
  ├── resources/
  │   ├── customer.ts
  │   ├── invoice.ts
  │   ├── product.ts
  │   └── integration.ts
  └── actions/
      ├── customer.actions.ts
      ├── invoice.actions.ts
      ├── product.actions.ts
      └── integration.actions.ts
```

### Güncellenecek Dosyalar

```
package.json                  → isim, açıklama, n8n paths, homepage, author, repo
tsconfig.json                 → (varsa path güncellemeleri)
gulpfile.js                   → (varsa icon path güncellemesi)
```

---

## Adım Adım Uygulama Planı

### Adım 1: package.json Güncelleme

- `name`: `n8n-nodes-fatura-entegrator`
- `description`: Fatura Entegratör API entegrasyonu
- `homepage`: `https://faturaentegrator.com`
- `author.name`: `Fatura Entegratör`
- `author.email`: `destek@faturaentegrator.com`
- `repository.url`: güncelle
- `n8n.credentials`: `dist/credentials/FaturaEntegratorApi.credentials.js`
- `n8n.nodes`: `dist/nodes/FaturaEntegrator/FaturaEntegrator.node.js`, `dist/nodes/FaturaEntegrator/FaturaEntegratorTrigger.node.js`

### Adım 2: Credential Dosyası

**`credentials/FaturaEntegratorApi.credentials.ts`**

- `name`: `faturaEntegratorApi`
- `displayName`: `Fatura Entegratör API`
- `baseUrl`: `https://app.faturaentegrator.com/api`
- Auth: Bearer token (mevcut yapı aynı)
- Test endpoint: `/helpers/profile` (veya `/check/auth`)

### Adım 3: Ana Node - Resources

**`nodes/FaturaEntegrator/FaturaEntegrator.node.ts`**

Resources:
1. **Customer** (`customer`) - Müşteri yönetimi
2. **Invoice** (`invoice`) - Fatura yönetimi
3. **Product** (`product`) - Ürün yönetimi
4. **Integration** (`integration`) - Entegrasyon yönetimi (Invoice + SaleChannel)


Load Options:
- `getSaleChannels` → `/api/integrations/sale-channel` (fatura oluştururken gerekli)
- `getInvoiceIntegrations` → `/api/integrations/invoice` (fatura oluştururken gerekli)

### Adım 4: Resource Dosyaları

#### 4.1 Customer Resource (`resources/customer.ts`)

Operations: Create, Get, Get Many, Delete

Create alanları (Postman'den):
- `tax_number` (string, zorunlu)
- `tax_office` (string)
- `title` (string)
- `name` (string, zorunlu)
- `surname` (string, zorunlu)
- `phone` (string)
- `email` (string)
- `address` (string)
- `district` (string)
- `city` (string)
- `country` (string, default: TÜRKİYE)
- `postcode` (string)
- `type` (options: person/company)
- `iban` (string)

#### 4.2 Invoice Resource (`resources/invoice.ts`)

Operations: Create, Get, Get Many, Delete

Create alanları (Postman'den):
- `sale_channel_id` (loadOptions: getSaleChannels)
- `invoice_integration_id` (loadOptions: getInvoiceIntegrations)
- `type` (options: SATIS, IADE, TEVKIFAT, TEVKIFATIADE, ISTISNA, OZELMATRAH, IHRACKAYITLI, KONAKLAMAVERGISI)
- `order_id` (string)
- `order_d_id` (string)
- `order_created_at` (date)
- `currency` (options: TRY, USD, EUR, GBP...)
- `currency_rate` (number, default: 1)
- `issue_date` (date)
- `issue_time` (string, HH:mm)
- `waybill_number` (string)
- `waybill_date` (date)
- `cash_sale` (boolean)
- `due_date` (date)
- `payment_date` (date)
- `callback_url` (string)
- `customer` (fixedCollection - id veya inline müşteri bilgileri)
- `lines` (fixedCollection, multipleValues: true)
  - `id` (number)
  - `name` (string, zorunlu)
  - `description` (string)
  - `sku` (string)
  - `quantity` (number, zorunlu)
  - `unit` (options: C62, DAY, MON, KGM, LTR, MTR, PA, BX, SET...)
  - `unit_price` (number, zorunlu)
  - `discount_type` (options: amount, percentage)
  - `discount` (number)
  - `tax_rate` (options: 0, 1, 8, 10, 18, 20)
  - `extra_taxes` (fixedCollection, opsiyonel)
- `is_internet_sale` (boolean)
- `internet_sale` (fixedCollection, is_internet_sale=true ise)
  - `web_address` (string)
  - `payment_method` (options: credit_or_debit, direct_transfer, cash_on_delivery, payment_agent, other)
  - `payment_platform` (string)
  - `payment_date` (date)
- `is_need_shipment` (boolean)
- `shipment` (fixedCollection, is_need_shipment=true ise)
  - `company_title` (string)
  - `company_tax_number` (string)
  - `courier_name` (string)
  - `courier_tax_number` (string)
  - `delivery_date` (date)

Get Many filtreleme desteği:
- Postman'deki `filters[$or][0][receiver][name][$eq]=...` formatı

#### 4.3 Product Resource (`resources/product.ts`)

Operations: Create, Get, Get Many, Delete

Create alanları:
- `name` (string, zorunlu)
- `sku` (string)
- `quantity` (number)
- `unit` (options: C62, DAY, MON, KGM, LTR, MTR, PA, BX, SET...)
- `tax_rate` (options: 0, 1, 8, 10, 18, 20)
- `unit_price` (number, zorunlu)

#### 4.4 Integration Resource (`resources/integration.ts`)

Sub-resources:
- **Invoice Integration**: Get, Get Many
- **Sale Channel**: Create, Get, Get Many

Sale Channel Create alanları:
- `sale_channel` (string, örn: "odoo", "shopify", "api")
- `is_test` (boolean)
- `settings` (json)

### Adım 5: Action Dosyaları

Her resource için ilgili HTTP çağrılarını yapan action dosyaları:
- `customer.actions.ts` → CRUD for `/api/customers`
- `invoice.actions.ts` → CRUD for `/api/invoices`
- `product.actions.ts` → CRUD for `/api/products`
- `integration.actions.ts` → GET/POST for `/api/integrations/invoice` ve `/api/integrations/sale-channel`

### Adım 6: Trigger Node

**`nodes/FaturaEntegrator/FaturaEntegratorTrigger.node.ts`**

- Webhook tabanlı trigger (callback_url üzerinden fatura durumu değişikliği)
- Fatura oluştururken `callback_url` parametresi ile webhook URL'si gönderiliyor
- Trigger, fatura durumu değiştiğinde (completed, failed, vb.) tetiklenir

### Adım 7: Node JSON Metadata

**`nodes/FaturaEntegrator/FaturaEntegrator.node.json`**

- displayName, name, icon, description güncelle

### Adım 8: Icon

- `faturaentegrator.svg` dosyası oluştur/ekle

### Adım 9: Kargo Dosyalarını Temizle

- `credentials/KargoEntegratorApi.credentials.ts` sil
- `nodes/KargoEntegrator/` dizinini tamamen sil

### Adım 10: Build & Test

- `npm run build` ile derleme kontrolü
- `npm run lint` ile lint kontrolü

---

## Enum Değerleri Referansı (PHP Client'tan)

### Invoice Type
`SATIS`, `IADE`, `TEVKIFAT`, `TEVKIFATIADE`, `ISTISNA`, `OZELMATRAH`, `IHRACKAYITLI`, `KONAKLAMAVERGISI`

### Customer Type
`person` (Gerçek Kişi), `company` (Tüzel Kişi)

### KDV (Tax Rate)
`0`, `1`, `8`, `10`, `18`, `20`

### Product Unit
`C62` (Adet), `DAY` (Gün), `MON` (Ay), `ANN` (Yıl), `HUR` (Saat), `KGM` (kg), `LTR` (lt), `MTR` (m), `PA` (Paket), `BX` (Kutu), `SET` (Set), ...

### Currency (Sık Kullanılanlar)
`TRY`, `USD`, `EUR`, `GBP`

### Payment Method
`credit_or_debit`, `direct_transfer`, `cash_on_delivery`, `payment_agent`, `other`

### Discount Type
`percentage`, `amount`

---

## Notlar

- Base URL: `https://app.faturaentegrator.com/api` (live), `https://staging.faturaentegrator.com/api` (test)
- Auth: Bearer token, tüm isteklerde `Authorization: Bearer {api_key}` header'ı
- Fatura oluşturma en karmaşık endpoint - nested customer, lines, internet_sale, shipment objeleri var
- `sale_channel_id` ve `invoice_integration_id` fatura oluştururken zorunlu, loadOptions ile dinamik yüklenecek
- Filtreleme desteği: `filters[$or][0][field][$eq]=value` formatında query string
