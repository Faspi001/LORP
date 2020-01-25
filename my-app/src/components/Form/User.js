import React from "react"
import  {useSelector, useDispatch} from "react-redux"



function User() {
    const state = useSelector(state => state.auth)
    const errors = useSelector(state => state.errors)
    const test = useSelector(state => state.test)
    const dispatch = useDispatch();
    console.log(test)
    console.log(errors)
    console.log(state)

    const changeNameTo = () =>{
        dispatch({
            type: "TEST"
        })
    }

    return <div>HALLOOO???<button onClick={changeNameTo}>Name: {test.test}</button></div>
}

export default User;