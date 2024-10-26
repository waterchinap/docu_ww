const fs = require('fs');
const path = require('path');

function createSubfoldersAndMoveFiles(directory) {
    // 读取目录中的所有文件
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('无法读取目录:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directory, file);

            // 检查文件是否为 Markdown 文件
            if (path.extname(file) === '.md') {
                // 获取文件名（不带扩展名）
                const fileName = path.basename(file, '.md');

                // 提取日期部分（假设文件名格式为 YYYY-MM-DD）
                const datePart = fileName.substring(0, 7); // 提取前7个字符，即 YYYY-MM

                // 创建子文件夹路径
                const subfolderPath = path.join(directory, datePart);

                // 如果子文件夹不存在，创建它
                if (!fs.existsSync(subfolderPath)) {
                    fs.mkdirSync(subfolderPath, { recursive: true });
                }

                // 移动文件到相应的子文件夹
                const newFilePath = path.join(subfolderPath, file);
                fs.renameSync(filePath, newFilePath);
            }
        });
    });
}

function main() {
    // 指定文件夹路径
    const directory = 'docs/bydays';

    // 创建子文件夹并将文件分类保存
    createSubfoldersAndMoveFiles(directory);
}

main();