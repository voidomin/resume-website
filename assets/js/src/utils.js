// utils.js — tiny helpers used across managers
export const $ = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
export const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
