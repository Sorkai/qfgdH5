<?php
// 设置响应头，允许跨域（方便调试）和返回JSON格式
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// 定义存储数据的文件名
$filename = 'count.txt';

// 如果文件不存在，则创建并初始化为 0
if (!file_exists($filename)) {
    file_put_contents($filename, '0');
}

// 打开文件进行读写
$fp = fopen($filename, 'c+');

if (flock($fp, LOCK_EX)) { // 获取独占锁，防止并发冲突
    // 读取当前数值
    $count = (int)fread($fp, filesize($filename));
    
    // 计数 +1
    $count++;
    
    // 清空文件内容并重置指针
    ftruncate($fp, 0);
    rewind($fp);
    
    // 写入新数值
    fwrite($fp, $count);
    
    // 释放锁
    flock($fp, LOCK_UN);
} else {
    // 如果无法获取锁，就只读取不增加（极端情况兜底）
    $count = (int)file_get_contents($filename);
}

fclose($fp);

// 返回 JSON 数据
echo json_encode(['count' => $count]);
?>