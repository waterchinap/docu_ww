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

function main() {
    const inputDirectory = path.join(__dirname, 'docs', 'bydate');
    const outputDirectory = path.join(__dirname, 'docs', 'bydate-merged');

    // 创建输出目录
    if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory, { recursive: true });
    }

    const filesByDate = groupFilesByDate(inputDirectory);
    mergeFiles(filesByDate, outputDirectory);

    console.log('文件合并完成');
}

main();