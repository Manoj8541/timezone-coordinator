/* ════════════════════════════════════════════
   FAIRNESS ENGINE
════════════════════════════════════════════ */
class FairnessEngine {

    /* ── Adjust suggestions with fairness weight ── */
    applyFairness(suggestions, team) {
        if (!team.getMeetingCount()) return suggestions;

        const stats = team.getFairnessStats();
        const members = team.getMembers();
        const avgPain = stats.avgPain;

        const adjusted = suggestions.map(s => {
            if (s.blocked) return { ...s, fairnessScore: 0 };
            let bonus = 0;
            s.memberTimes.forEach(mt => {
                const member = members.find(m => m.id === mt.memberId);
                if (!member) return;
                const overload = member.cumulativePain - avgPain;
                if (overload > 0) {
                    bonus += (overload / 100) * (100 - mt.pain);
                }
            });

            const fairnessScore = Math.min(100, Math.round(bonus / members.length));
            const adjustedTotal = Math.max(0, s.totalPain - bonus * 0.4);

            return { ...s, fairnessScore, adjustedTotal };
        });

        /* Re-sort valid slots by adjustedTotal */
        const valid = adjusted.filter(s => !s.blocked)
            .sort((a, b) => a.adjustedTotal - b.adjustedTotal);
        const blocked = adjusted.filter(s => s.blocked);
        return [...valid, ...blocked];
    }

    /* ── Pain distribution for chart ── */
    painChartData(team) {
        return team.getMembers().map(m => ({
            id: m.id,
            name: m.name,
            initials: m.initials,
            colorIndex: m.colorIndex,
            cumulativePain: m.cumulativePain,
            avgPain: m.getAveragePain(),
            meetingCount: m.meetingHistory.length
        }));
    }

    /* ── Timeline data for history section ── */
    timelineData(team) {
        const members = team.getMembers();
        const meetings = team.getMeetings();
        if (!meetings.length) return [];

        return meetings.map((mtg, i) => {
            const memberRows = (mtg.memberTimes || []).map(mt => {
                const member = members.find(m => m.id === mt.memberId);
                return {
                    name: member ? member.name : mt.memberName,
                    initials: member ? member.initials : (mt.memberName || '?')[0].toUpperCase(),
                    colorIndex: member ? member.colorIndex : 0,
                    pain: mt.pain,
                    localTime: mt.localTime
                };
            });

            return {
                num: i + 1,
                utcTime: mtg.utcTime,
                date: new Date(mtg.scheduledAt).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric'
                }),
                totalPain: mtg.totalPain,
                memberRows
            };
        });
    }

    /* ── Fairness recommendation string ── */
    recommendation(team) {
        const stats = team.getFairnessStats();
        if (!team.getMeetingCount()) {
            return {
                type: 'info',
                text: 'No meeting history yet. Schedule your first meeting to start tracking fairness.'
            };
        }
        const most = team.getMostPainedMember();
        const least = team.getLeastPainedMember();
        const diff = most && least ? most.cumulativePain - least.cumulativePain : 0;

        if (stats.score >= 80) {
            return {
                type: 'success',
                text: `Great balance — fairness score ${stats.score}/100. Team burden is well distributed.`
            };
        }
        if (stats.score >= 55) {
            return {
                type: 'warning',
                text: `Moderate imbalance (score ${stats.score}/100). ${most?.name} has accumulated ${diff} more pain points than ${least?.name}. Enable Fairness Mode.`
            };
        }
        return {
            type: 'danger',
            text: `Significant imbalance (score ${stats.score}/100)! ${most?.name} has suffered ${diff} more pain points than ${least?.name}. Fairness Mode strongly recommended.`
        };
    }

    /* ── Fairness impact preview ── */
    impactPreview(suggestion, team) {
        const stats = team.getFairnessStats();
        const members = team.getMembers();

        const projected = members.map(m => {
            const mt = suggestion.memberTimes.find(x => x.memberId === m.id);
            const add = mt ? mt.pain : 0;
            return {
                id: m.id,
                name: m.name,
                initials: m.initials,
                colorIndex: m.colorIndex,
                before: m.cumulativePain,
                after: m.cumulativePain + add,
                add
            };
        });

        const newPains = projected.map(p => p.after);
        const newAvg = newPains.reduce((s, p) => s + p, 0) / newPains.length;
        const newVar = newPains.reduce((s, p) => s + (p - newAvg) ** 2, 0) / newPains.length;
        const newScore = Math.max(0, Math.round(100 - Math.sqrt(newVar)));

        return {
            currentScore: stats.score,
            projectedScore: newScore,
            delta: newScore - stats.score,
            projected
        };
    }
}

const fairness = new FairnessEngine();