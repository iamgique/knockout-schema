# Knockout schema
This project is doing for open registration and look up Knockout schema.

# How to run on local
```
$ npm install
$ npm start
```

## Live
[Knockout Schema](https://ai-fighter.web.app)

# How to deploy
This project use firebase and realtime-db

```
$ firebase deploy
```

or lookup in package.json to use enverionment

```
$ npm run build:dev
$ npm run build:prod

"build:dev":"env-cmd -f .env.development npm run build && firebase deploy -P dev",
"build:prod":"env-cmd -f .env.production npm run build && firebase deploy -P prod"
```

if you use env don't forget to add env to firebase by following command below
```
$ firebase use -add
dev and prod
```

