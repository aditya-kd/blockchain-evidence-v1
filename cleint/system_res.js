function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
function displaySysInfo(){
    const os = require('os');
    ptfm = os.platform();
    architecture = os.arch();
    cpu_usage = os.cpus();
    mem_in_use = os.totalmem()-os.freemem();
    working_directory = os.homedir();

    console.log("Sytem Resource Information");
    console.log("Current Platform: ",ptfm);
    console.log("Architecture: ",architecture);
    console.log("CPU Usage: ", cpu_usage);
    console.log("Memory in-use: ", mem_in_use, "bytes");
}

displaySysInfo();