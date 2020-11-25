// This file demonstrates how to load dependencies as a single class in js.

class ScriptAggregator {
  constructor (params) {
    let p = params || {}
    if (typeof params === 'string') {
      p = { text: params }
    }

    // Some scripts need to be loaded before others. This is the purpose of the
    // two step script loading process.
    this.scriptDeps1 = {}
    this.scriptDeps2 = {
      '01_variables-test': 'VariablesTest',
      '05b_private-class-test': 'PrivateClassTest',
      '12c_promise-test': 'PromiseTest'
    }
    this.cssDeps = ['./layout/styles/layout']

    this.path = p.distPath || './'
    this.logsEnabled = (typeof p.logsEnabled === 'undefined') ? true : p.logEnabled
    this.tag = '[ScriptAggregator]'
    this.container = p.container || document.body

    this.init()
  }

  log (msg) {
    if (this.logsEnabled) console.log(this.tag, msg)
  }

  raiseEvent (name, data) {
    var e = new CustomEvent('[ScriptAggregator]-' + name, { detail: data, bubbles: true, cancelable: true })
    this.container.dispatchEvent(e)
  }

  // Most javascript library imports create their own class object in window
  // properties, which can be checked for to see if they have been loaded. For
  // instance, opencv.js allows use of methods from the cv class.
  checkDependencies (deps) {
    const checkedDeps = []
    if ((typeof deps === 'object') && (Array.isArray(deps))) {
      deps.forEach((item) => {
        if (!window[item]) checkedDeps.push(item)
      })
      return checkedDeps
    } else if (typeof deps === 'object') {
      Object.entries(deps).forEach((item) => {
        if (!window[item[1]]) checkedDeps.push(item[0])
      })
      return checkedDeps
    } else return (!window[deps]) ? [deps] : []
  }

  loadScript (url) {
    if (url) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = url
        script.addEventListener('load', resolve)
        script.addEventListener('error', () => reject(new Error(this.tag + ' Unable to load script: ' + url)))
        script.addEventListener('abort', () => reject(new Error(this.tag + ' Script loading aborted: ' + url)))
        if (document.head) document.head.appendChild(script)
        else document.body.appendChild(script)
      })
    }
  }

  loadStyle (url, before) {
    if (url) {
      return new Promise((resolve, reject) => {
        const linktag = document.createElement('link')
        linktag.rel = 'stylesheet'
        linktag.href = url
        linktag.addEventListener('load', resolve)
        linktag.addEventListener('error', () => reject(new Error(this.tag + ' Unable to load stylesheet: ' + url)))
        linktag.addEventListener('abort', () => reject(new Error(this.tag + ' Stylesheet loading aborted: ' + url)))
        if (before) {
          if (document.head) document.head.insertBefore(linktag, document.head.firstChild)
          else document.body.insertBefore(linktag, document.body.firstChild)
        } else {
          if (document.head) document.head.appendChild(linktag)
          else document.body.appendChild(linktag)
        }
      })
    }
  }

  loadDependencies (scripts, styles) {
    return new Promise((resolve, reject) => {
      let count = 0
      const total = (scripts || []).length + (styles || []).length

      if (total === 0) {
        resolve()
        return
      }

      const loaded = () => {
        count++
        if (count === total) resolve()
      }

      (scripts || []).forEach(script => {
        this.loadScript(this.path + script + '.js').then(loaded).catch(
          error => reject(new Error(error))
        )
      });

      (styles || []).forEach(style => {
        this.loadStyle(this.path + style + '.css').then(loaded).catch(
          error => reject(new Error(error))
        )
      })
    })
  }

  onDependenciesLoaded () {
    this.log('Scripts loaded.')
    this.raiseEvent('ready')
  }

  init () {
    this.log('Loading dependencies...')

    const sDeps1 = this.checkDependencies(this.scriptDeps1)
    const sDeps2 = this.checkDependencies(this.scriptDeps2)

    this.loadDependencies(sDeps1)
      .then(() => {
        this.loadDependencies(sDeps2, this.cssDeps)
          .then(() => {
            this.onDependenciesLoaded()
          })
      })
  }
}
window.ScriptAggregator = ScriptAggregator
