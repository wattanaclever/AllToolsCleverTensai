// =========================================================================
// CLEVERTENSAI — PDF/JS/NavbarPDF.js (Minimal Luxury Fixed Top Navbar)
// =========================================================================
(function () {
    const currentFile = window.location.pathname.split("/").pop() || "HomePDF.html";

    // รายการเครื่องมือ PDF ทั้ง 6 โมดูล (อยู่ในโฟลเดอร์ /PDF/ เดียวกัน)
    const PDF_TOOLS_MENU = [
        {
            title: "Merge PDF",
            desc: "รวมไฟล์เอกสารหลายหน้าเข้าด้วยกันเป็นเล่มเดียว",
            url: "MergePDF.html",
            icon: "fa-solid fa-object-ungroup"
        },
        {
            title: "Split PDF",
            desc: "แยกหน้าหรือตัดเลือกบางส่วนของเอกสาร PDF",
            url: "SplitPDF.html",
            icon: "fa-solid fa-scissors"
        },
        {
            title: "Crop & Rotate PDF",
            desc: "ตัดขอบ หมุนหน้าเอกสาร และปรับสัดส่วนแบบเรียลไทม์",
            url: "CropPDF.html",
            icon: "fa-solid fa-crop-simple"
        },
        {
            title: "Edit PDF",
            desc: "เขียน วาด พิมพ์ และเติมข้อความบนหน้า PDF",
            url: "EditPDF.html",
            icon: "fa-solid fa-pen-to-square"
        },
        {
            title: "Compress PDF",
            desc: "ลดขนาดไฟล์ PDF พร้อมคงความคมชัดตัวอักษร",
            url: "CompressPDF.html",
            icon: "fa-solid fa-file-zipper"
        },
        {
            title: "Convert to PDF",
            desc: "แปลงรูปภาพและไฟล์ข้อความให้เป็นเอกสาร PDF",
            url: "ConvertToPDF.html",
            icon: "fa-solid fa-file-import"
        }
    ];

    const isPdfHome = (currentFile === "HomePDF.html");
    const activeTool = PDF_TOOLS_MENU.find(t => t.url === currentFile);
    const centerLabel = activeTool ? activeTool.title : "PDF Tools";
    const centerIcon = activeTool ? activeTool.icon : "fa-solid fa-table-cells-large";

    // แทรก Micro-CSS สำหรับแอนิเมชันนุ่มนวลและผิวสัมผัส Luxury
    if (!document.getElementById("ct-navbar-pdf-style")) {
        const styleEl = document.createElement("style");
        styleEl.id = "ct-navbar-pdf-style";
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

    // โครงสร้าง HTML ของ Fixed Top Navbar + Smart Spacer + Minimal Luxury Hub Modal
    const navbarHtml = `
        <!-- Smart Spacer: ดันพื้นที่ด้านบนพอดี h-16 (64px) ป้องกัน Navbar ทับเนื้อหา -->
        <div class="h-16 w-full shrink-0" aria-hidden="true"></div>

        <!-- MINIMAL LUXURY FIXED TOP NAVBAR -->
        <nav class="fixed top-0 inset-x-0 z-50 h-16 bg-[#0B0D12]/85 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-7 flex items-center justify-between font-sans text-white">

            <!-- ฝั่งซ้าย: โลโก้เรียบหรู -->
            <div class="flex items-center min-w-0">
                <a href="HomePDF.html" class="flex items-center gap-3 group shrink-0" title="กลับสู่หน้าหลัก PDF Studio Suite">
                    <div class="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-red-500/50 flex items-center justify-center text-red-500 text-base transition-all duration-300 shadow-inner">
                        <i class="fa-solid fa-file-pdf"></i>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-sm sm:text-[15px] font-bold tracking-[0.12em] leading-none text-white">
                            CLEVER<span class="text-red-500">TENSAI</span>
                        </span>
                        <span class="font-mono text-[9px] text-gray-400 tracking-[0.22em] mt-1">
                            PDF STUDIO
                        </span>
                    </div>
                </a>
            </div>

            <!-- ตรงกลาง: ปุ่มสลับเครื่องมือขนาดใหญ่ กดสบาย -->
            <div class="hidden sm:block absolute left-1/2 -translate-x-1/2">
                <button type="button" onclick="toggleNavPopup()"
                    class="px-5 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 rounded-full font-semibold flex items-center gap-3 text-gray-100 transition-all duration-200 text-sm cursor-pointer shadow-sm group"
                    title="สลับเครื่องมือ PDF (Ctrl+K)">
                    <i class="${centerIcon} text-red-500 text-sm transition-transform duration-200 group-hover:scale-110"></i>
                    <span class="tracking-wide">${centerLabel}</span>
                    <i class="fa-solid fa-chevron-down text-[11px] text-gray-500 group-hover:text-gray-200 transition-colors"></i>
                </button>
            </div>

            <!-- ฝั่งขวา: ปุ่มนำทางขนาดใหญ่ขึ้น สะอาดตา -->
            <div class="flex items-center gap-2 sm:gap-2.5 shrink-0">
                <button type="button" onclick="toggleNavPopup()"
                    class="sm:hidden px-3.5 py-2 bg-white/[0.05] hover:bg-white/10 border border-white/15 rounded-xl font-semibold flex items-center gap-2 text-gray-100 text-xs cursor-pointer transition-all">
                    <i class="fa-solid fa-table-cells-large text-red-500"></i>
                    <span>Tools</span>
                </button>

                ${!isPdfHome ? `
                    <a href="HomePDF.html"
                        class="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-transparent hover:bg-white/[0.06] border border-transparent hover:border-white/10 text-gray-300 hover:text-white font-medium text-xs sm:text-[13px] flex items-center gap-2 transition-all"
                        title="กลับหน้ารวมเครื่องมือ PDF">
                        <i class="fa-solid fa-file-pdf text-red-500/90 text-xs"></i>
                        <span class="hidden md:inline">หน้าหลัก PDF</span>
                    </a>
                ` : ''}

                <a href="../index.html"
                    class="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white font-medium text-xs sm:text-[13px] flex items-center gap-2 transition-all"
                    title="กลับสู่หน้าหลัก CLEVERTENSAI Portal">
                    <i class="fa-solid fa-house text-red-500/90 text-xs"></i>
                    <span class="hidden sm:inline">หน้าหลัก Portal</span>
                </a>
            </div>
        </nav>

        <!-- MINIMAL LUXURY PDF TOOLS MODAL HUB -->
        <div id="navPopupModal" onclick="if (event.target === this) toggleNavPopup()"
            class="hidden fixed inset-0 z-[90] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
            <div class="ct-lux-modal bg-[#0E1117]/95 border border-white/10 rounded-3xl max-w-4xl w-full shadow-2xl relative text-white font-sans max-h-[88dvh] flex flex-col overflow-hidden">

                <!-- Header ของ Modal -->
                <div class="px-6 sm:px-8 py-5 sm:py-6 border-b border-white/[0.07] flex items-center justify-between gap-4 shrink-0">
                    <div class="min-w-0">
                        <span class="font-mono text-[10px] text-red-500 uppercase tracking-[0.22em] font-semibold">
                            PDF STUDIO SUITE
                        </span>
                        <h3 class="text-lg sm:text-xl font-bold text-white tracking-wide mt-1">
                            เลือกเครื่องมือจัดการเอกสาร
                        </h3>
                    </div>

                    <button type="button" onclick="toggleNavPopup()"
                        class="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all text-base cursor-pointer shrink-0"
                        title="ปิดหน้าต่าง (ESC)">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <!-- รายการเครื่องมือ PDF ทั้ง 6 โมดูล -->
                <div class="overflow-y-auto ct-lux-scroll p-6 sm:p-8">
                    <div id="pdfToolsModalGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
                </div>
            </div>
        </div>
    `;

    // แสดงผลลงในหน้าเว็บ
    const container = document.getElementById("navbar-container");
    if (container) {
        container.innerHTML = navbarHtml;
    }

    // เรนเดอร์การ์ดเครื่องมือ PDF ทั้ง 6 ตัว + ไฮไลต์หน้าที่กำลังใช้งานอยู่
    const pdfGrid = document.getElementById("pdfToolsModalGrid");
    if (pdfGrid) {
        pdfGrid.innerHTML = PDF_TOOLS_MENU.map(tool => {
            const isCurrent = (currentFile === tool.url);

            if (isCurrent) {
                return `
                    <a href="${tool.url}"
                        class="ct-lux-active-card p-5 rounded-2xl border transition-all flex items-start gap-4 relative">
                        <div class="w-11 h-11 rounded-xl bg-red-500 text-white flex items-center justify-center text-base shrink-0 shadow-lg">
                            <i class="${tool.icon}"></i>
                        </div>
                        <div class="min-w-0 flex-grow">
                            <div class="flex items-center justify-between gap-2">
                                <span class="font-bold text-sm text-white tracking-wide truncate">${tool.title}</span>
                                <span class="w-2 h-2 rounded-full bg-red-500 shrink-0" title="กำลังใช้งาน"></span>
                            </div>
                            <p class="text-xs text-gray-300 mt-1.5 leading-relaxed">กำลังใช้งานอยู่ขณะนี้</p>
                        </div>
                    </a>
                `;
            }

            return `
                <a href="${tool.url}"
                    class="p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.06] border border-white/[0.07] hover:border-white/20 transition-all duration-200 flex items-start gap-4 group">
                    <div class="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-gray-300 group-hover:text-red-400 group-hover:border-red-500/40 flex items-center justify-center text-base shrink-0 transition-all duration-200">
                        <i class="${tool.icon}"></i>
                    </div>
                    <div class="min-w-0 flex-grow">
                        <div class="flex items-center justify-between gap-2">
                            <span class="font-semibold text-sm text-gray-100 group-hover:text-white tracking-wide truncate transition-colors">${tool.title}</span>
                            <i class="fa-solid fa-arrow-right text-[11px] text-gray-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-red-400 transition-all shrink-0"></i>
                        </div>
                        <p class="text-xs text-gray-400 group-hover:text-gray-300 mt-1.5 leading-relaxed transition-colors">${tool.desc}</p>
                    </div>
                </a>
            `;
        }).join("");
    }

    // ฟังก์ชันเปิด-ปิด Modal และรองรับคีย์ลัด ESC / Ctrl+K (⌘+K)
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
})();
