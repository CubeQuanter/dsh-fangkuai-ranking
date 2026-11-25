export const STYLES = String.raw`
.dsr-overlay {
  --dsr-bg: var(--dsw-alias-bg-base, #111216);
  --dsr-panel: var(--dsw-alias-bg-layer-1, #191a1f);
  --dsr-panel-2: var(--dsw-alias-bg-layer-2, #212228);
  --dsr-text: var(--dsw-alias-label-primary, #ededf1);
  --dsr-text-2: var(--dsw-alias-label-secondary, #b8b9c3);
  --dsr-text-3: var(--dsw-alias-label-tertiary, #858793);
  --dsr-border: var(--dsw-alias-border-l4, rgba(255,255,255,.09));
  --dsr-hover: var(--dsw-alias-interactive-bg-hover, rgba(255,255,255,.06));
  --dsr-up: #e05555;
  --dsr-down: #35b37e;
  --dsr-amber: #d99a3d;
  --dsr-radius: 14px;
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: flex;
  flex-direction: column;
  background: var(--dsr-bg);
  color: var(--dsr-text);
  font-family: inherit;
  pointer-events: auto;
}

@keyframes dsr-spin { to { transform: rotate(360deg); } }

.dsr-overlay *, .dsr-overlay *::before, .dsr-overlay *::after { box-sizing: border-box; }

.dsr-topbar {
  height: 64px;
  flex: 0 0 64px;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 22px;
  border-bottom: 1px solid var(--dsr-border);
  background: var(--dsr-bg);
}

.dsr-brand { display: flex; align-items: center; gap: 10px; min-width: 0; color: var(--dsr-text); }
.dsr-brand-mark { display: flex; color: var(--dsr-text); }
.dsr-brand-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.dsr-brand-title { font-size: 15px; font-weight: 650; letter-spacing: .02em; }
.dsr-brand-sub { font-size: 11px; color: var(--dsr-text-3); letter-spacing: .06em; }

.dsr-topbar-right { margin-left: auto; display: flex; align-items: center; gap: 8px; }

.dsr-status {
  display: inline-flex; align-items: center; gap: 6px;
  height: 26px; padding: 0 9px;
  border: 1px solid var(--dsr-border);
  border-radius: 999px;
  color: var(--dsr-text-3);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.dsr-status-dot { width: 6px; height: 6px; border-radius: 50%; background: color-mix(in srgb, var(--dsr-text-3) 60%, transparent); }
.dsr-status.live { color: var(--dsr-text-2); }
.dsr-status.live .dsr-status-dot { background: var(--dsr-up); box-shadow: 0 0 0 3px rgba(224,85,85,.12); }

.dsr-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  height: 32px; padding: 0 12px;
  border: 1px solid var(--dsr-border);
  border-radius: 9px;
  background: transparent;
  color: var(--dsr-text-2);
  font: inherit; font-size: 12px; font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background .15s ease, color .15s ease, border-color .15s ease;
}
.dsr-btn:hover { background: var(--dsr-hover); color: var(--dsr-text); }
.dsr-btn:active { background: color-mix(in srgb, var(--dsr-text) 12%, transparent); }
.dsr-btn:disabled { cursor: not-allowed; color: var(--dsr-text-3); border-color: var(--dsr-border); background: transparent; }
.dsr-btn.primary { background: var(--dsr-text); color: var(--dsr-bg); border-color: transparent; }
.dsr-btn.primary:hover { background: color-mix(in srgb, var(--dsr-text) 90%, var(--dsr-bg)); }
.dsr-btn.primary:disabled { background: color-mix(in srgb, var(--dsr-text) 20%, var(--dsr-bg)); color: var(--dsr-text-2); }
.dsr-btn.small { height: 27px; padding: 0 9px; font-size: 11px; border-radius: 8px; }
.dsr-btn.quiet { border-color: transparent; color: var(--dsr-text-3); }
.dsr-btn.quiet:hover { color: var(--dsr-text-2); }
.dsr-btn.danger { color: #e98484; border-color: rgba(224,85,85,.22); }
.dsr-btn.danger:hover { background: rgba(224,85,85,.09); }

.dsr-icon-btn {
  width: 32px; height: 32px; padding: 0;
  display: inline-flex; align-items: center; justify-content: center;
  border: 1px solid transparent; border-radius: 9px;
  background: transparent; color: var(--dsr-text-3); cursor: pointer;
  transition: background .15s ease, color .15s ease;
}
.dsr-icon-btn:hover { background: var(--dsr-hover); color: var(--dsr-text); }
.dsr-icon-btn.bordered { border-color: var(--dsr-border); }
.dsr-icon-btn:disabled { cursor: not-allowed; color: color-mix(in srgb, var(--dsr-text-3) 55%, transparent); }

.dsr-main { flex: 1 1 auto; overflow: auto; overscroll-behavior: contain; }
.dsr-page { max-width: 1280px; margin: 0 auto; padding: 28px 24px 48px; }
.dsr-page.narrow { max-width: 980px; }

.dsr-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }

.dsr-muted { color: var(--dsr-text-3); font-size: 12px; line-height: 1.6; }
.dsr-error {
  display: flex; align-items: flex-start; gap: 8px;
  padding: 10px 12px; border-radius: 10px;
  border: 1px solid rgba(224,85,85,.24);
  background: rgba(224,85,85,.08);
  color: #eea1a1; font-size: 12px; line-height: 1.55;
}
.dsr-error svg { flex: 0 0 auto; margin-top: 1px; }
.dsr-loading { display: inline-flex; align-items: center; gap: 8px; color: var(--dsr-text-3); font-size: 12px; }
.dsr-spinner { width: 15px; height: 15px; border: 1.5px solid var(--dsr-border); border-top-color: var(--dsr-text-2); border-radius: 50%; animation: dsr-spin .9s linear infinite; }

.dsr-toast {
  display: inline-flex; align-items: center; max-width: 320px; height: 26px;
  padding: 0 10px; border-radius: 999px;
  background: var(--dsr-panel-2); border: 1px solid var(--dsr-border);
  color: var(--dsr-text-2); font-size: 11px; white-space: nowrap;
  overflow: hidden; text-overflow: ellipsis;
}

.dsr-chip {
  display: inline-flex; align-items: center; gap: 5px;
  height: 24px; padding: 0 8px;
  border-radius: 7px; border: 1px solid var(--dsr-border);
  background: color-mix(in srgb, var(--dsr-panel) 72%, transparent);
  color: var(--dsr-text-3); font-size: 11px; white-space: nowrap;
}
.dsr-tag {
  display: inline-flex; align-items: center; height: 19px; padding: 0 6px;
  border-radius: 5px; background: color-mix(in srgb, var(--dsr-text) 8%, transparent);
  color: var(--dsr-text-3); font-size: 10px; white-space: nowrap;
}
.dsr-pct { font-variant-numeric: tabular-nums; font-weight: 600; }
.dsr-pct.up { color: var(--dsr-up); }
.dsr-pct.down { color: var(--dsr-down); }
.dsr-pct.flat { color: var(--dsr-text-3); }
.dsr-code { color: var(--dsr-text-3); font-size: 10px; font-variant-numeric: tabular-nums; letter-spacing: .02em; }

/* 首次连接 */
.dsr-setup { max-width: 1040px; min-height: 100%; margin: 0 auto; padding: 48px 24px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; }
.dsr-setup-card {
  display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr);
  border: 1px solid var(--dsr-border); border-radius: 20px; overflow: hidden;
  background: var(--dsr-panel);
  box-shadow: 0 30px 80px rgba(0,0,0,.22);
}
.dsr-setup-visual {
  padding: 42px 40px;
  background:
    radial-gradient(120% 90% at 0% 0%, rgba(224,85,85,.13), transparent 60%),
    radial-gradient(100% 80% at 100% 100%, rgba(58,175,169,.10), transparent 62%),
    var(--dsr-panel);
  border-right: 1px solid var(--dsr-border);
  display: flex; flex-direction: column; justify-content: center; min-height: 520px;
}
.dsr-setup-kicker { font-size: 11px; letter-spacing: .18em; color: var(--dsr-text-3); text-transform: uppercase; }
.dsr-setup-title { margin: 14px 0 12px; font-size: 30px; line-height: 1.25; letter-spacing: -.02em; font-weight: 680; max-width: 380px; }
.dsr-setup-desc { margin: 0; max-width: 390px; color: var(--dsr-text-2); font-size: 13px; line-height: 1.8; }
.dsr-setup-points { display: flex; flex-direction: column; gap: 12px; margin-top: 30px; }
.dsr-point { display: flex; gap: 10px; align-items: flex-start; font-size: 12px; color: var(--dsr-text-2); line-height: 1.65; }
.dsr-point-dot { width: 22px; height: 22px; flex: 0 0 22px; border-radius: 7px; display: flex; align-items: center; justify-content: center; background: color-mix(in srgb, var(--dsr-text) 7%, transparent); color: var(--dsr-text-2); }
.dsr-setup-bars { margin-top: auto; padding-top: 34px; display: flex; align-items: flex-end; gap: 9px; }
.dsr-setup-bars span { width: 28px; border-radius: 5px 5px 3px 3px; background: linear-gradient(180deg, color-mix(in srgb, var(--dsr-text) 14%, transparent), color-mix(in srgb, var(--dsr-text) 3%, transparent)); }
.dsr-setup-bars span:nth-child(1) { height: 38px; }
.dsr-setup-bars span:nth-child(2) { height: 64px; background: linear-gradient(180deg, rgba(58,175,169,.55), rgba(58,175,169,.08)); }
.dsr-setup-bars span:nth-child(3) { height: 46px; }
.dsr-setup-bars span:nth-child(4) { height: 88px; background: linear-gradient(180deg, rgba(224,85,85,.62), rgba(224,85,85,.08)); }
.dsr-setup-bars span:nth-child(5) { height: 58px; }

.dsr-setup-form { padding: 44px 38px; display: flex; flex-direction: column; justify-content: center; }
.dsr-form-title { font-size: 17px; font-weight: 620; margin: 0 0 6px; }
.dsr-form-sub { margin: 0 0 26px; color: var(--dsr-text-3); font-size: 12px; line-height: 1.7; }
.dsr-field { display: flex; flex-direction: column; gap: 7px; }
.dsr-label { font-size: 11px; color: var(--dsr-text-3); letter-spacing: .03em; }
.dsr-input, .dsr-select, .dsr-textarea {
  width: 100%; height: 38px; padding: 0 11px;
  border: 1px solid var(--dsr-border); border-radius: 9px;
  background: color-mix(in srgb, var(--dsr-bg) 62%, transparent);
  color: var(--dsr-text); font: inherit; font-size: 13px;
  outline: none; transition: border-color .15s ease, box-shadow .15s ease;
}
.dsr-input:focus, .dsr-select:focus { border-color: color-mix(in srgb, var(--dsr-text) 35%, var(--dsr-border)); box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsr-text) 7%, transparent); }
.dsr-input::placeholder { color: color-mix(in srgb, var(--dsr-text-3) 64%, transparent); }
.dsr-select { appearance: none; background-image: linear-gradient(45deg, transparent 50%, var(--dsr-text-3) 50%), linear-gradient(135deg, var(--dsr-text-3) 50%, transparent 50%); background-position: calc(100% - 15px) 16px, calc(100% - 10px) 16px; background-size: 5px 5px; background-repeat: no-repeat; padding-right: 28px; }
.dsr-key-row { display: flex; gap: 8px; }
.dsr-key-row .dsr-input { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .04em; }
.dsr-eye { flex: 0 0 38px; width: 38px; height: 38px; border-radius: 9px; border: 1px solid var(--dsr-border); background: transparent; color: var(--dsr-text-3); cursor: pointer; }
.dsr-eye:hover { background: var(--dsr-hover); color: var(--dsr-text); }
.dsr-hint { font-size: 11px; color: var(--dsr-text-3); line-height: 1.65; }
.dsr-privacy { margin-top: 14px; padding: 10px 11px; border-radius: 9px; background: color-mix(in srgb, var(--dsr-text) 5%, transparent); color: var(--dsr-text-3); font-size: 11px; line-height: 1.65; }
.dsr-setup-actions { margin-top: 18px; display: flex; align-items: center; gap: 10px; }
.dsr-setup-actions .dsr-btn.primary { height: 38px; padding: 0 16px; font-size: 13px; border-radius: 10px; }
.dsr-setup-note { margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--dsr-border); color: var(--dsr-text-3); font-size: 11px; line-height: 1.7; }

/* 榜单墙 */
.dsr-wall-head { display: flex; align-items: flex-end; gap: 14px; margin-bottom: 22px; }
.dsr-wall-head h1 { margin: 0; font-size: 22px; letter-spacing: -.02em; font-weight: 660; }
.dsr-wall-head .dsr-muted { margin: 0 0 3px; }
.dsr-wall-head-actions { margin-left: auto; display: flex; gap: 8px; }
.dsr-wall-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(330px, 1fr)); gap: 14px; }
.dsr-card {
  display: flex; flex-direction: column; min-width: 0;
  border: 1px solid var(--dsr-border); border-radius: var(--dsr-radius);
  background: var(--dsr-panel); overflow: hidden;
  transition: border-color .18s ease, box-shadow .18s ease;
}
.dsr-card:hover { border-color: color-mix(in srgb, var(--dsr-text) 18%, var(--dsr-border)); box-shadow: 0 16px 38px rgba(0,0,0,.18); }
.dsr-card-accent { height: 3px; flex: 0 0 3px; background: var(--dsr-accent, #e05555); }
.dsr-card-head { padding: 16px 16px 10px; display: flex; gap: 10px; align-items: flex-start; }
.dsr-card-name { margin: 0; font-size: 15px; font-weight: 630; letter-spacing: -.01em; line-height: 1.35; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsr-card-meta { margin-top: 4px; display: flex; gap: 6px; align-items: center; color: var(--dsr-text-3); font-size: 10px; }
.dsr-card-head-actions { margin-left: auto; display: flex; gap: 1px; visibility: hidden; }
.dsr-card:hover .dsr-card-head-actions, .dsr-card:focus-within .dsr-card-head-actions { visibility: visible; }
.dsr-card-stat { margin-left: auto; text-align: right; flex: 0 0 auto; }
.dsr-card-stat strong { display: block; font-size: 22px; line-height: 1.05; font-variant-numeric: tabular-nums; letter-spacing: -.03em; }
.dsr-card-stat span { font-size: 10px; color: var(--dsr-text-3); }
.dsr-card-rows { padding: 2px 8px 6px; display: flex; flex-direction: column; }
.dsr-card-row {
  display: grid; grid-template-columns: 20px minmax(0, 1fr) 68px 76px;
  align-items: center; gap: 8px;
  height: 34px; padding: 0 8px; border-radius: 7px;
}
.dsr-card-row:hover { background: var(--dsr-hover); }
.dsr-rank { font-size: 10px; color: var(--dsr-text-3); font-variant-numeric: tabular-nums; text-align: right; }
.dsr-rank.top { color: var(--dsr-amber); font-weight: 650; }
.dsr-name { min-width: 0; display: flex; align-items: baseline; gap: 6px; }
.dsr-name b { font-size: 12px; font-weight: 580; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsr-name .dsr-code { flex: 0 0 auto; }
.dsr-card-row .dsr-pct { font-size: 11px; text-align: right; }
.dsr-card-value { font-size: 10px; color: var(--dsr-text-3); text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
.dsr-card-foot { margin-top: auto; padding: 10px 16px 13px; display: flex; align-items: center; gap: 8px; border-top: 1px solid var(--dsr-border); }
.dsr-card-foot .dsr-btn { height: 25px; padding: 0 8px; font-size: 10px; }
.dsr-card-foot .dsr-muted { margin-left: auto; font-size: 10px; }
.dsr-card-error { padding: 12px 16px 18px; display: flex; flex-direction: column; gap: 8px; }
.dsr-card-empty { padding: 18px 16px 24px; color: var(--dsr-text-3); font-size: 11px; line-height: 1.7; }
.dsr-card-skeleton { padding: 16px; display: flex; flex-direction: column; gap: 9px; }
.dsr-skeleton { height: 10px; border-radius: 4px; background: color-mix(in srgb, var(--dsr-text) 10%, transparent); }

.dsr-new-card {
  min-height: 220px; border: 1px dashed color-mix(in srgb, var(--dsr-text) 16%, transparent);
  border-radius: var(--dsr-radius); background: transparent; color: var(--dsr-text-3);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
  cursor: pointer; font: inherit; transition: border-color .18s ease, background .18s ease, color .18s ease;
}
.dsr-new-card:hover { border-color: color-mix(in srgb, var(--dsr-text) 30%, transparent); background: color-mix(in srgb, var(--dsr-text) 3%, transparent); color: var(--dsr-text-2); }
.dsr-new-card span { font-size: 12px; }
.dsr-wall-empty { padding: 44px 20px; border: 1px dashed var(--dsr-border); border-radius: 18px; text-align: center; }
.dsr-wall-empty h2 { margin: 8px 0 6px; font-size: 18px; font-weight: 620; }
.dsr-wall-empty p { margin: 0 auto 18px; max-width: 460px; color: var(--dsr-text-3); font-size: 12px; line-height: 1.75; }
.dsr-template-row { display: flex; justify-content: center; flex-wrap: wrap; gap: 7px; }
.dsr-template-chip { height: 27px; padding: 0 10px; border-radius: 7px; border: 1px solid var(--dsr-border); background: transparent; color: var(--dsr-text-2); font: inherit; font-size: 11px; cursor: pointer; }
.dsr-template-chip:hover { background: var(--dsr-hover); color: var(--dsr-text); }

/* 聚焦榜单 */
.dsr-focus-head { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 14px; }
.dsr-focus-head .dsr-icon-btn { margin-top: 2px; }
.dsr-focus-title { min-width: 0; flex: 1 1 auto; }
.dsr-focus-title h1 { margin: 0; font-size: 24px; letter-spacing: -.02em; font-weight: 670; line-height: 1.2; }
.dsr-focus-meta { display: flex; flex-wrap: wrap; gap: 7px; align-items: center; margin-top: 7px; color: var(--dsr-text-3); font-size: 11px; }
.dsr-focus-actions { display: flex; gap: 7px; flex: 0 0 auto; }
.dsr-conditions { display: flex; flex-wrap: wrap; gap: 6px; margin: 14px 0 18px; }
.dsr-cond-chip { display: inline-flex; align-items: center; gap: 5px; height: 26px; padding: 0 9px; border-radius: 7px; background: color-mix(in srgb, var(--dsr-text) 5%, transparent); color: var(--dsr-text-2); font-size: 11px; }
.dsr-cond-chip.exclude { color: var(--dsr-text-3); text-decoration: line-through; }
.dsr-view-tabs { display: flex; gap: 2px; padding: 3px; border: 1px solid var(--dsr-border); border-radius: 9px; width: fit-content; margin-bottom: 14px; }
.dsr-view-tab { display: inline-flex; align-items: center; gap: 5px; height: 27px; padding: 0 10px; border: none; border-radius: 7px; background: transparent; color: var(--dsr-text-3); font: inherit; font-size: 11px; cursor: pointer; }
.dsr-view-tab.active { background: color-mix(in srgb, var(--dsr-text) 9%, transparent); color: var(--dsr-text); }
.dsr-view-tab:hover { color: var(--dsr-text-2); }

.dsr-result { }
.dsr-table-wrap { border: 1px solid var(--dsr-border); border-radius: 12px; overflow: auto; background: var(--dsr-panel); }
.dsr-table { width: 100%; border-collapse: separate; border-spacing: 0; table-layout: fixed; }
.dsr-table th {
  height: 36px; padding: 0 12px; text-align: right;
  background: color-mix(in srgb, var(--dsr-panel-2) 92%, transparent);
  color: var(--dsr-text-3); font-size: 10px; font-weight: 500; letter-spacing: .02em; white-space: nowrap;
  border-bottom: 1px solid var(--dsr-border);
}
.dsr-table th:first-child, .dsr-table td:first-child { text-align: center; width: 46px; }
.dsr-table th:nth-child(2), .dsr-table td:nth-child(2) { text-align: left; width: 190px; }
.dsr-table td { height: 40px; padding: 0 12px; border-bottom: 1px solid color-mix(in srgb, var(--dsr-border) 70%, transparent); text-align: right; font-size: 12px; font-variant-numeric: tabular-nums; color: var(--dsr-text-2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dsr-table tr:last-child td { border-bottom: none; }
.dsr-table tbody tr { transition: background .12s ease; }
.dsr-table tbody tr:hover { background: var(--dsr-hover); }
.dsr-table .stock-cell { display: flex; align-items: center; gap: 8px; min-width: 0; text-align: left; }
.dsr-table .stock-cell .dsr-name { display: block; }
.dsr-table .stock-cell b { font-size: 12px; }
.dsr-table .dsr-rank { width: 20px; text-align: center; font-size: 10px; }
.dsr-table .dsr-rank.medal { color: var(--dsr-amber); font-weight: 700; }
.dsr-table td .dsr-tag { margin-left: 4px; vertical-align: middle; }
.dsr-empty-result { padding: 56px 20px; border: 1px dashed var(--dsr-border); border-radius: 14px; text-align: center; }
.dsr-empty-result h3 { margin: 0 0 6px; font-size: 16px; font-weight: 600; }
.dsr-empty-result p { margin: 0 0 16px; color: var(--dsr-text-3); font-size: 12px; }

.dsr-cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 10px; }
.dsr-stock-card { border: 1px solid var(--dsr-border); border-radius: 11px; background: var(--dsr-panel); padding: 13px 13px 12px; min-width: 0; }
.dsr-stock-card-head { display: flex; align-items: flex-start; gap: 8px; }
.dsr-stock-card-head .dsr-rank { width: auto; text-align: left; }
.dsr-stock-card-head b { display: block; font-size: 13px; font-weight: 620; }
.dsr-stock-card-head .dsr-code { display: block; margin-top: 2px; }
.dsr-stock-card-head .dsr-pct { margin-left: auto; font-size: 14px; }
.dsr-stock-spark { margin: 10px 0 8px; height: 26px; display: flex; align-items: center; }
.dsr-stock-spark { display: block; width: 100%; height: 26px; overflow: hidden; }
.dsr-stock-spark svg { width: 100%; height: 100%; }
.dsr-metrics { display: flex; flex-wrap: wrap; gap: 5px 10px; }
.dsr-metric { display: flex; align-items: baseline; gap: 4px; font-size: 10px; color: var(--dsr-text-3); }
.dsr-metric strong { font-size: 11px; color: var(--dsr-text-2); font-weight: 550; font-variant-numeric: tabular-nums; }
.dsr-stock-tags { margin-top: 9px; display: flex; flex-wrap: wrap; gap: 4px; }

.dsr-podium {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.12fr) minmax(0, 1fr);
  align-items: end;
  gap: 10px;
  padding: 22px 12px 6px;
}
.dsr-podium-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  min-height: 96px;
  padding: 12px 10px 10px;
  border: 1px solid var(--fk-border);
  border-radius: 10px 10px 4px 4px;
  background: color-mix(in srgb, var(--fk-card) 88%, var(--dsr-text) 4%);
  text-align: center;
}
.dsr-podium-card.podium-1 {
  order: 2;
  min-height: 118px;
  border-color: color-mix(in srgb, #f5b942 48%, var(--fk-border));
  background: linear-gradient(180deg, rgba(245, 185, 66, .14), color-mix(in srgb, var(--fk-card) 88%, var(--dsr-text) 4%) 58%);
}
.dsr-podium-card.podium-2 { order: 1; border-color: color-mix(in srgb, #c7d2de 42%, var(--fk-border)); }
.dsr-podium-card.podium-3 { order: 3; border-color: color-mix(in srgb, #c78b62 42%, var(--fk-border)); }
.dsr-podium-rank {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--fk-border-light);
  border-radius: 50%;
  background: var(--fk-elevated);
  color: var(--fk-heading);
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 12px;
  font-weight: 700;
}
.dsr-podium-card.podium-1 .dsr-podium-rank { background: #f5b942; border-color: #f5b942; color: #201703; }
.dsr-podium-card b { max-width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-size: 13px; }
.dsr-podium-value { margin-top: 2px; color: var(--fk-muted); font-size: 10px; font-variant-numeric: tabular-nums; }

.dsr-bars { display: flex; flex-direction: column; gap: 5px; }
.dsr-bar-row { display: grid; grid-template-columns: 28px 150px minmax(80px, 1fr) 86px; align-items: center; gap: 10px; height: 31px; }
.dsr-bar-label { display: flex; align-items: baseline; gap: 7px; min-width: 0; }
.dsr-bar-label b { font-size: 12px; font-weight: 560; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsr-bar-track { height: 7px; border-radius: 4px; overflow: hidden; }
.dsr-bar-value { text-align: right; font-size: 11px; color: var(--dsr-text-2); font-variant-numeric: tabular-nums; }
.dsr-bar-row .dsr-pct { font-size: 11px; width: 64px; text-align: right; }

.dsr-groups { display: flex; flex-direction: column; gap: 18px; }
.dsr-group { border: 1px solid var(--dsr-border); border-radius: 12px; overflow: hidden; background: var(--dsr-panel); }
.dsr-group-head { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: color-mix(in srgb, var(--dsr-text) 4%, transparent); border-bottom: 1px solid var(--dsr-border); }
.dsr-group-head h3 { margin: 0; font-size: 12px; font-weight: 600; }
.dsr-group-head .dsr-muted { margin-left: auto; font-size: 10px; }
.dsr-group-rows { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
.dsr-group-row { display: grid; grid-template-columns: 22px minmax(0,1fr) 64px 74px; gap: 7px; align-items: center; padding: 8px 14px; border-bottom: 1px solid color-mix(in srgb, var(--dsr-border) 55%, transparent); }
.dsr-group-row:last-child { border-bottom: none; }

/* 编辑器 */
.dsr-editor { height: 100%; display: flex; flex-direction: column; background: var(--dsr-bg); }
.dsr-editor-head { height: 60px; flex: 0 0 60px; display: flex; align-items: center; gap: 10px; padding: 0 20px; border-bottom: 1px solid var(--dsr-border); }
.dsr-editor-head h1 { margin: 0; font-size: 16px; font-weight: 630; }
.dsr-editor-head .dsr-muted { font-size: 11px; }
.dsr-editor-body { flex: 1 1 auto; overflow: auto; display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 0; }
.dsr-form { padding: 22px 24px 30px; display: flex; flex-direction: column; gap: 22px; min-width: 0; }
.dsr-form-section { display: flex; flex-direction: column; gap: 10px; }
.dsr-section-title { display: flex; align-items: baseline; gap: 8px; }
.dsr-section-title h2 { margin: 0; font-size: 13px; font-weight: 620; }
.dsr-section-title .dsr-muted { font-size: 10px; }
.dsr-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.dsr-form-grid.three { grid-template-columns: 1.2fr .8fr .8fr; }
.dsr-templates { display: flex; flex-wrap: wrap; gap: 6px; }
.dsr-templates .dsr-template-chip { height: 25px; font-size: 10px; }

.dsr-cond-list { display: flex; flex-direction: column; gap: 7px; }
.dsr-cond-row { display: flex; gap: 7px; align-items: flex-start; padding: 8px 9px; border: 1px solid var(--dsr-border); border-radius: 10px; background: color-mix(in srgb, var(--dsr-panel) 75%, transparent); }
.dsr-cond-label { flex: 0 0 112px; font-size: 11px; color: var(--dsr-text-2); line-height: 1.4; padding-top: 8px; }
.dsr-cond-controls { flex: 1 1 auto; display: flex; flex-wrap: wrap; align-items: center; gap: 6px; min-width: 0; }
.dsr-cond-op { flex: 0 0 62px; height: 30px; padding: 0 6px; border-radius: 7px; border: 1px solid var(--dsr-border); background: var(--dsr-panel-2); color: var(--dsr-text-2); font: inherit; font-size: 11px; }
.dsr-num { width: 82px; height: 30px; padding: 0 8px; border: 1px solid var(--dsr-border); border-radius: 7px; background: var(--dsr-bg); color: var(--dsr-text); font: inherit; font-size: 12px; font-variant-numeric: tabular-nums; outline: none; }
.dsr-num:focus { border-color: color-mix(in srgb, var(--dsr-text) 35%, var(--dsr-border)); }
.dsr-unit { flex: 0 0 auto; font-size: 10px; color: var(--dsr-text-3); min-width: 16px; }
.dsr-between-sep { font-size: 10px; color: var(--dsr-text-3); }
.dsr-seg { display: inline-flex; padding: 2px; border: 1px solid var(--dsr-border); border-radius: 8px; }
.dsr-seg button { height: 24px; padding: 0 10px; border: none; border-radius: 6px; background: transparent; color: var(--dsr-text-3); font: inherit; font-size: 10px; cursor: pointer; }
.dsr-seg button.active { background: color-mix(in srgb, var(--dsr-text) 10%, transparent); color: var(--dsr-text); }
.dsr-negate { height: 25px; padding: 0 7px; border: 1px solid transparent; border-radius: 6px; background: transparent; color: var(--dsr-text-3); font: inherit; font-size: 10px; cursor: pointer; white-space: nowrap; }
.dsr-negate:hover { background: var(--dsr-hover); color: var(--dsr-text-2); }
.dsr-negate.on { border-color: rgba(224,85,85,.25); color: #e98484; background: rgba(224,85,85,.07); }
.dsr-remove { width: 25px; height: 25px; flex: 0 0 25px; border: none; border-radius: 6px; background: transparent; color: var(--dsr-text-3); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
.dsr-remove:hover { background: rgba(224,85,85,.08); color: #e98484; }
.dsr-add-cond { height: 34px; border: 1px dashed color-mix(in srgb, var(--dsr-text) 18%, transparent); border-radius: 9px; background: transparent; color: var(--dsr-text-3); font: inherit; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; }
.dsr-add-cond:hover { border-color: color-mix(in srgb, var(--dsr-text) 32%, transparent); color: var(--dsr-text-2); background: color-mix(in srgb, var(--dsr-text) 2%, transparent); }
.dsr-cond-empty { padding: 18px; border: 1px dashed var(--dsr-border); border-radius: 10px; text-align: center; color: var(--dsr-text-3); font-size: 11px; line-height: 1.7; }

.dsr-popover { display: flex; flex-direction: column; gap: 6px; }
.dsr-popover-panel {
  width: 100%; max-height: 300px; display: flex; flex-direction: column;
  border: 1px solid var(--dsr-border); border-radius: 11px;
  background: var(--dsr-panel-2); box-shadow: 0 18px 50px rgba(0,0,0,.4);
  overflow: hidden;
}
.dsr-pop-search { flex: 0 0 auto; padding: 8px; border-bottom: 1px solid var(--dsr-border); }
.dsr-pop-search .dsr-input { height: 30px; font-size: 11px; }
.dsr-pop-list { overflow: auto; padding: 5px; }
.dsr-pop-item { display: flex; align-items: center; gap: 8px; width: 100%; min-height: 30px; padding: 5px 7px; border: none; border-radius: 6px; background: transparent; color: var(--dsr-text-2); font: inherit; font-size: 11px; text-align: left; cursor: pointer; }
.dsr-pop-item:hover { background: var(--dsr-hover); }
.dsr-pop-item.disabled { color: var(--dsr-text-3); background: transparent; cursor: not-allowed; }
.dsr-pop-item.selected { background: color-mix(in srgb, var(--dsr-text) 8%, transparent); color: var(--dsr-text); }
.dsr-pop-item .dsr-check { width: 14px; height: 14px; flex: 0 0 14px; border: 1px solid var(--dsr-border); border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; }
.dsr-pop-item.selected .dsr-check { background: var(--dsr-text); border-color: var(--dsr-text); color: var(--dsr-bg); }
.dsr-pop-item small { margin-left: auto; color: var(--dsr-text-3); font-size: 9px; }
.dsr-pop-foot { flex: 0 0 auto; padding: 7px 8px; border-top: 1px solid var(--dsr-border); display: flex; justify-content: space-between; align-items: center; }
.dsr-board-trigger { height: 30px; max-width: 100%; padding: 0 9px; border: 1px solid var(--dsr-border); border-radius: 7px; background: var(--dsr-bg); color: var(--dsr-text-2); font: inherit; font-size: 11px; cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsr-board-trigger:hover { border-color: color-mix(in srgb, var(--dsr-text) 30%, var(--dsr-border)); }

.dsr-picker-modal {
  flex: 1 1 auto; min-height: 0; overflow: auto;
  display: flex; align-items: flex-start; justify-content: center;
  padding: 20px; background: transparent;
}
.dsr-picker { width: min(760px, 94vw); max-height: min(680px, 86vh); display: flex; flex-direction: column; border: 1px solid var(--dsr-border); border-radius: 16px; background: var(--dsr-panel); box-shadow: 0 30px 90px rgba(0,0,0,.45); overflow: hidden; }
.dsr-picker-head { padding: 14px 16px; border-bottom: 1px solid var(--dsr-border); display: flex; align-items: center; gap: 10px; }
.dsr-picker-head h2 { margin: 0; font-size: 14px; font-weight: 620; }
.dsr-picker-head .dsr-icon-btn { margin-left: auto; }
.dsr-picker-body { overflow: auto; padding: 12px 14px 18px; }
.dsr-picker-group { margin-bottom: 16px; }
.dsr-picker-group h3 { margin: 0 0 7px; font-size: 11px; color: var(--dsr-text-3); font-weight: 500; }
.dsr-picker-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 5px; }
.dsr-picker-item { min-height: 44px; padding: 7px 9px; border: 1px solid var(--dsr-border); border-radius: 8px; background: transparent; color: var(--dsr-text-2); font: inherit; text-align: left; cursor: pointer; display: flex; flex-direction: column; gap: 2px; }
.dsr-picker-item:hover { background: var(--dsr-hover); border-color: color-mix(in srgb, var(--dsr-text) 22%, var(--dsr-border)); }
.dsr-picker-item b { font-size: 11px; font-weight: 560; }
.dsr-picker-item small { color: var(--dsr-text-3); font-size: 9px; }
.dsr-picker-item:disabled { color: var(--dsr-text-3); border-color: var(--dsr-border); background: transparent; cursor: not-allowed; }

.dsr-preview { border-left: 1px solid var(--dsr-border); background: color-mix(in srgb, var(--dsr-panel) 45%, transparent); padding: 20px 16px; display: flex; flex-direction: column; gap: 10px; overflow: auto; }
.dsr-preview-head { display: flex; align-items: baseline; gap: 7px; }
.dsr-preview-head h2 { margin: 0; font-size: 13px; font-weight: 600; }
.dsr-preview-head .dsr-muted { margin-left: auto; font-size: 10px; }
.dsr-preview-stat { display: flex; align-items: baseline; gap: 6px; padding: 10px 12px; border-radius: 9px; background: color-mix(in srgb, var(--dsr-text) 5%, transparent); }
.dsr-preview-stat strong { font-size: 23px; line-height: 1; font-variant-numeric: tabular-nums; }
.dsr-preview-stat span { font-size: 10px; color: var(--dsr-text-3); }
.dsr-preview-list { display: flex; flex-direction: column; }
.dsr-preview-row { display: grid; grid-template-columns: 18px minmax(0,1fr) 58px 66px; gap: 6px; align-items: center; height: 31px; padding: 0 4px; border-bottom: 1px solid color-mix(in srgb, var(--dsr-border) 60%, transparent); font-size: 10px; }
.dsr-preview-row:last-child { border-bottom: none; }
.dsr-preview-row b { font-size: 11px; font-weight: 560; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsr-preview-hint { padding: 10px 11px; border-radius: 8px; background: color-mix(in srgb, var(--dsr-text) 4%, transparent); color: var(--dsr-text-3); font-size: 10px; line-height: 1.7; }
.dsr-editor-footer { flex: 0 0 62px; height: 62px; border-top: 1px solid var(--dsr-border); background: color-mix(in srgb, var(--dsr-bg) 92%, transparent); display: flex; align-items: center; gap: 9px; padding: 0 22px; }
.dsr-editor-footer .dsr-error { margin-right: auto; max-width: 56%; }
.dsr-editor-footer .dsr-spacer { margin-right: auto; }

.dsr-columns { display: flex; flex-wrap: wrap; gap: 5px; }
.dsr-col-chip { height: 27px; padding: 0 9px; border: 1px solid var(--dsr-border); border-radius: 7px; background: transparent; color: var(--dsr-text-3); font: inherit; font-size: 10px; cursor: pointer; }
.dsr-col-chip:hover { border-color: color-mix(in srgb, var(--dsr-text) 26%, var(--dsr-border)); color: var(--dsr-text-2); }
.dsr-col-chip.on { background: color-mix(in srgb, var(--dsr-text) 9%, transparent); color: var(--dsr-text); border-color: color-mix(in srgb, var(--dsr-text) 22%, var(--dsr-border)); }
.dsr-col-chip:disabled { color: color-mix(in srgb, var(--dsr-text-3) 65%, transparent); border-color: var(--dsr-border); cursor: not-allowed; }
.dsr-accent-row { display: flex; gap: 7px; }
.dsr-swatch { width: 24px; height: 24px; border-radius: 7px; border: 2px solid transparent; cursor: pointer; padding: 0; background: var(--swatch); }
.dsr-swatch.on { border-color: color-mix(in srgb, var(--dsr-text) 55%, transparent); }
.dsr-name-input { max-width: 320px; }

/* 设置 */
.dsr-settings { display: flex; flex-direction: column; gap: 18px; }
.dsr-settings-block { border: 1px solid var(--dsr-border); border-radius: 13px; background: var(--dsr-panel); overflow: hidden; }
.dsr-settings-head { padding: 14px 16px; border-bottom: 1px solid var(--dsr-border); display: flex; align-items: center; gap: 8px; }
.dsr-settings-head h2 { margin: 0; font-size: 13px; font-weight: 620; }
.dsr-settings-head .dsr-chip { margin-left: auto; }
.dsr-settings-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.dsr-setting-row { display: flex; align-items: center; gap: 12px; }
.dsr-setting-row .dsr-label { flex: 0 0 120px; }
.dsr-setting-value { flex: 1 1 auto; font-size: 12px; color: var(--dsr-text-2); }
.dsr-facts { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 8px; }
.dsr-fact { padding: 11px 12px; border-radius: 9px; background: color-mix(in srgb, var(--dsr-text) 4%, transparent); }
.dsr-fact b { display: block; font-size: 12px; font-weight: 600; }
.dsr-fact span { display: block; margin-top: 3px; color: var(--dsr-text-3); font-size: 10px; line-height: 1.6; }
.dsr-key-form { display: flex; flex-direction: column; gap: 8px; max-width: 440px; }
.dsr-danger-zone { display: flex; align-items: center; gap: 10px; }
.dsr-danger-zone .dsr-muted { flex: 1 1 auto; }

@media (max-width: 980px) {
  .dsr-setup-card { grid-template-columns: 1fr; }
  .dsr-setup-visual { min-height: 360px; border-right: none; border-bottom: 1px solid var(--dsr-border); padding: 32px 28px; }
  .dsr-setup-form { padding: 30px 28px; }
  .dsr-editor-body { grid-template-columns: 1fr; }
  .dsr-preview { border-left: none; border-top: 1px solid var(--dsr-border); }
  .dsr-form-grid { grid-template-columns: 1fr; }
  .dsr-form-grid.three { grid-template-columns: 1fr 1fr; }
  .dsr-cond-row { flex-wrap: wrap; }
  .dsr-cond-label { flex-basis: 100%; }
}

@media (max-width: 720px) {
  .dsr-topbar { padding: 0 12px; gap: 8px; }
  .dsr-brand-sub { display: none; }
  .dsr-status { display: none; }
  .dsr-page { padding: 20px 12px 36px; }
  .dsr-wall-grid { grid-template-columns: 1fr; }
  .dsr-wall-head { align-items: center; }
  .dsr-focus-actions .dsr-btn span { display: none; }
  .dsr-focus-actions .dsr-btn { width: 32px; padding: 0; }
  .dsr-table th:nth-child(2), .dsr-table td:nth-child(2) { width: 130px; }
  .dsr-table td, .dsr-table th { padding: 0 8px; }
  .dsr-bar-row { grid-template-columns: 20px 92px 1fr 62px; gap: 7px; }
  .dsr-form { padding: 16px 14px 24px; }
  .dsr-editor-head { padding: 0 12px; }
  .dsr-editor-footer { padding: 0 12px; }
}

/* ─────────────────────────────────────────────────────────────
   方块量化 · 榜单页视觉层
   与 frontend/src/index.css 的 zinc + indigo 设计系统对齐：
   背景 #09090b / 卡片 #18181b / 表头 #27272a / 主色 #6366f1
   ───────────────────────────────────────────────────────────── */
.dsr-panel {
  --dsr-bg: #09090b;
  --dsr-panel: #18181b;
  --dsr-panel-2: #27272a;
  --dsr-text: #e4e4e7;
  --dsr-text-2: #a1a1aa;
  --dsr-text-3: #93939e;
  --dsr-border: #27272a;
  --dsr-hover: rgba(39, 39, 42, .6);
  --dsr-up: #ef4444;
  --dsr-down: #10b981;
  --dsr-amber: #f59e0b;
  --dsr-radius: 8px;
  --dsr-accent: #6366f1;
  --fk-heading: #f4f4f5;
  --fk-muted: #a1a1aa;
  --fk-dim: #93939e;
  --fk-border: #27272a;
  --fk-border-light: #3f3f46;
  --fk-card: #18181b;
  --fk-elevated: #27272a;
  --fk-hover: rgba(39, 39, 42, .6);
  --fk-accent: #6366f1;
  --fk-accent-hover: #4f46e5;
  --fk-accent-muted: #818cf8;
  --fk-accent-glow: rgba(99, 102, 241, .1);
  --fk-rise: #ef4444;
  --fk-fall: #10b981;
  --fk-warning: #f59e0b;
  position: relative;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: var(--dsr-bg);
  color: var(--dsr-text);
  font-family: Inter, system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 12px;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
}
.dsr-panel *, .dsr-panel *::before, .dsr-panel *::after { box-sizing: border-box; }
.dsr-panel .dsr-main {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  overscroll-behavior: contain;
  background: var(--dsr-bg);
  scrollbar-width: thin;
  scrollbar-color: var(--fk-border-light) transparent;
}
.dsr-panel ::-webkit-scrollbar { width: 5px; height: 5px; }
.dsr-panel ::-webkit-scrollbar-track { background: transparent; }
.dsr-panel ::-webkit-scrollbar-thumb { background: var(--fk-border-light); border-radius: 3px; }
.dsr-panel ::-webkit-scrollbar-thumb:hover { background: var(--fk-dim); }
.dsr-panel ::-webkit-scrollbar-corner { background: transparent; }

.dsr-panel .dsr-page {
  width: 100%;
  max-width: 1440px;
  min-height: 100%;
  margin: 0 auto;
  padding: 12px 16px 32px;
}
.dsr-panel .dsr-page.narrow { max-width: 1040px; }
.dsr-panel .fk-focus-page { display: flex; flex-direction: column; min-height: 100%; }
.dsr-panel .fk-focus-page .dsr-result-card { min-height: 0; flex: 1 1 auto; }
.dsr-panel .fk-focus-page .dsr-result-card .dsr-table-wrap { flex: 1 1 auto; min-height: 0; }
.dsr-panel .fk-focus-page .dsr-result-card .dsr-table { height: auto; }

/* 页头 / 页签 / 工具条 */
.fk-page-head {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 30px;
  margin-bottom: 2px;
}
.fk-page-title { display: flex; align-items: center; gap: 8px; min-width: 0; }
.fk-page-title h1 {
  margin: 0;
  color: var(--fk-heading);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -.015em;
  line-height: 1.2;
}
.fk-page-count {
  margin-left: auto;
  color: var(--fk-dim);
  font-size: 12px;
  white-space: nowrap;
}
.fk-guide-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 22px;
  padding: 0 7px;
  border: 1px solid transparent;
  border-radius: 4px;
  background: #1f1f24;
  color: var(--fk-dim);
  font: inherit;
  font-size: 11px;
  cursor: pointer;
  white-space: nowrap;
  transition: background .15s ease, color .15s ease;
}
.fk-guide-chip:hover, .fk-guide-chip.on { background: var(--fk-elevated); color: var(--dsr-text); }
.fk-guide-box {
  margin: 6px 0 2px;
  padding: 9px 12px;
  border: 1px solid var(--fk-border);
  border-radius: 6px;
  background: #141416;
  color: var(--fk-muted);
  font-size: 11px;
  line-height: 1.75;
}
.fk-guide-box p { margin: 0; display: flex; gap: 7px; }
.fk-guide-box b { color: var(--fk-accent-muted); font-weight: 500; }
.fk-tabs {
  display: flex;
  align-items: center;
  gap: 22px;
  height: 34px;
  margin: 2px 0 10px;
  border-bottom: 1px solid var(--fk-border);
}
.fk-tab {
  position: relative;
  height: 34px;
  padding: 0 1px;
  border: none;
  background: transparent;
  color: var(--fk-dim);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}
.fk-tab.active { color: var(--fk-accent-muted); font-weight: 500; }
.fk-tab.active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: var(--fk-accent);
}
.fk-toolbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
}
.fk-toolbar-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--fk-muted);
  font-size: 12px;
  white-space: nowrap;
}
.fk-toolbar-item svg { color: var(--fk-dim); }
.fk-toolbar-item b { color: var(--dsr-text); font-weight: 400; font-size: 12px; }
.fk-toolbar-dim { color: var(--fk-dim); font-size: 11px; white-space: nowrap; }
.fk-mono { font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace; font-variant-numeric: tabular-nums; }
.fk-market {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--fk-dim);
  font-size: 11px;
  white-space: nowrap;
}
.fk-market-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--fk-border-light); }
.fk-market.live { color: var(--fk-muted); }
.fk-market.live .fk-market-dot { background: var(--fk-rise); box-shadow: 0 0 0 3px rgba(239, 68, 68, .1); }
.fk-toolbar-actions { margin-left: auto; display: flex; align-items: center; gap: 8px; }

/* 按钮 / 输入，统一成主项目尺寸 */
.dsr-panel .dsr-btn, .fk-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid var(--fk-border);
  border-radius: 6px;
  background: #18181b;
  color: var(--fk-muted);
  font: inherit;
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
  cursor: pointer;
  transition: background .15s ease, border-color .15s ease, color .15s ease;
}
.dsr-panel .dsr-btn:hover, .fk-btn:hover { background: var(--fk-elevated); color: var(--dsr-text); }
.dsr-panel .dsr-btn:disabled, .fk-btn:disabled { opacity: .45; cursor: not-allowed; }
.dsr-panel .dsr-btn.primary, .fk-btn.primary {
  border-color: var(--fk-accent);
  background: var(--fk-accent);
  color: #fff;
}
.dsr-panel .dsr-btn.primary:hover, .fk-btn.primary:hover { border-color: var(--fk-accent-hover); background: var(--fk-accent-hover); }
.dsr-panel .dsr-btn.small, .fk-btn.small { height: 26px; padding: 0 8px; font-size: 11px; border-radius: 4px; }
.dsr-panel .dsr-btn.quiet { border-color: transparent; background: transparent; color: var(--fk-dim); }
.dsr-panel .dsr-btn.quiet:hover { background: var(--fk-elevated); color: var(--dsr-text); }
.dsr-panel .dsr-btn.danger { border-color: rgba(239, 68, 68, .25); color: #f87171; background: transparent; }
.dsr-panel .dsr-btn.danger:hover { background: rgba(239, 68, 68, .08); }
.fk-icon-btn {
  width: 32px;
  height: 32px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  background: transparent;
  color: var(--fk-dim);
  cursor: pointer;
  transition: background .15s ease, color .15s ease;
}
.fk-icon-btn:hover { background: var(--fk-elevated); color: var(--dsr-text); }
.dsr-panel .dsr-icon-btn {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  color: var(--fk-dim);
}
.dsr-panel .dsr-icon-btn:hover { background: var(--fk-elevated); color: var(--dsr-text); }
.dsr-panel .dsr-input, .dsr-panel .dsr-select, .dsr-panel .dsr-textarea {
  height: 32px;
  padding: 0 8px;
  border: 1px solid var(--fk-border);
  border-radius: 6px;
  background: var(--fk-elevated);
  color: var(--dsr-text);
  font-size: 12px;
}
.dsr-panel .dsr-input:focus, .dsr-panel .dsr-select:focus { border-color: var(--fk-accent); box-shadow: 0 0 0 1px var(--fk-accent); }
.dsr-panel .dsr-label { font-size: 11px; color: var(--fk-dim); }

/* 空榜单：与主项目空状态同一张面板、同一套模板卡 */
.fk-empty-wall {
  margin-top: 2px;
  padding: 26px 24px 22px;
  border: 1px solid var(--fk-border);
  border-radius: 8px;
  background: var(--fk-card);
}
.fk-empty-head { text-align: center; margin-bottom: 20px; }
.fk-empty-head h2 { margin: 0 0 4px; color: var(--fk-heading); font-size: 16px; font-weight: 600; }
.fk-empty-head p { max-width: 540px; margin: 0 auto; color: var(--fk-dim); font-size: 12px; line-height: 1.7; }
.fk-template-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  max-width: 1120px;
  margin: 0 auto;
}
.fk-template-card {
  min-height: 84px;
  padding: 11px 12px;
  text-align: left;
  border: 1px solid var(--fk-border);
  border-radius: 6px;
  background: #1c1c20;
  cursor: pointer;
  transition: background .15s ease, border-color .15s ease;
}
.fk-template-card:hover { border-color: var(--fk-border-light); background: #232328; }
.fk-template-title { display: flex; align-items: center; gap: 6px; color: var(--fk-muted); font-size: 13px; font-weight: 500; }
.fk-template-title i { width: 6px; height: 6px; border-radius: 50%; background: var(--tpl-accent); flex: 0 0 6px; }
.fk-template-desc { display: block; margin-top: 6px; color: var(--fk-dim); font-size: 11px; line-height: 1.65; }
.fk-empty-action { display: flex; margin: 22px auto 0; }

/* 榜单名标签条：与主项目墙面上方的一排榜单标签一致 */
.fk-name-strip {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: -2px 0 10px;
  padding-bottom: 1px;
  border-bottom: 1px solid var(--fk-border);
  overflow-x: auto;
  scrollbar-width: none;
}
.fk-name-strip::-webkit-scrollbar { display: none; }
.fk-name-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 10px;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  background: transparent;
  color: var(--fk-muted);
  font: inherit;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
  transition: color .15s ease, border-color .15s ease;
}
.fk-name-tab:hover { color: var(--dsr-text); }
.fk-name-tab.active { color: var(--fk-accent-muted); border-bottom-color: var(--fk-accent); }
.fk-name-tab i { width: 6px; height: 6px; border-radius: 50%; flex: 0 0 6px; }
.fk-name-tab .fk-mono { color: var(--fk-dim); font-size: 10px; }

/* 榜单墙卡片 */
.fk-wall-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  align-items: start;
  gap: 16px;
}
.fk-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 420px;
  border: 1px solid var(--fk-border);
  border-radius: 8px;
  background: var(--fk-card);
  overflow: hidden;
  transition: border-color .15s ease;
}
.fk-card:hover { border-color: var(--fk-border-light); }
.fk-card-accent { width: 4px; align-self: stretch; border-radius: 999px; flex: 0 0 4px; }
.fk-card-head { display: flex; align-items: flex-start; gap: 8px; padding: 10px 12px 8px; flex: 0 0 auto; }
.fk-card-title-box { min-width: 0; flex: 1 1 auto; }
.fk-card-name {
  display: block;
  max-width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--fk-heading);
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: color .15s ease;
}
.fk-card-name:hover { color: var(--fk-accent-muted); }
.fk-card-meta { display: flex; align-items: baseline; gap: 8px; margin-top: 2px; color: var(--fk-dim); font-size: 10px; }
.fk-card-hit { display: inline-flex; align-items: baseline; gap: 3px; }
.fk-card-hit b { color: var(--dsr-accent); font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 18px; font-weight: 600; line-height: 1; }
.fk-card-hit span { color: var(--fk-dim); font-size: 10px; }
.fk-card-meta .fk-mono { color: var(--fk-dim); font-size: 10px; }
.fk-card-actions { display: flex; align-items: center; gap: 0; margin-left: auto; flex: 0 0 auto; opacity: 1; }
.fk-card-action {
  width: 24px;
  height: 24px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: var(--fk-dim);
  cursor: pointer;
  transition: background .15s ease, color .15s ease;
}
.fk-card-action:hover { background: var(--fk-elevated); color: var(--dsr-text); }
.fk-card-action.danger:hover { background: rgba(239, 68, 68, .1); color: #f87171; }
.fk-card-action.danger-text { color: #f87171; }
.fk-card-table { padding: 0 8px 8px; flex: 1 1 auto; min-height: 92px; overflow-x: auto; scrollbar-width: none; }
.fk-card-table::-webkit-scrollbar { display: none; }
.fk-card-row {
  display: grid;
  grid-template-columns: 24px 58px minmax(0, 1fr) 54px 64px 70px;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 4px;
  border-radius: 3px;
  min-width: 0;
}
.fk-card-row:hover { background: var(--fk-hover); }
.fk-rank-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  background: var(--fk-elevated);
  color: var(--fk-dim);
  font: 600 11px/1 "JetBrains Mono", ui-monospace, monospace;
}
.fk-rank-badge.podium-1 { background: rgba(245, 158, 11, .15); color: #fcd34d; }
.fk-rank-badge.podium-2 { background: var(--fk-elevated); color: var(--dsr-text); }
.fk-rank-badge.podium-3 { background: rgba(249, 115, 22, .14); color: #fb923c; }
.fk-code { color: var(--fk-accent-muted); font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fk-name { color: var(--dsr-text); font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fk-price { color: var(--fk-muted); font-size: 11px; text-align: right; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fk-pct {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 52px;
  height: 20px;
  padding: 0 4px;
  border-radius: 2px;
  font-size: 11px;
  font-weight: 500;
  text-align: right;
  white-space: nowrap;
}
.fk-pct.up { color: var(--fk-rise); background: rgba(239, 68, 68, .1); }
.fk-pct.down { color: var(--fk-fall); background: rgba(16, 185, 129, .1); }
.fk-pct.flat { color: var(--fk-dim); background: var(--fk-elevated); }
.fk-card-value { color: var(--fk-dim); font-size: 10px; text-align: right; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fk-card-empty { padding: 18px 16px 20px; color: var(--fk-dim); font-size: 11px; line-height: 1.7; display: flex; flex-direction: column; align-items: flex-start; gap: 10px; }
.fk-card-error { padding: 10px 14px 14px; display: flex; flex-direction: column; gap: 8px; }
.fk-card-skeleton { padding: 10px 16px 16px; display: flex; flex-direction: column; gap: 7px; }
.fk-card-foot { margin-top: auto; padding: 8px 12px; border-top: 1px solid var(--fk-border); flex: 0 0 auto; }
.fk-card-conditions { display: flex; flex-wrap: wrap; gap: 4px; min-height: 18px; }
.fk-cond {
  max-width: 170px;
  height: 18px;
  padding: 0 5px;
  border: none;
  border-radius: 3px;
  background: color-mix(in srgb, var(--dsr-accent) 13%, transparent);
  color: var(--dsr-accent);
  font: inherit;
  font-size: 10px;
  line-height: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.fk-cond:hover { filter: brightness(1.15); }
.fk-cond.negate { color: var(--fk-dim); background: var(--fk-elevated); text-decoration: line-through; }
.fk-cond.more { color: var(--fk-dim); background: var(--fk-elevated); }
.fk-card-nocond { color: var(--fk-dim); font-size: 10px; }
.fk-card-sub { display: flex; align-items: center; gap: 8px; margin-top: 5px; color: var(--fk-dim); font-size: 10px; white-space: nowrap; min-width: 0; }
.fk-card-sub .fk-truncate { min-width: 0; flex: 1 1 auto; overflow: hidden; text-overflow: ellipsis; }
.fk-card-sub > span { flex: 0 0 auto; }
.fk-card-more { padding: 0; border: none; background: transparent; color: var(--fk-accent-muted); font: inherit; font-size: 10px; cursor: pointer; white-space: nowrap; }
.fk-card-more:hover { color: var(--dsr-text); }
.fk-card-view { margin-left: auto; flex: 0 0 auto; color: var(--fk-dim); }
.fk-new-card {
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 1px dashed var(--fk-border-light);
  border-radius: 6px;
  background: transparent;
  color: var(--fk-dim);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  transition: border-color .15s ease, background .15s ease, color .15s ease;
}
.fk-new-card:hover { border-color: var(--fk-accent); background: rgba(99, 102, 241, .04); color: var(--fk-muted); }

/* 聚焦页：与主项目同一套卡片头 + 密集表格 */
.dsr-panel .dsr-focus-head {
  display: block;
  margin-bottom: 12px;
  padding: 12px 16px;
  border: 1px solid var(--fk-border);
  border-radius: 8px;
  background: var(--fk-card);
  flex: 0 0 auto;
}
.fk-focus-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; min-width: 0; }
.fk-back {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--fk-dim);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
  transition: color .15s ease;
}
.fk-back:hover { color: var(--fk-accent-muted); }
.fk-focus-accent { width: 4px; height: 20px; border-radius: 999px; flex: 0 0 4px; }
.fk-focus-bar h1 { margin: 0; color: var(--fk-heading); font-size: 16px; font-weight: 600; line-height: 1.3; white-space: nowrap; }
.fk-focus-hit { display: inline-flex; align-items: baseline; gap: 3px; margin-left: 2px; }
.fk-focus-hit b { color: var(--fk-accent-muted); font-size: 20px; font-weight: 600; line-height: 1; }
.fk-focus-hit span { color: var(--fk-dim); font-size: 11px; }
.fk-focus-date { color: var(--fk-dim); font-size: 11px; white-space: nowrap; }
.fk-focus-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; margin-left: auto; }
.fk-focus-actions .fk-btn { height: 28px; padding: 0 9px; font-size: 11px; border-radius: 4px; }
.fk-focus-actions .fk-btn.danger { color: #f87171; border-color: transparent; background: var(--fk-elevated); }
.fk-focus-actions .fk-btn.danger:hover { background: rgba(239, 68, 68, .1); }
.dsr-panel .dsr-conditions { display: flex; flex-wrap: wrap; gap: 5px; margin: 9px 0 0; }
.dsr-panel .dsr-cond-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 22px;
  padding: 0 6px 0 7px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--fk-accent) 13%, transparent);
  color: var(--fk-accent-muted);
  font-size: 11px;
  white-space: nowrap;
}
.dsr-panel .dsr-cond-chip.exclude { color: var(--fk-dim); background: var(--fk-elevated); text-decoration: line-through; }
.fk-cond-remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  padding: 0;
  border: none;
  border-radius: 2px;
  background: transparent;
  color: var(--fk-dim);
  cursor: pointer;
}
.fk-cond-remove:hover { background: rgba(239, 68, 68, .12); color: #f87171; }
.dsr-panel .dsr-result-card {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 240px;
  padding: 12px;
  border: 1px solid var(--fk-border);
  border-radius: 8px;
  background: var(--fk-card);
}
.fk-result-foot {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 10px;
  color: var(--fk-dim);
  font-size: 11px;
}
.fk-result-foot .fk-mono { margin-left: auto; }
.dsr-panel .dsr-view-tabs { display: none; }
.dsr-panel .dsr-table-wrap {
  border: 1px solid var(--fk-border);
  border-radius: 6px;
  overflow: auto;
  background: var(--fk-card);
}
.dsr-panel .dsr-table { width: 100%; border-collapse: separate; border-spacing: 0; table-layout: fixed; }
.dsr-panel .dsr-table th {
  height: 32px;
  padding: 0 8px;
  border-bottom: 1px solid var(--fk-border);
  background: var(--fk-elevated);
  color: var(--fk-muted);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0;
  text-align: right;
  white-space: nowrap;
}
.dsr-panel .dsr-table th:first-child, .dsr-panel .dsr-table td:first-child { width: 42px; text-align: center; }
.dsr-panel .dsr-table th:nth-child(2), .dsr-panel .dsr-table td:nth-child(2) { width: 84px; text-align: left; }
.dsr-panel .dsr-table th:nth-child(3), .dsr-panel .dsr-table td:nth-child(3) { width: 108px; text-align: left; }
.dsr-panel .dsr-table th:nth-child(4), .dsr-panel .dsr-table td:nth-child(4) { width: 68px; }
.dsr-panel .dsr-table th:nth-child(5), .dsr-panel .dsr-table td:nth-child(5) { width: 76px; }
.dsr-panel .dsr-table th:nth-child(6), .dsr-panel .dsr-table td:nth-child(6) { width: 54px; }
.dsr-panel .dsr-table th:last-child { width: 92px; text-align: left; }
.dsr-panel .dsr-table td:last-child { text-align: left; }
.dsr-panel .dsr-table td {
  height: 32px;
  padding: 0 8px;
  border-bottom: 1px solid #1f1f24;
  color: var(--dsr-text);
  font-size: 12px;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
}
.dsr-panel .dsr-table tbody tr:hover { background: var(--fk-hover); }
.dsr-panel .dsr-table tr:last-child td { border-bottom: none; }
.dsr-panel .dsr-table .fk-cell-name { text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dsr-panel .dsr-table .fk-cell-name .fk-name { display: inline-block; vertical-align: middle; }
.dsr-panel .dsr-table .fk-cell-name .dsr-tag { display: inline-flex; vertical-align: middle; }
.dsr-panel .dsr-table .fk-cell-code, .dsr-panel .dsr-table .fk-cell-tags { text-align: left; }
.dsr-panel .dsr-table .fk-cell-tags { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dsr-panel .dsr-table .fk-cell-tags .dsr-tag { margin-left: 0; }
.dsr-panel .dsr-table .fk-name { font-size: 13px; font-weight: 500; color: var(--dsr-text); overflow: hidden; text-overflow: ellipsis; }
.dsr-panel .dsr-table .fk-code { font-size: 12px; }
.dsr-panel .dsr-table .dsr-pct {
  display: inline-flex;
  justify-content: flex-end;
  min-width: 56px;
  height: 21px;
  padding: 0 5px;
  border-radius: 2px;
  font-size: 12px;
  line-height: 21px;
}
.dsr-panel .dsr-table .dsr-pct.up { background: rgba(239, 68, 68, .1); }
.dsr-panel .dsr-table .dsr-pct.down { background: rgba(16, 185, 129, .1); }
.dsr-panel .dsr-table .dsr-pct.flat { background: var(--fk-elevated); }
.dsr-panel .dsr-table .dsr-tag.tag-up { color: #fbbf24; background: rgba(245, 158, 11, .12); }
.dsr-panel .dsr-table .dsr-tag.tag-burst { color: #fb923c; background: rgba(249, 115, 22, .12); }
.dsr-panel .dsr-table .dsr-rank { width: 20px; text-align: center; font-size: 10px; color: var(--fk-dim); }
.dsr-panel .dsr-table .dsr-rank.medal { color: var(--fk-warning); font-weight: 600; }
.dsr-panel .dsr-table td .dsr-tag {
  display: inline-flex;
  align-items: center;
  height: 17px;
  margin-left: 3px;
  padding: 0 5px;
  border-radius: 3px;
  background: var(--fk-elevated);
  color: var(--fk-dim);
  font-size: 10px;
}
.dsr-panel .dsr-pct { font-family: "JetBrains Mono", ui-monospace, monospace; font-weight: 500; }
.dsr-panel .dsr-pct.up { color: var(--fk-rise); }
.dsr-panel .dsr-pct.down { color: var(--fk-fall); }
.dsr-panel .dsr-pct.flat { color: var(--fk-dim); }
.dsr-panel .dsr-empty-result { padding: 46px 20px; border: 1px dashed var(--fk-border); border-radius: 6px; text-align: center; background: var(--fk-card); }
.dsr-panel .dsr-empty-result h3 { margin: 0 0 5px; color: var(--fk-heading); font-size: 15px; font-weight: 500; }
.dsr-panel .dsr-empty-result p { margin: 0 0 14px; color: var(--fk-dim); font-size: 12px; }
.dsr-panel .dsr-hint { font-size: 11px; color: var(--fk-dim); line-height: 1.65; }
.dsr-panel .dsr-muted { color: var(--fk-dim); font-size: 11px; line-height: 1.6; }
.dsr-panel .dsr-error {
  padding: 8px 10px;
  border: 1px solid rgba(239, 68, 68, .2);
  border-radius: 6px;
  background: rgba(239, 68, 68, .08);
  color: #fca5a5;
  font-size: 11px;
  line-height: 1.6;
}
.dsr-panel .dsr-code { color: var(--fk-dim); font-size: 10px; }

/* 其他视图保持同一套密度 */
.dsr-panel .dsr-cards-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 8px; }
.dsr-panel .dsr-stock-card { border-radius: 6px; background: var(--fk-card); padding: 11px; }
.dsr-panel .dsr-stock-card-head b { font-size: 12px; }
.dsr-panel .dsr-stock-card-head .dsr-pct { font-size: 13px; }
.dsr-panel .dsr-metric strong { font-family: "JetBrains Mono", ui-monospace, monospace; }
.dsr-panel .dsr-groups { gap: 12px; }
.dsr-panel .dsr-group { border-radius: 6px; background: var(--fk-card); }
.dsr-panel .dsr-group-head { padding: 8px 12px; }
.dsr-panel .dsr-bar-row { height: 28px; }

/* 编辑页与设置页，收成主项目的圆角和字号 */
.dsr-editor-backdrop {
  position: absolute;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 22px;
  background: rgba(0, 0, 0, .58);
  backdrop-filter: blur(2px);
}
.dsr-panel .dsr-editor {
  width: min(896px, 100%);
  height: min(780px, calc(100% - 8px));
  max-height: calc(100% - 8px);
  border: 1px solid var(--fk-border-light);
  border-radius: 12px;
  background: var(--fk-card);
  box-shadow: 0 24px 80px rgba(0, 0, 0, .55);
  overflow: hidden;
}
.dsr-panel .dsr-editor-head { height: 52px; flex: 0 0 52px; padding: 0 16px; gap: 8px; border-bottom-color: var(--fk-border); }
.dsr-panel .dsr-editor-head h1 { font-size: 15px; font-weight: 600; color: var(--fk-heading); }
.dsr-panel .dsr-editor-head .fk-editor-mark { color: var(--fk-accent-muted); flex: 0 0 auto; }
.dsr-panel .dsr-editor-head .dsr-icon-btn { margin-left: auto; }
.dsr-panel .dsr-editor-head .dsr-muted { font-size: 11px; color: var(--fk-dim); }
.dsr-panel .dsr-editor-body { flex: 1 1 auto; min-height: 0; grid-template-columns: minmax(0, 1fr) 300px; width: 100%; overflow: hidden; }
.dsr-panel .dsr-form { padding: 18px 20px 24px; gap: 18px; overflow: auto; min-height: 0; }
.dsr-panel .dsr-form-section { gap: 8px; }
.dsr-panel .dsr-section-title h2 { font-size: 12px; font-weight: 500; color: var(--fk-muted); }
.dsr-panel .dsr-form-title { font-size: 16px; font-weight: 600; }
.dsr-panel .dsr-cond-row { border-radius: 6px; padding: 7px 8px; background: #141416; }
.dsr-panel .dsr-cond-label { flex-basis: 104px; font-size: 11px; color: var(--fk-muted); padding-top: 7px; }
.dsr-panel .dsr-cond-op, .dsr-panel .dsr-num, .dsr-panel .dsr-board-trigger { height: 28px; border-radius: 4px; font-size: 11px; }
.dsr-panel .dsr-add-cond { height: 30px; border-radius: 4px; font-size: 11px; }
.dsr-panel .dsr-cond-empty { border-radius: 6px; font-size: 11px; }
.dsr-panel .dsr-preview { border-left-color: var(--fk-border); background: #141416; padding: 16px 14px; }
.dsr-panel .dsr-preview-head h2 { font-size: 12px; font-weight: 500; }
.dsr-panel .dsr-preview-stat { border-radius: 4px; background: var(--fk-elevated); }
.dsr-panel .dsr-preview-stat strong { font-size: 20px; }
.dsr-panel .dsr-preview-row { height: 28px; font-size: 10px; border-bottom-color: #1f1f24; }
.dsr-panel .dsr-editor-footer { height: 52px; flex-basis: 52px; padding: 0 16px; border-top-color: var(--fk-border); background: var(--dsr-bg); }
/* 条件选择器：搜索 + 常用 14 个先露，进阶条件按需展开 */
.dsr-panel .dsr-picker-modal {
  position: absolute;
  inset: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, .55);
}
.dsr-panel .dsr-picker { width: min(720px, 94vw); max-height: min(660px, 86vh); border-radius: 12px; background: var(--fk-card); }
.dsr-panel .dsr-picker-head { padding: 11px 14px; }
.dsr-panel .dsr-picker-head h2 { font-size: 13px; font-weight: 500; color: var(--fk-heading); }
.dsr-picker-count { color: var(--fk-dim); font-size: 11px; }
.dsr-panel .dsr-picker-head .dsr-icon-btn { width: 24px; height: 24px; }
.dsr-panel .dsr-picker-body { padding: 12px 14px 16px; }
.dsr-picker-search { margin-bottom: 12px; }
.dsr-panel .dsr-picker-group { margin-bottom: 13px; }
.dsr-panel .dsr-picker-group h3 { margin: 0 0 6px; font-size: 11px; font-weight: 400; color: var(--fk-dim); }
.dsr-panel .dsr-picker-grid { grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 5px; }
.dsr-panel .dsr-picker-item {
  min-height: 40px;
  padding: 6px 8px;
  border: 1px solid var(--fk-border);
  border-radius: 4px;
  background: #1c1c20;
  color: var(--dsr-text);
}
.dsr-panel .dsr-picker-item:hover { border-color: var(--fk-border-light); background: #232328; }
.dsr-panel .dsr-picker-item b { font-size: 11px; font-weight: 500; }
.dsr-panel .dsr-picker-item small { font-size: 10px; color: var(--fk-dim); }
.fk-picker-more {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  height: 32px;
  margin: -2px 0 12px;
  padding: 0 9px;
  border: 1px dashed var(--fk-border-light);
  border-radius: 4px;
  background: transparent;
  color: var(--fk-muted);
  font: inherit;
  font-size: 11px;
  cursor: pointer;
}
.fk-picker-more:hover { border-color: var(--fk-accent); color: var(--dsr-text); }
.fk-picker-more > span { color: var(--fk-dim); }
.fk-picker-more > small { margin-left: auto; color: var(--fk-dim); }
.fk-picker-more svg { transition: transform .15s ease; }
.fk-picker-more[aria-expanded="true"] svg { transform: rotate(180deg); }
.dsr-panel .fk-picker-advanced { padding-left: 10px; border-left: 1px solid var(--fk-border); }
.dsr-panel .dsr-settings { max-width: 900px; margin: 0 auto; gap: 12px; }.dsr-panel .dsr-settings-block { border-radius: 6px; background: var(--fk-card); }
.dsr-panel .dsr-settings-head { padding: 11px 14px; }
.dsr-panel .dsr-settings-head h2 { font-size: 12px; font-weight: 500; }
.dsr-panel .dsr-settings-body { padding: 14px; gap: 10px; }
.dsr-panel .dsr-fact { border-radius: 4px; background: #1f1f24; }
.dsr-panel .dsr-setup { max-width: 940px; padding: 36px 20px; }
.dsr-panel .dsr-setup-card { border-radius: 8px; box-shadow: none; }
.dsr-panel .dsr-setup-visual { padding: 30px 32px; min-height: 430px; background: var(--fk-card); }
.dsr-panel .dsr-setup-title { font-size: 24px; font-weight: 600; }
.dsr-panel .dsr-setup-form { padding: 30px 30px; }
.dsr-panel .dsr-form-sub { margin-bottom: 18px; font-size: 12px; }
.dsr-panel .dsr-input, .dsr-panel .dsr-select { height: 32px; }
.dsr-panel .dsr-setup-actions .dsr-btn.primary { height: 34px; font-size: 12px; border-radius: 6px; }
.dsr-panel .dsr-privacy { border-radius: 4px; }

/* 浮层提示（面板内的轻提示，不挡操作） */
.dsr-toast-float {
  position: absolute;
  top: 10px;
  right: 14px;
  z-index: 30;
  height: 26px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--fk-border-light);
  border-radius: 4px;
  background: var(--fk-elevated);
  color: var(--dsr-text);
  font-size: 11px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, .35);
}

@media (max-width: 980px) {
  .fk-template-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .fk-wall-grid { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
  .dsr-panel .dsr-editor-body { grid-template-columns: 1fr; }
}
@media (max-width: 720px) {
  .dsr-panel .dsr-page { padding: 10px 10px 24px; }
  .fk-template-grid { grid-template-columns: 1fr; }
  .fk-wall-grid { columns: 1; }
  .fk-toolbar-actions { width: 100%; margin-left: 0; }
  .fk-toolbar-actions .fk-btn { flex: 1 1 auto; }
  .dsr-panel .dsr-focus-actions .dsr-btn span { display: none; }
  .dsr-panel .dsr-focus-actions .dsr-btn { width: 30px; padding: 0; }
}

/* 主项目同款三段式配置弹窗 */
.dsr-panel .fk-editor-modal {
  width: min(896px, 100%);
  max-height: min(900px, calc(100% - 8px));
  height: min(860px, calc(100% - 8px));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--fk-border-light);
  border-radius: 12px;
  background: var(--fk-card);
  box-shadow: 0 24px 80px rgba(0, 0, 0, .55);
}
.fk-editor-head {
  flex: 0 0 62px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 18px;
  border-bottom: 1px solid var(--fk-border);
}
.fk-editor-head h1 { margin: 0; font-size: 15px; font-weight: 620; }
.fk-editor-head .dsr-muted { display: block; margin-top: 2px; font-size: 10px; }
.fk-editor-head > div { min-width: 0; }
.fk-editor-head .dsr-icon-btn { margin-left: auto; }
.fk-editor-mark {
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background: var(--fk-accent-glow);
  color: var(--fk-accent);
  flex: 0 0 30px;
}
.fk-editor-scroll { flex: 1 1 auto; min-height: 0; overflow: auto; padding: 14px 18px 18px; }
.fk-editor-section { padding: 0 0 16px; margin-bottom: 14px; border-bottom: 1px solid var(--fk-border); }
.fk-editor-section:last-child { border-bottom: none; margin-bottom: 0; }
.fk-editor-label { margin-bottom: 8px; color: var(--fk-dim); font-size: 11px; letter-spacing: .02em; }
.fk-editor-label-row { display: flex; align-items: center; gap: 8px; }
.fk-editor-label-row .fk-editor-label { margin-bottom: 8px; flex: 1 1 auto; }
.fk-basic-row { display: flex; align-items: flex-start; gap: 12px; flex-wrap: wrap; }
.fk-basic-name { display: flex; flex-direction: column; gap: 4px; width: 180px; }
.fk-basic-note { display: flex; flex-direction: column; gap: 4px; flex: 1 1 220px; min-width: 160px; }
.fk-basic-accent { display: flex; flex-direction: column; gap: 4px; }
.fk-basic-row .dsr-name-input { width: 100%; }
.fk-template-row { margin-bottom: 10px; }
.fk-cond-toolbar { display: flex; align-items: center; gap: 10px; margin-bottom: 9px; }
.fk-cond-toolbar .dsr-muted { flex: 1 1 auto; font-size: 10px; }
.fk-cond-hit { margin-left: 6px; color: var(--fk-dim); font-size: 9px; font-variant-numeric: tabular-nums; }
.fk-cond-hit.zero { color: var(--fk-fall); }
.fk-display-row { display: flex; align-items: flex-end; gap: 12px; flex-wrap: wrap; }
.fk-display-field { display: flex; flex-direction: column; gap: 4px; min-width: 126px; }
.fk-view-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 7px; margin: 12px 0 10px; }
.fk-view-option {
  height: 62px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 1px solid var(--fk-border);
  border-radius: 7px;
  background: #1d1d21;
  color: var(--fk-muted);
  font: inherit;
  cursor: pointer;
  transition: border-color .15s ease, background .15s ease, color .15s ease;
}
.fk-view-option b { font-size: 11px; font-weight: 500; }
.fk-view-option:hover { border-color: var(--fk-border-light); color: var(--dsr-text); }
.fk-view-option.on { border-color: var(--fk-accent); background: var(--fk-accent-glow); color: var(--fk-accent); }
.fk-group-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
.fk-columns-field { margin-top: 4px; }
.fk-editor-previewbar {
  flex: 0 0 46px;
  min-height: 46px;
  display: flex;
  align-items: center;
  padding: 0 18px;
  border-top: 1px solid var(--fk-border);
  background: #19191d;
}
.fk-preview-content { display: flex; align-items: center; gap: 12px; width: 100%; min-width: 0; font-size: 11px; }
.fk-preview-count { flex: 0 0 auto; color: var(--fk-muted); }
.fk-preview-count b { margin-right: 3px; color: var(--fk-accent); font-size: 17px; font-variant-numeric: tabular-nums; }
.fk-preview-names { flex: 1 1 auto; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: var(--dsr-text); }
.fk-preview-meta { flex: 0 0 auto; color: var(--fk-dim); font-variant-numeric: tabular-nums; }
.fk-preview-loading { display: inline-flex; align-items: center; gap: 8px; color: var(--fk-muted); font-size: 11px; }
.fk-preview-empty { color: var(--fk-dim); font-size: 11px; }
.fk-editor-footer {
  flex: 0 0 58px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 18px;
  border-top: 1px solid var(--fk-border);
  background: var(--fk-card);
}
.fk-editor-footer .dsr-spacer { flex: 1 1 auto; }
.fk-editor-footer .dsr-error { margin-right: auto; max-width: 56%; }
.fk-editor-shortcut { margin-left: auto; margin-right: 4px; color: var(--fk-dim); font-size: 10px; }
.fk-editor-footer .dsr-btn { flex: 0 0 auto; }

/* 数据日 / 盘中预览标识 */
.fk-preview-chip {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  height: 22px;
  padding: 0 7px;
  border: 1px solid var(--fk-border-light);
  border-radius: 4px;
  color: var(--fk-muted);
  font-size: 10px;
  white-space: nowrap;
}
.fk-preview-chip.live { border-color: rgba(245, 158, 11, .38); background: rgba(245, 158, 11, .1); color: #f5b544; }
.fk-focus-note { max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--fk-dim); font-size: 10px; }
.fk-pager { display: inline-flex; align-items: center; gap: 6px; margin-left: auto; }
.fk-page-btn {
  height: 22px;
  padding: 0 7px;
  border: 1px solid var(--fk-border);
  border-radius: 4px;
  background: #1d1d21;
  color: var(--fk-muted);
  font: inherit;
  font-size: 10px;
  cursor: pointer;
}
.fk-page-btn:hover:not(:disabled) { border-color: var(--fk-border-light); color: var(--dsr-text); }
.fk-page-btn:disabled { opacity: .4; cursor: not-allowed; }
.fk-logic-chip {
  height: 23px;
  display: inline-flex;
  align-items: center;
  padding: 0 7px;
  border: 1px solid var(--fk-border-light);
  border-radius: 4px;
  color: var(--fk-muted);
  font-size: 10px;
}
.fk-logic-chip.or { border-color: rgba(14, 165, 233, .38); background: rgba(14, 165, 233, .1); color: #5cc8f5; }
.fk-source-list { display: flex; flex-direction: column; gap: 6px; }
.fk-source-row {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 10px;
  border: 1px solid var(--fk-border);
  border-radius: 5px;
  background: #1d1d21;
}
.fk-source-row > div { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.fk-source-row b { font-size: 11px; font-weight: 560; }
.fk-source-row span:not(.fk-source-dot):not(.fk-source-state) { color: var(--fk-dim); font-size: 9px; }
.fk-source-dot { width: 6px; height: 6px; flex: 0 0 6px; border-radius: 50%; background: var(--fk-warning); }
.fk-source-dot.ready { background: #35b37e; }
.fk-source-dot.pending { background: var(--fk-muted); }
.fk-source-dot.pending { background: #f5b544; }
.fk-source-dot.running { background: #5aa7ff; }
.fk-source-state { flex: 0 0 auto; padding: 2px 5px; border-radius: 3px; background: var(--fk-hover); color: var(--fk-muted); font-size: 9px; }
.fk-source-state.ready { color: #62d3a6; }
.fk-source-state.need_key { color: #f5b544; }
.fk-source-state.pending { color: #f5b544; }
.fk-source-state.running { color: #7bb8ff; }

.dsr-basic-progress { display: flex; flex-direction: column; gap: 5px; }
.dsr-basic-track { height: 6px; border-radius: 999px; background: var(--fk-hover); overflow: hidden; }
.dsr-basic-fill { height: 100%; border-radius: inherit; background: #5aa7ff; transition: width .3s ease; }
.dsr-basic-progress span { color: var(--fk-dim); font-size: 10px; }

/* 墙面卡片内嵌榜单看法 */
.fk-card-view-body { flex: 1 1 auto; min-height: 0; padding: 2px 10px 10px; overflow: hidden; }
.fk-card-view-body .dsr-table-wrap { max-height: 224px; }
.fk-card-view-body .dsr-cards-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
.fk-card-view-body .dsr-stock-card { padding: 7px 9px; border-radius: 5px; }
.fk-card-view-body .dsr-stock-spark,
.fk-card-view-body .dsr-stock-tags { display: none; }
.fk-card-view-body .dsr-metrics { margin-top: 3px; gap: 2px 7px; font-size: 9px; flex-wrap: nowrap; overflow: hidden; }
.fk-card-view-body .dsr-metric:nth-child(n+3) { display: none; }
.fk-card-view-body .dsr-stock-card-head b { font-size: 11px; }
.fk-card-view-body .dsr-podium { padding: 12px 4px 2px; gap: 4px; }
.fk-card-view-body .dsr-podium-card { min-height: 74px; padding: 7px 6px; }
.fk-card-view-body .dsr-podium-card.podium-1 { min-height: 84px; }
.fk-card-view-body .dsr-podium-card b { font-size: 11px; }
.fk-card-view-body .dsr-bar-row { height: 21px; grid-template-columns: 18px 92px minmax(36px, 1fr) 48px; gap: 4px; }
.fk-card-view-body .dsr-bar-label .dsr-code { display: none; }
.fk-card-view-body .dsr-bar-value .dsr-pct { display: none; }
.fk-card-view-body .dsr-bars { gap: 3px; }
.fk-card-view-body .dsr-group-block { margin: 0 0 6px; }
.fk-card-view-body .dsr-groups { gap: 6px; }
.fk-card-view-body .dsr-group { border-radius: 5px; }
.fk-card-view-body .dsr-group-head { padding: 4px 8px; }
.fk-card-view-body .dsr-group-head h3 { font-size: 10px; }
.fk-card-view-body .dsr-group-row { grid-template-columns: 18px minmax(0,1fr) 54px 62px; gap: 4px; padding: 3px 8px; font-size: 10px; }
.fk-card-view-body .dsr-group-rows { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.fk-card-view-body .dsr-group-row { grid-template-columns: 16px minmax(0,1fr) 50px; }
.fk-card-view-body .dsr-group-row .dsr-bar-value { display: none; }
.fk-card-view-body .dsr-chip-wall { gap: 4px; padding: 2px 0 0; }
.fk-card-view-body .dsr-chip-stock { min-height: 96px; padding: 7px 8px; }
.fk-preview-table { border: none; border-radius: 0; background: transparent; max-height: 224px; }
.fk-preview-table .dsr-table { table-layout: fixed; }
.fk-preview-table .dsr-table th, .fk-preview-table .dsr-table td { padding: 0 5px; }
.fk-preview-table .dsr-table th:nth-child(2), .fk-preview-table .dsr-table td:nth-child(2) { width: auto; text-align: left; }
.fk-preview-table .dsr-table th:nth-child(3), .fk-preview-table .dsr-table td:nth-child(3) { width: 66px; }
.fk-preview-table .dsr-table th:nth-child(4), .fk-preview-table .dsr-table td:nth-child(4) { width: 78px; }
.fk-preview-table .dsr-table td { height: 26px; font-size: 10px; }
.fk-preview-table .dsr-table th { height: 26px; font-size: 9px; }
.fk-preview-name { display: inline-block; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--dsr-text); font-size: 11px; font-weight: 560; }
.fk-preview-table .fk-code { margin-left: 5px; color: var(--fk-dim); font-size: 9px; }
.dsr-panel .fk-editor-modal .dsr-swatch { width: 18px; height: 18px; border-radius: 50%; border-width: 2px; }
.dsr-panel .fk-editor-modal .dsr-swatch.on { box-shadow: 0 0 0 1px var(--fk-accent); border-color: #fff; }

/* 芯片墙 */
.dsr-chip-wall { display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap: 6px; }
.dsr-chip-stock {
  position: relative;
  min-height: 60px;
  padding: 8px 9px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 1px solid var(--fk-border);
  border-radius: 5px;
  background: #1d1d21;
  overflow: hidden;
}
.dsr-chip-stock::before { content: ""; position: absolute; inset: 0 auto 0 0; width: 3px; background: var(--fk-border-light); opacity: .9; }
.dsr-chip-stock.up::before { background: var(--fk-rise); }
.dsr-chip-stock.down::before { background: var(--fk-fall); }
.dsr-chip-rank { position: absolute; top: 5px; right: 7px; color: var(--fk-dim); font-size: 9px; font-variant-numeric: tabular-nums; }
.dsr-chip-stock b { max-width: calc(100% - 22px); overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-size: 11px; font-weight: 560; }
.dsr-chip-code { color: var(--fk-dim); font-size: 9px; }
.dsr-chip-stock .dsr-pct { margin-top: auto; font-size: 13px; font-weight: 600; }
.dsr-chip-badge { align-self: flex-start; margin-top: 2px; padding: 1px 4px; border-radius: 3px; background: var(--fk-hover); color: var(--fk-muted); font-size: 8px; }
.dsr-chip-value { color: var(--fk-muted); font-size: 9px; font-variant-numeric: tabular-nums; }

@media (max-width: 760px) {
  .fk-view-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .fk-editor-scroll { padding: 12px 12px 16px; }
  .fk-editor-head, .fk-editor-footer, .fk-editor-previewbar { padding-left: 12px; padding-right: 12px; }
  .fk-editor-shortcut { display: none; }
}
`
