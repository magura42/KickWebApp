// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
    production: false,
    username: 'mharrer',
    password: 'mharrer',
    // username: 'lharrer',
    // password: 'lharrer',
    backendUrl: 'http://localhost:9000/',
    personFotoSize: 102400,
    personFotoSizeLabel: '100kb',
    graphicSize: 102400,
    graphicSizeLabel: '100kb',
    //backendUrl: 'https://kickappserver.herokuapp.com/'
};
