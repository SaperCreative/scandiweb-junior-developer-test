
# scandiweb-junior-developer-test

For proper usage of this project you need to clone GraphQL from this [link](https://github.com/scandiweb/junior-react-endpoint).

## [Project preview](https://heroku-ascandi-app.herokuapp.com)


# Create project

### Installation

```
$ npm
```
### Start

```
$ npm start
```
### Build

```
$ npm build
```
### Notes

If you want to change GraphQL uri you need to find:

```
export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphgl',
  cache: new InMemoryCache(),
});;
```

in ./src/index.js




