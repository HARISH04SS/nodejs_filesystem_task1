const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Timestamp API!');
});

// Endpoint to create a timestamp file
app.get('/create-timestamp-file', (req, res) => {
    // Get the current date and time
    const now = new Date();
    const timestamp = now.toISOString();
    
    // Format the file name as "YYYY-MM-DDTHH-MM-SS.txt"
    const fileName = now.toISOString().replace(/:/g, '-').split('.')[0] + '.txt';


    const folderPath = __dirname;  

    const filePath = path.join(folderPath, fileName);

    // Write the current timestamp to the file
    fs.writeFile(filePath, timestamp, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).json({ message: 'Error creating file' });
        }
        console.log(`File created: ${filePath}`);
        res.json({ message: 'File created successfully', fileName });
    });
});

// Endpoint to retrieve all text files in the folder
app.get('/list-text-files', (req, res) => {
    const folderPath = __dirname; 

    // Read the directory and filter out non-text files
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).json({ message: 'Error reading directory' });
        }

        // Filter the files to only include .txt files
        const textFiles = files.filter(file => path.extname(file) === '.txt');

        // Respond with the list of .txt files
        res.json({ files: textFiles });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
