import {
  Barbell,
  Lightning,
  Brain,
  PaintBrush,
  UsersThree,
  ShieldCheck,
  Sun,
  PuzzlePiece,
  Flask,
  Handshake,
} from "@phosphor-icons/react";

export const APP_URL = "https://lifexp.live/";

export const ASPECTS = [
  {
    name: "Physique",
    desc: "Strength, movement, resilience.",
    Icon: Barbell,
    color: "var(--physique)",
  },
  {
    name: "Energy",
    desc: "Focus, stability, stamina.",
    Icon: Lightning,
    color: "var(--energy)",
  },
  {
    name: "Logic",
    desc: "Learning, strategy, cognition.",
    Icon: Brain,
    color: "var(--logic)",
  },
  {
    name: "Creativity",
    desc: "Creation, taste, experimentation.",
    Icon: PaintBrush,
    color: "var(--creativity)",
  },
  {
    name: "Social",
    desc: "Communication, empathy, presence.",
    Icon: UsersThree,
    color: "var(--social)",
  },
];

export const MASTERY = [
  { title: "Warrior", aspect: "Physique", Icon: ShieldCheck, color: "var(--physique)" },
  { title: "Protagonist", aspect: "Energy", Icon: Sun, color: "var(--energy)" },
  { title: "Prodigy", aspect: "Logic", Icon: PuzzlePiece, color: "var(--logic)" },
  { title: "Alchemist", aspect: "Creativity", Icon: Flask, color: "var(--creativity)" },
  { title: "Diplomat", aspect: "Social", Icon: Handshake, color: "var(--social)" },
];

/* XP rows used in the live session demo (mirrors the in-app session screen). */
export const SESSION_DEMO = [
  { name: "Energy", xp: 122, color: "var(--energy)", pct: 100 },
  { name: "Logic", xp: 54, color: "var(--logic)", pct: 44 },
  { name: "Physique", xp: 19, color: "var(--physique)", pct: 16 },
];
