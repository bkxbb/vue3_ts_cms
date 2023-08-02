// import.meta.env.MODE: {string} 应用运行的模式。
// import.meta.env.PROD: {boolean} 应用是否运行在生产环境。
// import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)。
// import.meta.env.SSR: {boolean} 应用是否运行在 server 上。（是否是服务端渲染）

// 1.区分开发环境和生产环境（手动切换）
// export const BASE_URL = 'http://codercba.dev:8000'
// export const BASE_URL = 'http://codercba.prod:8000'

// 2.代码逻辑判断，判断当前环境
let BASE_URL = ''
if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = 'http://codercba.com:5000'
} else {
  // 开发环境
  BASE_URL = 'http://codercba.com:5000'
}
export { BASE_URL }

// 3.通过创建.env文件直接创建变量
// console.log(import.meta.env.VITE_BASE_URL)

export const TIME_OUT = 10000
// export const BASE_URL = 'http://codercba.com:8000'
