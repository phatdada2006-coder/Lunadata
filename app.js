
const DL=['ອາທິດ','ຈັນ','ອັງຄານ','ພຸດ','ພະຫັດ','ສຸກ','ເສົາ'],LM=['ມັງກອນ','ກຸມພາ','ມີນາ','ເມສາ','ພຶດສະພາ','ມິຖຸນາ','ກໍລະກົດ','ສິງຫາ','ກັນຍາ','ຕຸລາ','ພະຈິກ','ທັນວາ'];
const T=['17:15-18:35','18:40-20:00','08:45-10:15','10:30-12:00'];
const S=[];
function add(sl,r,su,tc){sl.forEach((x,i)=>S.push({d:x[0],t:x[1],r:String(r).toUpperCase().replace(/^A/,''),s:su[i%su.length],tc:tc[i%tc.length]}))}
const W=['ຈັນ','ອັງຄານ','ພຸດ','ພະຫັດ'].map(d=>[d,T[0]]),W2=['ຈັນ','ອັງຄານ','ພຸດ','ພະຫັດ'].map(d=>[d,T[1]]),E=[['ເສົາ',T[2]],['ເສົາ',T[3]],['ອາທິດ',T[2]],['ອາທິດ',T[3]]];
const BE='Basic English',SB='Side by side ',V='Vocabulary',N='Newconcept ',P='Presentation',G='Grammar ',R='Reading ';
add(W,'301',[BE],['Vannisa']);add(W,'A302',[BE],['Soulideth']);
add(W,'303',[V,V,SB+1,N+1],['Lamngern']);
add(W,'304',[SB+1,P,V,N+1],['Phetmanysone','Phetmanysone','Esther','Phetmanysone']);
add(W,'305',[N+2,P,G+1,R+1],['Souksavanh']);
add(W,'306',[R+2,G+1,N+2,P],['Chidtaphone','Chidtaphone','Chidtaphone','Esther']);
add(W,'307',[N+2,P,G+1,R+1],['Thongsamouth']);
add(W2,'305',['Speaking'],['Chidtaphone']);add(W2,'A306',[G+1],['Thongsamouth','Thongsamouth','Thongsamouth','Esther']);
add(E,'301',[BE],['Phetdavanh']);add(E,'A302',[BE],['Soulideth']);add(E,'A303',[SB+1,V,V,N+1],['Lamngern']);
add(E,'304',[P,V,N+1,SB+2],['Austin','Pavina','Pavina','Souksavanh']);
add(E,'305',[N+2,G+1,P,R+1],['Pavina','Thongsamouth','Austin','Pavina']);
add(E,'306',[G+2,P,N+2,R+2],['Thongsamouth','Austin','Souksavanh','Austin']);
const $=id=>document.getElementById(id),esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const nz=s=>String(s||'').replace(/\s/g,'').toUpperCase(),rn=r=>String(r||'').replace(/\s/g,'').toUpperCase().replace(/^A/,'');
const fd=d=>d?d.split('-').reverse().join('/'):'';
function find(date,time,room){if(!date)return null;const d=DL[new Date(date+'T00:00:00').getDay()];return S.find(x=>x.d==d&&x.t==time&&x.r==rn(room))||null}
function st(r){const m=find(r.date,r.time,r.room);if(!m)return'ບໍ່ມີໃນຕາຕະລາງ';if(r.tc&&nz(r.tc)!=nz(m.tc))return'ປ່ຽນຄູ';if(r.subject&&nz(r.subject)!=nz(m.s))return'ປ່ຽນວິຊາ';return'ຕາມຕາຕະລາງ'}
const cls=s=>s=='ຕາມຕາຕະລາງ'?'ok':s=='ບໍ່ມີໃນຕາຕະລາງ'?'er':'wa';
const KEY='obs_v1';function load(){try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return[]}}
let DB=null;const LOCAL=()=>!FB.projectId,NODB=()=>Promise.reject(new Error('ຍັງບໍ່ໄດ້ເຂົ້າສູ່ລະບົບ'));
const put=o=>DB?DB.collection('obs').doc(String(o.id)).set(o):LOCAL()?(persist(),Promise.resolve()):NODB();
const del=id=>DB?DB.collection('obs').doc(String(id)).delete():LOCAL()?(rows=rows.filter(x=>x.id!=id),persist(),Promise.resolve()):NODB();
let rows=[],editId=null,last={tc:'',s:''};
function persist(){try{localStorage.setItem(KEY,JSON.stringify(rows))}catch(e){alert('ບັນທຶກລົງເບຣາເຊີບໍ່ໄດ້')}}
function uniq(k){return[...new Set(S.map(x=>x[k]))].sort()}
const sess=d=>{const g=new Date(d+'T00:00:00').getDay();return g==0||g==6?'2':'1'};
function fillT(){$('f_time').innerHTML=($('f_sess').value=='1'?T.slice(0,2):T.slice(2)).map(t=>'<option>'+t+'</option>').join('')}
$('dl_r').innerHTML=uniq('r').map(x=>'<option>'+x+'</option>').join('');
function fillTN(){const m={};rows.forEach(r=>{if(r.teacher){const k=nz(r.teacher);if(!m[k])m[k]=r.teacher}});$('dl_t').innerHTML=Object.values(m).sort().map(x=>'<option>'+esc(x)+'</option>').join('')}
$('dl_s').innerHTML=uniq('s').map(x=>'<option>'+x+'</option>').join('');

const now=new Date();
const loc=()=>new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);$('f_date').value=loc();$('r_a').value=loc().slice(0,8)+'01';$('r_b').value=loc();$('f_sess').value=sess(loc());fillT();try{$('f_ob').value=localStorage.getItem('obs_ob')||''}catch(e){}
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{document.querySelectorAll('nav button').forEach(x=>x.classList.toggle('on',x==b));['entry','list','report'].forEach(s=>$(s).classList.toggle('hide',s!=b.dataset.t))});
const LV={301:'C1',302:'C1',303:'C1',304:'C2',305:'G1',306:'G2',307:'G1'};let lastL='';const lv=r=>r.level||LV[r.room]||'';
function hint(){const L=LV[rn($('f_room').value)]||'';if(L&&(!$('f_lv').value||$('f_lv').value==lastL))$('f_lv').value=L;lastL=L||lastL;const m=find($('f_date').value,$('f_time').value,$('f_room').value);const h=$('hint');
 if(!$('f_room').value){return}
 if(!m){const dv=$('f_date').value,ss=dv?sess(dv):'';h.textContent=dv&&$('f_sess').value!=ss?'ວັນທີ່ເລືອກແມ່ນວັນ'+DL[new Date(dv+'T00:00:00').getDay()]+' (ພາກ '+ss+') ແຕ່ເລືອກພາກ '+$('f_sess').value+' — ກວດພາກ/ວັນທີອີກຄັ້ງ':'ບໍ່ພົບຫ້ອງ/ເວລານີ້ໃນຕາຕະລາງ (ພິມເອງໄດ້)';return}
 h.textContent='ວິຊາຕາມຕາຕະລາງ: '+m.s;
 if(!$('f_sub').value||$('f_sub').value==last.s)$('f_sub').value=m.s;last={tc:m.tc,s:m.s}}
['f_date','f_time','f_room'].forEach(i=>$(i).addEventListener('input',hint));$('f_room').addEventListener('change',hint);
$('f_sess').onchange=()=>{fillT();hint()};$('f_date').addEventListener('change',()=>{if($('f_date').value){$('f_sess').value=sess($('f_date').value);fillT();hint()}});
function reset(){editId=null;['f_room','f_tn','f_sub','f_lv','f_n','f_c','f_t','f_p','f_d'].forEach(i=>$(i).value='');$('f_ty').value='';last={tc:'',s:''};$('save').textContent='ບັນທຶກ';$('cancel').classList.add('hide')}
$('cancel').onclick=reset;
$('save').onclick=()=>{
 const date=$('f_date').value,room=rn($('f_room').value);
 if(!date||!room)return alert('ກະລຸນາໃສ່ວັນທີ ແລະຫ້ອງ');
 if(!$('f_tn').value.trim()&&!confirm('ຍັງບໍ່ໄດ້ໃສ່ຊື່ອາຈານ ບັນທຶກຕໍ່ບໍ?'))return;
 const o={date:date,time:$('f_time').value,room:room,subject:$('f_sub').value.trim(),level:$('f_lv').value.trim()||LV[room]||'',students:$('f_n').value===''?null:+$('f_n').value,details:$('f_d').value.trim(),teacher:$('f_tn').value.trim(),ttype:$('f_ty').value,cond:$('f_c').value.trim(),teach:$('f_t').value.trim(),prob:$('f_p').value.trim(),observer:$('f_ob').value.trim()};try{localStorage.setItem('obs_ob',o.observer)}catch(e){}
 try{if(editId){const i=rows.findIndex(x=>x.id==editId);rows[i]=Object.assign({id:editId},o)}else{o.id=Date.now().toString(36)+Math.random().toString(36).slice(2,5);o.created=Date.now();rows.push(o)}put(editId?rows.find(x=>x.id==editId):o).catch(e=>alert('ບັນທຶກເຂົ້າເຊີເວີບໍ່ໄດ້: '+e.message));drawList();
 reset();$('ok').textContent='✓ ບັນທຶກແລ້ວ';setTimeout(()=>$('ok').textContent='',2500)}catch(e){alert('ບັນທຶກບໍ່ໄດ້: '+(e.message||e.code))}};
function drawList(){stats();fillTN();drawCV();const q=($('q').value||'').toLowerCase();const rs=rows.filter(r=>JSON.stringify(r).toLowerCase().includes(q)).sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time));
 $('lt').innerHTML=rs.length?'<table><tr><th>ວັນທີ<th>ເວລາ<th>ຫ້ອງ<th>ອາຈານ<th>ວິຊາ<th>ລະດັບ<th>ນັກຮຽນ<th>ສະຖານະ<th></tr>'+rs.map(r=>{const s=st(r);return'<tr><td>'+fd(r.date)+'<td>'+esc(r.time)+'<td>'+esc(r.room)+'<td>'+esc(r.teacher)+'<td>'+esc(r.subject)+'<td>'+esc(lv(r))+'<td>'+esc(r.students)+'<td class="'+cls(s)+'">'+s+'<td><button class="btn s" data-e="'+r.id+'">ແກ້ໄຂ</button> <button class="btn s" data-x="'+r.id+'">ລົບ</button>'}).join('')+'</table>':'ຍັງບໍ່ມີຂໍ້ມູນ';
 $('lt').querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>{const r=rows.find(x=>x.id==b.dataset.e);editId=r.id;$('f_date').value=r.date;$('f_sess').value=T.indexOf(r.time)<2?'1':'2';fillT();$('f_time').value=r.time;$('f_room').value=r.room;$('f_sub').value=r.subject;$('f_lv').value=r.level;$('f_n').value=r.students==null?'':r.students;$('f_d').value=r.details||'';$('f_tn').value=r.teacher||'';$('f_ty').value=r.ttype||'';$('f_c').value=r.cond||'';$('f_t').value=r.teach||'';$('f_p').value=r.prob||'';$('save').textContent='ບັນທຶກການແກ້ໄຂ';$('cancel').classList.remove('hide');document.querySelector('nav button').click();scrollTo(0,0)});
 $('lt').querySelectorAll('[data-x]').forEach(b=>b.onclick=()=>{if(confirm('ລົບແຖວນີ້?')){del(b.dataset.x).catch(e=>alert(e.message));rows=rows.filter(x=>x.id!=b.dataset.x);drawList()}})}
const dk=(d,t,r)=>d+'|'+t+'|'+rn(r);
function drawCV(){const d=$('f_date').value,box=$('cv');if(!d){box.innerHTML='';return}
 const dn=DL[new Date(d+'T00:00:00').getDay()],cl=S.filter(x=>x.d==dn),seen=new Set(rows.filter(r=>r.date==d).map(r=>dk(d,r.time,r.room))),sk=new Set(cl.map(y=>dk(d,y.t,y.r)));
 let h='';T.forEach(t=>{const x=cl.filter(y=>y.t==t);if(!x.length)return;h+='<p class="mut" style="margin:8px 0 2px"><b>'+t+'</b></p>'+x.map(y=>{const o=seen.has(dk(d,t,y.r));return'<button type="button" class="chip'+(o?' d':'')+'" data-t="'+t+'" data-r="'+y.r+'">'+(o?'✓ ':'')+y.r+'</button>'}).join('')});
 const done=cl.filter(y=>seen.has(dk(d,y.t,y.r))).length,ex=rows.filter(r=>r.date==d&&!sk.has(dk(d,r.time,r.room))).length;
 box.innerHTML=cl.length?'<p><b>ວັນ'+dn+'</b>: ສັງເກດແລ້ວ '+done+' / '+cl.length+' ຄາບ</p>'+h+'<p class="mut">ກົດໃສ່ຫ້ອງເພື່ອໃສ່ຂໍ້ມູນໃນແບບຟອມ ✓ = ສັງເກດແລ້ວ</p>'+(ex?'<p class="mut">ມີ '+ex+' ຄັ້ງທີ່ບັນທຶກນອກຕາຕະລາງ</p>':''):'<p class="mut">ວັນ'+dn+'ບໍ່ມີຄາບຮຽນຕາມຕາຕະລາງ</p>';
 box.querySelectorAll('.chip').forEach(b=>b.onclick=()=>{$('f_sess').value=T.indexOf(b.dataset.t)<2?'1':'2';fillT();$('f_time').value=b.dataset.t;$('f_room').value=b.dataset.r;hint();scrollTo(0,0)})}
function stats(){const da=loc().slice(0,8)+'01',db=loc(),m=rows.filter(r=>r.date&&r.date>=da&&r.date<=db),a=grp(m,()=>'x').x||{n:0,s:0,c:0},bad=m.filter(r=>st(r)!='ຕາມຕາຕະລາງ').length;
 $('stats').innerHTML=[['ສັງເກດເດືອນນີ້',a.n],['ຫ້ອງທີ່ສັງເກດ (ເດືອນນີ້)',new Set(m.map(r=>r.room)).size+' ຫ້ອງ'],['ນັກຮຽນສະເລ່ຍ',avg(a)],['ຜິດຈາກຕາຕະລາງ',bad]].map(x=>'<div class="st"><b>'+x[1]+'</b><span>'+x[0]+'</span></div>').join('')}
function rm(rs){const rooms=[...new Set(rs.map(r=>r.room))].sort();
 return'<h4>ສະຫຼຸບແຕ່ລະຫ້ອງ</h4><table><tr><th>ຫ້ອງ<th>ລະດັບ<th>ຈຳນວນຄັ້ງ<th>ນັກຮຽນສະເລ່ຍ<th>ປ່ຽນຄູ/ວິຊາ<th>ນອກຕາຕະລາງ<th>ໝາຍເຫດ</tr>'+rooms.map(k=>{const x=rs.filter(r=>r.room==k);if(!x.length)return'<tr class="er"><td>'+k+'<td>'+(LV[k]||'')+'<td>0<td>-<td>-<td>-<td>ຍັງບໍ່ໄດ້ສັງເກດ';const g=grp(x,()=>'x').x,s=x.map(st);
 return'<tr><td>'+k+'<td>'+(LV[k]||'')+'<td>'+g.n+'<td>'+avg(g)+'<td>'+s.filter(v=>v=='ປ່ຽນຄູ'||v=='ປ່ຽນວິຊາ').length+'<td>'+s.filter(v=>v=='ບໍ່ມີໃນຕາຕະລາງ').length+'<td>'+esc(x.filter(r=>dtl(r)).map(r=>fd(r.date).slice(0,5)+': '+dtl(r)).join(' | '))}).join('')+'</table>'}
function grp(rs,f){const m={};rs.forEach(r=>{const k=f(r)||'(ບໍ່ລະບຸ)';(m[k]=m[k]||{n:0,s:0,c:0}).n++;if(r.students!=null){m[k].s+=r.students;m[k].c++}});return m}
const avg=o=>o.c?(o.s/o.c).toFixed(1):'-';
function tb(title,m){const ks=Object.keys(m).sort((a,b)=>m[b].n-m[a].n||a.localeCompare(b));return'<h4>'+title+'</h4><table><tr><th>ລາຍການ<th>ຈຳນວນຄັ້ງ<th>ນັກຮຽນສະເລ່ຍ</tr>'+ks.map(k=>'<tr><td>'+esc(k)+'<td>'+m[k].n+'<td>'+avg(m[k])).join('')+'</table>'}
function nar(rs){const G=[['ຊ່ວງ ເສົາ-ອາທິດ',['ເສົາ','ອາທິດ']],['ຊ່ວງ ຈັນ-ພະຫັດ',['ຈັນ','ອັງຄານ','ພຸດ','ພະຫັດ']]];
 return'<h4>ບັນຫາທີ່ເກີດຂຶ້ນ</h4>'+G.map(g=>{const x=rs.filter(r=>g[1].includes(DL[new Date(r.date+'T00:00:00').getDay()])),rooms=[...new Set(x.map(r=>r.room))].sort();
 return'<p><b>'+g[0]+'</b></p>'+(rooms.length?'<ol>'+rooms.map(k=>'<li>ຫ້ອງ '+k+(LV[k]?' ('+LV[k]+')':'')+': '+x.filter(r=>r.room==k).map(r=>esc(fd(r.date).slice(0,5)+': '+(dtl(r)||'(ບໍ່ມີລາຍລະອຽດ)'))).join(' · ')).join('')+'</ol>':'<p>ບໍ່ມີຂໍ້ມູນ</p>')}).join('')}
const dtl=r=>[r.cond&&'ສະພາບຫ້ອງ: '+r.cond,r.teach&&'ການສອນ: '+r.teach,r.prob&&'ບັນຫາ: '+r.prob,r.details].filter(Boolean).join(' | ');
const WD=d=>'ວັນ'+DL[new Date(d+'T00:00:00').getDay()];
const dot=s=>{s=String(s||'').trim();return s&&!/[.!?]$/.test(s)?s+'.':s};
const tn=r=>r.teacher||'(ບໍ່ໄດ້ລະບຸຊື່ອາຈານ)';
const tyx=r=>r.ttype?' ('+r.ttype+')':'';
function fm(rs){const rooms=[...new Set(rs.map(r=>r.room))].sort();
 return rooms.map(k=>{const x=rs.filter(r=>r.room==k),names=[...new Set(x.map(tn))];
  return'<h5>ຫ້ອງ '+k+(LV[k]?' (ລະດັບ '+LV[k]+')':'')+'</h5><p>ໃນຊ່ວງນີ້ ໄດ້ເຂົ້າສັງເກດການສອນຫ້ອງນີ້ຈຳນວນ '+x.length+' ຄັ້ງ ໂດຍມີອາຈານຜູ້ສອນຄື '+esc(names.join(', '))+'.</p><ol>'+x.map(r=>{const s=[];
   s.push('ວັນທີ '+fd(r.date)+' ('+WD(r.date)+') ເວລາ '+esc(r.time)+' ວິຊາ '+esc(r.subject||'-')+' ອາຈານ '+esc(tn(r)+tyx(r))+' ເປັນຜູ້ສອນ'+(r.students!=null?' ມີນັກຮຽນເຂົ້າຮຽນ '+r.students+' ຄົນ':'')+'.');
   if(r.cond)s.push('ສະພາບຫ້ອງຮຽນ: '+esc(dot(r.cond)));
   if(r.teach)s.push('ການສອນຂອງອາຈານ: '+esc(dot(r.teach)));
   s.push('ບັນຫາທີ່ພົບ: '+(r.prob?esc(dot(r.prob)):'ບໍ່ມີບັນຫາທີ່ບັນທຶກໄວ້.'));
   if(r.details)s.push('ໝາຍເຫດ: '+esc(dot(r.details)));
   return'<li>'+s.join(' ')+'</li>'}).join('')+'</ol>'}).join('')||'<p>ບໍ່ມີຂໍ້ມູນໃນຊ່ວງນີ້</p>'}
function ft(rs){const m={};rs.forEach(r=>{const k=nz(r.teacher)||'?';(m[k]=m[k]||{name:tn(r),rs:[]}).rs.push(r)});
 return Object.keys(m).sort((a,b)=>m[b].rs.length-m[a].rs.length).map(k=>{const o=m[k],g=grp(o.rs,()=>'x').x,rooms=[...new Set(o.rs.map(r=>r.room))].join(', '),subs=[...new Set(o.rs.map(r=>r.subject).filter(Boolean))].join(', '),ty=[...new Set(o.rs.map(r=>r.ttype).filter(Boolean))];
  return'<p><b>'+esc(o.name)+'</b>'+(ty.length?' ('+esc(ty.join(', '))+')':'')+': ໄດ້ຮັບການສັງເກດ '+o.rs.length+' ຄັ້ງ ສອນຫ້ອງ '+esc(rooms)+' ວິຊາ '+esc(subs||'-')+' ມີນັກຮຽນສະເລ່ຍ '+avg(g)+' ຄົນຕໍ່ຫ້ອງ.'+(o.rs.some(r=>r.teach)?' ການສອນ: '+o.rs.filter(r=>r.teach).map(r=>esc(fd(r.date).slice(0,5)+' – '+dot(r.teach))).join(' '):'')+'</p>'}).join('')||'<p>ບໍ່ມີຂໍ້ມູນ</p>'}
function fp(rs){const x=rs.filter(r=>r.prob);return x.length?'<ol>'+x.map(r=>'<li>ຫ້ອງ '+r.room+' ວັນທີ '+fd(r.date)+' (ອາຈານ '+esc(tn(r))+'): '+esc(dot(r.prob))+'</li>').join('')+'</ol>':'<p>ບໍ່ມີບັນຫາທີ່ບັນທຶກໄວ້ໃນຊ່ວງນີ້.</p>'}
const inR=()=>{const da=$('r_a').value,db=$('r_b').value;return rows.filter(r=>r.date&&r.date>=da&&r.date<=db).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time))};
function build(){const da=$('r_a').value,db=$('r_b').value,p=da+'_'+db,f=$('r_md').value=='f',rs=inR();
 const sc=grp(rs,st),tot=grp(rs,()=>'x').x||{n:0,s:0,c:0};let n=0;const N=()=>(++n)+'. ';
 let h='<h3>ບົດລາຍງານການສັງເກດການສອນ ວັນທີ '+fd(da)+' – '+fd(db)+'</h3><p>ຜູ້ລາຍງານ: '+esc((rs.find(r=>r.observer)||{}).observer||'………………………………')+'</p>';
 h+='<h4>'+N()+'ພາບລວມ</h4><table><tr><td>ຈຳນວນຄັ້ງທີ່ສັງເກດທັງໝົດ<td>'+rs.length+'<tr><td>ຈຳນວນຫ້ອງທີ່ສັງເກດ<td>'+new Set(rs.map(r=>r.room)).size+'<tr><td>ຈຳນວນອາຈານທີ່ໄດ້ຮັບການສັງເກດ<td>'+new Set(rs.map(r=>nz(r.teacher)).filter(Boolean)).size+'<tr><td>ນັກຮຽນສະເລ່ຍຕໍ່ຫ້ອງ<td>'+avg(tot)+'<tr><td>ຕາມຕາຕະລາງ<td>'+((sc['ຕາມຕາຕະລາງ']||{}).n||0)+'<tr><td>ປ່ຽນວິຊາ<td>'+((sc['ປ່ຽນວິຊາ']||{}).n||0)+'<tr><td>ບໍ່ມີໃນຕາຕະລາງ<td>'+((sc['ບໍ່ມີໃນຕາຕະລາງ']||{}).n||0)+'</table>';
 if(f)h+='<h4>'+N()+'ລາຍງານຕາມຫ້ອງຮຽນ</h4>'+fm(rs)+'<h4>'+N()+'ລາຍງານຕາມອາຈານຜູ້ສອນ</h4>'+ft(rs)+'<h4>'+N()+'ບັນຫາ ແລະຂໍ້ສະເໜີ</h4>'+fp(rs);else h+=nar(rs)+rm(rs).replace('<h4>','<h4>'+N());
 h+=tb(N()+'ຕາມວິຊາ',grp(rs,r=>r.subject))+tb(N()+'ຕາມເວລາ',grp(rs,r=>r.time));
 h+='<h4>'+N()+'ລາຍລະອຽດການສັງເກດ</h4>'+(rs.length?'<table><tr><th>ວັນທີ<th>ເວລາ<th>ຫ້ອງ<th>ອາຈານ<th>ວິຊາ<th>ລະດັບ<th>ນັກຮຽນ<th>ລາຍລະອຽດ</tr>'+rs.map(r=>'<tr><td>'+fd(r.date)+'<td>'+esc(r.time)+'<td>'+esc(r.room)+'<td>'+esc(r.teacher)+'<td>'+esc(r.subject)+'<td>'+esc(lv(r))+'<td>'+esc(r.students)+'<td>'+esc(dtl(r))).join('')+'</table>':'<p>ບໍ່ມີຂໍ້ມູນໃນຊ່ວງນີ້</p>');
 h+='<h4>'+N()+'ສະຫຼຸບ ຂໍ້ສະເໜີ ແລະໝາຍເຫດ</h4><div class="box">&nbsp;</div>';$('rep').innerHTML=h;return p}
$('ai').onclick = async () => {
    const reportContent = $('rep').innerText;
    
    if (!reportContent.trim() || reportContent.includes('ບໍ່ມີຂໍ້ມູນ')) {
        alert('ກະລຸນາກົດປຸ່ມ "ສ້າງບົດລາຍງານ" ກ່ອນ!');
        return;
    }
    
    const promptText = `ຊ່ວຍກວດສອບ ແລະ ປັບປຸງແກ້ໄຂສຳນວນພາສາລາວຂອງບົດລາຍງານລຸ່ມນີ້ ໃຫ້ເປັນທາງການ ສຸພາບ ແລະ ອ່ານງ່າຍຂຶ້ນ (ໂດຍຮັກສາໂຄງສ້າງ ແລະ ເນື້ອຫາເດີມໄວ້ ບໍ່ສ້າງໃໝ່):\n\n` + reportContent;
    
    try {
        await navigator.clipboard.writeText(promptText);
        alert('✨ ຄັດລອກບົດລາຍງານຮຽບຮ້ອຍແລ້ວ!\nກຳລັງເປີດໜ້າ AI ໃຫ້... ພຽງແຕ່ກົດວາງ (Ctrl+V) ແລ້ວສົ່ງໃຫ້ AI ໄດ້ເລີຍ!');
        window.open('https://aistudio.google.com', '_blank');
    } catch (e) {
        alert('ບໍ່ສາມາດຄັດລອກໄດ້ອັດຕະໂນມັດ: ' + e.message);
    }
};

$('gen').onclick=build;$('prt').onclick=()=>{if(!$('rep').innerHTML.trim())build();if(!rows.length)return alert('ຍັງບໍ່ມີຂໍ້ມູນທີ່ບັນທຶກ');try{print()}catch(e){alert('ພິມບໍ່ໄດ້ໃນໜ້ານີ້ — ດາວໂຫຼດແລ້ວພິມຈາກ Word')}};
function dls(name,data){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type:'text/plain;charset=utf-8'}));a.download=name;document.body.appendChild(a);a.click();a.remove()}
$('dlh').onclick=()=>{if(!$('rep').innerHTML.trim())build();const p=$('r_a').value+'_'+$('r_b').value;dls('report-'+p+'.html','<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:"Phetsarath OT",sans-serif}table{border-collapse:collapse;width:100%}th,td{border:1px solid #888;padding:4px 6px;vertical-align:top}th{background:#2E7DC4;color:#fff}h2,h3{text-align:center}</style></head><body>'+$('rep').innerHTML+'</body></html>')};
$('dlc').onclick=()=>{const q=v=>'"'+String(v==null?'':v).replace(/"/g,'""')+'"';const c='\ufeff'+['ວັນທີ,ເວລາ,ຫ້ອງ,ອາຈານ,ປະເພດຜູ້ສອນ,ວິຊາ,ລະດັບ,ນັກຮຽນ,ສະຖານະ,ສະພາບຫ້ອງ,ການສອນ,ບັນຫາ,ໝາຍເຫດ',...[...rows].sort((a,b)=>a.date.localeCompare(b.date)).map(r=>[fd(r.date),r.time,r.room,r.teacher,r.ttype,r.subject,lv(r),r.students,st(r),r.cond,r.teach,r.prob,r.details].map(q).join(','))].join('\n');dls('observations.csv',c)};
$('bk').onclick=()=>dls('backup-'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify(rows));
$('im').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const a=JSON.parse(r.result);if(!Array.isArray(a))throw 0;const m={};rows.concat(a).forEach(x=>{if(x&&x.id){x.room=rn(x.room);m[x.id]=x}});rows=Object.values(m);Promise.all(rows.map(put)).catch(e=>alert(e.message));drawList();alert('ນຳເຂົ້າແລ້ວ '+a.length+' ແຖວ')}catch(x){alert('ໄຟລບໍ່ຖືກຕ້ອງ')}};r.readAsText(f);e.target.value=''};
drawList();
$('q').oninput=drawList;['input','change'].forEach(e=>$('f_date').addEventListener(e,drawCV));
$('clr').onclick=()=>{if(confirm('ລົບຂໍ້ມູນທັງໝົດ? ກູ້ຄືນບໍ່ໄດ້ (ຄວນສຳຮອງກ່ອນ)')){Promise.all(rows.map(r=>del(r.id))).catch(e=>alert(e.message));rows=[];drawList()}};
const FB={apiKey:'AIzaSyCCsdUdP59Aij3AwaF6TI7RgYFsRywHPUo',authDomain:'lunadata-p73.firebaseapp.com',projectId:'lunadata-p73',appId:'1:773621836032:web:ccc642364faa26a9696be5'};
(function(){const s=$('dbs');
 if(!FB.projectId){rows=load().map(r=>Object.assign(r,{room:rn(r.room)}));drawList();s.textContent='🟡 ໂໝດໃນເຄື່ອງ: ຂໍ້ມູນເກັບໃນເບຣາເຊີນີ້ເທົ່ານັ້ນ (ຍັງບໍ່ໄດ້ຕັ້ງຄ່າ Firebase)';$('lo').classList.add('hide');return}
 firebase.initializeApp(FB);const au=firebase.auth();let un=null;
 au.onAuthStateChanged(u=>{if(un){un();un=null}
  if(!u){DB=null;rows=[];drawList();$('lg').classList.remove('hide');s.textContent='🔴 ຍັງບໍ່ໄດ້ເຂົ້າສູ່ລະບົບ';return}
  $('lg').classList.add('hide');DB=firebase.firestore();
  if(!window._p){window._p=1;DB.enablePersistence({synchronizeTabs:true}).catch(()=>{})}
  try{const old=JSON.parse(localStorage.getItem(KEY)||'[]');
   if(old.length&&confirm('ພົບຂໍ້ມູນເກົ່າໃນເຄື່ອງນີ້ '+old.length+' ແຖວ ອັບໂຫຼດຂຶ້ນ Cloud ບໍ?'))
    Promise.all(old.map(r=>put(Object.assign(r,{room:rn(r.room)})))).then(()=>{localStorage.setItem(KEY+'_bak',JSON.stringify(old));localStorage.removeItem(KEY)}).catch(e=>alert(e.message))}catch(e){}
  un=DB.collection('obs').onSnapshot(q=>{rows=q.docs.map(d=>Object.assign({},d.data(),{id:d.id})).map(r=>Object.assign(r,{room:rn(r.room)}));drawList();s.textContent='🟢 ເຊື່ອມແລ້ວ · '+u.email},()=>{s.textContent='🔴 ອ່ານຂໍ້ມູນບໍ່ໄດ້ (ກວດ Rules)'})});
 $('lgb').onclick=()=>au.signInWithEmailAndPassword($('em').value.trim(),$('pw').value).then(()=>{$('lge').textContent=''}).catch(()=>{$('lge').textContent='ອີເມວ ຫຼືລະຫັດຜ່ານບໍ່ຖືກ'});
 $('pw').onkeydown=e=>{if(e.key=='Enter')$('lgb').click()};$('lo').onclick=()=>au.signOut()})();
