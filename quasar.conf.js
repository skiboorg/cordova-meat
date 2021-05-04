module.exports = function (/* ctx */) {
  return {
    bin: {
      linuxAndroidStudio: "/home/xxx/android-studio/bin/studio.sh"
    },
    supportTS: false,
    preFetch: true,
    boot: [
      'axios',
      'scroll',
      'swiper',
      'init',
      'img_lazy'
    ],
    css: [
      'app.sass',
    ],
    extras: [
      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],
    build: {
      vueRouterMode: 'hash', // available values: 'hash', 'history'
      env: {
        API: 'https://meat-coal.ru'
      },
      extendWebpack (cfg) {
      },
    },
    devServer: {
      https: false,
      port: 8080,
      open: true // opens browser window automatically
    },
    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'ru', // Quasar language pack
      config: {
        notify: { /* look at QUASARCONFOPTIONS from the API card (bottom of page) */ }
      },
      importStrategy: 'auto',
      plugins: [
        'Cookies',
        'Notify',
        'LocalStorage',
        'Loading'
      ]
    },
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: `Мясо на углях`,
        short_name: `ru.coal.meat`,
        description: `A Quasar Framework app`,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },
    cordova: {
      version:'0.0.3'
    },
    capacitor: {
      hideSplashscreen: true
    },
    electron: {
      bundler: 'packager', // 'packager' or 'builder'
      packager: {
      },

      builder: {
        appId: 'pizza_q_mob'
      },
      nodeIntegration: true,
      extendWebpack (/* cfg */) {
      }
    }
  }
}
