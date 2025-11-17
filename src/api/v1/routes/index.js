const express = require("express");
const router = express.Router();

// API Routes (REST API endpoints)
const meetingRoutes = require("./meetings.routes");
const userRoutes = require("./users.routes");
const fileShareRoutes = require("./fileShare.routes");
const meetingScheduleRoutes = require("./meetingSchedule.routes");
const rolePermissionRoutes = require("./rolePermission.routes");
const breakoutRoomRoutes = require("./breakoutRoom.routes");

// Mount API routes under /api/v1
router.use("/users", userRoutes);
router.use("/meetings", meetingRoutes);
router.use("/files", fileShareRoutes);
router.use("/schedules", meetingScheduleRoutes);
router.use("/roles", rolePermissionRoutes);
router.use("/breakout", breakoutRoomRoutes);

module.exports = router;
