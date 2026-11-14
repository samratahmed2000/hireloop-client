import { format } from "date-fns"
import {
  applicationStatusMeta,
  getAppliedAt,
  normalizeApplicationStatus,
} from "@/lib/applications"
import type { Application } from "@/lib/types/applications"

const htmlEscapes: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => htmlEscapes[character])
}

export function exportApplicationsToPdf(applications: Application[]) {
  const printWindow = window.open("", "_blank")

  if (!printWindow) {
    return false
  }

  const rows = applications
    .map((application) => {
      const appliedAt = getAppliedAt(application)
      const status = normalizeApplicationStatus(application.status)

      return `<tr>
        <td>
          <div class="title">${escapeHtml(application.jobTitle)}</div>
          ${application.jobType ? `<div class="muted">${escapeHtml(application.jobType)}</div>` : ""}
        </td>
        <td>${escapeHtml(application.companyName)}</td>
        <td>${appliedAt ? format(appliedAt, "MMM d, yyyy") : "—"}</td>
        <td><span class="status">${applicationStatusMeta[status].label}</span></td>
      </tr>`
    })
    .join("")

  printWindow.document.write(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My Applications</title>
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 32px;
        color: #18181b;
        font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
        font-size: 13px;
      }
      header { margin-bottom: 24px; }
      h1 { margin: 0; font-size: 22px; }
      p { margin: 6px 0 0; color: #71717a; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 10px 12px; text-align: left; vertical-align: top; }
      th { border-bottom: 1px solid #e4e4e7; color: #71717a; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; }
      td { border-bottom: 1px solid #f4f4f5; }
      .title { font-weight: 600; }
      .muted { margin-top: 2px; color: #71717a; font-size: 11px; }
      .status { display: inline-block; border: 1px solid #e4e4e7; border-radius: 999px; padding: 2px 8px; font-size: 10px; font-weight: 600; }
      @page { margin: 16mm; }
    </style>
  </head>
  <body>
    <header>
      <h1>My Applications</h1>
      <p>Exported ${format(new Date(), "MMM d, yyyy")} · ${applications.length} application${applications.length === 1 ? "" : "s"}</p>
    </header>
    <table>
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Company</th>
          <th>Applied</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </body>
</html>`)

  printWindow.document.close()
  printWindow.focus()
  printWindow.print()

  return true
}
