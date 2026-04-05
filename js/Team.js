/* ════════════════════════════════════════════
   TEAM — collection of members + meetings
════════════════════════════════════════════ */
class Team {
    constructor(d = {}) {
        this.id = d.id ?? (Date.now() + Math.random());
        this.name = d.name || 'Unnamed Team';
        this.createdAt = d.createdAt || new Date().toISOString();
        this.members = (d.members || []).map(m => Member.fromJSON(m));
        this.meetings = d.meetings || [];
    }

    /* ── Members ── */
    addMember(member) {
        this.members.push(member);
    }

    removeMember(id) {
        const i = this.members.findIndex(m => m.id === id);
        if (i > -1) {
            this.members.splice(i, 1);
            return true;
        }
        return false;
    }

    getMember(id) { return this.members.find(m => m.id === id) || null; }
    getMembers() { return [...this.members]; }
    getSize() { return this.members.length; }

    /* ── Meetings ── */
    addMeeting(suggestion) {
        this.meetings.push({
            id: Date.now(),
            scheduledAt: new Date().toISOString(),
            utcHour: suggestion.utcHour,
            utcTime: suggestion.utcTime,
            totalPain: suggestion.totalPain,
            avgPain: suggestion.avgPain,
            memberTimes: suggestion.memberTimes
        });

        suggestion.memberTimes.forEach(mt => {
            const member = this.getMember(mt.memberId);
            if (member) {
                member.addMeetingPain(mt.pain, {
                    utcHour: suggestion.utcHour,
                    utcTime: suggestion.utcTime,
                    localTime: mt.localTime
                });
            }
        });
    }

    getMeetings() { return [...this.meetings]; }
    getMeetingCount() { return this.meetings.length; }

    /* ── Fairness stats ── */
    getFairnessStats() {
        if (!this.members.length) {
            return { totalPain: 0, avgPain: 0, maxPain: 0, minPain: 0, score: 100 };
        }

        const pains = this.members.map(m => m.cumulativePain);
        const total = pains.reduce((s, p) => s + p, 0);
        const avg = total / pains.length;
        const max = Math.max(...pains);
        const min = Math.min(...pains);
        const variance = pains.reduce((s, p) => s + (p - avg) ** 2, 0) / pains.length;
        const score = Math.max(0, Math.round(100 - Math.sqrt(variance)));

        return {
            totalPain: total,
            avgPain: Math.round(avg),
            maxPain: max,
            minPain: min,
            score
        };
    }

    getMostPainedMember() {
        if (!this.members.length) return null;
        return this.members.reduce(
            (a, b) => b.cumulativePain > a.cumulativePain ? b : a
        );
    }

    getLeastPainedMember() {
        if (!this.members.length) return null;
        return this.members.reduce(
            (a, b) => b.cumulativePain < a.cumulativePain ? b : a
        );
    }

    /* ── Serialise ── */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            createdAt: this.createdAt,
            members: this.members.map(m => m.toJSON()),
            meetings: this.meetings
        };
    }

    static fromJSON(d) { return new Team(d); }
}