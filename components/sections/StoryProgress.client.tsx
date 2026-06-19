"use client";

import { useEffect, useState } from "react";

export interface StoryChapter {
  id: string;
  label: string;
}

interface StoryProgressProps {
  chapters: StoryChapter[];
}

export function StoryProgress({ chapters }: StoryProgressProps) {
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? "");

  useEffect(() => {
    const panels = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((panel): panel is HTMLElement => Boolean(panel));
    const story = document.getElementById("top");

    if (!panels.length) return;

    story?.setAttribute("data-story-ready", "true");

    const markActive = (id: string) => {
      setActiveId(id);
      panels.forEach((panel) => {
        panel.toggleAttribute("data-story-active", panel.id === id);
      });
    };

    const chooseInitialPanel = () => {
      const viewportCenter = window.innerHeight / 2;
      const nearest = panels.reduce(
        (best, panel) => {
          const box = panel.getBoundingClientRect();
          const distance = Math.abs(box.top + box.height / 2 - viewportCenter);
          return distance < best.distance ? { id: panel.id, distance } : best;
        },
        { id: panels[0].id, distance: Number.POSITIVE_INFINITY },
      );

      markActive(nearest.id);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          markActive(visible.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -42% 0px",
        threshold: [0.35, 0.5, 0.65, 0.8],
      },
    );

    panels.forEach((panel) => observer.observe(panel));
    chooseInitialPanel();
    window.addEventListener("hashchange", chooseInitialPanel);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", chooseInitialPanel);
      story?.removeAttribute("data-story-ready");
      panels.forEach((panel) => panel.removeAttribute("data-story-active"));
    };
  }, [chapters]);

  return (
    <nav aria-label="Landing page chapters" className="story-progress">
      <ol>
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              aria-current={activeId === chapter.id ? "step" : undefined}
            >
              <span className="story-progress__dot" aria-hidden="true" />
              <span className="story-progress__label">{chapter.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
