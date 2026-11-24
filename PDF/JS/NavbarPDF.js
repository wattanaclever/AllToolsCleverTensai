// =========================================================================
// CLEVERTENSAI — PDF/JS/NavbarPDF.js (Navbar & PDF Tools Hub เฉพาะกลุ่ม PDF)
// =========================================================================
(function () {
    const currentFile = window.location.pathname.split("/").pop() || "HomePDF.html";

    // รายการเครื่องมือ PDF ทั้ง 6 โมดูล (อยู่ในโฟลเดอร์ /PDF/ เดียวกัน)
    const PDF_TOOLS_MENU = [
        {
            title: "Merge PDF",
            desc: "รวมไฟล์เอกสารหลายหน้าเข้าด้วยกันเป็นเล่มเดียว",
            url: "MergePDF.html",
            icon: "fa-solid fa-object-ungroup",
            isNew: false
        },
        {
            title: "Split PDF",
            desc: "แยกหน้าหรือตัดเลือกบางส่วนของเอกสาร PDF",
            url: "SplitPDF.html",
            icon: "fa-solid fa-scissors",
            isNew: false
        },
        {
            title: "Crop PDF",
            desc: "ตัดขอบหน้าเอกสาร PDF และลบพื้นที่ขอบขาวส่วนเกิน",
            url: "CropPDF.html",
            icon: "fa-solid fa-crop-simple",
            isNew: true
        },
        {
            title: "Edit PDF",
            desc: "เขียน วาด พิมพ์ และเติมข้อความบนหน้า PDF",
            url: "EditPDF.html",
            icon: "fa-solid fa-pen-to-square",
            isNew: false
        },
        {
            title: "Compress PDF",
            desc: "ลดขนาดไฟล์ PDF พร้อมคงความคมชัดตัวอักษร",
            url: "CompressPDF.html",
            icon: "fa-solid fa-file-zipper",
            isNew: false
        },
        {
            title: "Convert to PDF",
            desc: "แปลงรูปภาพและไฟล์ข้อความให้เป็นเอกสาร PDF",
            url: "ConvertToPDF.html",
            icon: "fa-solid fa-file-import",
            isNew: false
        }
    ];

    const isPdfHome = (currentFile === "HomePDF.html");

    // โครงสร้าง HTML ของ Navbar และ Modal (เฉพาะเครื่องมือ PDF)
    const navbarHtml = `
        <nav class="bg-gray-950 border-b border-gray-800 h-16 flex-shrink-0 z-40 px-4 sm:px-6 flex items-center justify-between font-sans text-xs text-white sticky top-0">
            <!-- ฝั่งซ้าย: โลโก้ PDF Studio Suite -->
            <div class="flex items-center gap-3 sm:gap-4">
                <a href="HomePDF.html" class="flex items-center gap-2.5 group" title="กลับสู่หน้าหลัก PDF Studio Suite">
                    <div class="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:bg-crimson-500 transition-colors">
                        <i class="fa-solid fa-file-pdf"></i>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-base font-extrabold tracking-wider leading-none">CLEVER<span class="text-red-500">TENSAI</span></span>
                        <span class="font-mono text-[10px] text-gray-400 tracking-widest mt-0.5">PDF STUDIO SUITE</span>
                    </div>
                </a>
                <span class="hidden md:inline-block text-gray-700">|</span>
            </div>

            <!-- ตรงกลาง: ปุ่มเปิด PDF Tools Hub -->
            <div class="hidden sm:block absolute left-1/2 transform -translate-x-1/2">
                <button type="button" onclick="toggleNavPopup()"
                    class="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-red-500/50 rounded-full font-bold flex items-center gap-2.5 text-gray-100 transition-all shadow-md group text-sm cursor-pointer">
                    <i class="fa-solid fa-th text-red-500 group-hover:scale-110 transition-transform"></i>
                    <span>PDF Tools Hub</span>
                    <i class="fa-solid fa-chevron-down text-xs text-gray-400"></i>
                </button>
            </div>

            <!-- ฝั่งขวา: ปุ่มนำทาง & สถานะระบบ -->
            <div class="flex items-center gap-2 sm:gap-2.5">
                <button type="button" onclick="toggleNavPopup()"
                    class="sm:hidden px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl font-bold flex items-center gap-1.5 text-gray-100 text-xs cursor-pointer">
                    <i class="fa-solid fa-th text-red-500"></i>
                    <span>Tools</span>
                </button>

                <div class="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800 text-emerald-400 font-mono text-[11px]">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>SYSTEM ONLINE</span>
                </div>

                ${!isPdfHome ? `
                    <a href="HomePDF.html"
                        class="px-3 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-red-500/60 text-gray-200 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-all"
                        title="กลับหน้ารวมเครื่องมือ PDF">
                        <i class="fa-solid fa-file-pdf text-red-500"></i>
                        <span class="hidden md:inline">หน้าหลัก PDF</span>
                    </a>
                ` : ''}

                <a href="../index.html"
                    class="px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-red-600/20 border border-gray-700 hover:border-red-500/60 text-gray-200 hover:text-white font-mono text-xs flex items-center gap-2 transition-all"
                    title="กลับสู่หน้าหลัก CLEVERTENSAI Portal">
                    <i class="fa-solid fa-house text-red-500"></i>
                    <span class="hidden sm:inline">หน้าหลัก Portal</span>
                </a>
            </div>
        </nav>

        <!-- PDF TOOLS MODAL HUB -->
        <div id="navPopupModal" onclick="if (event.target === this) toggleNavPopup()"
            class="hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
            <div class="bg-gray-900 border-2 border-gray-800 rounded-3xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl relative text-white font-sans max-h-[90vh] flex flex-col">

                <!-- Header ของ Modal -->
                <div class="flex items-center justify-between pb-5 border-b border-gray-800 shrink-0">
                    <div class="flex items-center gap-3.5">
                        <div class="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center text-2xl border border-red-500/30">
                            <i class="fa-solid fa-file-pdf"></i>
                        </div>
                        <div>
                            <h3 class="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
                                Select PDF Tool
                            </h3>
                            <p class="text-sm text-gray-400 mt-0.5">เลือกเครื่องมือจัดการเอกสาร PDF ภายใน PDF Studio Suite</p>
                        </div>
                    </div>

                    <button type="button" onclick="toggleNavPopup()"
                        class="w-12 h-12 rounded-2xl bg-gray-800 hover:bg-red-600/20 border border-gray-700 hover:border-red-500/50 text-gray-400 hover:text-red-400 flex items-center justify-center transition-all text-xl cursor-pointer">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <!-- รายการเครื่องมือ PDF ทั้ง 6 โมดูล -->
                <div class="overflow-y-auto py-6">
                    <div class="text-xs font-mono text-red-400 uppercase tracking-wider font-bold mb-4 flex items-center gap-2">
                        <i class="fa-solid fa-layer-group"></i>
                        <span>PDF STUDIO TOOLS (เครื่องมือจัดการ PDF ทั้ง 6 โมดูล)</span>
                    </div>
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
                        class="p-4 rounded-2xl bg-red-600/20 border-2 border-red-500 transition-all flex flex-col items-center text-center group shadow-lg relative">
                        <span class="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded bg-red-600 text-white font-mono text-[9px] font-bold">ACTIVE</span>
                        <div class="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center text-xl mb-3 shadow-md">
                            <i class="${tool.icon}"></i>
                        </div>
                        <span class="font-extrabold text-sm text-red-400 tracking-wide">${tool.title}</span>
                        <span class="text-[11px] text-gray-300 mt-1.5 leading-relaxed">กำลังใช้งานอยู่ขณะนี้</span>
                    </a>
                `;
            }

            return `
                <a href="${tool.url}"
                    class="p-4 rounded-2xl bg-gray-800/70 hover:bg-red-600/15 border-2 border-gray-800 hover:border-red-500/60 transition-all flex flex-col items-center text-center group shadow-lg relative">
                    ${tool.isNew ? '<span class="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded bg-red-600 text-white font-mono text-[9px] font-bold">NEW</span>' : ''}
                    <div class="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center text-xl mb-3 transition-all duration-200 group-hover:scale-110 shadow-md">
                        <i class="${tool.icon}"></i>
                    </div>
                    <span class="font-extrabold text-sm text-gray-100 group-hover:text-red-400 tracking-wide">${tool.title}</span>
                    <span class="text-[11px] text-gray-400 mt-1.5 leading-relaxed">${tool.desc}</span>
                </a>
            `;
        }).join("");
    }

    // ฟังก์ชันเปิด-ปิด Modal และรองรับปุ่ม ESC
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
})();
