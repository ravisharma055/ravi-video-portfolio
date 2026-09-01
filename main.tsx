import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './animations.css';

function FloatingLaptop(){
  const [p,setP]=useState({x:0,y:0,s:0});
  useEffect(()=>{
    let raf=0;
    const move=(e:MouseEvent)=>{
      cancelAnimationFrame(raf);
      raf=requestAnimationFrame(()=>setP({x:(e.clientX/innerWidth-.5),y:(e.clientY/innerHeight-.5),s:scrollY}));
    };
    addEventListener('mousemove',move,{passive:true});
    addEventListener('scroll',()=>setP(v=>({...v,s:scrollY})),{passive:true});
    return()=>{cancelAnimationFrame(raf);removeEventListener('mousemove',move)};
  },[]);
  const rx=(-p.y*7)+(Math.sin(p.s*.002)*2), ry=p.x*10+(Math.sin(p.s*.0015)*3);
  return <div className="floatingLaptop" aria-hidden="true" style={{'--rx':`${rx}deg`,'--ry':`${ry}deg`,'--mx':`${p.x*18}px`,'--my':`${p.y*-12}px`} as React.CSSProperties}>
    <div className="laptopGlow"/>
    <div className="laptopScreen"><div className="screenTop"><i/><i/><i/><span>RAVI / MOTION</span></div><div className="screenGrid"/><div className="screenFrame frameA"><b>EDIT</b><em>01</em></div><div className="screenFrame frameB"><b>MOTION</b><em>02</em></div><div className="screenFrame frameC"><b>STORY</b><em>03</em></div><div className="screenScan"/></div>
    <div className="laptopBase"><div className="keyboard"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><div className="trackpad"/></div>
    <div className="laptopShadow"/>
  </div>
}

function Experience(){return <><App/><FloatingLaptop/></>}

createRoot(document.getElementById('root')!).render(<React.StrictMode><Experience/></React.StrictMode>);
