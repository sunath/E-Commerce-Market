import React from "react";
import { useMemo } from "react"
import { useLocation } from "react-router-dom"


export  const useQueryParms = () => {
    const {search} = useLocation()

    return useMemo(() => new URLSearchParams(search), [search]);

}