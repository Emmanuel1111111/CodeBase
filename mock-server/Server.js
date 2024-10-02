const express = require('express');
const cors = require('cors'); 
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_secret_key'; 
const clientDetailsFilePath = path.join(__dirname, 'client.json');
const coursesFilePath = path.join(__dirname, 'courses.json');

app.use(cors());

app.use(bodyParser.json());

const readDataFromFile = (filePath, callback) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      callback(null);
    } else {
      try {
        callback(JSON.parse(data));
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
        callback(null);
      }
    }
  });
};

const writeDataToFile = (filePath, data, callback) => {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      callback(false);
    } else {
      callback(true);
    }
  });
};

// Register route
app.post('/api/register', (req, res) => {
  const { username,  password } = req.body;
  
  if (!username || !password ) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  readDataFromFile(clientDetailsFilePath, (users) => {
    if (!users) {
      return res.status(500).json({ error: 'Failed to read client details' });
    }

    const userExists = users.some((user) => user.username === username);
    if (userExists) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = { id: users.length + 1, username, password: hashedPassword,  };
    users.push(newUser);

    writeDataToFile(clientDetailsFilePath, users, (success) => {
      if (success) {
     
        const token = jwt.sign({ id: newUser.id }, SECRET_KEY, { expiresIn: 36543 }); // 24 hours
        res.status(201).json({ id:newUser.id, authToken: token, message: 'User registered successfully' });
      } else {
        res.status(500).json({ error: 'Failed to save client details' });
      }
    });
    });
    
  });
 


// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  readDataFromFile(clientDetailsFilePath, (users) => {
    if (!users) {
      return res.status(500).json({ error: 'Failed to read client details' });
    }

    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ authToken: null, error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 766 }); // 24 hours
    res.status(200).json({ id:user.id ,authToken: token , email:user.email});
  });
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    next();
  });
};

// Protected route example
app.get('/api/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', userId: req.userId });
});

// Public routes
app.get('/api/client', (req, res) => {
  readDataFromFile(clientDetailsFilePath, (data) => {
    if (data) {
      res.json(data);
    } else {
      res.status(500).json({ error: 'Failed to read client details' });
    }
  });
});

app.post('/api/client', (req, res) => {
  const newClient = req.body;
  readDataFromFile(clientDetailsFilePath, (data) => {
    if (data && Array.isArray(data)) {
      data.push(newClient);
      writeDataToFile(clientDetailsFilePath, data, (success) => {
        if (success) {
          res.status(201).json(newClient);
        } else {
          res.status(500).json({ error: 'Failed to save client details' });
        }
      });
    } else {
      res.status(500).json({ error: 'Failed to read client details' });
    }
  });
});

app.get('/api/courses', (req, res) => {
  readDataFromFile(coursesFilePath, (data) => {
    if (data) {
      res.json(data);
    } else {
      res.status(400).json({ error: 'Failed to read courses' });
    }
  });
});

app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);

  readDataFromFile(clientDetailsFilePath, (users) => {
    if (!users) {
      return res.status(500).json({ error: 'Failed to read client details' });
    }

    const user = users.find(u => u.id === userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
