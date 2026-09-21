import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './animations.css';

function SiteMotion(){
  const [p,setP]=useState({x:.5,y:.5,s:0});
  useEffect(()=>{
    let raf=0;
    const move=(e:MouseEvent)=>{
      cancelAnimationFrame(raf);
      raf=requestAnimationFrame(()=>setP(v=>({...v,x:e.clientX/innerWidth,y:e.clientY/innerHeight})));
    };
    const scroll=()=>setP(v=>({...v,s:scrollY}));
    addEventListener('mousemove',move,{passive:true});
    addEventListener('scroll',scroll,{passive:true});
    return()=>{cancelAnimationFrame(raf);removeEventListener('mousemove',move);removeEventListener('scroll',scroll)};
  },[]);
  return <div className="siteMotion" aria-hidden="true" style={{
    '--mx':`${(p.x-.5)*24}px`,'--my':`${(p.y-.5)*18}px`,
    '--rx':`${(0.5-p.y)*10}deg`,'--ry':`${(p.x-.5)*13}deg`,
    '--scroll':`${p.s*.035}deg`
  } as React.CSSProperties}>
    <div className="motionAura"/>
    <div className="motionGrid"/>
    <div className="motionRing ring1"/><div className="motionRing ring2"/><div className="motionRing ring3"/>
    <div className="motionDevice">
      <div className="deviceGlow"/>
      <div className="deviceScreen">
        <div className="deviceBar"><i/><i/><i/><span>RAVI / VISUAL SYSTEM</span><b>●</b></div>
        <div className="deviceCanvas"><span className="canvasLine l1"/><span className="canvasLine l2"/><span className="canvasLine l3"/><div className="canvasBlock"/><div className="canvasBlock block2"/><div className="canvasBlock block3"/></div>
        <div className="deviceScan"/>
      </div>
      <div className="deviceBase"><div className="deviceKeys">{Array.from({length:36}).map((_,i)=><i key={i}/>)}</div><div className="devicePad"/></div>
    </div>
    <div className="motionLabel labelA">MOTION / 01</div><div className="motionLabel labelB">DEPTH / 03</div>
  </div>
}
function Experience(){return <><App/><SiteMotion/></>}
createRoot(document.getElementById('root')!).render(<React.StrictMode><Experience/></React.StrictMode>);
