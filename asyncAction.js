const redux = require('redux')
const thunkMiddleWare= require('redux-thunk').default
const axios=require('axios')
const createStore = redux.createStore
const applyMiddleWare = redux.applyMiddleware

const initial_state = {
    loading: false,
    users: [],
    error: ''
}
const FETCHING_USERS_REQUEST = 'FETCHING_USERS_REQUEST'
const FETCHING_USERS_SUCCESS = 'FETCHING_USERS_SUCCESS'
const FETCHING_USERS_FAILURE = 'FETCHING_USERS_FAILURE'

const fetching_users_request = () => {
    return{
        type: FETCHING_USERS_REQUEST
    }  
}
const fetching_users_success = users => {
    return{
      type: FETCHING_USERS_SUCCESS  ,
      payload: users
    }  
}
const fetching_users_failure = error => {
    return {
            type: FETCHING_USERS_FAILURE,
            payload: error
    }
}

const reducer = (state=initial_state,action) => {
    switch(action.type){
        case FETCHING_USERS_REQUEST:
            return{
                ...state,
                loading: true
            }
         
        case FETCHING_USERS_SUCCESS:
            return{
                loading: false,
                users:action.payload,
                error:''
            }
            
        case FETCHING_USERS_FAILURE:
            return{
                loading:false,
                users:[],
                error:action.payload
            }
    }
}
const fetchUser = () =>{
    return function(dispatch){
        dispatch(fetching_users_request())
        axios.get('https://jsonplaceholder.typicode.com/users').then (response =>{
            //response.data is an array user
            const users=response.data.map(user=>user.id)
            dispatch(fetching_users_success(users))
        }).catch(error =>{
            //error.message is the error discrption
            dispatch(fetching_users_failure(error.message))
        })
    }
}

const store =createStore(reducer,applyMiddleWare(thunkMiddleWare))  

store.subscribe(() =>{console.log(store.getState())})

store.dispatch(fetchUser())
