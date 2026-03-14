// const express = require("express");
// const router = express.Router();
// const Inspection = require("../models/Inspection");

// router.get("/generate/:id", async (req, res) => {
//   try {
//     const d = await Inspection.findById(req.params.id);
//     if (!d)
//       return res
//         .status(404)
//         .send(
//           '<h2 style="font-family:sans-serif;padding:40px;color:#c62828">Inspection not found</h2>',
//         );
//     res.setHeader("Content-Type", "text/html; charset=utf-8");
//     res.send(buildPDF(d));
//   } catch (e) {
//     res.status(500).send(`<h2>Error: ${e.message}</h2>`);
//   }
// });

// const rc = (v) => (v >= 7 ? "#16a34a" : v >= 4 ? "#d97706" : "#dc2626");
// const rl = (v) =>
//   v >= 8 ? "Excellent" : v >= 6 ? "Good" : v >= 4 ? "Average" : "Poor";
// const statusLabel = (s) =>
//   ({
//     ok: { txt: "✓ OK", bg: "#dcfce7", color: "#166534", border: "#86efac" },
//     not_ok: {
//       txt: "✗ Not OK",
//       bg: "#fee2e2",
//       color: "#991b1b",
//       border: "#fca5a5",
//     },
//     excellent: {
//       txt: "★ Excellent",
//       bg: "#dcfce7",
//       color: "#166534",
//       border: "#86efac",
//     },
//     moderate: {
//       txt: "◎ Moderate",
//       bg: "#fef9c3",
//       color: "#854d0e",
//       border: "#fde047",
//     },
//     not_working: {
//       txt: "✗ Not Working",
//       bg: "#fee2e2",
//       color: "#991b1b",
//       border: "#fca5a5",
//     },
//     alloys: {
//       txt: "◆ Alloys",
//       bg: "#dbeafe",
//       color: "#1e40af",
//       border: "#93c5fd",
//     },
//     normal: {
//       txt: "◇ Normal",
//       bg: "#f3f4f6",
//       color: "#374151",
//       border: "#d1d5db",
//     },
//     na: { txt: "—", bg: "#f9fafb", color: "#9ca3af", border: "#e5e7eb" },
//   })[s] || { txt: "—", bg: "#f9fafb", color: "#9ca3af", border: "#e5e7eb" };

// const badge = (s) => {
//   const b = statusLabel(s);
//   return `<span style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:${b.bg};color:${b.color};border:1px solid ${b.border}">${b.txt}</span>`;
// };

// const checkTable = (title, items, isHeat = false, isTyre = false) => {
//   if (!items || !items.length) return "";
//   const ok = items.filter((i) =>
//     ["ok", "excellent", "alloys"].includes(i.status),
//   ).length;
//   const bad = items.filter((i) =>
//     ["not_ok", "not_working"].includes(i.status),
//   ).length;
//   return `
//   <div style="margin-bottom:22px;border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;page-break-inside:avoid">
//     <div style="background:linear-gradient(135deg,#7f1d1d,#991b1b);color:white;padding:12px 18px;display:flex;justify-content:space-between;align-items:center">
//       <span style="font-size:15px;font-weight:800;letter-spacing:-0.3px">${title}</span>
//       <div style="display:flex;gap:12px;font-size:12px">
//         ${ok > 0 ? `<span style="background:rgba(255,255,255,0.15);padding:2px 10px;border-radius:20px;color:#bbf7d0">✓ ${ok} OK</span>` : ""}
//         ${bad > 0 ? `<span style="background:rgba(255,255,255,0.15);padding:2px 10px;border-radius:20px;color:#fca5a5">✗ ${bad} Issues</span>` : ""}
//       </div>
//     </div>
//     <table style="width:100%;border-collapse:collapse;background:#fff">
//       <thead>
//         <tr style="background:#fafafa;border-bottom:2px solid #e5e7eb">
//           <th style="padding:10px 14px;text-align:left;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.8px;font-weight:700;width:40%">Item</th>
//           <th style="padding:10px 14px;text-align:center;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.8px;font-weight:700;width:20%">Status</th>
//           ${!isHeat ? '<th style="padding:10px 14px;text-align:left;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.8px;font-weight:700">Remarks</th>' : ""}
//         </tr>
//       </thead>
//       <tbody>
//         ${items
//           .map(
//             (it, i) => `
//           <tr style="background:${i % 2 === 0 ? "#fff" : "#f9fafb"};border-bottom:1px solid #f0f0f0">
//             <td style="padding:9px 14px;font-size:13px;color:#1f2937;font-weight:500">${it.name || ""}</td>
//             <td style="padding:9px 14px;text-align:center">${badge(it.status)}</td>
//             ${!isHeat ? `<td style="padding:9px 14px;font-size:12px;color:#6b7280">${it.remarks || "—"}</td>` : ""}
//           </tr>`,
//           )
//           .join("")}
//       </tbody>
//     </table>
//   </div>`;
// };

// const ratingBar = (label, val) => `
//   <div style="margin-bottom:12px">
//     <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
//       <span style="font-size:13px;color:#374151;font-weight:500">${label}</span>
//       <div style="display:flex;align-items:center;gap:6px">
//         <span style="font-size:18px;font-weight:900;color:${rc(val)}">${val}</span>
//         <span style="font-size:11px;color:#9ca3af">/10</span>
//         <span style="font-size:11px;font-weight:700;color:${rc(val)}">${rl(val)}</span>
//       </div>
//     </div>
//     <div style="background:#e5e7eb;border-radius:6px;height:8px;overflow:hidden">
//       <div style="background:${rc(val)};width:${val * 10}%;height:8px;border-radius:6px;transition:width 0.3s"></div>
//     </div>
//   </div>`;

// function buildPDF(d) {
//   const date = new Date(d.inspectionDate).toLocaleDateString("en-PK", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
//   const now = new Date().toLocaleDateString("en-PK", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
//   return `<!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width,initial-scale=1">
// <title>AutoGemz Report — ${d.vehicleMake} ${d.vehicleModel || ""} ${d.registrationNo || ""}</title>
// <style>
//   *{margin:0;padding:0;box-sizing:border-box}
//   body{font-family:'Segoe UI',Arial,sans-serif;background:#f3f4f6;color:#1f2937;font-size:13px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
//   .page{background:#fff;max-width:960px;margin:0 auto;box-shadow:0 4px 24px rgba(0,0,0,0.12)}
//   @media print{body{background:#fff}.no-print{display:none!important}.page{box-shadow:none;max-width:100%}}
//   .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}
//   .info-row{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #f3f4f6;font-size:12px}
//   .info-label{color:#6b7280;font-weight:500}
//   .info-val{font-weight:700;color:#111827;text-transform:capitalize}
// </style>
// </head>
// <body>

// <!-- Print / Close buttons -->
// <div class="no-print" style="position:fixed;top:16px;right:16px;z-index:999;display:flex;gap:10px">
//   <button onclick="window.print()" style="background:linear-gradient(135deg,#dc2626,#991b1b);color:white;border:none;padding:12px 22px;border-radius:9px;cursor:pointer;font-size:14px;font-weight:700;font-family:inherit;box-shadow:0 4px 16px rgba(220,38,38,0.4)">🖨️ Print / Save PDF</button>
//   <button onclick="window.close()" style="background:#f1f5f9;color:#374151;border:1px solid #e2e8f0;padding:12px 18px;border-radius:9px;cursor:pointer;font-size:14px;font-family:inherit">✕ Close</button>
// </div>

// <div class="page">

// <!-- ══ HEADER ══ -->
// <div style="background:linear-gradient(135deg,#0a0005 0%,#3f0000 50%,#7f1d1d 100%);color:white;padding:32px 36px">
//   <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px">
//     <div style="display:flex;align-items:center;gap:18px">
//        <div>
//   <img src="http://localhost:5000/images/logo.png"
//        alt="AutoGemz Logo"
//        style="width:70px;height:70px;object-fit:contain">
// </div>
//       <div>
//         <div style="font-size:26px;font-weight:900;letter-spacing:-0.5px">AutoGemz</div>
//         <div style="font-size:11px;color:#fca5a5;letter-spacing:2px;text-transform:uppercase;margin-top:2px">Professional Vehicle Inspection Report</div>
//       </div>
//     </div>
//     <div style="text-align:right">
//       <div style="font-size:11px;color:#9ca3af;margin-bottom:3px">Report Generated</div>
//       <div style="font-size:13px;color:#e5e7eb;font-weight:600">${now}</div>
//       <div style="background:${d.status === "completed" ? "rgba(16,185,129,0.2)" : "rgba(251,146,60,0.2)"};border:1px solid ${d.status === "completed" ? "rgba(16,185,129,0.4)" : "rgba(251,146,60,0.4)"};border-radius:20px;padding:4px 14px;margin-top:8px;font-size:12px;font-weight:700;color:${d.status === "completed" ? "#6ee7b7" : "#fed7aa"}">
//         ${d.status === "completed" ? "✅ COMPLETED" : "📝 DRAFT"}
//       </div>
//     </div>
//   </div>

//   <!-- Vehicle name + overall score -->
//   <div style="display:flex;justify-content:space-between;align-items:flex-end;padding-top:20px;border-top:1px solid rgba(255,255,255,0.1)">
//     <div>
//       <h1 style="font-size:28px;font-weight:900;letter-spacing:-0.5px">${d.vehicleMake} ${d.vehicleModel || ""} <span style="color:#fca5a5">${d.modelYear || ""}</span></h1>
//       ${d.registrationNo ? `<div style="font-size:15px;color:#9ca3af;margin-top:4px;font-family:monospace;letter-spacing:2px">${d.registrationNo}</div>` : ""}
//       <div style="font-size:13px;color:#d1d5db;margin-top:6px">Inspection Date: ${date}</div>
//     </div>
//     <div style="text-align:center">
//       <div style="width:90px;height:90px;border-radius:50%;border:3px solid ${rc(d.ratings?.overall || 0)};display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(255,255,255,0.06)">
//         <div style="font-size:32px;font-weight:900;color:${rc(d.ratings?.overall || 0)};line-height:1">${d.ratings?.overall || 0}</div>
//         <div style="font-size:10px;color:#9ca3af;margin-top:1px">/10</div>
//       </div>
//       <div style="font-size:11px;color:${rc(d.ratings?.overall || 0)};margin-top:5px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">${rl(d.ratings?.overall || 0)}</div>
//     </div>
//   </div>
// </div>

// <!-- ══ VEHICLE + CUSTOMER INFO ══ -->
// <div style="padding:24px 36px;background:#fff;border-bottom:1px solid #e5e7eb">
//   <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px">

//     <!-- Vehicle Details -->
//     <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px">
//       <div style="font-size:11px;font-weight:800;color:#374151;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid #dc2626">🚗 Vehicle Info</div>
//       ${[
//         ["Make", d.vehicleMake],
//         ["Model", d.vehicleModel],
//         ["Year", d.modelYear],
//         ["Engine", d.engineCapacity],
//         ["Color", d.exteriorColor],
//         ["Transmission", d.transmissionType],
//         ["Drive", d.driveType?.toUpperCase()],
//         ["Fuel Type", d.engineType],
//       ]
//         .filter(([, v]) => v)
//         .map(
//           ([l, v]) => `
//         <div class="info-row"><span class="info-label">${l}</span><span class="info-val">${v}</span></div>`,
//         )
//         .join("")}
//     </div>

//     <!-- Chassis / Reg -->
//     <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px">
//       <div style="font-size:11px;font-weight:800;color:#374151;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid #dc2626">📋 Identification</div>
//       ${[
//         ["Registration", d.registrationNo],
//         ["Chassis No.", d.chassisNo],
//         ["Inspection Date", date],
//         ["Status", d.status],
//       ]
//         .filter(([, v]) => v)
//         .map(
//           ([l, v]) => `
//         <div class="info-row"><span class="info-label">${l}</span><span class="info-val">${v}</span></div>`,
//         )
//         .join("")}
//       ${
//         d.inspectorName
//           ? `
//       <div style="margin-top:12px;padding-top:12px;border-top:1px solid #e5e7eb">
//         <div style="font-size:11px;color:#9ca3af;margin-bottom:4px">Inspector</div>
//         <div style="font-size:13px;font-weight:700">${d.inspectorName}</div>
//         ${d.inspectorStamp ? `<div style="font-size:12px;color:#6b7280">Badge: ${d.inspectorStamp}</div>` : ""}
//       </div>`
//           : ""
//       }
//     </div>

//     <!-- Customer -->
//     <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px">
//       <div style="font-size:11px;font-weight:800;color:#374151;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid #dc2626">👤 Customer</div>
//       ${d.customerName ? `<div style="font-size:15px;font-weight:800;margin-bottom:8px">${d.customerName}</div>` : '<div style="font-size:13px;color:#9ca3af;margin-bottom:8px">Not specified</div>'}
//       ${d.customerPhone ? `<div class="info-row"><span class="info-label">Phone</span><span class="info-val">${d.customerPhone}</span></div>` : ""}
//       ${d.customerEmail ? `<div class="info-row"><span class="info-label">Email</span><span style="font-weight:600;font-size:12px;color:#374151">${d.customerEmail}</span></div>` : ""}
//       ${d.notes ? `<div style="margin-top:12px;padding:10px;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;font-size:12px;color:#92400e"><strong>Notes:</strong> ${d.notes}</div>` : ""}
//     </div>
//   </div>
// </div>

// <!-- ══ RATINGS ══ -->
// <div style="padding:24px 36px;background:#fff;border-bottom:1px solid #e5e7eb">
//   <div style="font-size:16px;font-weight:800;margin-bottom:18px;display:flex;align-items:center;gap:10px">
//     <span style="background:#fee2e2;color:#dc2626;padding:6px 10px;border-radius:8px;font-size:18px">📊</span>
//     Category Ratings
//   </div>
//   <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 40px">
//     ${ratingBar("Exterior Condition", d.ratings?.exterior || 0)}
//     ${ratingBar("Interior & Comfort", d.ratings?.interior || 0)}
//     ${ratingBar("Electrical Systems", d.ratings?.electrical || 0)}
//     ${ratingBar("Mechanical Performance", d.ratings?.mechanical || 0)}
//     ${ratingBar("Heating & Cooling", d.ratings?.heatingCooling || 0)}
//     ${ratingBar("Tyres & Shocks", d.ratings?.tyresShocks || 0)}
//   </div>
//   <div style="margin-top:16px;padding:16px;background:linear-gradient(135deg,#fef2f2,#fff);border:2px solid ${rc(d.ratings?.overall || 0)};border-radius:10px;display:flex;justify-content:space-between;align-items:center">
//     <span style="font-size:15px;font-weight:700">Overall Vehicle Condition</span>
//     <div style="display:flex;align-items:center;gap:10px">
//       <span style="font-size:36px;font-weight:900;color:${rc(d.ratings?.overall || 0)}">${d.ratings?.overall || 0}</span>
//       <div><div style="font-size:12px;color:#9ca3af">/10</div><div style="font-size:14px;font-weight:700;color:${rc(d.ratings?.overall || 0)}">${rl(d.ratings?.overall || 0)}</div></div>
//     </div>
//   </div>
// </div>

// <!-- ══ CHECKLIST SECTIONS ══ -->
// <div style="padding:24px 36px;background:#f9fafb">
//   <div style="font-size:16px;font-weight:800;margin-bottom:18px;display:flex;align-items:center;gap:10px">
//     <span style="background:#fee2e2;color:#dc2626;padding:6px 10px;border-radius:8px;font-size:18px">📋</span>
//     Detailed Inspection Checklists
//   </div>

//   ${checkTable("1. Exterior Details (40 Items)", d.exteriorDetails || [])}
//   ${checkTable("2. Interior & Comfort", d.interiorComfort || [])}
//   ${checkTable("3. Electrical Systems", d.electrical || [])}
//   ${checkTable("4. Mechanical & Driving Performance", d.mechanical || [])}
//   ${checkTable("5. Heating & Cooling", d.heatingCooling || [], true)}
//   ${checkTable("6. Tyres & Shocks", d.tyresShocks || [], false, true)}
// </div>

// <!-- ══ FOOTER ══ -->
// <div style="background:linear-gradient(135deg,#0a0005,#3f0000);color:white;padding:28px 36px">
//   <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:28px;margin-bottom:22px">

//     <!-- Inspector Signature -->
//     <div>
//       <div style="font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px">Inspector Details</div>
//       <div style="margin-bottom:12px">
//         <div style="font-size:10px;color:#6b7280;margin-bottom:3px">Name</div>
//         <div style="font-size:14px;font-weight:700;color:#e5e7eb;min-height:20px">${d.inspectorName || "_____________________"}</div>
//       </div>
//       <div style="margin-bottom:12px">
//         <div style="font-size:10px;color:#6b7280;margin-bottom:3px">Signature</div>
//         <div style="border-bottom:1.5px solid #374151;width:180px;height:36px;display:flex;align-items:flex-end;padding-bottom:3px">
//           <span style="font-size:13px;color:#d1d5db;font-style:italic">${d.inspectorSign || ""}</span>
//         </div>
//       </div>
//       <div>
//         <div style="font-size:10px;color:#6b7280;margin-bottom:3px">Stamp / Badge</div>
//         <div style="border:1.5px dashed #374151;width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center">
//           <div style="font-size:11px;color:#4b5563;text-align:center;line-height:1.3">${d.inspectorStamp || "STAMP"}</div>
//         </div>
//       </div>
//     </div>

//     <!-- Center Logo -->
//     <div style="text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center">
//       <div>
//   <img src="http://localhost:5000/images/logo.png"
//        alt="AutoGemz Logo"
//        style="width:70px;height:70px;object-fit:contain">
// </div>
//       <div style="font-size:18px;font-weight:900;color:#fff;margin-bottom:4px">AutoGemz</div>
//       <div style="font-size:11px;color:#dc2626;font-weight:700;letter-spacing:1.5px">✓ VERIFIED BY AUTOGEMZ</div>
//       <div style="font-size:10px;color:#6b7280;margin-top:3px">Professional Vehicle Inspection</div>
//       <div style="margin-top:14px;font-size:22px;font-weight:900;color:${rc(d.ratings?.overall || 0)}">${d.ratings?.overall || 0}<span style="font-size:12px;color:#9ca3af">/10</span></div>
//       <div style="font-size:11px;color:${rc(d.ratings?.overall || 0)};font-weight:700">${rl(d.ratings?.overall || 0)}</div>
//     </div>

//     <!-- Summary -->
//     <div style="text-align:right">
//       <div style="font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px">Report Summary</div>
//       <div style="font-size:14px;font-weight:700;color:#e5e7eb;margin-bottom:4px">${d.vehicleMake} ${d.vehicleModel || ""}</div>
//       ${d.registrationNo ? `<div style="font-size:13px;color:#9ca3af;font-family:monospace;margin-bottom:4px">${d.registrationNo}</div>` : ""}
//       ${d.customerName ? `<div style="font-size:12px;color:#9ca3af;margin-bottom:4px">Customer: ${d.customerName}</div>` : ""}
//       <div style="font-size:12px;color:#9ca3af;margin-bottom:4px">Date: ${date}</div>
//       <div style="margin-top:10px;padding:8px 14px;background:rgba(220,38,38,0.1);border:1px solid rgba(220,38,38,0.3);border-radius:8px;display:inline-block">
//         <div style="font-size:11px;color:#fca5a5">Overall Rating</div>
//         <div style="font-size:18px;font-weight:900;color:${rc(d.ratings?.overall || 0)}">${d.ratings?.overall || 0}/10 — ${rl(d.ratings?.overall || 0)}</div>
//       </div>
//     </div>
//   </div>

//   <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:gap">
//     <div style="font-size:11px;color:#4b5563">© ${new Date().getFullYear()} AutoGemz. All rights reserved. This report is confidential and generated digitally.</div>
//     <div style="font-size:11px;color:#4b5563">autogemz.com</div>
//   </div>
// </div>

// </div><!-- /page -->
// </body></html>`;
// }

// module.exports = router;

const express = require("express");
const router = express.Router();
const Inspection = require("../models/Inspection");

router.get("/generate/:id", async (req, res) => {
  try {
    const d = await Inspection.findById(req.params.id);
    if (!d)
      return res
        .status(404)
        .send(
          '<h2 style="font-family:sans-serif;padding:40px;color:#c62828">Inspection not found</h2>',
        );
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(buildPDF(d));
  } catch (e) {
    res.status(500).send(`<h2>Error: ${e.message}</h2>`);
  }
});

// ── Helpers ─────────────────────────────────────────────────────────────────
const rc = (v) => (v >= 7 ? "#16a34a" : v >= 4 ? "#d97706" : "#dc2626");
const rl = (v) =>
  v >= 8 ? "Excellent" : v >= 6 ? "Good" : v >= 4 ? "Average" : "Poor";

const statusLabel = (s) =>
  ({
    ok: { txt: "✓ OK", bg: "#dcfce7", color: "#166534", border: "#86efac" },
    not_ok: {
      txt: "✗ Not OK",
      bg: "#fee2e2",
      color: "#991b1b",
      border: "#fca5a5",
    },
    excellent: {
      txt: "★ Excellent",
      bg: "#dcfce7",
      color: "#166534",
      border: "#86efac",
    },
    moderate: {
      txt: "◎ Moderate",
      bg: "#fef9c3",
      color: "#854d0e",
      border: "#fde047",
    },
    not_working: {
      txt: "✗ Not Working",
      bg: "#fee2e2",
      color: "#991b1b",
      border: "#fca5a5",
    },
    alloys: {
      txt: "◆ Alloys",
      bg: "#dbeafe",
      color: "#1e40af",
      border: "#93c5fd",
    },
    normal: {
      txt: "◇ Normal",
      bg: "#f3f4f6",
      color: "#374151",
      border: "#d1d5db",
    },
    na: { txt: "—", bg: "#f9fafb", color: "#9ca3af", border: "#e5e7eb" },
  })[s] || { txt: "—", bg: "#f9fafb", color: "#9ca3af", border: "#e5e7eb" };

const badge = (s) => {
  const b = statusLabel(s);
  return `<span style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:${b.bg};color:${b.color};border:1px solid ${b.border}">${b.txt}</span>`;
};

const checkTable = (title, items, noRemarks = false) => {
  if (!items || !items.length) return "";
  const ok = items.filter((i) =>
    ["ok", "excellent", "alloys"].includes(i.status),
  ).length;
  const bad = items.filter((i) =>
    ["not_ok", "not_working"].includes(i.status),
  ).length;
  return `
  <div style="margin-bottom:20px;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;page-break-inside:avoid">
    <div style="background:linear-gradient(135deg,#7f1d1d,#991b1b);color:white;padding:10px 16px;display:flex;justify-content:space-between;align-items:center">
      <span style="font-size:13px;font-weight:800">${title}</span>
      <div style="display:flex;gap:10px;font-size:11px">
        ${ok > 0 ? `<span style="background:rgba(255,255,255,0.15);padding:2px 9px;border-radius:20px;color:#bbf7d0">✓ ${ok} OK</span>` : ""}
        ${bad > 0 ? `<span style="background:rgba(255,255,255,0.15);padding:2px 9px;border-radius:20px;color:#fca5a5">✗ ${bad} Issues</span>` : ""}
      </div>
    </div>
    <table style="width:100%;border-collapse:collapse;background:#fff">
      <thead>
        <tr style="background:#fafafa;border-bottom:1.5px solid #e5e7eb">
          <th style="padding:8px 12px;text-align:left;font-size:10px;color:#6b7280;text-transform:uppercase;letter-spacing:0.8px;font-weight:700;width:42%">Item</th>
          <th style="padding:8px 12px;text-align:center;font-size:10px;color:#6b7280;text-transform:uppercase;letter-spacing:0.8px;font-weight:700;width:18%">Status</th>
          ${!noRemarks ? '<th style="padding:8px 12px;text-align:left;font-size:10px;color:#6b7280;text-transform:uppercase;letter-spacing:0.8px;font-weight:700">Remarks</th>' : ""}
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            (it, i) => `
          <tr style="background:${i % 2 === 0 ? "#fff" : "#f9fafb"};border-bottom:1px solid #f0f0f0">
            <td style="padding:7px 12px;font-size:12px;color:#1f2937;font-weight:500">${it.name || ""}</td>
            <td style="padding:7px 12px;text-align:center">${badge(it.status)}</td>
            ${!noRemarks ? `<td style="padding:7px 12px;font-size:11px;color:#6b7280">${it.remarks || "—"}</td>` : ""}
          </tr>`,
          )
          .join("")}
      </tbody>
    </table>
  </div>`;
};

const ratingBar = (label, val) => `
  <div style="margin-bottom:10px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
      <span style="font-size:12px;color:#374151;font-weight:600">${label}</span>
      <div style="display:flex;align-items:center;gap:5px">
        <span style="font-size:16px;font-weight:900;color:${rc(val)}">${val}</span>
        <span style="font-size:10px;color:#9ca3af">/10</span>
        <span style="font-size:10px;font-weight:700;color:${rc(val)}">${rl(val)}</span>
      </div>
    </div>
    <div style="background:#e5e7eb;border-radius:4px;height:7px;overflow:hidden">
      <div style="background:${rc(val)};width:${val * 10}%;height:7px;border-radius:4px"></div>
    </div>
  </div>`;

// ── SVG Car Diagram for PDF ─────────────────────────────────────────────────
const buildDiagramSVG = (zonesMap) => {
  const zones = [
    { id: "bonnet", label: "Bonnet", x: 215, y: 40, w: 170, h: 60 },
    {
      id: "front_screen",
      label: "Front Screen",
      x: 200,
      y: 105,
      w: 200,
      h: 55,
    },
    { id: "front_bumper", label: "Front Bumper", x: 220, y: 10, w: 160, h: 28 },
    {
      id: "front_right_door",
      label: "Front Right Door",
      x: 360,
      y: 165,
      w: 80,
      h: 100,
    },
    {
      id: "rear_right_door",
      label: "Rear Right Door",
      x: 360,
      y: 270,
      w: 80,
      h: 90,
    },
    {
      id: "front_left_door",
      label: "Front Left Door",
      x: 160,
      y: 165,
      w: 80,
      h: 100,
    },
    {
      id: "rear_left_door",
      label: "Rear Left Door",
      x: 160,
      y: 270,
      w: 80,
      h: 90,
    },
    {
      id: "front_right_fender",
      label: "Front Right Fender",
      x: 365,
      y: 100,
      w: 65,
      h: 65,
    },
    {
      id: "front_left_fender",
      label: "Front Left Fender",
      x: 170,
      y: 100,
      w: 65,
      h: 65,
    },
    {
      id: "rear_right_fender",
      label: "Rear Right Fender",
      x: 365,
      y: 360,
      w: 65,
      h: 65,
    },
    {
      id: "rear_left_fender",
      label: "Rear Left Fender",
      x: 170,
      y: 360,
      w: 65,
      h: 65,
    },
    { id: "roof", label: "Roof", x: 215, y: 165, w: 170, h: 195 },
    { id: "boot_trunk", label: "Boot/Trunk", x: 215, y: 365, w: 170, h: 55 },
    { id: "rear_screen", label: "Rear Screen", x: 210, y: 325, w: 180, h: 38 },
    { id: "pillars", label: "Pillars", x: 245, y: 160, w: 30, h: 205 },
  ];

  const zm =
    zonesMap instanceof Map ? Object.fromEntries(zonesMap) : zonesMap || {};

  const zoneColor = (id) => {
    const s = zm[id];
    if (s === "ok")
      return { fill: "rgba(16,185,129,0.3)", stroke: "#10b981", sw: 2 };
    if (s === "not_ok")
      return { fill: "rgba(239,68,68,0.35)", stroke: "#ef4444", sw: 2 };
    return {
      fill: "rgba(200,200,200,0.1)",
      stroke: "rgba(150,150,150,0.4)",
      sw: 1,
    };
  };

  const zoneRects = zones
    .map((z) => {
      const c = zoneColor(z.id);
      return `<rect x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" rx="3"
      fill="${c.fill}" stroke="${c.stroke}" stroke-width="${c.sw}" opacity="0.9"/>`;
    })
    .join("");

  // Summary table of marked zones
  const markedZones = zones.filter((z) => zm[z.id] && zm[z.id] !== "na");
  const summaryRows = markedZones
    .map((z, i) => {
      const s = zm[z.id];
      const b = statusLabel(s);
      return `<tr style="background:${i % 2 === 0 ? "#fff" : "#f9fafb"}">
      <td style="padding:5px 10px;font-size:11px;color:#1f2937;border-bottom:1px solid #f0f0f0">${z.label}</td>
      <td style="padding:5px 10px;text-align:center;border-bottom:1px solid #f0f0f0">
        <span style="display:inline-block;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;background:${b.bg};color:${b.color};border:1px solid ${b.border}">${b.txt}</span>
      </td>
    </tr>`;
    })
    .join("");

  return `
  <div style="margin-bottom:20px;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;page-break-inside:avoid">
    <div style="background:linear-gradient(135deg,#7f1d1d,#991b1b);color:white;padding:10px 16px;display:flex;justify-content:space-between;align-items:center">
      <span style="font-size:13px;font-weight:800">🚗 Vehicle Body Diagram</span>
      <div style="display:flex;gap:10px;font-size:11px">
        ${Object.values(zm).filter((v) => v === "ok").length > 0 ? `<span style="background:rgba(255,255,255,0.15);padding:2px 9px;border-radius:20px;color:#bbf7d0">✓ ${Object.values(zm).filter((v) => v === "ok").length} OK</span>` : ""}
        ${Object.values(zm).filter((v) => v === "not_ok").length > 0 ? `<span style="background:rgba(255,255,255,0.15);padding:2px 9px;border-radius:20px;color:#fca5a5">✗ ${Object.values(zm).filter((v) => v === "not_ok").length} Issues</span>` : ""}
      </div>
    </div>
    <div style="background:#f8fafc;padding:16px;display:flex;gap:20px;align-items:flex-start;flex-wrap:wrap">

      <!-- SVG Car Diagram -->
      <div style="flex-shrink:0">
        <svg viewBox="80 0 440 450" width="220" height="225" xmlns="http://www.w3.org/2000/svg" style="display:block">
          <defs>
            <filter id="ds" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="rgba(0,0,0,0.15)"/>
            </filter>
          </defs>
          <!-- Car Body -->
          <path d="M280 5 L380 5 Q415 5 430 30 L445 65 L450 100 L455 170 L460 360 L455 400 Q450 430 420 435 L380 438 L280 440 L220 440 L180 438 Q150 430 145 400 L140 360 L145 170 L150 100 L155 65 L170 30 Q185 5 220 5 Z"
            fill="#e8e8ed" stroke="#9ca3af" stroke-width="2" filter="url(#ds)"/>
          <!-- Roof Panel -->
          <path d="M218 165 L382 165 L385 325 L215 325 Z" fill="#d1d5db" stroke="#9ca3af" stroke-width="1"/>
          <!-- Bonnet -->
          <path d="M215 45 L385 45 L390 108 L210 108 Z" fill="#e0e0e8" stroke="#9ca3af" stroke-width="1"/>
          <!-- Boot -->
          <path d="M215 360 L385 360 L390 420 L210 420 Z" fill="#e0e0e8" stroke="#9ca3af" stroke-width="1"/>
          <!-- Windshield -->
          <path d="M210 108 L390 108 L385 160 L215 160 Z" fill="rgba(147,197,253,0.25)" stroke="#93c5fd" stroke-width="1.5"/>
          <!-- Rear Screen -->
          <path d="M215 325 L385 325 L385 360 L215 360 Z" fill="rgba(147,197,253,0.25)" stroke="#93c5fd" stroke-width="1.5"/>
          <!-- Wheels -->
          <path d="M148 170 Q118 170 118 210 Q118 250 148 250 L165 250 L165 170 Z" fill="#4b5563" stroke="#374151" stroke-width="1.5" rx="8"/>
          <path d="M452 170 Q482 170 482 210 Q482 250 452 250 L435 250 L435 170 Z" fill="#4b5563" stroke="#374151" stroke-width="1.5"/>
          <path d="M148 295 Q118 295 118 335 Q118 375 148 375 L165 375 L165 295 Z" fill="#4b5563" stroke="#374151" stroke-width="1.5"/>
          <path d="M452 295 Q482 295 482 335 Q482 375 452 375 L435 375 L435 295 Z" fill="#4b5563" stroke="#374151" stroke-width="1.5"/>
          <!-- Wheel Rims -->
          <ellipse cx="141" cy="210" rx="16" ry="22" fill="#9ca3af" stroke="#6b7280" stroke-width="1"/>
          <ellipse cx="459" cy="210" rx="16" ry="22" fill="#9ca3af" stroke="#6b7280" stroke-width="1"/>
          <ellipse cx="141" cy="335" rx="16" ry="22" fill="#9ca3af" stroke="#6b7280" stroke-width="1"/>
          <ellipse cx="459" cy="335" rx="16" ry="22" fill="#9ca3af" stroke="#6b7280" stroke-width="1"/>
          <!-- Zone Highlights -->
          ${zoneRects}
          <!-- Direction Labels -->
          <text x="300" y="468" text-anchor="middle" font-size="9" fill="#6b7280" font-family="Arial">FRONT ▲</text>
          <text x="300" y="-8" text-anchor="middle" font-size="9" fill="#6b7280" font-family="Arial">REAR ▼</text>
        </svg>
        <!-- Legend -->
        <div style="display:flex;gap:12px;margin-top:8px;justify-content:center;font-size:10px">
          <div style="display:flex;align-items:center;gap:4px"><div style="width:10px;height:10px;border-radius:2px;background:rgba(16,185,129,0.3);border:1.5px solid #10b981"></div><span style="color:#374151">OK</span></div>
          <div style="display:flex;align-items:center;gap:4px"><div style="width:10px;height:10px;border-radius:2px;background:rgba(239,68,68,0.35);border:1.5px solid #ef4444"></div><span style="color:#374151">Issue</span></div>
          <div style="display:flex;align-items:center;gap:4px"><div style="width:10px;height:10px;border-radius:2px;background:rgba(200,200,200,0.2);border:1px solid rgba(150,150,150,0.4)"></div><span style="color:#374151">Not Marked</span></div>
        </div>
      </div>

      <!-- Zone Status Table -->
      <div style="flex:1;min-width:200px">
        ${
          markedZones.length === 0
            ? '<div style="text-align:center;padding:30px;color:#9ca3af;font-size:12px">No zones marked during inspection</div>'
            : `<table style="width:100%;border-collapse:collapse;border-radius:6px;overflow:hidden;border:1px solid #e5e7eb">
              <thead>
                <tr style="background:#f3f4f6">
                  <th style="padding:7px 10px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.8px;color:#6b7280;font-weight:700">Body Zone</th>
                  <th style="padding:7px 10px;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:0.8px;color:#6b7280;font-weight:700;width:90px">Status</th>
                </tr>
              </thead>
              <tbody>${summaryRows}</tbody>
             </table>`
        }
      </div>
    </div>
  </div>`;
};

// ── Main PDF builder ─────────────────────────────────────────────────────────
function buildPDF(d) {
  const date = new Date(d.inspectionDate).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const now = new Date().toLocaleDateString("en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Handle diagramZones (could be Map from mongoose or plain object)
  const zm =
    d.diagramZones instanceof Map
      ? Object.fromEntries(d.diagramZones)
      : d.diagramZones || {};
  const hasZones = Object.keys(zm).length > 0;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AutoGemz — ${d.vehicleMake} ${d.vehicleModel || ""} ${d.registrationNo || ""}</title>
<style>
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { font-size: 13px; }
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background: #f3f4f6;
    color: #1f2937;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    background: #fff;
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    box-shadow: 0 4px 24px rgba(0,0,0,0.12);
  }
  /* A4 print rules */
  @page {
    size: A4 portrait;
    margin: 8mm 10mm;
  }
  @media print {
    html { font-size: 12px; }
    body { background: #fff; }
    .no-print { display: none !important; }
    .page { box-shadow: none; width: 100%; margin: 0; }
    .page-break { page-break-before: always; }
    .avoid-break { page-break-inside: avoid; }
  }
  .info-row { display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #f3f4f6; }
  .info-label { color:#6b7280;font-weight:500;font-size:11px; }
  .info-val { font-weight:700;color:#111827;text-transform:capitalize;font-size:11px;text-align:right; }
  .section-pad { padding: 20px 28px; }
</style>
</head>
<body>

<!-- Print Button (hidden on print) -->
<div class="no-print" style="position:fixed;top:14px;right:14px;z-index:9999;display:flex;gap:10px">
  <button onclick="window.print()" style="background:linear-gradient(135deg,#dc2626,#991b1b);color:white;border:none;padding:11px 22px;border-radius:9px;cursor:pointer;font-size:14px;font-weight:700;font-family:inherit;box-shadow:0 4px 16px rgba(220,38,38,0.4)">🖨️ Print / Save PDF</button>
  <button onclick="window.close()" style="background:#f1f5f9;color:#374151;border:1px solid #e2e8f0;padding:11px 18px;border-radius:9px;cursor:pointer;font-size:14px;font-family:inherit;font-weight:600">✕ Close</button>
</div>

<div class="page">

<!-- ══════════════ HEADER ══════════════ -->
<div style="background:linear-gradient(135deg,#0a0005 0%,#3f0000 50%,#7f1d1d 100%);color:white;padding:24px 28px">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px">
    <!-- Logo + Brand -->
    <div style="display:flex;align-items:center;gap:15px">
      <div>
          <img src="http://localhost:5000/images/logo.png" alt="AutoGemz Logo"
            style="width:70px;height:70px;object-fit:contain">
        </div>
      <div>
        <div style="font-size:24px;font-weight:900;letter-spacing:-0.5px;line-height:1">AutoGemz</div>
        <div style="font-size:10px;color:#fca5a5;letter-spacing:2px;text-transform:uppercase;margin-top:3px">Professional Vehicle Inspection Report</div>
      </div>
    </div>
    <!-- Date + Status -->
    <div style="text-align:right">
      <div style="font-size:10px;color:#9ca3af;margin-bottom:2px">Generated</div>
      <div style="font-size:12px;color:#e5e7eb;font-weight:600">${now}</div>
      <div style="background:${d.status === "completed" ? "rgba(16,185,129,0.2)" : "rgba(251,146,60,0.2)"};border:1px solid ${d.status === "completed" ? "rgba(16,185,129,0.4)" : "rgba(251,146,60,0.4)"};border-radius:20px;padding:4px 13px;margin-top:7px;font-size:11px;font-weight:700;color:${d.status === "completed" ? "#6ee7b7" : "#fed7aa"};display:inline-block">
        ${d.status === "completed" ? "✅ COMPLETED" : "📝 DRAFT"}
      </div>
    </div>
  </div>
  <!-- Vehicle Title + Score -->
  <div style="display:flex;justify-content:space-between;align-items:flex-end;padding-top:16px;border-top:1px solid rgba(255,255,255,0.1)">
    <div>
      <h1 style="font-size:26px;font-weight:900;letter-spacing:-0.3px;line-height:1.1">${d.vehicleMake} ${d.vehicleModel || ""} <span style="color:#fca5a5">${d.modelYear || ""}</span></h1>
      ${d.registrationNo ? `<div style="font-size:14px;color:#9ca3af;margin-top:4px;font-family:monospace;letter-spacing:2px">${d.registrationNo}</div>` : ""}
      <div style="font-size:12px;color:#d1d5db;margin-top:5px">Inspection Date: ${date}</div>
    </div>
    <div style="text-align:center;flex-shrink:0;margin-left:16px">
      <div style="width:82px;height:82px;border-radius:50%;border:3px solid ${rc(d.ratings?.overall || 0)};display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(255,255,255,0.06)">
        <div style="font-size:30px;font-weight:900;color:${rc(d.ratings?.overall || 0)};line-height:1">${d.ratings?.overall || 0}</div>
        <div style="font-size:10px;color:#9ca3af">/10</div>
      </div>
      <div style="font-size:10px;color:${rc(d.ratings?.overall || 0)};margin-top:4px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">${rl(d.ratings?.overall || 0)}</div>
    </div>
  </div>
</div>

<!-- ══════════════ VEHICLE + CUSTOMER INFO ══════════════ -->
<div class="section-pad" style="background:#fff;border-bottom:1px solid #e5e7eb">
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px" class="avoid-break">
      <div style="font-size:10px;font-weight:800;color:#374151;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:7px;border-bottom:2px solid #dc2626">🚗 Vehicle Info</div>
      ${[
        ["Make", d.vehicleMake],
        ["Model", d.vehicleModel],
        ["Year", d.modelYear],
        ["Engine", d.engineCapacity],
        ["Color", d.exteriorColor],
        ["Transmission", d.transmissionType],
        ["Drive", d.driveType?.toUpperCase()],
        ["Fuel", d.engineType],
      ]
        .filter(([, v]) => v)
        .map(
          ([l, v]) =>
            `<div class="info-row"><span class="info-label">${l}</span><span class="info-val">${v}</span></div>`,
        )
        .join("")}
    </div>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px" class="avoid-break">
      <div style="font-size:10px;font-weight:800;color:#374151;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:7px;border-bottom:2px solid #dc2626">📋 Identification</div>
      ${[
        ["Registration", d.registrationNo],
        ["Chassis No.", d.chassisNo],
        ["Insp. Date", date],
        ["Status", d.status],
      ]
        .filter(([, v]) => v)
        .map(
          ([l, v]) =>
            `<div class="info-row"><span class="info-label">${l}</span><span class="info-val">${v}</span></div>`,
        )
        .join("")}
      ${d.inspectorName ? `<div style="margin-top:10px;padding-top:10px;border-top:1px solid #e5e7eb"><div style="font-size:10px;color:#9ca3af;margin-bottom:3px">Inspector</div><div style="font-size:12px;font-weight:700">${d.inspectorName}</div>${d.inspectorStamp ? `<div style="font-size:11px;color:#6b7280">Badge: ${d.inspectorStamp}</div>` : ""}</div>` : ""}
    </div>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px" class="avoid-break">
      <div style="font-size:10px;font-weight:800;color:#374151;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:7px;border-bottom:2px solid #dc2626">👤 Customer</div>
      ${d.customerName ? `<div style="font-size:14px;font-weight:800;margin-bottom:7px">${d.customerName}</div>` : '<div style="font-size:12px;color:#9ca3af;margin-bottom:7px">Not specified</div>'}
      ${d.customerPhone ? `<div class="info-row"><span class="info-label">Phone</span><span class="info-val">${d.customerPhone}</span></div>` : ""}
      ${d.customerEmail ? `<div class="info-row"><span class="info-label">Email</span><span style="font-weight:600;font-size:11px;color:#374151;text-align:right">${d.customerEmail}</span></div>` : ""}
      ${d.notes ? `<div style="margin-top:10px;padding:8px;background:#fffbeb;border:1px solid #fde68a;border-radius:6px;font-size:11px;color:#92400e"><strong>Notes:</strong> ${d.notes}</div>` : ""}
    </div>
  </div>
</div>

<!-- ══════════════ RATINGS ══════════════ -->
<div class="section-pad" style="background:#fff;border-bottom:1px solid #e5e7eb" class="avoid-break">
  <div style="font-size:15px;font-weight:800;margin-bottom:14px;display:flex;align-items:center;gap:9px">
    <span style="background:#fee2e2;color:#dc2626;padding:5px 9px;border-radius:7px;font-size:16px">📊</span>
    Category Ratings
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:2px 36px">
    ${ratingBar("Exterior Condition", d.ratings?.exterior || 0)}
    ${ratingBar("Interior & Comfort", d.ratings?.interior || 0)}
    ${ratingBar("Electrical Systems", d.ratings?.electrical || 0)}
    ${ratingBar("Mechanical Performance", d.ratings?.mechanical || 0)}
    ${ratingBar("Heating & Cooling", d.ratings?.heatingCooling || 0)}
    ${ratingBar("Tyres & Shocks", d.ratings?.tyresShocks || 0)}
  </div>
  <div style="margin-top:14px;padding:13px 16px;background:linear-gradient(135deg,#fef2f2,#fff7f7);border:2px solid ${rc(d.ratings?.overall || 0)};border-radius:9px;display:flex;justify-content:space-between;align-items:center">
    <span style="font-size:14px;font-weight:700">Overall Vehicle Condition</span>
    <div style="display:flex;align-items:center;gap:9px">
      <span style="font-size:34px;font-weight:900;color:${rc(d.ratings?.overall || 0)}">${d.ratings?.overall || 0}</span>
      <div><div style="font-size:11px;color:#9ca3af">/10</div><div style="font-size:13px;font-weight:700;color:${rc(d.ratings?.overall || 0)}">${rl(d.ratings?.overall || 0)}</div></div>
    </div>
  </div>
</div>

<!-- ══════════════ CHECKLIST SECTIONS ══════════════ -->
<div class="section-pad" style="background:#f9fafb;border-bottom:1px solid #e5e7eb">
  <div style="font-size:15px;font-weight:800;margin-bottom:14px;display:flex;align-items:center;gap:9px">
    <span style="background:#fee2e2;color:#dc2626;padding:5px 9px;border-radius:7px;font-size:16px">📋</span>
    Detailed Inspection Checklists
  </div>

  <!-- CAR BODY DIAGRAM -->
  ${
    hasZones
      ? buildDiagramSVG(zm)
      : `
  <div style="margin-bottom:20px;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb">
    <div style="background:linear-gradient(135deg,#7f1d1d,#991b1b);color:white;padding:10px 16px;">
      <span style="font-size:13px;font-weight:800">🚗 Vehicle Body Diagram</span>
    </div>
    <div style="padding:20px;text-align:center;color:#9ca3af;font-size:12px;background:#fff">
      No body zones were marked during this inspection.
    </div>
  </div>`
  }

  ${checkTable("1. Exterior Details (40 Items)", d.exteriorDetails || [])}
  ${checkTable("2. Interior & Comfort", d.interiorComfort || [])}
  ${checkTable("3. Electrical Systems", d.electrical || [])}
  ${checkTable("4. Mechanical & Driving", d.mechanical || [])}
  ${checkTable("5. Heating & Cooling", d.heatingCooling || [], true)}
  ${checkTable("6. Tyres & Shocks", d.tyresShocks || [])}
</div>

<!-- ══════════════ FOOTER ══════════════ -->
<div style="background:linear-gradient(135deg,#0a0005,#3f0000);color:white;padding:22px 28px" class="avoid-break">
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:22px;margin-bottom:18px">

    <!-- Inspector Details -->
    <div>
      <div style="font-size:10px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;font-weight:700">Inspector Details</div>
      <div style="margin-bottom:10px">
        <div style="font-size:9px;color:#6b7280;margin-bottom:2px">INSPECTOR NAME</div>
        <div style="font-size:13px;font-weight:700;color:#e5e7eb;min-height:18px;border-bottom:1px solid #374151;padding-bottom:3px">${d.inspectorName || "_________________________"}</div>
      </div>
      <div style="margin-bottom:12px">
        <div style="font-size:9px;color:#6b7280;margin-bottom:2px">SIGNATURE</div>
        <div style="border-bottom:1.5px solid #374151;width:170px;height:34px;display:flex;align-items:flex-end;padding-bottom:2px">
          <span style="font-size:13px;color:#d1d5db;font-style:italic">${d.inspectorSign || ""}</span>
        </div>
      </div>
      <div>
        <div style="font-size:9px;color:#6b7280;margin-bottom:4px">STAMP / BADGE</div>
        <div style="border:1.5px dashed #4b5563;width:66px;height:66px;border-radius:50%;display:flex;align-items:center;justify-content:center">
          <div style="font-size:10px;color:#4b5563;text-align:center;line-height:1.3;font-weight:600">${d.inspectorStamp || "STAMP"}</div>
        </div>
      </div>
    </div>

    <!-- Center: Logo + Verified -->
    <div style="text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center">
      <div>
  <img src="http://localhost:5000/images/logo.png"
        alt="AutoGemz Logo"
        style="width:70px;height:70px;object-fit:contain">
</div>
      <div style="font-size:17px;font-weight:900;color:#fff;margin-bottom:3px">AutoGemz</div>
      <div style="font-size:10px;color:#dc2626;font-weight:700;letter-spacing:1.5px">✓ VERIFIED BY AUTOGEMZ</div>
      <div style="font-size:9px;color:#6b7280;margin-top:2px">Professional Vehicle Inspection</div>
      <div style="margin-top:12px">
        <div style="font-size:20px;font-weight:900;color:${rc(d.ratings?.overall || 0)}">${d.ratings?.overall || 0}<span style="font-size:11px;color:#9ca3af">/10</span></div>
        <div style="font-size:10px;color:${rc(d.ratings?.overall || 0)};font-weight:700">${rl(d.ratings?.overall || 0)}</div>
      </div>
    </div>

    <!-- Summary -->
    <div style="text-align:right">
      <div style="font-size:10px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;font-weight:700">Report Summary</div>
      <div style="font-size:14px;font-weight:700;color:#e5e7eb;margin-bottom:3px">${d.vehicleMake} ${d.vehicleModel || ""}</div>
      ${d.registrationNo ? `<div style="font-size:12px;color:#9ca3af;font-family:monospace;letter-spacing:1.5px;margin-bottom:3px">${d.registrationNo}</div>` : ""}
      ${d.customerName ? `<div style="font-size:11px;color:#9ca3af;margin-bottom:3px">Customer: ${d.customerName}</div>` : ""}
      <div style="font-size:11px;color:#9ca3af;margin-bottom:3px">Date: ${date}</div>
      <div style="margin-top:9px;padding:8px 12px;background:rgba(220,38,38,0.1);border:1px solid rgba(220,38,38,0.3);border-radius:7px;display:inline-block">
        <div style="font-size:10px;color:#fca5a5;margin-bottom:1px">Overall Rating</div>
        <div style="font-size:16px;font-weight:900;color:${rc(d.ratings?.overall || 0)}">${d.ratings?.overall || 0}/10 — ${rl(d.ratings?.overall || 0)}</div>
      </div>
    </div>
  </div>

  <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:12px;display:flex;justify-content:space-between;align-items:center">
    <div style="font-size:10px;color:#9ca3af">© ${new Date().getFullYear()} AutoGemz. All rights reserved. This report is confidential and generated digitally.</div>
    <div style="font-size:10px;color:#9ca3af"><a style="font-size:10px;color:#9ca3af; text-decoration:none;" href="http://www.autogemz.com" target="_blank">www.autogemz.com</a></div>
  </div>
</div>

</div><!-- /page -->
</body>
</html>`;
}

module.exports = router;
