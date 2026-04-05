/* ════════════════════════════════════════════
   PAIN CALCULATOR
   Score 0 = perfect work hours
   Score 100 = blocked (sleep / deep night)
════════════════════════════════════════════ */
class PainCalculator {
    constructor() {
        this.scoreMap = {
            0: 100,   /* Midnight */
            1: 100,
            2: 100,
            3: 100,
            4: 100,
            5: 100,
            6: 80,   /* Dawn */
            7: 40,   /* Very early */
            8: 20,   /* Early morning */
            9: 0,   /* Work start */
            10: 0,
            11: 0,
            12: 10,   /* Lunch */
            13: 0,
            14: 0,
            15: 0,
            16: 0,
            17: 5,   /* End of day */
            18: 15,
            19: 25,
            20: 40,   /* Late evening */
            21: 55,
            22: 80,   /* Very late */
            23: 100    /* Midnight */
        };

        this.descMap = {
            0: 'Midnight',
            1: 'Late Night',
            2: 'Late Night',
            3: 'Late Night',
            4: 'Pre-Dawn',
            5: 'Pre-Dawn',
            6: 'Dawn',
            7: 'Very Early',
            8: 'Early Morning',
            9: 'Morning',
            10: 'Late Morning',
            11: 'Late Morning',
            12: 'Lunch Time',
            13: 'Afternoon',
            14: 'Afternoon',
            15: 'Afternoon',
            16: 'Late Afternoon',
            17: 'End of Day',
            18: 'Evening',
            19: 'Evening',
            20: 'Late Evening',
            21: 'Late Evening',
            22: 'Very Late',
            23: 'Midnight'
        };
    }

    /* ── Score for an exact hour ── */
    scoreForHour(localHour) {
        return this.scoreMap[localHour] ?? 50;
    }

    scoreForHourMinute(hour, minute) {
        const h0 = hour % 24;
        const h1 = (hour + 1) % 24;
        const s0 = this.scoreMap[h0] ?? 50;
        const s1 = this.scoreMap[h1] ?? 50;
        const t = minute / 60;
        return Math.round(s0 + (s1 - s0) * t);
    }

    isBlocked(localHour, localMinute = 0) {
        return this.scoreForHourMinute(localHour, localMinute) >= 100;
    }

    descForHour(localHour) {
        return this.descMap[localHour] || 'Unknown';
    }

    /* ── Chip class for a pain value ── */
    chipClass(pain) {
        if (pain >= 100) return 'chip--pain-block';
        if (pain >= 60) return 'chip--pain-high';
        if (pain >= 30) return 'chip--pain-mid';
        if (pain > 0) return 'chip--pain-low';
        return 'chip--pain-0';
    }

    colorForPain(pain) {
        if (pain >= 100) return '#DC2626';
        if (pain >= 60) return '#EF4444';
        if (pain >= 30) return '#F59E0B';
        if (pain >= 10) return '#34D399';
        return '#059669';
    }

    ratingLabel(avgPain, blocked) {
        if (blocked) return 'Blocked';
        if (avgPain <= 5) return 'Excellent';
        if (avgPain <= 15) return 'Good';
        if (avgPain <= 30) return 'Acceptable';
        if (avgPain <= 50) return 'Poor';
        return 'Very Bad';
    }

    ratingChipClass(avgPain, blocked) {
        if (blocked) return 'chip--pain-block';
        if (avgPain <= 15) return 'chip--pain-0';
        if (avgPain <= 30) return 'chip--pain-low';
        if (avgPain <= 50) return 'chip--pain-mid';
        return 'chip--pain-high';
    }

    /* ── UTC display label ── */
    utcLabel(hour) {
        const h = hour % 24;
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
        return `${h12}:00 ${ampm} UTC`;
    }

    /* ── Per-member pain at a UTC hour ── */
    memberPainAt(member, utcHour) {
        const { hour: localHour, minute: localMinute } =
            member.utcToLocalHourMinute(utcHour);

        const pain = this.scoreForHourMinute(localHour, localMinute);
        const blocked = pain >= 100;

        return {
            memberId: member.id,
            memberName: member.name,
            initials: member.initials,
            colorIndex: member.colorIndex,
            localHour,
            localMinute,
            localTime: member.getLocalTimeForUTC(utcHour),  /* "2:30 PM" */
            timezone: member.timezone,
            pain,
            blocked,
            desc: this.descForHour(localHour)
        };
    }

    /* ── Team pain at a UTC hour ── */
    teamPainAt(members, utcHour) {
        const memberTimes = members.map(m => this.memberPainAt(m, utcHour));
        const blocked = memberTimes.some(mt => mt.blocked);
        const totalPain = memberTimes.reduce((s, mt) => s + mt.pain, 0);
        const avgPain = members.length
            ? Math.round(totalPain / members.length)
            : 0;
        const maxPain = memberTimes.length
            ? Math.max(...memberTimes.map(mt => mt.pain))
            : 0;

        return {
            utcHour,
            utcTime: this.utcLabel(utcHour),
            memberTimes,
            blocked,
            totalPain,
            avgPain,
            maxPain,
            rating: this.ratingLabel(avgPain, blocked),
            chipClass: this.ratingChipClass(avgPain, blocked)
        };
    }

    findBestTimes(members) {
        if (!members.length) return [];

        const all = Array.from({ length: 24 }, (_, h) =>
            this.teamPainAt(members, h)
        );

        const valid = all
            .filter(s => !s.blocked)
            .sort((a, b) => a.totalPain - b.totalPain);
        const blocked = all.filter(s => s.blocked);

        return [...valid, ...blocked];
    }
}

const painCalc = new PainCalculator();