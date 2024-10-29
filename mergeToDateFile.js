const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');

function groupFilesByDate(directory) {
    const filesByDate = {};

    fs.readdirSync(directory).forEach(file => {
        const filePath = path.join(directory, file);
        const date = path.basename(file, '.md');
        const monthDay = date.slice(5); // 提取月和日，例如 '01-01'

        if (!filesByDate[monthDay]) {
            filesByDate[monthDay] = [];
        }

        filesByDate[monthDay].push(filePath);
    });

    return filesByDate;
}

function mergeFiles(filesByDate, outputDirectory) {
    Object.keys(filesByDate).forEach(monthDay => {
        const mergedContent = filesByDate[monthDay].map(filePath => {
            return fs.readFileSync(filePath, 'utf8');
        }).join('\n\n');

        const outputFilePath = path.join(outputDirectory, `${monthDay}.md`);
        fs.writeFileSync(outputFilePath, mergedContent);
    });
}

function main(inputDirectory, outputDirectory) {
    // 创建输出目录
    if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory, { recursive: true });
    }

    const filesByDate = groupFilesByDate(inputDirectory);
    mergeFiles(filesByDate, outputDirectory);

    console.log('文件合并完成');
}

// 获取命令行参数
const args = process.argv.slice(2);
const inputDir = args[0];
const outDir = args[1];

if (!inputDir || !outDir) {
    console.error('请提供输入目录和输出目录参数');
    process.exit(1);
}

main(inputDir, outDir);