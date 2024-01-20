const isProduction = process.env.NODE_ENV === 'production';

export const axiosUrl = isProduction ? 'https://umal-marketing.store/api' : 'http://localhost:5001/api';;

export const imgBaseUrl = isProduction ? 'https://umal-marketing.store/storage/uploads' : 'http://localhost:5001/uploads';

export const reactAppDomain = isProduction ? 'https://umal-marketing.store' : 'http://localhost:3000';

export const XENDIT_API_KEY = 'eG5kX3Byb2R1Y3Rpb25fWUw2TGFLWjhxblVRd3dySzdUNTgzZmxMR1NPeVpiYkRtcHg2aGd0ZkFmSzZpajVpbGFsM0djdGluUVJIRm86';