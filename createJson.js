const fs = require('fs');
const path = require('path');

function createCategoryJsonFiles(directory) {
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
                // 创建 _category_.json 文件路径
                const categoryFilePath = path.join(itemPath, '_category_.json');

                // 创建 _category_.json 文件内容
                const label = item.name;
                const position = parseInt(item.name.replace(/-/g, ''), 10);
                const content = {
                    label: label,
                    position: position,
                    link: {
                        type: 'generated-index'
                    }
                };

                // 写入 _category_.json 文件
                fs.writeFile(categoryFilePath, JSON.stringify(content, null, 2), err => {
                    if (err) {
                        console.error(`无法创建文件 ${categoryFilePath}:`, err);
                    } else {
                        console.log(`已创建文件 ${categoryFilePath}`);
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

    // 为每个子目录创建 _category_.json 文件
    createCategoryJsonFiles(directory);
}

main();