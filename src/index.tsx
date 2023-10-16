import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { Provider } from 'react-redux'
import store from '../src/redux/store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

// Colocar sua apiKey aqui
const apiKey = 'temp_ffdbc54aff9d14658e081fcd1b2d8ac0'


const httpLink = createHttpLink({
  uri: 'https://proxy.cors.sh/https://dropmail.me/api/graphql/web-test-20231015Np0EX',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'x-cors-api-key': apiKey,
  },
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
)
