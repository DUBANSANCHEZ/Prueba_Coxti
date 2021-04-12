var ibmdb = require("ibm_db");
connStr = "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-08.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=cck54490;PWD=ht50pk0jf0m@k4qh;";

try {
    var option = { connectTimeout: 60, systemNaming: true};
    var conn = ibmdb.openSync(connStr, option);
    console.log("Se conecto correctamente a la DB");

} catch (e) {
    console.log(e.message);
}

module.exports = conn;