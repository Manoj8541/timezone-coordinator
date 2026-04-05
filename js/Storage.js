/* ════════════════════════════════════════════
   STORAGE — localStorage wrapper
════════════════════════════════════════════ */
class Storage {
    constructor() {
        this.KEY = 'tz_coord_v1';
        this.THEME_KEY = 'tz_coord_theme';
    }

    /* ── Persist ── */
    save(data) {
        try {
            localStorage.setItem(this.KEY, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('[Storage] save failed:', e);
            return false;
        }
    }

    load() {
        try {
            const raw = localStorage.getItem(this.KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            console.error('[Storage] load failed:', e);
            return null;
        }
    }

    clear() {
        try {
            localStorage.removeItem(this.KEY);
            return true;
        } catch (_) { return false; }
    }

    /* ── Theme ── */
    saveTheme(t) {
        try { localStorage.setItem(this.THEME_KEY, t); } catch (_) { }
    }

    loadTheme() {
        try {
            return localStorage.getItem(this.THEME_KEY) || 'light';
        } catch (_) { return 'light'; }
    }

    /* ── Share URL ──────────────────────────
       Encodes team snapshot as URL-safe base64.
       The ?share= param is ALWAYS read-only.
       No auto-import. No duplication.
    ─────────────────────────────────────── */
    generateShareURL(teamData) {
        try {
            const payload = {
                v: 1,
                ro: true,          /* read-only flag */
                data: teamData
            };
            const json = JSON.stringify(payload);
            const b64 = btoa(unescape(encodeURIComponent(json)));
            const safe = b64
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
            return `${location.origin}${location.pathname}?share=${safe}`;
        } catch (e) {
            console.error('[Storage] generateShareURL failed:', e);
            return null;
        }
    }

    /* ── Load from URL ─── */
    loadFromURL() {
        try {
            const param = new URLSearchParams(location.search).get('share');
            if (!param) return null;

            const b64 = param.replace(/-/g, '+').replace(/_/g, '/');
            const pad = b64 + '==='.slice(0, (4 - b64.length % 4) % 4);
            const json = decodeURIComponent(escape(atob(pad)));
            const obj = JSON.parse(json);

            /* Support both old bare format and new {v,ro,data} format */
            if (obj && obj.v === 1 && obj.data) {
                return { teamData: obj.data, readOnly: true };
            }

            /* Legacy: old share links were bare team objects */
            if (obj && obj.name && obj.members) {
                return { teamData: obj, readOnly: true };
            }

            return null;
        } catch (e) {
            console.error('[Storage] loadFromURL failed:', e);
            return null;
        }
    }

    /* ── ICS Calendar file generator ────────
       Generates a .ics string for download.
       utcHour : 0-23
       teamName: string
       memberTimes: [{memberName, localTime, timezone}]
    ─────────────────────────────────────── */
    generateICS(utcHour, teamName, memberTimes = []) {
        const now = new Date();
        const meetDate = new Date(now);

        /* Set meeting to the next occurrence of this UTC hour */
        meetDate.setUTCHours(utcHour, 0, 0, 0);
        if (meetDate <= now) {
            meetDate.setUTCDate(meetDate.getUTCDate() + 1);
        }

        const endDate = new Date(meetDate.getTime() + 60 * 60 * 1000); /* +1 hour */

        const fmt = d => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

        const uid = `tzcoord-${Date.now()}@timezonecoordinator`;
        const stamp = fmt(now);
        const start = fmt(meetDate);
        const end = fmt(endDate);

        const desc = memberTimes
            .map(mt => `${mt.memberName}: ${mt.localTime}`)
            .join('\\n');

        const lines = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//TimezoneCoordinator//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:REQUEST',
            'BEGIN:VEVENT',
            `UID:${uid}`,
            `DTSTAMP:${stamp}`,
            `DTSTART:${start}`,
            `DTEND:${end}`,
            `SUMMARY:${teamName} Meeting`,
            `DESCRIPTION:Local times:\\n${desc}`,
            'STATUS:CONFIRMED',
            'END:VEVENT',
            'END:VCALENDAR'
        ];

        return lines.join('\r\n');
    }

    downloadICS(ics, filename = 'meeting.ics') {
        try {
            const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            return true;
        } catch (e) {
            console.error('[Storage] downloadICS failed:', e);
            return false;
        }
    }

    /* ── Fallback timezones ── */
    fallbackTimezones() {
        return [
            { value: 'UTC', label: 'UTC — Coordinated Universal Time', offset: '+0:00' },
            { value: 'America/New_York', label: 'New York (EST/EDT)', offset: '-5:00' },
            { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)', offset: '-8:00' },
            { value: 'Europe/London', label: 'London (GMT/BST)', offset: '+0:00' },
            { value: 'Europe/Paris', label: 'Paris (CET/CEST)', offset: '+1:00' },
            { value: 'Asia/Kolkata', label: 'Mumbai / Kolkata (IST) UTC+5:30', offset: '+5:30' },
            { value: 'Asia/Tokyo', label: 'Tokyo (JST)', offset: '+9:00' },
            { value: 'Asia/Singapore', label: 'Singapore (SGT)', offset: '+8:00' },
            { value: 'Australia/Sydney', label: 'Sydney (AEDT/AEST)', offset: '+10:00' },
            { value: 'America/Sao_Paulo', label: 'São Paulo (BRT)', offset: '-3:00' }
        ];
    }
}

/* singleton */
const store = new Storage();