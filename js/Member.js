/* ════════════════════════════════════════════
   MEMBER — single team member
════════════════════════════════════════════ */
class Member {
    constructor(d = {}) {
        this.id = d.id ?? (Date.now() + Math.random());
        this.firstName = (d.firstName || '').trim();
        this.lastName = (d.lastName || '').trim();

        /* Support legacy data that only has .name */
        if (!this.firstName && d.name) {
            const parts = d.name.trim().split(/\s+/);
            this.firstName = parts[0] || '';
            this.lastName = parts.slice(1).join(' ') || '';
        }

        this.name = `${this.firstName} ${this.lastName}`.trim() || 'Unnamed';
        this.timezone = d.timezone || 'UTC';
        this.role = d.role || '';

        this.initials = this._buildInitials();
        this.colorIndex = this._buildColorIndex();

        this.workHours = d.workHours || { start: 9, end: 17 };

        this.cumulativePain = d.cumulativePain || 0;
        this.meetingHistory = d.meetingHistory || [];
    }

    /* ── Private helpers ── */
    _buildInitials() {
        const f = (this.firstName[0] || '').toUpperCase();
        const l = (this.lastName[0] || '').toUpperCase();
        return (f + l) || '?';
    }

    _buildColorIndex() {
        const str = (this.firstName + this.lastName).toLowerCase();
        const hash = [...str].reduce((a, c) => a + c.charCodeAt(0), 0);
        return hash % 8;
    }

    _dateAtUTCHour(utcHour) {
        const d = new Date();
        d.setUTCHours(utcHour, 0, 0, 0);
        return d;
    }

    /* ── Current local time (live clock) ─── */
    getCurrentLocalTime() {
        try {
            return new Date().toLocaleString('en-US', {
                timeZone: this.timezone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
        } catch (_) { return '--:--:--'; }
    }

    utcToLocalHour(utcHour) {
        try {
            const d = this._dateAtUTCHour(utcHour);
            const str = d.toLocaleString('en-US', {
                timeZone: this.timezone,
                hour: '2-digit',
                hour12: false
            });
            const h = parseInt(str, 10);
            /* Guard: '24' means midnight next day = 0 */
            if (isNaN(h)) return utcHour % 24;
            return h % 24;
        } catch (_) {
            return utcHour % 24;
        }
    }

    /* ── Local time STRING for a UTC hour ─── */
    getLocalTimeForUTC(utcHour) {
        try {
            const d = this._dateAtUTCHour(utcHour);
            return d.toLocaleString('en-US', {
                timeZone: this.timezone,
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        } catch (_) {
            return `${utcHour}:00 UTC`;
        }
    }

    /* ── Timezone offset label ──── */
    getTimezoneOffset() {
        try {
            const now = new Date();

            /* Get the UTC wall-clock as a number */
            const utcParts = this._partsInTZ(now, 'UTC');
            const tzParts = this._partsInTZ(now, this.timezone);

            const utcMins = utcParts.h * 60 + utcParts.m;
            const tzMins = tzParts.h * 60 + tzParts.m;

            /* Account for day boundary crossings */
            let diffMins = tzMins - utcMins;
            if (diffMins > 720) diffMins -= 1440;
            if (diffMins < -720) diffMins += 1440;

            const sign = diffMins >= 0 ? '+' : '-';
            const abs = Math.abs(diffMins);
            const h = Math.floor(abs / 60);
            const m = abs % 60;

            return m > 0
                ? `UTC${sign}${h}:${String(m).padStart(2, '0')}`
                : `UTC${sign}${h}`;
        } catch (_) {
            return 'UTC+0';
        }
    }

    /* ── Extract {h, m} from a Date in a timezone ── */
    _partsInTZ(date, tz) {
        try {
            const str = date.toLocaleString('en-US', {
                timeZone: tz,
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            /* str is like "14:30" or "00:30" */
            const [hStr, mStr] = str.split(':');
            let h = parseInt(hStr, 10);
            const m = parseInt(mStr, 10);
            if (h === 24) h = 0;
            return { h: isNaN(h) ? 0 : h, m: isNaN(m) ? 0 : m };
        } catch (_) {
            return { h: 0, m: 0 };
        }
    }

    utcToLocalHourMinute(utcHour) {
        try {
            const d = this._dateAtUTCHour(utcHour);
            const parts = this._partsInTZ(d, this.timezone);
            return { hour: parts.h % 24, minute: parts.m };
        } catch (_) {
            return { hour: utcHour % 24, minute: 0 };
        }
    }

    /* ── Pain tracking ── */
    addMeetingPain(score, meta = {}) {
        this.cumulativePain += score;
        this.meetingHistory.push({
            date: new Date().toISOString(),
            pain: score,
            ...meta
        });
    }

    getAveragePain() {
        if (!this.meetingHistory.length) return 0;
        return Math.round(this.cumulativePain / this.meetingHistory.length);
    }

    resetPain() {
        this.cumulativePain = 0;
        this.meetingHistory = [];
    }

    /* ── Serialise ── */
    toJSON() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            name: this.name,
            timezone: this.timezone,
            role: this.role,
            workHours: this.workHours,
            cumulativePain: this.cumulativePain,
            meetingHistory: this.meetingHistory
        };
    }

    static fromJSON(d) { return new Member(d); }
}