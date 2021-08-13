// 文件上传 npm i multer
const multer = require("multer");
const fs = require("fs");
const path = require("path");

/**
 * 文件上传
 * 参数说明：接收一个 options 对象作为参数，该对象包含三个属性
 * - path：图片上传路径
 * - key：与前端 formData 对象的 fieldname 相匹配（即 formData.append()方法的第一个参数）
 * - size: 设置图片最大限制，单位 kb
 */
function uploadFiles(options = {}) {
  // 1. 对参数 options 进行解构并设置默认值
  const { path = "./public/temp", key = "file", size = 1000 } = options;
  // 2. 设置 multer 的参数，配置 diskStorage，来控制文件存储的位置以及文件名字等
  const storage = multer.diskStorage({
    // 2.1 确定图片存储的位置
    destination: function (req, file, cb) {
      // 当 path 所对应目录不存在时，则自动创建该文件
      mkdirsSync(path);
      cb(null, path);
    },
    // 2.2 确定图片存储时的名字。（注意：如果使用原名，可能会造成再次上传同一张图片的时候的冲突）
    filename: function (req, file, cb) {
      var changedName = `${new Date().getTime()}-${parseInt(
        Math.random() * 10000000
      )}-${file.originalname}`;
      cb(null, changedName);
    },
  });
  // 3. 配置图片限制
  const limits = {
    // 限制文件大小 1000 kb
    fileSize: 1024 * size,
    // 限制文件数量
    files: 10,
  };
  // 4.生成的专门处理上传的一个工具，可以传入 storage、limits 等配置
  const upload = multer({ storage, limits });
  // 5. 返回多文件上传的设置信息（同样可用于单文件上传）
  return upload.array(key);
}

/**
 *
 * @param {'object'}
 * -fromPath -移动前源目录
 * -toPath -移动后目标目录
 * -filename -文件名
 */
function moveFiles({ fromPath, toPath, filename } = {}) {
  if (!filename) {
    console.log("文件移动失败：filename 文件名不能为空");
    return;
  }
  // 要移动的文件的原路径
  const sourceFile = path.join(fromPath, filename);
  // 判断源文件是否存在
  try {
    fs.accessSync(sourceFile,fs.constants.F_OK);
  } catch (error) {
    console.log(error);
    console.log("文件移动失败：" + sourceFile + " 该文件不存在。");
    return;
  }
  // 判断文件要移动的新路径是否存在，如果不存在，则创建
  try {
    fs.accessSync(toPath,fs.constants.F_OK);
  } catch (error) {
    fs.mkdirSync(toPath);
  }
  // 文件移动后的新路径
  const newFile = path.join(toPath, filename);
  fs.renameSync(sourceFile, newFile);
}

/**
 *
 * @param {'path'}  dir -dir参数为路径可以为文件夹或文件
 */
function deleteFiles(dir) {
  // 判断 dir 是否存在
  try {
    fs.accessSync(dir,fs.constants.F_OK);
  } catch (error) {
    console.log(dir + " 该路径不存在。");
    return;
  }
  try {
    // 判断 dir 是文件还是文件夹
    const stats = fs.statSync(dir);
    if (stats.isFile()) {
      fs.unlinkSync(dir);
    }
    if (stats.isDirectory()) {
      // 判断该文件是否为空
      const files = fs.readdirSync(dir);
      files.forEach((item) => {
        deleteFiles(path.join(dir, item));
      });
      // 删除空文件夹
      fs.rmdirSync(dir);
    }
  } catch (error) {
    console.log("文件删除失败：");
    console.log(error);
  }
}

function mkdirsSync(dirname) {
  try {
    fs.accessSync(dirname, fs.constants.F_OK);
    return true;
  } catch (error) {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

module.exports = { uploadFiles, moveFiles, deleteFiles };
