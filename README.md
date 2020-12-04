# blockcovid-pwa

## Tester les notifications
Les variables d'environnement sont déjà placées dans le fichier .env donc vous ne devez rien changer.
1. Lancez l'application en exécutant la commande suivante à la racine du projet.
```
npm run serve
```
1. Rendez-vous à l'adresse localhost qui s'affiche dans la console (habituellement [http://localhost:8080/](http://localhost:8080/)).
2. L'application devrait vous demander l'autorisation d'afficher des notifications, cliquez sur "Autoriser".
3. Lancez votre testeur d'API, si vous n'en avez pas, vous pouvez utiliser [Postman](https://www.postman.com/) ou [Insomnia Core](https://insomnia.rest/). La suite des étapes considère que vous utilisez Postman.
4. Cliquez sur "+ New", puis "Request", puis donnez un nom à la requête (le nom n'a pas d'importance).
5. Créez une collection en cliquant sur "+ Create Collection" et en remplissant le champ, ou cliquez sur une collection déjà existante dans la liste. Cliquez sur le bouton de sauvegarde.
6. Passez la méthode de GET à POST, puis collez cette url.
```
https://fcm.googleapis.com/v1/projects/blockcovid-b739c/messages:send
```
8. Téléchargez ce repo: https://github.com/RagePeanut/access-token-extractor
9. Ajoutez-y un fichier service-account.json avec ce contenu.
```json
{
  "type": "service_account",
  "project_id": "blockcovid-b739c",
  "private_key_id": "e9d5aedded5dd7268716280d14b7fb1ee492a1cd",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDShtAD0b+MbMet\nE5L2hktSV4ucsi592Xrk9b86D59nKN5JVUKC3li4OqBktZ3vnclr1MWPF2OCWGtW\nY8mGEdZ1KYZ2gJKfQgvkn3Dkhi3hhoZzqHXAeUv3AFtQEWeYs7n6asqR8TsXtAnn\nBM4dR8ah6GRcsEEok7ntQMjknB+GmfV/YUz57MAad38eSBFLf/Slf7JVUCHjdXEc\nrvNo2yIZxL4B/7Vr4KA14+WY7k+QqbGA+UQ/o9S3W312aTuuFdVJQ4idRCxffGJA\na053ndZmgkKAyya026XD1uB93IdIHD93ohkSQqU88xfS4v/7dr7M6eoF9B08na9Y\nm6NjPoJLAgMBAAECggEAKTyY4Dakg3gHQKKV5c32UQGu6hmIu8Puq4xrUY8f1RAP\nQmP97C5rSGLLag6dCgNpIcMCk32sUyrIk5pmLemujTJ+ERYsIh/IvpZwgYK61/MG\nwP7dWb8onxAl0rAmD6Ycpq1mUmHjBkiQq/yn9tpJUQt5JSKtEKqm/47yCr19+1ov\n2ZP7ac8/VTTW/CY3vXLHKUmt8mfMv/JWPAdsjj8UjENfWJ2PI6WN+vy4V0JwXiRT\nh+IvNtz4gjesxHyutCi8ZC876bMUgLRcrzYJfLhPCWwITRutp8PuW7wflbTNoTVb\nkUsBEW5TCyaFDQTjRwofv7WXUusltN4yWC2tfb11qQKBgQDwHOGQFXzoN5Anx62O\nKn6K+gb7iWCXLOr8HYVg+2m4VztfbuXaf/68FDS8W6ocW+hweDPA2UfZaRYlYk6R\nraSmwjrcOeOFBPxWA6Gq02XuEQTE+u5CLOYe39bGUZvsTvv9hSU382i14LqjuFVU\nJX2O5vVABtw5+HDwVqNd+4tLDQKBgQDgdMoaYuDQW+kShHeJGS2DWrAwYiqgwSDm\nBc9cbiDZoTHPctYOWUCa1SbEz15U+hIWQPRviUtsDloatnIlui0q1vhmA1C8VlCj\nFwW7RyvjHUqQJXEmHNZGWAkMy4EXnNVCRfSBoLpgcaCbwiFWpL9l/Dl8BOg2i5cd\nSaRmcPRMtwKBgQDaA08m1OvZqQGBrQK/b4QASe5nGyARg15E1cUR/pTKJKIrD3Uy\nBD9Vo/8R+ySkpSqSXAGZm29qTskl3nG6QfCa3QY2iXU0hQdcTeXPRixpkRhEhhYp\nDb1P0SugW974G+sfEHJvr9mmMkskdi07vuKXCsspfFEfbZ2WCwRARDIATQKBgQCS\nSItPFxIduUj1YI/nMhmPehNJ9TCDBFtEjpTOUJfoPj4QTW9kepa4UiKqMdvw1enj\nxwGHj5swGUpwDmfmXqgBO4k4MwDzPe3f3KlHnOLlabmmqEBN7o1X2xhK1naTxQrX\n3m+z6+SL5oIeAS9pIIX9GZz9TtVodyFNXSlf+k29kQKBgQCtqmvTPs8+6eoqPlgc\n0EbmuRmHyIIg+qYj7pHsn1XE0AQ89XUpSgT0aOtXtxnDAzDznHD7hiNjcR7H2LW+\n6klJJh1P5NDGgyt204dVIvYJdITPSwvrfnqA4CRYzSYhs6Yn3GnaIBwXBq/6BlFz\nuxCEpVbjkvsrJQ9H6S0xdJkfUg==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-pnpt4@blockcovid-b739c.iam.gserviceaccount.com",
  "client_id": "114644024798183680682",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pnpt4%40blockcovid-b739c.iam.gserviceaccount.com"
}
```
10. Tapez les commandes suivantes dans la console.
```
npm install
npm run start
```
11.  Copiez l'access token affichée.
12.  Dans Postman, cliquez sur l'onglet "Authorization", sélectionnez le type "Bearer Token" et collez l'access token que vous venez de copier dans le champ "Token".
13.  Cliquez sur l'onglet "Body", cochez "raw" puis sélectionnez "JSON" (à la place du "Text" mis par défaut).
14.  Le body à coller pour faire les tests est le suivant.
```json
{
  "message": {
	"token": "TOKEN",
	"notification": {
  	  "body": "Ping?",
      "title": "Hello world!"
	}
  }
}
```
15. Retournez dans la PWA, ouvrez la console et copiez la token qui y est affichée ("New token created: TOKEN").
15. Dans le body que vous avez collé dans Postman, remplacez TOKEN que vous venez de copier.
16. Cliquez sur "Send", vous devriez recevoir une notification.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
