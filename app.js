(() => {
  'use strict';
  const data = window.PORTFOLIO;
  if (!data) return;
  const $ = (s, parent = document) => parent.querySelector(s);
  const $$ = (s, parent = document) => [...parent.querySelectorAll(s)];
  const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeURL = (value = '') => {
    const raw = String(value).trim();
    if (!raw || raw.startsWith('//')) return '';
    if (/^[a-z][a-z\d+.-]*:/i.test(raw) && !/^https?:\/\//i.test(raw)) return '';
    return escapeHTML(raw);
  };
  const grid = $('#project-grid');
  const home = $('#home-view');
  const projectView = $('#project-view');
  let currentProject = null;
  let navigationFrame = 0;
  let activeFilter = 'all';
  const videoBindings = new Map();
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const categories = [['all','All'],['team','Team projects'],['personal','Personal projects'],['jam','Game jams'],['school','School assignments']];
  const orderedProjects = (items, category) => {
    const ids = data.projectOrder?.[category] || data.projectOrder?.all || [];
    const ranks = new Map(ids.map((id, index) => [id, index]));
    return [...items].sort((a, b) => (ranks.get(a.id) ?? ids.length) - (ranks.get(b.id) ?? ids.length));
  };
  const projects = orderedProjects(data.projects, 'all');
  const projectCategories = p => p.categories || [p.category === 'study' ? 'school' : p.category];
  const roman = n => {
    let output = '';
    for (const [value, label] of [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']]) {
      while (n >= value) { output += label; n -= value; }
    }
    return output;
  };
  const projectNumber = p => roman(projects.indexOf(p) + 1);

  // Inline asset lookup is populated only in the standalone HTML export.
  const assetURL = value => escapeHTML((window.PORTFOLIO_ASSETS || {})[value] || value || '');
  const hasVideo = p => p.video && ((p.video.type === 'file' && safeURL(p.video.url)) || (p.video.type === 'youtube' && /^[A-Za-z0-9_-]{11}$/.test(p.video.id)));

  const diagrams = {
    routes: { source: 'Locked passage', branches: [['Find the key','Open the gate'],['Trace the release','Open service route']], outcome: 'Reach the courtyard' },
    signal: { source: 'Signal received', branches: [['Valid link','Forward signal'],['Broken link','Lose signal']] },
    interaction: { source: 'Use device', branches: [['Path clear','Device moves'],['Path blocked','Device stops']] },
    economy: { source: 'Resource reserve', branches: [['Spend now','Current operation'],['Invest','Future capacity']] },
    narrative: { source: 'Shared resource', branches: [['Preserve','Resource remains'],['Use','World state changes']] }
  };
  function diagram(p, compact = false) {
    const d = p.diagramData || diagrams[p.diagram] || diagrams.routes;
    const description = `${d.source}. ${d.branches.map(b => `${b[0]} leads to ${b[1]}`).join('. ')}.${d.outcome ? ` Both lead to: ${d.outcome}.` : ''}`;
    return `<div class="system-diagram ${compact ? 'diagram-compact' : ''}" role="img" aria-label="${escapeHTML(description)}"><div class="diagram-source">${escapeHTML(d.source)}</div><div class="diagram-branches">${d.branches.map(([condition,result]) => `<div class="diagram-branch"><span class="diagram-condition">${escapeHTML(condition)}</span><span class="diagram-node">${escapeHTML(result)}</span></div>`).join('')}</div>${d.outcome ? `<div class="diagram-outcome">${escapeHTML(d.outcome)}</div>` : ''}</div>`;
  }
  function cover(p, large = false) {
    const brand = p.coverFit === 'brand' && safeURL(p.cover);
    const art = brand
      ? `<div class="cover-brand">${p.coverLogo && safeURL(p.coverLogo) ? `<img class="cover-brand-logo" src="${assetURL(p.coverLogo)}" alt="${escapeHTML(p.coverLogoAlt || '')}" width="32" height="32">` : ''}<img class="cover-brand-title" src="${assetURL(p.cover)}" alt="${escapeHTML(p.coverAlt || p.title)}" width="${Number(p.coverWidth) || 200}" height="${Number(p.coverHeight) || 64}"></div>`
      : p.cover && safeURL(p.cover)
      ? `<img src="${assetURL(p.cover)}" alt="${escapeHTML(p.coverAlt || p.title)}" width="${Number(p.coverWidth) || 1536}" height="${Number(p.coverHeight) || 1024}" loading="${large || p === projects[0] ? 'eager' : 'lazy'}">`
      : p.diagram ? diagram(p,true) : '<div class="video-placeholder"><span>Project image</span></div>';
    const content = large && !brand && p.cover && safeURL(p.cover) ? `<button type="button" class="image-open cover-open" data-image="${escapeHTML(p.cover)}" data-title="${escapeHTML(p.title)}" data-alt="${escapeHTML(p.coverAlt || p.title)}" aria-label="Enlarge: ${escapeHTML(p.title)}">${art}</button>` : art;
    const preview = !large && p.cardPreview && safeURL(p.cardPreview.url) ? `<video class="card-video" data-card-video="${escapeHTML(p.id)}" data-loop-video data-src="${assetURL(p.cardPreview.url)}" muted loop playsinline preload="none" width="1280" height="720" aria-hidden="true" tabindex="-1"></video>` : '';
    return `<div class="cover ${p.cover ? '' : 'cover-diagram'} ${p.coverFit === 'contain' ? 'cover-contain' : ''}${large && p.coverWide ? ' cover-wide' : ''}">${content}${preview}</div>`;
  }

  function renderFilters() {
    $('#project-filters').innerHTML = categories.map(([id,label]) => {
      const count = id === 'all' ? projects.length : projects.filter(p => projectCategories(p).includes(id)).length;
      return `<button type="button" class="filter-button" data-filter="${id}" aria-pressed="${id === activeFilter}" aria-controls="project-grid">${label}<span class="filter-count" aria-hidden="true">${count}</span></button>`;
    }).join('');
    $$('.filter-button').forEach(button => button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      $$('.filter-button').forEach(b => b.setAttribute('aria-pressed',String(b === button)));
      renderCards();
    }));
  }
  function renderCards() {
    releaseVideo(grid);
    const visible = orderedProjects(projects.filter(p => activeFilter === 'all' || projectCategories(p).includes(activeFilter)), activeFilter);
    grid.innerHTML = visible.map(p => `<article class="project-card"><a class="card-link" href="#project/${encodeURIComponent(p.id)}" aria-label="View project: ${escapeHTML(p.title)}">
      <figure class="card-figure">${cover(p)}<figcaption><span>Plate ${projectNumber(p)}</span><span>${escapeHTML(p.plateTitle || p.categoryLabel)}</span></figcaption></figure>
      <div class="card-body"><div class="card-meta"><span class="card-category">${escapeHTML(p.categoryLabel)}</span></div><h3>${escapeHTML(p.title)}</h3><p class="card-role"><span>My role</span> ${escapeHTML(p.role)}</p><p class="card-description">${escapeHTML(p.summary)}</p>
      <div class="card-bottom"><span class="card-tags">${(p.tags || []).map(escapeHTML).join(' · ')}</span><span class="card-action">Case study</span></div></div></a>
      ${p.cardPreview ? `<button class="preview-trigger card-motion-toggle" type="button" data-card-toggle="${escapeHTML(p.id)}" aria-label="Play preview: ${escapeHTML(p.title)}"><span data-preview-label>Play preview</span></button>` : hasVideo(p) ? `<button class="preview-trigger" type="button" data-preview="${escapeHTML(p.id)}" aria-label="Play preview: ${escapeHTML(p.title)}"><span class="play-icon" aria-hidden="true"></span>Play preview</button>` : ''}</article>`).join('') || '<p class="empty-state">No projects in this category yet.</p>';
    const count = `${String(visible.length).padStart(2,'0')} ${visible.length === 1 ? 'project' : 'projects'}`;
    $('.project-count').textContent = activeFilter === 'all' ? count : `${count} / ${String(projects.length).padStart(2,'0')}`;
    $$('.preview-trigger',grid).forEach(button => button.addEventListener('click', () => {
      const project = projects.find(p => p.id === button.dataset.preview);
      if (project) openMedia(project,button);
    }));
    bindCardPreviews();
  }

  function bindCardPreviews() {
    const cleanups = [];
    let active = true;
    const supportsObserver = typeof window.IntersectionObserver === 'function';
    const listen = (target, event, handler) => {
      target.addEventListener(event,handler);
      cleanups.push(()=>target.removeEventListener(event,handler));
    };
    const states = $$('[data-card-video]',grid).map(video => ({
      video, button: $(`[data-card-toggle="${video.dataset.cardVideo}"]`,grid),
      visible:!supportsObserver, userPaused:false, explicit:false, blocked:false,
      pending:false, ready:false, timer:null
    }));
    const allowed = state => active && state.visible && !home.hidden && !document.hidden &&
      !state.userPaused && !state.blocked && !document.body.classList.contains('no-scroll') &&
      (state.explicit || (supportsObserver && !motionPreference.matches && !window.navigator?.connection?.saveData)) &&
      !$$('video').some(video=>!video.hasAttribute('data-loop-video') && !video.paused && !video.ended);
    const cancelDelay = state => { if(state.timer!==null)clearTimeout(state.timer);state.timer=null; };
    const update = state => {
      const playing = !state.video.paused && allowed(state);
      state.video.classList.toggle('is-playing',playing);
      $('[data-preview-label]',state.button).textContent = playing ? 'Pause preview' : 'Play preview';
      const project = projects.find(p=>p.id===state.video.dataset.cardVideo);
      state.button.setAttribute('aria-label',`${playing ? 'Pause' : 'Play'} preview: ${project?.title || 'Gameplay'}`);
    };
    const play = state => {
      if(state.pending || !state.video.paused)return;
      if(!state.video.getAttribute('src'))state.video.src=state.video.dataset.src;
      state.video.muted=true;
      state.pending=true;
      Promise.resolve(state.video.play()).catch(error=>{
        if(error.name!=='AbortError')state.blocked=true;
      }).finally(()=>{
        state.pending=false;
        if(!allowed(state))state.video.pause();
        update(state);
      });
    };
    const sync = () => states.forEach(state=>{
      if(!allowed(state)){
        cancelDelay(state);state.ready=false;state.video.pause();update(state);return;
      }
      if(state.ready){play(state);return;}
      if(state.timer===null)state.timer=setTimeout(()=>{
        state.timer=null;state.ready=true;
        if(allowed(state))play(state);
      },700);
    });
    states.forEach(state=>{
      state.video.muted=true;
      listen(state.video,'play',()=>update(state));
      listen(state.video,'pause',()=>update(state));
      listen(state.video,'error',()=>{state.blocked=true;state.video.pause();update(state);});
      listen(state.button,'click',()=>{
        cancelDelay(state);
        if(!state.video.paused){state.userPaused=true;}
        else {
          state.userPaused=false;state.explicit=true;state.blocked=false;state.ready=true;state.visible=true;
          $$('video').filter(video=>!video.hasAttribute('data-loop-video')).forEach(video=>video.pause());
        }
        sync();
      });
      update(state);
    });
    const observer = supportsObserver ? new window.IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        const state=states.find(item=>item.video===entry.target);
        if(state)state.visible=entry.isIntersecting && entry.intersectionRatio>=0.55;
      });
      sync();
    },{threshold:[0,0.55]}) : null;
    states.forEach(state=>observer?.observe(state.video));
    videoBindings.set(grid,{sync,destroy(){
      active=false;observer?.disconnect();
      states.forEach(state=>{cancelDelay(state);state.video.pause();});
      cleanups.forEach(cleanup=>cleanup());
    }});
  }

  function videoMarkup(p) {
    if (p.mediaLinksOnly) return `<ul class="resource-list">${resourceLinks(p.links)}</ul>`;
    const v = p.video;
    if (v && v.type === 'file' && safeURL(v.url)) {
      const label = escapeHTML(v.title || 'Project video');
      const video = `<video class="project-video${v.loop ? ' loop-video' : ''}" width="${Number(v.width) || 1600}" height="${Number(v.height) || 900}" ${v.loop ? 'muted loop data-loop-video' : 'controls'} playsinline preload="none" aria-label="${label}" ${v.poster && safeURL(v.poster) ? `poster="${assetURL(v.poster)}"` : ''}><source src="${assetURL(v.url)}" type="video/mp4"><p>Your browser cannot play this video. <a href="${assetURL(v.url)}">Open the recording</a>.</p></video>`;
      const sourceLink = p.videoLink && safeURL(p.videoLink.url) ? `<p class="video-source"><a href="${safeURL(p.videoLink.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(p.videoLink.title)}<span class="sr-only"> (opens in a new tab)</span></a></p>` : '';
      return (v.loop ? `<div class="loop-player">${video}<button type="button" class="loop-toggle" aria-label="Play clip: ${label}"><span aria-hidden="true">▶</span></button></div>` : video) + sourceLink;
    }
    if (v && v.type === 'youtube' && /^[A-Za-z0-9_-]{11}$/.test(v.id)) {
      // A local file has no HTTP origin to identify itself to an embedded player.
      const canEmbed = /^https?:$/.test(window.location.protocol);
      return `<div class="youtube-player">${canEmbed ? `<div class="video-consent"><button class="button load-video" data-video="${escapeHTML(v.id)}" type="button">Load YouTube video</button></div>` : ''}<p class="video-fallback"><a ${canEmbed ? '' : 'class="button" '}href="https://www.youtube.com/watch?v=${escapeHTML(v.id)}" target="_blank" rel="noopener noreferrer">Watch on YouTube<span class="sr-only"> (opens in a new tab)</span></a></p></div>`;
    }
    return `<div class="video-placeholder"><span>Gameplay</span><p>${p.demo ? 'Add a gameplay clip or prototype walkthrough.' : 'Video coming soon.'}</p></div>`;
  }

  function resourceLinks(items = []) {
    return items.filter(item => safeURL(item.url)).map(item => `<li><a href="${safeURL(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.title)}<span class="sr-only"> (opens in a new tab)</span></a></li>`).join('');
  }

  function releaseVideo(container) {
    videoBindings.get(container)?.destroy();
    videoBindings.delete(container);
  }

  function updateVideoPlayback() {
    videoBindings.forEach(binding => binding.sync());
  }

  function bindVideo(container) {
    releaseVideo(container);
    const videos = $$('video', container);
    const cleanups = [];
    const listen = (target, event, handler) => {
      target.addEventListener(event, handler);
      cleanups.push(() => target.removeEventListener(event, handler));
    };
    const supportsObserver = typeof window.IntersectionObserver === 'function';
    let active = true;
    const states = videos.filter(video => video.hasAttribute('data-loop-video')).map(video => ({
      video, button:$('.loop-toggle',video.parentElement), visible:!supportsObserver,
      userPaused:false, userStarted:false, blocked:false, pending:false
    }));
    const canPlay = state => active && state.visible && !document.hidden &&
      !state.userPaused && !state.blocked &&
      (state.userStarted || (supportsObserver && !motionPreference.matches)) &&
      !(document.body.classList.contains('no-scroll') && !container.closest('dialog[open]')) &&
      !$$('video').some(video => !video.hasAttribute('data-loop-video') && !video.paused && !video.ended);
    const updateButton = state => {
      const playing = !state.video.paused;
      state.button.innerHTML = `<span aria-hidden="true">${playing ? 'Ⅱ' : '▶'}</span>`;
      state.button.setAttribute('aria-label',`${playing ? 'Pause' : 'Play'} clip: ${state.video.getAttribute('aria-label')}`);
    };
    const play = state => {
      if (state.pending || !state.video.paused) return;
      state.pending = true;
      Promise.resolve(state.video.play()).catch(error => {
        if (error.name !== 'AbortError') state.blocked = true;
      }).finally(() => {
        state.pending = false;
        if (!canPlay(state)) state.video.pause();
        else if (state.video.paused) play(state);
        updateButton(state);
      });
    };
    const sync = () => states.forEach(state => {
      if (canPlay(state)) play(state);
      else state.video.pause();
    });
    states.forEach(state => {
      state.video.muted = true;
      const toggle = () => {
        if (state.video.paused) {
          state.userPaused = false;
          state.userStarted = true;
          state.blocked = false;
          state.visible = true;
          $$('video').filter(video=>!video.hasAttribute('data-loop-video')).forEach(video=>video.pause());
          if (canPlay(state)) play(state);
        } else {
          state.userPaused = true;
          state.video.pause();
        }
      };
      listen(state.button,'click',toggle);
      listen(state.video,'click',toggle);
      listen(state.video,'play',()=>updateButton(state));
      listen(state.video,'pause',()=>updateButton(state));
      updateButton(state);
    });
    const observer = supportsObserver && states.length ? new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
        const state = states.find(item => item.video === entry.target);
        if (state) state.visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      });
      sync();
    },{threshold:[0,0.25]}) : null;
    states.forEach(state=>observer?.observe(state.video));
    videos.filter(video => !video.hasAttribute('data-loop-video')).forEach(video => {
      listen(video,'play',()=>{
        $$('video').forEach(other=>{if(other!==video)other.pause();});
        updateVideoPlayback();
      });
      listen(video,'pause',updateVideoPlayback);
      listen(video,'ended',updateVideoPlayback);
    });
    $$('.load-video', container).forEach(videoButton => listen(videoButton,'click', () => {
      const frame = document.createElement('iframe');
      frame.className = 'project-video';
      frame.src = `https://www.youtube-nocookie.com/embed/${videoButton.dataset.video}`;
      frame.title = 'Project video';
      frame.allow = 'encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.tabIndex = 0;
      videoButton.parentElement.replaceWith(frame);
      frame.focus();
    }));
    videoBindings.set(container,{sync,destroy(){
      active = false;
      observer?.disconnect();
      cleanups.forEach(cleanup=>cleanup());
      videos.forEach(video=>video.pause());
    }});
  }

  function movementClips(movement) {
    const clips = (movement.clips || []).filter(clip => safeURL(clip.url));
    if (!clips.length) return '';
    return `<div class="movement-comparison">${movement.comparisonNote ? `<p class="comparison-note">${escapeHTML(movement.comparisonNote)}</p>` : ''}<div class="movement-clips${movement.comparison === false ? ' media-pair' : ''}">${clips.map((clip,i) => `<figure class="movement-clip"><h3 id="movement-clip-${i}-title">${escapeHTML(clip.title)}</h3>${clip.type === 'image' ? imageButton({src:clip.url, title:clip.title, alt:clip.alt, width:clip.width, height:clip.height}) : videoMarkup({video:{...clip,type:'file'}})}<figcaption id="movement-clip-${i}-description">${escapeHTML(clip.description)}</figcaption></figure>`).join('')}</div></div>`;
  }

  function imageButton(item) {
    if (!safeURL(item.src)) return '';
    return `<button type="button" class="image-open" data-image="${escapeHTML(item.src)}" data-title="${escapeHTML(item.title)}" data-alt="${escapeHTML(item.alt)}" aria-label="Enlarge: ${escapeHTML(item.title)}"><img src="${assetURL(item.src)}" alt="${escapeHTML(item.alt)}" width="${Number(item.width) || 1200}" height="${Number(item.height) || 800}" loading="lazy"></button>`;
  }

  function imageGallery(items = [], paired = false) {
    const images = items.filter(item => safeURL(item.src));
    if (!images.length) return '';
    return `<div class="case-gallery${paired ? ' gallery-pair' : ''}">${images.map(item => `<figure class="gallery-figure">${imageButton(item)}<figcaption><h3>${escapeHTML(item.title)}</h3>${item.caption ? `<p>${escapeHTML(item.caption)}</p>` : ''}</figcaption></figure>`).join('')}</div>`;
  }

  function designNotes(items = []) {
    return `<dl class="movement-notes">${items.map(item => `<div><dt>${escapeHTML(item.label)}</dt><dd>${escapeHTML(item.text)}</dd></div>`).join('')}</dl>`;
  }

  function caseSection(section) {
    return `<section class="case-section" id="case-${escapeHTML(section.id)}"><div class="case-section-heading"><h2>${escapeHTML(section.title)}</h2>${section.note ? `<span class="archive-label">${escapeHTML(section.note)}</span>` : ''}</div>${section.rules ? `<dl class="minigame-rules">${section.rules.map(item => `<div><dt>${escapeHTML(item.label)}</dt><dd>${escapeHTML(item.text)}</dd></div>`).join('')}</dl>` : ''}${(section.paragraphs || []).map(text => `<p>${escapeHTML(text)}</p>`).join('')}${section.statements ? `<dl class="movement-notes">${section.statements.map(item => `<div><dt>${escapeHTML(item.label)}</dt><dd>${escapeHTML(item.text)}</dd></div>`).join('')}</dl>` : ''}${section.flow ? `<ol class="world-flow">${section.flow.map((item,i) => `<li><span class="eyebrow">${String(i+1).padStart(2,'0')}</span><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.text)}</p></li>`).join('')}</ol>` : ''}${section.credits ? `<dl class="scope-comparison">${section.credits.map(item => `<div><dt>${escapeHTML(item.label)}</dt><dd>${escapeHTML(item.text)}</dd></div>`).join('')}</dl>` : ''}${section.examples ? `<div class="work-examples"><h3>${escapeHTML(section.examples.title)}</h3><ul>${section.examples.items.map(text=>`<li>${escapeHTML(text)}</li>`).join('')}</ul></div>` : ''}${imageGallery(section.gallery, section.galleryPaired)}${section.clips ? movementClips({clips:section.clips,comparison:false}) : ''}${section.video ? `<figure class="case-recording">${videoMarkup(section)}${section.videoCaption ? `<figcaption>${escapeHTML(section.videoCaption)}</figcaption>` : ''}</figure>` : ''}${section.callout ? `<aside class="reflection"><span class="eyebrow">${escapeHTML(section.callout.label)}</span>${section.callout.text ? `<p>${escapeHTML(section.callout.text)}</p>` : ''}${section.callout.items ? `<ul>${section.callout.items.map(text=>`<li>${escapeHTML(text)}</li>`).join('')}</ul>` : ''}</aside>` : ''}</section>`;
  }

  function renderProject(p) {
    releaseVideo(projectView);
    const next = projects[(projects.indexOf(p) + 1) % projects.length];
    const anchor = section => `#project/${encodeURIComponent(p.id)}/${section}`;
    const iterationImage = (url,alt) => url && safeURL(url) ? `<img src="${assetURL(url)}" alt="${escapeHTML(alt)}" width="1536" height="1024" loading="lazy">` : '';
    const steps = p.processSteps || [
      ['Player intent',p.playerIntent || p.playerGoal],
      ['Design problem',p.designProblem || p.challenge],
      ['Design decision',p.designDecision || p.solution],
      ['Player consequence',p.playerConsequence || p.systemResponse],
      ['Observation',p.observation],
      ['Iteration',p.iteration]
    ].filter(([,text]) => text);
    const processImage = p.processImage && safeURL(p.processImage) ? iterationImage(p.processImage,p.processImageAlt || 'Design process diagram') : p.diagram ? diagram(p) : '';
    const sections = p.caseSections ? [...p.caseSections.map(section => [section.id,section.navTitle || section.title]),...(p.hideMedia ? [] : [['media',p.mediaTitle || 'Media & documents']])] : [['overview','Project context'],['process',p.processTitle ? 'Level design' : 'Design process'],['testing','Playtesting'],...(p.movementStudy ? [['movement','Movement feel']] : []),['team',p.reflectionTitle || 'Team & reflection'],['media',p.mediaTitle || 'Media & documents']];
    const levelComparison = p.levelComparison ? `<div class="iteration-grid level-comparison">${p.levelComparison.map(level => `<div class="iteration-stage"><p class="eyebrow">${escapeHTML(level.label)}</p><h3>${escapeHTML(level.title)}</h3><p>${escapeHTML(level.text)}</p></div>`).join('')}</div>` : '';
    const movement = p.movementStudy;
    const movementSection = movement ? `<section class="case-section" id="case-movement"><div class="case-section-heading"><h2>${escapeHTML(movement.title)}</h2><span class="archive-label">Movement note</span></div><dl class="movement-notes">${[['Design problem',movement.problem],['Design decision',movement.decision],['Why this decision',movement.intent],['My assessment',movement.reflection]].map(([label,text]) => `<div><dt>${label}</dt><dd>${escapeHTML(text)}</dd></div>`).join('')}</dl>${movementClips(movement)}</section>` : '';
    const caseContent = p.caseSections ? p.caseSections.map(caseSection).join('') : `<section class="case-section" id="case-overview"><h2>Project context</h2><p>${escapeHTML(p.overview)}</p></section>
      <section class="case-section" id="case-process"><div class="case-section-heading"><h2>${escapeHTML(p.processTitle || 'Design process')}</h2><span class="archive-label">Design note 01</span></div>${levelComparison}
      <ol class="process-sequence ${p.processSteps ? 'process-workflow' : ''}">${steps.map(([label,text],i) => `<li class="process-step ${label === 'Design decision' ? 'process-decision' : ''}"><span class="step-number" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><div><h3>${escapeHTML(label)}</h3><p>${escapeHTML(text)}</p>${label === 'Design decision' && p.rationale ? `<aside class="decision-reason"><h4>Why this decision</h4><p>${escapeHTML(p.rationale)}</p></aside>` : ''}</div></li>`).join('')}</ol>
      ${imageGallery(p.processGallery, true)}${processImage ? `<div class="annotated-figure"><figure class="process-figure">${processImage}<figcaption><span>Fig. 02</span> ${escapeHTML(p.diagramCaption || 'Design process and relationships.')}</figcaption></figure>${p.marginNote ? `<aside class="margin-note"><span class="eyebrow">Design note</span><p>${escapeHTML(p.marginNote)}</p></aside>` : ''}</div>` : ''}</section>
      <section class="case-section" id="case-testing"><div class="case-section-heading"><h2>Playtesting & iteration</h2>${p.testingStudy ? '' : '<span class="archive-label">Revision A / B</span>'}</div>${p.playtesting ? `<p class="test-method">${escapeHTML(p.playtesting)}</p>` : ''}${p.testingStudy ? designNotes(p.testingStudy) : `<div class="iteration-grid"><figure class="iteration-stage"><figcaption><span class="revision-code">A</span><h3>Before</h3></figcaption>${iterationImage(p.beforeImage,p.beforeImageAlt || 'Initial design')}<p>${escapeHTML(p.before || p.challenge || '')}</p></figure><figure class="iteration-stage"><figcaption><span class="revision-code">B</span><h3>After</h3></figcaption>${iterationImage(p.afterImage,p.afterImageAlt || 'Revised design')}<p>${escapeHTML(p.after || p.solution || '')}</p></figure></div>`}<aside class="${p.testingStudy ? 'reflection' : 'iteration-result'}"><span class="eyebrow">${escapeHTML(p.outcomeLabel || 'Result / next test')}</span><p>${escapeHTML(p.outcome)}</p></aside></section>
      ${movementSection}<section class="case-section" id="case-team"><h2>${escapeHTML(p.reflectionTitle || 'Team & reflection')}</h2>${p.collaboration ? `<p>${escapeHTML(p.collaboration)}</p>` : ''}<aside class="reflection">${p.reflectionTitle ? '' : '<span class="eyebrow">What I learned</span>'}<p>${escapeHTML(p.lesson)}</p>${p.teamLesson ? `<p>${escapeHTML(p.teamLesson)}</p>` : ''}</aside></section>
      `;
    let projectFigure = `<figure class="project-figure${p.showCoverCaption === false ? ' no-caption' : ''}">${cover(p,true)}${p.showCoverCaption === false ? '' : `<figcaption><span>Fig. 01</span> ${escapeHTML(p.coverCaption || p.title)}</figcaption>`}</figure>`;
    if (p.videoInIntro && hasVideo(p)) projectFigure = `<figure class="project-figure no-caption intro-recording" aria-label="${escapeHTML(p.video.title || 'Project recording')}">${videoMarkup(p)}</figure>`;
    if (p.award) projectFigure = `<div>${projectFigure}<div class="jam-result"><strong>${escapeHTML(p.award.result)}</strong><span>${escapeHTML(p.award.event)}<br>Theme: ${escapeHTML(p.award.theme)}</span></div></div>`;
    projectView.innerHTML = `<nav class="project-nav" aria-label="Project navigation"><a href="#work">All projects</a><span class="eyebrow">No. ${projectNumber(p)} / ${escapeHTML(p.categoryLabel)}</span></nav>
      <header class="project-head">${p.demo ? '<p class="case-demo-note">Sample case study · Illustrative content, not a record of my work.</p>' : ''}<h1 id="project-title" tabindex="-1">${escapeHTML(p.title)}</h1><p class="project-lead">${escapeHTML(p.summary)}</p></header>
      <dl class="project-facts">${[['My role',p.role],['Team',p.team],['Duration',p.duration],['Engine / tools',p.engine]].map(([label,value]) => `<div><dt>${label}</dt><dd>${escapeHTML(value || '—')}</dd></div>`).join('')}</dl>
      <div class="project-intro-grid">${projectFigure}<aside class="contribution-summary"><p class="eyebrow">Scope of work</p><h2>My contribution</h2><ul class="contributions">${(p.contributions || []).map(text => `<li>${escapeHTML(text)}</li>`).join('')}</ul>${(p.links || []).length ? `<ul class="resource-list">${resourceLinks(p.links)}</ul>` : ''}<a class="project-jump" href="${anchor(p.projectJump?.section || 'media')}">${escapeHTML(p.projectJump?.label || p.mediaTitle || 'Gameplay & documents')}</a></aside></div>
      ${p.experience ? `<aside class="experience-band" aria-label="Intended player experience"><span class="eyebrow">Intended player<br>experience</span><div class="experience-copy"><p>${escapeHTML(p.experience)}</p>${p.experienceDetail ? `<p class="experience-detail">${escapeHTML(p.experienceDetail)}</p>` : ''}</div></aside>` : ''}
      <div class="case-layout"><nav class="case-index" aria-label="On this project page"><p class="eyebrow">Case contents</p>${sections.map(([id,label],i) => `<a href="${anchor(id)}"><span>${String(i+1).padStart(2,'0')}</span> ${escapeHTML(label)}</a>`).join('')}</nav>
      <div class="case-content">${caseContent}
      ${p.hideMedia ? '' : `<section class="case-section" id="case-media"><h2>${escapeHTML(p.mediaTitle || 'Media & documents')}</h2>${videoMarkup(p)}${(p.documents || []).length ? `<ul class="resource-list">${resourceLinks(p.documents)}</ul>` : ''}${p.demo ? '<details class="document-example"><summary>Case study material to add</summary><div><p>A short gameplay recording, an annotated screenshot or blockout, and a concise design document.</p><p>Use real observations, credit teammates, and separate an expected consequence from a tested result.</p></div></details>' : ''}</section>`}</div></div>
      <div class="project-end"><a class="button" href="#work">All projects</a>${next && next.id !== p.id ? `<a href="#project/${encodeURIComponent(next.id)}"><span class="eyebrow">Next project / No. ${projectNumber(next)}</span><span class="next-title">${escapeHTML(next.title)}</span></a>` : ''}</div>`;
    bindVideo(projectView);
    $$('.image-open',projectView).forEach(button => button.addEventListener('click', () => openImage(button)));
  }

  const menu = $('.menu-toggle');
  const nav = $('#main-nav');
  function closeMenu() {
    nav.classList.remove('is-open');
    menu.setAttribute('aria-expanded','false');
    menu.innerHTML = 'Menu <span aria-hidden="true">☰</span>';
  }
  menu.addEventListener('click', () => {
    const isOpen = menu.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu();
    else {
      nav.classList.add('is-open');
      menu.setAttribute('aria-expanded','true');
      menu.innerHTML = 'Close <span aria-hidden="true">×</span>';
    }
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a, button')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
  });
  window.matchMedia('(min-width: 601px)').addEventListener('change', closeMenu);

  function focusAndScroll(target, initial = false) {
    if (!target) return;
    if (!initial) {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex','-1');
      target.focus({preventScroll:true});
    }
    target.scrollIntoView({behavior:'instant',block:'start'});
  }
  function route(initial = false) {
    cancelAnimationFrame(navigationFrame);
    const hash = window.location.hash.slice(1);
    if (hash === 'main-content') { focusAndScroll($('#main-content')); return; }
    const match = hash.match(/^project\/([^/]+)(?:\/([a-z0-9-]+))?$/);
    let p = null;
    if (match) {
      try { p = data.projects.find(item => item.id === decodeURIComponent(match[1])); } catch { /* Invalid URLs return to work. */ }
    }
    closeMenu();
    if (p) {
      const changed = currentProject !== p.id;
      if (changed) renderProject(p);
      currentProject = p.id;
      home.hidden = true;
      projectView.hidden = false;
      document.title = `${p.title} — ${data.name}`;
      navigationFrame = requestAnimationFrame(() => {
        if (currentProject !== p.id || projectView.hidden) return;
        if (match[2]) focusAndScroll($(`#case-${match[2]}`),initial);
        else if (changed || initial) { window.scrollTo({top:0,behavior:'instant'}); $('#project-title')?.focus({preventScroll:true}); }
      });
    } else {
      const wasProject = !!currentProject;
      currentProject = null;
      home.hidden = false;
      projectView.hidden = true;
      if (wasProject) { releaseVideo(projectView); projectView.innerHTML = ''; }
      document.title = `${data.name} — Game Designer`;
      const target = ['work','about','contact','home'].includes(hash) ? $(`#${hash}`) : hash.startsWith('project/') ? $('#work') : null;
      navigationFrame = requestAnimationFrame(() => {
        if (target) focusAndScroll(target,initial);
        else if (wasProject) window.scrollTo({top:0,behavior:'instant'});
      });
    }
    updateVideoPlayback();
  }

  $$('[data-cv]').forEach(link => {
    const available = Boolean(data.cvUrl && safeURL(data.cvUrl));
    link.href = available ? ((window.PORTFOLIO_ASSETS || {})[data.cvUrl] || data.cvUrl) : `mailto:${data.email}?subject=CV%20request`;
    $('[data-cv-label]', link).textContent = available ? 'CV' : 'Request CV';
    if (available) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
  });
  if (data.designFocus) $('[data-design-focus]').textContent = data.designFocus;
  const mediaDialog = $('#media-dialog');
  let mediaTrigger = null;
  function openMedia(project, trigger) {
    releaseVideo($('#media-content'));
    mediaTrigger = trigger;
    mediaDialog.classList.remove('image-dialog');
    $('#media-title').classList.remove('sr-only');
    $('.dialog-close',mediaDialog).setAttribute('aria-label','Close video');
    $('#media-title').textContent = project.title;
    $('#media-content').innerHTML = videoMarkup(project);
    bindVideo($('#media-content'));
    mediaDialog.showModal();
    document.body.classList.add('no-scroll');
    $$('video',projectView).forEach(video=>video.pause());
    updateVideoPlayback();
    $('.dialog-close',mediaDialog).focus();
  }
  function openImage(trigger) {
    if (!safeURL(trigger.dataset.image)) return;
    mediaTrigger = trigger;
    $('#media-title').textContent = trigger.dataset.title;
    $('#media-title').classList.add('sr-only');
    $('#media-content').innerHTML = `<img class="enlarged-image" src="${assetURL(trigger.dataset.image)}" alt="${escapeHTML(trigger.dataset.alt)}">`;
    $('.dialog-close',mediaDialog).setAttribute('aria-label','Close image');
    mediaDialog.classList.add('image-dialog');
    mediaDialog.showModal();
    document.body.classList.add('no-scroll');
    $$('video',projectView).forEach(video=>video.pause());
    updateVideoPlayback();
    $('.dialog-close',mediaDialog).focus();
  }
  $('.dialog-close',mediaDialog).addEventListener('click', () => mediaDialog.close());
  mediaDialog.addEventListener('close', () => {
    releaseVideo($('#media-content'));
    mediaDialog.classList.remove('image-dialog');
    $('#media-title').classList.remove('sr-only');
    $('#media-content').innerHTML = '';
    document.body.classList.remove('no-scroll');
    updateVideoPlayback();
    if (mediaTrigger && mediaTrigger.isConnected) mediaTrigger.focus();
  });
  mediaDialog.addEventListener('click', event => {
    const rect = mediaDialog.getBoundingClientRect();
    if (event.target === mediaDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) mediaDialog.close();
  });
  $$('[data-email]').forEach(link => { link.href = `mailto:${data.email}`; if (link.classList.contains('contact-email')) link.textContent = data.email; });
  $$('[data-linkedin]').forEach(link => { if (/^https:\/\//.test(data.linkedin)) link.href = data.linkedin; });
  $('#year').textContent = String(new Date().getFullYear());
  renderFilters();
  renderCards();
  document.addEventListener('visibilitychange',updateVideoPlayback);
  motionPreference.addEventListener('change',updateVideoPlayback);
  window.addEventListener('hashchange', () => route());
  route(true);
})();
