
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Claim = require("../models/claim");
const Item = require("../models/Item");

const {
  verifyToken,
  verifyAdmin
} = require("../middleware/authMiddleware");

// POST: Submit a claim
router.post("/", async (req, res) => {
  try {
    const { itemId, claimantName, email, message } = req.body;

    if (!itemId || !claimantName || !email || !message) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({
        message: "Invalid item ID"
      });
    }

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    const newClaim = new Claim({
      itemId,
      claimantName,
      email,
      message
    });

    const savedClaim = await newClaim.save();

    res.status(201).json({
      message: "Claim submitted successfully",
      claim: savedClaim
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// GET: View all claims (Admin only)
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate("itemId")
      .sort({ createdAt: -1 });

    res.status(200).json(claims);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// PATCH: Approve or reject a claim (Admin only)
router.patch("/:id/status", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be Approved or Rejected"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid claim ID"
      });
    }

    const claim = await Claim.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!claim) {
      return res.status(404).json({
        message: "Claim not found"
      });
    }

    res.status(200).json({
      message: "Claim status updated successfully",
      claim
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
