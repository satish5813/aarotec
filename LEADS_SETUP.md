# Lead capture → Google Sheet (5-minute setup)

The contact form posts to `/api/lead`, which forwards each lead to a Google
Sheet via a Google Apps Script Web App. Follow these steps once.

## 1. Create the Sheet

1. Go to <https://sheets.google.com> and create a new spreadsheet, e.g. **"Aarohana Leads"**.
2. In row 1, add these headers (exact order):

   | Timestamp | Name | Email | Phone | City | Interest | Product | Message | Source |
   |-----------|------|-------|-------|------|----------|---------|---------|--------|

   *Interest* is `smart-home` for the main site form, and `power`, `furniture`
   or `both` for enquiries from the Power Backup and Furniture pages. *Product*
   and *Message* are filled by those pages when a visitor enquires about a
   specific piece or unit.

## 2. Add the Apps Script

1. In the Sheet: **Extensions → Apps Script**.
2. Delete any sample code and paste this:

   ```js
   function doPost(e) {
     try {
       var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
       var data = JSON.parse(e.postData.contents);
       sheet.appendRow([
         new Date(),
         data.name || "",
         data.email || "",
         data.phone || "",
         data.city || "",
         data.interest || "smart-home",
         data.product || "",
         data.message || "",
         data.source || "",
       ]);
       return ContentService
         .createTextOutput(JSON.stringify({ ok: true }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (err) {
       return ContentService
         .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }
   ```

3. Click **Save**.

## 3. Deploy as a Web App

1. **Deploy → New deployment**.
2. Click the gear → choose **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** **Anyone**  ← important, the server calls it anonymously
4. **Deploy**, authorize when prompted, and **copy the Web app URL**
   (looks like `https://script.google.com/macros/s/AKfy.../exec`).

## 4. Wire it up

Add the URL to your environment:

- **Local:** in `.env.local`, uncomment and set
  `LEADS_WEBHOOK_URL=https://script.google.com/macros/s/AKfy.../exec`
  then restart `npm run dev`.
- **Vercel:** Project → Settings → Environment Variables → add
  `LEADS_WEBHOOK_URL` (and `NEXT_PUBLIC_SITE_URL` = your domain), then redeploy.

## 5. Test

Submit the contact form. A new row should appear in the Sheet within a few
seconds. If it doesn't, check the Vercel/function logs — the route logs a
clear error and the form shows a fallback message with the phone number.

> **Note:** every time you change the Apps Script code you must create a
> **new deployment** (or "Manage deployments → edit → new version") for the
> change to take effect.
