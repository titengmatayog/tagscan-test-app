import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  students: defineTable({
    fullName: v.string(),
    gradeLevel: v.string(),
    strand: v.string(),
    section: v.string(),
    lrnNumber: v.string(),
    // Optional fields for backward compatibility
    createdBy: v.optional(v.id("users")),
    qrCodeData: v.optional(v.string()),
  })
    .index("by_lrn", ["lrnNumber"])
    .index("by_qr", ["qrCodeData"]), // ✅ Added index for QR lookup

  attendance: defineTable({
    studentId: v.id("students"),
    fullName: v.string(),
    gradeLevel: v.string(),
    strand: v.string(),
    section: v.string(),
    lrnNumber: v.string(),
    date: v.string(),
    timestamp: v.number(),
    scannedBy: v.id("users"),
  })
    .index("by_student_date", ["studentId", "date"])
    .index("by_date", ["date"])
    .index("by_student", ["studentId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
