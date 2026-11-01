import { useEffect, useRef, useState } from 'react';
import GrainientBackground from './GrainientBackground.jsx';
import PortfolioMotion from './PortfolioMotion.jsx';
import StarCursor from './StarCursor.jsx';

const projects = [
  {
    slug: 'mobile-products',
    title: 'Zeekr HMI5.0',
    years: '2025.01.24',
    image: (import.meta.env.BASE_URL + 'work-cockpit-optimized.jpg'),
    alt: '汽车座舱音响系统与氛围灯主视觉',
    category: 'Zeekr HMI · 体验设计',
    summary: 'HMI5.0｜座舱体验迭代跃迁\n从3.0到5.0，突破既有设计边界，重构交互规则，以设计驱动智能座舱体验升级。',
    contribution: '通过 HMI 5.0，聚焦于用户体验，邀请您进入沉浸、全方位的设计之旅。',
  },
  {
    slug: 'flyme-auto',
    title: 'Super Eva',
    years: '2026.04.24',
    image: (import.meta.env.BASE_URL + 'work-supereva-optimized.jpg'),
    alt: '智能座舱 AI 助手与地图导航界面',
    category: 'Flyme Auto · 车载体验',
    summary: '聚焦车载数字产品的日常使用体验，覆盖核心功能、车内场景与系统交互。',
    contribution: '参与 Flyme Auto 系统体验设计，推动复杂功能清晰呈现并适配真实驾驶场景。',
  },
  {
    slug: 'ai-os',
    title: 'Console Screen',
    years: '2026.06.24',
    image: (import.meta.env.BASE_URL + 'console-screen-preview-optimized.jpg'),
    alt: '智能座舱中控屏显示 11:59 的特写',
    category: 'AI OS · 多模态交互',
    summary: '探索 AI 能力融入智能座舱后的交互方式，让语音、屏幕与情境服务形成连贯体验。',
    contribution: '参与 AI OS 体验方向与语音交互框架设计，梳理关键场景和多模态协同体验。',
  },
  {
    slug: 'sound-wave',
    title: 'Sound & Wave',
    years: '2025.04.20',
    video: (import.meta.env.BASE_URL + 'sound-wave-preview.mp4'),
    alt: 'Sound & Wave 智能座舱音响体验视频',
    category: 'Sound & Wave · Audio Experience',
    summary: '探索智能座舱中的声音体验与空间氛围，让音响系统、座舱设计和行车场景形成连贯感受。',
    contribution: '围绕座舱声学与沉浸体验，探索声音设计、空间表达和用户体验之间的联系。',
  },
  {
    slug: 'eva-robot',
    title: 'Eva Robot',
    years: '2025.06.12',
    image: (import.meta.env.BASE_URL + 'eva-robot-preview-optimized.jpg'),
    heroVideo: (import.meta.env.BASE_URL + 'eva-robot-main-web.mp4'),
    alt: 'Eva Robot 智能座舱 AI 体验预览',
    category: 'Eva Robot · 具身智能',
    summary: '探索 Eva Robot 在智能座舱中的交互体验，让 AI 助手以更自然、更有温度的方式参与出行场景。',
    contribution: '围绕语音、视觉与情境理解，构建连贯的智能助手体验。',
  },
];

const experiences = [
  {
    company: '极氪汽车',
    mark: 'ZEEKR',
    markClass: 'zeekr',
    date: '2022.08 — NOW',
    role: '交互设计主管工程师',
    bullets: [
      '负责 Zeekr AI OS、Flyme Auto 系统设计与整舱娱乐体验。',
      '参与多模态交互、语音框架与 AI OS 体验方向设计。',
      '从体验落地到设计方向制定，推动跨团队协作。',
    ],
    count: '/03',
  },
  {
    company: 'vivo',
    mark: 'vivo',
    markClass: 'vivo',
    date: '2021.06 — 2021.09',
    role: 'UX 设计师',
    bullets: [
      '参与手机系统框架巡检与改版，推动组件化建设。',
      '优化系统规范，并协同团队提升交付质量。',
    ],
    count: '/02',
  },
  {
    company: '南京移动互联网研究院',
    mark: 'UX',
    markClass: 'nii',
    date: '2020.04 — 2020.07',
    role: 'UX 设计师',
    bullets: [
      '参与校内工作室项目，负责小程序产品从 0 到 1 的交互设计。',
      '完成原型、高保真设计与落地，并根据反馈持续优化。',
    ],
    count: '/01',
  },
];

const sections = [
  ['showreel', 'Showreel'],
  ['work', 'Work'],
  ['about', 'About'],
  ['experience', 'Experience'],
  ['contact', 'Contact'],
];

function useShanghaiTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Shanghai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date()));
    };

    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return time;
}

function ShanghaiClock() {
  const time = useShanghaiTime();
  return <span className="clock">SHANGHAI {time}</span>;
}

function SiteHeader() {
  const [activeSection, setActiveSection] = useState('showreel');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', updateScrolled, { passive: true });
    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  useEffect(() => {
    const elements = sections
      .map(([id]) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <header className={`site-header${menuOpen ? ' menu-open' : ''}${scrolled ? ' is-scrolled' : ''}`}>
      <a className="brand" href="#showreel">HAZEL <span>/ Portfolio</span></a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'}
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span></span><span></span><span></span>
      </button>
      <nav id="site-navigation" aria-label="Main navigation">
        {sections.map(([id, label], index) => (
          <a className={activeSection === id ? 'active' : ''} href={`#${id}`} key={id} onClick={(event) => {
            setMenuOpen(false);
            const target = document.getElementById(id);
            if (target) {
              event.preventDefault();
              if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`);
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}>
            <i>{String(index + 1).padStart(2, '0')}</i> {label}
          </a>
        ))}
      </nav>
      <div className="availability">
        <a className="header-contact" href="#contact" onClick={(event) => {
          setMenuOpen(false);
          const target = document.getElementById('contact');
          if (target) {
            event.preventDefault();
            if (window.location.hash !== '#contact') window.history.pushState(null, '', '#contact');
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}>CONTACT <i>↗</i></a>
      </div>
    </header>
  );
}

function Showreel() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [translationPosition, setTranslationPosition] = useState({ x: 20, y: 20 });
  const [showTranslation, setShowTranslation] = useState(false);
  const updateTranslationPosition = (event) => {
    const bubbleWidth = Math.min(420, window.innerWidth - 24);
    const bubbleHeight = 150;
    setTranslationPosition({
      x: Math.max(12, Math.min(event.clientX + 18, window.innerWidth - bubbleWidth - 12)),
      y: Math.max(12, Math.min(event.clientY + 18, window.innerHeight - bubbleHeight - 12)),
    });
  };
  const focusTranslation = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTranslationPosition({ x: Math.max(12, rect.left), y: Math.max(12, rect.bottom + 12) });
    setShowTranslation(true);
  };
  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => setIsPlaying(false));
    else video.pause();
  };

  return (
    <section className="showreel" id="showreel">
      <div className={`showreel-frame ${isPlaying ? 'is-playing' : 'is-paused'}`}>
        <video ref={videoRef} className="showreel-video" autoPlay muted loop playsInline preload="metadata" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onClick={togglePlayback} aria-label="智能座舱设计作品集视频">
          <source src={import.meta.env.BASE_URL + 'showreel-3233-720p-web.mp4'} type="video/mp4" />
        </video>
        <div className="showreel-shade"></div>
      </div>
      <div className="showreel-copy">
        <div className="showreel-title"><span>黄子悦 · UX / UE DESIGNER</span><h1 className="hero-heading hero-heading--statement"><span className="hero-line hero-line--name"><span className="hero-line-inner">Design The Art Of</span></span><span className="hero-line hero-line--portfolio"><span className="hero-line-inner">Driving.</span></span><span className="hero-stars" aria-hidden="true">✦<i>✦</i><b>✦</b></span></h1><div className="hero-bio" tabIndex={0} aria-label="English bio. Hover or focus for Chinese translation." onPointerEnter={() => setShowTranslation(true)} onPointerMove={(event) => { updateTranslationPosition(event); setShowTranslation(true); }} onPointerLeave={() => setShowTranslation(false)} onFocus={focusTranslation} onBlur={() => setShowTranslation(false)}><p className="hero-bio-en">With 5+ years of UX/UE design experience, I specialize in automotive HMI. I lead in-cabin ecosystem experiences across vehicle AI, voice, and entertainment, with expertise from hands-on execution to setting design direction. I continually explore emerging technologies, including AI and embodied intelligence.</p><span className="hero-bio-hint">HOVER FOR CHINESE</span>{showTranslation && <div className="hero-bio-translation" role="tooltip" style={{ left: `${translationPosition.x}px`, top: `${translationPosition.y}px` }}><span>ZH / 中文翻译</span><p>拥有5年以上UX/UE设计经验，专注于智能汽车HMI领域，主导车机AI、语音、娱乐模块在内的整舱生态体验交付。具备从落地执行到设计方向制定的全链路能力，持续关注AI、具身智能等前沿科技。</p></div>}</div></div>
        <a className="play-button" href="#work" aria-label="浏览作品"><span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}

function ProjectBrowser() {
  const [activeProject, setActiveProject] = useState(() => projects.find((project) => project.slug === sessionStorage.getItem('active-work-project')) || projects[0]);

  return (
    <section className="work section-wrap" id="work">
      <div className="section-title"><h2>Work<span>.</span></h2></div>
      <div className="work-browser">
        <div className="project-list-wrap">
          <p className="hint">HOVER A ROW TO PREVIEW</p>
          <div className="project-list">
            {projects.map((project, index) => (
              <a href={`#project/${project.slug}`} onClick={() => { sessionStorage.setItem('work-scroll-position', String(window.scrollY)); sessionStorage.setItem('active-work-project', project.slug); }}
                className={`project-row${activeProject.title === project.title ? ' active' : ''}`}
                key={project.title}
                onMouseEnter={() => { setActiveProject(project); sessionStorage.setItem('active-work-project', project.slug); }}
                onFocus={() => { setActiveProject(project); sessionStorage.setItem('active-work-project', project.slug); }}
                aria-current={activeProject.title === project.title ? 'true' : undefined}
              >
                <span className="row-arrow">→</span><span className="row-index">{String(index + 1).padStart(2, '0')}</span>
                <strong>{project.title}</strong><small>{project.years}</small>
              </a>
            ))}
          </div>
        </div>
        <a className="project-preview" href={`#project/${activeProject.slug}`} onClick={() => { sessionStorage.setItem('work-scroll-position', String(window.scrollY)); sessionStorage.setItem('active-work-project', activeProject.slug); }} aria-label={`查看${activeProject.title}详情`}>
          {activeProject.video ? <video key={activeProject.video} className="project-preview-video" autoPlay muted loop playsInline preload="none" aria-label={activeProject.alt}><source src={activeProject.video} type="video/mp4" /></video> : <img key={activeProject.image} src={activeProject.image} loading="lazy" decoding="async" alt={activeProject.alt} />}
          <span className="preview-corners"></span>
        </a>
      </div>
    </section>
  );
}

const projectScenes = [
  { label: 'PROJECT OVERVIEW', title: 'The project, at a glance.' },
  { label: 'KEY SCENARIO', title: 'Context shapes the experience.' },
  { label: 'INTERFACE DETAILS', title: 'A closer look at the details.' },
  { label: 'INTERACTION FLOW', title: 'From action to response.' },
  { label: 'FINAL EXPERIENCE', title: 'The complete experience.' },
];

function ParallaxProjectSequence({ project }) {
  const sequenceRef = useRef(null);

  useEffect(() => {
    const sequence = sequenceRef.current;
    if (!sequence) return undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = sequence.getBoundingClientRect();
        const stage = sequence.querySelector('.parallax-stage');
        const travel = Math.max(1, sequence.offsetHeight - stage.clientHeight);
        const progress = Math.max(0, Math.min(1, (62 - rect.top) / travel));
        sequence.style.setProperty('--sequence-progress', progress);
        sequence.style.setProperty('--progress-width', `${progress * 100}%`);
        sequence.querySelectorAll('.parallax-scene').forEach((scene, index) => {
          const local = Math.max(0, Math.min(1, progress * projectScenes.length - index));
          const fadeIn = Math.min(1, local / 0.18);
          const fadeOut = Math.min(1, (1 - local) / 0.22);
          const isFirstFrame = index === 0 && progress <= 0.001;
          const isFinalFrame = index === projectScenes.length - 1 && progress >= 0.999;
          scene.style.setProperty('--scene-opacity', isFirstFrame || isFinalFrame ? 1 : Math.min(fadeIn, fadeOut));
          scene.style.setProperty('--scene-progress', local);
          scene.style.setProperty('--background-y', `${-progress * window.innerHeight * 0.15}px`);
          scene.style.setProperty('--window-y', `${-local * window.innerHeight * 0.55}px`);
          scene.style.setProperty('--text-y', `${-local * window.innerHeight}px`);
          scene.style.setProperty('--overlay-opacity', `${0.45 * (1 - local)}`);
          scene.style.setProperty('--scene-scale', `${1 + local * 0.08}`);
        });
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [project.slug]);

  const image = project.image;
  return (
    <section className="parallax-sequence" ref={sequenceRef} aria-label={`${project.title} project gallery`}>
      <div className="parallax-stage">
        {projectScenes.map((scene, index) => (
          <article className={`parallax-scene parallax-scene-${index + 1}`} key={scene.label} aria-label={`${scene.label} image placeholder`}>
            <div className="scene-background">{image && <img src={image} alt="" loading={index === 0 ? 'eager' : 'lazy'} />}</div>
            <div className="scene-overlay" />
            <div className="scene-window scene-window-back">{image && <img src={image} alt="" loading="lazy" />}</div>
            <figure className="scene-window scene-window-main">{project.video && index === 0 ? <video autoPlay muted loop playsInline aria-label={project.alt}><source src={project.video} type="video/mp4" /></video> : image ? <img src={image} alt={`${project.title} 场景图片占位 ${index + 1}`} loading={index === 0 ? 'eager' : 'lazy'} /> : <div className="scene-image-placeholder"><span>ADD PROJECT IMAGE</span><b>0{index + 1}</b></div>}<figcaption>IMAGE SLOT / 0{index + 1}</figcaption></figure>
            <div className="scene-window scene-window-side"><span>{project.title}</span><b>0{index + 1}</b><i>{scene.label}</i></div>
            <div className="scene-copy"><span>{scene.label}　/　0{index + 1}</span><h2>{scene.title}</h2></div>
          </article>
        ))}
        <span className="preview-corners" aria-hidden="true" />
      </div>
      <div className="parallax-progress" aria-hidden="true"><span /></div>
    </section>
  );
}

function ProjectDetail({ project }) {
  const index = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(index + 1) % projects.length];
  const previousProject = projects[(index - 1 + projects.length) % projects.length];
  if (project.slug === 'sound-wave') return <SoundWaveDetail project={project} nextProject={nextProject} previousProject={previousProject} index={index} />;
  return (
    <div className={`site-content project-detail-page${project.slug === 'ai-os' ? ' ai-os-detail' : ''}${project.slug === 'eva-robot' ? ' eva-robot-detail' : ''}${project.slug === 'mobile-products' ? ' mobile-products-detail' : ''}`}>
      <header className="project-detail-header">
        <a className="brand" href={import.meta.env.BASE_URL + '#showreel'}>HAZEL <span>/ Portfolio</span></a>
        <div className="project-detail-nav">
          <a className="detail-home" href={import.meta.env.BASE_URL + '#showreel'}>返回首页 <span>↗</span></a>
          <a className="detail-back" href={import.meta.env.BASE_URL + '#work'}>← ALL PROJECTS</a>
        </div>
      </header>
      <main className="project-detail section-wrap">
        <div className="case-hero case-hero-generic"><a className="case-all-work" href={import.meta.env.BASE_URL + '#work'}>←　ALL WORK</a><p className="eyebrow">{project.category}</p><h1>{project.title}</h1><div className="case-hero-media">{project.heroVideo ? <video src={project.heroVideo} autoPlay muted loop playsInline preload="none" aria-label={project.alt}/> : project.video ? <video autoPlay muted loop playsInline controls><source src={project.video} type="video/mp4"/></video> : <img src={project.image} alt={project.alt}/>}<span>PROJECT / {project.years}</span></div></div>
        <div className="detail-copy-grid">
          <p className="detail-lead">{project.summary}</p>
          <div className="detail-copy"><span>OVERVIEW</span><p>{project.contribution}</p><div className="detail-meta"><div><span>领域</span><b>{project.category}</b></div><div><span>时间</span><b>{project.years}</b></div><div><span>职责</span><b>UX / UE 体验设计</b></div></div></div>
        </div>
        {project.slug === 'flyme-auto' && <div className="detail-image-pair flyme-overview-pair" aria-label="Flyme Auto 概览图片"><img src={import.meta.env.BASE_URL + 'flyme-overview-3.9-optimized.jpg'} alt="Eva 专属伴游服务" loading="lazy"/><img src={import.meta.env.BASE_URL + 'flyme-overview-3.8-optimized.jpg?v=2'} alt="Eva 生活服务 Agent" loading="lazy"/></div>}
        <div className="detail-editorial">
          {[
            ['APPROACH', 'Designing around real moments.', '从用户旅程出发，梳理关键场景与体验机会，让复杂的产品能力以直观、自然的方式融入座舱。'],
            ['APPLICATION', 'One system, many situations.', '围绕清晰一致的交互框架，探索不同场景下的信息层级、视觉语言与反馈方式。'],
            ['DETAILS', 'Every detail has a purpose.', '从界面组件到动态反馈，持续打磨体验细节，并关注设计在真实使用环境中的可读性与易用性。'],
          ].map(([label, title, copy], i) => <section className="detail-chapter" key={label} id={`detail-${i}`}> {project.slug === 'mobile-products' && i === 2 && <video className="detail-chapter-media" data-deferred={import.meta.env.BASE_URL + 'zeekr-hmi5-november.mp4'} autoPlay muted loop playsInline preload="none" style={{ marginBottom: 32, height: 'auto', objectFit: 'contain' }} /> }{project.slug === 'mobile-products' && i === 2 && <img className="detail-chapter-media" src={import.meta.env.BASE_URL + 'zeekr-hmi5-sound-optimized.jpg'} alt="ZEEKR Sound 沉浸音效设计" loading="lazy" style={{ height: 'auto', maxHeight: 'none', marginBottom: 32 }} />}{!((project.slug === 'flyme-auto' || project.slug === 'eva-robot') && i === 0) && !((project.slug === 'ai-os' || project.slug === 'mobile-products') && i === 1) && <><span>0{i + 1} / {label}</span><h2>{title}</h2><p>{copy}</p></>}{project.slug === 'eva-robot' && i === 0 && <img className="detail-chapter-media" src={import.meta.env.BASE_URL + 'eva-robot-planning-optimized.jpg'} alt="Eva Robot 需求拆解与排期" loading="lazy"/>}{project.slug === 'mobile-products' && i === 1 ? <img className="detail-chapter-media" src={import.meta.env.BASE_URL + 'zeekr-user-research-testing-optimized.jpg'} alt="用户研究与方案测试" loading="lazy" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: 'none', objectFit: 'contain', padding: 0 }} /> : project.slug === 'flyme-auto' && i === 1 ? <video className="detail-chapter-media" data-deferred={import.meta.env.BASE_URL + 'supereva-route-planning-web.mp4'} autoPlay muted loop playsInline preload="none" /> : project.slug === 'eva-robot' && i === 2 ? <video className="detail-chapter-media" data-deferred={import.meta.env.BASE_URL + 'eva-robot-interaction.mov'} autoPlay muted loop playsInline preload="none" /> : project.slug === 'ai-os' && i === 2 ? <div className="detail-inline-pair"><img src={import.meta.env.BASE_URL + 'ai-os-console-4.jpg'} alt="Console Screen 游戏界面" loading="lazy"/><img src={import.meta.env.BASE_URL + 'ai-os-console-5.jpg'} alt="Console Screen 音乐界面" loading="lazy"/></div> : !(project.slug === 'mobile-products' && i === 1) && <img className="detail-chapter-media" src={project.slug === 'eva-robot' && i === 0 ? (import.meta.env.BASE_URL + 'eva-robot-design-traits.png') : project.slug === 'eva-robot' && i === 1 ? (import.meta.env.BASE_URL + 'eva-robot-expression-match.png') : project.slug === 'ai-os' ? [(import.meta.env.BASE_URL + 'ai-os-console-2-optimized.jpg'),(import.meta.env.BASE_URL + 'ai-os-console-3.jpg'),(import.meta.env.BASE_URL + 'ai-os-console-4.jpg')][i] : project.slug === 'mobile-products' && i === 0 ? (import.meta.env.BASE_URL + 'zeekr-hmi5-research-mono-optimized.jpg') : project.slug === 'mobile-products' && i === 2 ? (import.meta.env.BASE_URL + 'zeekr-hmi5-details-optimized.jpg') : project.slug === 'flyme-auto' && i === 0 ? (import.meta.env.BASE_URL + 'flyme-auto-approach-optimized.jpg') : project.slug === 'flyme-auto' && i === 2 ? (import.meta.env.BASE_URL + 'flyme-auto-details-optimized.jpg') : project.slug === 'flyme-auto' ? [(import.meta.env.BASE_URL + 'console-detachable-remote.jpg'),(import.meta.env.BASE_URL + 'console-4.jpg'),(import.meta.env.BASE_URL + 'console-5.jpg')][i] : [
            'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1800&q=85',
            'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=85',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=85',
          ][i]} alt={`${project.title} visual placeholder ${i + 1}`} loading="lazy"/>}</section>)}
        </div>
        <ProjectSwitch previousProject={previousProject} nextProject={nextProject} />
      </main>
      <DetailFooter />
    </div>
  );
}

function ProjectSwitch({ previousProject, nextProject }) {
  return <nav className="case-project-switch" aria-label="切换项目">
    {[{item:previousProject,label:'PREVIOUS PROJECT',arrow:'←'},{item:nextProject,label:'NEXT PROJECT',arrow:'→'}].map(({item,label,arrow})=><a className="case-project-card" href={`#project/${item.slug}`} key={label}><span className="case-project-arrow">{arrow}</span><div className="case-project-info"><small>{label}</small><strong>{item.title}</strong>{item.video ? <video data-deferred={item.video} autoPlay muted loop playsInline preload="none" aria-hidden="true"/> : <img src={item.image} alt="" loading="lazy"/>}</div></a>)}
  </nav>;
}

function SoundWaveDetail({ project, nextProject, previousProject, index }) {
  return <div className="site-content project-detail-page sound-case">
      <header className="project-detail-header"><a className="brand" href={import.meta.env.BASE_URL + '#showreel'}>HAZEL <span>/ Portfolio</span></a><div className="project-detail-nav"><a className="detail-home" href={import.meta.env.BASE_URL + '#showreel'}>返回首页 ↗</a><a className="detail-back" href={import.meta.env.BASE_URL + '#work'}>← ALL PROJECTS</a></div></header>
    <main className="case-main">
      <div className="case-hero"><a className="case-all-work" href={import.meta.env.BASE_URL + '#work'}>←　ALL WORK</a><p className="eyebrow">SOUND, SPACE & MOTION</p><h1>Sound &amp; Wave</h1><div className="case-hero-media"><video autoPlay muted loop playsInline preload="none" aria-label={project.alt}><source src={project.video} type="video/mp4"/></video><span>IN-CABIN SOUND EXPERIENCE　/　01</span></div></div>
      <section className="case-intro"><span className="eyebrow">PROJECT / OVERVIEW</span><h2>{project.summary}</h2><p>{project.contribution}</p><div className="case-facts">{[['PROJECT','Sound & Wave'],['YEAR',project.years],['ROLE','UX / UE Experience Design'],['FOCUS','Audio · Spatial experience · HMI']].map(([k,v])=><div key={k}><span>{k}</span><b>{v}</b></div>)}</div></section>
      <section className="case-section sound-dj-section" id="approach"><img src={import.meta.env.BASE_URL + 'sound-wave-dj.png'} alt="随行 DJ 交互与声音体验设计" loading="lazy" /></section>
      <section className="case-section sound-moods-section" id="application"><img src={import.meta.env.BASE_URL + 'sound-wave-listening-moods-optimized.jpg'} alt="三种音乐聆听界面" loading="lazy" /></section>
      <section className="case-section" id="experience"><div className="case-section-head"><span>04 / EXPERIENCE</span><h2>A journey through<br/><i>the listening experience.</i></h2></div><div className="experience-steps">{[['01','DISCOVER','发现声音内容','从熟悉的内容开始，快速进入聆听状态。'],['02','SHAPE','调整空间氛围','根据乘员与场景，轻松调整声音焦点和空间感。'],['03','IMMERSE','沉浸旅程之中','让音乐、座舱与旅程节奏融为一体。']].map(([n,t,c,d])=><article key={n}><span>{n}</span><div><small>{t}</small><h3>{c}</h3><p>{d}</p></div><b>↗</b></article>)}</div></section>
      <ProjectSwitch previousProject={previousProject} nextProject={nextProject} />
    </main><DetailFooter /></div>;
}

function DetailFooter() {
  return <footer className="detail-footer section-wrap"><div className="detail-footer-meta"><span>HUANG ZIYUE · HAZEL</span><span>SHANGHAI · CHINA</span><a href="#project-top" onClick={(event) => { event.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); }}>BACK TO TOP ↑</a></div><div className="detail-footer-base"><a className="brand" href={import.meta.env.BASE_URL + '#showreel'}>HAZEL <span>/ Portfolio</span></a><span>© 2026 HUANG ZIYUE</span><span>DESIGNED WITH INTENTION</span></div></footer>;
}

function About() {
  return (
    <section className="about section-wrap" id="about">
      <div className="section-title"><h2>About me<span>.</span></h2></div>
      <div className="about-grid">
        <div className="portrait"><img src={import.meta.env.BASE_URL + 'portrait.jpg'} loading="lazy" decoding="async" alt="黄子悦 Hazel 肖像" /><span>HAZEL HUANG · 1997</span></div>
        <div className="about-text">
          <span className="eyebrow">ABOUT ME</span>
          <h3>Hi, I'm Ziyue!</h3>
          <p className="about-lead">你好，我是子悦，一名 UX / UE 设计师。</p>
          <p>拥有 5 年以上体验设计经验，专注智能汽车 HMI 与数字产品，主导车机 AI、语音和娱乐体验。擅长把复杂系统梳理成清晰、自然且可落地的交互。</p>
          <div className="about-facts">
            <div><span>当前身份</span><b>UX / UE 体验设计师</b></div>
            <div><span>服务方向</span><b>智能座舱 · AI 交互 · 语音体验</b></div>
          </div>
          <div className="about-stats">
            <div><strong>5+</strong><span>YEARS EXPERIENCE</span></div>
            <div><strong>03</strong><span>CAREER ROLES</span></div>
            <div><strong>02</strong><span>DESIGN DOMAINS</span></div>
          </div>
          <div className="about-meta"><span>TOOLS</span><b>Figma · Claude · Cursor · Codex</b></div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="experience section-wrap" id="experience">
      <div className="section-title experience-title"><h2>Experience</h2></div>
      <p className="experience-subtitle"><span>CAREER PATH</span> 工作经历</p>
      <div className="career-path">
        <div className="career-cards">
          {experiences.map((experience) => (
            <article className="career-card" key={experience.company}>
              <span className="career-star" aria-hidden="true">✦</span>
              <p className="career-date">{experience.date}</p>
              <h3>{experience.company}</h3>
              <span className="career-role">{experience.role}</span>
              <ul>{experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
      <div className="education-block">
        <p className="experience-subtitle"><span>EDUCATION</span> 教育背景</p>
        <div className="career-path education-path">
          <div className="career-cards">
            <article className="career-card education-card"><span className="career-star" aria-hidden="true">✦</span><p className="career-date">2019 — 2022</p><h3>东南大学</h3><span className="career-role">工业设计工程 · 硕士</span></article>
            <article className="career-card education-card"><span className="career-star" aria-hidden="true">✦</span><p className="career-date">2015 — 2019</p><h3>南京林业大学</h3><span className="career-role">材料科学与工程 · 本科</span></article>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact section-wrap" id="contact">
      <div className="contact-heading"><h2>Get in Touch<span>.</span></h2><a className="contact-cv-link" href={import.meta.env.BASE_URL + 'cv-hazel.pdf'} download>DOWNLOAD RESUME <b>↓</b></a></div>
      <div className="contact-grid">
        <div className="contact-intro">
          <p>欢迎交流智能座舱、车载 AI 与数字产品合作。</p>
          <span>UX / UE DESIGN · OPEN TO COLLABORATION</span>
        </div>
        <div className="contact-qr"><span>WECHAT</span><img src={import.meta.env.BASE_URL + 'wechat-qr.png'} alt="微信二维码" /><small>Scan the QR code to<br />add my WeChat</small></div>
        <div className="contact-details">
          <div><span>EMAIL</span><a href="mailto:296960004@qq.com">296960004@qq.com <b>↗</b></a></div>
          <div><span>PHONE</span><a href="tel:+8618151770725">+86 181 5177 0725 <b>↗</b></a></div>
          <div><span>LOCATION</span><p>Shanghai · China</p></div>
        </div>
      </div>
      <div className="contact-wordmark" aria-label=""></div>
      <div className="contact-foot"><span>HUANG ZIYUE · HAZEL</span><span>SHANGHAI · CHINA</span><a href="#showreel">BACK TO TOP ↑</a></div>
    </section>
  );
}

function Footer() {
  return <footer className="site-footer section-wrap"><a className="brand" href="#showreel">HAZEL <span>/ Portfolio</span></a><span>© 2026 HUANG ZIYUE</span><span>DESIGNED WITH INTENTION</span></footer>;
}

export default function App() {
  const [projectRoute, setProjectRoute] = useState(() => window.location.hash.startsWith('#project/') ? window.location.hash.slice('#project/'.length) : '');
  useEffect(() => {
    const syncRoute = () => {
      const isProject = window.location.hash.startsWith('#project/');
      setProjectRoute(isProject ? window.location.hash.slice('#project/'.length) : '');
      if (isProject) {
        window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      } else {
        const targetId = window.location.hash.slice(1);
        if (targetId) window.requestAnimationFrame(() => window.requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView()));
      }
    };
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);
  useEffect(() => {
    const videos = new Set();
    const inView = new Set();
    const update = () => videos.forEach(video => {
      if (inView.has(video) && !document.hidden) video.play().catch(() => {});
      else video.pause();
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({target, isIntersecting}) => {
        if (isIntersecting) {
          if (target.dataset.deferred) {
            target.src = target.dataset.deferred;
            delete target.dataset.deferred;
            target.load();
          }
          inView.add(target);
        } else inView.delete(target);
      });
      update();
    }, {rootMargin: '150px'});
    const observeVideos = () => document.querySelectorAll('video').forEach(video => {
      if (!videos.has(video)) { videos.add(video); observer.observe(video); }
    });
    observeVideos();
    const mutations = new MutationObserver(observeVideos);
    mutations.observe(document.getElementById('root'), {childList: true, subtree: true});
    document.addEventListener('visibilitychange', update);
    return () => { mutations.disconnect(); observer.disconnect(); document.removeEventListener('visibilitychange', update); videos.forEach(video => video.pause()); };
  }, [projectRoute]);
  const currentProject = projects.find((project) => project.slug === projectRoute);
  return (
    <>
      {!currentProject && <GrainientBackground />}
      <StarCursor />
      {!currentProject && <PortfolioMotion />}
      {currentProject ? <ProjectDetail project={currentProject} /> : <div className="site-content">
        <SiteHeader />
        <main><Showreel /><ProjectBrowser /><About /><Experience /><Contact /></main>
        <Footer />
      </div>}
    </>
  );
}
