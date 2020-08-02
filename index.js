// import redux from 'redux'; if react application

const redux = require('redux')//this is a simple node js project so we use here require syntex
const reduxLogger = require('redux-logger')
const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applymiddleware = redux.applyMiddleware

const logger=reduxLogger.createLogger()



const BUY_CAKE = 'BUY_CAKE'
const BUY_ICE_CREAM = 'BUY_ICE_CREAM'

function buyCake(){
    return{
    type : BUY_CAKE, //ceated very first action in redux which is buy cake
    info : 'first redux action'
    }
}
function buyIceCream(){
    return{
    type : BUY_ICE_CREAM 
    }
}

//(previousState, action) => newState
//state going to be an object const INITIAL_STATE
// const INITIAL_STATE = {
//     numberOfCake : 10,
//     numberOfIceCream : 20
// }



// const reducer = (state = INITIAL_STATE ,action ) =>     {
//     switch(action.type){
//          case  BUY_CAKE: return{
//             ...state,//asking the reducer to make copy of the state object using spread operator
//             numberOfCake: state.numberOfCake - 1
//         }
//         case BUY_ICE_CREAM: return{
//             ...state,//asking the reducer to make copy of the state object using spread operator
//             numberOfIceCream: state.numberOfIceCream - 1
//         }
//          default: return state
//     }
// }



const INITIAL_CAKE_STATE = {
    NumberOfCake: 10
}
const INITIAL_ICE_CREAM_STATE = {
    NumberOfIceCream: 20
}

const cakeReducer = (state = INITIAL_CAKE_STATE ,action ) =>     {
    switch(action.type){
         case  BUY_CAKE: return{
            ...state,
            NumberOfCake: state.NumberOfCake - 1
        }
         default: return state
    }
}

const icecreamReducer = (state = INITIAL_ICE_CREAM_STATE ,action ) =>     {
    switch(action.type){
         case  BUY_ICE_CREAM: return{
            ...state,
            NumberOfIceCream: state.NumberOfIceCream - 1
        }
         default: return state
    }
}



const rootReducer = combineReducers({
    cake: cakeReducer,
    icecream: icecreamReducer
})
const store = createStore(rootReducer,redux.applyMiddleware(logger)) // code starts here
console.log('initial state', store.getState()) //gives the initial state info
const unsuscribe = store.subscribe(()=> {}) // console.log('updated state', store.getState()) //subscribe the store so set ups the listener
store.dispatch(buyCake())//action call 
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsuscribe()// at the emd we unsubscribe our store