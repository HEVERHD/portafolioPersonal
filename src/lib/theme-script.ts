export const THEME_STORAGE_KEY = "theme";

/**
 * Runs in <head> before the first paint: applies the saved theme, or the system one, so the page
 * never flashes the wrong colors. Kept in a plain module so the server layout can inline it.
 */
export const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.dataset.theme=d?"dark":"light"}catch(e){}})()`;
