import React from "react";
import {useLoader} from "../context/LoaderContext";

export default Loader=()=>{
    const {loading} = useLoader();

    if(!loading) return null;

    return (
        <div className="global-loader">
            <span className="loader-dialog"></span>
        </div>
    )
}