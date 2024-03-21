import Image from "next/image";
import React from "react";
import img from './img/facebook.png';
import img2 from './img/instagram.png';
import img3 from './img/youtube.png';
import img4 from './img/gorjeo.png';

export default function Footer(){
    return (
        <>
        <footer>
            <div class="footer">
            <div class="row">
            <ul>
            <li>
            <a href="/"><Image src={img} width={40}height={40}priority/></a>
            </li>
            <li>
            <a href="/"><Image src={img2} width={40}height={40}priority/></a>
            </li>
            <li>
            <a href="/"><Image src={img3} width={40}height={40}priority/></a>
            </li>
            <li>
            <a href="/"><Image src={img4} width={40}height={40}priority/></a>
            </li>
            </ul>
            </div>

            <div class="row">
            <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/products">Productos</a></li>
            <li><a href="/inventory">Inventrio</a></li>
            <li><a href="/department">Departamento</a></li>
            <li><a href="/customers">Crear Cuenta</a></li>
            </ul>
            </div>

            <div class="row">
            <ul>
            <li><a href="/">HOLDED Copyright © 2023 Holded </a></li>
            </ul>
            </div>
            </div>
            </footer>
        </>
    );
}