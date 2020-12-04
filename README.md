# blockcovid-pwa

## Tester les notifications
Les variables d'environnement sont déjà placées dans le fichier .env donc vous ne devez rien changer.
1. Lancez l'application en exécutant la commande suivante à la racine du projet
```
npm run serve
```
2. Rendez-vous à l'adresse localhost qui s'affiche dans la console
3. L'application devrait vous demander l'autorisation d'afficher des notifications, cliquez sur "Autoriser"
4. Lancez votre testeur d'API, si vous n'en avez pas, vous pouvez utiliser [Postman](https://www.postman.com/) ou [Insomnia Core](https://insomnia.rest/). La suite des étapes considère que vous utilisez Postman. Si vous savez utiliser Postman, sautez à l'étape X
5. Cliquez sur "+ New", puis "Request", puis donnez un nom à la requête (le nom n'a pas d'importance)
6. Créez une collection en cliquant sur "+ Create Collection" et en remplissant le champ, ou cliquez sur une collection déjà existante dans la liste
7. Passez la méthode de GET à POST, puis collez cette url
```
https://fcm.googleapis.com/v1/projects/blockcovid-b739c/messages:send
```
8. Dans l'onglet "Authorization", sélectionnez le type "Bearer Token" et collez ceci dans le champ de la token
```
ya29.c.Kp0B6Acf4Kvusql0nvX0TxWJAlU__S9PHk7iCkpu10pHBWq0CB59YSF4Yo0jzy6mrvnhwTnFnCclNDbFyjUre7MY6yVdus18x9-OSVOj-ptu06Py4_TVCemwYMJfTPT_el7dZTW_r5SRPKVq3LGkLkAX85-KxKrqQSQHWLyDZubkdwoD1FuNhlmhrYMpRdy2eq5DZV10YLlqmBvt5SKPjQ
```
9. Dans l'onglet "Body", cochez "raw" puis sélectionnez "JSON" (à la place du "Text" mis par défaut)
10. Le body à coller pour faire les tests est le suivant
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
11. Remplacez TOKEN par la token qui devrait être affichée dans la console de l'application ("New token created: TOKEN")
12. Cliquez sur "Send"
13. Si l'application était active, la notification s'affichera dans la console
14. Sinon, une notification sera affichée par votre navigateur

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
