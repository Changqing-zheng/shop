const MOCKURL = "http://www.zcq.com/"; //mock模拟
const SERVER = "http://localhost:3000/"; //真实接口

const url = {
    getVarietyItem: MOCKURL + 'getVarietyItem',
    registUser: SERVER + 'user/registUser',
    loginUser: SERVER + "user/loginUser"
};

export default url;