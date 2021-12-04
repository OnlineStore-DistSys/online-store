export const MB = process.env.REACT_APP_NODE_ENV !== 'production' ?
  'http://localhost:' + process.env.REACT_APP_LOCAL_MESSAGEBROKER
  : 'http://' + process.env.REACT_APP_PROD_MB

  export const SERVER_1 = process.env.REACT_APP_NODE_ENV !== 'production' ?
  'http://localhost:' + process.env.REACT_APP_LOCAL_PS
  : 'http://' + process.env.REACT_APP_PROD_PS