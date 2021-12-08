export const SERVER_1 = process.env.REACT_APP_NODE_ENV !== 'production' ?
'http://localhost:' + process.env.REACT_APP_LOCAL_PS
: 'http://' + process.env.REACT_APP_PROD_PS

export const SERVER_2 = process.env.REACT_APP_NODE_ENV !== 'production' ?
'http://localhost:' + process.env.REACT_APP_LOCAL_PS_R1
: 'http://' + process.env.REACT_APP_PROD_PS_R1

export const SERVER_3 = process.env.REACT_APP_NODE_ENV !== 'production' ?
'http://localhost:' + process.env.REACT_APP_LOCAL_PS_R2
: 'http://' + process.env.REACT_APP_PROD_PS_R2