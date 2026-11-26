// =========================================================================
// CLEVERTENSAI — JS/Navbar.js (Minimal Luxury Fixed Top Navbar & Apps Hub)
// =========================================================================
(function () {
    // 1. ตรวจจับตำแหน่งโฟลเดอร์และหน้าปัจจุบันอัตโนมัติ
    const isSubFolder = window.location.pathname.includes("/PDF/");
    const basePath = isSubFolder ? "../" : "";
    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    const isIndexPage = (
        currentFile === "index.html" ||
        currentFile === "index_2.html" ||
        currentFile === "index_3.html" ||
        currentFile === ""
    );

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
    const centerLabel = (!isIndexPage && currentApp) ? currentApp.title : "All Web Apps";
    const centerIcon = (!isIndexPage && currentApp) ? (currentApp.icon || "fa-solid fa-grip") : "fa-solid fa-grip";

    // แทรก Micro-CSS สำหรับแอนิเมชันนุ่มนวลและผิวสัมผัส Minimal Luxury
    if (!document.getElementById("ct-navbar-global-style")) {
        const styleEl = document.createElement("style");
        styleEl.id = "ct-navbar-global-style";
        styleEl.textContent = `
            @keyframes ctLuxModalIn {
                from { opacity: 0; transform: translateY(6px) scale(0.985); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            .ct-lux-modal {
                animation: ctLuxModalIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .ct-lux-active-card {
                background: linear-gradient(145deg, rgba(255, 30, 66, 0.12), rgba(255, 255, 255, 0.02));
                border-color: rgba(255, 30, 66, 0.45) !important;
            }
            .ct-lux-scroll::-webkit-scrollbar { width: 5px; }
            .ct-lux-scroll::-webkit-scrollbar-track { background: transparent; }
            .ct-lux-scroll::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.14); border-radius: 999px; }
            .ct-lux-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255, 30, 66, 0.6); }
        `;
        document.head.appendChild(styleEl);
    }

    // 3. ปุ่มฝั่งขวาของ Navbar (แยกหน้า index กับหน้าย่อย — ปุ่มใหญ่ขึ้นและคลีน)
    const rightControlsHtml = isIndexPage ? `
        <button id="navAdminLoginBtn" type="button" onclick="openAdminLoginModal()"
            class="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white font-medium text-xs sm:text-[13px] flex items-center gap-2 transition-all cursor-pointer">
            <i class="fa-solid fa-shield-halved text-red-500/90 text-xs"></i>
            <span class="hidden sm:inline">Admin</span>
        </button>

        <div id="navAdminControls" class="items-center gap-2 hidden">
            <span class="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[11px] font-semibold tracking-wider">
                <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                ADMIN
            </span>
            <button type="button" onclick="openCardEditorModal(-1)"
                class="px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-white font-medium text-xs flex items-center gap-2 transition-all cursor-pointer"
                title="เพิ่มการ์ดใหม่">
                <i class="fa-solid fa-plus text-red-500"></i>
                <span class="hidden md:inline">เพิ่มการ์ด</span>
            </button>
            <button type="button" onclick="savePermanentHtmlFile()"
                class="px-3.5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                title="Save As ไฟล์โค้ดถาวร">
                <i class="fa-solid fa-file-arrow-down"></i>
                <span class="hidden md:inline">บันทึกถาวร</span>
            </button>
            <button type="button" onclick="logoutAdmin()"
                class="px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-red-500/15 border border-white/10 hover:border-red-500/40 text-gray-300 hover:text-red-300 font-medium text-xs flex items-center gap-2 transition-all cursor-pointer"
                title="ออกจากระบบ">
                <i class="fa-solid fa-right-from-bracket"></i>
                <span class="hidden xl:inline">ออก</span>
            </button>
        </div>
    ` : `
        <a href="${basePath}index.html"
            class="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white font-medium text-xs sm:text-[13px] flex items-center gap-2 transition-all"
            title="กลับสู่หน้าหลัก CLEVERTENSAI Portal">
            <i class="fa-solid fa-house text-red-500/90 text-xs"></i>
            <span class="hidden sm:inline">หน้าหลัก Portal</span>
        </a>
    `;

    // 4. สร้าง HTML ของ Fixed Top Navbar + Smart Spacer + Minimal Luxury Hub Modal
    const navbarHtml = `
        <!-- Smart Spacer: ดันพื้นที่ด้านบนพอดี h-16 (64px) ป้องกัน Navbar ทับเนื้อหา -->
        <div class="h-16 w-full shrink-0" aria-hidden="true"></div>

        <!-- MINIMAL LUXURY FIXED TOP NAVBAR -->
        <nav class="fixed top-0 inset-x-0 z-50 h-16 bg-[#0B0D12]/85 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-7 flex items-center justify-between font-sans text-white">

            <!-- ฝั่งซ้าย: โลโก้เรียบหรู -->
            <div class="flex items-center min-w-0">
                <a href="${basePath}index.html" class="flex items-center gap-3 group shrink-0" title="กลับสู่หน้าหลัก CLEVERTENSAI Portal">
                    <div class="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-red-500/50 flex items-center justify-center text-red-500 text-base transition-all duration-300 shadow-inner">
                        <i class="${navIcon}"></i>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-sm sm:text-[15px] font-bold tracking-[0.12em] leading-none text-white">
                            CLEVER<span class="text-red-500">TENSAI</span>
                        </span>
                        <span class="font-mono text-[9px] text-gray-400 tracking-[0.22em] mt-1">
                            ${navSubtitle}
                        </span>
                    </div>
                </a>
            </div>

            <!-- ตรงกลาง: ปุ่มสลับเว็บแอปขนาดใหญ่ กดสบาย -->
            <div class="hidden sm:block absolute left-1/2 -translate-x-1/2">
                <button type="button" onclick="toggleNavPopup()"
                    class="px-5 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 rounded-full font-semibold flex items-center gap-3 text-gray-100 transition-all duration-200 text-sm cursor-pointer shadow-sm group"
                    title="สลับเว็บแอปพลิเคชัน (Ctrl+K)">
                    <i class="${centerIcon} text-red-500 text-sm transition-transform duration-200 group-hover:scale-110"></i>
                    <span class="tracking-wide">${centerLabel}</span>
                    <i class="fa-solid fa-chevron-down text-[11px] text-gray-500 group-hover:text-gray-200 transition-colors"></i>
                </button>
            </div>

            <!-- ฝั่งขวา: ปุ่มนำทาง / Admin Controls -->
            <div class="flex items-center gap-2 sm:gap-2.5 shrink-0">
                <button type="button" onclick="toggleNavPopup()"
                    class="sm:hidden px-3.5 py-2 bg-white/[0.05] hover:bg-white/10 border border-white/15 rounded-xl font-semibold flex items-center gap-2 text-gray-100 text-xs cursor-pointer transition-all">
                    <i class="fa-solid fa-grip text-red-500"></i>
                    <span>Hub</span>
                </button>
                ${rightControlsHtml}
            </div>
        </nav>

        <!-- MINIMAL LUXURY ALL WEB APPS HUB MODAL -->
        <div id="navPopupModal" onclick="if (event.target === this) toggleNavPopup()"
            class="hidden fixed inset-0 z-[90] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
            <div class="ct-lux-modal bg-[#0E1117]/95 border border-white/10 rounded-3xl max-w-5xl w-full shadow-2xl relative text-white font-sans max-h-[88dvh] flex flex-col overflow-hidden">

                <!-- Header ของ Modal -->
                <div class="px-6 sm:px-8 py-5 sm:py-6 border-b border-white/[0.07] flex items-center justify-between gap-4 shrink-0">
                    <div class="min-w-0">
                        <span class="font-mono text-[10px] text-red-500 uppercase tracking-[0.22em] font-semibold">
                            CLEVERTENSAI WORKSPACE
                        </span>
                        <h3 class="text-lg sm:text-xl font-bold text-white tracking-wide mt-1">
                            เลือกเว็บแอปพลิเคชัน
                        </h3>
                    </div>

                    <button type="button" onclick="toggleNavPopup()"
                        class="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all text-base cursor-pointer shrink-0"
                        title="ปิดหน้าต่าง (ESC)">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <!-- รายการเว็บแอปทั้งหมด -->
                <div class="overflow-y-auto ct-lux-scroll p-6 sm:p-8">
                    <div id="hubModalGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
                </div>
            </div>
        </div>
    `;

    // 5. แสดงผล Navbar ลงในจุดที่กำหนด
    const container = document.getElementById("navbar-container");
    if (container) {
        container.innerHTML = navbarHtml;
    }

    // 6. สร้างการ์ดภายใน Modal (สไตล์ Minimal Luxury)
    window.renderGlobalHubCards = function (appsList = WEB_APPS) {
        const hubModalGrid = document.getElementById("hubModalGrid");
        if (!hubModalGrid) return;

        const portalCard = isIndexPage ? "" : `
            <a href="${basePath}index.html"
                class="p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.06] border border-white/[0.07] hover:border-white/20 transition-all duration-200 flex items-start gap-4 group">
                <div class="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-gray-300 group-hover:text-red-400 group-hover:border-red-500/40 flex items-center justify-center text-base shrink-0 transition-all duration-200">
                    <i class="fa-solid fa-cubes"></i>
                </div>
                <div class="min-w-0 flex-grow">
                    <div class="flex items-center justify-between gap-2">
                        <span class="font-semibold text-sm text-gray-100 group-hover:text-white tracking-wide truncate transition-colors">Main Portal</span>
                        <i class="fa-solid fa-arrow-right text-[11px] text-gray-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-red-400 transition-all shrink-0"></i>
                    </div>
                    <p class="text-xs text-gray-400 group-hover:text-gray-300 mt-1.5 leading-relaxed line-clamp-2 transition-colors">กลับสู่หน้ารวมเว็บแอปพลิเคชันทั้งหมด</p>
                </div>
            </a>
        `;

        const appCards = appsList.map(app => {
            const cleanUrl = (app.url || "#").replace(/^\.\//, "");
            const finalUrl = basePath + cleanUrl;
            const isCurrent = (!isIndexPage && currentFile === cleanUrl.split("/").pop());

            if (isCurrent) {
                return `
                    <a href="${finalUrl}"
                        class="ct-lux-active-card p-5 rounded-2xl border transition-all flex items-start gap-4 relative">
                        <div class="w-11 h-11 rounded-xl bg-red-500 text-white flex items-center justify-center text-base shrink-0 shadow-lg">
                            <i class="${app.icon || "fa-solid fa-cube"}"></i>
                        </div>
                        <div class="min-w-0 flex-grow">
                            <div class="flex items-center justify-between gap-2">
                                <span class="font-bold text-sm text-white tracking-wide truncate">${app.title}</span>
                                <span class="w-2 h-2 rounded-full bg-red-500 shrink-0" title="กำลังใช้งาน"></span>
                            </div>
                            <p class="text-xs text-gray-300 mt-1.5 leading-relaxed">กำลังใช้งานอยู่ขณะนี้</p>
                        </div>
                    </a>
                `;
            }

            return `
                <a href="${finalUrl}"
                    class="p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.06] border border-white/[0.07] hover:border-white/20 transition-all duration-200 flex items-start gap-4 group">
                    <div class="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-gray-300 group-hover:text-red-400 group-hover:border-red-500/40 flex items-center justify-center text-base shrink-0 transition-all duration-200">
                        <i class="${app.icon || "fa-solid fa-cube"}"></i>
                    </div>
                    <div class="min-w-0 flex-grow">
                        <div class="flex items-center justify-between gap-2">
                            <span class="font-semibold text-sm text-gray-100 group-hover:text-white tracking-wide truncate transition-colors">${app.title}</span>
                            <i class="fa-solid fa-arrow-right text-[11px] text-gray-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-red-400 transition-all shrink-0"></i>
                        </div>
                        <p class="text-xs text-gray-400 group-hover:text-gray-300 mt-1.5 leading-relaxed line-clamp-2 transition-colors">${app.description || ""}</p>
                    </div>
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
            return;
        }

        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
            if (tag === "input" || tag === "textarea" || tag === "select") return;
            e.preventDefault();
            window.toggleNavPopup();
        }
    });

    window.renderGlobalHubCards();
})();
