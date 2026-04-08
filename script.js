    // Navbar scroll shadow
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 30);
      });
    }
    });

    function toggleNav() {
      document.getElementById('navLinks').classList.toggle('open');
    }

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      console.log(entries);
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });



    /* ── Amenities Tabs ── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById('tab-' + btn.dataset.tab);
    if (panel) {
      panel.classList.add('active');
      // re-trigger card animations
      panel.querySelectorAll('.amenity-card').forEach((c, i) => {
        c.style.opacity = '0'; c.style.transform = 'translateY(20px)';
        setTimeout(() => { c.style.transition = 'opacity 0.4s, transform 0.4s'; c.style.opacity = '1'; c.style.transform = 'none'; }, i * 60);
      });
    }
  });
});



/* ── Illustrated Map Canvas ── */
(function drawMap() {
  const canvas = document.getElementById('mapCanvas');
  if (!canvas) return;
  const W = canvas.offsetWidth || 600;
  canvas.width = W;
  canvas.height = 520;
  const ctx = canvas.getContext('2d');

  // background
  ctx.fillStyle = '#EDE8DF';
  ctx.fillRect(0, 0, W, 520);

  // grid — subtle streets
  ctx.strokeStyle = '#D9D3C8';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 520); ctx.stroke(); }
  for (let y = 0; y < 520; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  // main roads
  const roads = [
    [0, 260, W, 260], [W/2, 0, W/2, 520],
    [0, 160, W, 160], [0, 360, W, 360],
    [W*0.3, 0, W*0.3, 520], [W*0.7, 0, W*0.7, 520],
    [0, 80, W, 120], [0, 440, W, 400]
  ];
  ctx.strokeStyle = '#C8BFB0'; ctx.lineWidth = 8;
  roads.forEach(([x1,y1,x2,y2]) => { ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); });

  // road lines
  ctx.strokeStyle = '#D9D3C8'; ctx.lineWidth = 1; ctx.setLineDash([12,10]);
  roads.forEach(([x1,y1,x2,y2]) => { ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); });
  ctx.setLineDash([]);

  // blocks
  const blocks = [
    [40,200,180,100,'#D6CFBF'], [220,200,120,100,'#DAD4C6'],
    [W*0.7+20,200,180,100,'#D6CFBF'], [40,290,180,60,'#DDD8CC'],
    [220,290,120,60,'#D9D3C5'], [W*0.7+20,290,180,60,'#D6CFBF'],
    [40,80,370,70,'#D3CCBA'], [W*0.7+20,80,180,70,'#D3CCBA'],
    [40,370,180,60,'#DDD8CC'], [220,370,120,60,'#D9D4C7'],
    [W*0.7+20,370,180,60,'#DAD4C6'],
  ];
  blocks.forEach(([x,y,w,h,c]) => {
    ctx.fillStyle = c; ctx.strokeStyle = '#C0BAB0'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(x,y,w,h,3); ctx.fill(); ctx.stroke();
  });

  // park
  ctx.fillStyle = '#B8D4A8';
  ctx.beginPath(); ctx.roundRect(W*0.3+12, 172, 145, 78, 6); ctx.fill();
  ctx.fillStyle = '#A8C898'; ctx.font = '11px DM Sans, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('City Park', W*0.3+84, 218);

  // hotel marker
  const cx = W/2, cy = 260;
  // glow
  const grd = ctx.createRadialGradient(cx,cy,0,cx,cy,50);
  grd.addColorStop(0, 'rgba(201,168,76,0.35)');
  grd.addColorStop(1, 'rgba(201,168,76,0)');
  ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(cx,cy,50,0,Math.PI*2); ctx.fill();

  // pin
  ctx.fillStyle = '#1A5C3A';
  ctx.beginPath(); ctx.arc(cx, cy-4, 14, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.moveTo(cx-10, cy+8); ctx.lineTo(cx+10, cy+8); ctx.lineTo(cx, cy+22); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#E8D5A3';
  ctx.beginPath(); ctx.arc(cx, cy-4, 6, 0, Math.PI*2); ctx.fill();

  // labels
  ctx.fillStyle = '#8B8070'; ctx.font = '10px DM Sans, sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Regal Blvd', W/2, 250);
  ctx.fillText('Park Ave', W*0.3, 155);
  ctx.fillText('Heritage Rd', W*0.7, 155);

  // compass
  ctx.fillStyle = '#A09585'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('N', W-30, 36); ctx.fillStyle = '#C9A84C';
  ctx.beginPath(); ctx.moveTo(W-30,44); ctx.lineTo(W-26,58); ctx.lineTo(W-30,56); ctx.lineTo(W-34,58); ctx.closePath(); ctx.fill();
})();

window.addEventListener('resize', () => {
  setTimeout(() => { (function drawMap() {
    const canvas = document.getElementById('mapCanvas');
    if (!canvas) return;
    const W = canvas.offsetWidth || 600;
    canvas.width = W; canvas.height = 520;
    // re-run by triggering the IIFE
    document.getElementById('mapCanvas').dispatchEvent(new Event('redraw'));
  })(); }, 100);
});

