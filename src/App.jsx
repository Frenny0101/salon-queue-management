import React, { useEffect, useMemo, useState } from "react";
import { NavLink, Route, Routes, useNavigate, useParams, useLocation } from "react-router-dom";
import { initialServices, initialBarbers, demoQueue } from "./data";

const STORE = "velvet-gold-salon-v1";
const seed = () => ({ queue: demoQueue, services: initialServices, barbers: initialBarbers, isOpen: true, nextToken: 6, language: "en" });
function readStore() {
  try { const saved = localStorage.getItem(STORE); return saved ? JSON.parse(saved) : seed(); }
  catch { return seed(); }
}
const money = n => `₹${n}`;
const mins = n => `${Math.max(0, Math.round(n))} min`;
const statusLabel = s => ({waiting:"Waiting", called:"Called", "in-chair":"In chair", done:"Done", cancelled:"Cancelled", "no-show":"No-show"}[s] || s);
const activeQueue = q => q.filter(x => ["waiting","called","in-chair"].includes(x.status));
const serviceTotal = (ids, services) => ids.reduce((a,id) => { const s=services.find(x=>x.id===id); return {minutes:a.minutes+(s?.minutes||0),price:a.price+(s?.price||0)}; }, {minutes:0,price:0});

function useSalon() {
  const [data,setData] = useState(readStore);
  useEffect(() => {
    const sync = e => { if (e.key === STORE && e.newValue) { try { setData(JSON.parse(e.newValue)); } catch {} } };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const update = fn => setData(old => { const next = fn(structuredClone(old)); localStorage.setItem(STORE, JSON.stringify(next)); return next; });
  return [data,update];
}

function Icon({name}) {
  const paths = {
    home:<><path d="m3 10 9-7 9 7"/><path d="M5 9v12h14V9M9 21v-7h6v7"/></>,
    queue:<><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></>,
    user:<><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    desk:<><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/></>,
    scissors:<><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="m8.1 8.1 12.8 12.8M14 6l-3 3m-3 3 6 6"/></>,
    tv:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m8 2 4 3 4-3M8 23h8"/></>,
    settings:<><circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.6-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.6 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z"/></>,
    plus:<><path d="M12 5v14M5 12h14"/></>,
    arrow:<><path d="M5 12h14m-6-6 6 6-6 6"/></>,
    clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    check:<path d="m5 12 4 4L19 6"/>,
    close:<><path d="m6 6 12 12M18 6 6 18"/></>,
    phone:<><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></>,
    globe:<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>
  };
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]||paths.home}</svg>;
}
function Button({children,onClick,kind="",disabled=false}) { return <button disabled={disabled} className={`btn ${kind}`} onClick={onClick}>{children}</button>; }
function Pill({children,tone=""}) { return <span className={`pill ${tone}`}>{children}</span>; }
function Stat({label,value,sub,icon}) { return <div className="stat-card"><div className="stat-top"><span>{label}</span><span className="stat-icon"><Icon name={icon}/></span></div><strong>{value}</strong><small>{sub}</small></div>; }
function PageTitle({eyebrow,title,desc,action}) { return <div className="page-title"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{desc}</p></div>{action}</div>; }
function Shell({children,data}) {
  const nav = [{to:"/",label:"Overview",icon:"home"},{to:"/join",label:"Join queue",icon:"plus"},{to:"/status",label:"My status",icon:"queue"},{to:"/reception",label:"Reception",icon:"desk"},{to:"/barber",label:"Barber view",icon:"scissors"},{to:"/display",label:"TV display",icon:"tv"},{to:"/admin",label:"Owner settings",icon:"settings"}];
  const loc=useLocation();
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">V<span>&</span>G</div><div><b>VELVET <i>& GOLD</i></b><small>SALON STUDIO</small></div></div>
      <div className="side-label">WORKSPACE</div>
      <nav>{nav.map(n=><NavLink end={n.to==="/"} key={n.to} to={n.to} className={({isActive})=>`nav-link ${isActive?"active":""}`}><Icon name={n.icon}/><span>{n.label}</span>{n.to==="/reception"&&<em>{activeQueue(data.queue).filter(x=>x.status==="waiting").length}</em>}</NavLink>)}</nav>
      <div className="sidebar-bottom"><div className="open-indicator"><span className={data.isOpen?"dot":"dot closed"}/><div><b>{data.isOpen?"Queue is open":"Queue is closed"}</b><small>{data.isOpen?"Accepting online customers":"Walk-ins only"}</small></div></div><small className="version">SALON QUEUE · V1.0</small></div>
    </aside>
    <main className="main-area"><header className="topbar"><div className="mobile-brand">VELVET <i>& GOLD</i></div><div className="breadcrumb">Workspace <span>/</span> {nav.find(n=>n.to===loc.pathname)?.label || "Customer status"}</div><div className="top-actions"><span className="today"><span className="dot"/> Live system</span><span className="avatar">VG</span></div></header><div className="content">{children}</div></main>
  </div>;
}

function Home({data}) {
  const waiting=activeQueue(data.queue).filter(x=>x.status==="waiting");
  const busy=data.barbers.filter(b=>b.status==="busy").length;
  const average=waiting.length?Math.round(waiting.reduce((a,x)=>a+serviceTotal(x.services,data.services).minutes,0)/Math.max(1,data.barbers.filter(b=>b.active&&b.status!=="break").length)):0;
  return <><PageTitle eyebrow="TUESDAY · SALON OVERVIEW" title="Good morning." desc="Here's what's happening at your salon today." action={<Pill tone={data.isOpen?"success":"warning"}>{data.isOpen?"● Accepting customers":"● Online queue closed"}</Pill>}/>
    <div className="stats-grid"><Stat label="People waiting" value={waiting.length} sub="In the active queue" icon="queue"/><Stat label="Barbers working" value={`${busy}/${data.barbers.filter(b=>b.active).length}`} sub="Currently serving" icon="scissors"/><Stat label="Estimated wait" value={mins(average)} sub="Average queue estimate" icon="clock"/><Stat label="Served today" value={data.queue.filter(x=>x.status==="done").length} sub="Completed appointments" icon="check"/></div>
    <div className="home-grid"><section className="panel"><div className="panel-head"><div><h2>Live queue</h2><p>Customers currently waiting for their turn</p></div><NavLink className="text-link" to="/reception">Manage queue <Icon name="arrow"/></NavLink></div>
      {waiting.length===0?<div className="empty">No one waiting — walk right in!</div>:<div className="queue-list">{waiting.slice(0,5).map((x,i)=><div className="queue-row" key={x.id}><div className="token">{x.token}</div><div className="person"><b>{x.name}</b><small>{x.services.map(id=>data.services.find(s=>s.id===id)?.name).join(" + ")}</small></div><div className="queue-meta"><b>{data.barbers.find(b=>b.id===x.barber)?.name||"Any barber"}</b><small>{mins((Date.now()-x.createdAt)/60000)} waiting</small></div><Pill>{statusLabel(x.status)}</Pill></div>)}</div>}
    </section><section className="panel"><div className="panel-head"><div><h2>Your team</h2><p>Today's barber availability</p></div><NavLink className="text-link" to="/admin">Manage <Icon name="arrow"/></NavLink></div>
      <div className="team-list">{data.barbers.filter(b=>b.active).map(b=><div className="team-row" key={b.id}><div className="person-avatar">{b.name[0]}</div><div className="person"><b>{b.name}</b><small>{b.role}</small></div><Pill tone={b.status==="busy"?"warning":b.status==="break"?"muted":"success"}>{b.status==="busy"?"With customer":b.status==="break"?"On break":"Available"}</Pill></div>)}</div>
      <div className="soft-note"><Icon name="clock"/> Online joining closes 30 minutes before salon closing.</div>
    </section></div>
    <section className="welcome-banner"><div><span className="eyebrow light">THE VELVET EXPERIENCE</span><h2>Every visit, a little more exceptional.</h2><p>Keep the queue moving and give every guest a better salon experience.</p></div><div className="banner-art">✦</div></section>
  </>;
}

function Join({data,update}) {
  const [name,setName]=useState(""); const [phone,setPhone]=useState(""); const [selected,setSelected]=useState([]); const [barber,setBarber]=useState("any"); const [created,setCreated]=useState(null);
  const total=serviceTotal(selected,data.services);
  const waiting=activeQueue(data.queue).filter(x=>x.status==="waiting").length;
  const toggle=id=>setSelected(s=>s.includes(id)?s.filter(x=>x!==id):s.length<3?[...s,id]:s);
  const submit=e=>{e.preventDefault(); if(!name.trim()||!/^\d{10}$/.test(phone)||!selected.length)return;
    const existing=data.queue.find(x=>x.phone===phone&&["waiting","called","in-chair"].includes(x.status));
    if(existing){setCreated(existing);return;}
    let item;
    update(d=>{const number=d.nextToken; item={id:Date.now(),token:`S-${number}`,name:name.trim(),phone,services:selected,barber,status:"waiting",createdAt:Date.now()};d.queue.push(item);d.nextToken++;return d;}); setCreated(item);
  };
  if(created) return <div className="success-screen"><div className="success-check">✓</div><div className="eyebrow">YOU'RE ON THE LIST</div><h1>{created.token}</h1><p>{created.name}, your spot is confirmed.</p><div className="success-details"><span>Queue position</span><b>{activeQueue(data.queue).filter(x=>x.createdAt<=created.createdAt&&x.status==="waiting").length} in line</b></div><div className="success-details"><span>Selected services</span><b>{created.services.map(id=>data.services.find(s=>s.id===id)?.name).join(", ")}</b></div><Button onClick={()=>window.location.href=`/status/${created.id}`}>View my status <Icon name="arrow"/></Button><button className="plain-button" onClick={()=>setCreated(null)}>Add another customer</button></div>;
  return <><PageTitle eyebrow="CUSTOMER EXPERIENCE" title="Join the queue." desc="Choose your services and we'll save your place in line."/>
    {!data.isOpen&&<div className="alert warning-alert">Online joining is currently closed. Please visit the salon for a walk-in.</div>}
    <form className="join-layout" onSubmit={submit}><div className="join-main">
      <section className="panel"><div className="section-number">01</div><h2>Your details</h2><p className="section-desc">We'll use these details to identify your queue spot.</p><div className="form-grid"><label>Full name<input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Frenny Shah" required/></label><label>Phone number<input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="10-digit mobile number" inputMode="numeric" required/><small>{phone.length}/10 digits</small></label></div></section>
      <section className="panel"><div className="section-number">02</div><h2>Choose your services</h2><p className="section-desc">Select up to 3 services for this visit.</p><div className="service-grid">{data.services.filter(s=>s.active).map(s=><button type="button" key={s.id} onClick={()=>toggle(s.id)} className={`service-option ${selected.includes(s.id)?"selected":""}`}><span className="service-check">{selected.includes(s.id)?"✓":"+"}</span><b>{s.name}</b><small>{s.minutes} min</small><strong>{money(s.price)}</strong></button>)}</div><small className="helper">{selected.length}/3 services selected</small></section>
      <section className="panel"><div className="section-number">03</div><h2>Choose your barber</h2><p className="section-desc">Pick your favourite or let us find the fastest option.</p><div className="barber-options"><button type="button" className={`barber-option ${barber==="any"?"selected":""}`} onClick={()=>setBarber("any")}><div className="person-avatar gold">✦</div><span><b>Any barber</b><small>Fastest available</small></span><span className="radio-dot"/></button>{data.barbers.filter(b=>b.active).map(b=><button type="button" key={b.id} className={`barber-option ${barber===b.id?"selected":""}`} onClick={()=>setBarber(b.id)}><div className="person-avatar">{b.name[0]}</div><span><b>{b.name}</b><small>{b.status==="break"?"On break":b.status==="busy"?"Currently busy":"Available"}</small></span><span className="radio-dot"/></button>)}</div></section>
    </div><aside className="panel summary-panel"><div className="eyebrow">YOUR VISIT</div><h2>Booking summary</h2><div className="summary-lines">{selected.length?selected.map(id=>{const s=data.services.find(x=>x.id===id);return <div key={id}><span>{s.name}</span><b>{money(s.price)}</b></div>}):<p className="muted">Your selected services will appear here.</p>}</div><div className="summary-total"><span>Total duration</span><b>{mins(total.minutes)}</b></div><div className="summary-total"><span>Service total</span><b className="gold-text">{money(total.price)}</b></div><div className="wait-estimate"><Icon name="clock"/><div><small>Estimated waiting time</small><b>{mins(waiting*18)}</b></div></div><Button disabled={!data.isOpen||!name.trim()||phone.length!==10||!selected.length} kind="full">Confirm my spot <Icon name="arrow"/></Button><small className="fine-print">No payment required. Pay at the salon after your service.</small></aside></form>
  </>;
}

function Status({data,update}) {
  const {id}=useParams(); const [phone,setPhone]=useState(""); const [found,setFound]=useState(null);
  const item=data.queue.find(x=>String(x.id)===id)||found;
  const ahead=item?data.queue.filter(x=>x.status==="waiting"&&x.createdAt<item.createdAt).length:0;
  const wait=item?data.queue.filter(x=>x.status==="waiting"&&x.createdAt<item.createdAt).reduce((a,x)=>a+serviceTotal(x.services,data.services).minutes,0)/Math.max(1,data.barbers.filter(b=>b.active&&b.status!=="break").length):0;
  if(!item) return <div className="panel lookup-panel"><div className="eyebrow">CUSTOMER STATUS</div><h1>Find your queue spot</h1><p>Enter your 10-digit phone number to view your active token.</p><form onSubmit={e=>{e.preventDefault();setFound(data.queue.find(x=>x.phone===phone&&["waiting","called","in-chair"].includes(x.status))||null);}}><input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="Phone number"/><Button disabled={phone.length!==10}>Find my spot</Button></form>{found===null&&phone.length===10&&<small>No active queue spot found for this number.</small>}</div>;
  return <><PageTitle eyebrow="YOUR QUEUE STATUS" title="Your turn is getting closer." desc="Keep this page open. Your status updates when the salon team calls you."/>
    <div className={`status-hero ${item.status==="called"?"called":""}`}><div className="eyebrow light">YOUR QUEUE TOKEN</div><div className="big-token">{item.token}</div><h2>{item.status==="called"?"It's your turn!":item.status==="in-chair"?"Your service has started":statusLabel(item.status)}</h2><p>{item.status==="called"?`Please head to ${data.barbers.find(b=>b.id===item.barber)?.name||"your barber"}.`:item.status==="in-chair"?"Enjoy your salon experience.":`Hello ${item.name}, we'll let you know when you're next.`}</p></div>
    <div className="stats-grid three"><Stat label="Position in line" value={item.status==="waiting"?`${ahead+1}th`:"—"} sub="Including your token" icon="queue"/><Stat label="Estimated wait" value={item.status==="waiting"?mins(wait):"Now"} sub="Approximate time" icon="clock"/><Stat label="Your barber" value={data.barbers.find(b=>b.id===item.barber)?.name||"Any"} sub="Your preference" icon="user"/></div>
    <section className="panel status-panel"><div className="panel-head"><div><h2>Queue journey</h2><p>We'll update this as you move forward.</p></div><Button kind="danger-outline" onClick={()=>{if(confirm("Cancel your queue spot?"))update(d=>{const x=d.queue.find(q=>q.id===item.id);if(x)x.status="cancelled";return d;});}}>Cancel my spot</Button></div><div className="journey"><div className={`journey-step done`}><span>✓</span><b>Joined queue</b></div><div className={`journey-step ${["called","in-chair","done"].includes(item.status)?"done":""}`}><span>2</span><b>Called by barber</b></div><div className={`journey-step ${["in-chair","done"].includes(item.status)?"done":""}`}><span>3</span><b>Service in progress</b></div><div className={`journey-step ${item.status==="done"?"done":""}`}><span>4</span><b>Completed</b></div></div></section>
  </>;
}

function Reception({data,update}) {
  const [show,setShow]=useState(false); const [form,setForm]=useState({name:"",phone:"",service:"haircut",barber:"any"});
  const waiting=data.queue.filter(x=>x.status==="waiting");
  const add=e=>{e.preventDefault();if(!form.name.trim()||form.phone.length!==10)return;update(d=>{const duplicate=d.queue.find(x=>x.phone===form.phone&&["waiting","called","in-chair"].includes(x.status));if(duplicate){alert(`This number already has ${duplicate.token}`);return d;}d.queue.push({id:Date.now(),token:`S-${d.nextToken}`,name:form.name,phone:form.phone,services:[form.service],barber:form.barber,status:"waiting",createdAt:Date.now()});d.nextToken++;return d;});setShow(false);setForm({name:"",phone:"",service:"haircut",barber:"any"});};
  const callNext=barberId=>{const b=data.barbers.find(x=>x.id===barberId);if(!b||b.status==="break"||data.queue.some(x=>x.barber===barberId&&x.status==="in-chair"))return;const next=waiting.find(x=>x.barber===barberId||x.barber==="any");if(!next){alert("No waiting customer for this barber.");return;}update(d=>{const x=d.queue.find(q=>q.id===next.id);x.status="called";x.barber=barberId;return d;});};
  const change=(id,status)=>update(d=>{const x=d.queue.find(q=>q.id===id);if(x)x.status=status;return d;});
  return <><PageTitle eyebrow="STAFF WORKSPACE" title="Reception dashboard." desc="Manage the live queue and keep every guest moving." action={<Button onClick={()=>setShow(true)}><Icon name="plus"/> Add walk-in</Button>}/>
    <div className="stats-grid"><Stat label="Waiting now" value={waiting.length} sub="Customers in line" icon="queue"/><Stat label="Currently called" value={data.queue.filter(x=>x.status==="called").length} sub="Ready to be seated" icon="phone"/><Stat label="In chair" value={data.queue.filter(x=>x.status==="in-chair").length} sub="Active services" icon="scissors"/><Stat label="No-shows today" value={data.queue.filter(x=>x.status==="no-show").length} sub="Marked by reception" icon="close"/></div>
    <section className="panel"><div className="panel-head"><div><h2>Barber stations</h2><p>Call the next eligible customer for each barber.</p></div><Pill tone="success">Live queue</Pill></div><div className="station-grid">{data.barbers.filter(b=>b.active).map(b=>{const current=data.queue.find(x=>x.barber===b.id&&x.status==="in-chair");const called=data.queue.find(x=>x.barber===b.id&&x.status==="called");return <div className="station-card" key={b.id}><div className="station-head"><div className="person-avatar">{b.name[0]}</div><div><b>{b.name}</b><small>{b.role}</small></div><Pill tone={b.status==="break"?"muted":current?"warning":"success"}>{b.status==="break"?"On break":current?"Busy":"Available"}</Pill></div><div className="station-current"><small>{current?"NOW SERVING":called?"CALLED CUSTOMER":"CURRENT CUSTOMER"}</small><b>{current?.name||called?.name||"No active customer"}</b><span>{current?.token||called?.token||"—"}</span></div><Button kind="full" disabled={b.status==="break"||!!current} onClick={()=>callNext(b.id)}>Call next <Icon name="arrow"/></Button></div>})}</div></section>
    <section className="panel"><div className="panel-head"><div><h2>Waiting list</h2><p>First come, first served · {waiting.length} customers</p></div><input className="search-input" placeholder="Search customers..." onChange={e=>document.querySelectorAll("[data-customer]").forEach(el=>el.style.display=el.innerText.toLowerCase().includes(e.target.value.toLowerCase())?"":"none")}/></div>
      <div className="table-wrap"><table><thead><tr><th>TOKEN</th><th>CUSTOMER</th><th>SERVICE</th><th>PREFERRED BARBER</th><th>WAITING</th><th>ACTIONS</th></tr></thead><tbody>{data.queue.filter(x=>["waiting","called"].includes(x.status)).map(x=><tr data-customer key={x.id}><td><b className="gold-text">{x.token}</b></td><td><b>{x.name}</b><small>{x.phone}</small></td><td>{x.services.map(id=>data.services.find(s=>s.id===id)?.name).join(", ")}</td><td>{data.barbers.find(b=>b.id===x.barber)?.name||"Any barber"}</td><td>{mins((Date.now()-x.createdAt)/60000)}</td><td><div className="action-row">{x.status==="called"?<Button kind="small" onClick={()=>change(x.id,"in-chair")}>Seat</Button>:<Button kind="small" onClick={()=>change(x.id,"no-show")}>No-show</Button>}<button className="icon-button" title="Cancel" onClick={()=>change(x.id,"cancelled")}><Icon name="close"/></button></div></td></tr>)}</tbody></table>{waiting.length===0&&<div className="empty">The waiting list is clear.</div>}</div>
    </section>
    {show&&<div className="modal-backdrop" onClick={()=>setShow(false)}><form className="modal" onSubmit={add} onClick={e=>e.stopPropagation()}><div className="modal-head"><h2>Add walk-in</h2><button type="button" className="icon-button" onClick={()=>setShow(false)}><Icon name="close"/></button></div><label>Customer name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></label><label>Phone number<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value.replace(/\D/g,"").slice(0,10)})} required/></label><label>Service<select value={form.service} onChange={e=>setForm({...form,service:e.target.value})}>{data.services.filter(s=>s.active).map(s=><option value={s.id} key={s.id}>{s.name} · {money(s.price)}</option>)}</select></label><label>Barber<select value={form.barber} onChange={e=>setForm({...form,barber:e.target.value})}><option value="any">Any barber</option>{data.barbers.filter(b=>b.active).map(b=><option value={b.id} key={b.id}>{b.name}</option>)}</select></label><Button kind="full">Add to queue</Button></form></div>}
  </>;
}

function Barber({data,update}) {
  const [selected,setSelected]=useState(data.barbers[0]?.id||"ravi");
  const barber=data.barbers.find(b=>b.id===selected)||data.barbers[0];
  const current=data.queue.find(x=>x.barber===selected&&["called","in-chair"].includes(x.status));
  const next=data.queue.find(x=>x.status==="waiting"&&(x.barber===selected||x.barber==="any"));
  const setStatus=status=>update(d=>{const x=d.queue.find(q=>q.id===current?.id);if(x)x.status=status;if(status==="in-chair")x.startedAt=Date.now();if(status==="done"){const b=d.barbers.find(q=>q.id===selected);if(b)b.status="available";}return d;});
  return <><PageTitle eyebrow="BARBER WORKSPACE" title="Your station." desc="Your current customer and who's coming up next."/>
    <div className="barber-select">{data.barbers.filter(b=>b.active).map(b=><button key={b.id} className={selected===b.id?"selected":""} onClick={()=>setSelected(b.id)}>{b.name}<small>{b.status==="break"?"On break":b.status}</small></button>)}</div>
    <div className="barber-work"><section className="panel current-service"><div className="eyebrow">CURRENT CUSTOMER</div>{current?<><div className="current-token">{current.token}</div><h2>{current.name}</h2><p>{current.services.map(id=>data.services.find(s=>s.id===id)?.name).join(" + ")}</p><div className="service-time"><Icon name="clock"/> {current.startedAt?mins((Date.now()-current.startedAt)/60000)+" elapsed":"Ready to start"}</div><div className="barber-actions">{current.status==="called"?<Button kind="full" onClick={()=>setStatus("in-chair")}>Start service <Icon name="arrow"/></Button>:<Button kind="full" onClick={()=>setStatus("done")}>Mark as done <Icon name="check"/></Button>}</div></>:<div className="empty large">No active customer. You're all caught up.</div>}</section>
      <aside className="panel next-card"><div className="eyebrow">UP NEXT FOR YOU</div>{next?<><div className="next-token">{next.token}</div><h2>{next.name}</h2><p>{next.services.map(id=>data.services.find(s=>s.id===id)?.name).join(" + ")}</p><Pill tone="success">Waiting</Pill></>:<p className="muted">No customers waiting for you.</p>}<div className="divider"/><h3>Station availability</h3><div className="availability-actions"><Button kind={barber?.status==="break"?"":"outline"} onClick={()=>update(d=>{d.barbers.find(b=>b.id===selected).status="break";return d;})}>On break</Button><Button kind={barber?.status!=="break"?"":"outline"} onClick={()=>update(d=>{d.barbers.find(b=>b.id===selected).status="available";return d;})}>Available</Button></div></aside></div>
  </>;
}

function Display({data}) {
  const active=data.queue.filter(x=>["waiting","called","in-chair"].includes(x.status));
  return <div className="tv-screen"><div className="tv-header"><div className="brand-mark">V<span>&</span>G</div><div><div className="eyebrow light">VELVET & GOLD · SALON STUDIO</div><h1>Your comfort. Your moment.</h1></div><div className="tv-open"><span className="dot"/> {data.isOpen?"NOW SERVING":"ONLINE QUEUE CLOSED"}</div></div>
    <div className="tv-stations">{data.barbers.filter(b=>b.active).map(b=>{const current=data.queue.find(x=>x.barber===b.id&&x.status==="in-chair");const called=data.queue.find(x=>x.barber===b.id&&x.status==="called");return <div className="tv-station" key={b.id}><div className="tv-barber">{b.name}</div><div className="tv-token">{current?.token||called?.token||"—"}</div><small>{current?"NOW SERVING":called?"PLEASE COME":"AVAILABLE SOON"}</small></div>})}</div>
    <div className="tv-bottom"><div><div className="eyebrow light">UP NEXT</div><h2>Please watch for your token</h2><div className="tv-next-list">{active.filter(x=>x.status==="waiting").slice(0,5).map(x=><div key={x.id}><b>{x.token}</b><span>{x.name}</span></div>)}</div></div><div className="tv-message"><span>✦</span><h2>Relax. You're in good hands.</h2><p>Thank you for choosing Velvet & Gold.</p></div></div>
  </div>;
}

function Admin({data,update}) {
  const [newService,setNewService]=useState({name:"",minutes:30,price:100});
  const addService=e=>{e.preventDefault();if(!newService.name.trim())return;update(d=>{d.services.push({...newService,id:`service-${Date.now()}`,gu:newService.name,active:true,minutes:Number(newService.minutes),price:Number(newService.price)});return d;});setNewService({name:"",minutes:30,price:100});};
  return <><PageTitle eyebrow="SALON CONTROL CENTRE" title="Owner settings." desc="Manage your services, team and daily operations."/>
    <section className="panel"><div className="panel-head"><div><h2>Queue availability</h2><p>Control whether customers can join online.</p></div><button className={`toggle ${data.isOpen?"on":""}`} onClick={()=>update(d=>{d.isOpen=!d.isOpen;return d;})}><span/></button></div><div className="setting-highlight"><span className={`dot ${data.isOpen?"":"closed"}`}/><div><b>{data.isOpen?"Online queue is open":"Online queue is closed"}</b><small>{data.isOpen?"Customers can join from their phones.":"Online joining is disabled. Walk-ins are still allowed."}</small></div></div></section>
    <section className="panel"><div className="panel-head"><div><h2>Services & pricing</h2><p>Update the services available to customers.</p></div></div><div className="table-wrap"><table><thead><tr><th>SERVICE</th><th>DURATION</th><th>PRICE</th><th>AVAILABLE</th></tr></thead><tbody>{data.services.map(s=><tr key={s.id}><td><b>{s.name}</b><small>{s.gu}</small></td><td>{s.minutes} min</td><td>{money(s.price)}</td><td><button className={`toggle mini ${s.active?"on":""}`} onClick={()=>update(d=>{d.services.find(x=>x.id===s.id).active=!s.active;return d;})}><span/></button></td></tr>)}</tbody></table></div><form className="add-service" onSubmit={addService}><input placeholder="New service name" value={newService.name} onChange={e=>setNewService({...newService,name:e.target.value})} required/><input type="number" min="5" placeholder="Minutes" value={newService.minutes} onChange={e=>setNewService({...newService,minutes:e.target.value})}/><input type="number" min="0" placeholder="Price ₹" value={newService.price} onChange={e=>setNewService({...newService,price:e.target.value})}/><Button><Icon name="plus"/> Add service</Button></form></section>
    <section className="panel"><div className="panel-head"><div><h2>Barbers on duty</h2><p>Set today's team availability.</p></div></div><div className="admin-team">{data.barbers.map(b=><div className="admin-team-row" key={b.id}><div className="person-avatar">{b.name[0]}</div><div className="person"><b>{b.name}</b><small>{b.role}</small></div><select value={b.status} onChange={e=>update(d=>{d.barbers.find(x=>x.id===b.id).status=e.target.value;return d;})}><option value="available">Available</option><option value="busy">Busy</option><option value="break">On break</option></select><label className="check-label"><input type="checkbox" checked={b.active} onChange={e=>update(d=>{d.barbers.find(x=>x.id===b.id).active=e.target.checked;return d;})}/> On duty</label></div>)}</div></section>
    <section className="panel"><div className="panel-head"><div><h2>Today's performance</h2><p>Live totals based on this browser's queue data.</p></div></div><div className="stats-grid three compact"><Stat label="Customers served" value={data.queue.filter(x=>x.status==="done").length} sub="Completed" icon="check"/><Stat label="No-shows" value={data.queue.filter(x=>x.status==="no-show").length} sub="Missed turns" icon="close"/><Stat label="Active queue" value={activeQueue(data.queue).length} sub="In progress" icon="queue"/></div><Button kind="danger-outline" onClick={()=>{if(confirm("Reset all queue data to the original demo?")){localStorage.removeItem(STORE);window.location.reload();}}}>Reset demo data</Button></section>
  </>;
}

function App() {
  const [data,update]=useSalon();
  useEffect(()=>{document.documentElement.lang=data.language==="gu"?"gu":"en";},[data.language]);
  return <Shell data={data}><Routes>
    <Route path="/" element={<Home data={data}/>}/><Route path="/join" element={<Join data={data} update={update}/>}/><Route path="/status" element={<Status data={data} update={update}/>}/><Route path="/status/:id" element={<Status data={data} update={update}/>}/><Route path="/reception" element={<Reception data={data} update={update}/>}/><Route path="/barber" element={<Barber data={data} update={update}/>}/><Route path="/display" element={<Display data={data}/>}/><Route path="/admin" element={<Admin data={data} update={update}/>}/><Route path="*" element={<Home data={data}/>}/>
  </Routes><footer className="footer">© 2026 Velvet & Gold Salon Studio <span>Crafted for a better salon experience</span></footer></Shell>;
}
export default App;
