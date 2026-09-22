// js/back.js
(function () {
    // основной обработчик
    function r(t) {
      // если есть ?frame=1 или страница во фрейме — не вешаем back-скрипт
      if (d("frame") === "1" || s()) return;
  
      const n = new URL(location.href);
  
      // подставляем UTM и прочие параметры в {placeholders}
      t = t.replace(/{([^}]*)}/gm, function (_o, key) {
        return n.searchParams.has(key) ? n.searchParams.get(key) : "";
      });
  
      // создаём iframe, в который потом загрузим нашу ссылку
      var e = document.createElement("iframe");
      e.style.width = "100%";
      e.id = "newsFrame";
      e.name = "newsFrame";
      e.style.height = "100vh";
      e.style.position = "fixed";
      e.style.top = 0;
      e.style.left = 0;
      e.style.border = "none";
      e.style.zIndex = 999997;
      e.style.display = "none";
      e.style.backgroundColor = "#fff";
  
      document.body.append(e);
  
      // пушим состояние в history после "разрешения" аудио
      if (!c()) {
        u(function () {
          for (var o = 0; o < 20; ++o) {
            window.history.pushState({ EVENT: "MIXER" }, "", window.location);
          }
        });
      } else {
        for (var a = 0; a < 20; ++a) {
          window.history.pushState({ EVENT: "MIXER" }, "", window.location);
        }
      }
  
      window.onpopstate = function (o) {
        // если не Apple-девайс и нет состояния — ничего не делаем
        if (!c() && !o.state) return;
  
        document.body.style.overflow = "hidden";
        e.style.display = "block";
  
        // прячем всё, кроме iframe
        document
          .querySelectorAll("body > *:not(#newsFrame)")
          .forEach(function (i) {
            i.setAttribute("style", "display:none;");
          });
  
        // грузим нашу ссылку во фрейм
        frames.newsFrame.window.location.replace(t);
      };
    }
  
    // получить значение query-параметра
    function d(param) {
      var n = window.location.search;
      n = n.match(new RegExp("[?&]{1}(?:" + param + "=([^&$#=]+))"));
      return n ? n[1] : "";
    }
  
    // проверка, что мы внутри iframe
    function s() {
      try {
        return window !== window.top || document !== top.document || self.location !== top.location;
      } catch {
        return true;
      }
    }
  
    // попытка дождаться пользовательского взаимодействия с аудио
    function u(cb) {
      var n = setInterval(function () {
        var e = document.createElement("audio");
        var a = e.play();
  
        if (a instanceof Promise) {
          if (!e.paused) {
            clearInterval(n);
            cb();
          }
          a.then(function () { }).catch(function () { });
        } else {
          if (!e.paused) {
            clearInterval(n);
            cb();
          }
        }
      }, 100);
    }
  
    // проверка на Apple-платформы
    function c() {
      const list = [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
        "Macintosh",
        "MacIntel",
        "MacPPC",
        "Mac68K"
      ];
  
      return list.some(function (t) {
        return navigator.platform === t;
      });
    }
  
    // публичный метод
    // второй аргумент (true) можно передавать — он просто игнорируется,
    // для обратной совместимости.
    window.vitBack = function (t /*, flag*/) {
      r(t);
    };
  })();