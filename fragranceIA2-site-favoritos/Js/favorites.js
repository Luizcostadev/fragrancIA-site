const STORAGE_KEY = 'minha_barra_favoritos_v1';
const favListEl = document.getElementById('favList');
const addBtn = document.getElementById('addBtn');
const favSearch = document.getElementById('favSearch');
const importBtn = document.getElementById('importBtn');
let favorites = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

const sample = [
  {title:'FragrancIA', url:'https://fragrancia.example', icon:'A'},
  {title:'Inspiration', url:'https://example.com', icon:'I'},
  {title:'Docs', url:'https://docs.example', icon:'D'}
];
if(favorites.length===0){favorites = sample; save();}

function save(){localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));}

function render(filter=''){
  favListEl.innerHTML='';
  favorites.filter(f => f.title.toLowerCase().includes(filter.toLowerCase())).forEach((f, idx)=>{
    const tpl = document.getElementById('favTpl').content.cloneNode(true);
    const item = tpl.querySelector('.fav-item');
    item.dataset.idx = idx;
    tpl.querySelector('.icon').textContent = f.icon || f.title.charAt(0).toUpperCase();
    tpl.querySelector('.label').textContent = f.title;

    item.addEventListener('click', (e)=>{
      if(e.target.classList.contains('remove-btn')) return;
      window.open(f.url,'_blank');
    });

    tpl.querySelector('.remove-btn').addEventListener('click', (ev)=>{
      ev.stopPropagation();
      favorites.splice(idx,1); save(); render(favSearch.value);
    });

    item.addEventListener('dragstart', (ev)=>{ item.classList.add('dragging'); ev.dataTransfer.setData('text/plain', idx); });
    item.addEventListener('dragend', ()=>{ item.classList.remove('dragging'); save(); render(favSearch.value); });
    item.addEventListener('dragover', (ev)=>{ ev.preventDefault(); const from = Number(ev.dataTransfer.getData('text/plain')); const to = Number(item.dataset.idx); if(from !== to){
        const [m] = favorites.splice(from,1); favorites.splice(to,0,m); ev.dataTransfer.setData('text/plain', to); render(favSearch.value);
      }});
    favListEl.appendChild(tpl);
  });
}

addBtn.addEventListener('click', ()=>{
  const title = prompt('Nome do favorito (ex: Loja)');
  if(!title) return;
  const url = prompt('URL do favorito (comece com http:// ou https://)', 'https://');
  if(!url) return;
  favorites.push({title, url, icon: title.trim().charAt(0).toUpperCase()}); save(); render(favSearch.value);
});

favSearch.addEventListener('input', (e)=> render(e.target.value));

importBtn.addEventListener('click', ()=>{
  const txt = prompt('Cole um JSON de favoritos (array de objetos {title,url,icon}) ou deixe em branco para carregar amostra');
  if(!txt){favorites = sample.slice(); save(); render(); return}
  try{const arr = JSON.parse(txt); if(Array.isArray(arr)){favorites = arr; save(); render();} else alert('JSON deve ser um array');}
  catch(err){alert('JSON inválido')}
});

render();
