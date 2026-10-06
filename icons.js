// Original small line drawings made for this menu; no icon package.
const drawings={
salads:'<path d="M4 17h24c0 7-5 11-12 11S4 24 4 17Z M9 28h14 M9 17c-3-5 1-10 7-11-1 4-2 8-7 11Z M16 17c0-5 4-9 10-9-1 4-4 8-10 9Z M16 6c0-2 1-3 3-4"/>',
cold:'<path d="M5 21h22 M7 21a9 9 0 0 1 18 0 M16 12v-3 M12 9h8 M8 26h16 M13 16c1-2 5-2 6 0"/>',
hot:'<path d="M6 15h20v5a7 7 0 0 1-7 7h-6a7 7 0 0 1-7-7v-5Z M4 15h24 M11 15v-3h10v3 M12 8c-2-2 2-3 0-5 M20 8c-2-2 2-3 0-5"/>',
fish:'<path d="M5 16c5-8 14-8 20 0-6 8-15 8-20 0Z M25 16l5-6v12l-5-6 M11 11c-1 4-1 6 0 10 M16 9l3-4 3 5 M17 23l4 3 2-5"/><circle cx="8.5" cy="15" r=".8" fill="currentColor" stroke="none"/>',
grill:'<path d="m6 27 19-19 M10 29 29 10 M5 19l8 8 M9 15l8 8 M13 11l8 8 M17 7l8 8 M21 3l8 8 M4 9c-3-3 3-3 0-6 M11 6c-3-3 3-3 0-6"/>',
khinkali:'<path d="M16 7c-2 0-3 1-3 3C9 14 5 18 5 23c1 5 21 5 22 0 0-5-4-9-8-13 0-2-1-3-3-3Z M13 10l-3 12 M15 11l-1 13 M17 11l1 13 M19 10l3 12 M13 7l1-3h4l1 3"/>',
bakery:'<path d="M2 16c5-9 22-9 28 0-6 9-23 9-28 0Z M6 16c5-5 15-5 20 0-6 5-15 5-20 0Z M12 15c0-4 8-4 8 0 0 5-8 5-8 0Z M7 8l2-3 M23 8l-2-3"/>',
adjara:'<path d="M5 17h22l-3 10H8L5 17Z M3 17h26 M10 13c-4-4 4-4 0-8 M16 13c-4-4 4-4 0-8 M22 13c-4-4 4-4 0-8 M10 30h12"/>',
sauces:'<path d="M4 14h24c-1 9-5 13-12 13S5 23 4 14Z M8 29h16 M11 14l5-9 4 2-4 7 M18 5l2-3 4 2-2 4"/><path d="M8 18c1 3 3 5 5 5"/>',
desserts:'<path d="M6 15 23 8l4 17H6V15Z M6 20h20 M6 25h21 M10 13V9 M23 8c-2-4-7-5-13 1"/><circle cx="17" cy="5" r="2"/><path d="m17 3 2-2"/>',
coffee:'<path d="M5 12h18v9c0 7-18 7-18 0v-9Z M23 14h3c6 0 4 8-3 8 M3 29h24 M10 8c-4-4 4-4 0-7 M17 8c-4-4 4-4 0-7"/>',
soft:'<path d="M10 3h12l-1 3H11l-1-3Z M12 6v5c-5 3-5 5-5 8v9h18v-9c0-3 0-5-5-8V6 M7 18h18 M7 24h18"/><path d="M15 19c-3 3-2 4 0 4s3-1 0-4Z"/>',
wine:'<path d="M7 3h18l-2 11c-1 7-13 7-14 0L7 3Z M16 20v9 M10 29h12 M9 12c4 3 10-2 14 0"/>',
spirits:'<path d="M13 3h6v7l6 5v14H7V15l6-5V3Z M12 3h8 M13 7h6 M7 18h18 M11 22h10 M13 25h6"/>',
phone:'<path d="m8 4 5 7-3 3c2 4 4 6 8 8l3-3 7 5-2 4c-2 5-25-17-22-20l4-4Z"/>',
map:'<path d="M16 29S6 18 6 12a10 10 0 0 1 20 0c0 6-10 17-10 17Z"/><circle cx="16" cy="12" r="3.5"/>',
search:'<circle cx="13" cy="13" r="9"/><path d="m20 20 9 9"/>',
photo:'<rect x="3" y="6" width="26" height="21" rx="3"/><path d="m4 23 8-9 6 6 4-4 6 8"/><circle cx="22" cy="11" r="2"/>',
up:'<path d="M16 28V5 M7 14l9-9 9 9"/>',
arrow:'<path d="M9 23 23 9 M12 9h11v11"/>',
close:'<path d="m9 9 14 14 M23 9 9 23"/>',
};
drawings.soups=drawings.adjara;
function icon(name){return `<svg class="menu-icon icon-${name}" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${drawings[name]||''}</svg>`;}
