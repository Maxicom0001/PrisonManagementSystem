"use client";

import { useEffect } from "react";
import { useHeader } from "@/components/providers/header-title-provider";

export default function Page(){

    const { setHeader } = useHeader()
    
    useEffect(() => {
      setHeader([{title: "Prisoners", href: "/prisoners"}])
    },[])

    return (
        <>
        </>
    );
}