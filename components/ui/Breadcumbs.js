import { Breadcrumbs } from "@mui/material";
import Link from "next/link";
import React from "react";

  //parte de los breadcrumbs
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

export default function BreadCrumbs(){

    return(
        <>
         <div role="presentation" onClick={handleClick}>
                <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/home">
                Inicio
                </Link>
                <Link
                underline="hover"
                color="inherit"
                href="/products"
                >
                Productos
                </Link>
                
                <Link
                underline="hover"
                color="inherit"
                href="/inventory"
                >
                Inventario
                </Link>
            </Breadcrumbs>
          </div>
      </>
    )
}