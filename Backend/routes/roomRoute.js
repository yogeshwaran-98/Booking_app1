const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const {
  getRooms,
  getRoom,
  createNewRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");
const auth = require("../middlewares/auth");

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "RoomImagesUpload/RoomImages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", getRooms);
router.get("/:id", getRoom);
router.post("/create", auth, upload.single("image"), createNewRoom);
router.put("/:id", auth, updateRoom);
router.delete("/:id", auth, deleteRoom);

module.exports = router;
