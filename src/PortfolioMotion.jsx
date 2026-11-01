import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ease = 'power4.out';

function addSectionSequence(section, heading, targets, options = {}) {
  if (!heading || !targets.length) return;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: options.start ?? 'top 76%',
      once: true,
    },
  });

  timeline.fromTo(heading, {
    autoAlpha: 0,
    xPercent: -11,
    scaleX: 0.82,
    clipPath: 'inset(0 100% 0 0)',
    transformOrigin: 'left center',
  }, {
    autoAlpha: 1,
    xPercent: 0,
    scaleX: 1,
    clipPath: 'inset(0 -4% 0 0)',
    duration: 1.25,
    ease,
  });

  if (options.image) {
    timeline.fromTo(options.image, {
      autoAlpha: 0,
      clipPath: 'inset(0 0 46% 0)',
      scale: 1.06,
    }, {
      autoAlpha: 1,
      clipPath: 'inset(0 0 0% 0)',
      scale: 1,
      duration: 1.25,
      ease: 'power3.inOut',
    }, '>-0.12');
  }

  timeline.fromTo(targets, {
    autoAlpha: 0,
    y: 54,
    x: -18,
    rotateX: 7,
    transformPerspective: 900,
  }, {
    autoAlpha: 1,
    y: 0,
    x: 0,
    rotateX: 0,
    duration: 0.95,
    stagger: options.stagger ?? 0.13,
    ease,
    clearProps: 'transform,transformPerspective,opacity,visibility',
  }, '>-0.06');
}

export default function PortfolioMotion() {
  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || window.matchMedia('(max-width: 700px)').matches) return undefined;

    const root = document.querySelector('.site-content');
    if (!root) return undefined;

    const context = gsap.context(() => {
      // Keep the headline and poster visible immediately; enhance only decorations.
      gsap.fromTo('.hero-stars', { scale: 0.94 }, { scale: 1, duration: 0.8, ease });

      const work = root.querySelector('#work');
      addSectionSequence(
        work,
        work?.querySelector('.section-title h2'),
        work ? [...work.querySelectorAll('.project-row'), work.querySelector('.all-projects')].filter(Boolean) : [],
        { image: false, stagger: 0.12 },
      );

      const about = root.querySelector('#about');
      addSectionSequence(
        about,
        about?.querySelector('.section-title h2'),
        about ? [...about.querySelectorAll('.about-text > *')] : [],
        { image: about?.querySelector('.portrait'), stagger: 0.14 },
      );

      const experience = root.querySelector('#experience');
      addSectionSequence(
        experience,
        experience?.querySelector('.section-title h2'),
        experience ? [
          ...experience.querySelectorAll('.experience-aside > *'),
          ...experience.querySelectorAll('.job'),
          ...experience.querySelectorAll('.education > *'),
        ] : [],
        { stagger: 0.11 },
      );

      const contact = root.querySelector('#contact');
      addSectionSequence(
        contact,
        contact?.querySelector('h2'),
        contact ? [
          contact.querySelector('.eyebrow'),
          contact.querySelector('p'),
          contact.querySelector('.contact-email'),
          ...contact.querySelectorAll('.contact-foot > *'),
        ].filter(Boolean) : [],
        { start: 'top 78%', stagger: 0.13 },
      );

      const preview = root.querySelector('.project-preview');
      if (preview) {
        gsap.fromTo(preview.querySelector('img'), { yPercent: 7, scale: 1.08 }, {
          yPercent: -4,
          scale: 1.03,
          ease: 'none',
          scrollTrigger: {
            trigger: preview,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

      const portraitImage = root.querySelector('.portrait img');
      if (portraitImage) {
        gsap.fromTo(portraitImage, { yPercent: 5, scale: 1.04 }, {
          yPercent: -3,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: portraitImage,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.9,
          },
        });
      }

      gsap.fromTo('.site-footer > *', { autoAlpha: 0, y: 24 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease,
        scrollTrigger: { trigger: '.site-footer', start: 'top 94%', once: true },
      });

      ScrollTrigger.refresh();
    }, root);

    return () => context.revert();
  }, []);

  return null;
}
