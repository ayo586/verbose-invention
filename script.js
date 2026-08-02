/* =========================================================
   NexoraVPN — Dashboard Interactivity
   Power toggle, session timer, server selection, live stats
   Traffic graph, data usage, activity log, quick connect, themes
   ========================================================= */

"use strict";

/* ---------- Server network data (65+ cities across 34 countries) ---------- */
const SERVERS = [
    { name: "United States", city: "New York",    flag: "🇺🇸", ping: 18,  ip: "103.21.58.11" },
    { name: "United States", city: "Los Angeles", flag: "🇺🇸", ping: 34,  ip: "104.24.112.7"  },
    { name: "United States", city: "Chicago",     flag: "🇺🇸", ping: 27,  ip: "107.21.44.93"  },
    { name: "United States", city: "Miami",       flag: "🇺🇸", ping: 25,  ip: "109.99.124.14" },
    { name: "United States", city: "Dallas",      flag: "🇺🇸", ping: 29,  ip: "104.26.7.55"   },
    { name: "United Kingdom", city: "London",     flag: "🇬🇧", ping: 24,  ip: "91.205.174.42" },
    { name: "United Kingdom", city: "Manchester", flag: "🇬🇧", ping: 28,  ip: "91.205.175.18" },
    { name: "United Kingdom", city: "Edinburgh",  flag: "🇬🇧", ping: 33,  ip: "91.205.176.29" },
    { name: "Japan", city: "Tokyo",               flag: "🇯🇵", ping: 62,  ip: "45.121.201.7"  },
    { name: "Japan", city: "Osaka",               flag: "🇯🇵", ping: 68,  ip: "45.121.202.19" },
    { name: "Japan", city: "Nagoya",              flag: "🇯🇵", ping: 71,  ip: "45.121.203.31" },
    { name: "Germany", city: "Frankfurt",         flag: "🇩🇪", ping: 31,  ip: "85.215.64.109" },
    { name: "Germany", city: "Berlin",            flag: "🇩🇪", ping: 36,  ip: "85.215.65.120" },
    { name: "Germany", city: "Munich",            flag: "🇩🇪", ping: 39,  ip: "85.215.66.143" },
    { name: "Canada", city: "Toronto",            flag: "🇨🇦", ping: 21,  ip: "142.47.88.9"   },
    { name: "Canada", city: "Vancouver",          flag: "🇨🇦", ping: 44,  ip: "142.47.89.13"  },
    { name: "Canada", city: "Montreal",           flag: "🇨🇦", ping: 26,  ip: "142.47.90.17"  },
    { name: "France", city: "Paris",              flag: "🇫🇷", ping: 29,  ip: "91.208.10.44"  },
    { name: "France", city: "Marseille",          flag: "🇫🇷", ping: 35,  ip: "91.208.11.52"  },
    { name: "Netherlands", city: "Amsterdam",     flag: "🇳🇱", ping: 27,  ip: "92.246.188.10" },
    { name: "Netherlands", city: "Rotterdam",     flag: "🇳🇱", ping: 30,  ip: "92.246.189.22" },
    { name: "Singapore", city: "Singapore",       flag: "🇸🇬", ping: 58,  ip: "128.106.76.23" },
    { name: "Australia", city: "Sydney",          flag: "🇦🇺", ping: 86,  ip: "27.111.77.134" },
    { name: "Australia", city: "Melbourne",       flag: "🇦🇺", ping: 92,  ip: "27.111.78.148" },
    { name: "Australia", city: "Perth",           flag: "🇦🇺", ping: 104, ip: "27.111.79.161" },
    { name: "India", city: "Mumbai",              flag: "🇮🇳", ping: 88,  ip: "103.207.2.66"  },
    { name: "India", city: "Bangalore",           flag: "🇮🇳", ping: 94,  ip: "103.207.3.77"  },
    { name: "India", city: "Delhi",               flag: "🇮🇳", ping: 90,  ip: "103.207.4.88"  },
    { name: "Brazil", city: "São Paulo",          flag: "🇧🇷", ping: 112, ip: "177.54.140.7"  },
    { name: "Brazil", city: "Rio de Janeiro",     flag: "🇧🇷", ping: 118, ip: "177.54.141.19" },
    { name: "South Korea", city: "Seoul",         flag: "🇰🇷", ping: 74,  ip: "45.129.6.88"   },
    { name: "South Korea", city: "Busan",         flag: "🇰🇷", ping: 78,  ip: "45.129.7.92"   },
    { name: "Hong Kong", city: "Hong Kong",       flag: "🇭🇰", ping: 55,  ip: "118.184.15.6"  },
    { name: "Sweden", city: "Stockholm",          flag: "🇸🇪", ping: 41,  ip: "193.42.16.9"   },
    { name: "Switzerland", city: "Zurich",        flag: "🇨🇭", ping: 34,  ip: "193.42.17.13"  },
    { name: "Italy", city: "Milan",               flag: "🇮🇹", ping: 38,  ip: "91.209.44.8"   },
    { name: "Italy", city: "Rome",                flag: "🇮🇹", ping: 44,  ip: "91.209.45.16"  },
    { name: "Spain", city: "Madrid",              flag: "🇪🇸", ping: 40,  ip: "91.209.46.24"  },
    { name: "Spain", city: "Barcelona",           flag: "🇪🇸", ping: 42,  ip: "91.209.47.32"  },
    { name: "Norway", city: "Oslo",               flag: "🇳🇴", ping: 47,  ip: "193.42.18.21"  },
    { name: "Denmark", city: "Copenhagen",        flag: "🇩🇰", ping: 43,  ip: "193.42.19.28"  },
    { name: "Belgium", city: "Brussels",          flag: "🇧🇪", ping: 32,  ip: "92.246.190.35" },
    { name: "Ireland", city: "Dublin",            flag: "🇮🇪", ping: 22,  ip: "91.209.48.40"  },
    { name: "Mexico", city: "Mexico City",        flag: "🇲🇽", ping: 66,  ip: "177.55.142.9"  },
    { name: "Poland", city: "Warsaw",             flag: "🇵🇱", ping: 45,  ip: "91.209.49.48"  },
    { name: "U.A.E.", city: "Dubai",              flag: "🇦🇪", ping: 96,  ip: "185.22.154.12" },
    { name: "South Africa", city: "Johannesburg", flag: "🇿🇦", ping: 138, ip: "41.193.24.9"   },
    { name: "Argentina", city: "Buenos Aires",    flag: "🇦🇷", ping: 124, ip: "177.56.143.11" },
    { name: "Turkey", city: "Istanbul",           flag: "🇹🇷", ping: 70,  ip: "185.22.155.21" },
    { name: "Ukraine", city: "Kyiv",              flag: "🇺🇦", ping: 52,  ip: "185.22.156.30" },
    { name: "Czechia", city: "Prague",            flag: "🇨🇿", ping: 37,  ip: "91.209.50.56"  },
    { name: "Austria", city: "Vienna",            flag: "🇦🇹", ping: 35,  ip: "91.209.51.64"  },
    { name: "Portugal", city: "Lisbon",           flag: "🇵🇹", ping: 46,  ip: "91.209.52.72"  },
    { name: "Finland", city: "Helsinki",          flag: "🇫🇮", ping: 50,  ip: "193.42.20.35"  },
    { name: "New Zealand", city: "Auckland",      flag: "🇳🇿", ping: 142, ip: "27.111.80.173" },
    { name: "Thailand", city: "Bangkok",          flag: "🇹🇭", ping: 84,  ip: "128.106.77.25" },
    { name: "Vietnam", city: "Hanoi",             flag: "🇻🇳", ping: 88,  ip: "128.106.78.38" },
    { name: "Malaysia", city: "Kuala Lumpur",     flag: "🇲🇾", ping: 76,  ip: "128.106.79.44" },
    { name: "Indonesia", city: "Jakarta",         flag: "🇮🇩", ping: 82,  ip: "128.106.80.51" },
    { name: "Philippines", city: "Manila",        flag: "🇵🇭", ping: 92,  ip: "128.106.81.63" },
    { name: "Russia", city: "Moscow",             flag: "🇷🇺", ping: 58,  ip: "185.22.157.39" },
    { name: "Egypt", city: "Cairo",               flag: "🇪🇬", ping: 108, ip: "185.22.158.47" },
    { name: "Nigeria", city: "Lagos",             flag: "🇳🇬", ping: 132, ip: "41.193.25.12"  },
    { name: "Kenya", city: "Nairobi",             flag: "🇰🇪", ping: 146, ip: "41.193.26.15"  },
    { name: "Israel", city: "Tel Aviv",           flag: "🇮🇱", ping: 72,  ip: "185.22.159.55" },
    { name: "Saudi Arabia", city: "Riyadh",       flag: "🇸🇦", ping: 98,  ip: "185.22.160.63" }
];

/* ---------- State ---------- */
const state = {
    connected: false,
    connecting: false,
    server: { ...SERVERS[0] },
    sessionSeconds: 0,
    timerId: null,
    statsId: null,
    graphId: null,
    connectTimeout: null,
    dataUsed: 0    // MB
};

/* ---------- DOM refs ---------- */
const $ = (id) => document.getElementById(id);

const powerBtn        = $("power-btn");
const statusRing      = $("status-ring");
const statusText      = $("status-text");
const statusHint      = $("status-hint");
const virtualIp       = $("virtual-ip");
const currentLocation = $("current-location");
const currentPing     = $("current-ping");
const bannerProtocol  = $("banner-protocol");

const dropdown        = $("server-dropdown");
const serverSelected  = $("server-selected");
const serverList      = $("server-list");
const serverSearch    = $("server-search");
const serverName      = $("server-name");
const serverCity      = $("server-city");
const selectedPing    = $("selected-ping");
const assignedIp      = $("assigned-ip");
const serverCount     = $("server-count");

const downloadSpeed   = $("download-speed");
const uploadSpeed     = $("upload-speed");
const downloadTrend   = $("download-trend");
const uploadTrend     = $("upload-trend");
const sessionTime     = $("session-time");
const sessionInd      = $("session-indicator");
const protocolSelect  = $("protocol-select");
const protocolRec     = $("protocol-recommended");
const dataUsedEl      = $("data-used");

const toast           = $("toast");
const toastIcon       = $("toast-icon");
const toastMsg        = $("toast-msg");

const trafficCanvas   = $("traffic-canvas");
const logBody         = $("log-body");
const logCount        = $("log-count");
const clearLogBtn     = $("clear-log");

const themeDots       = document.querySelectorAll(".theme-dot");

/* ---------- Helpers ---------- */
function pad(n) { return String(n).padStart(2, "0"); }

function formatTime(totalSec) {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function randomIp() {
    return `${103 + Math.floor(Math.random() * 80)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${2 + Math.floor(Math.random() * 250)}`;
}

function randBetween(min, max, decimals = 1) {
    return (Math.random() * (max - min) + min).toFixed(decimals);
}

/* ---------- Server list rendering ---------- */
function renderServers(filter = "") {
    serverList.innerHTML = "";
    const term = filter.trim().toLowerCase();
    const matches = SERVERS.filter((s) =>
        !term || s.name.toLowerCase().includes(term) || s.city.toLowerCase().includes(term)
    );

    if (matches.length === 0) {
        const empty = document.createElement("li");
        empty.className = "server-option server-empty";
        empty.textContent = "No servers match your search";
        serverList.appendChild(empty);
        return;
    }

    matches.forEach((s) => {
        const isActive = s.city === state.server.city && s.name === state.server.name;
        const li = document.createElement("li");
        li.className = "server-option" + (isActive ? " active" : "");
        li.dataset.name = s.name;
        li.dataset.city = s.city;
        li.dataset.flag = s.flag;
        li.dataset.ping = s.ping;
        li.dataset.ip = s.ip;
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", isActive ? "true" : "false");

        li.innerHTML = `
            <span class="server-flag">${s.flag}</span>
            <span class="server-meta">
                <span class="server-name">${s.city}</span>
                <span class="server-city">${s.name}</span>
            </span>
            <span class="ping-pill">${s.ping} ms</span>
        `;

        li.addEventListener("click", () => selectServer(li));
        serverList.appendChild(li);
    });
}

/* ---------- Server selection ---------- */
function selectServer(el) {
    if (state.connected) {
        showToast("Disconnect before changing server", "⚠️");
        closeDropdown();
        return;
    }

    state.server.name = el.dataset.name;
    state.server.city = el.dataset.city;
    state.server.flag = el.dataset.flag;
    state.server.ping = parseInt(el.dataset.ping, 10);
    state.server.ip = el.dataset.ip;

    serverName.textContent = state.server.city;
    serverCity.textContent = state.server.name;
    selectedPing.textContent = `${state.server.ping} ms`;
    document.querySelector("#server-selected .server-flag").textContent = state.server.flag;

    serverList.querySelectorAll(".server-option").forEach((opt) => {
        const isActive = opt.dataset.city === state.server.city && opt.dataset.name === state.server.name;
        opt.classList.toggle("active", isActive);
        opt.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    virtualIp.textContent = state.server.ip;
    assignedIp.textContent = state.server.ip;
    currentLocation.textContent = `${state.server.flag} ${state.server.city}, ${state.server.name}`;
    currentPing.textContent = `${state.server.ping} ms`;

    closeDropdown();
    showToast(`${state.server.flag} ${state.server.city}, ${state.server.name} selected`, "📍");
    addLog("info", `Server changed to ${state.server.city}, ${state.server.name}`);
}

/* ---------- Quick connect (fastest server) ---------- */
function quickConnect() {
    const fastest = SERVERS.reduce((a, b) => (a.ping < b.ping ? a : b));
    // Find the corresponding list item
    const opt = Array.from(serverList.querySelectorAll(".server-option")).find(
        (li) => li.dataset.city === fastest.city && li.dataset.name === fastest.name
    );
    if (opt) {
        selectServer(opt);
        showToast(`⚡ Quick connect to ${fastest.city}, ${fastest.name} (${fastest.ping}ms)`, "⚡");
    } else {
        // Fallback: directly select
        state.server = { ...fastest };
        serverName.textContent = fastest.city;
        serverCity.textContent = fastest.name;
        selectedPing.textContent = `${fastest.ping} ms`;
        document.querySelector("#server-selected .server-flag").textContent = fastest.flag;
        virtualIp.textContent = fastest.ip;
        assignedIp.textContent = fastest.ip;
        currentLocation.textContent = `${fastest.flag} ${fastest.city}, ${fastest.name}`;
        currentPing.textContent = `${fastest.ping} ms`;
        renderServers();
        showToast(`⚡ Fastest server: ${fastest.city}, ${fastest.name} (${fastest.ping}ms)`, "⚡");
        addLog("info", `Quick connect to ${fastest.city}, ${fastest.name}`);
    }
    closeDropdown();
}

/* ---------- Dropdown open/close ---------- */
function toggleDropdown() {
    const isOpen = dropdown.classList.toggle("open");
    serverSelected.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (isOpen) {
        renderServers(serverSearch.value);
        setTimeout(() => serverSearch.focus(), 60);
    }
}

function closeDropdown() {
    dropdown.classList.remove("open");
    serverSelected.setAttribute("aria-expanded", "false");
}

serverSelected.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown();
});

serverSearch.addEventListener("input", () => renderServers(serverSearch.value));

document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) closeDropdown();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDropdown();
});

/* ---------- Connection toggle ---------- */
powerBtn.addEventListener("click", toggleConnection);

function toggleConnection() {
    if (state.connecting) return;
    state.connected ? disconnectVPN() : connectVPN();
}

function connectVPN() {
    state.connecting = true;

    setRingState("connecting");
    statusText.textContent = "Connecting...";
    statusText.dataset.state = "connecting";
    statusHint.textContent = "Establishing encrypted tunnel";
    powerBtn.setAttribute("aria-label", "Connecting VPN");

    sessionTime.textContent = "00:00:00";
    state.sessionSeconds = 0;
    state.dataUsed = 0;
    dataUsedEl.innerHTML = `0.0 <small>MB</small>`;
    downloadSpeed.innerHTML = `<small>0.0</small> Mbps`;
    uploadSpeed.innerHTML = `<small>0.0</small> Mbps`;
    downloadTrend.textContent = "…";
    uploadTrend.textContent = "…";
    downloadTrend.classList.remove("up");
    uploadTrend.classList.remove("up");

    showToast("Connecting…", "⏳");
    addLog("connect", "Initiating secure connection…");

    state.connectTimeout = setTimeout(() => {
        state.connecting = false;
        state.connected = true;

        const newIp = randomIp();
        state.server.ip = newIp;
        virtualIp.textContent = newIp;
        assignedIp.textContent = newIp;

        setRingState("connected");
        statusText.textContent = "Protected & Encrypted";
        statusText.dataset.state = "connected";
        statusHint.textContent = "VPN active • traffic encrypted";
        powerBtn.setAttribute("aria-label", "Disconnect VPN");
        sessionInd.dataset.live = "on";

        startTimer();
        startStats();
        startTrafficGraph();

        showToast(`Connected to ${state.server.city}, ${state.server.name}`, "🔒");
        addLog("connected", `Connected to ${state.server.city}, ${state.server.name} via ${protocolSelect.value}`);
    }, 2200);
}

function disconnectVPN() {
    state.connected = false;
    state.connecting = false;
    clearTimeout(state.connectTimeout);
    stopTimer();
    stopStats();
    stopTrafficGraph();

    setRingState("off");
    statusText.textContent = "Disconnected";
    statusText.dataset.state = "off";
    statusHint.textContent = "Tap to connect securely";
    powerBtn.setAttribute("aria-label", "Connect VPN");
    sessionInd.dataset.live = "off";

    sessionTime.textContent = "00:00:00";
    state.sessionSeconds = 0;
    downloadSpeed.innerHTML = `0.0 <small>Mbps</small>`;
    uploadSpeed.innerHTML = `0.0 <small>Mbps</small>`;
    downloadTrend.textContent = "—";
    uploadTrend.textContent = "—";
    downloadTrend.classList.remove("up");
    uploadTrend.classList.remove("up");

    virtualIp.textContent = state.server.ip;
    assignedIp.textContent = state.server.ip;

    showToast("VPN disconnected", "🛑");
    addLog("disconnect", "Disconnected from VPN");
}

function setRingState(s) { statusRing.dataset.state = s; }

/* ---------- Session timer ---------- */
function startTimer() {
    stopTimer();
    state.timerId = setInterval(() => {
        state.sessionSeconds++;
        sessionTime.textContent = formatTime(state.sessionSeconds);
    }, 1000);
}

function stopTimer() { clearInterval(state.timerId); state.timerId = null; }

/* ---------- Live speed simulation ---------- */
function startStats() {
    stopStats();
    state.statsId = setInterval(() => {
        const dl = parseFloat(randBetween(120, 165));
        const ul = parseFloat(randBetween(70, 98));
        downloadSpeed.innerHTML = `${dl.toFixed(1)} <small>Mbps</small>`;
        uploadSpeed.innerHTML = `${ul.toFixed(1)} <small>Mbps</small>`;

        const dir = () => (Math.random() > 0.5 ? "▲" : "▼");
        downloadTrend.textContent = `${dir()} ${randBetween(0.1, 4.5, 1)}%`;
        uploadTrend.textContent = `${dir()} ${randBetween(0.1, 3.8, 1)}%`;
        downloadTrend.classList.add("up");
        uploadTrend.classList.add("up");

        // Accumulate data usage (rough: avg 140 Mbps dl + 85 Mbps ul = 225 Mbps, ~28 MB/s)
        state.dataUsed += 28;
        const mb = state.dataUsed;
        if (mb >= 1024) {
            dataUsedEl.innerHTML = `${(mb / 1024).toFixed(1)} <small>GB</small>`;
        } else {
            dataUsedEl.innerHTML = `${mb.toFixed(0)} <small>MB</small>`;
        }
    }, 1600);
}

function stopStats() { clearInterval(state.statsId); state.statsId = null; }

/* ---------- Traffic graph (canvas) ---------- */
let trafficData = { dl: [], ul: [] };
const MAX_POINTS = 50;

function initTrafficCanvas() {
    if (!trafficCanvas) return;
    trafficCanvas.width = trafficCanvas.offsetWidth;
    trafficCanvas.height = trafficCanvas.offsetHeight;
}

function startTrafficGraph() {
    stopTrafficGraph();
    trafficData.dl = Array(MAX_POINTS).fill(0);
    trafficData.ul = Array(MAX_POINTS).fill(0);
    state.graphId = setInterval(() => {
        const dl = parseFloat(randBetween(120, 165));
        const ul = parseFloat(randBetween(70, 98));
        trafficData.dl.push(dl);
        trafficData.ul.push(ul);
        if (trafficData.dl.length > MAX_POINTS) trafficData.dl.shift();
        if (trafficData.ul.length > MAX_POINTS) trafficData.ul.shift();
        drawTrafficGraph();
    }, 1000);
}

function stopTrafficGraph() {
    clearInterval(state.graphId);
    state.graphId = null;
    if (trafficCanvas) {
        const ctx = trafficCanvas.getContext("2d");
        ctx.clearRect(0, 0, trafficCanvas.width, trafficCanvas.height);
    }
}

function drawTrafficGraph() {
    if (!trafficCanvas || !state.connected) return;
    const ctx = trafficCanvas.getContext("2d");
    const w = trafficCanvas.width;
    const h = trafficCanvas.height;
    ctx.clearRect(0, 0, w, h);

    const maxVal = 200;
    const len = trafficData.dl.length;
    if (len < 2) return;

    const drawLine = (data, color, fillColor) => {
        ctx.beginPath();
        for (let i = 0; i < len; i++) {
            const x = (i / (len - 1)) * w;
            const y = h - (Math.min(data[i], maxVal) / maxVal) * h;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Fill
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();
    };

    drawLine(trafficData.dl, "#22d3ee", "rgba(34, 211, 238, 0.08)");
    drawLine(trafficData.ul, "#a855f7", "rgba(168, 85, 247, 0.08)");
}

/* ---------- Protocol selector ---------- */
protocolSelect.addEventListener("change", () => {
    const map = {
        wireguard: ["WireGuard", "Best"],
        openvpn: ["OpenVPN", "Stable"],
        ikev2: ["IKEv2", "Compat"]
    };
    const [label, badge] = map[protocolSelect.value];
    protocolRec.textContent = badge;
    bannerProtocol.textContent = label;
    showToast(`${label} active`, "🔐");
    addLog("protocol", `Switched to ${label}`);
});

/* ---------- Activity Log ---------- */
const logEntries = [];

function addLog(type, msg) {
    const icons = {
        info: "ℹ️",
        connect: "🔗",
        connected: "🔒",
        disconnect: "🛑",
        protocol: "🔐",
        theme: "🎨"
    };
    const icon = icons[type] || "ℹ️";
    const now = new Date();
    const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    logEntries.unshift({ time, icon, msg });
    renderLog();
    if (logEntries.length > 50) logEntries.pop();
}

function renderLog() {
    if (logEntries.length === 0) {
        logBody.innerHTML = `<div class="log-empty">No events yet. Connect to start logging.</div>`;
        logCount.textContent = "0 events";
        return;
    }
    logBody.innerHTML = logEntries.slice(0, 20).map((e) => `
        <div class="log-entry">
            <span class="log-time">${e.time}</span>
            <span class="log-icon">${e.icon}</span>
            <span class="log-msg">${e.msg}</span>
        </div>
    `).join("");
    logCount.textContent = `${logEntries.length} event${logEntries.length !== 1 ? "s" : ""}`;
}

clearLogBtn.addEventListener("click", () => {
    logEntries.length = 0;
    renderLog();
    showToast("Log cleared", "🗑️");
});

/* ---------- Theme switcher ---------- */
themeDots.forEach((dot) => {
    dot.addEventListener("click", () => {
        const theme = dot.dataset.theme;
        document.body.dataset.theme = theme;
        themeDots.forEach((d) => d.classList.remove("active"));
        dot.classList.add("active");
        addLog("theme", `Theme changed to ${theme.charAt(0).toUpperCase() + theme.slice(1)}`);
    });
});

/* ---------- Quick connect button ---------- */
document.getElementById("quick-connect").addEventListener("click", quickConnect);

/* ---------- Toast ---------- */
let toastTimeout;

function showToast(msg, icon = "🔒") {
    clearTimeout(toastTimeout);
    toastMsg.textContent = msg;
    toastIcon.textContent = icon;
    toast.classList.add("show");
    toastTimeout = setTimeout(() => toast.classList.remove("show"), 2600);
}

/* ---------- Init ---------- */
const countryCount = new Set(SERVERS.map((s) => s.name)).size;
serverCount.textContent = `${countryCount} countries • ${SERVERS.length} cities`;

document.querySelector("#server-selected .server-flag").textContent = state.server.flag;
serverName.textContent = state.server.city;
serverCity.textContent = state.server.name;
selectedPing.textContent = `${state.server.ping} ms`;
virtualIp.textContent = state.server.ip;
assignedIp.textContent = state.server.ip;
currentLocation.textContent = `${state.server.flag} ${state.server.city}, ${state.server.name}`;
currentPing.textContent = `${state.server.ping} ms`;
bannerProtocol.textContent = "WireGuard";

renderServers();
initTrafficCanvas();
addLog("info", "Dashboard loaded — ready to connect");

// Redraw canvas on resize
window.addEventListener("resize", () => {
    initTrafficCanvas();
    drawTrafficGraph();
});
