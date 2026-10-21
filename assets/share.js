(function () {
  var APP_STORE_URL = 'https://apps.apple.com/us/app/liftcue-ai-lifting-coach/id6792940755';
  var t = new URLSearchParams(location.search).get('t') || '';
  var openBtn = document.getElementById('open');
  document.getElementById('store').href = APP_STORE_URL;
  if (!/^[0-9a-f]{32}$/.test(t)) openBtn.style.display = 'none';
  openBtn.addEventListener('click', function (e) {
    e.preventDefault();
    // Safari still raises its "cannot open the page" alert for an
    // unhandled scheme; the timer navigates past it rather than
    // preventing it, so the user isn't stranded on that alert.
    var t0 = Date.now();
    var fallback = setTimeout(function () {
      // Backgrounded (timers throttled) or the confirm sheet held us up →
      // the app is handling it; only an unanswered scheme goes to the store.
      if (document.hidden || Date.now() - t0 > 3200) return;
      location.href = APP_STORE_URL;
    }, 2500);
    var cancel = function () {
      clearTimeout(fallback);
    };
    window.addEventListener('pagehide', cancel, { once: true });
    document.addEventListener(
      'visibilitychange',
      function () {
        if (document.hidden) cancel();
      },
      { once: true },
    );
    location.href = 'liftcue://s/' + t;
  });
})();
