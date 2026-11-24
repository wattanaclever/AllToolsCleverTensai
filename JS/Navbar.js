// =========================================================================
// CLEVERTENSAI — JS/Navbar.js (ศูนย์รวม Navbar & All Web Apps Hub)
// =========================================================================
(function () {
    // 1. ตรวจจับตำแหน่งโฟลเดอร์และหน้าปัจจุบันอัตโนมัติ
    const isSubFolder = window.location.pathname.includes("/PDF/");
    const basePath = isSubFolder ? "../" : "";
    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    const isIndexPage = (currentFile === "index.html" || currentFile === "index_2.html" || currentFile === "index_3.html" || currentFile === "");

    // =====================================================================
    // [จุดวางข้อมูล] ก๊อปปี้โค้ด WEB_APPS จากหน้า index.html มาวางทับส่วนนี้ได้เลย
    // =====================================================================
    let WEB_APPS = [
        {
            "id": "webapp-pdf",
            "title": "PDF Studio Suite",
            "category": "DOCUMENT",
            "version": "v1.0",
            "description": "ระบบจัดการเอกสาร PDF ครบวงจร รวมไฟล์เอกสารหลายหน้า แยกหน้าตัดเฉพาะส่วน และแก้ไขเขียนข้อความลงบนไฟล์ PDF",
            "url": "./PDF/HomePDF.html",
            "image": "",
            "previewType": "pdf",
            "icon": "fa-solid fa-file-pdf",
            "tags": ["Merge PDF", "Split PDF", "Edit PDF"]
        },
        {
            "id": "webapp-excel",
            "title": "Excel Unlock Pro",
            "category": "SECURITY",
            "version": "v1.0",
            "description": "ปลดล็อกรหัสผ่านแผ่นงาน (Worksheet) และสมุดงาน (Workbook) สำหรับไฟล์ Excel (.xlsx, .xlsm) อย่างรวดเร็วโดยข้อมูลไม่สูญหาย",
            "url": "HomeExcelUnlock.html",
            "image": "",
            "previewType": "excel",
            "icon": "fa-solid fa-file-excel",
            "tags": ["Unlock Sheet", "Remove Password", ".XLSX / .XLSM"]
        },
        {
            "id": "webapp-qr",
            "title": "QR Code Generator",
            "category": "UTILITY",
            "version": "v1.0",
            "description": "สร้างคิวอาร์โค้ดความคมชัดสูงสำหรับ URL, ข้อความ, Wi-Fi หรือพร้อมเพย์ พร้อมปรับแต่งสีและดาวน์โหลดไฟล์ PNG/SVG ทันที",
            "url": "HomeQRcode.html",
            "image": "",
            "previewType": "qr",
            "icon": "fa-solid fa-qrcode",
            "tags": ["Custom QR", "High-Res PNG", "Instant Vector"]
        },
        {
            "id": "webapp-unit",
            "title": "Unit Converter Suite",
            "category": "UTILITY",
            "version": "v1.0",
            "description": "ระบบแปลงมาตราวัดอเนกประสงค์ 12 หมวดหมู่ ครอบคลุมทั้งหน่วยสากลและมาตราไทย (ซม.-นิ้ว, ไร่-งาน-วา, บาททองคำ, อุณหภูมิ, พื้นที่) พร้อมตารางเทียบค่าแบบเรียลไทม์",
            "url": "UnitConverter.html",
            "image": "",
            "previewType": "unit",
            "icon": "fa-solid fa-ruler-combined",
            "tags": ["12 หมวดมาตราวัด", "หน่วยสากล & ไทย", "Real-Time Matrix"]
        },
        {
            "id": "webapp-color",
            "title": "Color Mixer & Formula Studio",
            "category": "DESIGN & LAB",
            "version": "v1.0",
            "description": "สตูดิโอผสมสีและคำนวณสูตรแม่สีทดแทน รองรับ 12 ระบบสี (CMYK, HEX, RGB, LAB, OKLCH) คลังสี 240 เฉด พร้อมระบบคำนวณสูตรจากสีเป้าหมายและใบพิมพ์สูตร",
            "url": "HomeMixColor.html",
            "image": "",
            "previewType": "color",
            "icon": "fa-solid fa-droplet",
            "tags": ["12 ระบบสี", "คลังสี 240 เฉด", "Formula Solver"]
        }
    ];
    // =====================================================================

    // ดึงข้อมูลล่าสุดจาก localStorage (กรณีแก้ไขผ่านโหมด Admin ในหน้า index)
    try {
        const saved = localStorage.getItem("clevertensai_portal_apps_v2");
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                WEB_APPS = parsed;
            }
        }
    } catch (e) {}

    // 2. หาข้อมูลของหน้าปัจจุบันเพื่อเปลี่ยนไอคอนและข้อความใต้โลโก้อัตโนมัติ
    const currentApp = WEB_APPS.find(app => {
        const cleanUrl = (app.url || "").replace(/^\.\//, "");
        return cleanUrl.split("/").pop() === currentFile;
    });

    const navIcon = currentApp ? (currentApp.icon || "fa-solid fa-cubes") : "fa-solid fa-cubes";
    const navSubtitle = currentApp
        ? `${(currentApp.category || "WEBAPP").toUpperCase()} STUDIO`
        : "WEBAPP PORTAL";

    // 3. ปุ่มฝั่งขวาของ Navbar (แยกหน้า index กับหน้าย่อย)
    const rightControlsHtml = isIndexPage ? `
        <button id="navAdminLoginBtn" type="button" onclick="openAdminLoginModal()"
            class="px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-red-600/20 border border-gray-700 hover:border-red-500/60 text-gray-200 hover:text-white font-mono text-xs flex items-center gap-2 transition-all cursor-pointer">
            <i class="fa-solid fa-shield-halved text-red-500"></i>
            <span>เข้าสู่ระบบ Admin</span>
        </button>

        <div id="navAdminControls" class="items-center gap-2 hidden">
            <span class="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-600/20 border border-red-500/40 text-red-400 font-mono text-[11px] font-bold">
                <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                ADMIN MODE
            </span>
            <button type="button" onclick="openCardEditorModal(-1)"
                class="px-3 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-red-500/60 text-white font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer">
                <i class="fa-solid fa-plus text-red-500"></i>
                <span class="hidden md:inline">เพิ่มการ์ดใหม่</span>
            </button>
            <button type="button" onclick="savePermanentHtmlFile()"
                class="px-3 py-2 rounded-xl bg-crimson-500 hover:bg-crimson-600 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer">
                <i class="fa-solid fa-file-arrow-down"></i>
                <span class="hidden md:inline">Save As ไฟล์โค้ดถาวร</span>
            </button>
            <button type="button" onclick="logoutAdmin()"
                class="px-3 py-2 rounded-xl bg-gray-900 hover:bg-red-950 border border-gray-700 hover:border-red-500/50 text-gray-300 hover:text-red-300 font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer">
                <i class="fa-solid fa-right-from-bracket"></i>
                <span class="hidden xl:inline">ออกจากระบบ</span>
            </button>
        </div>
    ` : `
        <span class="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-900 border border-gray-800 text-emerald-400 font-mono text-[11px]">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            100% CLIENT-SIDE
        </span>
        <a href="${basePath}index.html"
            class="px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-red-600/20 border border-gray-700 hover:border-red-500/60 text-gray-200 hover:text-white font-mono text-xs flex items-center gap-2 transition-all">
            <i class="fa-solid fa-house text-red-500"></i>
            <span class="hidden sm:inline">หน้าหลัก Portal</span>
        </a>
    `;

    // 4. สร้าง HTML ของ Navbar และ Hub Modal
    const navbarHtml = `
        <nav class="bg-gray-950 border-b border-gray-800 h-16 flex-shrink-0 z-40 px-4 sm:px-6 flex items-center justify-between font-sans text-xs text-white sticky top-0">
            <div class="flex items-center gap-3">
                <a href="${basePath}index.html" class="flex items-center gap-2.5 group">
                    <div class="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:bg-crimson-500 transition-colors">
                        <i class="${navIcon}"></i>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-base font-extrabold tracking-wider leading-none">
                            CLEVER<span class="text-red-500">TENSAI</span>
                        </span>
                        <span class="font-mono text-[10px] text-gray-400 tracking-widest mt-0.5">${navSubtitle}</span>
                    </div>
                </a>
            </div>

            <div class="hidden sm:block absolute left-1/2 transform -translate-x-1/2">
                <button type="button" onclick="toggleNavPopup()"
                    class="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-red-500/50 rounded-full font-bold flex items-center gap-2.5 text-gray-100 transition-all shadow-md group text-sm cursor-pointer">
                    <i class="fa-solid fa-grip text-red-500 group-hover:scale-110 transition-transform"></i>
                    <span>All Web Apps Hub</span>
                    <i class="fa-solid fa-chevron-down text-xs text-gray-400"></i>
                </button>
            </div>

            <div class="flex items-center gap-2 sm:gap-2.5">
                <button type="button" onclick="toggleNavPopup()"
                    class="sm:hidden px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl font-bold flex items-center gap-1.5 text-gray-100 text-xs cursor-pointer">
                    <i class="fa-solid fa-grip text-red-500"></i>
                    <span>Hub</span>
                </button>
                ${rightControlsHtml}
            </div>
        </nav>

        <!-- ALL WEB APPS HUB MODAL -->
        <div id="navPopupModal" onclick="if (event.target === this) toggleNavPopup()"
            class="hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
            <div class="bg-gray-900 border-2 border-gray-800 rounded-3xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl relative text-white font-sans max-h-[90vh] flex flex-col">
                <div class="flex items-center justify-between pb-6 border-b border-gray-800 shrink-0">
                    <div class="flex items-center gap-3.5">
                        <div class="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center text-2xl border border-red-500/30">
                            <i class="fa-solid fa-grip"></i>
                        </div>
                        <div>
                            <h3 class="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
                                Select Web Application
                            </h3>
                            <p class="text-sm text-gray-400 mt-0.5">สลับไปยังเว็บแอปพลิเคชันภายใน CLEVERTENSAI ได้ทันที</p>
                        </div>
                    </div>

                    <button type="button" onclick="toggleNavPopup()"
                        class="w-12 h-12 rounded-2xl bg-gray-800 hover:bg-red-600/20 border border-gray-700 hover:border-red-500/50 text-gray-400 hover:text-red-400 flex items-center justify-center transition-all text-xl cursor-pointer">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div id="hubModalGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 py-6 overflow-y-auto"></div>
            </div>
        </div>
    `;

    // 5. แสดงผล Navbar ลงในจุดที่กำหนด
    const container = document.getElementById("navbar-container");
    if (container) {
        container.innerHTML = navbarHtml;
    }

    // 6. สร้างการ์ดภายใน Modal
    window.renderGlobalHubCards = function (appsList = WEB_APPS) {
        const hubModalGrid = document.getElementById("hubModalGrid");
        if (!hubModalGrid) return;

        const portalCard = isIndexPage ? "" : `
            <a href="${basePath}index.html"
                class="p-5 rounded-2xl bg-gray-800/60 hover:bg-red-600/15 border-2 border-gray-800 hover:border-red-500/60 transition-all flex flex-col items-center text-center group shadow-lg">
                <div class="w-14 h-14 rounded-2xl bg-red-600/20 text-red-500 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center text-2xl mb-3 transition-all duration-200 group-hover:scale-110 shadow-md">
                    <i class="fa-solid fa-cubes"></i>
                </div>
                <span class="font-extrabold text-base text-gray-100 group-hover:text-red-400 tracking-wide">Main Portal</span>
                <span class="text-xs text-gray-400 mt-1.5 font-medium leading-relaxed line-clamp-2">กลับสู่หน้ารวมเว็บแอปพลิเคชันทั้งหมด</span>
            </a>
        `;

        const appCards = appsList.map(app => {
            const cleanUrl = (app.url || "#").replace(/^\.\//, "");
            const finalUrl = basePath + cleanUrl;
            const isCurrent = (!isIndexPage && currentFile === cleanUrl.split("/").pop());

            if (isCurrent) {
                return `
                    <a href="${finalUrl}"
                        class="p-5 rounded-2xl bg-red-600/15 border-2 border-red-500/60 transition-all flex flex-col items-center text-center group shadow-lg">
                        <div class="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center text-2xl mb-3 shadow-md">
                            <i class="${app.icon || "fa-solid fa-cube"}"></i>
                        </div>
                        <span class="font-extrabold text-base text-red-400 tracking-wide">${app.title}</span>
                        <span class="text-xs text-gray-300 mt-1.5 font-medium leading-relaxed">กำลังใช้งานอยู่ขณะนี้</span>
                    </a>
                `;
            }

            return `
                <a href="${finalUrl}"
                    class="p-5 rounded-2xl bg-gray-800/60 hover:bg-red-600/15 border-2 border-gray-800 hover:border-red-500/60 transition-all flex flex-col items-center text-center group shadow-lg">
                    <div class="w-14 h-14 rounded-2xl bg-red-600/20 text-red-500 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center text-2xl mb-3 transition-all duration-200 group-hover:scale-110 shadow-md">
                        <i class="${app.icon || "fa-solid fa-cube"}"></i>
                    </div>
                    <span class="font-extrabold text-base text-gray-100 group-hover:text-red-400 tracking-wide">${app.title}</span>
                    <span class="text-xs text-gray-400 mt-1.5 font-medium leading-relaxed line-clamp-2">${app.description || ""}</span>
                </a>
            `;
        }).join("");

        hubModalGrid.innerHTML = portalCard + appCards;
    };

    window.toggleNavPopup = function () {
        const modal = document.getElementById("navPopupModal");
        if (modal) modal.classList.toggle("hidden");
    };

    window.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            const navModal = document.getElementById("navPopupModal");
            if (navModal && !navModal.classList.contains("hidden")) {
                navModal.classList.add("hidden");
            }
        }
    });

    window.renderGlobalHubCards();
})();
