import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// 定义类型
interface Tool {
  website名称: string;
  网址: string;
  描述: string;
}

interface Category {
  [key: string]: Tool[];
}

interface SubCategory {
  [key: string]: Category;
}

interface MainCategory {
  [key: string]: SubCategory;
}

// 读取所有工具类别
app.get('/api/categories', (req, res) => {
  const toolsDir = path.join(__dirname, '../tools_json');
  const categories: MainCategory = {};

  try {
    const files = fs.readdirSync(toolsDir);
    
    files.forEach(file => {
      if (file.endsWith('.txt')) {
        const content = fs.readFileSync(path.join(toolsDir, file), 'utf-8');
        const data = JSON.parse(content);
        Object.assign(categories, data);
      }
    });

    res.json(categories);
  } catch (error) {
    console.error('Error reading categories:', error);
    res.status(500).json({ error: 'Failed to read categories' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 