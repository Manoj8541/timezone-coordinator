/* ════════════════════════════════════════════
   WORLD MAP — Real image + day/night overlay
════════════════════════════════════════════ */
class WorldMap {
    constructor() {
        this._timer = null;
        this._members = [];
        this._container = null;

        this.IMG_LAT_TOP = 83.7;
        this.IMG_LAT_BOTTOM = -36.0;
        this.IMG_LNG_LEFT = -180.0;
        this.IMG_LNG_RIGHT = 180.0;


        /* ── Timezone → [lat, lng] ── */
        this.geoCoords = {
            /* Americas */
            'Pacific/Honolulu': [21.3, -157.8],
            'America/Anchorage': [61.2, -149.9],
            'America/Los_Angeles': [34.0, -118.2],
            'America/Vancouver': [49.2, -123.1],
            'America/Denver': [39.7, -104.9],
            'America/Phoenix': [33.4, -112.1],
            'America/Chicago': [41.8, -87.6],
            'America/Mexico_City': [19.4, -99.1],
            'America/New_York': [40.7, -74.0],
            'America/Toronto': [43.6, -79.4],
            'America/Halifax': [44.6, -63.6],
            'America/St_Johns': [47.5, -52.7],
            'America/Sao_Paulo': [-23.5, -46.6],
            'America/Buenos_Aires': [-34.6, -58.4],
            'America/Santiago': [-33.4, -70.6],
            'America/Bogota': [4.7, -74.1],
            'America/Lima': [-12.0, -77.0],
            'America/Caracas': [10.5, -66.9],
            'America/Panama': [9.0, -79.5],
            'America/Montevideo': [-34.9, -56.2],
            'America/Manaus': [-3.1, -60.0],
            'America/La_Paz': [-16.5, -68.1],
            /* Atlantic */
            'Atlantic/Reykjavik': [64.1, -21.9],
            'Atlantic/Azores': [37.7, -25.7],
            'Atlantic/Cape_Verde': [14.9, -23.5],
            /* Europe */
            'UTC': [51.5, 0.0],
            'Europe/London': [51.5, -0.1],
            'Europe/Lisbon': [38.7, -9.1],
            'Europe/Dublin': [53.3, -6.2],
            'Europe/Madrid': [40.4, -3.7],
            'Europe/Paris': [48.8, 2.3],
            'Europe/Berlin': [52.5, 13.4],
            'Europe/Amsterdam': [52.3, 4.9],
            'Europe/Brussels': [50.8, 4.4],
            'Europe/Rome': [41.9, 12.5],
            'Europe/Stockholm': [59.3, 18.1],
            'Europe/Oslo': [59.9, 10.7],
            'Europe/Copenhagen': [55.7, 12.6],
            'Europe/Warsaw': [52.2, 21.0],
            'Europe/Prague': [50.1, 14.4],
            'Europe/Vienna': [48.2, 16.4],
            'Europe/Zurich': [47.4, 8.5],
            'Europe/Budapest': [47.5, 19.0],
            'Europe/Athens': [37.9, 23.7],
            'Europe/Bucharest': [44.4, 26.1],
            'Europe/Helsinki': [60.2, 25.0],
            'Europe/Kiev': [50.5, 30.5],
            'Europe/Riga': [56.9, 24.1],
            'Europe/Istanbul': [41.0, 28.9],
            'Europe/Moscow': [55.7, 37.6],
            'Europe/Minsk': [53.9, 27.6],
            /* Africa */
            'Africa/Casablanca': [33.6, -7.6],
            'Africa/Cairo': [30.0, 31.2],
            'Africa/Lagos': [6.5, 3.4],
            'Africa/Nairobi': [-1.3, 36.8],
            'Africa/Johannesburg': [-26.2, 28.0],
            'Africa/Accra': [5.6, -0.2],
            'Africa/Addis_Ababa': [9.0, 38.7],
            'Africa/Dar_es_Salaam': [-6.8, 39.3],
            'Africa/Khartoum': [15.6, 32.5],
            'Africa/Algiers': [36.7, 3.1],
            'Africa/Tunis': [36.8, 10.2],
            'Africa/Tripoli': [32.9, 13.2],
            'Africa/Abidjan': [5.4, -4.0],
            'Africa/Dakar': [14.7, -17.4],
            'Africa/Kampala': [0.3, 32.6],
            'Africa/Maputo': [-25.9, 32.6],
            'Africa/Lusaka': [-15.4, 28.3],
            'Africa/Harare': [-17.8, 31.0],
            /* Asia */
            'Asia/Jerusalem': [31.8, 35.2],
            'Asia/Beirut': [33.9, 35.5],
            'Asia/Amman': [31.9, 35.9],
            'Asia/Baghdad': [33.3, 44.4],
            'Asia/Riyadh': [24.7, 46.7],
            'Asia/Kuwait': [29.4, 48.0],
            'Asia/Tehran': [35.7, 51.4],
            'Asia/Dubai': [25.2, 55.3],
            'Asia/Muscat': [23.6, 58.6],
            'Asia/Baku': [40.4, 49.9],
            'Asia/Yerevan': [40.2, 44.5],
            'Asia/Tbilisi': [41.7, 44.8],
            'Asia/Kabul': [34.5, 69.2],
            'Asia/Karachi': [24.9, 67.0],
            'Asia/Tashkent': [41.3, 69.3],
            'Asia/Kolkata': [22.6, 88.4],
            'Asia/Colombo': [6.9, 79.9],
            'Asia/Kathmandu': [27.7, 85.3],
            'Asia/Dhaka': [23.7, 90.4],
            'Asia/Rangoon': [16.8, 96.2],
            'Asia/Bangkok': [13.8, 100.5],
            'Asia/Jakarta': [-6.2, 106.8],
            'Asia/Ho_Chi_Minh': [10.8, 106.7],
            'Asia/Singapore': [1.4, 103.8],
            'Asia/Kuala_Lumpur': [3.1, 101.7],
            'Asia/Hong_Kong': [22.3, 114.2],
            'Asia/Shanghai': [31.2, 121.5],
            'Asia/Taipei': [25.0, 121.5],
            'Asia/Manila': [14.6, 121.0],
            'Asia/Seoul': [37.6, 127.0],
            'Asia/Tokyo': [35.7, 139.7],
            'Asia/Novosibirsk': [55.0, 82.9],
            'Asia/Almaty': [43.3, 77.0],
            'Asia/Ulaanbaatar': [47.9, 106.9],
            'Asia/Vladivostok': [43.1, 131.9],
            /* Australia / Pacific */
            'Australia/Perth': [-31.9, 115.9],
            'Australia/Darwin': [-12.5, 130.8],
            'Australia/Adelaide': [-34.9, 138.6],
            'Australia/Brisbane': [-27.5, 153.0],
            'Australia/Sydney': [-33.9, 151.2],
            'Australia/Melbourne': [-37.8, 145.0],
            'Pacific/Auckland': [-36.9, 174.8],
            'Pacific/Fiji': [-18.1, 178.4],
            'Pacific/Guam': [13.5, 144.8],
            'Pacific/Port_Moresby': [-9.4, 147.2],
            'Pacific/Honolulu': [21.3, -157.8]
        };

        this.cityNames = {
            'Pacific/Honolulu': 'Honolulu',
            'America/Anchorage': 'Anchorage',
            'America/Los_Angeles': 'Los Angeles',
            'America/Vancouver': 'Vancouver',
            'America/Denver': 'Denver',
            'America/Phoenix': 'Phoenix',
            'America/Chicago': 'Chicago',
            'America/Mexico_City': 'Mexico City',
            'America/New_York': 'New York',
            'America/Toronto': 'Toronto',
            'America/Halifax': 'Halifax',
            'America/St_Johns': 'St. John\'s',
            'America/Sao_Paulo': 'São Paulo',
            'America/Buenos_Aires': 'Buenos Aires',
            'America/Santiago': 'Santiago',
            'America/Bogota': 'Bogotá',
            'America/Lima': 'Lima',
            'America/Caracas': 'Caracas',
            'America/Panama': 'Panama City',
            'America/Montevideo': 'Montevideo',
            'America/Manaus': 'Manaus',
            'America/La_Paz': 'La Paz',
            'Atlantic/Reykjavik': 'Reykjavik',
            'Atlantic/Azores': 'Azores',
            'Atlantic/Cape_Verde': 'Cape Verde',
            'UTC': 'UTC / London',
            'Europe/London': 'London',
            'Europe/Lisbon': 'Lisbon',
            'Europe/Dublin': 'Dublin',
            'Europe/Madrid': 'Madrid',
            'Europe/Paris': 'Paris',
            'Europe/Berlin': 'Berlin',
            'Europe/Amsterdam': 'Amsterdam',
            'Europe/Brussels': 'Brussels',
            'Europe/Rome': 'Rome',
            'Europe/Stockholm': 'Stockholm',
            'Europe/Oslo': 'Oslo',
            'Europe/Copenhagen': 'Copenhagen',
            'Europe/Warsaw': 'Warsaw',
            'Europe/Prague': 'Prague',
            'Europe/Vienna': 'Vienna',
            'Europe/Zurich': 'Zurich',
            'Europe/Budapest': 'Budapest',
            'Europe/Athens': 'Athens',
            'Europe/Bucharest': 'Bucharest',
            'Europe/Helsinki': 'Helsinki',
            'Europe/Kiev': 'Kyiv',
            'Europe/Riga': 'Riga',
            'Europe/Istanbul': 'Istanbul',
            'Europe/Moscow': 'Moscow',
            'Europe/Minsk': 'Minsk',
            'Africa/Casablanca': 'Casablanca',
            'Africa/Cairo': 'Cairo',
            'Africa/Lagos': 'Lagos',
            'Africa/Nairobi': 'Nairobi',
            'Africa/Johannesburg': 'Johannesburg',
            'Africa/Accra': 'Accra',
            'Africa/Addis_Ababa': 'Addis Ababa',
            'Africa/Dar_es_Salaam': 'Dar es Salaam',
            'Africa/Khartoum': 'Khartoum',
            'Africa/Algiers': 'Algiers',
            'Africa/Tunis': 'Tunis',
            'Africa/Tripoli': 'Tripoli',
            'Africa/Abidjan': 'Abidjan',
            'Africa/Dakar': 'Dakar',
            'Africa/Kampala': 'Kampala',
            'Africa/Maputo': 'Maputo',
            'Africa/Lusaka': 'Lusaka',
            'Africa/Harare': 'Harare',
            'Asia/Jerusalem': 'Jerusalem',
            'Asia/Beirut': 'Beirut',
            'Asia/Amman': 'Amman',
            'Asia/Baghdad': 'Baghdad',
            'Asia/Riyadh': 'Riyadh',
            'Asia/Kuwait': 'Kuwait City',
            'Asia/Tehran': 'Tehran',
            'Asia/Dubai': 'Dubai',
            'Asia/Muscat': 'Muscat',
            'Asia/Baku': 'Baku',
            'Asia/Yerevan': 'Yerevan',
            'Asia/Tbilisi': 'Tbilisi',
            'Asia/Kabul': 'Kabul',
            'Asia/Karachi': 'Karachi',
            'Asia/Tashkent': 'Tashkent',
            'Asia/Kolkata': 'Mumbai / Kolkata',
            'Asia/Colombo': 'Colombo',
            'Asia/Kathmandu': 'Kathmandu',
            'Asia/Dhaka': 'Dhaka',
            'Asia/Rangoon': 'Yangon',
            'Asia/Bangkok': 'Bangkok',
            'Asia/Jakarta': 'Jakarta',
            'Asia/Ho_Chi_Minh': 'Ho Chi Minh City',
            'Asia/Singapore': 'Singapore',
            'Asia/Kuala_Lumpur': 'Kuala Lumpur',
            'Asia/Hong_Kong': 'Hong Kong',
            'Asia/Shanghai': 'Shanghai',
            'Asia/Taipei': 'Taipei',
            'Asia/Manila': 'Manila',
            'Asia/Seoul': 'Seoul',
            'Asia/Tokyo': 'Tokyo',
            'Asia/Novosibirsk': 'Novosibirsk',
            'Asia/Almaty': 'Almaty',
            'Asia/Ulaanbaatar': 'Ulaanbaatar',
            'Asia/Vladivostok': 'Vladivostok',
            'Australia/Perth': 'Perth',
            'Australia/Darwin': 'Darwin',
            'Australia/Adelaide': 'Adelaide',
            'Australia/Brisbane': 'Brisbane',
            'Australia/Sydney': 'Sydney',
            'Australia/Melbourne': 'Melbourne',
            'Pacific/Auckland': 'Auckland',
            'Pacific/Fiji': 'Fiji',
            'Pacific/Guam': 'Guam',
            'Pacific/Port_Moresby': 'Port Moresby'
        };

        this.pinColors = [
            '#7B72FF', '#FF6BB5', '#34D399', '#FBBF24',
            '#A78BFA', '#FB923C', '#60A5FA', '#F87171'
        ];
    }

    /* ════════════════════════════════════════
       COORDINATE CONVERSION
    ════════════════════════════════════════ */
    _lngToX(lng) {
        return ((lng - this.IMG_LNG_LEFT) /
            (this.IMG_LNG_RIGHT - this.IMG_LNG_LEFT)) * 1000;
    }

    _latToY(lat) {
        const clamped = Math.max(this.IMG_LAT_BOTTOM,
            Math.min(this.IMG_LAT_TOP, lat));
        return ((this.IMG_LAT_TOP - clamped) /
            (this.IMG_LAT_TOP - this.IMG_LAT_BOTTOM)) * 500;
    }

    /* ════════════════════════════════════════
       PUBLIC render()
    ════════════════════════════════════════ */
    render(members, containerId) {
        this._container = document.getElementById(containerId);
        if (!this._container) return;
        this._members = members;

        if (!members.length) {
            this._container.innerHTML = '';
            return;
        }

        this._container.innerHTML = this._buildHTML();
        requestAnimationFrame(() => this._wireHover());
        this._startAutoUpdate();
    }

    destroy() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }

    _startAutoUpdate() {
        if (this._timer) clearInterval(this._timer);
        this._timer = setInterval(() => {
            if (!this._container) return;
            const svg = this._container.querySelector('.wm-svg');
            if (!svg) return;
            const old = svg.querySelector('.wm-night-group');
            if (old) old.remove();
            const g = document.createElementNS(
                'http://www.w3.org/2000/svg', 'g');
            g.setAttribute('class', 'wm-night-group');
            g.innerHTML = this._buildNightPath();
            const pins = svg.querySelector('.wm-pins-group');
            svg.insertBefore(g, pins);
            const utcVal = document.getElementById('wmUtcVal');
            if (utcVal) utcVal.textContent = this._utcNow();
            this._updateMemberChips();
        }, 60000);
    }

    _updateMemberChips() {
        this._members.forEach(m => {
            const el = this._container?.querySelector(
                `[data-member-clock="${CSS.escape(m.timezone)}"]`
            );
            if (el) el.textContent = m.getCurrentLocalTime();
        });
    }

    /* ════════════════════════════════════════
       BUILD HTML
    ════════════════════════════════════════ */
    _buildHTML() {
        return `
        <div class="wm-wrap">
            <div class="wm-canvas-wrap" style="position:relative;">
                <svg class="wm-svg"
                     viewBox="0 0 1000 500"
                     preserveAspectRatio="xMidYMid meet"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink">

                    <defs>
                        <clipPath id="mapClip">
                            <rect width="1000" height="500"/>
                        </clipPath>
                    </defs>

                    <!-- Base map image -->
                    <image href="img/world.png"
                           x="0" y="0"
                           width="1000" height="500"
                           preserveAspectRatio="none"
                           clip-path="url(#mapClip)"
                           class="wm-base-image"/>

                    <!-- Night shadow -->
                    <g class="wm-night-group">
                        ${this._buildNightPath()}
                    </g>

                    <!-- Subtle grid -->
                    <g opacity="0.08" clip-path="url(#mapClip)">
                        ${this._buildGridLines()}
                    </g>

                    <!-- Equator line -->
                    <line x1="0"
                          y1="${this._latToY(0).toFixed(1)}"
                          x2="1000"
                          y2="${this._latToY(0).toFixed(1)}"
                          stroke="rgba(255,255,255,0.25)"
                          stroke-width="0.8"
                          stroke-dasharray="4,8"
                          clip-path="url(#mapClip)"/>

                    <!-- Pins -->
                    <g class="wm-pins-group" id="wmPinsGroup">
                        ${this._buildPins()}
                    </g>

                </svg>

                <!-- HTML tooltip -->
                <div class="wm-html-tooltip" id="wmTooltip"></div>
            </div>

            <!-- Info bar -->
            <div class="wm-info-bar">
                <div class="wm-legend">
                    <span class="wm-legend-item">
                        <span class="wm-legend-dot wm-legend-dot--day"></span>
                        Day
                    </span>
                    <span class="wm-legend-item">
                        <span class="wm-legend-dot wm-legend-dot--night"></span>
                        Night
                    </span>
                    <span class="wm-legend-item">
                        <span class="wm-legend-dot wm-legend-dot--pin"></span>
                        Team member
                    </span>
                </div>
                <div class="wm-utc-time">
                    <svg viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2"
                         stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    UTC <span class="wm-utc-val" id="wmUtcVal">
                        ${this._utcNow()}
                    </span>
                </div>
            </div>

            <!-- Member chips -->
            <div class="wm-member-times">
                ${this._buildMemberTimeChips()}
            </div>
        </div>`;
    }

    /* ════════════════════════════════════════
       NIGHT PATH — correct polygon closure
    ════════════════════════════════════════ */
    _buildNightPath() {
        const now = new Date();
        const decl = this._getSolarDeclination(now);

        const utcH = now.getUTCHours() + now.getUTCMinutes() / 60;
        const solarLng = -(utcH - 12) * 15;

        /* Terminator points every 1 degree */
        const pts = [];
        for (let lng = -180; lng <= 180; lng += 1) {
            const dLng = (lng - solarLng) * (Math.PI / 180);
            const tanDecl = Math.tan(decl);
            let termLat = 0;

            if (Math.abs(tanDecl) > 0.0001) {
                termLat = Math.atan(
                    -Math.cos(dLng) / tanDecl
                ) * (180 / Math.PI);
            }

            /* Clamp to image lat bounds */
            termLat = Math.max(this.IMG_LAT_BOTTOM + 1,
                Math.min(this.IMG_LAT_TOP - 1, termLat));

            pts.push([
                parseFloat(this._lngToX(lng).toFixed(1)),
                parseFloat(this._latToY(termLat).toFixed(1))
            ]);
        }

        const northInNight = decl < 0;

        /* Build path string */
        const termStr = pts.map(([x, y], i) =>
            `${i === 0 ? 'M' : 'L'}${x},${y}`
        ).join(' ');

        const d = northInNight
            ? `${termStr} L1000,0 L0,0 Z`
            : `${termStr} L1000,500 L0,500 Z`;

        /* Glow line along terminator */
        const glowPts = pts.map(([x, y]) => `${x},${y}`).join(' ');

        return `
            <path d="${d}"
                  fill="#0a1628"
                  opacity="0.52"
                  clip-path="url(#mapClip)"/>
            <polyline points="${glowPts}"
                      fill="none"
                      stroke="rgba(255,210,80,0.55)"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      clip-path="url(#mapClip)"/>`;
    }

    /* ════════════════════════════════════════
       SOLAR DECLINATION
    ════════════════════════════════════════ */
    _getSolarDeclination(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const day = Math.floor((date - start) / 86400000);
        return -23.45 * (Math.PI / 180) *
            Math.cos((2 * Math.PI / 365) * (day + 10));
    }

    /* ════════════════════════════════════════
       GRID LINES
    ════════════════════════════════════════ */
    _buildGridLines() {
        const lines = [];
        for (let lng = -180; lng <= 180; lng += 30) {
            const x = this._lngToX(lng).toFixed(1);
            lines.push(
                `<line x1="${x}" y1="0" x2="${x}" y2="500"
                       stroke="white" stroke-width="0.5"/>`
            );
        }
        for (let lat = -60; lat <= 80; lat += 30) {
            const y = this._latToY(lat).toFixed(1);
            lines.push(
                `<line x1="0" y1="${y}" x2="1000" y2="${y}"
                       stroke="white" stroke-width="0.5"/>`
            );
        }
        return lines.join('');
    }

    /* ════════════════════════════════════════
       PINS — with invisible hitbox for hover
    ════════════════════════════════════════ */
    _buildPins() {
        const groups = {};
        this._members.forEach(m => {
            if (!groups[m.timezone]) groups[m.timezone] = [];
            groups[m.timezone].push(m);
        });

        const pins = [];

        Object.entries(groups).forEach(([tz, members]) => {
            const coords = this.geoCoords[tz];
            if (!coords) return;

            const [lat, lng] = coords;
            const cx = parseFloat(this._lngToX(lng).toFixed(1));
            const cy = parseFloat(this._latToY(lat).toFixed(1));
            const color = this.pinColors[
                members[0].colorIndex % this.pinColors.length
            ];

            /* Skip if outside image bounds */
            if (cy < 0 || cy > 500 || cx < 0 || cx > 1000) return;

            /* Pulse ring */
            const delay = (members[0].colorIndex * 0.5).toFixed(1);
            pins.push(`
                <circle cx="${cx}" cy="${cy}" r="10"
                        fill="${color}" opacity="0">
                    <animate attributeName="r"
                             values="6;16;6" dur="3s"
                             begin="${delay}s"
                             repeatCount="indefinite"/>
                    <animate attributeName="opacity"
                             values="0.3;0;0.3" dur="3s"
                             begin="${delay}s"
                             repeatCount="indefinite"/>
                </circle>`);

            /* White halo for visibility on both land and ocean */
            pins.push(`
                <circle cx="${cx}" cy="${cy}" r="7"
                        fill="white" opacity="0.85"/>`);

            /* Colored pin */
            pins.push(`
                <circle cx="${cx}" cy="${cy}" r="5.5"
                        fill="${color}"
                        stroke="white"
                        stroke-width="1.5"/>`);

            /* Stack badge */
            if (members.length > 1) {
                pins.push(`
                    <circle cx="${cx + 9}" cy="${cy - 9}"
                            r="7" fill="#5B4FE9"
                            stroke="white" stroke-width="1.5"/>
                    <text x="${cx + 9}" y="${cy - 9}"
                          text-anchor="middle"
                          dominant-baseline="central"
                          font-size="8" font-weight="700"
                          font-family="'JetBrains Mono',monospace"
                          fill="white">${members.length}</text>`);
            }

            /* Invisible hitbox — large for easy hover */
            pins.push(`
                <circle cx="${cx}" cy="${cy}" r="16"
                        fill="transparent"
                        stroke="none"
                        class="wm-pin-hitbox"
                        data-tz="${this._svgEsc(tz)}"
                        style="cursor:pointer;"/>`);
        });

        return pins.join('\n');
    }

    /* ════════════════════════════════════════
       HOVER WIRING — HTML tooltip
    ════════════════════════════════════════ */
    _wireHover() {
        const svg = this._container?.querySelector('.wm-svg');
        const tooltip = this._container?.querySelector('#wmTooltip');
        const wrap = this._container?.querySelector('.wm-canvas-wrap');
        if (!svg || !tooltip || !wrap) return;

        const groups = {};
        this._members.forEach(m => {
            if (!groups[m.timezone]) groups[m.timezone] = [];
            groups[m.timezone].push(m);
        });

        svg.querySelectorAll('.wm-pin-hitbox').forEach(circle => {
            const tz = circle.dataset.tz;
            if (!tz || !groups[tz]) return;

            const tzMembers = groups[tz];
            const city = this.cityNames[tz] ||
                tz.split('/').pop().replace(/_/g, ' ');
            const color = this.pinColors[
                tzMembers[0].colorIndex % this.pinColors.length
            ];

            circle.addEventListener('mouseenter', () => {
                const memberRows = tzMembers.map(m => `
                    <div class="wm-tooltip-member">
                        <div class="avatar avatar--sm av-${m.colorIndex}">
                            ${this._esc(m.initials)}
                        </div>
                        <span>${this._esc(m.name)}</span>
                        <span class="wm-tooltip-member-time">
                            ${m.getCurrentLocalTime()}
                        </span>
                    </div>`).join('');

                tooltip.innerHTML = `
                    <div class="wm-tooltip-city">
                        <span class="wm-tooltip-city-dot"
                              style="background:${color};"></span>
                        ${this._esc(city)}
                    </div>
                    <div class="wm-tooltip-members">
                        ${memberRows}
                    </div>`;

                this._positionTooltip(tooltip, wrap, circle, svg);
                tooltip.classList.add('is-visible');
            });

            circle.addEventListener('mouseleave', () => {
                tooltip.classList.remove('is-visible');
            });

            circle.addEventListener('touchstart', (e) => {
                e.preventDefault();
                circle.dispatchEvent(new MouseEvent('mouseenter'));
                setTimeout(() =>
                    tooltip.classList.remove('is-visible'), 2500);
            }, { passive: false });
        });

        wrap.addEventListener('mouseleave', () => {
            tooltip.classList.remove('is-visible');
        });
    }

    _positionTooltip(tooltip, wrap, circle, svg) {
        const wrapRect = wrap.getBoundingClientRect();
        const circleRect = circle.getBoundingClientRect();

        const pinCX = circleRect.left + circleRect.width / 2 - wrapRect.left;
        const pinCY = circleRect.top - wrapRect.top;

        tooltip.style.visibility = 'hidden';
        tooltip.style.display = 'block';
        const ttW = tooltip.offsetWidth || 180;
        const ttH = tooltip.offsetHeight || 80;
        tooltip.style.visibility = '';

        let left = pinCX - ttW / 2;
        let top = pinCY - ttH - 14;

        left = Math.max(4, Math.min(left, wrapRect.width - ttW - 4));
        top = Math.max(4, Math.min(top, wrapRect.height - ttH - 4));

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    }

    /* ════════════════════════════════════════
       MEMBER TIME CHIPS
    ════════════════════════════════════════ */
    _buildMemberTimeChips() {
        return this._members.map(m => `
            <div class="wm-member-chip">
                <div class="avatar avatar--sm av-${m.colorIndex}">
                    ${this._esc(m.initials)}
                </div>
                <div class="wm-chip-info">
                    <span class="wm-chip-name">${this._esc(m.name)}</span>
                    <span class="wm-chip-time"
                          data-member-clock="${this._esc(m.timezone)}">
                        ${m.getCurrentLocalTime()}
                    </span>
                </div>
                <span class="wm-chip-offset">
                    ${this._esc(m.getTimezoneOffset())}
                </span>
            </div>`).join('');
    }

    /* ════════════════════════════════════════
       UTC TIME STRING
    ════════════════════════════════════════ */
    _utcNow() {
        return new Date().toLocaleString('en-US', {
            timeZone: 'UTC',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }

    /* ── Escape helpers ── */
    _svgEsc(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    _esc(str) {
        const d = document.createElement('div');
        d.textContent = String(str || '');
        return d.innerHTML;
    }
}

const worldMap = new WorldMap();