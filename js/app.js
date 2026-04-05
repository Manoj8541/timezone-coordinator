/* ════════════════════════════════════════════
   APP — main controller
════════════════════════════════════════════ */

/* ── SVG ICON STRINGS ── */
const IC = {
    globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    warn: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>`,
    cal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    zap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    bar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    share: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`
};

/* ── TINY HELPERS ── */
function esc(str) {
    if (str == null) return '';
    const d = document.createElement('div');
    d.textContent = String(str);
    return d.innerHTML;
}

function avatar(initials, colorIndex, size = 'md') {
    return `<div class="avatar avatar--${size} av-${colorIndex % 8}">${esc(initials)}</div>`;
}

function $(id) { return document.getElementById(id); }

/* ── LIVE CLOCK ── */
let _clockTimer = null;

function startClock() {
    if (_clockTimer) clearInterval(_clockTimer);
    _clockTimer = setInterval(() => {
        document.querySelectorAll('[data-clock]').forEach(el => {
            try {
                el.textContent = new Date().toLocaleString('en-US', {
                    timeZone: el.dataset.clock,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                });
            } catch (_) { /* invalid tz — ignore */ }
        });
    }, 1000);
}

/* ── STAGGER OBSERVER ─── */
const _staggerObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
                _staggerObserver.unobserve(e.target);
            }
        });
    },
    { threshold: 0.08 }
);

function observeStagger(root = document) {
    root.querySelectorAll('.stagger-child:not(.is-visible)')
        .forEach(el => _staggerObserver.observe(el));
}

/* ── FORM VALIDATION ── */
function showFieldError(inputId, errId, msg) {
    const inp = $(inputId);
    const err = $(errId);
    if (inp) inp.classList.add('is-invalid');
    if (err) {
        err.innerHTML = `${IC.warn}<span>${esc(msg)}</span>`;
        err.style.display = 'flex';
    }
    if (inp) {
        inp.classList.add('shake-err');
        inp.addEventListener('animationend', () =>
            inp.classList.remove('shake-err'), { once: true });
    }
}

function clearFieldError(inputId, errId) {
    const inp = $(inputId);
    const err = $(errId);
    if (inp) inp.classList.remove('is-invalid');
    if (err) err.style.display = 'none';
}

function validateRequired(inputId, errId, label) {
    clearFieldError(inputId, errId);
    const el = $(inputId);
    const val = (el?.value || '').trim();
    if (!val) {
        showFieldError(inputId, errId, `${label} is required`);
        return false;
    }
    return true;
}

class TZSelect {
    constructor(wrapperId, hiddenInputId, timezones) {
        this.timezones = timezones;
        this.filtered = [...timezones];
        this.selectedValue = '';
        this.focusedIndex = -1;

        this.wrap = $(wrapperId);
        this.hidden = $(hiddenInputId);

        if (!this.wrap) return;

        this._build();
        this._bind();
    }

    _build() {
        this.wrap.innerHTML = `
            <div class="tz-select-wrap" id="tzSelectWrap">
                <input type="text"
                       class="tz-input"
                       id="tzSearchInput"
                       placeholder="Search timezone… e.g. Tokyo, India, UTC"
                       autocomplete="off"
                       spellcheck="false"
                       role="combobox"
                       aria-expanded="false"
                       aria-haspopup="listbox"
                       aria-autocomplete="list"/>
                <svg class="tz-chevron" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                </svg>
                <div class="tz-dropdown" id="tzDropdown" role="listbox"></div>
            </div>`;

        this.wrapEl = $('tzSelectWrap');
        this.input = $('tzSearchInput');
        this.dropdown = $('tzDropdown');

        this._renderList(this.timezones);
    }

    _renderList(list) {
        if (!this.dropdown) return;

        if (!list.length) {
            this.dropdown.innerHTML =
                `<div class="tz-no-results">No timezones found</div>`;
            return;
        }

        this.dropdown.innerHTML = list.map((tz, i) => `
            <div class="tz-option ${tz.value === this.selectedValue ? 'is-selected' : ''}"
                 data-value="${esc(tz.value)}"
                 data-index="${i}"
                 role="option"
                 aria-selected="${tz.value === this.selectedValue}">
                <span>${esc(tz.label)}</span>
                <span class="tz-option-offset">${esc(tz.offset)}</span>
            </div>`).join('');
    }

    _bind() {
        if (!this.input) return;

        this.input.addEventListener('click', () => this._open());
        this.input.addEventListener('input', () => {
            const q = this.input.value.toLowerCase().trim();
            this.filtered = q
                ? this.timezones.filter(tz =>
                    tz.label.toLowerCase().includes(q) ||
                    tz.value.toLowerCase().includes(q) ||
                    tz.offset.includes(q)
                )
                : [...this.timezones];
            this.focusedIndex = -1;
            this._renderList(this.filtered);
            this._open();
        });

        /* Keyboard navigation */
        this.input.addEventListener('keydown', e => {
            const opts = this.dropdown?.querySelectorAll('.tz-option') || [];
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.focusedIndex = Math.min(
                    this.focusedIndex + 1, opts.length - 1
                );
                this._highlightOption(opts);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
                this._highlightOption(opts);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (this.focusedIndex >= 0 && opts[this.focusedIndex]) {
                    this._select(opts[this.focusedIndex].dataset.value);
                }
            } else if (e.key === 'Escape') {
                this._close();
            }
        });

        /* Select on click */
        this.dropdown.addEventListener('click', e => {
            const opt = e.target.closest('.tz-option');
            if (opt) this._select(opt.dataset.value);
        });

        /* Close on outside click */
        document.addEventListener('click', e => {
            if (!this.wrapEl?.contains(e.target)) this._close();
        });
    }

    _highlightOption(opts) {
        opts.forEach((o, i) => {
            o.classList.toggle('is-focused', i === this.focusedIndex);
            if (i === this.focusedIndex) {
                o.scrollIntoView({ block: 'nearest' });
            }
        });
    }

    _open() {
        if (!this.wrapEl || !this.dropdown) return;
        this.wrapEl.classList.add('is-open');
        this.dropdown.classList.add('is-open');
        this.input?.setAttribute('aria-expanded', 'true');
    }

    _close() {
        if (!this.wrapEl || !this.dropdown) return;
        this.wrapEl.classList.remove('is-open');
        this.dropdown.classList.remove('is-open');
        this.input?.setAttribute('aria-expanded', 'false');
        this.focusedIndex = -1;
    }

    _select(value) {
        const tz = this.timezones.find(t => t.value === value);
        if (!tz) return;

        this.selectedValue = value;
        if (this.input) this.input.value = tz.label;
        if (this.hidden) this.hidden.value = value;

        clearFieldError('tzHiddenInput', 'errTimezone');

        this._close();
        this._renderList(this.timezones);
        this.hidden?.dispatchEvent(new Event('change', { bubbles: true }));
    }

    getValue() { return this.selectedValue; }

    reset() {
        this.selectedValue = '';
        this.filtered = [...this.timezones];
        if (this.input) this.input.value = '';
        if (this.hidden) this.hidden.value = '';
        this._renderList(this.timezones);
        this._close();
    }

    markInvalid() {
        this.input?.classList.add('is-invalid');
        this.input?.classList.add('shake-err');
        this.input?.addEventListener('animationend', () =>
            this.input.classList.remove('shake-err'), { once: true });
    }

    markValid() {
        this.input?.classList.remove('is-invalid');
    }
}

/* ════════════════════════════════════════════
   MAIN APP CLASS
════════════════════════════════════════════ */
class App {
    constructor() {
        this.teams = [];
        this.activeTeam = null;
        this.timezones = [];
        this.fairnessOn = false;
        this.lastSuggestions = [];
        this.pendingSlot = null;
        this.tzSelect = null;
        this._readOnlyTeam = null;
    }

    /* ════════════════════════════════════════
       BOOT
    ════════════════════════════════════════ */
    async boot() {
        /* 1. Theme */
        this._applyTheme(store.loadTheme());

        /* 2. Timezones */
        try {
            const r = await fetch('data/timezones.json');
            if (!r.ok) throw new Error('fetch failed');
            this.timezones = await r.json();
        } catch (_) {
            this.timezones = store.fallbackTimezones();
        }

        /* 3. Load saved data */
        const saved = store.load();
        if (saved?.teams) {
            this.teams = saved.teams.map(t => Team.fromJSON(t));
        }

        /* 4. Check URL for share param — READ ONLY, never import */
        const shared = store.loadFromURL();
        if (shared) {
            this._readOnlyTeam = Team.fromJSON(shared.teamData);
            history.replaceState({}, '', location.pathname);
            requestAnimationFrame(() => this._showReadOnlyPreview());
        }

        /* 5. Wire events */
        this._bindEvents();

        /* 6. Initial render */
        this._renderAll();
        this._updateHeroStats();
        startClock();
        observeStagger();
    }

    /* ── Theme ── */
    _applyTheme(t) {
        document.documentElement.setAttribute('data-theme', t);
        store.saveTheme(t);
    }

    _toggleTheme() {
        const cur = store.loadTheme();
        const next = cur === 'light' ? 'dark' : 'light';
        this._applyTheme(next);
    }

    /* ── Save ── */
    _save() {
        store.save({ teams: this.teams.map(t => t.toJSON()) });
        this._updateHeroStats();
    }

    /* ── Hero stats ── */
    _updateHeroStats() {
        const teams = this.teams.length;
        const members = this.teams.reduce((s, t) => s + t.getSize(), 0);
        const meetings = this.teams.reduce((s, t) => s + t.getMeetingCount(), 0);

        [
            ['statTeams', teams],
            ['statMembers', members],
            ['statMeetings', meetings]
        ].forEach(([id, val]) => {
            const el = $(id);
            if (!el) return;
            if (el.textContent !== String(val)) {
                el.textContent = val;
                el.classList.add('stat-bump');
                el.addEventListener('animationend', () =>
                    el.classList.remove('stat-bump'), { once: true });
            }
        });
    }

    /* ════════════════════════════════════════
       EVENT BINDING
    ════════════════════════════════════════ */
    _bindEvents() {
        /* Theme toggle */
        $('themeToggle')?.addEventListener('click', () => this._toggleTheme());

        $('heroCreateBtn')?.addEventListener('click', () => {
            $('appMain')?.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => this._openModal('CreateTeam'), 420);
        });

        /* Create team */
        $('btnCreateTeam')?.addEventListener('click', () =>
            this._openModal('CreateTeam'));
        $('btnConfirmCreateTeam')?.addEventListener('click', () =>
            this._createTeam());
        $('inputTeamName')?.addEventListener('keydown', e => {
            if (e.key === 'Enter') this._createTeam();
        });

        /* Add member */
        $('btnAddMember')?.addEventListener('click', () =>
            this._openAddMember());
        $('btnConfirmAddMember')?.addEventListener('click', () =>
            this._addMember());

        /* Avatar live preview */
        ['inputFirstName', 'inputLastName'].forEach(id => {
            $(id)?.addEventListener('input', () =>
                this._updateAvatarPreview());
        });

        /* Workspace actions */
        $('btnShareTeam')?.addEventListener('click', () => this._shareTeam());
        $('btnDeleteTeam')?.addEventListener('click', () => this._deleteTeam());

        $('btnAnalyze')?.addEventListener('click', () => this._analyze());

        /* Fairness toggle */
        $('fairnessToggle')?.addEventListener('change', e => {
            this.fairnessOn = e.target.checked;
            if (this.lastSuggestions.length) {
                this._renderSuggestions(this.lastSuggestions);
            }
        });

        /* Schedule meeting */
        $('btnScheduleMeeting')?.addEventListener('click', () =>
            this._scheduleMeeting());

        /* ICS download (inside meeting details modal) */
        document.addEventListener('click', e => {
            if (e.target.closest('#btnDownloadICS')) {
                this._downloadICS();
            }
        });

        document.querySelectorAll('.modal-close, [data-modal]').forEach(btn => {
            btn.addEventListener('click', e => {
                const id = e.currentTarget.dataset.modal;
                if (id) this._closeModal(id);
            });
        });

        [
            'overlayCreateTeam',
            'overlayAddMember',
            'overlayMeetingDetails',
            'overlayReadOnly'
        ].forEach(id => {
            $(id)?.addEventListener('click', () => {
                const modalId = id.replace('overlay', 'modal');
                this._closeModal(modalId);
            });
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.is-open').forEach(m =>
                    this._closeModal(m.id));
            }
        });
    }

    /* ── Modal helpers ── */
    _openModal(name) {
        $(`overlay${name}`)?.classList.add('is-open');
        $(`modal${name}`)?.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    _closeModal(modalId) {
        const name = modalId.replace('modal', '');
        $(`overlay${name}`)?.classList.remove('is-open');
        $(modalId)?.classList.remove('is-open');
        if (!document.querySelector('.modal.is-open')) {
            document.body.style.overflow = '';
        }
    }

    _showReadOnlyPreview() {
        const t = this._readOnlyTeam;
        if (!t) return;

        const body = $('readOnlyBody');
        if (!body) return;

        const stats = t.getFairnessStats();
        const fsClass = stats.score >= 70 ? 'chip--green'
            : stats.score >= 40 ? 'chip--yellow' : 'chip--red';

        /* Member rows */
        const memberRows = t.getMembers().map(m => `
            <div class="si-member-row">
                ${avatar(m.initials, m.colorIndex, 'sm')}
                <div class="si-m-info">
                    <div class="si-m-name">${esc(m.name)}</div>
                    <div class="si-m-time">
                        ${esc(m.role || m.timezone)}
                    </div>
                </div>
                <span class="chip" style="font-family:var(--mono);font-size:10px;">
                    ${esc(m.getTimezoneOffset())}
                </span>
            </div>`).join('');

        /* Meeting history rows */
        const meetingRows = t.getMeetings().slice(0, 5).map((mtg, i) => `
            <div class="tl-member-row" style="margin-bottom:4px;">
                <span style="font-family:var(--mono);font-size:11px;
                             color:var(--c-text-3);">
                    #${i + 1}
                </span>
                <span style="font-size:12px;font-weight:600;
                             color:var(--c-text-1);">
                    ${esc(mtg.utcTime)}
                </span>
                <span class="chip">Pain ${mtg.totalPain}</span>
            </div>`).join('') || `<p style="font-size:12px;color:var(--c-text-3);">
                No meetings recorded yet.</p>`;

        body.innerHTML = `
            <!-- Read-only banner -->
            <div class="readonly-banner">
                ${IC.eye}
                <div>
                    <strong>Read-only snapshot</strong> — this is a shared
                    view. You cannot edit this team. Only the sender's browser
                    has the live editable version.
                </div>
            </div>

            <!-- Multi-user notice (Issue #9) -->
            <div class="alert alert--info">
                ${IC.info}
                <div class="alert-body">
                    <span class="alert-title">How sharing works</span>
                    This app stores data locally in each person's browser.
                    There is no shared server. Each team member sees their
                    own copy of the app. Share links let you send a
                    point-in-time snapshot — not a live collaboration.
                </div>
            </div>

            <!-- Team summary -->
            <div style="display:flex;align-items:center;
                        justify-content:space-between;
                        flex-wrap:wrap;gap:8px;
                        padding:12px 0;
                        border-bottom:1px solid var(--c-border);">
                <div>
                    <div style="font-size:18px;font-weight:800;
                                color:var(--c-text-1);
                                letter-spacing:-0.02em;">
                        ${esc(t.name)}
                    </div>
                    <div style="font-size:12px;color:var(--c-text-3);
                                margin-top:2px;">
                        Shared snapshot —
                        ${new Date().toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        })}
                    </div>
                </div>
                <div style="display:flex;gap:6px;flex-wrap:wrap;">
                    <span class="chip">
                        ${t.getSize()} member${t.getSize() !== 1 ? 's' : ''}
                    </span>
                    <span class="chip chip--blue">
                        ${t.getMeetingCount()} meeting${t.getMeetingCount() !== 1 ? 's' : ''}
                    </span>
                    <span class="chip ${fsClass}">
                        Fair ${stats.score}%
                    </span>
                </div>
            </div>

            <!-- Members -->
            <div>
                <p style="font-size:11px;font-weight:700;
                           color:var(--c-text-3);
                           text-transform:uppercase;
                           letter-spacing:.08em;
                           margin-bottom:8px;">
                    Members
                </p>
                <div style="display:flex;flex-direction:column;gap:6px;">
                    ${memberRows}
                </div>
            </div>

            <!-- Meeting history -->
            <div>
                <p style="font-size:11px;font-weight:700;
                           color:var(--c-text-3);
                           text-transform:uppercase;
                           letter-spacing:.08em;
                           margin-bottom:8px;">
                    Recent meetings
                </p>
                ${meetingRows}
            </div>`;

        this._openModal('ReadOnly');
    }

    /* ════════════════════════════════════════
       CREATE TEAM
    ════════════════════════════════════════ */
    _createTeam() {
        const ok = validateRequired('inputTeamName', 'errTeamName', 'Team name');
        if (!ok) return;

        const name = $('inputTeamName').value.trim();
        $('inputTeamName').value = '';
        clearFieldError('inputTeamName', 'errTeamName');

        const team = new Team({ name });
        this.teams.push(team);
        this.activeTeam = team;

        this._save();
        this._closeModal('modalCreateTeam');
        this._renderAll();
        this.toast('success', 'Team created', `"${name}" is ready`);
    }

    /* ════════════════════════════════════════
       ADD MEMBER MODAL
    ════════════════════════════════════════ */
    _openAddMember() {
        if (!this.activeTeam) {
            this.toast('warning', 'No team selected', 'Create or select a team first');
            return;
        }

        /* Reset text fields */
        ['inputFirstName', 'inputLastName', 'inputRole'].forEach(id => {
            const el = $(id);
            if (el) el.value = '';
        });

        ['errFirstName', 'errLastName', 'errTimezone'].forEach(id => {
            const el = $(id);
            if (el) el.style.display = 'none';
        });
        clearFieldError('inputFirstName', 'errFirstName');
        clearFieldError('inputLastName', 'errLastName');

        /* Build / reset searchable timezone widget */
        if (this.tzSelect) {
            this.tzSelect.reset();
        } else {
            this.tzSelect = new TZSelect(
                'tzSelectContainer',
                'tzHiddenInput',
                this.timezones
            );
        }

        /* Work hours */
        const makeOpts = def => Array.from({ length: 24 }, (_, i) => {
            const h = i === 0 ? 12 : i > 12 ? i - 12 : i;
            const ap = i < 12 ? 'AM' : 'PM';
            const lbl = `${h}:00 ${ap}`;
            return `<option value="${i}" ${i === def ? 'selected' : ''}>${lbl}</option>`;
        }).join('');

        const ws = $('inputWorkStart');
        const we = $('inputWorkEnd');
        if (ws) ws.innerHTML = makeOpts(9);
        if (we) we.innerHTML = makeOpts(17);

        this._updateAvatarPreview();
        this._openModal('AddMember');
    }

    _updateAvatarPreview() {
        const f = ($('inputFirstName')?.value || '').trim();
        const l = ($('inputLastName')?.value || '').trim();
        const initials = ((f[0] || '') + (l[0] || '')).toUpperCase() || '?';

        const txt = $('avatarPreviewInitials');
        const box = $('avatarPreviewBox');
        if (txt) txt.textContent = initials;

        const hash = [...(f + l).toLowerCase()]
            .reduce((a, c) => a + c.charCodeAt(0), 0);
        const ci = hash % 8;
        if (box) box.className = `avatar-preview av-${ci}`;
    }

    /* ════════════════════════════════════════
       ADD MEMBER 
    ════════════════════════════════════════ */
    _addMember() {
        const v1 = validateRequired('inputFirstName', 'errFirstName', 'First name');
        const v2 = validateRequired('inputLastName', 'errLastName', 'Last name');

        const tzVal = this.tzSelect?.getValue() || '';
        let v3 = true;
        if (!tzVal) {
            v3 = false;
            const err = $('errTimezone');
            if (err) {
                err.innerHTML = `${IC.warn}<span>Timezone is required</span>`;
                err.style.display = 'flex';
            }
            this.tzSelect?.markInvalid();
        } else {
            this.tzSelect?.markValid();
            const err = $('errTimezone');
            if (err) err.style.display = 'none';
        }

        if (!v1 || !v2 || !v3) return;

        const firstName = $('inputFirstName').value.trim();
        const lastName = $('inputLastName').value.trim();
        const timezone = tzVal;
        const role = ($('inputRole')?.value || '').trim();
        const workStart = parseInt($('inputWorkStart')?.value || '9');
        const workEnd = parseInt($('inputWorkEnd')?.value || '17');

        const member = new Member({
            firstName, lastName, timezone, role,
            workHours: { start: workStart, end: workEnd }
        });

        this.activeTeam.addMember(member);
        this._save();
        this._closeModal('modalAddMember');
        this._renderWorkspace();
        this.toast('success', 'Member added', `${member.name} joined the team`);
    }

    /* ════════════════════════════════════════
       SELECT / DELETE / SHARE TEAM
    ════════════════════════════════════════ */
    _selectTeam(id) {
        this.activeTeam = this.teams.find(t => t.id === id) || null;

        const res = $('results');
        if (res) res.style.display = 'none';

        this.lastSuggestions = [];
        this._renderAll();

        requestAnimationFrame(() => {
            $('workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    async _deleteTeam() {
        if (!this.activeTeam) return;
        const okDelete = await this._confirm(
            'Delete Team',
            `"${this.activeTeam.name}"`,
            'All members and meeting history will be permanently removed.',
            'Delete Team'
        );
        if (!okDelete) return;

        const name = this.activeTeam.name;
        this.teams = this.teams.filter(t => t.id !== this.activeTeam.id);
        this.activeTeam = null;

        worldMap.destroy();
        this._save();
        this._renderAll();

        const ws = $('workspace');
        const res = $('results');
        if (ws) ws.style.display = 'none';
        if (res) res.style.display = 'none';

        this.toast('info', 'Team deleted', `"${name}" has been removed`);
    }

    /* ── Share team  ── */
    _shareTeam() {
        if (!this.activeTeam) return;

        const url = store.generateShareURL(this.activeTeam.toJSON());
        if (!url) {
            this.toast('danger', 'Error', 'Could not generate share link');
            return;
        }

        navigator.clipboard.writeText(url)
            .then(() => {
                this.toast(
                    'success',
                    'Link copied!',
                    'Recipients see a read-only preview — they cannot edit your team.'
                );
            })
            .catch(() => {
                /* Fallback for browsers that block clipboard */
                prompt(
                    'Copy this read-only share link:\n' +
                    '(Recipients see a preview — no editing, no duplication)',
                    url
                );
            });
    }

    /* ════════════════════════════════════════
       ANALYZE
    ════════════════════════════════════════ */
    _analyze() {
        if (!this.activeTeam) return;

        const members = this.activeTeam.getMembers();
        if (members.length < 2) {
            this.toast('warning', 'Too few members',
                'Add at least 2 members to analyze meeting times');
            return;
        }

        let suggestions = painCalc.findBestTimes(members);

        if (this.fairnessOn && this.activeTeam.getMeetingCount() > 0) {
            suggestions = fairness.applyFairness(suggestions, this.activeTeam);
        }

        this.lastSuggestions = suggestions;

        this._renderSuggestions(suggestions);
        this._renderPainChart();
        this._renderTimeline();
        this._renderFairnessAlert();

        const res = $('results');
        if (res) {
            res.style.display = 'block';
            requestAnimationFrame(() => {
                res.scrollIntoView({ behavior: 'smooth', block: 'start' });
                observeStagger(res);
            });
        }
    }

    /* ════════════════════════════════════════
       MEETING DETAILS MODAL
    ════════════════════════════════════════ */
    _showMeetingDetails(utcHour) {
        const s = this.lastSuggestions.find(x => x.utcHour === utcHour);
        if (!s || s.blocked) return;

        this.pendingSlot = s;

        const impact = fairness.impactPreview(s, this.activeTeam);

        /* Member local time rows */
        const memberRows = s.memberTimes.map(mt => `
            <div class="si-member-row">
                ${avatar(mt.initials, mt.colorIndex, 'sm')}
                <div class="si-m-info">
                    <div class="si-m-name">${esc(mt.memberName)}</div>
                    <div class="si-m-time">
                        ${esc(mt.localTime)} — ${esc(mt.desc)}
                    </div>
                </div>
                <span class="chip ${painCalc.chipClass(mt.pain)}">
                    ${mt.pain >= 100 ? 'Blocked' : mt.pain}
                </span>
            </div>`).join('');

        /* Fairness impact rows */
        const impactRows = impact.projected.map(p => `
            <div class="tl-member-row">
                <div style="display:flex;align-items:center;gap:6px;">
                    ${avatar(p.initials, p.colorIndex, 'sm')}
                    <span style="font-size:12px;
                                 color:var(--c-text-1);">
                        ${esc(p.name)}
                    </span>
                </div>
                <span class="tl-pain">+${p.add}</span>
                <span class="tl-total">${p.before} → ${p.after}</span>
            </div>`).join('');

        const deltaColor = impact.delta >= 0
            ? 'var(--c-success)'
            : 'var(--c-danger)';
        const deltaSign = impact.delta >= 0 ? '+' : '';

        const body = $('meetingDetailsBody');
        if (body) {
            body.innerHTML = `
                <div class="alert alert--info" role="alert">
                    ${IC.clock}
                    <div class="alert-body">
                        <span class="alert-title">${esc(s.utcTime)}</span>
                        <span class="alert-text">
                            ${esc(s.rating)} — Total pain score: ${s.totalPain}
                        </span>
                    </div>
                </div>

                <div>
                    <p style="font-size:11px;font-weight:700;
                            color:var(--c-text-3);
                            text-transform:uppercase;
                            letter-spacing:.08em;
                            margin-bottom:8px;">
                        Local times for each member
                    </p>
                    <div style="display:flex;flex-direction:column;gap:6px;">
                        ${memberRows}
                    </div>
                </div>

                <div style="display:grid;
                            grid-template-columns:repeat(3,1fr);
                            gap:10px;">
                    <div class="mc-stat">
                        <span class="mc-stat-val">${s.totalPain}</span>
                        <span class="mc-stat-lbl">Total Pain</span>
                    </div>
                    <div class="mc-stat">
                        <span class="mc-stat-val">${s.avgPain}</span>
                        <span class="mc-stat-lbl">Avg Pain</span>
                    </div>
                    <div class="mc-stat">
                        <span class="mc-stat-val">${s.maxPain}</span>
                        <span class="mc-stat-lbl">Max Pain</span>
                    </div>
                </div>

                <div>
                    <p style="font-size:11px;font-weight:700;
                            color:var(--c-text-3);
                            text-transform:uppercase;
                            letter-spacing:.08em;
                            margin-bottom:8px;">
                        Fairness impact if scheduled
                    </p>
                    <div class="alert alert--info" role="alert"
                        style="margin-bottom:10px;">
                        ${IC.info}
                        <div class="alert-body">
                            <span class="alert-title">Fairness score change</span>
                            <span class="alert-text">
                                Before: <strong>${impact.currentScore}</strong> →
                                After: <strong style="color:${deltaColor};">
                                    ${impact.projectedScore}
                                    (${deltaSign}${impact.delta})
                                </strong>
                            </span>
                        </div>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:6px;">
                        ${impactRows}
                    </div>
                </div>

                <div class="ics-section">
                    <div class="ics-section-text">
                        <div class="ics-section-title">Add to your calendar</div>
                        <div class="ics-section-desc">
                            Download a .ics file and open it in Google Calendar,
                            Outlook, or Apple Calendar to send invites to your team.
                        </div>
                    </div>
                    <button class="btn btn--secondary btn--sm" id="btnDownloadICS">
                        ${IC.download}
                        Download .ics
                    </button>
                </div>`;
        }

        this._openModal('MeetingDetails');
    }

    /* ── ICS download ── */
    _downloadICS() {
        if (!this.pendingSlot || !this.activeTeam) return;

        const ics = store.generateICS(
            this.pendingSlot.utcHour,
            this.activeTeam.name,
            this.pendingSlot.memberTimes
        );

        const filename = `${this.activeTeam.name.replace(/\s+/g, '-')}-meeting.ics`;
        const ok = store.downloadICS(ics, filename);

        if (ok) {
            this.toast('success', 'Calendar file downloaded',
                'Open the .ics file to add it to your calendar app');
        } else {
            this.toast('danger', 'Download failed',
                'Try copying the time manually');
        }
    }

    /* ════════════════════════════════════════
       SCHEDULE MEETING 
    ════════════════════════════════════════ */
    _scheduleMeeting() {
        if (!this.pendingSlot || !this.activeTeam) return;
        const nowUTC = new Date();
        const todayUTCStr = `${nowUTC.getUTCFullYear()}-${nowUTC.getUTCMonth()}-${nowUTC.getUTCDate()}`;

        const alreadyToday = this.activeTeam.getMeetings().some(mtg => {
            const mtgD = new Date(mtg.scheduledAt);
            const mtgUTCStr = `${mtgD.getUTCFullYear()}-${mtgD.getUTCMonth()}-${mtgD.getUTCDate()}`;
            return mtg.utcHour === this.pendingSlot.utcHour &&
                mtgUTCStr === todayUTCStr;
        });

        if (alreadyToday) {
            this.toast(
                'warning',
                'Already scheduled today',
                `${this.pendingSlot.utcTime} was already scheduled today. ` +
                `Pick a different time or schedule again tomorrow.`
            );
            this._closeModal('modalMeetingDetails');
            this.pendingSlot = null;
            return;
        }

        /* ── Record the meeting ── */
        const scheduled = this.pendingSlot;
        this.activeTeam.addMeeting(scheduled);
        this._save();
        this._closeModal('modalMeetingDetails');

        /* ── Refresh workspace ── */
        this._renderWorkspace();

        /* ── Re-analyze with updated pain scores ── */
        let suggestions = painCalc.findBestTimes(this.activeTeam.getMembers());
        if (this.fairnessOn && this.activeTeam.getMeetingCount() > 0) {
            suggestions = fairness.applyFairness(suggestions, this.activeTeam);
        }
        this.lastSuggestions = suggestions;
        this._renderSuggestions(suggestions);
        this._renderPainChart();
        this._renderTimeline();
        this._renderFairnessAlert();

        /* ── Show post-schedule action panel ── */
        this._showPostSchedulePanel(scheduled);

        this.pendingSlot = null;
    }

    _showPostSchedulePanel(slot) {
        /* Remove any existing panel */
        document.getElementById('postSchedulePanel')?.remove();

        const panel = document.createElement('div');
        panel.id = 'postSchedulePanel';
        panel.className = 'app-section';
        panel.innerHTML = `
            <div class="post-schedule-panel">
                <div class="psp-icon">
                    <svg viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5"
                        stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                </div>
                <div class="psp-body">
                    <div class="psp-title">
                        Meeting scheduled —
                        ${esc(slot.utcTime)}
                    </div>
                    <div class="psp-desc">
                        Pain scores updated for all members.
                        Add this to your calendar so your team
                        gets a reminder. Open the .ics file in
                        Google Calendar, Outlook, or Apple Calendar
                        to send invites automatically.
                    </div>
                </div>
                <div class="psp-actions">
                    <button class="btn btn--secondary btn--sm"
                            id="pspDownloadICS">
                        <svg viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Add to Calendar (.ics)
                    </button>
                    <button class="btn btn--ghost btn--sm"
                            id="pspDismiss">
                        Dismiss
                    </button>
                </div>
            </div>`;

        /* Wire buttons */
        panel.querySelector('#pspDownloadICS').addEventListener('click', () => {
            const ics = store.generateICS(
                slot.utcHour,
                this.activeTeam.name,
                slot.memberTimes
            );
            const fname =
                `${this.activeTeam.name.replace(/\s+/g, '-')}-meeting.ics`;
            store.downloadICS(ics, fname);
            this.toast(
                'success',
                'Calendar file downloaded',
                'Open the .ics file → your calendar app will let you ' +
                'invite your team from there.'
            );
        });

        panel.querySelector('#pspDismiss').addEventListener('click', () => {
            panel.style.opacity = '0';
            panel.style.transition = 'opacity 0.3s';
            setTimeout(() => panel.remove(), 300);
        });

        const results = $('results');
        if (results) {
            results.parentNode.insertBefore(panel, results);
        }
    }

    _renderSuggestions(suggestions) {
        const el = $('suggestionsList');
        if (!el) return;

        let list = [...suggestions];
        if (this.fairnessOn && this.activeTeam.getMeetingCount() > 0) {
            list = fairness.applyFairness(list, this.activeTeam);
        }

        const top = list.slice(0, 10);
        const nowUTC2 = new Date();
        const todayUTCStr2 = `${nowUTC2.getUTCFullYear()}-${nowUTC2.getUTCMonth()}-${nowUTC2.getUTCDate()}`;
        const scheduledTodayHours = new Set(
            this.activeTeam.getMeetings()
                .filter(m => {
                    const d = new Date(m.scheduledAt);
                    return `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}` === todayUTCStr2;
                })
                .map(m => m.utcHour)
        );

        el.innerHTML = `
            <div class="suggestion-list">
                ${top.map((s, i) => {
            const isBest = i === 0 && !s.blocked;
            const isBlocked = s.blocked;
            const isScheduled = scheduledTodayHours.has(s.utcHour);
            const delay = Math.min(i * 40, 400);

            const memberRows = s.memberTimes.map(mt => `
                        <div class="si-member-row">
                            ${avatar(mt.initials, mt.colorIndex, 'sm')}
                            <div class="si-m-info">
                                <div class="si-m-name">
                                    ${esc(mt.memberName)}
                                </div>
                                <div class="si-m-time">
                                    ${esc(mt.localTime)}
                                </div>
                            </div>
                            <span class="chip ${painCalc.chipClass(mt.pain)}">
                                ${mt.pain >= 100 ? 'Sleep' : mt.pain}
                            </span>
                        </div>`).join('');

            const fairPill = (s.fairnessScore != null)
                ? `<span class="chip chip--blue">
                            Fair +${s.fairnessScore}
                        </span>`
                : '';

            const scheduledBadge = isScheduled
                ? `<span class="si-scheduled-badge">
                            <svg viewBox="0 0 24 24"><polyline
                                points="20 6 9 17 4 12"/></svg>
                            Scheduled today
                        </span>`
                : '';

            const clickAttr =
                (isBlocked || isScheduled) ? '' :
                    `onclick="app._showMeetingDetails(${s.utcHour})"
                        tabindex="0"
                        role="button"
                        onkeydown="if(event.key==='Enter')
                            app._showMeetingDetails(${s.utcHour})"`;

            return `
                    <div class="suggestion-item stagger-child d-${delay}
                            ${isBest ? 'is-best' : ''}
                            ${isBlocked ? 'is-blocked' : ''}
                            ${isScheduled ? 'is-scheduled' : ''}"
                        ${clickAttr}>
                        <div class="si-top">
                            <div class="si-rank">${i + 1}</div>
                            <span class="si-time">${esc(s.utcTime)}</span>
                            <div class="si-chips">
                                <span class="chip">Total ${s.totalPain}</span>
                                <span class="chip">Avg ${s.avgPain}</span>
                                <span class="chip ${s.chipClass}">
                                    ${esc(s.rating)}
                                </span>
                                ${fairPill}
                                ${scheduledBadge}
                            </div>
                        </div>
                        <div class="si-members">${memberRows}</div>
                    </div>`;
        }).join('')}
            </div>`;

        requestAnimationFrame(() => observeStagger(el));
    }

    /* ════════════════════════════════════════
       REMOVE MEMBER
    ════════════════════════════════════════ */
    async _removeMember(id) {
        if (!this.activeTeam) return;
        const m = this.activeTeam.getMember(id);
        const okRemove = await this._confirm(
            'Remove Member',
            `"${m?.name || 'this member'}"`,
            'Their pain history will also be removed from this team.',
            'Remove'
        );
        if (!okRemove) return;

        this.activeTeam.removeMember(id);
        this._save();
        worldMap.destroy();
        this._renderWorkspace();
        const res = $('results');
        if (res) res.style.display = 'none';
        this.lastSuggestions = [];

        this.toast('info', 'Member removed', `${m?.name || 'Member'} removed`);
    }

    /* ════════════════════════════════════════
       RENDER — ALL
    ════════════════════════════════════════ */
    _renderAll() {
        this._renderTeamList();

        if (this.activeTeam) {
            const ws = $('workspace');
            if (ws) {
                ws.style.display = 'block';
                ws.classList.remove('workspace-reveal');
                void ws.offsetWidth;
                ws.classList.add('workspace-reveal');
            }
            this._renderWorkspace();
        } else {
            const ws = $('workspace');
            if (ws) ws.style.display = 'none';
        }
        requestAnimationFrame(() => observeStagger());
    }

    /* ── Team list ── */
    _renderTeamList() {
        const el = $('teamsList');
        if (!el) return;

        if (!this.teams.length) {
            el.innerHTML = `
                <div class="empty">
                    <div class="empty-icon">${IC.globe}</div>
                    <p class="empty-title">No teams yet</p>
                    <p class="empty-desc">
                        Create your first team to start scheduling
                        fair meetings across time zones.
                    </p>
                </div>`;
            return;
        }

        el.innerHTML = `
            <div class="teams-grid">
                ${this.teams.map((team, i) => {
            const stats = team.getFairnessStats();
            const isActive = this.activeTeam?.id === team.id;
            const fsClass = stats.score >= 70 ? 'chip--green'
                : stats.score >= 40 ? 'chip--yellow'
                    : 'chip--red';
            const delay = Math.min(i * 50, 450);

            return `
                    <div class="team-card stagger-child d-${delay}
                               ${isActive ? 'is-active' : ''}"
                         onclick="app._selectTeam(${team.id})"
                         role="button" tabindex="0"
                         onkeydown="if(event.key==='Enter')app._selectTeam(${team.id})">
                        <div class="tc-top">
                            <div class="tc-icon">${IC.users}</div>
                            <div>
                                <div class="tc-name">${esc(team.name)}</div>
                                <div class="tc-chips">
                                    <span class="chip">
                                        ${team.getSize()}
                                        member${team.getSize() !== 1 ? 's' : ''}
                                    </span>
                                    <span class="chip chip--blue">
                                        ${team.getMeetingCount()}
                                        meeting${team.getMeetingCount() !== 1 ? 's' : ''}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="tc-footer">
                            <span class="tc-date">
                                ${IC.cal}
                                ${new Date(team.createdAt).toLocaleDateString('en-US',
                { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span class="chip ${fsClass}">
                                Fair ${stats.score}%
                            </span>
                        </div>
                    </div>`;
        }).join('')}
            </div>`;

        requestAnimationFrame(() => observeStagger(el));
    }

    /* ── Workspace ── */
    _renderWorkspace() {
        if (!this.activeTeam) return;
        this._renderWorkspaceHeader();
        this._renderMembers();
        this._renderWorldMap();
    }

    _renderWorkspaceHeader() {
        const t = this.activeTeam;
        const stats = t.getFairnessStats();

        const nameEl = $('wsTeamName');
        const memEl = $('wsMemberCount');
        const mtgEl = $('wsMeetingCount');
        const fsEl = $('wsFairnessScore');

        if (nameEl) nameEl.textContent = t.name;
        if (memEl) memEl.textContent =
            `${t.getSize()} member${t.getSize() !== 1 ? 's' : ''}`;
        if (mtgEl) mtgEl.textContent =
            `${t.getMeetingCount()} meeting${t.getMeetingCount() !== 1 ? 's' : ''}`;

        if (fsEl) {
            const cls = stats.score >= 70 ? 'chip--green'
                : stats.score >= 40 ? 'chip--yellow' : 'chip--red';
            fsEl.textContent = `Fair ${stats.score}%`;
            fsEl.className = `chip ${cls}`;
        }
    }

    /* ── Members ── */
    _renderMembers() {
        const el = $('membersList');
        const mapSec = $('mapSection');
        if (!el) return;

        const members = this.activeTeam.getMembers();

        if (!members.length) {
            el.innerHTML = `
                <div class="empty">
                    <div class="empty-icon">${IC.users}</div>
                    <p class="empty-title">No members yet</p>
                    <p class="empty-desc">
                        Add team members with their timezones to start
                        analyzing fair meeting times.
                    </p>
                </div>`;
            if (mapSec) mapSec.style.display = 'none';
            return;
        }

        el.innerHTML = `
            <div class="members-grid">
                ${members.map((m, i) => {
            const delay = Math.min(i * 50, 400);
            return `
                    <div class="member-card stagger-child d-${delay}">
                        <div class="mc-top">
                            ${avatar(m.initials, m.colorIndex, 'md')}
                            <div class="mc-info">
                                <div class="mc-name">${esc(m.name)}</div>
                                ${m.role
                    ? `<div class="mc-role">${esc(m.role)}</div>`
                    : ''}
                            </div>
                            <div class="mc-actions">
                                <button class="btn btn--danger-ghost btn--icon"
                                        onclick="app._removeMember(${m.id})"
                                        title="Remove ${esc(m.name)}"
                                        aria-label="Remove ${esc(m.name)}">
                                    ${IC.trash}
                                </button>
                            </div>
                        </div>

                        <!-- Live clock -->
                        <div class="mc-clock">
                            <svg class="mc-clock-icon" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor"
                                 stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            <span class="mc-clock-time"
                                  data-clock="${esc(m.timezone)}">
                                ${m.getCurrentLocalTime()}
                            </span>
                            <span class="mc-clock-tz">
                                ${esc(m.getTimezoneOffset())}
                            </span>
                        </div>

                        <!-- Stats -->
                        <div class="mc-stats">
                            <div class="mc-stat">
                                <span class="mc-stat-val">
                                    ${m.cumulativePain}
                                </span>
                                <span class="mc-stat-lbl">Total Pain</span>
                            </div>
                            <div class="mc-stat">
                                <span class="mc-stat-val">
                                    ${m.getAveragePain()}
                                </span>
                                <span class="mc-stat-lbl">Avg / Mtg</span>
                            </div>
                        </div>
                    </div>`;
        }).join('')}
            </div>`;

        startClock();
        if (mapSec) mapSec.style.display = 'block';
        requestAnimationFrame(() => observeStagger(el));
    }

    /* ── World map ── */
    _renderWorldMap() {
        worldMap.render(
            this.activeTeam?.getMembers() || [],
            'worldMap'
        );
    }

    /* ════════════════════════════════════════
       SUGGESTIONS  
    ════════════════════════════════════════ */
    _renderSuggestions(suggestions) {
        const el = $('suggestionsList');
        if (!el) return;

        let list = [...suggestions];
        if (this.fairnessOn && this.activeTeam.getMeetingCount() > 0) {
            list = fairness.applyFairness(list, this.activeTeam);
        }

        const top = list.slice(0, 10);

        el.innerHTML = `
            <div class="suggestion-list">
                ${top.map((s, i) => {
            const isBest = i === 0 && !s.blocked;
            const isBlocked = s.blocked;
            const delay = Math.min(i * 40, 400);

            const memberRows = s.memberTimes.map(mt => `
                        <div class="si-member-row">
                            ${avatar(mt.initials, mt.colorIndex, 'sm')}
                            <div class="si-m-info">
                                <div class="si-m-name">${esc(mt.memberName)}</div>
                                <div class="si-m-time">${esc(mt.localTime)}</div>
                            </div>
                            <span class="chip ${painCalc.chipClass(mt.pain)}">
                                ${mt.pain >= 100 ? 'Sleep' : mt.pain}
                            </span>
                        </div>`).join('');

            const fairPill = (s.fairnessScore != null)
                ? `<span class="chip chip--blue">
                               Fair +${s.fairnessScore}
                           </span>`
                : '';

            const clickAttr = isBlocked ? '' :
                `onclick="app._showMeetingDetails(${s.utcHour})"
                         tabindex="0"
                         role="button"
                         onkeydown="if(event.key==='Enter')
                             app._showMeetingDetails(${s.utcHour})"`;

            return `
                    <div class="suggestion-item stagger-child d-${delay}
                               ${isBest ? 'is-best' : ''}
                               ${isBlocked ? 'is-blocked' : ''}"
                         ${clickAttr}>
                        <div class="si-top">
                            <div class="si-rank">${i + 1}</div>
                            <span class="si-time">${esc(s.utcTime)}</span>
                            <div class="si-chips">
                                <span class="chip">Total ${s.totalPain}</span>
                                <span class="chip">Avg ${s.avgPain}</span>
                                <span class="chip ${s.chipClass}">
                                    ${esc(s.rating)}
                                </span>
                                ${fairPill}
                            </div>
                        </div>
                        <div class="si-members">${memberRows}</div>
                    </div>`;
        }).join('')}
            </div>`;

        requestAnimationFrame(() => observeStagger(el));
    }

    /* ── Pain chart ── */
    _renderPainChart() {
        const el = $('painChart');
        if (!el) return;

        const data = fairness.painChartData(this.activeTeam);
        const max = Math.max(...data.map(d => d.cumulativePain), 1);

        if (data.every(d => d.cumulativePain === 0)) {
            el.innerHTML = `
                <div class="alert alert--info">
                    ${IC.info}
                    <div class="alert-body">
                        <span class="alert-title">No history yet</span>
                        Schedule your first meeting to see pain distribution.
                    </div>
                </div>`;
            return;
        }

        el.innerHTML = `
            <div class="pain-bars">
                ${data.map(d => {
            const pct = Math.round((d.cumulativePain / max) * 100);
            const level = pct > 70 ? 'pb-high'
                : pct < 30 ? 'pb-low' : '';
            return `
                    <div class="pb-row">
                        <div class="pb-label">
                            ${avatar(d.initials, d.colorIndex, 'sm')}
                            <span class="pb-name">${esc(d.name)}</span>
                        </div>
                        <div class="pb-track">
                            <div class="pb-fill ${level} animate"
                                 style="width:${pct}%">
                            </div>
                        </div>
                        <span class="pb-val">
                            ${d.cumulativePain}
                            <span style="font-size:10px;
                                         color:var(--c-text-3);">
                                /${d.meetingCount}mtg
                            </span>
                        </span>
                    </div>`;
        }).join('')}
            </div>`;
    }

    /* ── Meeting timeline ── */
    _renderTimeline() {
        const el = $('meetingHistory');
        if (!el) return;

        const data = fairness.timelineData(this.activeTeam);

        if (!data.length) {
            el.innerHTML = `
                <div class="alert alert--info">
                    ${IC.info}
                    <div class="alert-body">
                        <span class="alert-title">
                            No meetings scheduled yet
                        </span>
                        Click a suggestion above and press
                        "Schedule This Meeting" to record it here.
                    </div>
                </div>`;
            return;
        }

        el.innerHTML = `
            <div class="timeline">
                ${data.map(pt => `
                    <div class="tl-item">
                        <div class="tl-dot"></div>
                        <div class="tl-box">
                            <div class="tl-head">
                                <span class="tl-num">
                                    Meeting ${pt.num}
                                </span>
                                <span class="tl-meta">${esc(pt.date)}</span>
                                <span class="tl-meta">${esc(pt.utcTime)}</span>
                                <span class="chip">Pain ${pt.totalPain}</span>
                            </div>
                            <div class="tl-members">
                                ${pt.memberRows.map(mr => `
                                    <div class="tl-member-row">
                                        <div style="display:flex;
                                                    align-items:center;
                                                    gap:6px;">
                                            ${avatar(mr.initials, mr.colorIndex, 'sm')}
                                            <span style="font-size:12px;
                                                         color:var(--c-text-1);">
                                                ${esc(mr.name)}
                                            </span>
                                            <span class="tl-total">
                                                (${esc(mr.localTime)})
                                            </span>
                                        </div>
                                        <span class="tl-pain">
                                            +${mr.pain}
                                        </span>
                                    </div>`).join('')}
                            </div>
                        </div>
                    </div>`).join('')}
            </div>`;
    }

    /* ── Fairness alert  ── */
    _renderFairnessAlert() {
        const el = $('fairnessAlert');
        if (!el) return;

        const rec = fairness.recommendation(this.activeTeam);

        const clsMap = {
            success: 'alert--success',
            warning: 'alert--warning',
            danger: 'alert--danger',
            info: 'alert--info'
        };

        const iconMap = {
            success: IC.check,
            warning: IC.warn,
            danger: IC.warn,
            info: IC.info
        };

        const cls = clsMap[rec.type] || 'alert--info';
        const icon = iconMap[rec.type] || IC.info;

        el.innerHTML = `
            <div class="alert ${cls}"
                role="alert"
                aria-live="polite">
                ${icon}
                <div class="alert-body">
                    <span class="alert-title">
                        ${rec.type === 'success' ? 'Good balance'
                : rec.type === 'warning' ? 'Fairness warning'
                    : rec.type === 'danger' ? 'Unfair distribution'
                        : 'Fairness info'}
                    </span>
                    <span class="alert-text">
                        ${esc(rec.text)}
                    </span>
                </div>
            </div>`;
    }

    /* ════════════════════════════════════════
       TOAST
    ════════════════════════════════════════ */
    toast(type, title, msg, dur = 5000) {
        const portal = $('toastPortal');
        if (!portal) return;

        const iconMap = {
            success: IC.check,
            warning: IC.warn,
            danger: IC.x,
            info: IC.info
        };

        const t = document.createElement('div');
        t.className = `toast toast--${type}`;
        t.style.setProperty('--toast-dur', `${dur}ms`);
        t.innerHTML = `
            <div class="toast-icon">${iconMap[type] || IC.info}</div>
            <div class="toast-body">
                <div class="toast-title">${esc(title)}</div>
                <div class="toast-msg">${esc(msg)}</div>
            </div>
            <button class="toast-dismiss" aria-label="Dismiss">
                ${IC.x}
            </button>`;

        const dismiss = () => {
            t.classList.add('is-leaving');
            t.addEventListener('animationend', () => t.remove(), { once: true });
        };

        t.querySelector('.toast-dismiss')
            .addEventListener('click', dismiss);

        portal.appendChild(t);
        if (dur > 0) setTimeout(dismiss, dur);
    }
    _confirm(title, subtitle, alertText, okLabel = 'Delete') {
        return new Promise(resolve => {
            const titleEl = $('modalConfirmTitle');
            const subtitleEl = $('modalConfirmSubtitle');
            const alertTitleEl = $('modalConfirmAlertTitle');
            const alertTextEl = $('modalConfirmAlertText');
            const okBtn = $('modalConfirmOK');
            const cancelBtn = $('modalConfirmCancel');

            if (titleEl) titleEl.textContent = title;
            if (subtitleEl) subtitleEl.textContent = subtitle;
            if (alertTitleEl) alertTitleEl.textContent = 'Are you sure?';
            if (alertTextEl) alertTextEl.textContent = alertText;
            if (okBtn) okBtn.textContent = okLabel;

            this._openModal('Confirm');
            const onOK = () => {
                cleanup();
                resolve(true);
            };
            const onCancel = () => {
                cleanup();
                resolve(false);
            };
            const cleanup = () => {
                this._closeModal('modalConfirm');
                okBtn?.removeEventListener('click', onOK);
                cancelBtn?.removeEventListener('click', onCancel);
            };

            okBtn?.addEventListener('click', onOK);
            cancelBtn?.addEventListener('click', onCancel);
        });
    }
}

/* ════════════════════════════════════════════
   BOOT
════════════════════════════════════════════ */
const app = new App();
document.addEventListener('DOMContentLoaded', () => app.boot());