/* 讀取 data/shops.js，產生篩選圖形、類型區塊、卡片與詳情視窗。新增店家不需要改這支檔案。 */
document.documentElement.classList.add("js");
const TYPES = {
  bookstore: { label: "書店", k: 0.05, r: 0.06 },
  cafe:      { label: "咖啡廳", k: 0.09, r: 0.03 },
  gallery:   { label: "藝廊", k: 0.03, r: -0.07 },
  fashion:   { label: "特色服飾店", k: 0.07, r: 0.09 }
};
const TBD = "待補";
const $ = (id) => document.getElementById(id);
const el = (tag, cls, text) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
};
const shape = (t) => el("span", `shape shape--${t} t-${t}`);
const inType = (t) => SHOPS.filter((s) => s.types.includes(t));
const ratingText = (n) => (n ? "●".repeat(n) + "○".repeat(5 - n) : TBD);

let active = null;
const filtersEl = $("filters"), groupsEl = $("groups"), resetEl = $("reset");

for (const [t, info] of Object.entries(TYPES)) {
  const btn = el("button", `filter t-${t}`);
  btn.type = "button";
  btn.setAttribute("aria-pressed", "false");
  btn.style.setProperty("--k", info.k);
  btn.style.setProperty("--r", info.r);
  btn.append(shape(t), el("span", "", `${info.label}（${inType(t).length}）`));
  btn.addEventListener("click", () => setFilter(active === t ? null : t));
  filtersEl.append(btn);

  const list = inType(t);
  if (!list.length) continue;
  const group = el("section", "group");
  group.id = `type-${t}`;
  group.dataset.type = t;
  const head = el("div", "group__head");
  head.append(shape(t), el("h2", "", info.label), el("span", "group__count", `${list.length} 間`));
  const cards = el("div", "cards");
  list.forEach((s) => cards.append(makeCard(s, t)));
  group.append(head, cards);
  groupsEl.append(group);
}
$("total").textContent = SHOPS.length;

function makeCard(s, t) {
  const card = el("button", `card t-${t}`);
  card.type = "button";
  card.setAttribute("aria-label", `查看 ${s.name} 的詳細資料`);
  const inner = el("div", "card__inner");
  const front = el("div", "card__face card__front");
  front.append(shape(t), el("p", "card__name", s.name), el("p", "card__meta", s.region || TBD));
  const back = el("div", "card__face card__back");
  const tagline = el("p", s.tagline ? "" : "tbd", s.tagline || "介紹待補");
  const tags = el("div", "card__tags");
  s.tags.forEach((x) => tags.append(el("span", "tag", x)));
  back.append(tagline, tags);
  inner.append(front, back);
  card.append(inner);
  card.addEventListener("click", () => openModal(s, t));
  return card;
}

function setFilter(t) {
  active = t;
  [...filtersEl.children].forEach((b, i) =>
    b.setAttribute("aria-pressed", String(Object.keys(TYPES)[i] === t)));
  filtersEl.classList.toggle("has-active", !!t);
  resetEl.hidden = !t;
  document.querySelectorAll(".group").forEach((g) => {
    g.hidden = !!t && g.dataset.type !== t;
    g.classList.add("in");
  });
  if (t) $(`type-${t}`)?.scrollIntoView({ behavior: "smooth" });
}
resetEl.addEventListener("click", () => setFilter(null));

/* 詳情視窗 */
const modal = $("modal"), body = $("m-body");
function openModal(s, t) {
  body.replaceChildren();
  modal.className = `t-${t}`;
  const top = el("div", `modal__top t-${t}`);
  const h3 = el("h3", "", s.name);
  h3.id = "m-title";
  top.append(shape(t), h3);
  const c = el("div", "modal__content");
  const dl = el("dl");
  const row = (k, v) => dl.append(el("dt", "", k), el("dd", v ? "" : "tbd", v || TBD));
  row("類型", s.types.map((x) => TYPES[x].label).join("、"));
  row("地區", s.region);
  row("地址", s.address);
  row("評分", ratingText(s.rating));
  c.append(dl, el("p", s.note ? "" : "tbd", s.note || "心得待補"));
  if (s.image) {
    const img = el("img");
    img.src = s.image; img.alt = s.name; img.style.cssText = "width:100%;margin-top:1rem";
    c.append(img);
  }
  body.append(top, c);
  modal.showModal();
}
$("m-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

/* 捲動：圖形視差 + 區塊淡入 */
let ticking = false;
addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    filtersEl.style.setProperty("--sy", Math.min(scrollY, 800));
    ticking = false;
  });
}, { passive: true });
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll(".group").forEach((g) => io.observe(g));
