function decrypt (a, b, e) {
    if (!isString(a))
        return '';
    let f = [];
    e && (a = strReverse(a));
    for (let g = 0, h = 0; g < a.length; g += b,
    h++) {
        let i = a.substring(g, g + b);
        f[h] = tranFormat(i, b);
    }
    return String.fromCharCode.apply(String, f);
}

function isString (a) {
    return '[object String]' === Object.prototype.toString.call(a);
}

function strReverse (a) {
    let b, c = [];
    for (b = 0,
    l = a.length; b < l; b++)
        c[c.length] = a.charAt(b);
    return c.reverse().join('');
}

function tranFormat (a, c) {
    return a.length !== c ? 0 : round(parseInt(a.replace(/^0+/g, ''), 16) - 88, c);
}

function round (a, b) {
    let c = 1 << 4 * b;
    return 0 > a ? a % c + c : a % c;
}

// 商品信息，（4, !1）为种子
// let key1 = '00cc00953068009900c800c800c400bd00c100a800c000c700c600bd008e3069009900c800c800c400bd007800c100a800c000c700c600bd0078008e0078008b008a009f009a0078922982ca00787a53530080ac9072758d5039008c009f62a36792306888a4611d007862fd4f4f00784f4f689400788c1c6da3306900854f044e7400b6007e00c3009500c400d000cb00d000b6007e00bc009500c400cb';
//
// let key2 = 'b8a8d74c5ccc0c6888d809e809d8c8e9a8d75c7cbb68cb2c685cdbcc1ce9a8d7e9a8d799b8d7bc8ccccc0c';

// console.log(decrypt(key1, 4, !1));


function encrypt (a, b, e) {
    let f, g = [];
    if (!isString(a))
        return '';
    for (f = 0,
    l = a.length; f < l; f++)
        g[g.length] = to(a.charCodeAt(f), b);
    return e ? strReverse(g.join('')) : g.join('');
}

function to (a, c) {
    let e = '' + round(a + 88, c).toString(16)
      , f = c - e.length;
    return f > 0 ? ['0', '00', '000', '0000', '00000', '000000', '0000000', '00000000'][f - 1] + e : e;
}



// let sku = encodeURIComponent('https://item.jd.com/4586850.html#');

// console.log(encrypt(sku, 2, !0));


let testSku = encodeURIComponent('https://item.jd.com/751624.html');
let testSkuTitle = '美的(Midea)BCD-206TM(E) 206升 时尚三门三温冰箱 日耗电0.49度 HIPS环保内胆 闪白银';

console.log(`https://zhushou.huihui.cn/productSense?jsonp=youdaogouwupi1504616685415&browser=chrome&version=4.2.9.7&vendor=chromenew&av=3.0&extensionid=8cd1cdae-2dcf-1753-96f3-d9760513ea24&email=&pop=&k=${encrypt(testSkuTitle, 4, 0)}&nl=true&m=${encrypt(testSku, 2, 1)}&t=1504616685415`);
console.log('---------------');
console.log(encrypt(testSku, 2, 1));
console.log('---------------');
console.log(encrypt(testSkuTitle, 4, 0));

