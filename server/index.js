const express = require('express');
require('dotenv').config();
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3002;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
//Loginpage
const jwtSecretKey = process.env.JWT_SECRET
// console.log(jwtSecretKey)

app.post('/register', async (req, res) => {
  const { username, password, role, email, phonenumber } = req.body;
  try {
    const checkEmailQuery = 'SELECT * FROM loginpage WHERE email = ?';
    db.query(checkEmailQuery, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error checking email' });
      }

      if (results.length > 0) {
        return res.status(400).json({ success: false, message: 'Email is already registered' });
      }

      const checkUsernameQuery = 'SELECT * FROM loginpage WHERE username = ?';
      db.query(checkUsernameQuery, [username], async (err, usernameResults) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Error checking username' });
        }

        if (usernameResults.length > 0) {
          return res.status(400).json({ success: false, message: 'Username is already taken' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = 'INSERT INTO loginpage (username, password, role, email, phonenumber) VALUES (?, ?, ?, ?, ?)';
        db.query(insertQuery, [username, hashedPassword, role, email, phonenumber], (err, result) => {
          if (err) {
            return res.status(500).json({ success: false, message: 'Error inserting data' });
          }
          return res.status(201).json({
              success: true,
              message: "Signup successful 🎉",
          });
        });
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error processing request' });
  }
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}
 
function sendOTP(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:  process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
 
  const mailOptions = {
    from: "naveenmenda1030@gmail.com",
    to: email,
    subject: "OTP for Login",
    text: `Your OTP for login is: ${otp}`,
  };
 
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  const userQuery = 'SELECT otp FROM loginpage WHERE email = ?';
  db.query(userQuery, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'DB error' });
    }

    if (results.length === 0) {
      return res.status(400).json({ success: false, message: 'Email not registered' });
    }

    const storedOTP = results[0].otp;

    console.log("Entered OTP:", otp);
    console.log("Stored OTP:", storedOTP);

    if (String(otp) === String(storedOTP)) {
      return res.json({ success: true, message: 'OTP verified successfully' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  });
});
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const userQuery = 'SELECT * FROM loginpage WHERE email = ?';
    db.query(userQuery, [email], async (err, results) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Error checking email' });
 
      }
      if (results.length === 0) {
        return res.status(400).json({ success: false, message: 'Email is not registered' });
      }
 
      const otp = generateOTP();
      const updateQuery = 'UPDATE loginpage SET otp = ? WHERE email = ?';
      db.query(updateQuery, [otp, email], async (err, updateResult) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Error updating OTP' });
 
        }
 
        sendOTP(email, otp);
        res.json({ success: true, message: 'OTP sent to your email for password reset' });
      });
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'An error occurred while sending OTP' });
  }
});
 
app.post('/change-password', async (req, res) => {
  const { email, newPassword } = req.body;
 
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    db.query(
      'UPDATE loginpage SET password = ? WHERE email = ?',
      [hashedPassword, email],
      (error, results, fields) => {
        if (error) {
          console.error('Error updating password:', error);
          return res.status(500).json({ success: false, message: 'Failed to update password.' });
        }
        res.status(200).json({ success: true, message: 'Password updated successfully.' });
      }
    );
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ success: false, message: 'Failed to update password.' });
  }
});
 
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
 
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
 
  jwt.verify(token.split(' ')[1], jwtSecretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
}
app.get('/managerdash', verifyToken, (req, res) => {
  const user = req.user;
  res.json({ success: true, username: user.username, message: `Hello, ${user.username}! You have access to this protected route.` });
});
 
app.get('/userdash', verifyToken, (req, res) => {
  const user = req.user;
  res.json({ success: true,username: user.username, message: `Hello, ${user.username}! You have access to this protected route.` });
});
 
app.get('/admindash', verifyToken, (req, res) => {
  const user = req.user;
  
  console.log("AdminDash accessed by:", user);
  res.json({ success: true,username: user.username, message: `Hello, ${user.username}! You have access to this protected route.` });
});
 
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // console.log(username, password);
 
    const query = `SELECT * FROM loginpage WHERE email = ? OR phonenumber = ?`;
    db.query(query, [email, email], async (error, results) => {
        if (error) {
            res.status(500).json({ success: false, message: 'Database error' });
        } else if (results.length > 0) {
            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const role = user.role;
                const token = jwt.sign({ username: user.username, email: user.email, role }, jwtSecretKey, { expiresIn: '30m' });
                res.cookie('token', token, { httpOnly: true });
                console.log(token);
                res.json({ success: true, role, token });
            } else {
                res.json({ success: false, message: 'Invalid credentials' });
            }
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    });
});
 
 
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'Logged out successfully' });
});
 
app.get('/login', (req, res) => {
    const query = 'SELECT * FROM loginpage';
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ success: false, message: 'Error fetching user data' });
        } else {
            res.json({ success: true, users: results });
        }
    });
});

//Products
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
app.use("/uploads", express.static(uploadDir));
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `product-${Date.now()}${ext}`);
  },
});
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);

  if (ext && mime) cb(null, true);
  else cb(new Error("Only JPG/PNG allowed"));
};
const upload = multer({ storage, fileFilter });
app.post("/products", upload.single("image"), (req, res) => {
  // console.log("FILE:", req.file); 
  // console.log("BODY:", req.body);
  const { name, description, color, size, price } = req.body;
  const image = req.file ? req.file.filename : null;
  const sql =
    "INSERT INTO products (image, Product_name, description, color, size, price) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [image, name, description, color, size, price], (err) => {
    if (err) {
      console.log("Insert Error:", err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
});
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ success: false });

    const data = results.map((item) => ({
      ...item,
      imageUrl: item.image
        ? `http://localhost:3002/uploads/${item.image}`
        : null,
    }));
    res.json(data);
  });
});
app.put("/products/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { name, description, color, size, price } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = image
    ? "UPDATE products SET image=?, Product_name=?, description=?, color=?, size=?, price=? WHERE id=?"
    : "UPDATE products SET Product_name=?, description=?, color=?, size=?, price=? WHERE id=?";

  const values = image
    ? [image, name, description, color, size, price, id]
    : [name, description, color, size, price, id];

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json({ success: false });

    res.json({ success: true });
  });
});
app.delete("/products/:id", (req, res) => {
  db.query("DELETE FROM products WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ success: false });

    res.json({ success: true });
  });
});
//Sockets
// ================= USER LOCATION =================
app.post('/api/location/user', (req, res) => {

  const { username, latitude, longitude, address } = req.body;

  if (!username) {
    return res.status(400).send("Username required");
  }

  const query = `
    INSERT INTO Ecommerce_user (username, latitude, longitude, address)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      latitude = VALUES(latitude),
      longitude = VALUES(longitude),
      address = VALUES(address)
  `;

  db.query(query, [username, latitude, longitude, address], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving user location');
    }
    res.status(200).send('User location saved successfully');
  });
});
// ================= ADMIN LOCATION =================
app.post('/api/location/admin', (req, res) => {
  const { username, latitude, longitude, address } = req.body;
  const query = `
    INSERT INTO ecommerce_admin (username, latitude, longitude, address)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      latitude = VALUES(latitude),
      longitude = VALUES(longitude),
      address = VALUES(address)
  `;

  db.query(query, [username, latitude, longitude, address], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving admin location');
    }
    res.status(200).send('Admin location saved successfully');
  });
});
app.get('/api/location/admin/:username', (req, res) => {
  const { username } = req.params;

  const query = `
    SELECT username, latitude, longitude, address
    FROM ecommerce_admin
    WHERE username = ?
  `;

  db.query(query, [username], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching admin location');
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json(result[0]);
  });
});
// ================= GET NEARBY ADMINS =================
app.get('/api/nearby-admins', (req, res) => {
  const { latitude, longitude, kms } = req.query;

  const query = `SELECT * FROM ecommerce_admin`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving admins');
    }

    const nearbyAdmins = results.filter(admin => {
      const distance = calculateDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        admin.latitude,
        admin.longitude
      );
      return distance <= kms;
    });

    res.status(200).json(nearbyAdmins);
  });
});


// ================= DISTANCE FUNCTION =================
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in KM
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
// ================= PLACE ORDER =================
function generateOrderId(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "ORD";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
app.post("/acceptOrder", (req, res) => {
  const { orderId, adminUsername } = req.body;
  const getOrderQuery = `
    SELECT * FROM placeorder_details WHERE id = ?
  `;
  db.query(getOrderQuery, [orderId], (err, orderResult) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching order");
    }
    if (orderResult.length === 0) {
      return res.status(404).send("Order not found");
    }
    const order = orderResult[0];
    const randomId = generateOrderId();
    const insertQuery = `
      INSERT INTO order_details
      (order_id, customer_username, product_id, quantity, pickup_address, admin_username, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [
        randomId,
        order.username,
        order.product_id,
        order.quantity,
        order.address,
        adminUsername,
        "accepted"
      ],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error saving accepted order");
        }
        db.query(
          `UPDATE placeorder_details SET status = 'ACCEPTED' WHERE id = ?`,
          [orderId]
        );
        io.emit("orderUpdated");

        res.status(200).json({
          message: "Order accepted successfully",
          generatedId: randomId
        });
      }
    );
  });
});
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  socket.on('registerAdmin', (data) => {
    const { username } = data;

    const query = `
      UPDATE ecommerce_admin
      SET socketId = ?
      WHERE username = ?
    `;

    db.query(query, [socket.id, username], (err, result) => {
      if (err) {
        console.error('Error updating admin socket ID:', err);
      } else {
        console.log('Socket ID saved for:', username);
      }
    });
  });

  // Accept Order
  socket.on('acceptOrder', (data) => {

  const updateQuery = `
    UPDATE placeorder_details
    SET status = 'ACCEPTED'
    WHERE id = ? AND status = 'PENDING'
  `;

  db.query(updateQuery, [data.orderId], (err) => {
    if (err) {
      console.error("Accept socket error:", err);
      return;
    }

    // 🔥 Notify ALL connected admins
    io.emit('orderAccepted', { orderId: data.orderId });
  });
});


  // Reject Order
  socket.on('rejectOrder', (order) => {

    const updateQuery = `
      UPDATE order_details
      SET status = 'REJECTED'
      WHERE id = ?
    `;
    db.query(updateQuery, [order.orderId]);
    socket.emit('orderRejected', order);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
app.get("/orderDetails", verifyToken, (req, res) => {
  const username = req.user.username;
  const query = `
    SELECT 
      od.id,
      od.order_id,
      od.quantity,
      od.status,
      od.pickup_address,
      od.created_at,
      p.id AS product_id,
      p.image,
      p.Product_name,
      p.description,
      p.color,
      p.size,
      p.price
    FROM order_details od
    JOIN products p ON od.product_id = p.id
    WHERE od.customer_username = ?
    ORDER BY od.id DESC
  `;

  db.query(query, [username], (err, result) => {
    if (err) {
      console.error("Join Error:", err);
      return res.status(500).json({ error: "Failed to fetch order details" });
    }

    res.status(200).json(result);
  });
});
//order placed afterpayment success
app.post("/placeorder", verifyToken, (req, res) => {
  const username = req.user.username;

  const {
    productId,
    quantity,
    address,
    paymentMethod,
    handling,
    assembly,
    deliveryDate,
    status
  } = req.body;

  const query = `
    INSERT INTO placeorder_details
    (username, product_id, quantity, address, payment_method, handling, assembly, delivery_date, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      username,
      productId,
      quantity,
      address,
      paymentMethod,
      handling,
      assembly,
      deliveryDate,
      status || "pending"
    ],
    (err, result) => {
      if (err) {
        console.error("Order Insert Error:", err);
        return res.status(500).json({ message: "Order failed" });
      }

      const orderData = {
        orderId: result.insertId,
        username,
        productId,
        quantity,
        pickupAddress: address
      };

      // 🔥 Send to all connected admins
      io.emit("newOrder", orderData);

      res.status(200).json({
        message: "Order placed successfully",
        orderId: result.insertId
      });
    }
  );
});
// Get all placed orders (Admin side)
app.get("/placeorders", verifyToken, (req, res) => {
  const query = `
    SELECT * FROM placeorder_details
    WHERE status = 'PENDING'
    ORDER BY id DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Fetch Orders Error:", err);
      return res.status(500).json({ message: "Error fetching orders" });
    }

    res.status(200).json(results);
  });
});
//Cart
app.post("/addToCart", verifyToken, (req, res) => {
  const { productId, quantity } = req.body;
  const username = req.user.username;
  const sql = `
    INSERT INTO cart (username, product_id, quantity)
    VALUES (?, ?, ?)
  `;
  db.query(sql, [username, productId, quantity], (err) => {
    if (err) {
      console.error("Cart Insert Error:", err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true, message: "Added to cart" });
  });
});
app.delete("/removeFromCart/:cartId", verifyToken, (req, res) => {
  const cartId = req.params.cartId;
  const username = req.user.username;

  const sql = `
    DELETE FROM cart 
    WHERE id = ? AND username = ?
  `;

  db.query(sql, [cartId, username], (err, result) => {
    if (err) {
      console.error("Delete cart error:", err);
      return res.status(500).json({ success: false });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ success: true, message: "Item removed from cart" });
  });
});
app.get("/getCart", verifyToken, (req, res) => {
  const username = req.user.username;

  const sql = `
    SELECT 
      cart.id AS cart_id,
      cart.quantity,
      products.id AS product_id,
      products.Product_name,
      products.description,
      products.price,
      products.image
    FROM cart
    JOIN products ON cart.product_id = products.id
    WHERE cart.username = ?
  `;

  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error("Get cart error:", err);
      return res.status(500).json({ success: false });
    }

    res.json({ success: true, cartItems: results });
  });
});
//favorates
app.post("/addToFavorite", verifyToken, (req, res) => {
  const username = req.user.username;
  const { product_id } = req.body;

  if (!product_id) {
    return res.status(400).json({
      success: false,
      message: "Product ID required",
    });
  }

  const query = `
    INSERT INTO favorites (username, product_id)
    VALUES (?, ?)
  `;

  db.query(query, [username, product_id], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.json({
          success: false,
          message: "Already added ❤️",
        });
      }

      console.log("Insert Favorite Error:", err);
      return res.status(500).json({
        success: false,
        error: err,
      });
    }

    res.json({
      success: true,
      message: "Added to favorites ❤️",
    });
  });
});
app.delete("/removeFromFavorite/:product_id", verifyToken, (req, res) => {
  const username = req.user.username;
  const { product_id } = req.params;

  const query = `
    DELETE FROM favorites
    WHERE username = ? AND product_id = ?
  `;

  db.query(query, [username, product_id], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }

    res.json({
      success: true,
      message: "Removed from favorites",
    });
  });
});
app.get("/getFavorites", verifyToken, (req, res) => {
  const username = req.user.username;

  const query = `
    SELECT 
      p.id,
      p.Product_name,
      p.description,
      p.color,
      p.size,
      p.price,
      p.image
    FROM favorites f
    INNER JOIN products p 
      ON f.product_id = p.id
    WHERE f.username = ?
  `;

  db.query(query, [username], (err, result) => {
    if (err) {
      console.log("Get Favorites Error:", err);
      return res.status(500).json({
        success: false,
        error: err,
      });
    }

    res.json({
      success: true,
      favorites: result,
    });
  });
});




server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 
