// Loads news from news.json and inserts into pages.
// news.json format: array of {title, file, date}
async function loadNews(targetId, limit){
  try{
    const resp = await fetch('news.json');
    const data = await resp.json();
    if(!Array.isArray(data)) throw 'Invalid news.json';
    // sort by date desc
    data.sort((a,b)=> b.date.localeCompare(a.date));
    const list = document.getElementById(targetId);
    if(!list) return;
    list.innerHTML='';
    const items = (limit? data.slice(0,limit) : data);
    items.forEach(n=>{
      const div = document.createElement('div');
      div.className='news-item';
      const a = document.createElement('a');
      a.href = n.file;
      a.target='_blank';
      a.textContent = n.title;
      const d = document.createElement('div');
      d.className='small';
      d.textContent = n.date;
      div.appendChild(a);
      div.appendChild(d);
      list.appendChild(div);
    });
    if(items.length===0) list.innerHTML='<p>Новин ще немає.</p>';
  }catch(e){
    const el = document.getElementById(targetId);
    if(el) el.innerHTML = '<p>Не вдалося завантажити новини.</p>';
    console.error(e);
  }
}

document.addEventListener('DOMContentLoaded',()=>{
  // if on index — show 3 latest
  if(document.getElementById('latest-news')) loadNews('latest-news',3);
  // if on news page — show all
  if(document.getElementById('news-list')) loadNews('news-list');
});
