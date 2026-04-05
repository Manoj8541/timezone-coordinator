/* 
TIMEZONE COORDINATOR - VISUALIZER
 */

class Visualizer {
    constructor() {
        this.colors = {
            primary: '#6C63FF',
            secondary: '#FF6B9D',
            success: '#10B981',
            warning: '#F59E0B',
            danger: '#EF4444',
            gradient: ['#6C63FF', '#8B7FFF', '#FF8DB4', '#FF6B9D']
        };
    }

    /**
     * Render pain distribution chart
     * @param {Array<Object>} chartData - Pain chart data from FairnessEngine
     * @param {string} containerId - Container element ID
     */
    renderPainChart(chartData, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (chartData.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>No pain data to display yet</p>
                </div>
            `;
            return;
        }

        const maxPain = Math.max(...chartData.map(d => d.cumulativePain), 1);

        const html = `
            <div class="pain-chart">
                ${chartData.map(member => `
                    <div class="pain-chart-row">
                        <div class="pain-chart-label">
                            <span class="member-emoji">${member.emoji}</span>
                            <span class="member-name">${member.name}</span>
                        </div>
                        <div class="pain-chart-bar-container">
                            <div class="pain-chart-bar" style="width: ${(member.cumulativePain / maxPain) * 100}%">
                                <span class="pain-chart-value">${member.cumulativePain}</span>
                            </div>
                        </div>
                        <div class="pain-chart-stats">
                            <span class="stat-badge">${member.meetingCount} meetings</span>
                            <span class="stat-badge">Avg: ${member.averagePain}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        container.innerHTML = html;
    }

    /**
     * Render fairness timeline
     * @param {Array<Object>} timelineData - Timeline data from FairnessEngine
     * @param {string} containerId - Container element ID
     */
    renderFairnessTimeline(timelineData, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (timelineData.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>No meeting history yet</p>
                </div>
            `;
            return;
        }

        const html = `
            <div class="timeline">
                ${timelineData.map((point, index) => `
                    <div class="timeline-item">
                        <div class="timeline-marker">${index + 1}</div>
                        <div class="timeline-content">
                            <div class="timeline-header">
                                <strong>Meeting ${point.meetingNumber}</strong>
                                <span class="timeline-date">${point.date}</span>
                                <span class="timeline-time">${point.utcTime}</span>
                            </div>
                            <div class="timeline-members">
                                ${point.memberPains.map(mp => `
                                    <div class="timeline-member">
                                        <span>${mp.emoji} ${mp.name}</span>
                                        <span class="timeline-pain">+${mp.painThisMeeting}</span>
                                        <span class="timeline-cumulative">(Total: ${mp.cumulativePain})</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        container.innerHTML = html;
    }

    /**
     * Render world clock showing all member times
     * @param {Array<Member>} members - Team members
     * @param {number} utcHour - UTC hour to display
     * @param {string} containerId - Container element ID
     */
    renderWorldClock(members, utcHour, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const html = `
            <div class="world-clock">
                <div class="world-clock-header">
                    <h4>${painCalculator.formatUTCTime(utcHour)}</h4>
                </div>
                <div class="world-clock-grid">
                    ${members.map(member => {
            const localHour = member.utcToLocalHour(utcHour);
            const localTime = member.getLocalTimeForUTC(utcHour);
            const timeInfo = painCalculator.getTimeDescription(localHour);
            const pain = painCalculator.calculatePainForHour(localHour);

            return `
                            <div class="clock-card ${pain >= 100 ? 'blocked' : ''}">
                                <div class="clock-emoji">${member.emoji}</div>
                                <div class="clock-name">${member.name}</div>
                                <div class="clock-time">${localTime}</div>
                                <div class="clock-status">
                                    <span class="status-emoji">${timeInfo.emoji}</span>
                                    <span class="status-text">${timeInfo.desc}</span>
                                </div>
                                <div class="clock-pain">
                                    <div class="pain-bar" style="width: ${pain}%"></div>
                                </div>
                            </div>
                        `;
        }).join('')}
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    /**
     * Render timezone heat map
     * @param {Array<Member>} members - Team members
     * @param {string} containerId - Container element ID
     */
    renderTimezoneHeatmap(members, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const hours = Array.from({ length: 24 }, (_, i) => i);

        const html = `
            <div class="heatmap">
                <div class="heatmap-header">
                    <div class="heatmap-label">UTC Hour</div>
                    ${members.map(m => `
                        <div class="heatmap-member">
                            <span>${m.emoji}</span>
                            <span>${m.name.split(' ')[0]}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="heatmap-body">
                    ${hours.map(hour => `
                        <div class="heatmap-row">
                            <div class="heatmap-hour">${painCalculator.formatUTCTime(hour)}</div>
                            ${members.map(member => {
            const localHour = member.utcToLocalHour(hour);
            const pain = painCalculator.calculatePainForHour(localHour);
            const color = painCalculator.getPainColor(pain);

            return `
                                    <div class="heatmap-cell" 
                                         style="background-color: ${color}" 
                                         title="${member.name}: ${member.getLocalTimeForUTC(hour)} (Pain: ${pain})">
                                        <span class="heatmap-cell-value">${pain}</span>
                                    </div>
                                `;
        }).join('')}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    /**
     * Render fairness impact preview
     * @param {Object} impactData - Impact analysis from FairnessEngine
     * @param {string} containerId - Container element ID
     */
    renderFairnessImpact(impactData, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const changeClass = impactData.fairnessChange > 0 ? 'positive' :
            impactData.fairnessChange < 0 ? 'negative' : 'neutral';

        const html = `
            <div class="fairness-impact">
                <div class="impact-summary">
                    <div class="impact-metric">
                        <label>Current Fairness</label>
                        <span class="metric-value">${impactData.currentFairness}/100</span>
                    </div>
                    <div class="impact-arrow ${changeClass}">
                        ${impactData.fairnessChange > 0 ? '↑' :
                impactData.fairnessChange < 0 ? '↓' : '→'}
                        ${Math.abs(impactData.fairnessChange)}
                    </div>
                    <div class="impact-metric">
                        <label>After This Meeting</label>
                        <span class="metric-value">${impactData.projectedFairness}/100</span>
                    </div>
                </div>
                <div class="impact-details">
                    <h5>Pain Distribution After Meeting:</h5>
                    <div class="impact-members">
                        ${impactData.memberImpacts.map(mi => `
                            <div class="impact-member">
                                <span class="member-info">
                                    ${mi.emoji} ${mi.name}
                                </span>
                                <span class="pain-change">
                                    ${mi.currentPain} → ${mi.projectedPain}
                                    <span class="pain-increase">(+${mi.increase})</span>
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    /**
     * Create loading skeleton
     * @param {string} containerId - Container element ID
     */
    showLoadingSkeleton(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="loading-skeleton">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-card"></div>
            </div>
        `;
    }

    /**
     * Show empty state
     * @param {string} containerId - Container element ID
     * @param {string} message - Empty state message
     * @param {string} emoji - Empty state emoji
     */
    showEmptyState(containerId, message, emoji = '📭') {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">${emoji}</div>
                <p>${message}</p>
            </div>
        `;
    }
}

// Export singleton instance
const visualizer = new Visualizer();