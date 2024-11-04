// index.js

const express = require("express");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");

// Khởi tạo Supabase
const SUPABASE_URL = "https://ovvjxywdgzuczxnltsni.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92dmp4eXdkZ3p1Y3p4bmx0c25pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2MDcxMjEsImV4cCI6MjA0NjE4MzEyMX0.5QgJ8j5sQwOiTcfBvkp3Sa5fA12wCPSsEJWaOAptPcc";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Khởi tạo Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Endpoint kiểm tra tính hợp lệ của email
app.post("/validate-email", async (req, res) => {
  const { token_hash } = req.query;

  if (!token_hash) {
    return res.status(400).json({ error: "Fail to get token_hash" });
  }

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: "email",
    });

    if (error?.message) {
      return res.status(500).json({ error: error.message });
    }

    return {
      data,
    };
  } catch (err) {
    return res.status(500).json({ error: "Something wrong: " + err.message });
  }
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
