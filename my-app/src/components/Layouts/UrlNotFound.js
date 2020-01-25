import React from 'react'
import {Link} from "react-router-dom"

const Urlnotfound = () => {
    return (
        <div style={{
            marginTop:"5em",
            fontSize:50,
            textAlign:"center"
        }}>
            404 Page not Found. Go back to  <Link to="/">Starting Page</Link>
        </div>
    )
}

export default Urlnotfound