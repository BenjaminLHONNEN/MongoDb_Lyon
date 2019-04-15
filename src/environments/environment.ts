// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
         production: false,
         UrlApi: 'http://localhost:4040/api',
         mapbox: {
           accessToken:
             // "pk.eyJ1IjoiYmFwdGR1IiwiYSI6ImNqdHg4cjVzajI4cmM0ZGxsbXp2OGJwMWkifQ.XjcxMyGNEcB9QjXnu98yyg"
             'pk.eyJ1IjoiYmVuamFtaW5saG9ubmVuIiwiYSI6ImNqbm13c3cxajFydTgzdnRhNDNxdzI0YXEifQ.a8GzbpfNT1G85ZuoEqj7qQ'
         }
       };
