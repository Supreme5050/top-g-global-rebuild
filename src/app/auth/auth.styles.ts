/** Stable auth class tokens used by the frozen Batch 3 auth screens.
 *  No CSS Modules dependency: the owning auth layout injects the scoped CSS.
 */
export const styles = {
  belowForm: 'tgg-auth-belowForm',
  brand: 'tgg-auth-brand',
  content: 'tgg-auth-content',
  emailDisplay: 'tgg-auth-emailDisplay',
  error: 'tgg-auth-error',
  eye: 'tgg-auth-eye',
  eyebrow: 'tgg-auth-eyebrow',
  field: 'tgg-auth-field',
  footer: 'tgg-auth-footer',
  form: 'tgg-auth-form',
  goldButton: 'tgg-auth-goldButton',
  hint: 'tgg-auth-hint',
  inlineLink: 'tgg-auth-inlineLink',
  input: 'tgg-auth-input',
  institution: 'tgg-auth-institution',
  intro: 'tgg-auth-intro',
  mailCircle: 'tgg-auth-mailCircle',
  main: 'tgg-auth-main',
  mutedCheckbox: 'tgg-auth-mutedCheckbox',
  notice: 'tgg-auth-notice',
  options: 'tgg-auth-options',
  outlineButton: 'tgg-auth-outlineButton',
  panel: 'tgg-auth-panel',
  passrow: 'tgg-auth-passrow',
  security: 'tgg-auth-security',
  subtitle: 'tgg-auth-subtitle',
  success: 'tgg-auth-success',
  verifyActions: 'tgg-auth-verifyActions',
  verifyBox: 'tgg-auth-verifyBox',
  viewport: 'tgg-auth-viewport',
} as const;

/** Static, trusted CSS; do not interpolate user data. */
export const authCss = String.raw`
/* Top G Global — frozen AUTH-01/02/03 layout styles.
   All selectors are namespaced. Rendered inline in auth/layout.tsx so styling
   remains reliable if CSS-module bundling or global CSS imports are missing.
   This is a Phase 3B implementation repair, not a redesign. */
html:has(.tgg-auth-viewport), body:has(.tgg-auth-viewport) { margin: 0; min-height: 100%; background: #050607; }
.tgg-auth-viewport, .tgg-auth-viewport *, .tgg-auth-viewport *::before, .tgg-auth-viewport *::after { box-sizing: border-box; }
.tgg-auth-viewport button, .tgg-auth-viewport input { font-family: inherit; }
.tgg-auth-viewport a { cursor: pointer; }
.tgg-auth-viewport {
  --auth-gold: #dfa72e;
  --auth-ink: #202124;
  --auth-muted: #5e636b;
  --auth-card: #f7f5f1;
  min-height: 100vh;
  background: #050607;
  color: #f7f7f7;
  display: flex;
  flex-direction: column;
  padding: 42px 4.2% 20px;
  font-family: Arial, Helvetica, sans-serif;
}
.tgg-auth-content {
  display: grid;
  grid-template-columns: minmax(320px, 1fr) minmax(400px, 620px);
  gap: clamp(32px, 6vw, 95px);
  align-items: start;
  flex: 1;
  max-width: 1320px;
  width: 100%;
  margin: 0 auto;
}
.tgg-auth-institution { padding: 0 0 30px 8px; }
.tgg-auth-brand { display: inline-flex; align-items: flex-start; width: 161px; height: 85px; }
.tgg-auth-brand img { object-fit: contain; width: 161px; height: 84px; }
.tgg-auth-intro { margin-top: 32px; max-width: 435px; }
.tgg-auth-eyebrow { margin: 0 0 16px; font-size: 14px; font-weight: 700; color: var(--auth-gold); letter-spacing: .065em; }
.tgg-auth-intro h1 { margin: 0 0 15px; font-size: clamp(22px, 2.1vw, 27px); line-height: 1.23; font-weight: 750; letter-spacing: .01em; }
.tgg-auth-intro > p:last-child { color: #a4a7ae; font-size: 16px; line-height: 1.45; margin: 0; }
.tgg-auth-main { min-width: 0; padding-top: 38px; }
.tgg-auth-panel { width: 100%; background: var(--auth-card); color: var(--auth-ink); padding: 40px 44px 30px; border-radius: 20px; }
.tgg-auth-panel h2 { margin: 0 0 10px; font-size: clamp(29px, 3vw, 36px); font-weight: 750; letter-spacing: .015em; line-height: 1.16; }
.tgg-auth-subtitle { color: var(--auth-muted); line-height: 1.5; font-size: 15px; margin: 0 0 42px; }
.tgg-auth-form { display: flex; flex-direction: column; gap: 24px; }
.tgg-auth-field { display: flex; flex-direction: column; gap: 9px; font-size: 13px; font-weight: 700; color: #4b5055; }
.tgg-auth-input { appearance: none; color: #292c31; border: 1px solid #c9cbd0; border-radius: 11px; background: #fff; padding: 15px 16px; min-height: 51px; font: inherit; font-size: 15px; font-weight: 400; outline: none; width: 100%; }
.tgg-auth-input:focus-visible { border-color: var(--auth-gold); box-shadow: 0 0 0 3px rgb(223 167 46 / .18); }
.tgg-auth-input::placeholder { color: #83878d; }
.tgg-auth-passrow { display: flex; align-items: center; border: 1px solid #c9cbd0; border-radius: 11px; background: white; }
.tgg-auth-passrow:focus-within { border-color: var(--auth-gold); box-shadow: 0 0 0 3px rgb(223 167 46 / .18); }
.tgg-auth-passrow .tgg-auth-input { border: 0; background: transparent; box-shadow: none; }
.tgg-auth-eye { cursor: pointer; flex: 0 0 48px; border: 0; background: transparent; color: #696f76; height: 45px; font-size: 15px; }
.tgg-auth-hint { font-size: 12px; font-weight: 400; color: #70757d; }
.tgg-auth-options { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; font-size: 13px; color: #535962; margin: 3px 0 2px; }
.tgg-auth-mutedCheckbox { display: flex; gap: 9px; align-items: center; }
.tgg-auth-mutedCheckbox input { accent-color: var(--auth-gold); width: 19px; height: 19px; }
.tgg-auth-mutedCheckbox:has(input:disabled) { opacity: .75; }
.tgg-auth-inlineLink { color: #c98b12; text-decoration: none; font-size: inherit; font-weight: 700; }
.tgg-auth-inlineLink:hover { text-decoration: underline; }
.tgg-auth-goldButton { background: var(--auth-gold); border: 1px solid var(--auth-gold); color: #0a0a0a; border-radius: 11px; min-height: 56px; padding: 13px 20px; font-size: 16px; font-weight: 750; cursor: pointer; width: 100%; }
.tgg-auth-goldButton:hover { background: #e9b344; }
.tgg-auth-goldButton:disabled, .tgg-auth-outlineButton:disabled { cursor: not-allowed; opacity: .6; }
.tgg-auth-outlineButton { background: white; color: #222; border: 1px solid #a7aaae; border-radius: 10px; min-height: 51px; padding: 12px 20px; font-size: 15px; font-weight: 700; cursor: pointer; }
.tgg-auth-belowForm { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin-top: 4px; font-size: 13px; color: #686c73; }
.tgg-auth-security { border: 1px solid #dad4ca; background: #f0ede7; border-radius: 11px; margin-top: 30px; padding: 18px 20px; font-size: 13px; color: #535a63; line-height: 1.5; }
.tgg-auth-security strong { color: #202124; display: block; margin-bottom: 5px; }
.tgg-auth-notice { border: 1px solid #e6b95a; border-radius: 11px; background: #fff9e9; color: #70511a; padding: 15px 17px; line-height: 1.35; font-size: 13px; }
.tgg-auth-notice strong { display: block; margin-bottom: 9px; }
.tgg-auth-error { border: 1px solid #b64e4e; background: #fff0f0; border-radius: 8px; padding: 12px 14px; color: #8e1717; font-size: 13px; line-height: 1.4; }
.tgg-auth-success { border: 1px solid #49b46d; border-radius: 9px; background: #eaf8ee; padding: 12px 14px; color: #176c33; font-size: 13px; line-height: 1.4; }
.tgg-auth-verifyBox { text-align: center; padding: 0 12px 16px; }
.tgg-auth-mailCircle { margin: 14px auto 26px; border: 3px solid var(--auth-gold); border-radius: 50%; width: 140px; height: 140px; display: grid; place-items: center; font-size: 35px; color: var(--auth-gold); }
.tgg-auth-verifyBox h3 { font-size: 24px; margin: 0 0 14px; }
.tgg-auth-verifyBox p { color: #636a71; font-size: 15px; line-height: 1.5; }
.tgg-auth-emailDisplay { word-break: break-word; font-weight: 700; color: #202124 !important; }
.tgg-auth-verifyActions { max-width: 340px; display: grid; gap: 19px; margin: 35px auto 0; }
.tgg-auth-footer { max-width: 1320px; width: 100%; margin: 60px auto 0; padding: 18px 5px 0; border-top: 1px solid #343638; display: flex; justify-content: space-between; gap: 18px; flex-wrap: wrap; color: #a3a5ab; font-size: 11px; }
@media (max-width: 840px) {
  .tgg-auth-viewport { padding: 22px 5% 20px; }
  .tgg-auth-content { grid-template-columns: minmax(0, 1fr); gap: 15px; max-width: 620px; }
  .tgg-auth-institution { padding: 0; }
  .tgg-auth-intro { margin-top: 14px; }
  .tgg-auth-main { padding-top: 0; }
  .tgg-auth-panel { padding: 30px 25px 28px; }
  .tgg-auth-footer { margin-top: 40px; }
}
@media (max-width: 480px) {
  .tgg-auth-panel { padding: 26px 20px; border-radius: 16px; }
  .tgg-auth-intro h1 { font-size: 21px; }
  .tgg-auth-form { gap: 19px; }
  .tgg-auth-mailCircle { width: 115px; height: 115px; }
}

`;
