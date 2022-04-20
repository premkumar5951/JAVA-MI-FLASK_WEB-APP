module.exports = {
  reactStrictMode: true,
  eslint:{
    ignoreDuringBuilds:true
  }
}

// module.exports = {
//   async rewrites() {
//     return {
//       fallback: [{
//         source: '/api/:path*',
//         destination: `${process.env.BASE_API_URL}:path*`,
//       }, ]
//     }
//   },
// };