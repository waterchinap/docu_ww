const fs = require('fs');
const path = require('path');

function createIndexFiles(directory) {
    // 读取目录中的所有文件和子目录
    fs.readdir(directory, { withFileTypes: true }, (err, items) => {
        if (err) {
            console.error('无法读取目录:', err);
            return;
        }

        items.forEach(item => {
            const itemPath = path.join(directory, item.name);

            // 检查是否为目录
            if (item.isDirectory()) {
                // 创建 index.md 文件路径
                const indexFilePath = path.join(itemPath, 'index.md');

                // 创建 index.md 文件内容
                const content = `# ${item.name}`;

                // 写入 index.md 文件
                fs.writeFile(indexFilePath, content, err => {
                    if (err) {
                        console.error(`无法创建文件 ${indexFilePath}:`, err);
                    } else {
                        console.log(`已创建文件 ${indexFilePath}`);
                    }
                });
            }
        });
    });
}

function main() {
    // 获取命令行参数
    const args = process.argv.slice(2);

    // 检查参数是否存在
    if (args.length === 0) {
        console.error('请提供目录路径作为参数');
        return;
    }

    // 指定目录路径
    const directory = args[0];

    // 为每个子目录创建 index.md 文件
    createIndexFiles(directory);
}

main();